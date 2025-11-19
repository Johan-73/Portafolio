import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Globe } from "lucide-react";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "es" ? "en" : "es";
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 hover:bg-primary/10 border-primary/30"
    >
      <Globe className="h-4 w-4" />
      <span className="font-medium uppercase">{i18n.language === "es" ? "EN" : "ES"}</span>
    </Button>
  );
};
