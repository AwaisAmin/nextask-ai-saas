"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/constants/landing";

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
          {NAV_LINKS.map(({ label, href, hideOnMobile }) => (
            <Link
              key={label}
              className={`lp-navlink${hideOnMobile ? " hide-m" : ""}`}
              href={href}
            >
              {label}
            </Link>
          ))}
          <Link
            className="btn btn-primary py-2.25 px-4 text-sm"
            href="/register"
          >
            Get started
          </Link>
        </div>
      </div>
    </nav>
  );
}
