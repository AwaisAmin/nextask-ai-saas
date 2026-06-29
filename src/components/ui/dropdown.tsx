"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

type DropdownProps = {
  trigger: (toggle: () => void) => React.ReactNode;
  children: React.ReactNode;
  className?: string;
  menuClassName?: string;
  portal?: boolean;
};

const Dropdown = ({
  trigger,
  children,
  className,
  menuClassName,
  portal = false,
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuPos, setMenuPos] = useState<React.CSSProperties>({});
  const toggle = () => setOpen((v) => !v);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        ref.current &&
        !ref.current.contains(target) &&
        !menuRef.current?.contains(target)
      )
        setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  useEffect(() => {
    if (!open || !portal || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMenuPos({
      position: "fixed",
      top: rect.bottom + 6,
      left: rect.left,
      right: "auto",
      width: rect.width,
      zIndex: 9999,
    });
    const onScroll = (e: Event) => {
      if (menuRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    window.addEventListener("scroll", onScroll, true);
    return () => window.removeEventListener("scroll", onScroll, true);
  }, [open, portal]);

  const menu = (
    <div
      ref={menuRef}
      className={menuClassName}
      style={portal ? menuPos : undefined}
      onClick={() => setOpen(false)}
    >
      {children}
    </div>
  );

  return (
    <div ref={ref} className={cn("relative shrink-0", className)}>
      {trigger(toggle)}
      {open &&
        (portal && typeof document !== "undefined"
          ? createPortal(menu, document.body)
          : menu)}
    </div>
  );
};

export { Dropdown };
