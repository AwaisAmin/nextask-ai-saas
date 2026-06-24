import Link from "next/link";
import { FOOTER_LINKS } from "@/constants/landing";

export function LandingFooter() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link className="lp-logo mb-3.5" href="#top">
              <span className="lp-logo-mark">N</span>NexTask
            </Link>
            <p className="text-sm text-(--text-2) leading-[1.6] max-w-70">
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
          <span className="footer-legal">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Security</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
