import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Send } from "lucide-react";
import { GlassPanel } from "@/shared/components/GlassPanel";
import { MonoLabel } from "@/shared/components/MonoLabel";
import { useChat } from "./useChat";

export function ChatPanel() {
  const { t } = useTranslation();
  const { messages, state, remainingForIp, send } = useChat();
  const [input, setInput] = useState("");
  const threadRef = useRef<HTMLDivElement>(null);

  const suggestions = t("chat.suggestions", { returnObjects: true }) as string[];
  const busy = state.kind === "computing" || state.kind === "streaming";
  const isRateLimited = state.kind === "rate-limited";
  const hasContent = messages.length > 0 || state.kind !== "idle";

  // Auto-scroll on new content
  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, state]);

  const handleSend = (text?: string) => {
    const value = (text ?? input).trim();
    if (!value || busy) return;
    send(value);
    if (!text) setInput("");
  };

  return (
    <section id="chat" className="py-20 md:py-28 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="font-display text-4xl md:text-5xl font-medium text-center mb-3">
          {t("chat.title")}
        </h2>
        <p className="text-center text-foreground/60 mb-8">{t("chat.subtitle")}</p>

        <GlassPanel className="p-6 md:p-8">
          <div className="grid md:grid-cols-[1fr_220px] gap-6">
            {/* Chat thread */}
            <div
              ref={threadRef}
              className="space-y-4 min-h-[280px] max-h-[480px] overflow-y-auto pr-2"
            >
              {!hasContent && (
                <p className="text-foreground/40 text-sm">{t("chat.placeholder")}</p>
              )}

              {messages.map((m, i) => (
                <div key={i} className="space-y-1">
                  <MonoLabel color="muted">{m.role === "user" ? "USER" : "ASSISTANT"}</MonoLabel>
                  <p
                    className={
                      m.role === "user"
                        ? "text-right text-foreground"
                        : "text-foreground/90 whitespace-pre-wrap"
                    }
                  >
                    {m.content}
                  </p>
                </div>
              ))}

              {state.kind === "streaming" && (
                <div className="space-y-1">
                  <MonoLabel color="muted">ASSISTANT</MonoLabel>
                  <p className="text-foreground/90 whitespace-pre-wrap">
                    {state.partial}
                    <span className="inline-block w-2 h-4 ml-1 bg-violet align-middle animate-blink-caret" />
                  </p>
                </div>
              )}

              {state.kind === "computing" && (
                <MonoLabel color="cyan">{t("chat.states.computing")}</MonoLabel>
              )}

              {state.kind === "error" && (
                <MonoLabel color="danger">{t("chat.states.error")}</MonoLabel>
              )}
            </div>

            {/* Metadata sidebar */}
            <div className="space-y-3 md:border-l md:border-white/5 md:pl-6">
              {state.kind === "streaming" && (
                <MonoLabel color="phosphor">{t("chat.states.streaming")}</MonoLabel>
              )}
              <div className="space-y-3 text-sm">
                <div>
                  <MonoLabel color="muted">{t("chat.metadata.model")}</MonoLabel>
                  <p className="font-mono text-foreground/80 text-xs mt-1">gpt-4.1-nano</p>
                </div>
                {remainingForIp !== null && (
                  <div>
                    <MonoLabel color="muted">{t("chat.metadata.remaining")}</MonoLabel>
                    <p className="font-mono text-foreground/80 text-xs mt-1">
                      {remainingForIp} / 5
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="mt-6 pt-6 border-t border-white/5">
            {isRateLimited ? (
              <GlassPanel className="p-4 border-violet/30">
                <MonoLabel color="violet">
                  {state.reason === "global"
                    ? t("chat.states.globalLimit")
                    : t("chat.states.rateLimited")}
                </MonoLabel>
              </GlassPanel>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder={t("chat.placeholder")}
                  maxLength={500}
                  className="flex-1 glass rounded-md px-3 py-2 text-foreground placeholder:text-foreground/30 focus:border-violet/50 focus:outline-none focus:ring-1 focus:ring-violet/30"
                  disabled={busy}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={busy || !input.trim()}
                  className="glass glass-hover bg-violet/15 border-violet/30 rounded-md px-3 disabled:opacity-30"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4 text-violet" />
                </button>
              </div>
            )}
          </div>

          {/* Suggested prompts — always visible (unless rate-limited) so visitors can keep exploring */}
          {!isRateLimited && (
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  disabled={busy}
                  className="glass glass-hover rounded-full px-3 py-1.5 text-xs text-foreground/70 hover:text-violet disabled:opacity-30"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </GlassPanel>
      </div>
    </section>
  );
}
