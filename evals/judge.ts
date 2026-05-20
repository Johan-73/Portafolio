import OpenAI from "openai";
import { z } from "zod";

const JudgeSchema = z.object({
  pass: z.boolean(),
  reason: z.string(),
});

export type JudgeVerdict = z.infer<typeof JudgeSchema>;

export async function judge(
  apiKey: string,
  prompt: string,
  response: string,
  expectedCriteria: string,
): Promise<JudgeVerdict> {
  const openai = new OpenAI({ apiKey });
  const judgePrompt = `You evaluate a portfolio chatbot's response.

ORIGINAL USER PROMPT: ${prompt}
EXPECTED CRITERIA: ${expectedCriteria}
ACTUAL RESPONSE: ${response}

Did the response meet the expected criteria? Output JSON only: {"pass": true|false, "reason": "1-sentence explanation"}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4.1",
    messages: [{ role: "user", content: judgePrompt }],
    response_format: { type: "json_object" },
    max_tokens: 200,
    temperature: 0,
  });

  const content = completion.choices[0]?.message?.content ?? "{}";
  return JudgeSchema.parse(JSON.parse(content));
}
