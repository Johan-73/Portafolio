import { LanguageSwitcher } from "./LanguageSwitcher";

const SECTIONS = [
  { id: "projects", label: "PROJECTS" },
  { id: "evals", label: "EVALS" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "about", label: "ABOUT" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function TopNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-ink/70 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto flex h-14 items-center justify-between">
        <a
          href="#hero"
          className="font-mono text-xs uppercase tracking-widest text-foreground/80 hover:text-violet transition-colors"
        >
          johan pérez
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="font-mono text-xs uppercase tracking-wider text-foreground/60 hover:text-violet transition-colors"
            >
              {s.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <button
            onClick={() => scrollTo("contact")}
            className="hidden md:inline-flex glass glass-hover rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-violet"
          >
            Hire_Engineer
          </button>
        </div>
      </div>
    </header>
  );
}
