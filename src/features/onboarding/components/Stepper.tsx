import { CheckIcon } from "@/icons";

const STEPS = ["Organization", "Invite team", "First project"] as const;

export const Stepper = ({ current }: { current: number }) => (
  <ol className="ob-stepper">
    {STEPS.map((label, i) => {
      const isDone = i < current;
      const isActive = i === current;
      return (
        <li key={label} className={isDone ? "done" : isActive ? "active" : ""}>
          <span className="s-dot">
            <span className="s-num">{i + 1}</span>
            <span className="s-check">
              <CheckIcon size={13} strokeWidth={3} />
            </span>
          </span>
          <span>{label}</span>
        </li>
      );
    })}
  </ol>
);
