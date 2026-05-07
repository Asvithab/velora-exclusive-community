import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CURRENT_USER, type Member } from "@/constants/mockData";

interface AuthContextValue {
  user: Member | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  login: (inviteCode: string, email: string) => Promise<boolean>;
  logout: () => Promise<void>;
  submitApplication: (data: ApplicationData) => Promise<void>;
}

export interface ApplicationData {
  name: string;
  email: string;
  bio: string;
  interests: string[];
  socialLinks: { instagram?: string; twitter?: string; linkedin?: string };
  whyJoin: string;
  inviteCode: string;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  isAdmin: false,
  login: async () => false,
  logout: async () => {},
  submitApplication: async () => {},
});

const VALID_CODES = ["VELORA2024", "VIP001", "FOUNDER", "ELITE2024", "ADMIN999"];
const ADMIN_CODE = "ADMIN999";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const stored = await AsyncStorage.getItem("velora_session");
      if (stored) {
        const session = JSON.parse(stored);
        setUser(session.user);
        setIsAdmin(session.isAdmin ?? false);
      }
    } catch {
      // no session
    } finally {
      setIsLoading(false);
    }
  };

  const login = useCallback(async (inviteCode: string, _email: string): Promise<boolean> => {
    const code = inviteCode.trim().toUpperCase();
    if (!VALID_CODES.includes(code)) return false;
    const admin = code === ADMIN_CODE;
    setUser(CURRENT_USER);
    setIsAdmin(admin);
    await AsyncStorage.setItem(
      "velora_session",
      JSON.stringify({ user: CURRENT_USER, isAdmin: admin })
    );
    return true;
  }, []);

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem("velora_session");
    setUser(null);
    setIsAdmin(false);
  }, []);

  const submitApplication = useCallback(async (_data: ApplicationData) => {
    await new Promise((r) => setTimeout(r, 1500));
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, isAdmin, login, logout, submitApplication }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
