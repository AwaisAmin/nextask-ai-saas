"use client";

import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Sparkles } from "lucide-react";
import { CheckIcon } from "@/icons";
import type {
  OnboardingCtx,
  OrgUseCase,
  StepHandle,
  StepProjectCallbacks,
  TemplateId,
} from "../../types";

const TEMPLATES: {
  id: TemplateId;
  emoji: string;
  color: string;
  name: string;
  desc: string;
  tasks: number;
  for: OrgUseCase[];
}[] = [
  {
    id: "product",
    emoji: "◆",
    color: "#7B61FF",
    name: "Product / Sprint",
    desc: "Kanban, sprints, bugs & backlog",
    tasks: 8,
    for: ["product"],
  },
  {
    id: "marketing",
    emoji: "✦",
    color: "#FF8A4C",
    name: "Marketing campaign",
    desc: "Briefs, content calendar, launch",
    tasks: 7,
    for: ["marketing"],
  },
  {
    id: "design",
    emoji: "▲",
    color: "#36C58E",
    name: "Design / Agency",
    desc: "Research, explore, deliver to clients",
    tasks: 6,
    for: ["agency", "ops"],
  },
  {
    id: "blank",
    emoji: "＋",
    color: "#7E8595",
    name: "Blank project",
    desc: "Just the columns — start fresh",
    tasks: 0,
    for: [],
  },
];

const DEFAULT_NAMES: Record<TemplateId, string> = {
  product: "Website Redesign",
  marketing: "Q3 Launch",
  design: "Brand Refresh",
  blank: "My Project",
};

const getRecommended = (useCase: OrgUseCase): TemplateId =>
  TEMPLATES.find((t) => t.for.includes(useCase))?.id ?? "product";

export const StepProject = forwardRef<
  StepHandle,
  { ctx: OnboardingCtx } & StepProjectCallbacks
>(({ ctx, onValidChange, onNextLabelChange }, ref) => {
  const useCase = ctx.org?.useCase ?? "product";
  const recId = getRecommended(useCase);

  const sortedTemplates = [...TEMPLATES].sort(
    (a, b) => (b.id === recId ? 1 : 0) - (a.id === recId ? 1 : 0),
  );

  const [selectedId, setSelectedId] = useState<TemplateId>(
    ctx.project?.tplId ?? recId,
  );
  const [projectName, setProjectName] = useState(
    ctx.project?.name ?? DEFAULT_NAMES[recId],
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
    if (!nameEdited || Object.values(DEFAULT_NAMES).includes(projectName)) {
      setProjectName(DEFAULT_NAMES[id]);
    }
  };

  return (
    <>
      <h1 className="ob-h1">Create your first project</h1>
      <p className="ob-sub">
        Pick a template — your AI teammate fills it with realistic starter
        tasks. Edit everything after.
      </p>

      <div className="ob-field">
        <label htmlFor="ob-proj-name">Project name</label>
        <input
          id="ob-proj-name"
          className="ob-input"
          type="text"
          placeholder="Website Redesign"
          value={projectName}
          autoFocus
          onChange={(e) => {
            setProjectName(e.target.value);
            setNameEdited(true);
          }}
        />
      </div>

      <label className="text-[13px] font-semibold text-(--text-1) block mb-2.5">
        Start from a template
      </label>

      <div className="tpl-grid">
        {sortedTemplates.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`tpl-card${t.id === selectedId ? " sel" : ""}`}
            onClick={() => selectTemplate(t.id)}
          >
            {t.id === recId && <span className="t-rec">Recommended</span>}
            <span className="t-check">
              <CheckIcon size={12} strokeWidth={3} />
            </span>
            <span
              className="t-ic"
              style={{
                background: `color-mix(in oklab, ${t.color} 16%, transparent)`,
                color: t.color,
              }}
            >
              {t.emoji}
            </span>
            <div className="t-name">{t.name}</div>
            <div className="t-desc">{t.desc}</div>
            <div className="t-meta">
              {t.tasks > 0 ? (
                <>
                  <Sparkles size={12} />
                  {t.tasks} AI tasks included
                </>
              ) : (
                "Empty board"
              )}
            </div>
          </button>
        ))}
      </div>
    </>
  );
});

StepProject.displayName = "StepProject";
