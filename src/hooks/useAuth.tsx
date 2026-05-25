import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import authService from "@/services/authService";

export type AuthUser = {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  userType?: string;
  emailVerified?: boolean;
};

type AuthCtx = {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (data: AuthUser & { password: string }) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error?: string }>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<{ error?: string }>;
  sendVerificationOtp: (email: string, purpose?: string) => Promise<{ error?: string }>;
  verifyOtp: (email: string, otp: string, purpose?: string) => Promise<{ error?: string }>;
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
  sendVerificationOtp: async () => ({}),
  verifyOtp: async () => ({}),
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Get stored user
        const storedUser = authService.getCurrentUser();
        const isAuthenticated = authService.isAuthenticated();
        
        if (storedUser && isAuthenticated) {
          setUser(storedUser);
        } else if (storedUser && !isAuthenticated) {
          // Token expired but we have stored user - clear it
          localStorage.removeItem(STORAGE_KEY);
          setUser(null);
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        localStorage.removeItem(STORAGE_KEY);
      } finally {
        setLoading(false);
      }
    };
    
    initAuth();
  }, []);

  const persist = (u: AuthUser | null) => {
    setUser(u);
    if (u) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const signIn = async (email: string, password: string): Promise<{ error?: string }> => {
    try {
      const response = await authService.login({ email, password });
      
      // Response now contains user data in the format we need
      const userData: AuthUser = {
        id: response.user.id,
        email: response.user.email,
        first_name: response.user.firstName || response.user.first_name,
        last_name: response.user.lastName || response.user.last_name,
        phone: response.user.phoneNumber || response.user.phone,
        userType: response.user.userType,
        emailVerified: response.user.emailVerified
      };
      
      persist(userData);
      return {};
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Login failed";
      return { error: errorMessage };
    }
  };

  const signUp = async (data: AuthUser & { password: string }): Promise<{ error?: string }> => {
    try {
      const response = await authService.register({
        email: data.email,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
      });
      
      const userData: AuthUser = {
        id: response.user.id,
        email: response.user.email,
        first_name: response.user.firstName || response.user.first_name,
        last_name: response.user.lastName || response.user.last_name,
        phone: response.user.phoneNumber || response.user.phone,
        userType: response.user.userType
      };
      
      persist(userData);
      return {};
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Registration failed";
      return { error: errorMessage };
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      persist(null);
      sessionStorage.clear();
    }
  };

  const resetPassword = async (email: string): Promise<{ error?: string }> => {
    try {
      await authService.forgotPassword(email);
      return {};
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to send reset email";
      return { error: errorMessage };
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string): Promise<{ error?: string }> => {
    try {
      await authService.changePassword({ currentPassword, newPassword });
      return {};
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to update password";
      return { error: errorMessage };
    }
  };

  const sendVerificationOtp = async (email: string, purpose: string = "verification"): Promise<{ error?: string }> => {
    try {
      await authService.sendVerificationOtp(email, purpose);
      return {};
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to send OTP";
      return { error: errorMessage };
    }
  };

  const verifyOtp = async (email: string, otp: string, purpose: string = "verification"): Promise<{ error?: string }> => {
    try {
      await authService.verifyOtp({ email, otp, purpose });
      return {};
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Invalid OTP";
      return { error: errorMessage };
    }
  };

  return (
    <Ctx.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updatePassword,
        sendVerificationOtp,
        verifyOtp,
      }}
    >
      {children}
    </Ctx.Provider>
  );
};

export const useAuth = () => useContext(Ctx);