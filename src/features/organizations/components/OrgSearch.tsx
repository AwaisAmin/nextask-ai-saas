"use client";

import { useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ORG_SEARCH_PLACEHOLDER } from "@/constants/organizations";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export const OrgSearch = ({ value, onChange }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== ref.current) {
        e.preventDefault();
        ref.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="relative mt-5 mb-3">
      <Search
        size={16}
        className="absolute left-[14px] top-1/2 -translate-y-1/2 text-(--text-3) pointer-events-none z-10"
      />
      <Input
        ref={ref}
        value={value}
        placeholder={ORG_SEARCH_PLACEHOLDER}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Escape" && onChange("")}
        className="org-search-input pl-[42px] pr-[38px] py-[11px]"
      />
      <span className="org-search-kbd">/</span>
    </div>
  );
};
