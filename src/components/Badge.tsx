import { Shift } from "@/lib/types";

export function Badge({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "brand" | "night" | "day" | "mid";
}) {
  const tones: Record<string, string> = {
    default: "bg-background text-muted border-border",
    brand: "bg-brand/10 text-brand-500 border-brand-500/30",
    night: "bg-indigo-500/10 text-indigo-500 border-indigo-500/30",
    day: "bg-amber-500/10 text-amber-600 border-amber-500/30",
    mid: "bg-teal-500/10 text-teal-600 border-teal-500/30",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function ShiftBadge({ shift }: { shift: Shift }) {
  const tone = shift === "Night" ? "night" : shift === "Day" ? "day" : "mid";
  return <Badge tone={tone}>{shift} Shift</Badge>;
}
