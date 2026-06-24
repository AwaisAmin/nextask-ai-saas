"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "@/icons";
import {
  ENTERPRISE_FEATURES,
  FREE_FEATURES,
  PRO_FEATURES,
} from "@/constants/landing";

export const LandingPricing = () => {
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

        <div className="text-center">
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
                    <CheckIcon size={16} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <Button
              asChild
              variant="ghost"
              className="w-full justify-center mt-auto"
            >
              <Link href="/register">Get started</Link>
            </Button>
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
                    <CheckIcon size={16} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <Button
              asChild
              variant="primary"
              className="w-full justify-center mt-auto"
            >
              <Link href="/register">Start free trial</Link>
            </Button>
          </div>

          {/* Enterprise */}
          <div className="price-card reveal d2">
            <h3>Enterprise</h3>
            <div className="desc">
              For organizations that need scale &amp; control.
            </div>
            <div className="price-amt">
              <span className="amt">Custom</span>
            </div>
            <ul className="feats">
              {ENTERPRISE_FEATURES.map((f) => (
                <li key={f}>
                  <span className="ck">
                    <CheckIcon size={16} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <Button
              asChild
              variant="ghost"
              className="w-full justify-center mt-auto"
            >
              <Link href="/login">Contact sales</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
