import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 font-semibold whitespace-nowrap cursor-pointer select-none transition-[transform,box-shadow,filter,background,border-color] duration-150 outline-none focus-visible:ring-2 focus-visible:ring-ring/60 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // ── NexTask core ──────────────────────────────────────────────
        primary:
          "bg-primary text-(--primary-ink) rounded-xl [box-shadow:0_8px_24px_-8px_var(--primary)] hover:-translate-y-0.5 hover:[box-shadow:0_14px_34px_-8px_var(--primary)]",
        ghost:
          "bg-transparent text-(--text-0) rounded-xl border border-(--border-2) hover:bg-(--bg-2) hover:border-(--text-3)",
        ai: "rounded-xl text-[#1a0e06] font-bold [background:linear-gradient(110deg,var(--ai-a),var(--ai-b))] [box-shadow:var(--ai-glow)] hover:-translate-y-0.5 hover:brightness-105",
        // ── App UI (forms, dialogs, destructive) ──────────────────────
        secondary:
          "bg-(--bg-2) text-(--text-0) rounded-xl border border-(--border-2) hover:bg-(--bg-3)",
        destructive:
          "bg-transparent text-(--danger) rounded-xl border border-(--danger) hover:bg-(--danger)/10",
        link: "text-primary underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        sm: "py-2    px-3.5  text-sm    rounded-[10px]",
        md: "py-3    px-5    text-[15px]",
        lg: "py-4    px-7    text-base  rounded-[14px]",
        icon: "size-9 rounded-xl",
        "icon-sm": "size-7 rounded-lg [&_svg:not([class*='size-'])]:size-3.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
