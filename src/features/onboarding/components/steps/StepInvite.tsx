"use client";

import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { AlertTriangle, ChevronDown, Copy, Link2, Plus, X } from "lucide-react";
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
  PLAN_NAMES,
  PLAN_SEATS,
} from "@/constants/onboarding";
import { getSeatbarColor, isEmail } from "../../utils";
import type {
  InviteRow,
  OnboardingCtx,
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
  const [plan, setPlan] = useState(ctx.plan ?? "free");
  const [showBulk, setShowBulk] = useState(false);
  const [copied, setCopied] = useState(false);

  const seats = PLAN_SEATS[plan as keyof typeof PLAN_SEATS];
  const validEmails = rows.map((r) => r.email.trim()).filter(isEmail);
  const used = 1 + validEmails.length;
  const isOver = used > seats;
  const isFull = used === seats;
  const fillPct = Math.min(100, (used / seats) * 100);

  useEffect(() => {
    onValidChange(true);
  }, [onValidChange]);

  useEffect(() => {
    const n = validEmails.length;
    onNextLabelChange(
      n > 0
        ? `Send ${n} invite${n > 1 ? "s" : ""} & continue`
        : "Continue without inviting",
    );
  }, [validEmails.length, onNextLabelChange]);

  useImperativeHandle(ref, () => ({
    getData() {
      return { invites: rows.filter((r) => r.email.trim()), plan };
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

  const fillColor = getSeatbarColor(isOver, isFull);

  return (
    <>
      <h1 className="ob-h1">Invite your team</h1>
      <p className="ob-sub">
        NexTask is better together. Invite teammates to <b>{orgName}</b> —
        they&apos;ll get an email to join.
      </p>

      {/* Seat bar */}
      <div className={cn("seatbar", { over: isOver, warn: isFull && !isOver })}>
        <div className="seatbar-head">
          <span className="sb-label">
            <span>{used}</span> of <span>{seats}</span> seats used
          </span>
          <span className={cn("sb-plan", plan === "pro" && "pro")}>
            {PLAN_NAMES[plan as keyof typeof PLAN_NAMES]} plan
          </span>
        </div>
        <div className="seat-track">
          <div
            className="seat-fill"
            style={{ width: `${fillPct}%`, background: fillColor }}
          />
        </div>
        {isOver && (
          <div className="seat-over show">
            <div className="so-txt">
              <AlertTriangle size={15} />
              <span>
                <b>{used - seats} over your Free plan.</b> These will be saved
                as pending invites — upgrade to Pro to activate them.
              </span>
            </div>
            <Button variant="primary" size="sm" onClick={() => setPlan("pro")}>
              Upgrade to Pro
            </Button>
          </div>
        )}
      </div>

      {/* Invite rows */}
      <div className="invite-rows">
        {rows.map((row, idx) => {
          const roleInfo =
            INVITE_ROLES.find((r) => r.id === row.role) ?? INVITE_ROLES[1];
          return (
            <div key={idx} className="invite-row">
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
    </>
  );
});

StepInvite.displayName = "StepInvite";
