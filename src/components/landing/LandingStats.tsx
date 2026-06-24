"use client";

import { STATS } from "@/constants/landing";
import { StatItem } from "./StatItem";

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
