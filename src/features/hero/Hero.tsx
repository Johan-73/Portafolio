import { useTranslation } from "react-i18next";
import { Download, MessageCircle, FileText } from "lucide-react";
import { MonoLabel } from "@/shared/components/MonoLabel";
import { MetadataBar } from "@/shared/components/MetadataBar";
import { cv } from "@/domain/cv";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-violet/[0.08] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center pt-16">
        <MonoLabel color="cyan" className="mb-4 block">
          [ {cv.role.toUpperCase()} ]
        </MonoLabel>

        <h1 className="font-display text-5xl md:text-7xl font-medium tracking-tight mb-6 text-foreground">
          {cv.name}
        </h1>

        <p className="text-base md:text-lg text-foreground/60 max-w-2xl mx-auto mb-10">
          {t("hero.tagline")}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
          <button
            onClick={() => scrollTo("chat")}
            className="glass glass-hover rounded-md px-5 py-3 bg-violet/15 border-violet/30 flex items-center justify-center gap-2 text-foreground"
          >
            <MessageCircle className="h-4 w-4" />
            {t("hero.cta.chat")}
          </button>
          <button
            onClick={() => scrollTo("projects")}
            className="glass glass-hover rounded-md px-5 py-3 flex items-center justify-center gap-2 text-foreground/80"
          >
            <FileText className="h-4 w-4" />
            {t("hero.cta.wiso")}
          </button>
          <a
            href={`${import.meta.env.BASE_URL}cv/johan-perez-cv-backend-llm.pdf`}
            download
            className="rounded-md px-5 py-3 flex items-center justify-center gap-2 text-foreground/60 hover:text-violet transition-colors"
          >
            <Download className="h-4 w-4" />
            {t("hero.cta.cv")}
          </a>
        </div>
      </div>

      <div className="absolute bottom-6 inset-x-0">
        <MetadataBar
          items={[
            { value: "[ ONLINE ]", color: "phosphor" },
            { label: "LAST EVAL", value: "2H AGO", color: "cyan" },
            { label: "PASSING", value: "9/10", color: "phosphor" },
            { label: "MODEL", value: "gpt-4.1-nano", color: "cyan" },
            { value: "MEDELLÍN UTC-5", color: "muted" },
          ]}
        />
      </div>
    </section>
  );
}
