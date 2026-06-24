import { useCountUp } from "@/hooks/useCountUp";
import { STATS } from "@/constants/landing";

type Stat = (typeof STATS)[number];

export function StatItem({ stat }: { stat: Stat }) {
  const { ref, value } = useCountUp(stat.count, stat.suffix ?? "");

  return (
    <div className={`stat reveal${stat.delay ? ` ${stat.delay}` : ""}`}>
      <div ref={ref} className="num">
        {stat.count === null ? stat.display : value}
      </div>
      <div className="lbl">{stat.label}</div>
    </div>
  );
}
