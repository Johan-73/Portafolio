import { useTranslation } from "react-i18next";
import { useState } from "react";
import { GlassPanel } from "@/shared/components/GlassPanel";
import { MonoLabel } from "@/shared/components/MonoLabel";
import { Github, Mail, MapPin } from "lucide-react";

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

export function ContactSection() {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "Job opportunity",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[Portfolio] ${form.topic} — ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:johanperezmarin@gmail.com?subject=${subject}&body=${body}`;
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
                <select
                  value={form.topic}
                  onChange={(e) => setForm({ ...form, topic: e.target.value })}
                  className="w-full glass rounded-md px-3 py-2 text-foreground focus:border-violet/50 focus:outline-none focus:ring-1 focus:ring-violet/30"
                >
                  <option>Job opportunity</option>
                  <option>Project consult</option>
                  <option>Collaboration</option>
                  <option>Other</option>
                </select>
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
                  className="glass glass-hover bg-violet/15 border-violet/30 rounded-md px-4 py-2 text-violet font-medium"
                >
                  {t("contact.send")} →
                </button>
                <MonoLabel color="muted">[ OPENS YOUR MAIL APP ]</MonoLabel>
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
                  <div
                    key={c.label}
                    className="glass rounded-md p-3 flex items-center gap-3"
                  >
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
