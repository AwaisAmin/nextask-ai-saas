"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const PROMPT = "Plan the website redesign sprint";

const AI_CARDS = [
  {
    id: "WEB-61",
    title: "Define hero messaging",
    color: "#FF8A4C",
    bars: [true, true, true],
  },
  {
    id: "WEB-62",
    title: "Build hero component",
    color: "#4CA6FF",
    bars: [true, true, false],
  },
  {
    id: "WEB-63",
    title: "Compress media assets",
    color: "#7B61FF",
    bars: [true, true, false],
  },
] as const;

type AiCard = (typeof AI_CARDS)[number];

const STEPS = [
  "Reading project context",
  "Checking team workload",
  "Creating 3 tasks & assigning",
];

const CheckIcon = () => (
  <svg
    width="9"
    height="9"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12.5l4.5 4.5L19 7" />
  </svg>
);

const SparkIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6z" />
  </svg>
);

export function LandingHero() {
  const [cmdText, setCmdText] = useState("");
  const [steps, setSteps] = useState([false, false, false]);
  const [cmdOpacity, setCmdOpacity] = useState(1);
  const [aiCards, setAiCards] = useState<AiCard[]>([]);
  const [todoCount, setTodoCount] = useState(2);
  const cancelRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cancelRef.current = false;

    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    async function runDemo() {
      while (!cancelRef.current) {
        setCmdText("");
        setSteps([false, false, false]);
        setCmdOpacity(1);
        setAiCards([]);
        setTodoCount(2);
        await sleep(900);
        if (cancelRef.current) break;

        for (let i = 0; i <= PROMPT.length; i++) {
          if (cancelRef.current) break;
          setCmdText(PROMPT.slice(0, i));
          await sleep(38);
        }
        await sleep(450);
        if (cancelRef.current) break;

        for (let i = 0; i < 3; i++) {
          if (cancelRef.current) break;
          setSteps((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
          await sleep(620);
        }
        await sleep(350);
        if (cancelRef.current) break;

        setCmdOpacity(0);
        await sleep(420);
        if (cancelRef.current) break;

        for (let i = 0; i < AI_CARDS.length; i++) {
          if (cancelRef.current) break;
          const card = AI_CARDS[i];
          setAiCards((prev) => [card, ...prev]);
          setTodoCount(2 + i + 1);
          await sleep(420);
        }

        await sleep(2600);
      }
    }

    runDemo();
    return () => {
      cancelRef.current = true;
    };
  }, []);

  return (
    <header className="hero">
      <div className="glow glow-1" />
      <div className="glow glow-2" />
      <div className="glow glow-3" />

      <div className="wrap hero-inner">
        <div className="pill-tag reveal in">
          <span className="dot">
            <SparkIcon size={11} />
          </span>
          Meet your AI teammate — <b>now in NexTask</b>
        </div>

        <h1 className="reveal in">
          Projects, docs &amp; chat.
          <br />
          Run by an <span className="grad">AI teammate.</span>
        </h1>

        <p className="sub reveal in d1">
          NexTask replaces Jira, Notion and Slack with one calm workspace — and
          an AI Agent that actually does the work: plans sprints, assigns by
          skill, turns meetings into tasks, and keeps everyone unblocked.
        </p>

        <div className="hero-cta reveal in d2">
          <Link className="btn btn-primary btn-lg" href="/register">
            Start free
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
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
          <Link className="btn btn-ghost btn-lg" href="#features">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            Watch the demo
          </Link>
        </div>

        <div className="hero-note reveal in d3">
          Free forever for small teams · No credit card required
        </div>
      </div>

      {/* Browser Mock */}
      <div className="wrap showcase reveal in d2">
        <div className="browser">
          <div className="browser-bar">
            <span className="tdot" style={{ background: "#ff5c66" }} />
            <span className="tdot" style={{ background: "#f5b23e" }} />
            <span className="tdot" style={{ background: "#36c58e" }} />
            <div className="browser-url">app.nextask.com/acme-studio/board</div>
          </div>
          <div className="browser-body">
            <div className="mini">
              {/* Sidebar */}
              <div className="mini-side">
                <div className="ws">
                  <span>N</span>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>
                    Acme Studio
                  </div>
                </div>
                <div className="mini-ai">
                  <SparkIcon size={13} />
                  Ask AI Agent
                </div>
                <div className="mini-nav active">
                  <i />
                  Home
                </div>
                <div className="mini-nav">
                  <i />
                  Roadmap
                </div>
                <div className="mini-nav">
                  <i />
                  Messages
                </div>
                <div className="mini-nav">
                  <i />
                  Docs
                </div>
              </div>

              {/* Kanban */}
              <div className="mini-main">
                <div className="mini-cols">
                  {/* Todo */}
                  <div className="mini-col">
                    <h5>
                      To do
                      <span style={{ color: "var(--text-3)" }}>
                        {todoCount}
                      </span>
                    </h5>
                    {aiCards.map((c) => (
                      <div
                        key={c.id}
                        className="mini-card fresh"
                        style={{ position: "relative" }}
                      >
                        <span className="ai-spark">
                          <svg
                            width="9"
                            height="9"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#1a0e06"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6z" />
                          </svg>
                        </span>
                        <div className="id">{c.id}</div>
                        <div className="ttl">{c.title}</div>
                        <div className="foot">
                          <span className="mini-bars">
                            <span
                              style={{
                                height: 5,
                                background: c.bars[0]
                                  ? "var(--p-high)"
                                  : "var(--border-2)",
                              }}
                            />
                            <span
                              style={{
                                height: 6,
                                background: c.bars[1]
                                  ? "var(--p-high)"
                                  : "var(--border-2)",
                              }}
                            />
                            <span
                              style={{
                                height: 9,
                                background: c.bars[2]
                                  ? "var(--p-high)"
                                  : "var(--border-2)",
                              }}
                            />
                          </span>
                          <span
                            className="mini-ava"
                            style={{ background: c.color }}
                          />
                        </div>
                      </div>
                    ))}
                    <div className="mini-card">
                      <div className="id">WEB-52</div>
                      <div className="ttl">Footer + newsletter capture</div>
                      <div className="foot">
                        <span className="mini-bars">
                          <span
                            style={{ height: 5, background: "var(--p-low)" }}
                          />
                          <span
                            style={{ height: 6, background: "var(--border-2)" }}
                          />
                          <span
                            style={{ height: 9, background: "var(--border-2)" }}
                          />
                        </span>
                        <span
                          className="mini-ava"
                          style={{ background: "#4ca6ff" }}
                        />
                      </div>
                    </div>
                    <div className="mini-card">
                      <div className="id">WEB-55</div>
                      <div className="ttl">Migrate blog to new CMS</div>
                      <div className="foot">
                        <span className="mini-bars">
                          <span
                            style={{ height: 5, background: "var(--p-medium)" }}
                          />
                          <span
                            style={{ height: 6, background: "var(--p-medium)" }}
                          />
                          <span
                            style={{ height: 9, background: "var(--border-2)" }}
                          />
                        </span>
                        <span
                          className="mini-ava"
                          style={{ background: "#7b61ff" }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* In Progress */}
                  <div className="mini-col">
                    <h5>
                      In progress{" "}
                      <span style={{ color: "var(--text-3)" }}>2</span>
                    </h5>
                    <div className="mini-card" style={{ position: "relative" }}>
                      <span className="ai-spark">
                        <svg
                          width="9"
                          height="9"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#1a0e06"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6z" />
                        </svg>
                      </span>
                      <div className="id">WEB-41</div>
                      <div className="ttl">Redesign homepage hero</div>
                      <div className="foot">
                        <span className="mini-bars">
                          <span
                            style={{ height: 5, background: "var(--p-high)" }}
                          />
                          <span
                            style={{ height: 6, background: "var(--p-high)" }}
                          />
                          <span
                            style={{ height: 9, background: "var(--p-high)" }}
                          />
                        </span>
                        <span
                          className="mini-ava"
                          style={{ background: "#ff8a4c" }}
                        />
                      </div>
                    </div>
                    <div className="mini-card">
                      <div className="id">WEB-38</div>
                      <div className="ttl">Responsive nav + mega-menu</div>
                      <div className="foot">
                        <span className="mini-bars">
                          <span
                            style={{ height: 5, background: "var(--p-high)" }}
                          />
                          <span
                            style={{ height: 6, background: "var(--p-high)" }}
                          />
                          <span
                            style={{ height: 9, background: "var(--p-high)" }}
                          />
                        </span>
                        <span
                          className="mini-ava"
                          style={{ background: "#4ca6ff" }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Done */}
                  <div className="mini-col">
                    <h5>
                      Done <span style={{ color: "var(--text-3)" }}>1</span>
                    </h5>
                    <div className="mini-card" style={{ opacity: 0.6 }}>
                      <div className="id">WEB-29</div>
                      <div className="ttl">Audit design tokens</div>
                      <div className="foot">
                        <span className="mini-bars">
                          <span
                            style={{ height: 5, background: "var(--p-low)" }}
                          />
                          <span
                            style={{ height: 6, background: "var(--border-2)" }}
                          />
                          <span
                            style={{ height: 9, background: "var(--border-2)" }}
                          />
                        </span>
                        <span
                          className="mini-ava"
                          style={{ background: "#ff8a4c" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Command Overlay */}
              <div
                className="mini-cmd"
                style={{
                  opacity: cmdOpacity,
                  transition: cmdOpacity === 0 ? "opacity .4s" : "none",
                }}
              >
                <div className="mini-cmd-top">
                  <span className="sp">
                    <SparkIcon size={17} />
                  </span>
                  <div className="mini-cmd-q">
                    <span>{cmdText}</span>
                    <span className="cursor" />
                  </div>
                </div>
                <div className="mini-cmd-steps">
                  {STEPS.map((step, i) => (
                    <div
                      key={step}
                      className={`mini-step${steps[i] ? " show" : ""}`}
                    >
                      <span className="ck">
                        <CheckIcon />
                      </span>
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
