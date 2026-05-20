import { GlassPanel } from "@/shared/components/GlassPanel";
import { MonoLabel } from "@/shared/components/MonoLabel";

interface MetricCardProps {
  label: string;
  value: string;
  badge?: { text: string; tone: "pass" | "fail" | "neutral" };
}

export function MetricCard({ label, value, badge }: MetricCardProps) {
  const badgeColor =
    badge?.tone === "pass" ? "phosphor" : badge?.tone === "fail" ? "danger" : "cyan";
  const badgeBg =
    badge?.tone === "pass"
      ? "bg-phosphor/10"
      : badge?.tone === "fail"
        ? "bg-danger/10"
        : "bg-cyan/10";

  return (
    <GlassPanel className="p-5">
      <MonoLabel color="muted">{label}</MonoLabel>
      <p className="font-display text-3xl md:text-4xl font-medium text-foreground mt-2">{value}</p>
      {badge && (
        <div className="mt-3">
          <MonoLabel color={badgeColor} className={`${badgeBg} px-2 py-0.5 rounded-full`}>
            [ {badge.text} ]
          </MonoLabel>
        </div>
      )}
    </GlassPanel>
  );
}
