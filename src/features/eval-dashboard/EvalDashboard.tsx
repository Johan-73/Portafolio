import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MetricCard } from "./MetricCard";
import { EvalTable } from "./EvalTable";
import { MonoLabel } from "@/shared/components/MonoLabel";
import { loadEvalResults } from "@/infrastructure/eval-loader";
import type { EvalResults } from "@/domain/eval-result";

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diff / 3_600_000);
  if (hours < 1) return "JUST NOW";
  if (hours < 24) return `${hours}H AGO`;
  return `${Math.floor(hours / 24)}D AGO`;
}

export function EvalDashboard() {
  const { t } = useTranslation();
  const [data, setData] = useState<EvalResults | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvalResults().then((d) => {
      setData(d);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <section id="evals" className="py-20 md:py-28 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <MonoLabel color="muted">[ LOADING EVAL RESULTS… ]</MonoLabel>
        </div>
      </section>
    );
  }

  if (!data) return null;

  const allPassing = data.passRate.passing === data.passRate.total;

  return (
    <section id="evals" className="py-20 md:py-28 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="font-display text-4xl md:text-5xl font-medium text-center mb-3">
          {t("evals.title")}
        </h2>
        <p className="text-center text-foreground/60 mb-12">{t("evals.subtitle")}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <MetricCard
            label={t("evals.metrics.passRate")}
            value={`${data.passRate.passing}/${data.passRate.total}`}
            badge={{
              text: allPassing ? "PASSING" : "ATTENTION",
              tone: allPassing ? "pass" : "fail",
            }}
          />
          <MetricCard
            label={t("evals.metrics.p50")}
            value={`${(data.latencyP50Ms / 1000).toFixed(1)}s`}
          />
          <MetricCard
            label={t("evals.metrics.p95")}
            value={`${(data.latencyP95Ms / 1000).toFixed(1)}s`}
          />
          <MetricCard
            label={t("evals.metrics.cost")}
            value={`$${data.avgCostPerMessage.toFixed(4)}`}
          />
        </div>

        <EvalTable cases={data.cases} />

        <div className="mt-6 flex justify-between items-center flex-wrap gap-2">
          <MonoLabel color="cyan">
            {t("evals.lastEvaluated")} {timeAgo(data.runAt)} · {new Date(data.runAt).toISOString().slice(0, 16).replace("T", " ")} UTC
          </MonoLabel>
          <div className="flex gap-4 flex-wrap">
            <a
              href={`${import.meta.env.BASE_URL}evals/results.json`}
              target="_blank"
              rel="noreferrer noopener"
              className="font-mono text-xs uppercase tracking-wider text-violet hover:underline"
            >
              View raw JSON →
            </a>
            <a
              href="https://github.com/Johan-73/llm-eval-starter#readme"
              target="_blank"
              rel="noreferrer noopener"
              className="font-mono text-xs uppercase tracking-wider text-violet hover:underline"
            >
              {t("evals.viewMethodology")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
