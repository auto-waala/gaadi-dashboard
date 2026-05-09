import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Lightweight auth context — replace these stubs with calls to your own backend API.
export type AuthUser = {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
};

type AuthCtx = {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (data: AuthUser & { password: string }) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error?: string }>;
  updatePassword: (password: string) => Promise<{ error?: string }>;
};

const STORAGE_KEY = "autonext_user";

const Ctx = createContext<AuthCtx>({
  user: null,
  loading: true,
  signIn: async () => ({}),
  signUp: async () => ({}),
  signOut: async () => {},
  resetPassword: async () => ({}),
  updatePassword: async () => ({}),
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setLoading(false);
  }, []);

  const persist = (u: AuthUser | null) => {
    setUser(u);
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <Ctx.Provider
      value={{
        user,
        loading,
        // TODO: wire to your backend's POST /auth/login
        signIn: async (email) => {
          persist({ id: crypto.randomUUID(), email });
          return {};
        },
        // TODO: wire to your backend's POST /auth/register
        signUp: async ({ password: _pw, ...rest }) => {
          persist({ ...rest });
          return {};
        },
        // TODO: wire to your backend's POST /auth/logout
        signOut: async () => persist(null),
        // TODO: wire to your backend's POST /auth/forgot-password
        resetPassword: async () => ({}),
        // TODO: wire to your backend's POST /auth/reset-password
        updatePassword: async () => ({}),
      }}
    >
      {children}
    </Ctx.Provider>
  );
};

export const useAuth = () => useContext(Ctx);
