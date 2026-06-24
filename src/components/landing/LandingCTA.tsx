import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@/icons";

export const LandingCTA = () => {
  return (
    <section className="section pt-5">
      <div className="wrap">
        <div className="cta-band reveal">
          <div className="glow-c" />
          <div className="relative z-2">
            <h2 className="h2 mb-3.5">Give your team an AI teammate</h2>
            <p className="lead max-w-130 mx-auto mb-7.5">
              Free for small teams. Two minutes to set up. Your first sprint
              planned before lunch.
            </p>
            <div className="hero-cta">
              <Button asChild variant="primary" size="lg">
                <Link href="/register">
                  Start free
                  <ArrowRightIcon size={17} />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link href="#features">Explore the demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
