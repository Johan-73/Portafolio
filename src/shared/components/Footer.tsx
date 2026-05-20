import { Github, Mail } from "lucide-react";
import { MonoLabel } from "./MonoLabel";

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 mt-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <MonoLabel color="muted">© 2026 JOHAN PÉREZ</MonoLabel>
          <MonoLabel color="muted">·</MonoLabel>
          <MonoLabel color="phosphor">STATUS: NOMINAL</MonoLabel>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Johan-73"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub"
            className="text-foreground/40 hover:text-violet transition-colors"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="mailto:johanperezmarin@gmail.com"
            aria-label="Email"
            className="text-foreground/40 hover:text-violet transition-colors"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
