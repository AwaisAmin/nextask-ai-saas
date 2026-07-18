import { toInitials } from "@/lib/format";

type Props = {
  name: string;
  accent?: string;
  size?: number;
  radius?: number;
  shadow?: boolean;
};

export const OrgAvatar = ({
  name,
  accent = "var(--primary)",
  size = 64,
  radius = 18,
  shadow = false,
}: Props) => (
  <div
    className="flex items-center justify-center text-white font-bold shrink-0 select-none [font-family:var(--font-display)]"
    style={{
      width: size,
      height: size,
      borderRadius: radius,
      background: `linear-gradient(145deg, ${accent}, color-mix(in oklab, ${accent} 50%, #000))`,
      ...(shadow && { boxShadow: "0 10px 28px -10px rgba(0,0,0,.5)" }),
      fontSize: Math.round(size * 0.38),
    }}
  >
    {toInitials(name)}
  </div>
);
