import { useTranslation } from "react-i18next";
import { GlassPanel } from "@/shared/components/GlassPanel";
import { MonoLabel } from "@/shared/components/MonoLabel";
import { experience } from "@/domain/experience";
import { Check } from "lucide-react";

export function ExperienceTimeline() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.startsWith("es") ? "es" : "en";

  return (
    <section id="experience" className="py-20 md:py-28 px-4">
      <div className="container mx-auto max-w-3xl">
        <h2 className="font-display text-4xl md:text-5xl font-medium text-center mb-3">
          {t("experience.title")}
        </h2>
        <p className="text-center text-foreground/60 mb-12 max-w-2xl mx-auto">
          {t("experience.subtitle")}
        </p>

        <div className="relative pl-8">
          <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-violet via-cyan to-violet/20" />

          {experience.map((entry) => (
            <div key={entry.id} className="relative mb-8 last:mb-0">
              <div className="absolute -left-7 top-3 w-3 h-3 rounded-full bg-ink border-2 border-violet" />

              <GlassPanel className="p-6">
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <MonoLabel color="cyan">{entry.yearTag}</MonoLabel>
                  {entry.current && (
                    <MonoLabel
                      color="phosphor"
                      className="bg-phosphor/10 px-2 py-0.5 rounded-full"
                    >
                      [ ACTIVE NOW ]
                    </MonoLabel>
                  )}
                </div>

                <h3 className="font-display text-lg md:text-xl font-medium text-foreground mb-1">
                  {entry.role}
                </h3>
                <p className="text-sm text-foreground/60 mb-4">
                  {entry.company} · {entry.location}
                </p>

                <ul className="space-y-2">
                  {entry.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2 text-sm text-foreground/80">
                      <Check className="h-4 w-4 text-phosphor flex-shrink-0 mt-0.5" />
                      <span>{b[lang]}</span>
                    </li>
                  ))}
                </ul>
              </GlassPanel>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
