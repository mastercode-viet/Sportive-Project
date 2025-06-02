import type { AuthProvider } from "@refinedev/core";

export const TOKEN_KEY = "refine-auth";

export const authProvider: AuthProvider = {
  login: async ({ username, email, password }) => {
    // Giả lập: chỉ cho phép admin đăng nhập
    if ((username === "admin" || email === "admin@admin.com") && password === "admin") {
      const user = {
        id: 1,
        name: "Admin",
        email: email || "admin@admin.com",
        role: "admin",
        avatar: "https://i.pravatar.cc/300",
      };
      localStorage.setItem(TOKEN_KEY, JSON.stringify(user));
      return {
        success: true,
        redirectTo: "/admin",
        user,
      };
    }
    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    };
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const userStr = localStorage.getItem(TOKEN_KEY);
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.role === "admin") {
        return { authenticated: true };
      }
    }
    return { authenticated: false, redirectTo: "/login" };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const userStr = localStorage.getItem(TOKEN_KEY);
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
