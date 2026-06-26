"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { CheckIcon } from "@/icons";
import type { BuildConfig } from "../types";

export const BuildOverlay = ({ config }: { config: BuildConfig | null }) => {
  const router = useRouter();
  const [stepStates, setStepStates] = useState<Array<"idle" | "on" | "done">>(
    [],
  );
  const fired = useRef(false);

  useEffect(() => {
    if (!config || fired.current) return;
    fired.current = true;

    const len = config.steps.length;
    setStepStates(new Array(len).fill("idle"));

    let i = 0;
    const tick = () => {
      if (i > 0) {
        setStepStates((prev) => {
          const next = [...prev];
          next[i - 1] = "done";
          return next;
        });
      }
      if (i < len) {
        const idx = i;
        setStepStates((prev) => {
          const next = [...prev];
          next[idx] = "on";
          return next;
        });
        i++;
        setTimeout(tick, 760);
      } else {
        setTimeout(() => router.push(config.destination), 480);
      }
    };

    tick();
  }, [config, router]);

  if (!config) return null;

  return (
    <div className="build-overlay on">
      <div className="build-badge">
        <Sparkles size={30} />
      </div>
      <div className="build-title">{config.title}</div>
      <div className="build-steps">
        {config.steps.map((step, i) => (
          <div
            key={step}
            className={`bstep${stepStates[i] === "on" ? " on" : stepStates[i] === "done" ? " done" : ""}`}
          >
            <span className="bs-mark">
              {stepStates[i] === "done" ? (
                <CheckIcon size={17} strokeWidth={2.6} />
              ) : (
                <span className="bs-spin" />
              )}
            </span>
            {step}
          </div>
        ))}
      </div>
    </div>
  );
};
