import { useTranslation } from "react-i18next";
import { GlassPanel } from "@/shared/components/GlassPanel";
import { MonoLabel } from "@/shared/components/MonoLabel";
import { cv } from "@/domain/cv";

export function AboutPanel() {
  const { t } = useTranslation();

  const metadata = [
    { label: "LOCATION", value: `${cv.location} · ${cv.timezone}` },
    {
      label: "LANGUAGES",
      value: cv.languages.map((l) => `${l.code.toUpperCase()} ${l.level}`).join(" · "),
    },
    { label: "AVAILABILITY", value: t("about.availability") },
    {
      label: "EDUCATION",
      value: `${cv.education.degree} · ${cv.education.institution} ${cv.education.period}`,
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="font-display text-4xl md:text-5xl font-medium text-center mb-12">
          {t("about.title")}
        </h2>

        <GlassPanel className="p-8 md:p-10">
          <div className="grid md:grid-cols-[280px_1fr] gap-8">
            <div className="space-y-6">
              <div className="w-20 h-20 rounded-lg glass flex items-center justify-center font-display text-2xl font-medium text-violet ring-2 ring-violet/30">
                JP
              </div>
              <dl className="space-y-3">
                {metadata.map((m) => (
                  <div key={m.label}>
                    <dt>
                      <MonoLabel color="muted">{m.label}</MonoLabel>
                    </dt>
                    <dd className="text-sm text-foreground/80 mt-0.5">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="space-y-4">
              <p className="text-foreground/90 leading-relaxed">
                <strong className="font-semibold">{t("about.summary.firstSentence")}</strong>{" "}
                {t("about.summary.continued")}
              </p>
              <p className="text-foreground/80 leading-relaxed">{t("about.summary.body")}</p>
              <div className="pt-2">
                <MonoLabel color="muted">[ OTHER WORK ]</MonoLabel>
                <p className="text-foreground/60 leading-relaxed text-sm mt-2">
                  {t("about.otherWork")}
                </p>
              </div>
            </div>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}
