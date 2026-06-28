"use client";

import { useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { ArrowRightIcon } from "@/icons";
import {
  AI_BUILD_STEPS,
  ANIM_DURATION_MS,
  BLANK_BUILD_STEPS,
  BUILD_TITLE_AI,
  BUILD_TITLE_BLANK,
  DEFAULT_CTX,
  INVITE_STEP_INDEX,
  ONBOARDING_DESTINATION,
  PROJECT_STEP_INDEX,
  SKIP_LABELS,
  STEP_COUNT,
} from "@/constants/onboarding";
import { Button } from "@/components/ui/button";
import type { BuildConfig, Layer, OnboardingCtx, StepHandle } from "../types";
import { OnboardingLeft } from "./OnboardingLeft";
import { Stepper } from "./Stepper";
import { BuildOverlay } from "./BuildOverlay";
import { StepOrg } from "./steps/StepOrg";
import { StepInvite } from "./steps/StepInvite";
import { StepProject } from "./steps/StepProject";

const noop = () => {};

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
    const enterClass: Layer["animClass"] = forward ? "in-right" : "in-left";

    setLayers((prev) => [
      ...prev.map((l) => ({ ...l, animClass: "leaving" as const })),
      {
        key: `step-${newIndex}-${Date.now()}`,
        stepIndex: newIndex,
        animClass: enterClass,
      },
    ]);
    setStepIndex(newIndex);
    setIsNextEnabled(newIndex === INVITE_STEP_INDEX);
    setNextLabel("Continue");

    setTimeout(() => {
      setLayers((prev) => prev.filter((l) => l.animClass !== "leaving"));
    }, ANIM_DURATION_MS);
  };

  const showBuild = (finalCtx: OnboardingCtx) => {
    const isBlank = finalCtx.project.tplId === "blank";
    setBuildConfig({
      title: isBlank ? BUILD_TITLE_BLANK : BUILD_TITLE_AI,
      steps: isBlank ? BLANK_BUILD_STEPS : AI_BUILD_STEPS,
      destination: ONBOARDING_DESTINATION,
    });
  };

  const handleNext = () => {
    const data = stepRef.current?.getData();
    if (data === null) return;
    const newCtx = { ...ctx, ...(data ?? {}) };
    setCtx(newCtx);
    if (stepIndex < PROJECT_STEP_INDEX) navigate(stepIndex + 1);
    else showBuild(newCtx);
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

  const renderStep = (index: number, isActive: boolean) => {
    const ref = isActive ? stepRef : null;
    const onValidChange = isActive ? setIsNextEnabled : noop;
    const onNextLabelChange = isActive ? setNextLabel : noop;

    const steps: Record<number, React.ReactNode> = {
      0: <StepOrg ref={ref} ctx={ctx} onValidChange={onValidChange} />,
      1: (
        <StepInvite
          ref={ref}
          ctx={ctx}
          onValidChange={onValidChange}
          onNextLabelChange={onNextLabelChange}
        />
      ),
      2: (
        <StepProject
          ref={ref}
          ctx={ctx}
          onValidChange={onValidChange}
          onNextLabelChange={onNextLabelChange}
        />
      ),
    };

    return steps[index] ?? null;
  };

  const skipLabel = SKIP_LABELS[stepIndex];
  const progressPct = (stepIndex / (STEP_COUNT - 1)) * 100;

  return (
    <>
      <div className="ob">
        <OnboardingLeft />

        <main className="ob-right">
          <div className="ob-top">
            <Stepper current={stepIndex} />
            {skipLabel ? (
              <Button
                variant="link"
                className="text-(--text-2) text-[13.5px] gap-1.5 font-semibold"
                onClick={handleSkip}
              >
                {skipLabel}
                <ChevronRight size={14} />
              </Button>
            ) : (
              <span />
            )}
          </div>

          <div className="ob-stage">
            <div className="ob-viewport">
              {layers.map((layer) => (
                <div key={layer.key} className={`step-view ${layer.animClass}`}>
                  {renderStep(layer.stepIndex, layer.animClass !== "leaving")}
                </div>
              ))}
            </div>

            <div className="ob-actionbar">
              <div className="ob-action-inner">
                {stepIndex > 0 && (
                  <Button
                    variant="ghost"
                    size="md"
                    onClick={() => navigate(stepIndex - 1)}
                  >
                    Back
                  </Button>
                )}
                <Button
                  variant="primary"
                  size="md"
                  className="flex-1"
                  disabled={!isNextEnabled}
                  onClick={handleNext}
                >
                  <ArrowRightIcon size={16} />
                  {nextLabel}
                </Button>
              </div>
            </div>
          </div>

          <div className="ob-progress-track">
            <div className="ob-progress" style={{ width: `${progressPct}%` }} />
          </div>
        </main>
      </div>

      {buildConfig && <BuildOverlay config={buildConfig} />}
    </>
  );
};
