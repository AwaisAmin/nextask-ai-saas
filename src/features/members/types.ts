export type InviteStatus =
  | "loading"
  | "valid"
  | "expired"
  | "already_member"
  | "accepting"
  | "success"
  | "error";

export type InviteDetails = {
  token: string;
  org: {
    name: string;
    slug: string;
    accent: string;
  };
  inviter: {
    name: string;
    avatar: string | null;
  };
  role: string;
  expiresAt: string;
  email?: string;
};

export type AcceptInvitePayload = {
  token: string;
};
