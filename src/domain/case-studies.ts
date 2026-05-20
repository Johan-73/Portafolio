export interface CaseStudy {
  id: string;
  problem: { en: string; es: string };
  approach: { en: string; es: string };
  outcome: { en: string; es: string };
  role: { en: string[]; es: string[] };
  links?: { label: string; url: string }[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "wiso",
    problem: {
      en: "Oro Colombia needed an internal operational platform where staff could be triaged tasks, communicate with end-users on WhatsApp, and get conversational assistance from an LLM — all without spinning up a separate chat product or paying for managed Conversational-AI services. Constraints: Node.js stack, Postgres, ship fast, cost-conscious.",
      es: "Oro Colombia necesitaba una plataforma operativa interna donde el personal pudiera recibir tareas asignadas, comunicarse con usuarios finales por WhatsApp y obtener asistencia conversacional de un LLM — todo sin levantar un producto de chat aparte ni pagar servicios gestionados de IA conversacional. Restricciones: stack Node.js, Postgres, entrega rápida y consciente del costo.",
    },
    approach: {
      en: "I integrated GPT-4.1 Nano directly into the platform via the OpenAI API with structured prompts and streaming responses, orchestrated WhatsApp Cloud API with Bull + Redis (23 event types, exponential retries, signed HMAC webhooks), and — critically — built CI-integrated evaluation pipelines in Python/Jupyter so every model change gets adversarial-prompted and similarity-scored before reaching production.",
      es: "Integré GPT-4.1 Nano directamente en la plataforma vía la API de OpenAI con prompts estructurados y respuestas en streaming, orquesté la API de WhatsApp Cloud con Bull + Redis (23 tipos de evento, reintentos exponenciales, webhooks firmados HMAC) y, fundamentalmente, construí pipelines de evaluación integrados en CI con Python/Jupyter para que cada cambio del modelo se someta a prompts adversariales y métricas de similitud antes de llegar a producción.",
    },
    outcome: {
      en: "The assistant ships live to internal users via WhatsApp. Token-cost is tracked per response; rate limits and refusal patterns are tested every deploy. The tasks module (Kanban with dynamic scoring + 5-level RBAC + state machine) is covered by unit, integration (Jest, Supertest), and end-to-end tests.",
      es: "El asistente está en producción para usuarios internos vía WhatsApp. Se monitorea el costo por respuesta; los límites y patrones de rechazo se prueban en cada despliegue. El módulo de tareas (Kanban con scoring dinámico + RBAC de 5 niveles + máquina de estados) está cubierto por pruebas unitarias, de integración (Jest, Supertest) y end-to-end.",
    },
    role: {
      en: [
        "Owned the LLM integration end-to-end — prompt design, streaming, token-cost control",
        "Built the evaluation pipeline (datasets, judge model, regression suite in CI)",
        "Designed and implemented the tasks module (Kanban + RBAC + state machine)",
        "Orchestrated the WhatsApp event-driven layer with Bull + Redis",
        "Hardened deliverable uploads (MIME whitelist + magic-byte check + signed S3 URLs)",
      ],
      es: [
        "Propiedad end-to-end de la integración con LLM — diseño de prompts, streaming, control de costos",
        "Construí el pipeline de evaluación (datasets, modelo juez, regresiones en CI)",
        "Diseñé e implementé el módulo de tareas (Kanban + RBAC + máquina de estados)",
        "Orquesté la capa event-driven de WhatsApp con Bull + Redis",
        "Endurecí las cargas de entregables (whitelist MIME + magic bytes + URLs firmadas en S3)",
      ],
    },
  },
  {
    id: "ecommerce-ai",
    problem: {
      en: "A Wookky client running an e-commerce platform wanted product recommendations that felt conversational, not algorithmic — and they wanted confidence that the model wouldn't recommend out-of-stock items, drift across deploys, or fabricate product attributes. Standard recommendation engines fell short on the conversational layer; an unevaluated LLM was a risk.",
      es: "Un cliente de Wookky con una plataforma de e-commerce quería recomendaciones de productos que se sintieran conversacionales, no algorítmicas — y necesitaba confianza en que el modelo no recomendaría productos agotados, no derivaría entre despliegues ni inventaría atributos. Los motores estándar quedaban cortos en la capa conversacional; un LLM sin evaluar era un riesgo.",
    },
    approach: {
      en: "I co-built the backend (REST/GraphQL services in Node + Python) and led the evaluation strategy: a curated dataset of real customer questions, similarity metrics against grounded product data, adversarial prompts targeting hallucination patterns, and regression runs in CI. The product-recommendation flow only ships if the eval suite passes.",
      es: "Co-construí el backend (servicios REST/GraphQL en Node + Python) y lideré la estrategia de evaluación: dataset curado con preguntas reales de clientes, métricas de similitud contra datos reales de productos, prompts adversariales apuntando a patrones de alucinación y corridas de regresión en CI. El flujo de recomendación solo se despliega si la batería pasa.",
    },
    outcome: {
      en: "Recommendation responses passed the eval suite consistently across model and prompt changes. Hallucination patterns surfaced early in CI (instead of in customer support tickets). The pattern became the template I later refined for WISO.",
      es: "Las respuestas de recomendación pasaron la batería de evaluación de forma consistente entre cambios de modelo y prompt. Los patrones de alucinación se detectaban temprano en CI (en lugar de tickets de soporte). Este patrón fue la plantilla que después refiné para WISO.",
    },
    role: {
      en: [
        "Co-developed backend services (Node.js + Django/FastAPI, PostgreSQL + MongoDB)",
        "Led LLM evaluation strategy: dataset curation, judge prompts, CI integration",
        "QA automation for the broader platform (Selenium, Cypress, Playwright)",
        "API contract tests with Postman, Newman, JMeter",
        "Mentored junior QA on LLM-eval best practices",
      ],
      es: [
        "Co-desarrollé servicios backend (Node.js + Django/FastAPI, PostgreSQL + MongoDB)",
        "Lideré la estrategia de evaluación de LLM: curaduría de dataset, prompts juez, integración CI",
        "Automatización QA para la plataforma (Selenium, Cypress, Playwright)",
        "Pruebas de contrato de API con Postman, Newman, JMeter",
        "Mentoría a QA junior en buenas prácticas de evaluación de LLM",
      ],
    },
  },
  {
    id: "kairos",
    problem: {
      en: "La Pollera Colorá — a Colombian restaurant — runs operations on paper, calculators, and a single person's head. Pedidos shouted across rooms; inventory counted on hand-written sheets; cash close takes 30-45 minutes; lost orders; no way to detect inventory loss until it has already happened. Existing restaurant SaaS options are either expensive, require constant internet (the restaurant's connection drops weekly), or hard for a non-technical 30-min trained staff to operate.",
      es: "La Pollera Colorá — un restaurante colombiano — opera con papel, calculadora y la cabeza de una sola persona. Pedidos gritados entre salas; inventario en hojas escritas a mano; el cierre de caja toma 30-45 minutos; órdenes perdidas; sin manera de detectar pérdidas hasta que ya ocurrieron. Las opciones SaaS existentes son caras, exigen internet constante (la conexión del local se cae semanalmente) o son difíciles para personal entrenado en 30 minutos.",
    },
    approach: {
      en: "I'm building Kairos as a solo, white-label restaurant SaaS — modular monolith (Java 21 + Spring Boot 3), multi-tenant by tenant_id, Next.js 15 frontend, offline-first PWA (IndexedDB + WebSocket-over-LAN sync). 8 modules planned across 18 months: POS → Inventory → Compras → Caja → Nómina → Contabilidad → Reportes → Domicilios (with WhatsApp + AI delivery agent in EP-08). Architecture decisions live in ADRs; domain language in a glossary; product backlog in GitHub Issues.",
      es: "Estoy construyendo Kairos como SaaS white-label para restaurantes en solitario — monolito modular (Java 21 + Spring Boot 3), multi-tenant por tenant_id, frontend Next.js 15, PWA offline-first (IndexedDB + sync por WebSocket en LAN). 8 módulos planeados en 18 meses: POS → Inventario → Compras → Caja → Nómina → Contabilidad → Reportes → Domicilios (con agente IA de domicilios por WhatsApp en EP-08). Decisiones arquitectónicas en ADRs; lenguaje de dominio en un glosario; backlog en GitHub Issues.",
    },
    outcome: {
      en: "Sprint 0 (planning + documentation) is complete as of May 2026 — vision charter, impact map, stakeholder map, business rules, NFRs, 102-term domain glossary, Stitch UI designs, design system, 126 GitHub issues across 8 milestones. First functional POS milestone planned for September 2026. La Pollera Colorá is the first tenant and reference example; system is designed white-label from day zero so other restaurants can onboard with config, not code.",
      es: "Sprint 0 (planeación + documentación) completo a mayo de 2026 — visión, impact map, stakeholders, reglas de negocio, NFRs, glosario de dominio con 102 términos, diseños UI en Stitch, design system, 126 issues en GitHub distribuidas en 8 milestones. Primer hito funcional (POS) planeado para septiembre de 2026. La Pollera Colorá es el primer tenant y referencia; el sistema es white-label desde el día cero — otros restaurantes pueden incorporarse con configuración, no código.",
    },
    role: {
      en: [
        "Sole architect and developer — backend, frontend, infra, documentation",
        "Designed the 102-term domain glossary (DDD ubiquitous language)",
        "Wrote vision charter, stakeholder map, business rules, NFRs",
        "Chose modular monolith over microservices (right-sized for solo dev)",
        "Planning 8-module roadmap across 18 months",
      ],
      es: [
        "Único arquitecto y desarrollador — backend, frontend, infraestructura, documentación",
        "Diseñé el glosario de dominio de 102 términos (lenguaje ubicuo DDD)",
        "Escribí la carta de visión, mapa de stakeholders, reglas de negocio, NFRs",
        "Elegí monolito modular sobre microservicios (escalado correcto para solo-dev)",
        "Roadmap de 8 módulos planeado en 18 meses",
      ],
    },
  },
  {
    id: "llm-eval-starter",
    problem: {
      en: "Teams shipping LLM features in production keep reinventing the same evaluation harness — YAML cases, LLM-as-judge, CI integration. Most existing eval frameworks (DeepEval, Promptfoo, Inspect AI) are powerful but heavy to adopt. I wanted a minimal starter people could clone, read in one sitting, and adapt in 30 minutes — the kind of thing I would have wanted when I first set this up at WISO.",
      es: "Los equipos que llevan features de LLM a producción reinventan la misma estructura de evaluación — casos en YAML, LLM-como-juez, integración con CI. La mayoría de frameworks existentes (DeepEval, Promptfoo, Inspect AI) son potentes pero pesados de adoptar. Quería un starter mínimo que se pudiera clonar, leer en una sentada y adaptar en 30 minutos — el tipo de cosa que me hubiera servido cuando empecé esto en WISO.",
    },
    approach: {
      en: "I extracted the structure of WISO's eval pipeline — without any client data — and packaged it as a public template. The starter has multi-provider judge (OpenAI + Anthropic), endpoint auto-detection (SSE + JSON), retry with exponential backoff, baseline regression detection, three report formats (JSON / HTML / Markdown), and Vitest tests for the parser and diff logic. Total: ~600 lines of TypeScript, runnable in 5 commands.",
      es: "Extraje la estructura del pipeline de evaluación de WISO — sin ningún dato de cliente — y la empaqueté como plantilla pública. El starter incluye juez multi-proveedor (OpenAI + Anthropic), auto-detección de endpoint (SSE + JSON), reintentos con backoff exponencial, detección de regresiones contra baseline, tres formatos de reporte (JSON / HTML / Markdown), y tests con Vitest para el parser y la lógica de diff. Total: ~600 líneas de TypeScript, ejecutable en 5 comandos.",
    },
    outcome: {
      en: "Published as github.com/Johan-73/llm-eval-starter. It's the same code (sanitized) that runs the eval suite on this portfolio's chat assistant — so the starter is dogfooded in production. The full version (with WISO-specific cases) stays internal.",
      es: "Publicado como github.com/Johan-73/llm-eval-starter. Es el mismo código (sanitizado) que ejecuta la batería de evaluación del asistente de este portafolio — el starter está dogfooded en producción. La versión completa (con casos específicos de WISO) permanece interna.",
    },
    role: {
      en: [
        "Extracted the pattern from the internal WISO pipeline",
        "Sanitized all client-specific data",
        "Wrote the README in the voice of a tired engineer who's seen evals go wrong",
        "Open-sourced as a public GitHub repo, no formal license declared yet",
        "Dogfooded on the chat assistant of this portfolio",
      ],
      es: [
        "Extraje el patrón del pipeline interno de WISO",
        "Sanitizé todos los datos específicos del cliente",
        "Escribí el README desde la voz de un ingeniero cansado que ha visto evals fallar",
        "Repositorio público en GitHub, sin licencia formal declarada todavía",
        "Dogfooded en el asistente de chat de este portafolio",
      ],
    },
    links: [{ label: "GitHub repo", url: "https://github.com/Johan-73/llm-eval-starter" }],
  },
];

export function getCaseStudy(id: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.id === id);
}
