import type { MemberAvatar } from "../types";

export const AvatarStack = ({ avatars }: { avatars: MemberAvatar[] }) => (
  <div className="flex items-center mr-0.5 shrink-0">
    {avatars.slice(0, 3).map((a) => (
      <span
        key={a.email}
        className="org-ava-dot"
        style={{ background: a.color }}
      >
        {a.initial}
      </span>
    ))}
  </div>
);
