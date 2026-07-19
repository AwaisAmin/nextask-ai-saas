export type InviteStatus =
  | "loading"
  | "valid"
  | "expired"
  | "already_member"
  | "accepting"
  | "success"
  | "error";

export type InviteDetails =
  | {
      already_accepted: true;
      org_slug: string;
      org_name: string;
    }
  | {
      already_accepted?: false;
      email: string;
      role: string;
      org_name: string;
      org_slug: string;
      inviter_name: string;
    };

export type AcceptInvitePayload = {
  token: string;
};
