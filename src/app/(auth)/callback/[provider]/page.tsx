import { redirect } from "next/navigation";
import { OAuthCallbackClient } from "@/features/auth/components/OAuthCallbackClient";
import type { SocialProvider } from "@/features/auth/types";

const VALID_PROVIDERS: SocialProvider[] = ["google", "github"];

export default async function OAuthCallbackPage({
  params,
  searchParams,
}: {
  params: Promise<{ provider: string }>;
  searchParams: Promise<{ code?: string; error?: string }>;
}) {
  const { provider } = await params;
  const { code, error } = await searchParams;

  if (!VALID_PROVIDERS.includes(provider as SocialProvider) || !code || error) {
    redirect("/login");
  }

  return (
    <div className="verify-stage">
      <div className="glow" />
      <OAuthCallbackClient provider={provider as SocialProvider} code={code!} />
    </div>
  );
}
