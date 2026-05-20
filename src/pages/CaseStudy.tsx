import { useParams, Link, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Check, ExternalLink, Github } from "lucide-react";
import { TopNav } from "@/shared/components/TopNav";
import { Footer } from "@/shared/components/Footer";
import { GlassPanel } from "@/shared/components/GlassPanel";
import { MonoLabel } from "@/shared/components/MonoLabel";
import { projects } from "@/domain/projects";
import { getCaseStudy } from "@/domain/case-studies";

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith("es") ? "es" : "en";

  const project = projects.find((p) => p.id === slug);
  const study = slug ? getCaseStudy(slug) : undefined;

  if (!project || !study) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-ink text-foreground">
      <TopNav />
      <main className="pt-14">
        <article className="container mx-auto max-w-3xl px-4 py-12 md:py-16">
          <Link
            to="/#projects"
            className="font-mono text-xs uppercase tracking-wider text-foreground/40 hover:text-violet flex items-center gap-1 mb-8"
          >
            <ArrowLeft className="h-3 w-3" /> Back to projects
          </Link>

          <header className="mb-12">
            <MonoLabel color="cyan" className="block mb-4">
              {project.yearTag}
            </MonoLabel>
            <h1 className="font-display text-4xl md:text-6xl font-medium text-foreground mb-4">
              {project.name}
            </h1>
            <p className="text-foreground/70 text-lg leading-relaxed">
              {project.description[lang]}
            </p>

            <div className="flex flex-wrap gap-1.5 mt-6">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[11px] px-2 py-1 rounded glass text-foreground/70"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-4 mt-6 flex-wrap">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-mono text-xs uppercase tracking-wider text-violet hover:underline flex items-center gap-1"
                >
                  <Github className="h-3 w-3" />
                  Repo
                </a>
              )}
              {study.links?.map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-mono text-xs uppercase tracking-wider text-violet hover:underline flex items-center gap-1"
                >
                  <ExternalLink className="h-3 w-3" /> {l.label}
                </a>
              ))}
            </div>
          </header>

          <section className="mb-10">
            <MonoLabel color="muted" className="block mb-3">
              [ PROBLEM ]
            </MonoLabel>
            <p className="text-foreground/85 leading-relaxed">{study.problem[lang]}</p>
          </section>

          <section className="mb-10">
            <MonoLabel color="muted" className="block mb-3">
              [ APPROACH ]
            </MonoLabel>
            <p className="text-foreground/85 leading-relaxed">{study.approach[lang]}</p>
          </section>

          <section className="mb-10">
            <MonoLabel color="muted" className="block mb-3">
              [ OUTCOME ]
            </MonoLabel>
            <p className="text-foreground/85 leading-relaxed">{study.outcome[lang]}</p>
          </section>

          <section className="mb-10">
            <MonoLabel color="muted" className="block mb-3">
              [ MY ROLE ]
            </MonoLabel>
            <GlassPanel className="p-6">
              <ul className="space-y-2">
                {study.role[lang].map((bullet, i) => (
                  <li key={i} className="flex gap-2 text-sm text-foreground/85">
                    <Check className="h-4 w-4 text-phosphor flex-shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </GlassPanel>
          </section>

          <div className="pt-8 border-t border-white/5">
            <Link
              to="/#projects"
              className="font-mono text-xs uppercase tracking-wider text-foreground/40 hover:text-violet flex items-center gap-1"
            >
              <ArrowLeft className="h-3 w-3" /> Back to projects
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
