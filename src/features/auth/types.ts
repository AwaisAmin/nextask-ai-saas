import type { User } from "@/types/user";

export type AuthData = {
  user: User;
  tokens: {
    access_token: string;
  };
};
