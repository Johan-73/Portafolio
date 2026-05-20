export interface SkillCategory {
  id: string;
  label: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    id: "backend",
    label: "BACKEND",
    items: ["Node.js", "Express", "NestJS", "Java", "Spring Boot", "Python", "FastAPI", "Django", "C# .NET"],
  },
  {
    id: "llm-integration",
    label: "LLM INTEGRATION",
    items: [
      "OpenAI API",
      "Function calling",
      "Embeddings & RAG",
      "Streaming",
      "Structured prompts",
      "Token / cost control",
    ],
  },
  {
    id: "llm-evaluation",
    label: "LLM EVALUATION",
    items: [
      "Jupyter",
      "Adversarial prompts",
      "Similarity metrics",
      "LLM-as-judge",
      "Regression suites",
      "Rate limiting",
    ],
  },
  {
    id: "databases",
    label: "DATABASES",
    items: ["PostgreSQL", "MySQL", "SQL Server", "MongoDB", "Redis", "Oracle", "SQLite"],
  },
  {
    id: "messaging",
    label: "MESSAGING & EVENTS",
    items: ["Bull", "Redis Queues", "Socket.IO", "Webhooks (HMAC)", "WhatsApp Cloud API", "Kafka"],
  },
  {
    id: "api",
    label: "API & PERFORMANCE",
    items: ["REST", "GraphQL", "Postman", "Newman", "JMeter", "Supertest", "Jest"],
  },
  {
    id: "devops",
    label: "DEVOPS & CLOUD",
    items: ["Docker", "Kubernetes", "AWS S3", "GitHub Actions", "Azure DevOps", "GitLab CI/CD", "Terraform"],
  },
  {
    id: "qa",
    label: "QA AUTOMATION",
    items: ["Cypress", "Selenium", "Playwright", "Appium", "Cucumber", "TestRail", "SonarQube"],
  },
];
