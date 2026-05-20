import { GlassPanel } from "@/shared/components/GlassPanel";
import { MonoLabel } from "@/shared/components/MonoLabel";
import type { EvalCase } from "@/domain/eval-result";
import { useTranslation } from "react-i18next";

interface EvalTableProps {
  cases: EvalCase[];
}

export function EvalTable({ cases }: EvalTableProps) {
  const { t } = useTranslation();
  const headers = [
    t("evals.table.id"),
    t("evals.table.prompt"),
    t("evals.table.expected"),
    t("evals.table.status"),
    t("evals.table.judge"),
  ];

  return (
    <GlassPanel className="p-0 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/5">
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 text-left">
                <MonoLabel color="muted">{h}</MonoLabel>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cases.map((c) => (
            <tr
              key={c.id}
              className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
            >
              <td className="px-4 py-3 font-mono text-xs text-cyan whitespace-nowrap">{c.id}</td>
              <td className="px-4 py-3 text-foreground/80 max-w-md">{c.prompt}</td>
              <td className="px-4 py-3 text-foreground/60 text-xs">{c.expectedCriteria}</td>
              <td className="px-4 py-3 whitespace-nowrap">
                {c.status === "pass" ? (
                  <MonoLabel
                    color="phosphor"
                    className="bg-phosphor/10 px-2 py-0.5 rounded-full"
                  >
                    ✓ PASS
                  </MonoLabel>
                ) : (
                  <MonoLabel color="danger" className="bg-danger/10 px-2 py-0.5 rounded-full">
                    ✗ FAIL
                  </MonoLabel>
                )}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-foreground/40">{c.judgeModel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </GlassPanel>
  );
}
