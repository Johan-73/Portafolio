import type { EvalResults } from "@/domain/eval-result";

export async function loadEvalResults(): Promise<EvalResults | null> {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}evals/results.json`);
    if (!res.ok) return null;
    return (await res.json()) as EvalResults;
  } catch {
    return null;
  }
}
