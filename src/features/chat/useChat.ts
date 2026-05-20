import { useCallback, useState } from "react";
import { sendMessage, type ChatMessage } from "@/infrastructure/chat-client";

export type ChatState =
  | { kind: "idle" }
  | { kind: "computing" }
  | { kind: "streaming"; partial: string }
  | { kind: "rate-limited"; reason: "per-ip" | "global" }
  | { kind: "error"; error: string };

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [state, setState] = useState<ChatState>({ kind: "idle" });
  const [remainingForIp, setRemainingForIp] = useState<number | null>(null);

  const send = useCallback(
    async (text: string) => {
      if (!text.trim()) return;
      const newMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
      setMessages(newMessages);
      setState({ kind: "computing" });

      let accumulated = "";

      for await (const event of sendMessage(newMessages)) {
        switch (event.type) {
          case "rate-limited":
            setRemainingForIp(event.remainingForIp);
            setState({ kind: "rate-limited", reason: event.reason });
            return;
          case "error":
            setState({ kind: "error", error: event.error });
            return;
          case "delta":
            accumulated += event.text;
            setState({ kind: "streaming", partial: accumulated });
            break;
          case "done":
            setMessages((prev) => [...prev, { role: "assistant", content: accumulated }]);
            setRemainingForIp(event.remainingForIp);
            setState({ kind: "idle" });
            return;
        }
      }
    },
    [messages],
  );

  const reset = useCallback(() => {
    setMessages([]);
    setState({ kind: "idle" });
  }, []);

  return { messages, state, remainingForIp, send, reset };
}
