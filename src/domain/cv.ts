export interface CV {
  name: string;
  role: string;
  tagline: string;
  location: string;
  timezone: string;
  languages: { code: "en" | "es"; level: string }[];
  summary: { en: string; es: string };
  education: { degree: string; institution: string; period: string; graduated: boolean };
}

export const cv: CV = {
  name: "Johan Andrés Pérez Marín",
  role: "Backend Developer · LLM Integration & Evaluation",
  tagline: "I ship LLM features to production — and I prove they work.",
  location: "Medellín, Colombia",
  timezone: "UTC-5",
  languages: [
    { code: "es", level: "Native" },
    { code: "en", level: "C1 Advanced (certified at Blendex, Medellín)" },
  ],
  summary: {
    en: "Backend developer with 3.5 years of experience integrating GPT-4-class LLMs in production. Specialized in the dual discipline of shipping AI features and evaluating them — Python/Jupyter eval pipelines with adversarial prompts, similarity metrics, and CI regressions. Stack: Node.js, Express, PostgreSQL, OpenAI, WhatsApp Cloud API. Currently at Oro Colombia building WISO.",
    es: "Desarrollador backend con 3.5 años de experiencia integrando LLMs (GPT-4 y similares) en producción. Especializado en la doble disciplina de entregar features de IA y evaluarlas — pipelines en Python/Jupyter con prompts adversariales, métricas de similitud y regresiones en CI. Stack: Node.js, Express, PostgreSQL, OpenAI, WhatsApp Cloud API. Actualmente en Oro Colombia construyendo WISO.",
  },
  education: {
    degree: "Tecnología en Desarrollo de Software",
    institution: "Institución Universitaria ITM",
    period: "2022–2025 (coursework) · graduating July 2026",
    graduated: false,
  },
};
