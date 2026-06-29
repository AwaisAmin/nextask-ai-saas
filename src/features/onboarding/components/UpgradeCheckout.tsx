"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { CheckIcon } from "@/icons";
import { CHECKOUT_FEATURES, COUNTRIES, PLANS } from "@/constants/onboarding";
import { cn } from "@/lib/utils";

type BillingCycle = "monthly" | "annual";

type Props = {
  seats: number;
  reason: string;
  onClose: () => void;
  onUpgraded: () => void;
};

const fmt = (n: number) => (n % 1 === 0 ? String(n) : n.toFixed(2));

const calcPrice = (seats: number, cycle: BillingCycle) => {
  const perSeatMo = PLANS.pro.priceMonthly;
  const annualPerSeatMo = Math.round(perSeatMo * 0.8);
  const unit = cycle === "annual" ? annualPerSeatMo : perSeatMo;
  const monthly = unit * seats;
  const billedNow = cycle === "annual" ? monthly * 12 : monthly;
  const saved =
    cycle === "annual" ? (perSeatMo - annualPerSeatMo) * seats * 12 : 0;
  return { unit, monthly, billedNow, saved };
};

export const UpgradeCheckout = ({
  seats,
  reason,
  onClose,
  onUpgraded,
}: Props) => {
  const [cycle, setCycle] = useState<BillingCycle>("annual");
  const [name, setName] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [country, setCountry] = useState("United States");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [shake, setShake] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const price = calcPrice(seats, cycle);
  const isFormValid =
    name.trim().length >= 2 &&
    cardNum.replace(/\s/g, "").length >= 15 &&
    expiry.replace(/\D/g, "").length === 4 &&
    cvc.length >= 3;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleCardNum = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 16);
    setCardNum(digits.replace(/(.{4})/g, "$1 ").trim());
  };

  const handleExpiry = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 4);
    setExpiry(
      digits.length >= 3
        ? digits.slice(0, 2) + " / " + digits.slice(2)
        : digits,
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => setIsSuccess(true), 1400);
  };

  return createPortal(
    <div className="co-host">
      <div className="co-scrim" onClick={onClose} />
      <div className="co-modal" role="dialog" aria-label="Upgrade to Pro">
        <button className="co-x" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        {isSuccess ? (
          <div className="co-success">
            <div className="co-success-badge">
              <CheckIcon size={38} strokeWidth={2.4} />
            </div>
            <h2>You&apos;re on Pro 🎉</h2>
            <p>
              All {seats} invites are now active. Your team can start the moment
              they accept.
            </p>
            <button
              className="co-submit ready"
              onClick={() => {
                onUpgraded();
                onClose();
              }}
            >
              Continue setup
            </button>
          </div>
        ) : (
          <div className="co-grid">
            {/* LEFT: plan summary */}
            <aside className="co-summary">
              <div className="co-plan-badge">✦ NexTask Pro</div>
              <h2 className="co-h">Activate your whole team</h2>
              <p className="co-reason">{reason}</p>

              <div className="co-cycle">
                <button
                  type="button"
                  className={cn(cycle === "monthly" && "on")}
                  onClick={() => setCycle("monthly")}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  className={cn(cycle === "annual" && "on")}
                  onClick={() => setCycle("annual")}
                >
                  Annual <span className="co-save">−20%</span>
                </button>
              </div>

              <div className="co-lines">
                <div className="co-line">
                  <span>
                    Pro · {seats} seat{seats > 1 ? "s" : ""}
                  </span>
                  <span>
                    ${price.unit} <i>/seat/mo</i>
                  </span>
                </div>
                <div className="co-line sub">
                  <span>
                    Billed {cycle === "annual" ? "annually" : "monthly"}
                  </span>
                  <span>${fmt(price.monthly)}/mo</span>
                </div>
                {price.saved > 0 && (
                  <div className="co-line save">
                    <span>You save</span>
                    <span>${fmt(price.saved)}/yr</span>
                  </div>
                )}
              </div>

              <div className="co-total">
                <span>Due today</span>
                <span className="co-amt">
                  ${fmt(price.billedNow)}
                  <i>{cycle === "annual" ? "/yr" : "/mo"}</i>
                </span>
              </div>

              <ul className="co-feats">
                {CHECKOUT_FEATURES.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </aside>

            {/* RIGHT: payment */}
            <section className="co-pay">
              <div className="co-pay-head">
                <h3>Payment details</h3>
                <span className="co-secure">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="4" y="11" width="16" height="9" rx="2" />
                    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                  </svg>
                  Secure &amp; encrypted
                </span>
              </div>

              <form
                ref={formRef}
                className={cn(shake && "shake")}
                onSubmit={handleSubmit}
              >
                <label className="co-field">
                  <span>Name on card</span>
                  <input
                    type="text"
                    placeholder="Alex Rivera"
                    autoComplete="cc-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>

                <label className="co-field">
                  <span>Card number</span>
                  <div className="co-card-input">
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="1234 1234 1234 1234"
                      autoComplete="cc-number"
                      maxLength={19}
                      value={cardNum}
                      onChange={(e) => handleCardNum(e.target.value)}
                    />
                    <span className="co-brands">
                      <span className="cb visa">VISA</span>
                      <span className="cb mc" />
                    </span>
                  </div>
                </label>

                <div className="co-row">
                  <label className="co-field">
                    <span>Expiry</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="MM / YY"
                      autoComplete="cc-exp"
                      maxLength={7}
                      value={expiry}
                      onChange={(e) => handleExpiry(e.target.value)}
                    />
                  </label>
                  <label className="co-field">
                    <span>CVC</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="123"
                      autoComplete="cc-csc"
                      maxLength={4}
                      value={cvc}
                      onChange={(e) =>
                        setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))
                      }
                    />
                  </label>
                </div>

                <label className="co-field">
                  <span>Country</span>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </label>

                <button
                  type="submit"
                  className={cn(
                    "co-submit",
                    isFormValid && !isSubmitting && "ready",
                  )}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="co-spin" /> Processing…
                    </>
                  ) : (
                    `Pay $${fmt(price.billedNow)} & activate Pro`
                  )}
                </button>
                <button type="button" className="co-later" onClick={onClose}>
                  Not now — keep extra invites pending
                </button>
                <p className="co-fine">
                  <CheckIcon
                    size={13}
                    strokeWidth={2}
                    className="text-(--ok)"
                  />
                  Cancel anytime · No charge until you confirm · Free plan stays
                  free
                </p>
              </form>
            </section>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
};
