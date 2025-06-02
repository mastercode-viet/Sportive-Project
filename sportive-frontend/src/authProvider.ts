import type { AuthProvider } from "@refinedev/core";
import axios from "axios";

export const TOKEN_KEY = "refine-auth";

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;
      const userData = {
        ...user,
        token,
        role: "admin", // Assuming the user is admin if login successful
      };

      localStorage.setItem(TOKEN_KEY, JSON.stringify(userData));
      
      return {
        success: true,
        redirectTo: "/admin",
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          name: "LoginError",
          message: error.response?.data?.error || "Invalid email or password",
        },
      };
    }
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
