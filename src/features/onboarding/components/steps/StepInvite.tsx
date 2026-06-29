"use client";

import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import {
  AlertTriangle,
  ChevronDown,
  Copy,
  Info,
  Link2,
  Plus,
  X,
} from "lucide-react";
import { CheckIcon } from "@/icons";
import { Button } from "@/components/ui/button";
import { Dropdown } from "@/components/ui/dropdown";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  COPIED_RESET_MS,
  DEFAULT_INVITE_ROWS,
  INVITE_LINK_BASE,
  INVITE_LINK_SUFFIX,
  INVITE_ROLES,
  PLANS,
} from "@/constants/onboarding";
import { isEmail, seatMessage, seatStatus } from "../../utils";
import { UpgradeCheckout } from "../UpgradeCheckout";
import type {
  InviteRow,
  OnboardingCtx,
  Plan,
  StepHandle,
  StepInviteCallbacks,
} from "../../types";

export const StepInvite = forwardRef<
  StepHandle,
  { ctx: OnboardingCtx } & StepInviteCallbacks
>(({ ctx, onValidChange, onNextLabelChange }, ref) => {
  const orgName = ctx.org?.name || "your workspace";
  const [rows, setRows] = useState<InviteRow[]>(
    ctx.invites?.length ? ctx.invites : DEFAULT_INVITE_ROWS,
  );
  const [plan, setPlan] = useState<Plan>(ctx.plan ?? "free");
  const [showBulk, setShowBulk] = useState(false);
  const [copied, setCopied] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const p = PLANS[plan];
  const activeSlots =
    p.seats === Infinity ? Infinity : Math.max(0, p.seats - 1);
  const validEmails = rows.map((r) => r.email.trim()).filter(isEmail);
  const used = 1 + validEmails.length;
  const status = seatStatus(plan, used);
  const message = seatMessage(plan, used);

  const pendingCount =
    activeSlots === Infinity
      ? 0
      : Math.max(0, validEmails.length - activeSlots);
  const activeCount = validEmails.length - pendingCount;

  const fillColor =
    status.state === "pending"
      ? "var(--danger)"
      : status.state === "overage"
        ? "var(--info)"
        : status.state === "full"
          ? "var(--warn)"
          : "var(--primary)";
  const fillPct =
    p.seats === Infinity
      ? Math.min(100, (used / 60) * 100)
      : Math.min(100, (used / p.seats) * 100);

  useEffect(() => {
    onValidChange(true);
  }, [onValidChange]);

  useEffect(() => {
    if (validEmails.length === 0) {
      onNextLabelChange("Continue without inviting");
    } else if (pendingCount > 0) {
      onNextLabelChange(`Send ${activeCount} & save ${pendingCount} pending`);
    } else {
      onNextLabelChange(
        `Send ${validEmails.length} invite${validEmails.length > 1 ? "s" : ""} & continue`,
      );
    }
  }, [validEmails.length, pendingCount, activeCount, onNextLabelChange]);

  useImperativeHandle(ref, () => ({
    getData() {
      return { invites: rows.filter((r) => isEmail(r.email.trim())), plan };
    },
  }));

  const updateRow = (idx: number, patch: Partial<InviteRow>) =>
    setRows((prev) => prev.map((r, i) => (i === idx ? { ...r, ...patch } : r)));

  const addRow = () =>
    setRows((prev) => [...prev, { email: "", role: "member" }]);

  const removeRow = (idx: number) =>
    setRows((prev) => prev.filter((_, i) => i !== idx));

  const handleBulkBlur = (val: string) => {
    const emails = val
      .split(/[\s,;]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (emails.length) {
      setRows(emails.map((email) => ({ email, role: "member" })));
      setShowBulk(false);
    }
  };

  const copyInviteLink = () => {
    const link = `${INVITE_LINK_BASE}${ctx.org?.slug || "workspace"}${INVITE_LINK_SUFFIX}`;
    navigator.clipboard?.writeText(link).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), COPIED_RESET_MS);
  };

  // Compute which rows are pending (over active slot limit)
  let validSeen = 0;
  const rowStates = rows.map((row) => {
    const valid = isEmail(row.email.trim());
    const isPending =
      valid && activeSlots !== Infinity && validSeen >= activeSlots;
    if (valid) validSeen++;
    return { ...row, isPending };
  });
  const firstPendingIdx = rowStates.findIndex((r) => r.isPending);

  return (
    <>
      <h1 className="ob-h1">Invite your team</h1>
      <p className="ob-sub">
        NexTask is better together. Invite teammates to <b>{orgName}</b> —
        they&apos;ll get an email to join.
      </p>

      {/* Seat bar */}
      <div
        className={cn("seatbar", {
          over: status.state === "pending",
          warn: status.state === "full" || status.state === "overage",
        })}
      >
        <div className="seatbar-head">
          <span className="sb-label">
            <span>{used}</span> of{" "}
            <span>{p.seats === Infinity ? "Unlimited" : p.seats}</span> seats
            used
          </span>
          <span className={cn("sb-plan", plan === "pro" && "pro")}>
            {p.name} plan
          </span>
        </div>
        <div className="seat-track">
          <div
            className="seat-fill"
            style={{ width: `${fillPct}%`, background: fillColor }}
          />
        </div>
        {message && (
          <div className="seat-over show">
            <div className="so-txt">
              {message.cta.action === "upgrade:pro" ? (
                <AlertTriangle size={15} style={{ color: "var(--danger)" }} />
              ) : (
                <Info size={15} style={{ color: "var(--info)" }} />
              )}
              <span>
                <b>{message.title}</b> {message.body}
              </span>
            </div>
            {message.cta.action === "upgrade:pro" ? (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setCheckoutOpen(true)}
              >
                {message.cta.label}
              </Button>
            ) : (
              <Button variant="ghost" size="sm">
                {message.cta.label}
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Invite rows */}
      <div className="invite-rows">
        {rowStates.map((row, idx) => {
          const roleInfo =
            INVITE_ROLES.find((r) => r.id === row.role) ?? INVITE_ROLES[1];
          return (
            <div key={idx}>
              {idx === firstPendingIdx && (
                <div className="seat-divider">
                  <span className="sd-line" />
                  <span className="sd-txt">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 11V8a6 6 0 0 1 12 0v3" />
                      <rect x="4" y="11" width="16" height="10" rx="2" />
                    </svg>
                    {p.name} limit · below activate when you upgrade
                  </span>
                  <span className="sd-line" />
                </div>
              )}
              <div className={cn("invite-row", row.isPending && "pending")}>
                <Input
                  type="email"
                  placeholder="name@company.com"
                  value={row.email}
                  onChange={(e) => updateRow(idx, { email: e.target.value })}
                />
                <Dropdown
                  trigger={(toggle) => (
                    <Button
                      variant="ghost"
                      className="h-auto p-[13px] rounded-[11px] text-[13.5px] text-(--text-1) gap-[7px] min-w-[112px] justify-between whitespace-nowrap"
                      onClick={toggle}
                    >
                      {roleInfo.name}
                      <ChevronDown size={14} />
                    </Button>
                  )}
                  menuClassName="role-menu"
                >
                  {INVITE_ROLES.map((r) => (
                    <Button
                      key={r.id}
                      variant="ghost"
                      className="w-full justify-start items-start text-left bg-transparent border-0 rounded-[9px] py-[9px] px-[10px] h-auto whitespace-normal"
                      onClick={() => updateRow(idx, { role: r.id })}
                    >
                      <div>
                        <div className="rname">{r.name}</div>
                        <div className="rdesc">{r.desc}</div>
                      </div>
                    </Button>
                  ))}
                </Dropdown>
                {row.isPending && (
                  <span
                    className="pending-pill"
                    title="Saved as pending until you upgrade"
                  >
                    Pending
                  </span>
                )}
                <Button
                  variant="ghost"
                  className={cn(
                    "w-[38px] h-[46px] rounded-[10px] border-0 text-(--text-3) hover:text-(--danger) hover:bg-(--bg-2) shrink-0",
                    rows.length <= 1 && "invisible",
                  )}
                  disabled={rows.length <= 1}
                  onClick={() => removeRow(idx)}
                >
                  <X size={17} />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <Button
        variant="link"
        className="gap-2 text-[13.5px] py-2 px-1"
        onClick={addRow}
      >
        <Plus size={16} />
        Add another
      </Button>

      <div className="bulk-toggle-row">
        <span>Got a list?</span>
        <Button
          variant="link"
          className="text-[13px]"
          onClick={() => setShowBulk((v) => !v)}
        >
          Paste multiple emails
        </Button>
      </div>
      {showBulk && (
        <Textarea
          className="mt-2.5"
          placeholder="alex@acme.com, sara@acme.com, omar@acme.com"
          rows={4}
          onBlur={(e) => handleBulkBlur(e.target.value)}
          autoFocus
        />
      )}

      {/* Invite link card */}
      <div className="invite-link-card">
        <div className="ilc-top">
          <Link2 size={16} color="var(--primary)" />
          Or share an invite link
        </div>
        <div className="ilc-row">
          <code>
            {INVITE_LINK_BASE}
            {ctx.org?.slug || "workspace"}
            {INVITE_LINK_SUFFIX}
          </code>
          <Button
            variant="ghost"
            className="gap-1.5 text-[13px] px-3.5 py-0 self-stretch rounded-[9px] bg-(--bg-3) hover:bg-(--bg-4) shrink-0"
            onClick={copyInviteLink}
          >
            {copied ? (
              <>
                <span className="text-(--ok)">
                  <CheckIcon size={14} strokeWidth={2.4} />
                </span>
                Copied
              </>
            ) : (
              <>
                <Copy size={14} />
                Copy
              </>
            )}
          </Button>
        </div>
      </div>

      {checkoutOpen && (
        <UpgradeCheckout
          seats={used}
          reason={`You're inviting ${used} people — more than Free allows. Go Pro to activate everyone now.`}
          onClose={() => setCheckoutOpen(false)}
          onUpgraded={() => setPlan("pro")}
        />
      )}
    </>
  );
});

StepInvite.displayName = "StepInvite";
