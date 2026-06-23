import Link from "next/link";

export function LandingCTA() {
  return (
    <section className="section" style={{ paddingTop: 20 }}>
      <div className="wrap">
        <div className="cta-band reveal">
          <div className="glow-c" />
          <div style={{ position: "relative", zIndex: 2 }}>
            <h2 className="h2" style={{ marginBottom: 14 }}>
              Give your team an AI teammate
            </h2>
            <p
              className="lead"
              style={{ maxWidth: 520, margin: "0 auto 30px" }}
            >
              Free for small teams. Two minutes to set up. Your first sprint
              planned before lunch.
            </p>
            <div className="hero-cta">
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
                Explore the demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
