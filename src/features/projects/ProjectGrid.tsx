import { useTranslation } from "react-i18next";
import { GlassPanel } from "@/shared/components/GlassPanel";
import { MonoLabel } from "@/shared/components/MonoLabel";
import { projects } from "@/domain/projects";
import { ExternalLink, Github } from "lucide-react";

export function ProjectGrid() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.startsWith("es") ? "es" : "en";

  return (
    <section id="projects" className="py-20 md:py-28 px-4">
      <div className="container mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-medium text-center mb-3">
          {t("projects.title")}
        </h2>
        <p className="text-center text-foreground/60 mb-12 max-w-2xl mx-auto">
          {t("projects.subtitle")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {projects.map((p) => (
            <GlassPanel key={p.id} hover className="p-6 flex flex-col">
              <MonoLabel color="cyan" className="mb-3 block">
                {p.yearTag}
              </MonoLabel>
              <h3 className="font-display text-xl font-medium text-foreground mb-2">{p.name}</h3>
              <p className="text-sm text-foreground/70 leading-relaxed mb-4 flex-grow">
                {p.description[lang]}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.stack.slice(0, 5).map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[10px] px-2 py-0.5 rounded glass text-foreground/60"
                  >
                    {tech}
                  </span>
                ))}
                {p.stack.length > 5 && (
                  <span className="font-mono text-[10px] text-foreground/40">
                    +{p.stack.length - 5}
                  </span>
                )}
              </div>

              <div className="flex gap-3 pt-3 border-t border-white/5">
                {p.repoUrl && (
                  <a
                    href={p.repoUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-mono text-[11px] uppercase tracking-wider text-violet hover:underline flex items-center gap-1"
                  >
                    <Github className="h-3 w-3" />
                    Repo
                  </a>
                )}
                {p.demoUrl && (
                  <a
                    href={p.demoUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-mono text-[11px] uppercase tracking-wider text-violet hover:underline flex items-center gap-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Demo
                  </a>
                )}
              </div>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}
