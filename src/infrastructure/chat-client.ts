export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export type StreamEvent =
  | { type: "delta"; text: string }
  | { type: "done"; remainingForIp: number }
  | { type: "rate-limited"; reason: "per-ip" | "global"; remainingForIp: number }
  | { type: "error"; error: string };

const ENDPOINT = (import.meta.env.VITE_CHAT_ENDPOINT_URL as string | undefined) ?? "";

export async function* sendMessage(messages: ChatMessage[]): AsyncGenerator<StreamEvent> {
  if (!ENDPOINT) {
    yield { type: "error", error: "Chat endpoint not configured." };
    return;
  }

  let res: Response;
  try {
    res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });
  } catch {
    yield { type: "error", error: "Network error reaching the chat backend." };
    return;
  }

  if (res.status === 429) {
    const data = (await res.json().catch(() => ({}))) as {
      reason?: "per-ip" | "global";
      remainingForIp?: number;
    };
    yield {
      type: "rate-limited",
      reason: data.reason ?? "per-ip",
      remainingForIp: data.remainingForIp ?? 0,
    };
    return;
  }

  if (!res.ok || !res.body) {
    yield { type: "error", error: `HTTP ${res.status}` };
    return;
  }

  const remainingForIp = parseInt(res.headers.get("X-Remaining-For-IP") ?? "0", 10);
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const payload = line.slice(6);
      if (payload === "[DONE]") {
        yield { type: "done", remainingForIp };
        return;
      }
      try {
        const obj = JSON.parse(payload) as { delta?: string; error?: string };
        if (obj.error) {
          yield { type: "error", error: obj.error };
          return;
        }
        if (obj.delta) yield { type: "delta", text: obj.delta };
      } catch {
        // skip malformed line
      }
    }
  }
}
