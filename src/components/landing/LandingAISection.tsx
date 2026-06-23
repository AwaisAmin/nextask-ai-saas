"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const ROWS = [
  { who: "Lena", color: "#4CA6FF", before: 92, after: 60, tag: "overloaded" },
  { who: "Dev", color: "#F5B23E", before: 30, after: 58, tag: "has room" },
  { who: "Omar", color: "#36C58E", before: 45, after: 49, tag: "" },
];

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
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6z" />
              </svg>
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
              {[
                {
                  icon: <rect x="3" y="4" width="18" height="16" rx="2" />,
                  extra: <path d="M9 4v16M15 4v16" />,
                  title: "Plans sprints for you",
                  desc: '"Plan the next sprint" → tasks created, prioritized, assigned by skill and availability.',
                },
                {
                  icon: <path d="M4 5h16v11H9l-4 3.5V16H4z" />,
                  title: "Turns meetings into action",
                  desc: "Paste notes → the agent extracts action items, owners and due dates automatically.",
                },
                {
                  icon: <path d="M13 3 5 13h6l-1 8 8-10h-6z" />,
                  title: "Keeps everyone unblocked",
                  desc: "Daily standups, workload rebalancing, at-risk flags — delivered before you ask.",
                },
              ].map(({ icon, extra, title, desc }) => (
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
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6z" />
              </svg>
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
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6z" />
                  </svg>
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
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12.5l4.5 4.5L19 7" />
                  </svg>
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
