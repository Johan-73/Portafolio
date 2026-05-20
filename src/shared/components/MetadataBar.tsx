import { MonoLabel } from "./MonoLabel";

interface MetadataItem {
  label?: string;
  value: string;
  color?: "cyan" | "violet" | "phosphor" | "muted";
}

interface MetadataBarProps {
  items: MetadataItem[];
}

export function MetadataBar({ items }: MetadataBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 py-2 text-center">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          {item.label && <MonoLabel color="muted">{item.label}</MonoLabel>}
          <MonoLabel color={item.color ?? "cyan"}>{item.value}</MonoLabel>
          {i < items.length - 1 && <MonoLabel color="muted">·</MonoLabel>}
        </div>
      ))}
    </div>
  );
}
