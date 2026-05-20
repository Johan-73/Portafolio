export interface ExperienceEntry {
  id: string;
  yearTag: string;
  role: string;
  company: string;
  location: string;
  current: boolean;
  bullets: { en: string; es: string }[];
}

export const experience: ExperienceEntry[] = [
  {
    id: "oro",
    yearTag: "[ 2024 — NOW ]",
    role: "Backend Developer · LLM Integration & Evaluation",
    company: "Oro Colombia",
    location: "Remote · Colombia",
    current: true,
    bullets: [
      {
        en: "Integrated GPT-4.1 Nano in WISO platform with structured prompts, streaming, and per-token cost control.",
        es: "Integré GPT-4.1 Nano en la plataforma WISO con prompts estructurados, streaming y control de costos por token.",
      },
      {
        en: "Built LLM eval pipelines in Python/Jupyter — datasets, similarity metrics, adversarial prompts, CI regressions.",
        es: "Construí pipelines de evaluación de LLM en Python/Jupyter — datasets, métricas de similitud, prompts adversariales, regresiones en CI.",
      },
      {
        en: "Orchestrated WhatsApp Cloud API with Bull + Redis (23 event types, exponential retries, signed webhooks).",
        es: "Orquesté la API de WhatsApp Cloud con Bull + Redis (23 tipos de evento, reintentos exponenciales, webhooks firmados).",
      },
    ],
  },
  {
    id: "wookky",
    yearTag: "[ 2022 — 2024 ]",
    role: "QA Automation Engineer + Backend Developer",
    company: "Wookky Colombia",
    location: "Remote · Colombia",
    current: false,
    bullets: [
      {
        en: "Multi-project agency role — finance, e-commerce, CRM clients.",
        es: "Rol multi-proyecto en agencia — clientes en finanzas, e-commerce, CRM.",
      },
      {
        en: "Led LLM eval strategy for an e-commerce AI product-recommendation assistant.",
        es: "Lideré la estrategia de evaluación de LLM para un asistente de recomendación de productos en e-commerce.",
      },
      {
        en: "Automation in Selenium / Cypress / Playwright; API tests in Postman/Newman/JMeter; mobile in Appium.",
        es: "Automatización en Selenium / Cypress / Playwright; pruebas de API en Postman/Newman/JMeter; mobile en Appium.",
      },
    ],
  },
  {
    id: "teleperformance",
    yearTag: "[ 2021 — 2022 ]",
    role: "Medical Interpreter (EN↔ES)",
    company: "Teleperformance Colombia",
    location: "Remote · Colombia",
    current: false,
    bullets: [
      {
        en: "Real-time bilingual medical interpretation under pressure — communication discipline that shaped how I write code.",
        es: "Interpretación médica bilingüe en tiempo real bajo presión — disciplina de comunicación que moldeó cómo escribo código.",
      },
    ],
  },
];
