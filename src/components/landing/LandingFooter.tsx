import Link from "next/link";

const LINKS = {
  Product: [
    { label: "Boards", href: "#features" },
    { label: "Docs", href: "#features" },
    { label: "AI Agent", href: "#ai" },
    { label: "Pricing", href: "#pricing" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Resources: [
    { label: "Live demo", href: "#" },
    { label: "Mobile app", href: "#" },
    { label: "Docs", href: "#" },
    { label: "Changelog", href: "#" },
  ],
};

export function LandingFooter() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link className="lp-logo" href="#top" style={{ marginBottom: 14 }}>
              <span className="lp-logo-mark">N</span>NexTask
            </Link>
            <p
              style={{
                fontSize: 14,
                color: "var(--text-2)",
                lineHeight: 1.6,
                maxWidth: 280,
              }}
            >
              One workspace for tasks, docs and chat — supercharged by an AI
              teammate.
            </p>
          </div>
          {Object.entries(LINKS).map(([heading, items]) => (
            <div key={heading}>
              <h5>{heading}</h5>
              {items.map((item) => (
                <Link key={item.label} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© 2026 NexTask, Inc. All rights reserved.</span>
          <span style={{ display: "flex", gap: 18 }}>
            <a href="#" style={{ color: "var(--text-3)" }}>
              Privacy
            </a>
            <a href="#" style={{ color: "var(--text-3)" }}>
              Terms
            </a>
            <a href="#" style={{ color: "var(--text-3)" }}>
              Security
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
