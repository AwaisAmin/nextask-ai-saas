"use client";

import { useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { ArrowRightIcon } from "@/icons";
import type { BuildConfig, OnboardingCtx, StepHandle } from "../types";
import { OnboardingLeft } from "./OnboardingLeft";
import { Stepper } from "./Stepper";
import { BuildOverlay } from "./BuildOverlay";
import { StepOrg } from "./steps/StepOrg";
import { StepInvite } from "./steps/StepInvite";
import { StepProject } from "./steps/StepProject";

type Layer = {
  key: string;
  stepIndex: number;
  animClass: "in-right" | "in-left" | "leaving";
};

const SKIP_LABELS: Record<number, string> = {
  1: "Skip for now",
  2: "Skip — start blank",
};

const AI_BUILD_STEPS = [
  "Creating the project board",
  "Generating starter tasks with AI",
  "Assigning by skill & setting due dates",
  "Writing your first daily standup",
];

const BLANK_BUILD_STEPS = ["Creating the project board"];

const DEFAULT_CTX: OnboardingCtx = {
  plan: "free",
  org: {
    name: "",
    slug: "",
    accent: "#7B61FF",
    useCase: "product",
    size: "2-10",
  },
  invites: [],
  project: { name: "My Project", tplId: "blank" },
};

export const OnboardingPage = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [layers, setLayers] = useState<Layer[]>([
    { key: "step-0-init", stepIndex: 0, animClass: "in-right" },
  ]);
  const [ctx, setCtx] = useState<OnboardingCtx>(DEFAULT_CTX);
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [nextLabel, setNextLabel] = useState("Continue");
  const [buildConfig, setBuildConfig] = useState<BuildConfig | null>(null);

  const stepRef = useRef<StepHandle>(null);

  const navigate = (newIndex: number) => {
    const forward = newIndex > stepIndex;
    const enterClass: "in-right" | "in-left" = forward ? "in-right" : "in-left";

    setLayers((prev) => [
      ...prev.map((l) => ({ ...l, animClass: "leaving" as const })),
      {
        key: `step-${newIndex}-${Date.now()}`,
        stepIndex: newIndex,
        animClass: enterClass,
      },
    ]);
    setStepIndex(newIndex);
    setIsNextEnabled(newIndex === 1); // invite is always valid
    setNextLabel("Continue");

    setTimeout(() => {
      setLayers((prev) => prev.filter((l) => l.animClass !== "leaving"));
    }, 320);
  };

  const showBuild = (finalCtx: OnboardingCtx) => {
    const isBlank = finalCtx.project.tplId === "blank";
    setBuildConfig({
      title: isBlank ? "Setting up your project…" : "Building your workspace…",
      steps: isBlank ? BLANK_BUILD_STEPS : AI_BUILD_STEPS,
      destination: "/organizations",
    });
  };

  const handleNext = () => {
    const data = stepRef.current?.getData();
    if (data === null) return;

    const newCtx = { ...ctx, ...(data ?? {}) };
    setCtx(newCtx);

    if (stepIndex < 2) {
      navigate(stepIndex + 1);
    } else {
      showBuild(newCtx);
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) navigate(stepIndex - 1);
  };

  const handleSkip = () => {
    if (stepIndex === 1) {
      navigate(2);
    } else if (stepIndex === 2) {
      const newCtx = {
        ...ctx,
        project: { name: "My Project", tplId: "blank" as const },
      };
      setCtx(newCtx);
      showBuild(newCtx);
    }
  };

  const skipLabel = SKIP_LABELS[stepIndex];
  const progressPct = (stepIndex / 2) * 100;

  const renderStepContent = (index: number, isActive: boolean) => {
    const noop = () => {};
    switch (index) {
      case 0:
        return (
          <StepOrg
            ref={isActive ? stepRef : null}
            ctx={ctx}
            onValidChange={isActive ? setIsNextEnabled : noop}
          />
        );
      case 1:
        return (
          <StepInvite
            ref={isActive ? stepRef : null}
            ctx={ctx}
            onValidChange={isActive ? setIsNextEnabled : noop}
            onNextLabelChange={isActive ? setNextLabel : noop}
          />
        );
      case 2:
        return (
          <StepProject
            ref={isActive ? stepRef : null}
            ctx={ctx}
            onValidChange={isActive ? setIsNextEnabled : noop}
            onNextLabelChange={isActive ? setNextLabel : noop}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="ob">
        <OnboardingLeft />

        <main className="ob-right">
          {/* Top bar: stepper + skip */}
          <div className="ob-top">
            <Stepper current={stepIndex} />
            {skipLabel ? (
              <button type="button" className="ob-skip" onClick={handleSkip}>
                <span>{skipLabel}</span>
                <ChevronRight size={14} />
              </button>
            ) : (
              <span />
            )}
          </div>

          {/* Animated step stage */}
          <div className="ob-stage">
            <div className="ob-viewport">
              {layers.map((layer) => (
                <div key={layer.key} className={`step-view ${layer.animClass}`}>
                  {renderStepContent(
                    layer.stepIndex,
                    layer.animClass !== "leaving",
                  )}
                </div>
              ))}
            </div>

            {/* Action bar */}
            <div className="ob-actionbar">
              <div className="ob-action-inner">
                <button
                  type="button"
                  className="ob-btn-ghost"
                  onClick={handleBack}
                  hidden={stepIndex === 0}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="ob-btn-primary"
                  disabled={!isNextEnabled}
                  onClick={handleNext}
                >
                  <ArrowRightIcon size={16} />
                  {nextLabel}
                </button>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="ob-progress-track">
            <div className="ob-progress" style={{ width: `${progressPct}%` }} />
          </div>
        </main>
      </div>

      {buildConfig && <BuildOverlay config={buildConfig} />}
    </>
  );
};
