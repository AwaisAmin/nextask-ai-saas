"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, CheckIcon, PlayIcon, SparkIcon } from "@/icons";
import { AI_CARDS, PROMPT, STEPS, type AiCard } from "@/constants/landing";

export const LandingHero = () => {
  const [cmdText, setCmdText] = useState("");
  const [steps, setSteps] = useState([false, false, false]);
  const [cmdOpacity, setCmdOpacity] = useState(1);
  const [aiCards, setAiCards] = useState<AiCard[]>([]);
  const [todoCount, setTodoCount] = useState(2);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    const runDemo = async () => {
      while (!cancelled) {
        setCmdText("");
        setSteps([false, false, false]);
        setCmdOpacity(1);
        setAiCards([]);
        setTodoCount(2);
        await sleep(900);
        if (cancelled) break;

        for (let i = 0; i <= PROMPT.length; i++) {
          if (cancelled) break;
          setCmdText(PROMPT.slice(0, i));
          await sleep(38);
        }
        await sleep(450);
        if (cancelled) break;

        for (let i = 0; i < 3; i++) {
          if (cancelled) break;
          setSteps((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
          await sleep(620);
        }
        await sleep(350);
        if (cancelled) break;

        setCmdOpacity(0);
        await sleep(420);
        if (cancelled) break;

        for (let i = 0; i < AI_CARDS.length; i++) {
          if (cancelled) break;
          const card = AI_CARDS[i];
          setAiCards((prev) => [card, ...prev]);
          setTodoCount(2 + i + 1);
          await sleep(420);
        }

        await sleep(2600);
      }
    };

    runDemo();
    return () => {
      cancelled = true;
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
          <Button asChild variant="primary" size="lg">
            <Link href="/register">
              Start free
              <ArrowRightIcon size={17} />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <Link href="#features">
              <PlayIcon size={16} />
              Watch the demo
            </Link>
          </Button>
        </div>

        <div className="hero-note reveal in d3">
          Free forever for small teams · No credit card required
        </div>
      </div>

      {/* Browser Mock */}
      <div className="wrap showcase reveal in d2">
        <div className="browser">
          <div className="browser-bar">
            <span className="tdot bg-[#ff5c66]" />
            <span className="tdot bg-[#f5b23e]" />
            <span className="tdot bg-[#36c58e]" />
            <div className="browser-url">app.nextask.com/acme-studio/board</div>
          </div>
          <div className="browser-body">
            <div className="mini">
              {/* Sidebar */}
              <div className="mini-side">
                <div className="ws">
                  <span>N</span>
                  <div className="text-xs font-semibold">Acme Studio</div>
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
                      <span className="text-(--text-3)">{todoCount}</span>
                    </h5>
                    {aiCards.map((c) => (
                      <div key={c.id} className="mini-card fresh relative">
                        <span className="ai-spark">
                          <SparkIcon
                            size={9}
                            strokeWidth={2.4}
                            stroke="#1a0e06"
                          />
                        </span>
                        <div className="id">{c.id}</div>
                        <div className="ttl">{c.title}</div>
                        <div className="foot">
                          <span className="mini-bars">
                            <span
                              className={`h-1.25 ${c.bars[0] ? "bg-(--p-high)" : "bg-(--border-2)"}`}
                            />
                            <span
                              className={`h-1.5  ${c.bars[1] ? "bg-(--p-high)" : "bg-(--border-2)"}`}
                            />
                            <span
                              className={`h-2.25 ${c.bars[2] ? "bg-(--p-high)" : "bg-(--border-2)"}`}
                            />
                          </span>
                          {/* c.color is data-driven — must stay inline */}
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
                          <span className="h-1.25 bg-(--p-low)" />
                          <span className="h-1.5  bg-(--border-2)" />
                          <span className="h-2.25 bg-(--border-2)" />
                        </span>
                        <span className="mini-ava bg-[#4ca6ff]" />
                      </div>
                    </div>
                    <div className="mini-card">
                      <div className="id">WEB-55</div>
                      <div className="ttl">Migrate blog to new CMS</div>
                      <div className="foot">
                        <span className="mini-bars">
                          <span className="h-1.25 bg-(--p-medium)" />
                          <span className="h-1.5  bg-(--p-medium)" />
                          <span className="h-2.25 bg-(--border-2)" />
                        </span>
                        <span className="mini-ava bg-[#7b61ff]" />
                      </div>
                    </div>
                  </div>

                  {/* In Progress */}
                  <div className="mini-col">
                    <h5>
                      In progress <span className="text-(--text-3)">2</span>
                    </h5>
                    <div className="mini-card relative">
                      <span className="ai-spark">
                        <SparkIcon
                          size={9}
                          strokeWidth={2.4}
                          stroke="#1a0e06"
                        />
                      </span>
                      <div className="id">WEB-41</div>
                      <div className="ttl">Redesign homepage hero</div>
                      <div className="foot">
                        <span className="mini-bars">
                          <span className="h-1.25 bg-(--p-high)" />
                          <span className="h-1.5  bg-(--p-high)" />
                          <span className="h-2.25 bg-(--p-high)" />
                        </span>
                        <span className="mini-ava bg-[#ff8a4c]" />
                      </div>
                    </div>
                    <div className="mini-card">
                      <div className="id">WEB-38</div>
                      <div className="ttl">Responsive nav + mega-menu</div>
                      <div className="foot">
                        <span className="mini-bars">
                          <span className="h-1.25 bg-(--p-high)" />
                          <span className="h-1.5  bg-(--p-high)" />
                          <span className="h-2.25 bg-(--p-high)" />
                        </span>
                        <span className="mini-ava bg-[#4ca6ff]" />
                      </div>
                    </div>
                  </div>

                  {/* Done */}
                  <div className="mini-col">
                    <h5>
                      Done <span className="text-(--text-3)">1</span>
                    </h5>
                    <div className="mini-card opacity-60">
                      <div className="id">WEB-29</div>
                      <div className="ttl">Audit design tokens</div>
                      <div className="foot">
                        <span className="mini-bars">
                          <span className="h-1.25 bg-(--p-low)" />
                          <span className="h-1.5  bg-(--border-2)" />
                          <span className="h-2.25 bg-(--border-2)" />
                        </span>
                        <span className="mini-ava bg-[#ff8a4c]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Command Overlay — opacity is animated state, must stay inline */}
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
                        <CheckIcon size={9} strokeWidth={3} />
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
};
