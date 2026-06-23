const QUOTES = [
  {
    text: "We cancelled Jira, Notion and Slack in the same week. The AI agent plans our sprints better than I do — and the whole team actually enjoys using it.",
    initials: "TB",
    name: "Theo Brandt",
    role: "Head of Product, Loop",
    gradient: "linear-gradient(150deg, #7b61ff, #4b3aa0)",
  },
  {
    text: "Setup took two minutes. By the end of day one we'd shipped our first sprint. The ⌘K agent feels like a senior PM that never sleeps.",
    initials: "SM",
    name: "Sara Malik",
    role: "Design Lead, Northwind",
    gradient: "linear-gradient(150deg, #ff8a4c, #b5552a)",
  },
  {
    text: "Automations + AI summaries cut our status-meeting time in half. Engineering finally has one source of truth.",
    initials: "OR",
    name: "Omar Reyes",
    role: "Eng Manager, Vertex",
    gradient: "linear-gradient(150deg, #36c58e, #1f7a58)",
  },
];

const DELAYS = ["", "d1", "d2"];

export function LandingTestimonials() {
  return (
    <section className="section" style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="section-head reveal">
          <div className="eyebrow">Loved by teams</div>
          <h2 className="h2">The last project tool you&apos;ll adopt</h2>
        </div>
        <div className="quotes">
          {QUOTES.map((q, i) => (
            <div
              key={q.name}
              className={`quote reveal${DELAYS[i] ? ` ${DELAYS[i]}` : ""}`}
            >
              <p>&ldquo;{q.text}&rdquo;</p>
              <div className="by">
                <span className="av" style={{ background: q.gradient }}>
                  {q.initials}
                </span>
                <div>
                  <div className="nm">{q.name}</div>
                  <div className="ro">{q.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
