import { toInitials } from "@/lib/format";

type Props = {
  name: string;
  accent: string;
  size?: number;
  radius?: number;
};

export const OrgAvatar = ({ name, accent, size = 64, radius = 18 }: Props) => (
  <div
    className="flex items-center justify-center text-white font-bold shrink-0 select-none [font-family:var(--font-display)]"
    style={{
      width: size,
      height: size,
      borderRadius: radius,
      background: `linear-gradient(145deg, ${accent}, color-mix(in oklab, ${accent} 50%, #000))`,
      boxShadow: "0 10px 28px -10px rgba(0,0,0,.5)",
      fontSize: Math.round(size * 0.38),
    }}
  >
    {toInitials(name)}
  </div>
);
