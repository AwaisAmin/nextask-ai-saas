"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_PROJECT_NAMES,
  PROJECT_TEMPLATES,
} from "@/constants/onboarding";
import { Input } from "@/components/ui/input";
import { getRecommendedTemplate } from "../../utils";
import { TemplateCard } from "./TemplateCard";
import type {
  OnboardingCtx,
  StepHandle,
  StepProjectCallbacks,
  TemplateId,
} from "../../types";

export const StepProject = forwardRef<
  StepHandle,
  { ctx: OnboardingCtx } & StepProjectCallbacks
>(({ ctx, onValidChange, onNextLabelChange }, ref) => {
  const useCase = ctx.org?.useCase ?? "product";
  const recId = getRecommendedTemplate(useCase);

  const sortedTemplates = useMemo(
    () =>
      [...PROJECT_TEMPLATES].sort(
        (a, b) => (b.id === recId ? 1 : 0) - (a.id === recId ? 1 : 0),
      ),
    [recId],
  );

  const [selectedId, setSelectedId] = useState<TemplateId>(
    ctx.project?.tplId ?? recId,
  );
  const [projectName, setProjectName] = useState(
    ctx.project?.name ?? DEFAULT_PROJECT_NAMES[recId],
  );
  const [nameEdited, setNameEdited] = useState(!!ctx.project?.name);

  const isValid = projectName.trim().length >= 2;
  const isAI = selectedId !== "blank";

  useEffect(() => {
    onValidChange(isValid);
  }, [isValid, onValidChange]);

  useEffect(() => {
    onNextLabelChange(isAI ? "Create project with AI" : "Create project");
  }, [isAI, onNextLabelChange]);

  useImperativeHandle(ref, () => ({
    getData() {
      if (!isValid) return null;
      return {
        project: {
          name: projectName.trim() || "My Project",
          tplId: selectedId,
        },
      };
    },
  }));

  const selectTemplate = (id: TemplateId) => {
    setSelectedId(id);
    if (
      !nameEdited ||
      Object.values(DEFAULT_PROJECT_NAMES).includes(projectName)
    ) {
      setProjectName(DEFAULT_PROJECT_NAMES[id]);
    }
  };

  return (
    <>
      <h1 className="ob-h1">Create your first project</h1>
      <p className="ob-sub">
        Pick a template — your AI teammate fills it with realistic starter
        tasks. Edit everything after.
      </p>

      <Input
        label="Project name"
        type="text"
        placeholder="Website Redesign"
        value={projectName}
        autoFocus
        onChange={(e) => {
          setProjectName(e.target.value);
          setNameEdited(true);
        }}
      />

      <p className="text-[13px] font-semibold text-(--text-1) mb-2.5 mt-1">
        Start from a template
      </p>

      <div className="tpl-grid">
        {sortedTemplates.map((t) => (
          <TemplateCard
            key={t.id}
            template={t}
            isSelected={t.id === selectedId}
            isRecommended={t.id === recId}
            onSelect={() => selectTemplate(t.id)}
          />
        ))}
      </div>
    </>
  );
});

StepProject.displayName = "StepProject";
