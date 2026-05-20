import { useTranslation } from "react-i18next";
import { useState } from "react";
import { GlassPanel } from "@/shared/components/GlassPanel";
import { MonoLabel } from "@/shared/components/MonoLabel";
import { Github, Mail, MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

const CONTACTS = [
  {
    icon: Mail,
    label: "EMAIL",
    value: "johanperezmarin@gmail.com",
    href: "mailto:johanperezmarin@gmail.com",
  },
  { icon: Github, label: "GITHUB", value: "Johan-73", href: "https://github.com/Johan-73" },
  { icon: MapPin, label: "LOCATION", value: "Medellín · UTC-5" },
] as const;

const TOPICS = ["Job opportunity", "Project consult", "Collaboration", "Other"];

const WEB3FORMS_KEY = (import.meta.env.VITE_WEB3FORMS_KEY as string | undefined) ?? "";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function ContactSection() {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: TOPICS[0],
    message: "",
  });
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!WEB3FORMS_KEY) {
      // Fallback to mailto if key not configured
      const subject = encodeURIComponent(`[Portfolio] ${form.topic} — ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
      window.location.href = `mailto:johanperezmarin@gmail.com?subject=${subject}&body=${body}`;
      return;
    }

    setSubmitState("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          subject: `[Portfolio] ${form.topic} — ${form.name}`,
          message: form.message,
          from_name: "Portfolio Contact Form",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitState("success");
        setForm({ name: "", email: "", topic: TOPICS[0], message: "" });
      } else {
        setSubmitState("error");
        setErrorMsg(data.message ?? "Submission failed");
      }
    } catch (err) {
      setSubmitState("error");
      setErrorMsg(err instanceof Error ? err.message : "Network error");
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="font-display text-4xl md:text-5xl font-medium text-center mb-3">
          {t("contact.title")}
        </h2>
        <p className="text-center text-foreground/60 mb-12">{t("contact.subtitle")}</p>

        <GlassPanel className="p-6 md:p-10">
          <div className="grid md:grid-cols-[3fr_2fr] gap-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <MonoLabel color="muted" className="block mb-1.5">
                  [ NAME ]
                </MonoLabel>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full glass rounded-md px-3 py-2 text-foreground placeholder:text-foreground/30 focus:border-violet/50 focus:outline-none focus:ring-1 focus:ring-violet/30"
                />
              </div>
              <div>
                <MonoLabel color="muted" className="block mb-1.5">
                  [ EMAIL ]
                </MonoLabel>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full glass rounded-md px-3 py-2 text-foreground placeholder:text-foreground/30 focus:border-violet/50 focus:outline-none focus:ring-1 focus:ring-violet/30"
                />
              </div>
              <div>
                <MonoLabel color="muted" className="block mb-1.5">
                  [ WHAT IS THIS ABOUT? ]
                </MonoLabel>
                <Select
                  value={form.topic}
                  onValueChange={(v) => setForm({ ...form, topic: v })}
                >
                  <SelectTrigger className="w-full glass rounded-md px-3 py-2 h-auto text-foreground border-white/8 hover:border-violet/30 focus:border-violet/50 focus:ring-1 focus:ring-violet/30 data-[state=open]:border-violet/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-ink border border-white/10 backdrop-blur-md">
                    {TOPICS.map((tp) => (
                      <SelectItem
                        key={tp}
                        value={tp}
                        className="text-foreground/80 focus:bg-violet/15 focus:text-violet data-[state=checked]:text-violet data-[state=checked]:bg-violet/10"
                      >
                        {tp}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <MonoLabel color="muted" className="block mb-1.5">
                  [ MESSAGE ]
                </MonoLabel>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full glass rounded-md px-3 py-2 text-foreground placeholder:text-foreground/30 focus:border-violet/50 focus:outline-none focus:ring-1 focus:ring-violet/30 resize-none"
                />
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <button
                  type="submit"
                  disabled={submitState === "submitting"}
                  className="glass glass-hover bg-violet/15 border-violet/30 rounded-md px-4 py-2 text-violet font-medium disabled:opacity-50"
                >
                  {submitState === "submitting" ? `${t("contact.send")}…` : `${t("contact.send")} →`}
                </button>
                {submitState === "success" && (
                  <MonoLabel color="phosphor">[ ✓ MESSAGE SENT ]</MonoLabel>
                )}
                {submitState === "error" && (
                  <MonoLabel color="danger">[ ✗ {errorMsg.toUpperCase()} ]</MonoLabel>
                )}
                {submitState === "idle" && !WEB3FORMS_KEY && (
                  <MonoLabel color="muted">[ OPENS YOUR MAIL APP ]</MonoLabel>
                )}
                {submitState === "idle" && WEB3FORMS_KEY && (
                  <MonoLabel color="muted">[ DELIVERED VIA WEB3FORMS ]</MonoLabel>
                )}
              </div>
            </form>

            <div className="space-y-3">
              {CONTACTS.map((c) => {
                const Icon = c.icon;
                const inner = (
                  <>
                    <Icon className="h-4 w-4 text-violet flex-shrink-0" />
                    <div>
                      <MonoLabel color="muted">{c.label}</MonoLabel>
                      <p className="text-sm text-foreground/90">{c.value}</p>
                    </div>
                  </>
                );
                return c.href ? (
                  <a
                    key={c.label}
                    href={c.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="glass rounded-md p-3 flex items-center gap-3 hover:border-violet/30 transition-colors"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={c.label} className="glass rounded-md p-3 flex items-center gap-3">
                    {inner}
                  </div>
                );
              })}

              <div className="glass rounded-md p-3 mt-4 border border-phosphor/30">
                <MonoLabel color="phosphor">[ AVAILABLE · MON—FRI · REPLIES WITHIN 24H ]</MonoLabel>
              </div>
            </div>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}
