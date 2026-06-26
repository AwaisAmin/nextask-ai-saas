"use client";

import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Sparkles } from "lucide-react";
import { CheckIcon } from "@/icons";
import type {
  OnboardingCtx,
  OrgUseCase,
  OrgSize,
  StepHandle,
  StepOrgCallbacks,
} from "../../types";

const ACCENTS = [
  "#7B61FF",
  "#FF6B5C",
  "#2FBF87",
  "#F5A623",
  "#3B9BFF",
  "#E84CC4",
] as const;

const USE_CASES: { id: OrgUseCase; path: string; label: string }[] = [
  {
    id: "product",
    path: "M3 3h18v6H3zM3 13h8v8H3zM15 13h6v8h-6z",
    label: "Product & engineering",
  },
  {
    id: "agency",
    path: "M12 3l9 5-9 5-9-5zM3 13l9 5 9-5",
    label: "Agency & clients",
  },
  {
    id: "marketing",
    path: "M3 11l18-7-7 18-2.5-7z",
    label: "Marketing & content",
  },
  {
    id: "ops",
    path: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20",
    label: "Operations & other",
  },
];

const SIZES: { label: string; value: OrgSize }[] = [
  { label: "Just me", value: "Just me" },
  { label: "2–10", value: "2-10" },
  { label: "11–50", value: "11-50" },
  { label: "51–200", value: "51-200" },
  { label: "200+", value: "200+" },
];

const LARGE_SIZES: OrgSize[] = ["11-50", "51-200", "200+"];
const TAKEN = ["acme", "google", "test", "admin", "app", "nextask", "demo"];

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const toInitials = (name: string) =>
  (name || "N")
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "N";

const slugOk = (s: string) => s.length >= 3 && !TAKEN.includes(s);

const CameraIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#fff"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 7h3l1.5-2h5L16 7h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z" />
    <circle cx="12" cy="13" r="3.2" />
  </svg>
);

export const StepOrg = forwardRef<
  StepHandle,
  { ctx: OnboardingCtx } & StepOrgCallbacks
>(({ ctx, onValidChange }, ref) => {
  const o = ctx.org;
  const [name, setName] = useState(o?.name ?? "");
  const [slugField, setSlugField] = useState(o?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(!!o?.slug);
  const [accent, setAccent] = useState(o?.accent ?? "#7B61FF");
  const [useCase, setUseCase] = useState<OrgUseCase>(o?.useCase ?? "product");
  const [size, setSize] = useState<OrgSize>(o?.size ?? "2-10");

  const computedSlug = slugEdited ? slugField : slugify(name);
  const isValid =
    name.trim().length >= 2 && !!computedSlug && slugOk(computedSlug);

  useEffect(() => {
    onValidChange(isValid);
  }, [isValid, onValidChange]);

  useImperativeHandle(ref, () => ({
    getData() {
      if (!isValid) return null;
      return {
        org: { name: name.trim(), slug: computedSlug, accent, useCase, size },
      };
    },
  }));

  const handleNameChange = (val: string) => {
    setName(val);
    if (!slugEdited) setSlugField(slugify(val));
  };

  const handleAccentChange = (color: string) => {
    setAccent(color);
  };

  const handleSlugChange = (val: string) => {
    setSlugEdited(true);
    setSlugField(val.toLowerCase().replace(/[^a-z0-9-]/g, ""));
  };

  const slugStatus = !computedSlug
    ? null
    : computedSlug.length < 3
      ? "short"
      : slugOk(computedSlug)
        ? "ok"
        : "taken";

  const logoStyle = {
    background: `linear-gradient(145deg, ${accent}, color-mix(in oklab, ${accent} 50%, #000))`,
  };

  return (
    <>
      <h1 className="ob-h1">Create your organization</h1>
      <p className="ob-sub">
        Your team&apos;s home in NexTask. You can change any of this later in
        Settings.
      </p>

      {/* Logo + accent row */}
      <div className="logo-row">
        <div className="logo-drop" style={logoStyle}>
          <span>{toInitials(name)}</span>
          <span className="logo-drop-cam">
            <CameraIcon />
          </span>
        </div>
        <div className="logo-meta">
          <div className="lt">Workspace logo</div>
          <div className="ls">Pick an accent — or upload later.</div>
          <div className="logo-pick">
            {ACCENTS.map((c) => (
              <button
                key={c}
                type="button"
                className={`swatch${c === accent ? " sel" : ""}`}
                style={{ background: c }}
                onClick={() => handleAccentChange(c)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Org name */}
      <div className="ob-field">
        <label htmlFor="ob-org-name">Organization name</label>
        <input
          id="ob-org-name"
          className="ob-input"
          type="text"
          placeholder="Acme Studio"
          value={name}
          autoFocus
          onChange={(e) => handleNameChange(e.target.value)}
        />
      </div>

      {/* Workspace URL / slug */}
      <div className="ob-field">
        <label>
          Workspace URL{" "}
          <span className="ob-hint">— where your team signs in</span>
        </label>
        <div className="slug-wrap">
          <span className="slug-prefix">nextask.com/</span>
          <input
            type="text"
            placeholder="acme-studio"
            spellCheck={false}
            value={computedSlug}
            onChange={(e) => handleSlugChange(e.target.value)}
          />
          <span
            className={`slug-status${slugStatus === "ok" ? " ok" : slugStatus ? " bad" : ""}`}
          >
            {slugStatus === "ok" && (
              <>
                <CheckIcon size={13} strokeWidth={2.6} />
                available
              </>
            )}
            {slugStatus === "short" && "too short"}
            {slugStatus === "taken" && "taken"}
          </span>
        </div>
      </div>

      {/* Use case */}
      <div className="ob-field">
        <label>
          What will you use NexTask for?{" "}
          <span className="ob-hint">
            — we&apos;ll tailor your starter setup
          </span>
        </label>
        <div className="opt-grid cols-2">
          {USE_CASES.map((uc) => (
            <button
              key={uc.id}
              type="button"
              className={`ob-opt${uc.id === useCase ? " sel" : ""}`}
              onClick={() => setUseCase(uc.id)}
            >
              <svg
                className="o-ic"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={uc.path} />
              </svg>
              {uc.label}
            </button>
          ))}
        </div>
      </div>

      {/* Team size */}
      <div className="ob-field">
        <label>How big is your team?</label>
        <div className="opt-grid cols-3">
          {SIZES.map((s) => (
            <button
              key={s.value}
              type="button"
              className={`ob-opt center${s.value === size ? " sel" : ""}`}
              onClick={() => setSize(s.value)}
            >
              {s.label}
            </button>
          ))}
        </div>
        {LARGE_SIZES.includes(size) && (
          <div className="plan-hint show">
            <Sparkles size={14} />
            For a team this size, <b>Pro</b> is recommended — unlimited members
            &amp; AI. You&apos;ll start on Free and can upgrade anytime.
          </div>
        )}
      </div>
    </>
  );
});

StepOrg.displayName = "StepOrg";
