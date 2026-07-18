// ── Invite accept page ────────────────────────────────────────────────────────

export const INVITE_PAGE_BRAND = "NexTask";
export const INVITE_PAGE_HEADING = "You've been invited";

// Heading built as: `${PRE} <b>OrgName</b> ${POST}`
export const INVITE_HEADING_PRE = "Join";
export const INVITE_HEADING_POST = "on NexTask";

export const INVITE_INVITER_SUFFIX = "invited you to join as";

export const INVITE_ACCEPT_LABEL = "Accept Invite";
export const INVITE_DECLINE_LABEL = "Decline";
export const INVITE_ACCEPTING_LABEL = "Joining…";

// Expiry note built as: `${PRE} ${days} ${DAYS}`
export const INVITE_EXPIRY_PRE = "This invite expires in";
export const INVITE_EXPIRY_DAYS = "days";

export const INVITE_LOGIN_LABEL = "Sign in";
export const INVITE_SIGNUP_LABEL = "Create account & accept";
export const INVITE_LOGIN_HINT = "Already have an account?";

export const INVITE_EXPIRED_HEADING = "This invite link has expired";
export const INVITE_EXPIRED_BODY =
  "Request a new invite from your team admin, or head back to explore NexTask on your own.";
export const INVITE_EXPIRED_CTA = "Back to homepage";

export const INVITE_ALREADY_HEADING = "You're already a member";
export const INVITE_ALREADY_BODY = "Head to your workspace to get started.";
export const INVITE_ALREADY_CTA = "Open dashboard";

export const INVITE_ERROR_HEADING = "This invite is invalid or has expired";
export const INVITE_ERROR_BODY =
  "Request a new invite from your team admin, or head back to explore NexTask on your own.";
export const INVITE_ERROR_CTA = "Back to homepage";

export const INVITE_SUCCESS_HEADING = "Welcome aboard!";
export const INVITE_SUCCESS_BODY = "You've joined";
export const INVITE_SUCCESS_CTA = "Open workspace";

export const INVITE_ROLE_CLASS: Record<string, string> = {
  admin: "inv-role-admin",
  member: "inv-role-member",
  viewer: "inv-role-viewer",
};
