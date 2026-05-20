import { useTranslation } from "react-i18next";
import { GlassPanel } from "@/shared/components/GlassPanel";
import { MonoLabel } from "@/shared/components/MonoLabel";
import { skills } from "@/domain/skills";

export function StackGrid() {
  const { t } = useTranslation();

  return (
    <section id="stack" className="py-20 md:py-28 px-4">
      <div className="container mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-medium text-center mb-3">
          {t("stack.title")}
        </h2>
        <p className="text-center text-foreground/60 mb-12">{t("stack.subtitle")}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {skills.map((cat) => (
            <GlassPanel key={cat.id} hover className="p-5">
              <div className="pb-3 mb-3 border-b border-white/5">
                <MonoLabel color="violet">{cat.label}</MonoLabel>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-[11px] px-2 py-1 rounded glass text-foreground/70"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}
