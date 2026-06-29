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
import { CheckIcon, LockIcon } from "@/icons";
import { Button } from "@/components/ui/button";
import { Dropdown } from "@/components/ui/dropdown";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  BULK_PASTE_PLACEHOLDER,
  BULK_TOGGLE_CTA,
  BULK_TOGGLE_PROMPT,
  COPIED_RESET_MS,
  DEFAULT_INVITE_ROLE,
  DEFAULT_INVITE_ROWS,
  FALLBACK_ORG_NAME,
  FALLBACK_ORG_SLUG,
  INVITE_ADD_ROW_LABEL,
  INVITE_COPIED_LABEL,
  INVITE_COPY_LABEL,
  INVITE_EMAIL_PLACEHOLDER,
  INVITE_LINK_BASE,
  INVITE_LINK_LABEL,
  INVITE_LINK_SUFFIX,
  INVITE_PENDING_LABEL,
  INVITE_PENDING_PILL_TITLE,
  INVITE_ROLES,
  SEATBAR_PLAN_SUFFIX,
  SEATBAR_SEATS_LABEL,
  SEAT_LABEL_UNLIMITED,
  STEP_INVITE_SUB_POST,
  STEP_INVITE_SUB_PRE,
  STEP_INVITE_TITLE,
} from "@/constants/onboarding";
import {
  computeInviteStats,
  getDividerLabel,
  getInviteNextLabel,
  getUpgradeReason,
  isEmail,
} from "../../utils";
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
  const orgName = ctx.org?.name || FALLBACK_ORG_NAME;
  const [rows, setRows] = useState<InviteRow[]>(
    ctx.invites?.length ? ctx.invites : DEFAULT_INVITE_ROWS,
  );
  const [plan, setPlan] = useState<Plan>(ctx.plan ?? "free");
  const [showBulk, setShowBulk] = useState(false);
  const [copied, setCopied] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const {
    p,
    validEmails,
    used,
    status,
    message,
    pendingCount,
    activeCount,
    rowStates,
    firstPendingIdx,
    fillPct,
    fillColor,
  } = computeInviteStats(rows, plan);

  useEffect(() => {
    onValidChange(true);
  }, [onValidChange]);

  useEffect(() => {
    onNextLabelChange(
      getInviteNextLabel(validEmails.length, activeCount, pendingCount),
    );
  }, [validEmails.length, activeCount, pendingCount, onNextLabelChange]);

  useImperativeHandle(ref, () => ({
    getData() {
      return { invites: rows.filter((r) => isEmail(r.email.trim())), plan };
    },
  }));

  const updateRow = (idx: number, patch: Partial<InviteRow>) =>
    setRows((prev) => prev.map((r, i) => (i === idx ? { ...r, ...patch } : r)));

  const addRow = () =>
    setRows((prev) => [...prev, { email: "", role: DEFAULT_INVITE_ROLE }]);

  const removeRow = (idx: number) =>
    setRows((prev) => prev.filter((_, i) => i !== idx));

  const handleBulkBlur = (val: string) => {
    const emails = val
      .split(/[\s,;]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (emails.length) {
      setRows(emails.map((email) => ({ email, role: DEFAULT_INVITE_ROLE })));
      setShowBulk(false);
    }
  };

  const copyInviteLink = () => {
    const link = `${INVITE_LINK_BASE}${ctx.org?.slug || FALLBACK_ORG_SLUG}${INVITE_LINK_SUFFIX}`;
    navigator.clipboard?.writeText(link).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), COPIED_RESET_MS);
  };

  return (
    <>
      <h1 className="ob-h1">{STEP_INVITE_TITLE}</h1>
      <p className="ob-sub">
        {STEP_INVITE_SUB_PRE} <b>{orgName}</b> {STEP_INVITE_SUB_POST}
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
            <span>{p.seats === Infinity ? SEAT_LABEL_UNLIMITED : p.seats}</span>{" "}
            {SEATBAR_SEATS_LABEL}
          </span>
          <span className={cn("sb-plan", plan === "pro" && "pro")}>
            {p.name} {SEATBAR_PLAN_SUFFIX}
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
            <Button
              variant={
                message.cta.action === "upgrade:pro" ? "primary" : "ghost"
              }
              size="sm"
              onClick={
                message.cta.action === "upgrade:pro"
                  ? () => setCheckoutOpen(true)
                  : undefined
              }
            >
              {message.cta.label}
            </Button>
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
                    <LockIcon size={12} />
                    {getDividerLabel(p.name)}
                  </span>
                  <span className="sd-line" />
                </div>
              )}
              <div className={cn("invite-row", row.isPending && "pending")}>
                <Input
                  type="email"
                  placeholder={INVITE_EMAIL_PLACEHOLDER}
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
                    title={INVITE_PENDING_PILL_TITLE}
                  >
                    {INVITE_PENDING_LABEL}
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
        {INVITE_ADD_ROW_LABEL}
      </Button>

      <div className="bulk-toggle-row">
        <span>{BULK_TOGGLE_PROMPT}</span>
        <Button
          variant="link"
          className="text-[13px]"
          onClick={() => setShowBulk((v) => !v)}
        >
          {BULK_TOGGLE_CTA}
        </Button>
      </div>
      {showBulk && (
        <Textarea
          className="mt-2.5"
          placeholder={BULK_PASTE_PLACEHOLDER}
          rows={4}
          onBlur={(e) => handleBulkBlur(e.target.value)}
          autoFocus
        />
      )}

      {/* Invite link card */}
      <div className="invite-link-card">
        <div className="ilc-top">
          <Link2 size={16} color="var(--primary)" />
          {INVITE_LINK_LABEL}
        </div>
        <div className="ilc-row">
          <code>
            {INVITE_LINK_BASE}
            {ctx.org?.slug || FALLBACK_ORG_SLUG}
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
                {INVITE_COPIED_LABEL}
              </>
            ) : (
              <>
                <Copy size={14} />
                {INVITE_COPY_LABEL}
              </>
            )}
          </Button>
        </div>
      </div>

      {checkoutOpen && (
        <UpgradeCheckout
          seats={used}
          reason={getUpgradeReason(used)}
          onClose={() => setCheckoutOpen(false)}
          onUpgraded={() => setPlan("pro")}
        />
      )}
    </>
  );
});

StepInvite.displayName = "StepInvite";
