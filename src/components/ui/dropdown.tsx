"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type DropdownProps = {
  trigger: (toggle: () => void) => React.ReactNode;
  children: React.ReactNode;
  className?: string;
  menuClassName?: string;
};

const Dropdown = ({
  trigger,
  children,
  className,
  menuClassName,
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const toggle = () => setOpen((v) => !v);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} className={cn("relative shrink-0", className)}>
      {trigger(toggle)}
      {open && (
        <div className={menuClassName} onClick={() => setOpen(false)}>
          {children}
        </div>
      )}
    </div>
  );
};

export { Dropdown };
