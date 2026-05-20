import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";
import { judge } from "./judge.js";

interface Case {
  id: string;
  prompt: string;
  expected: string;
}

const OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? "";
const CHAT_ENDPOINT = process.env.CHAT_ENDPOINT_URL ?? "";
const EVAL_BYPASS_TOKEN = process.env.EVAL_BYPASS_TOKEN ?? "";

if (!OPENAI_API_KEY || !CHAT_ENDPOINT) {
  console.error("Missing OPENAI_API_KEY or CHAT_ENDPOINT_URL");
  process.exit(1);
}

const __dirname = dirname(fileURLToPath(import.meta.url));

async function fetchChatResponse(prompt: string): Promise<{ text: string; latencyMs: number }> {
  const start = Date.now();
  const res = await fetch(CHAT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(EVAL_BYPASS_TOKEN ? { "X-Eval-Token": EVAL_BYPASS_TOKEN } : {}),
    },
    body: JSON.stringify({ messages: [{ role: "user", content: prompt }] }),
  });
  if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}: ${await res.text()}`);

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";
  let text = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    const lines = buf.split("\n");
    buf = lines.pop() ?? "";
    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const payload = line.slice(6);
      if (payload === "[DONE]") continue;
      try {
        const obj = JSON.parse(payload) as { delta?: string };
        if (obj.delta) text += obj.delta;
      } catch {
        // skip
      }
    }
  }
  return { text, latencyMs: Date.now() - start };
}

function percentile(values: number[], p: number): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const idx = Math.ceil((p / 100) * sorted.length) - 1;
  return sorted[Math.max(0, idx)] ?? 0;
}

async function main() {
  const casesPath = resolve(__dirname, "cases.yml");
  const cases = yaml.load(readFileSync(casesPath, "utf8")) as Case[];

  const results = [];
  for (const c of cases) {
    console.log(`▶ ${c.id} — ${c.prompt.slice(0, 60)}…`);
    let text = "";
    let latencyMs = 0;
    try {
      const r = await fetchChatResponse(c.prompt);
      text = r.text;
      latencyMs = r.latencyMs;
    } catch (err) {
      console.log(`  ✗ Fetch failed: ${err instanceof Error ? err.message : "unknown"}`);
      results.push({
        id: c.id,
        prompt: c.prompt,
        expectedCriteria: c.expected,
        status: "fail" as const,
        judgeReason: `Fetch error: ${err instanceof Error ? err.message : "unknown"}`,
        judgeModel: "n/a",
        latencyMs: 0,
        tokenCost: 0,
      });
      continue;
    }

    const verdict = await judge(OPENAI_API_KEY, c.prompt, text, c.expected);
    results.push({
      id: c.id,
      prompt: c.prompt,
      expectedCriteria: c.expected,
      status: verdict.pass ? ("pass" as const) : ("fail" as const),
      judgeReason: verdict.reason,
      judgeModel: "gpt-4.1",
      latencyMs,
      tokenCost: 0.0008,
    });
    console.log(`  ${verdict.pass ? "✓ PASS" : "✗ FAIL"} ${latencyMs}ms — ${verdict.reason}`);
    await new Promise((r) => setTimeout(r, 200));
  }

  const latencies = results.map((r) => r.latencyMs).filter((n) => n > 0);
  const summary = {
    runAt: new Date().toISOString(),
    passRate: {
      passing: results.filter((r) => r.status === "pass").length,
      total: results.length,
    },
    latencyP50Ms: percentile(latencies, 50),
    latencyP95Ms: percentile(latencies, 95),
    avgCostPerMessage: 0.0008,
    cases: results,
  };

  const outPath = resolve(__dirname, "../public/evals/results.json");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, JSON.stringify(summary, null, 2));
  console.log(
    `\n✓ ${summary.passRate.passing}/${summary.passRate.total} passing — saved ${outPath}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
