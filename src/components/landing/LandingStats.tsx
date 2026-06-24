"use client";

import { STATS } from "@/constants/landing";
import { StatItem } from "./StatItem";

export function LandingStats() {
  return (
    <section className="section py-15">
      <div className="wrap">
        <div className="stats">
          {STATS.map((stat) => (
            <StatItem key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
