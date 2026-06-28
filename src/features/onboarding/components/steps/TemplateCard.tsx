"use client";

import { Sparkles } from "lucide-react";
import { CheckIcon } from "@/icons";
import { cn } from "@/lib/utils";
import type { TemplateCardProps } from "../../types";

export const TemplateCard = ({
  template: t,
  isSelected,
  isRecommended,
  onSelect,
}: TemplateCardProps) => (
  <button
    type="button"
    className={cn("tpl-card", isSelected && "sel")}
    onClick={onSelect}
  >
    {isRecommended && <span className="t-rec">Recommended</span>}
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
);
