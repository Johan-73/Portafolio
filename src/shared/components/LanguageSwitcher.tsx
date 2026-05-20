import { useTranslation } from "react-i18next";
import { MonoLabel } from "./MonoLabel";
import { cn } from "@/shared/lib/utils";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const setLang = (lang: "en" | "es") => i18n.changeLanguage(lang);
  const isEn = i18n.language.startsWith("en");
  const isEs = i18n.language.startsWith("es");

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLang("en")}
        className={cn(
          "font-mono text-xs uppercase tracking-wider transition-colors",
          isEn ? "text-violet" : "text-foreground/40 hover:text-foreground/70",
        )}
        aria-label="Switch to English"
      >
        EN
      </button>
      <MonoLabel color="muted">/</MonoLabel>
      <button
        onClick={() => setLang("es")}
        className={cn(
          "font-mono text-xs uppercase tracking-wider transition-colors",
          isEs ? "text-violet" : "text-foreground/40 hover:text-foreground/70",
        )}
        aria-label="Cambiar a Español"
      >
        ES
      </button>
    </div>
  );
}
