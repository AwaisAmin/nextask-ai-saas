"use client";

import * as React from "react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
  capitalize?: boolean;
}

const Input = ({
  className,
  type,
  label,
  error,
  capitalize,
  onChange,
  ...props
}: InputProps) => {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (capitalize) {
      const pos = e.target.selectionStart;
      e.target.value = e.target.value.replace(/\b\w/g, (c) => c.toUpperCase());
      e.target.setSelectionRange(pos, pos);
    }
    onChange?.(e);
  };

  return (
    <div className={cn((label || error) && "mb-4")}>
      {label && (
        <label className="block text-[13px] font-semibold text-(--text-1) mb-1.75">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={isPassword ? (visible ? "text" : "password") : type}
          autoCapitalize={capitalize ? "words" : "off"}
          onChange={handleChange}
          data-slot="input"
          className={cn(
            "h-auto w-full bg-(--bg-2) border border-(--border-2) rounded-[11px] py-3.25 px-3.5 text-[14.5px] text-(--text-0) outline-none transition-[border-color] duration-150 placeholder:text-(--text-3) focus-visible:border-(--primary)",
            isPassword && "pr-10",
            className,
          )}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            tabIndex={-1}
            aria-label={visible ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-(--text-3) hover:text-(--text-1) transition-colors cursor-pointer"
          >
            {visible ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {error && <p className="text-[12.5px] text-(--danger) mt-1">{error}</p>}
    </div>
  );
};

export { Input };
