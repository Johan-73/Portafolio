import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { GlassPanel } from "@/shared/components/GlassPanel";
import { MonoLabel } from "@/shared/components/MonoLabel";
import { projects } from "@/domain/projects";
import { ExternalLink, Github, ArrowRight } from "lucide-react";

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
            <div key={p.id} className="relative group">
              {/* Gradient-trace border on hover */}
              <div
                className="absolute -inset-px rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"
                style={{
                  background: "conic-gradient(from 0deg, #A78BFA, #06D6FF, #A78BFA)",
                  padding: "1px",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />
              <Link
                to={`/case/${p.id}`}
                className="relative block h-full"
                aria-label={`View ${p.name} case study`}
              >
                <GlassPanel className="p-6 flex flex-col h-full transition-shadow group-hover:shadow-[0_0_40px_rgba(167,139,250,0.18)]">
                  <MonoLabel color="cyan" className="mb-3 block">
                    {p.yearTag}
                  </MonoLabel>
                  <h3 className="font-display text-xl font-medium text-foreground mb-2 group-hover:text-violet transition-colors">
                    {p.name}
                  </h3>
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

                  <div className="flex items-center justify-between gap-2 pt-3 border-t border-white/5">
                    <div className="flex gap-3">
                      {p.repoUrl && (
                        <a
                          href={p.repoUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          onClick={(e) => e.stopPropagation()}
                          className="font-mono text-[11px] uppercase tracking-wider text-foreground/60 hover:text-violet flex items-center gap-1"
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
                          onClick={(e) => e.stopPropagation()}
                          className="font-mono text-[11px] uppercase tracking-wider text-foreground/60 hover:text-violet flex items-center gap-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Demo
                        </a>
                      )}
                    </div>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-violet flex items-center gap-1 group-hover:gap-2 transition-all">
                      Case <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </GlassPanel>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
