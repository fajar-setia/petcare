import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { authApi } from "../features/auth/api/authApi";
import { tokenStorage } from "../features/auth/utils/tokenStorage";
import type { User } from "../features/auth/types/auth.types";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  signIn: (token: string, user: User) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const restoreSession = useCallback(async () => {
    try {
      const token = await tokenStorage.get();

      if (!token) {
        setUser(null);
        return;
      }

      // Validasi token dan ambil data pengguna
      const currentUser = await authApi.me();

      console.log("RESTORE BERHASIL:", currentUser.email);

      setUser(currentUser);
    } catch (error) {
      console.error("Gagal memulihkan sesi:", error);

      // Jangan menganggap sesi valid jika verifikasi gagal.
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  // Tambahkan ini
  useEffect(() => {
    console.log("AUTH USER:", user?.email ?? null);
    console.log("AUTH LOADING:", loading);
  }, [user, loading]);

  const signIn = async (token: string, newUser: User) => {
    await tokenStorage.save(token);
    setUser(newUser);
  };

  const signOut = async () => {
    await tokenStorage.remove();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: user !== null,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider");
  }

  return context;
}
