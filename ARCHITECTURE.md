# Architecture

This portfolio uses **Feature-Sliced Lite** + **3-layer Clean Architecture**. The choice is deliberate; the full versions would be over-engineering at ~2 kLOC. Junior engineers reach for the most rigorous pattern they know; senior engineers right-size.

## Structure

```
src/
├── domain/          # Pure data + types. No React. No IO. Where the CV, projects, experience, skills, and personal facts live.
├── infrastructure/  # IO boundaries — chat client (SSE), eval-result loader.
├── features/        # User-facing features: hero, chat, eval-dashboard, projects, experience, about, stack, contact.
├── shared/          # Reusable primitives (shadcn UI, hooks, i18n, design tokens, generic components like GlassPanel).
└── pages/           # Composition only — one-line imports per feature.

workers/chat/        # Cloudflare Worker holding the OpenAI API key and enforcing rate limits.
evals/               # TypeScript eval pipeline runner (LLM-as-judge) executed by GitHub Actions.
```

Dependencies point inward: `features/` may import `domain/`, `infrastructure/`, and `shared/`. `domain/` imports nothing from the project. `infrastructure/` imports `domain/` only.

## What we're NOT doing, and why

- **Full Feature-Sliced Design** (7 layers: `app → processes → pages → widgets → features → entities → shared`) — overkill at this size. Adds folders that contain 1–2 files each, fragments mental model.
- **Full Clean Architecture** (4 rings: entities / use-cases / interface adapters / frameworks) — same critique. The 3-folder version preserves the spirit (domain free of framework code, IO at the boundary) without the ceremony.

## Paradigm

React: 100% functional + hooks. No class components.
Worker: functional TypeScript request handlers; OO only at one boundary (`LLMProvider` interface) so the OpenAI dependency can be mocked in tests.

## SOLID — where it earns its keep

- **SRP**: `ChatPanel` doesn't know about rate limits — `useChat()` does.
- **OCP**: features take data as props. New project = JSON entry in `src/domain/projects.ts`, no component edit.
- **ISP**: narrow TypeScript types per component, never fat catch-all props.
- **DIP**: UI depends on `useChat()` abstraction, not `fetch()` directly. Worker depends on `LLMProvider` interface, swappable for tests.

LSP barely applies without inheritance hierarchies — we don't have any. Skip.

## GoF patterns

Patterns are not forced; they emerge where the problem calls for them.

- **Facade** — `chatClient.sendMessage()` hides Worker URL, headers, SSE parsing, error retry.
- **Strategy** — `react-i18next` is built-in Strategy (one strategy per locale).
- **Observer** — `framer-motion`'s `useInView` is built-in Observer.
- **Adapter** — `openai-provider.ts` adapts OpenAI's API shape to internal `LLMProvider`.

## Why this matters

A recruiter reading this repo sees: discipline applied where it pays, restraint where it doesn't. That's the signal we're sending.
