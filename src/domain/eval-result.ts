export interface EvalCase {
  id: string;
  prompt: string;
  expectedCriteria: string;
  status: "pass" | "fail";
  judgeReason: string;
  judgeModel: string;
  latencyMs: number;
  tokenCost: number;
}

export interface EvalResults {
  runAt: string;
  passRate: { passing: number; total: number };
  latencyP50Ms: number;
  latencyP95Ms: number;
  avgCostPerMessage: number;
  cases: EvalCase[];
}
