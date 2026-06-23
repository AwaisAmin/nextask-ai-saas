import Link from "next/link";
import { FOOTER_LINKS } from "@/constants/landing";

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
          {Object.entries(FOOTER_LINKS).map(([heading, items]) => (
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
