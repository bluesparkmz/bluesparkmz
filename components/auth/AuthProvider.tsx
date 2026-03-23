"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  authStorage,
  deleteProfileImage,
  getCurrentUser,
  loginAccount,
  refreshAccessToken,
  registerAccount,
  type AuthTokens,
  type AuthUser,
  updateProfile,
  uploadProfileImage,
} from "@/lib/accounts-client";

type ProductScopedRequest = {
  productCode?: string | null;
};

type AuthContextValue = {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  setSessionTokens: (tokens: Pick<AuthTokens, "access_token" | "refresh_token">) => Promise<void>;
  login: (
    payload: { identifier: string; password: string },
    options?: ProductScopedRequest,
  ) => Promise<AuthTokens>;
  register: (payload: {
    email: string;
    username: string;
    full_name?: string;
    phone?: string;
    password: string;
  }, options?: ProductScopedRequest) => Promise<AuthTokens>;
  logout: () => void;
  refreshUser: () => Promise<AuthUser | null>;
  saveProfile: (payload: { full_name?: string; phone?: string }) => Promise<AuthUser>;
  saveProfileImage: (file: File) => Promise<AuthUser>;
  removeProfileImage: () => Promise<AuthUser>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function persistTokens(tokens: Pick<AuthTokens, "access_token" | "refresh_token">) {
  localStorage.setItem(authStorage.accessTokenKey, tokens.access_token);
  localStorage.setItem(authStorage.refreshTokenKey, tokens.refresh_token);
}

function clearTokens() {
  localStorage.removeItem(authStorage.accessTokenKey);
  localStorage.removeItem(authStorage.refreshTokenKey);
}

function getInitialStoredToken(key: string) {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(key);
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(() => getInitialStoredToken(authStorage.accessTokenKey));
  const [refreshToken, setRefreshToken] = useState<string | null>(() => getInitialStoredToken(authStorage.refreshTokenKey));
  const [isLoading, setIsLoading] = useState(true);

  const applyTokens = useCallback((tokens: Pick<AuthTokens, "access_token" | "refresh_token">) => {
    setAccessToken(tokens.access_token);
    setRefreshToken(tokens.refresh_token);
    persistTokens(tokens);
  }, []);

  const logout = useCallback(() => {
    clearTokens();
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    if (!accessToken) {
      setUser(null);
      return null;
    }

    try {
      const currentUser = await getCurrentUser(accessToken);
      setUser(currentUser);
      return currentUser;
    } catch {
      if (!refreshToken) {
        logout();
        return null;
      }

      try {
        const refreshed = await refreshAccessToken(refreshToken);
        applyTokens(refreshed);
        const currentUser = await getCurrentUser(refreshed.access_token);
        setUser(currentUser);
        return currentUser;
      } catch {
        logout();
        return null;
      }
    }
  }, [accessToken, applyTokens, logout, refreshToken]);

  useEffect(() => {
    let isMounted = true;

    async function bootstrap() {
      if (!accessToken || !refreshToken) {
        if (isMounted) {
          setIsLoading(false);
        }
        return;
      }

      await refreshUser();
      if (isMounted) {
        setIsLoading(false);
      }
    }

    bootstrap();

    return () => {
      isMounted = false;
    };
  }, [accessToken, refreshUser]);

  const login = useCallback(
    async (
      payload: { identifier: string; password: string },
      options: ProductScopedRequest = {},
    ) => {
      const tokens = await loginAccount(payload, options);
      applyTokens(tokens);
      setUser(tokens.user || null);
      return tokens;
    },
    [applyTokens],
  );

  const setSessionTokens = useCallback(
    async (tokens: Pick<AuthTokens, "access_token" | "refresh_token">) => {
      setIsLoading(true);
      applyTokens(tokens);

      try {
        const currentUser = await getCurrentUser(tokens.access_token);
        setUser(currentUser);
      } catch {
        logout();
        throw new Error("Nao foi possivel validar a sessao Google");
      } finally {
        setIsLoading(false);
      }
    },
    [applyTokens, logout],
  );

  const register = useCallback(
    async (
      payload: {
        email: string;
        username: string;
        full_name?: string;
        phone?: string;
        password: string;
      },
      options: ProductScopedRequest = {},
    ) => {
      const tokens = await registerAccount(payload, options);
      applyTokens(tokens);
      setUser(tokens.user || null);
      return tokens;
    },
    [applyTokens],
  );

  const saveProfile = useCallback(
    async (payload: { full_name?: string; phone?: string }) => {
      if (!accessToken) {
        throw new Error("Sessão inválida");
      }

      const updatedUser = await updateProfile(accessToken, payload);
      setUser(updatedUser);
      return updatedUser;
    },
    [accessToken],
  );

  const saveProfileImage = useCallback(
    async (file: File) => {
      if (!accessToken) {
        throw new Error("Sessão inválida");
      }

      const result = await uploadProfileImage(accessToken, file);
      const updatedUser = await getCurrentUser(accessToken);
      const nextUser = {
        ...updatedUser,
        profile_image_url: result.profile_image_url ?? updatedUser.profile_image_url,
      };
      setUser(nextUser);
      return nextUser;
    },
    [accessToken],
  );

  const removeProfileImage = useCallback(async () => {
    if (!accessToken) {
      throw new Error("Sessão inválida");
    }

    await deleteProfileImage(accessToken);
    const updatedUser = await getCurrentUser(accessToken);
    setUser(updatedUser);
    return updatedUser;
  }, [accessToken]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      accessToken,
      refreshToken,
      isLoading,
      setSessionTokens,
      login,
      register,
      logout,
      refreshUser,
      saveProfile,
      saveProfileImage,
      removeProfileImage,
    }),
    [
      accessToken,
      isLoading,
      login,
      logout,
      refreshToken,
      refreshUser,
      register,
      removeProfileImage,
      saveProfile,
      saveProfileImage,
      setSessionTokens,
      user,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }

  return context;
}
