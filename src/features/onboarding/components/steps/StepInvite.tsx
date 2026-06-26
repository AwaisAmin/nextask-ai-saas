"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { AlertTriangle, ChevronDown, Copy, Link2, Plus, X } from "lucide-react";
import { CheckIcon } from "@/icons";
import type {
  InviteRow,
  MemberRole,
  OnboardingCtx,
  StepHandle,
  StepInviteCallbacks,
} from "../../types";

const PLAN_SEATS = { free: 5, pro: 50 };
const PLAN_NAMES = { free: "Free", pro: "Pro" };

const ROLES: { id: MemberRole; name: string; desc: string }[] = [
  { id: "admin", name: "Admin", desc: "Manage members, billing & settings" },
  { id: "member", name: "Member", desc: "Create and work on projects" },
  { id: "viewer", name: "Viewer", desc: "Read-only access" },
];

const isEmail = (e: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e);

const DEFAULT_ROWS: InviteRow[] = [
  { email: "", role: "member" },
  { email: "", role: "member" },
  { email: "", role: "member" },
];

export const StepInvite = forwardRef<
  StepHandle,
  { ctx: OnboardingCtx } & StepInviteCallbacks
>(({ ctx, onValidChange, onNextLabelChange }, ref) => {
  const orgName = ctx.org?.name || "your workspace";
  const [rows, setRows] = useState<InviteRow[]>(
    ctx.invites?.length ? ctx.invites : DEFAULT_ROWS,
  );
  const [plan, setPlan] = useState(ctx.plan ?? "free");
  const [openMenu, setOpenMenu] = useState<number | null>(null);
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

  const updateRow = (idx: number, patch: Partial<InviteRow>) => {
    setRows((prev) => prev.map((r, i) => (i === idx ? { ...r, ...patch } : r)));
  };

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
    const link = `nextask.com/join/${ctx.org?.slug || "workspace"}-x8f2`;
    navigator.clipboard?.writeText(link).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const upgradeToPro = () => setPlan("pro");

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const fillColor = isOver
    ? "var(--danger)"
    : isFull
      ? "var(--warn)"
      : "var(--primary)";

  return (
    <>
      <h1 className="ob-h1">Invite your team</h1>
      <p className="ob-sub">
        NexTask is better together. Invite teammates to <b>{orgName}</b> —
        they&apos;ll get an email to join.
      </p>

      {/* Seat bar */}
      <div className={`seatbar${isOver ? " over" : isFull ? " warn" : ""}`}>
        <div className="seatbar-head">
          <span className="sb-label">
            <span>{used}</span> of <span>{seats}</span> seats used
          </span>
          <span className={`sb-plan${plan === "pro" ? " pro" : ""}`}>
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
            <button type="button" className="so-btn" onClick={upgradeToPro}>
              Upgrade to Pro
            </button>
          </div>
        )}
      </div>

      {/* Invite rows */}
      <div className="invite-rows" ref={containerRef}>
        {rows.map((row, idx) => {
          const roleInfo = ROLES.find((r) => r.id === row.role) ?? ROLES[1];
          return (
            <div key={idx} className="invite-row">
              <input
                className="ob-input"
                type="email"
                placeholder="name@company.com"
                value={row.email}
                onChange={(e) => updateRow(idx, { email: e.target.value })}
              />
              <div className="role-select">
                <button
                  type="button"
                  className="role-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenu(openMenu === idx ? null : idx);
                  }}
                >
                  {roleInfo.name}
                  <ChevronDown size={14} />
                </button>
                {openMenu === idx && (
                  <div className="role-menu">
                    {ROLES.map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        className="role-opt"
                        onClick={() => {
                          updateRow(idx, { role: r.id });
                          setOpenMenu(null);
                        }}
                      >
                        <div>
                          <div className="rname">{r.name}</div>
                          <div className="rdesc">{r.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                type="button"
                className="row-remove"
                disabled={rows.length <= 1}
                onClick={() => removeRow(idx)}
              >
                <X size={17} />
              </button>
            </div>
          );
        })}
      </div>

      <button type="button" className="add-row-btn" onClick={addRow}>
        <Plus size={16} />
        Add another
      </button>

      <div className="bulk-toggle-row">
        <span>Got a list?</span>
        <button
          type="button"
          className="bulk-link"
          onClick={() => setShowBulk((v) => !v)}
        >
          Paste multiple emails
        </button>
      </div>
      {showBulk && (
        <textarea
          className="ob-input"
          placeholder="alex@acme.com, sara@acme.com, omar@acme.com"
          style={{ marginTop: 10 }}
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
          <code>nextask.com/join/{ctx.org?.slug || "workspace"}-x8f2</code>
          <button type="button" className="copy-btn" onClick={copyInviteLink}>
            {copied ? (
              <>
                <span style={{ color: "var(--ok)" }}>
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
          </button>
        </div>
      </div>
    </>
  );
});

StepInvite.displayName = "StepInvite";
