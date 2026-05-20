import OpenAI from "openai";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface StreamRequest {
  messages: ChatMessage[];
  systemPrompt: string;
}

/**
 * Streams OpenAI chat completion to an SSE response.
 * Each token chunk is emitted as `data: {"delta": "..."}\n\n`.
 * Stream ends with `data: [DONE]\n\n`.
 */
export async function streamChat(apiKey: string, req: StreamRequest): Promise<ReadableStream> {
  const openai = new OpenAI({ apiKey });

  const stream = await openai.chat.completions.create({
    model: "gpt-4.1-nano",
    messages: [{ role: "system", content: req.systemPrompt }, ...req.messages],
    stream: true,
    max_tokens: 300,
    temperature: 0.5,
  });

  const encoder = new TextEncoder();
  return new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          const delta = chunk.choices[0]?.delta?.content ?? "";
          if (delta) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ delta })}\n\n`));
          }
        }
        controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
      } catch (err) {
        const message = err instanceof Error ? err.message : "stream error";
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: message })}\n\n`));
      } finally {
        controller.close();
      }
    },
  });
}
