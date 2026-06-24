import dynamic from "next/dynamic";

export const LandingAISection = dynamic(() =>
  import("@/components/landing/LandingAISection").then(
    (m) => m.LandingAISection,
  ),
);
export const LandingStats = dynamic(() =>
  import("@/components/landing/LandingStats").then((m) => m.LandingStats),
);
export const LandingPricing = dynamic(() =>
  import("@/components/landing/LandingPricing").then((m) => m.LandingPricing),
);
