import { QUOTES } from "@/constants/landing";

export function LandingTestimonials() {
  return (
    <section className="section pt-10">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="eyebrow">Loved by teams</div>
          <h2 className="h2">The last project tool you&apos;ll adopt</h2>
        </div>
        <div className="quotes">
          {QUOTES.map((q) => (
            <div
              key={q.name}
              className={`quote reveal${q.delay ? ` ${q.delay}` : ""}`}
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
