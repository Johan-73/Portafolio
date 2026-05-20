export interface Project {
  id: string;
  name: string;
  yearTag: string;
  description: { en: string; es: string };
  stack: string[];
  repoUrl?: string;
  demoUrl?: string;
}

export const projects: Project[] = [
  {
    id: "wiso",
    name: "WISO",
    yearTag: "[ PROD · 2024 — NOW ]",
    description: {
      en: "Operational platform with conversational AI. Integrated GPT-4.1 Nano as assistant via WhatsApp; built CI-integrated LLM eval pipelines in Python/Jupyter.",
      es: "Plataforma operativa con IA conversacional. Integré GPT-4.1 Nano como asistente vía WhatsApp; construí pipelines de evaluación de LLM en Python/Jupyter integrados en CI.",
    },
    stack: ["Node.js 22", "Express", "PostgreSQL", "Bull+Redis", "OpenAI", "WhatsApp Cloud API", "Jupyter"],
  },
  {
    id: "ecommerce-ai",
    name: "E-commerce AI Assistant",
    yearTag: "[ PROD · 2022 — 2024 ]",
    description: {
      en: "LLM-powered product recommendation for an e-commerce platform. Led the eval strategy in production with adversarial prompts and similarity metrics.",
      es: "Recomendación de productos potenciada por LLM en un e-commerce. Lideré la estrategia de evaluación en producción con prompts adversariales y métricas de similitud.",
    },
    stack: ["React", "Next.js", "Node.js", "Django", "FastAPI", "PostgreSQL", "Jupyter", "GitHub Actions"],
  },
  {
    id: "kairos",
    name: "Kairos",
    yearTag: "[ BUILDING · 2026 — NOW ]",
    description: {
      en: "Solo-built white-label restaurant SaaS. Modular monolith, multi-tenant by tenant_id, offline-first PWA. Currently designing EP-08 WhatsApp AI delivery agent.",
      es: "SaaS para restaurantes white-label construido en solitario. Monolito modular, multi-tenant por tenant_id, PWA offline-first. Actualmente diseñando el agente de IA de domicilios vía WhatsApp (EP-08).",
    },
    stack: ["Java 21", "Spring Boot 3", "Next.js 15", "PostgreSQL", "Kafka", "Redis"],
    // Kairos repo is private — no public link. The case study page tells the story instead.
  },
  {
    id: "llm-eval-starter",
    name: "LLM Eval Starter Notebook",
    yearTag: "[ OSS · 2026 ]",
    description: {
      en: "Public starter for evaluating LLM features in CI. Multi-provider judge (OpenAI + Anthropic), endpoint auto-detection, retry, baseline regression diff, JSON/HTML/Markdown reports. ~600 LOC TypeScript, 13 unit tests.",
      es: "Plantilla pública para evaluar features de LLM en CI. Juez multi-proveedor (OpenAI + Anthropic), auto-detección de endpoint, reintentos, diff contra baseline, reportes JSON/HTML/Markdown. ~600 LOC en TypeScript, 13 tests unitarios.",
    },
    stack: ["TypeScript", "Node.js", "OpenAI", "Anthropic", "Vitest", "GitHub Actions"],
    repoUrl: "https://github.com/Johan-73/llm-eval-starter",
  },
];
