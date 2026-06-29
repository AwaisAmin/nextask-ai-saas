"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dropdown } from "@/components/ui/dropdown";
import { Input } from "@/components/ui/input";
import { CheckIcon, LockIcon } from "@/icons";
import {
  BILLING_CYCLES,
  CHECKOUT_BADGE,
  CHECKOUT_DEFAULT_FORM,
  CHECKOUT_FEATURES,
  CHECKOUT_HEADLINE,
  COUNTRIES,
  CYCLE_BILLED_LABEL,
  CYCLE_PERIOD,
} from "@/constants/onboarding";
import {
  calcProPrice,
  formatCardNum,
  formatExpiry,
  fmtPrice,
  isCheckoutValid,
} from "../utils";
import { cn } from "@/lib/utils";
import type { BillingCycle, CheckoutFormState } from "../types";

type Props = {
  seats: number;
  reason: string;
  onClose: () => void;
  onUpgraded: () => void;
};

export const UpgradeCheckout = ({
  seats,
  reason,
  onClose,
  onUpgraded,
}: Props) => {
  const [cycle, setCycle] = useState<BillingCycle>("annual");
  const [form, setForm] = useState<CheckoutFormState>(CHECKOUT_DEFAULT_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [shake, setShake] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const price = calcProPrice(seats, cycle);
  const isValid = isCheckoutValid(form);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const patch =
    (field: keyof CheckoutFormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleCardNum = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, cardNum: formatCardNum(e.target.value) }));

  const handleExpiry = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, expiry: formatExpiry(e.target.value) }));

  const handleCvc = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({
      ...prev,
      cvc: e.target.value.replace(/\D/g, "").slice(0, 4),
    }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) {
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
        <Button
          variant="ghost"
          size="icon"
          className="co-x"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={18} />
        </Button>

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
            <Button
              variant="primary"
              className="co-submit"
              onClick={() => {
                onUpgraded();
                onClose();
              }}
            >
              Continue setup
            </Button>
          </div>
        ) : (
          <div className="co-grid">
            <aside className="co-summary">
              <div className="co-plan-badge">{CHECKOUT_BADGE}</div>
              <h2 className="co-h">{CHECKOUT_HEADLINE}</h2>
              <p className="co-reason">{reason}</p>

              <div className="co-cycle">
                {BILLING_CYCLES.map(({ id, label, badge }) => {
                  const isActive = cycle === id;
                  return (
                    <Button
                      key={id}
                      type="button"
                      variant="ghost"
                      className={cn(
                        "border-0 shadow-none rounded-[999px] py-[7px] px-[15px] text-[13px] font-semibold gap-[7px]",
                        isActive
                          ? "bg-(--primary) text-(--primary-ink) hover:bg-(--primary)"
                          : "bg-transparent hover:bg-transparent text-(--text-2)",
                      )}
                      onClick={() => setCycle(id)}
                    >
                      {label}
                      {badge && (
                        <span
                          className={cn("co-save", isActive && "text-white")}
                        >
                          {badge}
                        </span>
                      )}
                    </Button>
                  );
                })}
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
                  <span>Billed {CYCLE_BILLED_LABEL[cycle]}</span>
                  <span>${fmtPrice(price.monthly)}/mo</span>
                </div>
                {price.saved > 0 && (
                  <div className="co-line save">
                    <span>You save</span>
                    <span>${fmtPrice(price.saved)}/yr</span>
                  </div>
                )}
              </div>

              <div className="co-total">
                <span>Due today</span>
                <span className="co-amt">
                  ${fmtPrice(price.billedNow)}
                  <i>{CYCLE_PERIOD[cycle]}</i>
                </span>
              </div>

              <ul className="co-feats">
                {CHECKOUT_FEATURES.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </aside>

            <section className="co-pay">
              <div className="co-pay-head">
                <h3>Payment details</h3>
                <span className="co-secure">
                  <LockIcon size={13} />
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
                  <Input
                    type="text"
                    placeholder="Alex Rivera"
                    autoComplete="cc-name"
                    value={form.name}
                    onChange={patch("name")}
                  />
                </label>

                <label className="co-field">
                  <span>Card number</span>
                  <div className="co-card-input">
                    <Input
                      type="text"
                      inputMode="numeric"
                      placeholder="1234 1234 1234 1234"
                      autoComplete="cc-number"
                      maxLength={19}
                      value={form.cardNum}
                      onChange={handleCardNum}
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
                    <Input
                      type="text"
                      inputMode="numeric"
                      placeholder="MM / YY"
                      autoComplete="cc-exp"
                      maxLength={7}
                      value={form.expiry}
                      onChange={handleExpiry}
                    />
                  </label>
                  <label className="co-field">
                    <span>CVC</span>
                    <Input
                      type="text"
                      inputMode="numeric"
                      placeholder="123"
                      autoComplete="cc-csc"
                      maxLength={4}
                      value={form.cvc}
                      onChange={handleCvc}
                    />
                  </label>
                </div>

                <div className="co-field">
                  <span>Country</span>
                  <Dropdown
                    className="w-full"
                    portal
                    trigger={(toggle) => (
                      <Button
                        type="button"
                        variant="ghost"
                        className="w-full justify-between rounded-[11px] py-[12px] px-[13px] text-[14.5px] font-normal hover:bg-(--bg-2) hover:border-(--primary)"
                        onClick={toggle}
                      >
                        {form.country}
                        <ChevronDown size={14} />
                      </Button>
                    )}
                    menuClassName="co-country-menu"
                  >
                    {COUNTRIES.map((c) => (
                      <Button
                        key={c}
                        type="button"
                        variant="ghost"
                        className={cn(
                          "w-full justify-start rounded-[8px] px-3 py-2 text-[13.5px] font-normal bg-transparent border-0 shadow-none hover:bg-(--bg-3) hover:border-0",
                          c === form.country && "text-(--primary)",
                        )}
                        onClick={() =>
                          setForm((prev) => ({ ...prev, country: c }))
                        }
                      >
                        {c}
                      </Button>
                    ))}
                  </Dropdown>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={!isValid || isSubmitting}
                  className="co-submit"
                >
                  {isSubmitting ? (
                    <>
                      <span className="co-spin" /> Processing…
                    </>
                  ) : (
                    `Pay $${fmtPrice(price.billedNow)} & activate Pro`
                  )}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="co-later w-full py-[11px] text-[13px] text-(--text-2) hover:text-(--text-0) bg-transparent border-0 shadow-none hover:bg-transparent [font-family:var(--font-body)]"
                  onClick={onClose}
                >
                  Not now — keep extra invites pending
                </Button>

                <p className="co-fine">
                  <span className="text-(--ok)">
                    <CheckIcon size={13} strokeWidth={2} />
                  </span>
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
