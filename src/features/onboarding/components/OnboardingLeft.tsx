import Link from "next/link";
import { CheckIcon, SparkIcon } from "@/icons";

const POINTS = [
  "Boards, docs & chat in one place",
  "An AI agent that does real work",
  "Free for small teams — no card",
] as const;

export const OnboardingLeft = () => (
  <div className="auth-left">
    <div className="auth-glow a" />
    <div className="auth-glow b" />

    <Link
      href="/"
      className="relative z-2 flex items-center gap-2.5 font-bold text-[19px] tracking-[-0.02em] [font-family:var(--font-display)]"
    >
      <span className="auth-logo-mark">N</span>
      NexTask
    </Link>

    <div className="relative z-2">
      <div className="auth-tag">
        <SparkIcon size={13} />
        Set up in under 2 minutes
      </div>

      <p className="text-[25px] font-medium leading-[1.36] tracking-[-0.02em] max-w-[360px] [font-family:var(--font-display)] text-wrap-pretty">
        Let&apos;s get your workspace ready. Your AI teammate will plan the
        first sprint as soon as you&apos;re in.
      </p>

      <ul className="ob-points">
        {POINTS.map((pt) => (
          <li key={pt}>
            <span className="op-ic">
              <CheckIcon size={14} strokeWidth={2.4} />
            </span>
            {pt}
          </li>
        ))}
      </ul>
    </div>

    <div className="relative z-2 text-[12.5px] text-(--text-3)">
      © 2026 NexTask, Inc.
    </div>
  </div>
);
