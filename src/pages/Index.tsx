// Composition-only page. Features wired in as they land in src/features/.
// Imports will be added as Hero, Chat, Eval Dashboard, Projects, etc. are built.

export default function Index() {
  return (
    <div className="min-h-screen bg-ink text-foreground">
      <main className="container mx-auto py-20 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-violet">
          [ PHOSPHOR · BUILDING ]
        </p>
        <h1 className="font-display text-5xl md:text-7xl font-medium mt-4">
          Portfolio v2
        </h1>
        <p className="text-foreground/60 mt-4">
          Sections will appear here as features land.
        </p>
      </main>
    </div>
  );
}
