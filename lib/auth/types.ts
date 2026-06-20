export const authRoles = ["admin", "editor", "user"] as const;

export type AuthRole = (typeof authRoles)[number];

export type AuthUser = {
  id: string;
  username: string;
  displayName: string;
  role: AuthRole;
};

export type AuthSession = {
  userId: string;
  role: AuthRole;
  username: string;
  displayName: string;
  expiresAt: number;
};

export type LoginInput = {
  username: string;
  password: string;
};

export type LoginResult =
  | {
      success: true;
      user: AuthUser;
    }
  | {
      success: false;
      message: string;
    };
