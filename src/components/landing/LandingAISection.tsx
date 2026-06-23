"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CheckIcon, SparkIcon } from "@/icons";
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
              {AI_FEATURES.map(({ icon, extra, title, desc }) => (
                <div key={title} className="feat-item">
                  <div className="feat-ic ai">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {icon}
                      {extra}
                    </svg>
                  </div>
                  <div>
                    <h4>{title}</h4>
                    <p>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              className="btn btn-ai btn-lg"
              href="#features"
              style={{ marginTop: 30 }}
            >
              <SparkIcon size={16} />
              See the agent in action
            </Link>
          </div>

          <div className="split-visual reveal d1">
            <div
              ref={cardRef}
              className="visual-card"
              style={{
                padding: 22,
                background:
                  "linear-gradient(160deg, color-mix(in oklab, var(--ai-a) 8%, var(--bg-1)), var(--bg-1))",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 18,
                }}
              >
                <span
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 9,
                    display: "grid",
                    placeItems: "center",
                    background:
                      "linear-gradient(120deg, var(--ai-a), var(--ai-b))",
                    color: "#1a0e06",
                    boxShadow: "var(--ai-glow)",
                  }}
                >
                  <SparkIcon size={17} />
                </span>
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                      background:
                        "linear-gradient(110deg, var(--ai-a), var(--ai-b))",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    AI AGENT
                  </div>
                  <div style={{ fontSize: 13, color: "var(--text-1)" }}>
                    Rebalance this sprint&apos;s workload
                  </div>
                </div>
              </div>

              {ROWS.map((r) => (
                <div key={r.who} style={{ marginBottom: 14 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 6,
                      fontSize: 12.5,
                    }}
                  >
                    <span
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <span
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          background: r.color,
                        }}
                      />
                      {r.who}
                    </span>
                    {r.tag && (
                      <span
                        style={{
                          fontSize: 10.5,
                          fontWeight: 700,
                          color:
                            r.tag === "overloaded"
                              ? "var(--danger)"
                              : "var(--ok)",
                        }}
                      >
                        {r.tag}
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      height: 7,
                      borderRadius: 99,
                      background: "var(--bg-4)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${animated ? r.after : r.before}%`,
                        borderRadius: 99,
                        background: r.color,
                        transition: "width 1s cubic-bezier(.2,.8,.2,1)",
                      }}
                    />
                  </div>
                </div>
              ))}

              <div
                style={{
                  opacity: animated ? 1 : 0,
                  transition: "opacity .4s",
                  marginTop: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  padding: "11px 13px",
                  borderRadius: 11,
                  background:
                    "color-mix(in oklab, var(--ai-a) 8%, var(--bg-2))",
                  border:
                    "1px solid color-mix(in oklab, var(--ai-a) 24%, var(--border))",
                  fontSize: 12.5,
                  color: "var(--text-1)",
                }}
              >
                <span style={{ color: "var(--ok)", display: "inline-flex" }}>
                  <CheckIcon size={15} strokeWidth={2.4} />
                </span>
                Moved{" "}
                <b style={{ color: "var(--text-0)", margin: "0 4px" }}>
                  WEB-52
                </b>{" "}
                from Lena → Dev to balance the sprint.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
