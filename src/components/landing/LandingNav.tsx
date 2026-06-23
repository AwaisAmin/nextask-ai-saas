"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`lp-nav${scrolled ? " scrolled" : ""}`} id="nav">
      <div className="lp-nav-inner">
        <Link className="lp-logo" href="#top">
          <span className="lp-logo-mark">N</span>NexTask
        </Link>
        <div className="lp-navlinks">
          <Link className="lp-navlink hide-m" href="#features">
            Product
          </Link>
          <Link className="lp-navlink hide-m" href="#ai">
            AI Agent
          </Link>
          <Link className="lp-navlink hide-m" href="#pricing">
            Pricing
          </Link>
          <Link className="lp-navlink" href="/login">
            Sign in
          </Link>
          <Link
            className="btn btn-primary"
            href="/register"
            style={{ padding: "9px 16px", fontSize: "14px" }}
          >
            Get started
          </Link>
        </div>
      </div>
    </nav>
  );
}
