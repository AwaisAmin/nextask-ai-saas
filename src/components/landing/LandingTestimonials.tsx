import { QUOTES } from "@/constants/landing";

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
