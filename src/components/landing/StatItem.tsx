import { useCountUp } from "@/hooks/useCountUp";
import { STATS } from "@/constants/landing";

export function StatItem({
  stat,
  delay,
}: {
  stat: (typeof STATS)[number];
  delay: string;
}) {
  const { ref, value } = useCountUp(stat.count, stat.suffix ?? "");

  return (
    <div className={`stat reveal${delay ? ` ${delay}` : ""}`}>
      <div ref={ref} className="num">
        {stat.count === null ? stat.display : value}
      </div>
      <div className="lbl">{stat.label}</div>
    </div>
  );
}
