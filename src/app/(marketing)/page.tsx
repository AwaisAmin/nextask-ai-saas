import { LandingNav } from "@/components/landing/LandingNav";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingTrust } from "@/components/landing/LandingTrust";
import { LandingAISection } from "@/components/landing/LandingAISection";
import { LandingBento } from "@/components/landing/LandingBento";
import { LandingStats } from "@/components/landing/LandingStats";
import { LandingPricing } from "@/components/landing/LandingPricing";
import { LandingTestimonials } from "@/components/landing/LandingTestimonials";
import { LandingCTA } from "@/components/landing/LandingCTA";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { RevealObserver } from "@/components/landing/RevealObserver";

export default function LandingPage() {
  return (
    <main className="lp-body lp" id="top">
      <RevealObserver />
      <LandingNav />
      <LandingHero />
      <LandingTrust />
      <LandingAISection />
      <LandingBento />
      <LandingStats />
      <LandingPricing />
      <LandingTestimonials />
      <LandingCTA />
      <LandingFooter />
    </main>
  );
}
