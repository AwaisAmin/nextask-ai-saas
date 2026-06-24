"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CheckIcon, OutlineIcon, SparkIcon } from "@/icons";
import { AI_FEATURES, ROWS } from "@/constants/landing";

export function LandingAISection() {
  const [animated, setAnimated] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setAnimated(true), 500);
            observer.unobserve(card);
          }
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section" id="ai">
      <div className="wrap">
        <div className="split">
          <div className="split-copy reveal">
            <div className="eyebrow ai">
              <SparkIcon size={14} />
              The AI Agent
            </div>
            <h2 className="h2">
              Not a chatbot.
              <br />A teammate that ships.
            </h2>
            <p className="lead">
              Press ⌘K and ask in plain language. The agent reads your
              workspace, makes a plan, and does the work — then shows you
              exactly what changed.
            </p>
            <div className="feat-list">
              {AI_FEATURES.map(({ icon, title, desc }) => (
                <div key={title} className="feat-item">
                  <div className="feat-ic ai">
                    <OutlineIcon size={18}>{icon}</OutlineIcon>
                  </div>
                  <div>
                    <h4>{title}</h4>
                    <p>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link className="btn btn-ai btn-lg mt-7.5" href="#features">
              <SparkIcon size={16} />
              See the agent in action
            </Link>
          </div>

          <div className="split-visual reveal d1">
            <div ref={cardRef} className="visual-card ai-vis-card">
              <div className="flex items-center gap-2.5 mb-4.5">
                <span className="ai-vis-icon">
                  <SparkIcon size={17} />
                </span>
                <div>
                  <div className="ai-vis-label">AI AGENT</div>
                  <div className="text-[13px] text-(--text-1)">
                    Rebalance this sprint&apos;s workload
                  </div>
                </div>
              </div>

              {ROWS.map((r) => (
                <div key={r.who} className="mb-3.5">
                  <div className="flex items-center justify-between mb-1.5 text-[12.5px]">
                    <span className="flex items-center gap-2">
                      {/* r.color is data-driven — must stay inline */}
                      <span
                        className="size-5 rounded-full shrink-0"
                        style={{ background: r.color }}
                      />
                      {r.who}
                    </span>
                    {r.tag && (
                      <span
                        className={`ai-vis-tag ${r.tag === "overloaded" ? "danger" : "ok"}`}
                      >
                        {r.tag}
                      </span>
                    )}
                  </div>
                  <div className="h-1.75 rounded-full bg-(--bg-4) overflow-hidden">
                    {/* width and background are animated/data-driven — must stay inline */}
                    <div
                      className="ai-vis-fill"
                      style={{
                        width: `${animated ? r.after : r.before}%`,
                        background: r.color,
                      }}
                    />
                  </div>
                </div>
              ))}

              {/* opacity is animated state — must stay inline */}
              <div
                className="ai-vis-result"
                style={{ opacity: animated ? 1 : 0 }}
              >
                <span className="text-(--ok) inline-flex">
                  <CheckIcon size={15} strokeWidth={2.4} />
                </span>
                Moved <b className="text-(--text-0) mx-1">WEB-52</b> from Lena →
                Dev to balance the sprint.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
