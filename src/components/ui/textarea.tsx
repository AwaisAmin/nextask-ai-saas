"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  label?: string;
  error?: string;
}

const Textarea = ({ className, label, error, ...props }: TextareaProps) => (
  <div className={cn((label || error) && "mb-4")}>
    {label && (
      <label className="block text-[13px] font-semibold text-(--text-1) mb-1.75">
        {label}
      </label>
    )}
    <textarea
      data-slot="textarea"
      className={cn(
        "w-full bg-(--bg-2) border border-(--border-2) rounded-[11px] py-3.25 px-3.5 text-[14.5px] text-(--text-0) outline-none transition-[border-color] duration-150 placeholder:text-(--text-3) focus-visible:border-(--primary) resize-none",
        className,
      )}
      {...props}
    />
    {error && <p className="text-[12.5px] text-(--danger) mt-1">{error}</p>}
  </div>
);

export { Textarea };
