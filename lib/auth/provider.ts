import type { AuthUser, LoginInput, LoginResult } from "@/lib/auth/types";

export interface AuthProvider {
  login(input: LoginInput): Promise<LoginResult>;
  getUserById(userId: string): Promise<AuthUser | null>;
}

const mockUsers: Array<AuthUser & { password: string }> = [
  {
    id: "admin-1",
    username: "admin",
    password: "admin123",
    displayName: "مدیر سیستم",
    role: "admin",
  },
  {
    id: "user-1",
    username: "user",
    password: "user123",
    displayName: "کاربر مشاهده‌گر",
    role: "user",
  },
];

class MockAuthProvider implements AuthProvider {
  async login(input: LoginInput): Promise<LoginResult> {
    const username = input.username.trim().toLowerCase();
    const user = mockUsers.find(
      (candidate) =>
        candidate.username.toLowerCase() === username &&
        candidate.password === input.password,
    );

    if (!user) {
      return {
        success: false,
        message: "نام کاربری یا رمز عبور اشتباه است.",
      };
    }

    const safeUser: AuthUser = {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      role: user.role,
    };

    return {
      success: true,
      user: safeUser,
    };
  }

  async getUserById(userId: string): Promise<AuthUser | null> {
    const user = mockUsers.find((candidate) => candidate.id === userId);

    if (!user) {
      return null;
    }

    const safeUser: AuthUser = {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      role: user.role,
    };

    return safeUser;
  }
}

// این لایه بعدا به راحتی با Nest API جایگزین می‌شود.
export const authProvider: AuthProvider = new MockAuthProvider();
