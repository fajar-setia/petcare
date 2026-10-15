import { apiClient } from "../../../lib/apiClient";

import type {
  User,
  RegisterPayload,
  LoginPayload,
  LoginResponse,
} from "../types/auth.types";
import { tokenStorage } from "../utils/tokenStorage";

export const authApi = {
  register: (data: RegisterPayload) =>
    apiClient<User>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  login: (data: LoginPayload) =>
    apiClient<LoginResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  me: async (): Promise<User> => {
    const token = await tokenStorage.get();

    if (!token) {
      throw new Error("Token tidak ditemukan");
    }

    return apiClient<User>("/api/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
