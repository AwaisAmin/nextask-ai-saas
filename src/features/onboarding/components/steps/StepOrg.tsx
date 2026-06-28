"use client";

import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Sparkles } from "lucide-react";
import { CameraIcon, CheckIcon, PathIcon } from "@/icons";
import {
  ORG_ACCENTS,
  ORG_LARGE_SIZES,
  ORG_SIZES,
  ORG_USE_CASES,
  SLUG_STATUS,
  SLUG_STATUS_LABELS,
} from "@/constants/onboarding";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  getSlugStatus,
  isSlugAvailable,
  slugify,
  toInitials,
} from "../../utils";
import type {
  OnboardingCtx,
  OrgSize,
  OrgUseCase,
  StepHandle,
  StepOrgCallbacks,
} from "../../types";

export const StepOrg = forwardRef<
  StepHandle,
  { ctx: OnboardingCtx } & StepOrgCallbacks
>(({ ctx, onValidChange }, ref) => {
  const o = ctx.org;
  const [name, setName] = useState(o?.name ?? "");
  const [slugField, setSlugField] = useState(o?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(!!o?.slug);
  const [accent, setAccent] = useState(o?.accent ?? ORG_ACCENTS[0]);
  const [useCase, setUseCase] = useState<OrgUseCase>(o?.useCase ?? "product");
  const [size, setSize] = useState<OrgSize>(o?.size ?? "2-10");

  const computedSlug = slugEdited ? slugField : slugify(name);
  const isValid =
    name.trim().length >= 2 && !!computedSlug && isSlugAvailable(computedSlug);

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

  const handleSlugChange = (val: string) => {
    setSlugEdited(true);
    setSlugField(val.toLowerCase().replace(/[^a-z0-9-]/g, ""));
  };

  const slugStatus = getSlugStatus(computedSlug);

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
            {ORG_ACCENTS.map((c) => (
              <Button
                key={c}
                variant="swatch"
                data-selected={c === accent}
                style={{ background: c }}
                onClick={() => setAccent(c)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Org name */}
      <Input
        label="Organization name"
        type="text"
        placeholder="Acme Studio"
        value={name}
        autoFocus
        onChange={(e) => handleNameChange(e.target.value)}
      />

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
            className={cn("slug-status", {
              ok: slugStatus === SLUG_STATUS.OK,
              bad:
                slugStatus === SLUG_STATUS.SHORT ||
                slugStatus === SLUG_STATUS.TAKEN,
            })}
          >
            {slugStatus === SLUG_STATUS.OK && (
              <>
                <CheckIcon size={13} strokeWidth={2.6} />
                {SLUG_STATUS_LABELS.ok}
              </>
            )}
            {slugStatus === SLUG_STATUS.SHORT && SLUG_STATUS_LABELS.short}
            {slugStatus === SLUG_STATUS.TAKEN && SLUG_STATUS_LABELS.taken}
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
          {ORG_USE_CASES.map((uc) => (
            <Button
              key={uc.id}
              variant="option"
              data-selected={uc.id === useCase}
              onClick={() => setUseCase(uc.id)}
            >
              <PathIcon
                path={uc.path}
                className="o-ic"
                style={{
                  color: uc.id === useCase ? "var(--primary)" : undefined,
                }}
              />
              {uc.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Team size */}
      <div className="ob-field">
        <label>How big is your team?</label>
        <div className="opt-grid cols-3">
          {ORG_SIZES.map((s) => (
            <Button
              key={s.value}
              variant="option"
              data-selected={s.value === size}
              className="justify-center"
              onClick={() => setSize(s.value)}
            >
              {s.label}
            </Button>
          ))}
        </div>
        {ORG_LARGE_SIZES.includes(size) && (
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
