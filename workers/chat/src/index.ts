import { Hono } from "hono";
import { cors } from "hono/cors";
import { Redis } from "@upstash/redis/cloudflare";
import { SYSTEM_PROMPT } from "./system-prompt";
import { checkAndIncrement } from "./rate-limit";
import { streamChat, type ChatMessage } from "./openai-provider";

type Env = {
  OPENAI_API_KEY: string;
  UPSTASH_REDIS_REST_URL: string;
  UPSTASH_REDIS_REST_TOKEN: string;
  ALLOWED_ORIGIN: string;
  PER_IP_DAILY: string;
  GLOBAL_DAILY: string;
  EVAL_BYPASS_TOKEN?: string;
};

const MAX_PROMPT_CHARS = 500;

const app = new Hono<{ Bindings: Env }>();

app.use("*", async (c, next) =>
  cors({
    origin: [c.env.ALLOWED_ORIGIN, "http://localhost:8080", "http://localhost:5173"],
    allowMethods: ["POST", "OPTIONS"],
    allowHeaders: ["Content-Type"],
    exposeHeaders: ["X-Remaining-For-IP"],
  })(c, next),
);

app.get("/", (c) => c.text("chat-johan worker — healthy"));

app.post("/api/chat", async (c) => {
  let body: { messages?: ChatMessage[] };
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: "invalid-json" }, 400);
  }

  const messages = body.messages ?? [];
  const lastMsg = messages.at(-1);
  if (!lastMsg || lastMsg.role !== "user" || !lastMsg.content) {
    return c.json({ error: "missing-user-message" }, 400);
  }
  if (lastMsg.content.length > MAX_PROMPT_CHARS) {
    return c.json({ error: "prompt-too-long", maxChars: MAX_PROMPT_CHARS }, 400);
  }

  const bypassToken = c.req.header("X-Eval-Token");
  const isEvalBypass = !!c.env.EVAL_BYPASS_TOKEN && bypassToken === c.env.EVAL_BYPASS_TOKEN;

  let remainingForIp = 999;
  if (!isEvalBypass) {
    const ip = c.req.header("CF-Connecting-IP") ?? c.req.header("X-Forwarded-For") ?? "unknown";

    const redis = new Redis({
      url: c.env.UPSTASH_REDIS_REST_URL,
      token: c.env.UPSTASH_REDIS_REST_TOKEN,
    });

    const result = await checkAndIncrement(redis, ip, {
      perIpDaily: parseInt(c.env.PER_IP_DAILY, 10),
      globalDaily: parseInt(c.env.GLOBAL_DAILY, 10),
    });

    if (!result.allowed) {
      return c.json(
        { error: "rate-limited", reason: result.reason, remainingForIp: result.remainingForIp },
        429,
      );
    }
    remainingForIp = result.remainingForIp;
  }

  const stream = await streamChat(c.env.OPENAI_API_KEY, {
    messages,
    systemPrompt: SYSTEM_PROMPT,
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "X-Remaining-For-IP": remainingForIp.toString(),
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
});

export default app;
