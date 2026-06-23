"use client";

import { useState } from "react";
import Link from "next/link";

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12.5l4.5 4.5L19 7" />
  </svg>
);

const FREE_FEATURES = [
  "Up to 3 projects & 5 members",
  "Boards, docs & chat",
  "10 AI Agent actions / day",
];

const PRO_FEATURES = [
  "Unlimited projects · 50 members",
  "100 AI actions / day + automations",
  "Roadmaps, analytics & integrations",
  "Priority support",
];

const ENTERPRISE_FEATURES = [
  "Everything in Pro, unlimited",
  "SSO / SAML & SCIM",
  "Audit logs, data residency, SLA",
  "Dedicated success manager",
];

export function LandingPricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="section" id="pricing">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="eyebrow">Pricing</div>
          <h2 className="h2">Simple pricing that scales with you</h2>
          <p className="lead">
            Start free. Upgrade when your team grows. Cancel anytime.
          </p>
        </div>

        <div style={{ textAlign: "center" }}>
          <div className="price-toggle reveal">
            <button
              className={!yearly ? "on" : ""}
              onClick={() => setYearly(false)}
            >
              Monthly
            </button>
            <button
              className={yearly ? "on" : ""}
              onClick={() => setYearly(true)}
            >
              Yearly <span className="save">−20%</span>
            </button>
          </div>
        </div>

        <div className="prices">
          {/* Free */}
          <div className="price-card reveal">
            <h3>Free</h3>
            <div className="desc">
              For individuals and small teams getting started.
            </div>
            <div className="price-amt">
              <span className="amt">$0</span>
              <span className="per">forever</span>
            </div>
            <ul className="feats">
              {FREE_FEATURES.map((f) => (
                <li key={f}>
                  <span className="ck">
                    <CheckIcon />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <Link className="btn btn-ghost" href="/register">
              Get started
            </Link>
          </div>

          {/* Pro */}
          <div className="price-card pop reveal d1">
            <div className="price-badge">MOST POPULAR</div>
            <h3>Pro</h3>
            <div className="desc">
              For growing teams that live in their tools.
            </div>
            <div className="price-amt">
              <span className="amt">{yearly ? "$10" : "$12"}</span>
              <span className="per">/ user / mo</span>
            </div>
            <ul className="feats">
              {PRO_FEATURES.map((f) => (
                <li key={f}>
                  <span className="ck">
                    <CheckIcon />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <Link className="btn btn-primary" href="/register">
              Start free trial
            </Link>
          </div>

          {/* Enterprise */}
          <div className="price-card reveal d2">
            <h3>Enterprise</h3>
            <div className="desc">
              For organizations that need scale & control.
            </div>
            <div className="price-amt">
              <span className="amt">Custom</span>
            </div>
            <ul className="feats">
              {ENTERPRISE_FEATURES.map((f) => (
                <li key={f}>
                  <span className="ck">
                    <CheckIcon />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <Link className="btn btn-ghost" href="/login">
              Contact sales
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
