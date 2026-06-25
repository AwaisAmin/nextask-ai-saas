import Link from "next/link";
import { ArrowRightIcon, CheckIcon } from "@/icons";
import { Button } from "@/components/ui/button";
import { VERIFY_EMAIL_CONTENT as C } from "@/constants/auth";
import { VerifyBadge } from "./VerifyBadge";

export const VerifySuccess = ({
  email,
  countdown,
}: {
  email?: string;
  countdown: number;
}) => (
  <>
    <VerifyBadge variant="ok">
      <CheckIcon size={34} strokeWidth={2.4} />
    </VerifyBadge>
    <h1 className="auth-title">{C.success.title}</h1>
    <p className="auth-sub">
      Your address {email ? <b>{email}</b> : "your email"} is confirmed. Your
      NexTask workspace is ready to go.
    </p>
    <Button asChild variant="primary" className="w-full justify-center">
      <Link href="/dashboard">
        {C.success.cta}
        <ArrowRightIcon />
      </Link>
    </Button>
    <div style={{ marginTop: 18, fontSize: "12.5px", color: "var(--text-3)" }}>
      Redirecting you automatically in{" "}
      <b style={{ color: "var(--text-1)" }}>{countdown}</b>s…
    </div>
  </>
);
