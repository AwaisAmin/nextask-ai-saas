"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { label: "Jira + Notion + Slack", display: "3 in 1", count: null },
  { label: "Less time on busywork", display: "0%", count: 40, suffix: "%" },
  {
    label: "From signup to first task",
    display: "0 min",
    count: 2,
    suffix: " min",
  },
  {
    label: "Teams onboard & counting",
    display: "0+",
    count: 12000,
    suffix: "+",
  },
];

function useCountUp(
  target: number | null,
  suffix: string = "",
  duration = 1300,
) {
  const [value, setValue] = useState(target === null ? "" : `0${suffix}`);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (target === null) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const t0 = performance.now();
            const fmt = (n: number) =>
              target >= 1000 ? Math.round(n).toLocaleString() : Math.round(n);
            const tick = (t: number) => {
              const p = Math.min(1, (t - t0) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setValue(`${fmt(target * eased)}${suffix}`);
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix, duration]);

  return { ref, value };
}

function StatItem({
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

const DELAYS = ["", "d1", "d2", "d3"];

export function LandingStats() {
  return (
    <section className="section" style={{ padding: "60px 0" }}>
      <div className="wrap">
        <div className="stats">
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} delay={DELAYS[i]} />
          ))}
        </div>
      </div>
    </section>
  );
}
