const TILES = [
  {
    wide: true,
    icon: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M9 4v16M15 4v16" />
      </>
    ),
    title: "Boards & sprints — the Jira you'll actually enjoy",
    desc: "Drag-and-drop Kanban, epics, story points, dependencies and a real Gantt roadmap. Fast keyboard-first navigation throughout.",
    delay: "",
  },
  {
    wide: false,
    icon: (
      <>
        <path d="M6 3h8l4 4v14H6z" />
        <path d="M14 3v4h4" />
        <path d="M9 12h6M9 16h6" />
      </>
    ),
    title: "Docs & wikis",
    desc: "Block-based docs that link straight to tasks. Like Notion, minus the lag.",
    delay: "d1",
  },
  {
    wide: false,
    icon: <path d="M4 5h16v11H9l-4 3.5V16H4z" />,
    title: "Team chat",
    desc: "Channels, threads, mentions and reactions — with AI summaries built in.",
    delay: "",
  },
  {
    wide: false,
    icon: <path d="M13 3 5 13h6l-1 8 8-10h-6z" />,
    title: "No-code automations",
    desc: "IF this THEN that. Notify, assign, escalate and move work automatically.",
    delay: "d1",
  },
  {
    wide: true,
    icon: (
      <>
        <circle cx="11" cy="11" r="6.5" />
        <path d="M20 20l-3.6-3.6" />
      </>
    ),
    title: "Search & insights across everything",
    desc: "Ask in plain language and find any task, doc or message instantly. Velocity, burndown and workload analytics, always up to date.",
    delay: "d2",
  },
];

export function LandingBento() {
  return (
    <section className="section" id="features" style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="section-head reveal">
          <div className="eyebrow">One workspace</div>
          <h2 className="h2">Everything your team needs, together</h2>
          <p className="lead">
            Stop paying for — and switching between — three tools. NexTask
            brings tasks, docs and chat into one fast, beautiful place.
          </p>
        </div>
        <div className="bento">
          {TILES.map((tile) => (
            <div
              key={tile.title}
              className={`tile reveal${tile.delay ? ` ${tile.delay}` : ""}${tile.wide ? " wide" : ""}`}
            >
              <div className="ic">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {tile.icon}
                </svg>
              </div>
              <h4>{tile.title}</h4>
              <p>{tile.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
