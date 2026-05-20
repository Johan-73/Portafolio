import type { Redis } from "@upstash/redis/cloudflare";

export interface RateLimitConfig {
  perIpDaily: number;
  globalDaily: number;
}

export type RateLimitResult =
  | { allowed: true; remainingForIp: number }
  | { allowed: false; reason: "per-ip" | "global"; remainingForIp: number };

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

const ONE_DAY_S = 86400;

export async function checkAndIncrement(
  redis: Redis,
  ip: string,
  config: RateLimitConfig,
): Promise<RateLimitResult> {
  const day = today();
  const ipKey = `rl:ip:${ip}:${day}`;
  const globalKey = `rl:global:${day}`;

  const ipCount = await redis.incr(ipKey);
  const globalCount = await redis.incr(globalKey);

  if (ipCount === 1) await redis.expire(ipKey, ONE_DAY_S);
  if (globalCount === 1) await redis.expire(globalKey, ONE_DAY_S);

  const remainingForIp = Math.max(0, config.perIpDaily - ipCount);

  if (ipCount > config.perIpDaily) return { allowed: false, reason: "per-ip", remainingForIp: 0 };
  if (globalCount > config.globalDaily) {
    return { allowed: false, reason: "global", remainingForIp };
  }
  return { allowed: true, remainingForIp };
}
