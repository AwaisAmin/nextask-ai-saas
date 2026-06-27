export type OrgUseCase = "product" | "agency" | "marketing" | "ops";
export type OrgSize = "Just me" | "2-10" | "11-50" | "51-200" | "200+";
export type MemberRole = "admin" | "member" | "viewer";
export type TemplateId = "product" | "marketing" | "design" | "blank";
export type Plan = "free" | "pro";

export type InviteRow = { email: string; role: MemberRole };

export type OnboardingOrg = {
  name: string;
  slug: string;
  accent: string;
  useCase: OrgUseCase;
  size: OrgSize;
};

export type OnboardingCtx = {
  plan: Plan;
  org: OnboardingOrg;
  invites: InviteRow[];
  project: { name: string; tplId: TemplateId };
};

export interface StepHandle {
  getData(): Partial<OnboardingCtx> | null;
}

export type Layer = {
  key: string;
  stepIndex: number;
  animClass: "in-right" | "in-left" | "leaving";
};

export type BuildConfig = {
  title: string;
  steps: readonly string[];
  destination: string;
};

export type StepOrgCallbacks = {
  onValidChange: (valid: boolean) => void;
};

export type StepInviteCallbacks = {
  onValidChange: (valid: boolean) => void;
  onNextLabelChange: (label: string) => void;
};

export type StepProjectCallbacks = {
  onValidChange: (valid: boolean) => void;
  onNextLabelChange: (label: string) => void;
};
