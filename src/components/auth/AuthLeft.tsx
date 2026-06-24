import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { SparkIcon } from "@/icons";

type TagContent = {
  label: string;
  quote: string;
};

export const AuthLeft = ({ tag }: { tag?: TagContent }) => (
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
      {tag ? (
        <>
          <div className="auth-tag">
            <LockKeyhole size={13} />
            {tag.label}
          </div>
          <p className="quote-lg">{tag.quote}</p>
        </>
      ) : (
        <>
          <div className="auth-ai-badge">
            <SparkIcon size={13} />
            AI-powered workspace
          </div>
          <p className="text-[26px] font-medium leading-[1.35] tracking-[-0.02em] max-w-105 [font-family:var(--font-display)]">
            &ldquo;NexTask planned our sprint, balanced the workload and wrote
            the standup — before our first coffee.&rdquo;
          </p>
          <div className="flex items-center gap-2.75 mt-5.5">
            <span
              className="size-9.5 rounded-full grid place-items-center text-white font-semibold text-sm shrink-0 [font-family:var(--font-display)]"
              style={{
                background: "linear-gradient(150deg, #FF8A4C, #b5552a)",
              }}
            >
              SM
            </span>
            <div>
              <div className="text-sm font-semibold">Sara Malik</div>
              <div className="text-[12.5px] text-(--text-3)">
                Design Lead, Northwind
              </div>
            </div>
          </div>
        </>
      )}
    </div>

    <div className="relative z-2 text-[12.5px] text-(--text-3)">
      © 2026 NexTask, Inc.
    </div>
  </div>
);
