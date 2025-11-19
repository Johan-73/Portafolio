import { useTranslation } from "react-i18next";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

export const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          {/* Social links */}
          <div className="flex gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary transition-all duration-300 group"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary transition-all duration-300 group"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="mailto:johan.perez@example.com"
              className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary transition-all duration-300 group"
              aria-label="Email"
            >
              <Mail className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-muted-foreground text-sm mb-1">
              © {currentYear} Johan Andrés Pérez Marín. {t("footer.rights")}.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
