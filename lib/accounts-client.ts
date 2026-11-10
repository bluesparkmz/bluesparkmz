"use client";

export type ProductMembership = {
  product: {
    id: number;
    code: string;
    name: string;
    description?: string | null;
    is_active: boolean;
  };
  role: string;
  status: string;
};

export type AuthUser = {
  id: number;
  email: string;
  username: string;
  full_name?: string | null;
  phone?: string | null;
  whatsapp_number?: string | null;
  profile_image_url?: string | null;
  is_active: boolean;
  is_verified: boolean;
  memberships: ProductMembership[];
};

export type AuthTokens = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user?: AuthUser;
};

type ProductScopedRequest = {
  productCode?: string | null;
};

type RequestOptions = {
  method?: string;
  token?: string | null;
  body?: BodyInit | null;
  json?: unknown;
  headers?: HeadersInit;
};

const API_URL = "https://accounts.bluesparkmz.com".replace(/\/+$/, "");

export const authStorage = {
  accessTokenKey: "bluespark_access_token",
  refreshTokenKey: "bluespark_refresh_token",
};

export const adminStorage = {
  accessTokenKey: "bluespark_admin_access_token",
};

export type AdminMe = {
  id: number;
  email: string;
  full_name?: string | null;
  role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type AdminMembership = {
  id: number;
  product_code: string;
  product_name: string;
  role: string;
  status: string;
};

export type AdminUserListItem = {
  id: number;
  email: string;
  username: string;
  full_name?: string | null;
  phone?: string | null;
  is_active: boolean;
  is_verified: boolean;
  profile_image_url?: string | null;
  created_at?: string | null;
  memberships: AdminMembership[];
  apps: string[];
};

export type AdminUsersPage = {
  total: number;
  limit: number;
  offset: number;
  items: AdminUserListItem[];
};

export type AdminProductStat = {
  product_code: string;
  product_name: string;
  is_active: boolean;
  users_count: number;
};

export type AdminOverview = {
  total_users: number;
  active_users: number;
  inactive_users: number;
  products_count: number;
  by_product: AdminProductStat[];
};

export type AdminTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  role: string;
};

function dispatchMaintenanceError() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent("globalError", {
      detail: {
        type: "MAINTENANCE_ERROR",
        message: "Estamos em manutencao, tente mais tarde ou reporta para a nossa equipa",
      },
    }),
  );
}

async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);

  if (options.json !== undefined) {
    headers.set("Content-Type", "application/json");
  }

  if (options.token) {
    headers.set("Authorization", `Bearer ${options.token}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    method: options.method || "GET",
    headers,
    body: options.json !== undefined ? JSON.stringify(options.json) : options.body,
  });

  if (!response.ok) {
    if ([502, 503, 504].includes(response.status)) {
      dispatchMaintenanceError();
    }

    let message = "O pedido falhou";
    try {
      const data = await response.json();
      message = data?.detail || data?.message || message;
    } catch {}
    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export async function registerAccount(payload: {
  email: string;
  username: string;
  full_name?: string;
  phone?: string;
  password: string;
}, options: ProductScopedRequest = {}) {
  return apiRequest<AuthTokens>("/auth/register", {
    method: "POST",
    json: {
      ...payload,
      product_code: options.productCode || undefined,
    },
  });
}

export async function loginAccount(
  payload: { identifier: string; password: string },
  options: ProductScopedRequest = {},
) {
  return apiRequest<AuthTokens>("/auth/login", {
    method: "POST",
    json: {
      ...payload,
      product_code: options.productCode || undefined,
    },
  });
}

export async function refreshAccessToken(
  refreshToken: string,
  options: ProductScopedRequest = {},
) {
  return apiRequest<AuthTokens>("/auth/refresh", {
    method: "POST",
    json: {
      refresh_token: refreshToken,
      product_code: options.productCode || undefined,
    },
  });
}

export async function loginWithGoogleOneTap(
  credential: string,
  options: ProductScopedRequest = {},
) {
  return apiRequest<AuthTokens>("/auth/google/one-tap", {
    method: "POST",
    json: {
      credential,
      product_code: options.productCode || undefined,
    },
  });
}

export async function requestPasswordRecovery(identifier: string) {
  return apiRequest<{ message: string }>("/auth/password/recover", {
    method: "POST",
    json: { identifier },
  });
}

export async function verifyPasswordRecoveryOtp(payload: {
  identifier: string;
  otp: string;
}) {
  return apiRequest<{ message: string; reset_token: string }>("/auth/password/verify-otp", {
    method: "POST",
    json: payload,
  });
}

export async function resetPassword(payload: {
  reset_token: string;
  new_password: string;
}) {
  return apiRequest<{ message: string }>("/auth/password/reset", {
    method: "POST",
    json: payload,
  });
}

export async function getCurrentUser(token: string) {
  return apiRequest<AuthUser>("/auth/me", { token });
}

export async function loginAdmin(payload: { username: string; password: string }) {
  const body = new URLSearchParams();
  body.set("username", payload.username);
  body.set("password", payload.password);
  body.set("grant_type", "password");

  return apiRequest<AdminTokenResponse>("/admin/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
}

export async function getAdminMe(token: string) {
  return apiRequest<AdminMe>("/admin/me", { token });
}

export async function getAdminOverview(token: string) {
  return apiRequest<AdminOverview>("/admin/overview", { token });
}

export async function listAdminUsers(
  token: string,
  params: {
    q?: string;
    product_code?: string;
    is_active?: boolean | null;
    limit?: number;
    offset?: number;
  } = {},
) {
  const search = new URLSearchParams();
  if (params.q?.trim()) search.set("q", params.q.trim());
  if (params.product_code?.trim()) search.set("product_code", params.product_code.trim());
  if (params.is_active === true || params.is_active === false) {
    search.set("is_active", String(params.is_active));
  }
  if (params.limit != null) search.set("limit", String(params.limit));
  if (params.offset != null) search.set("offset", String(params.offset));
  const query = search.toString();
  return apiRequest<AdminUsersPage>(`/admin/users${query ? `?${query}` : ""}`, { token });
}

export async function updateProfile(
  token: string,
  payload: { full_name?: string; phone?: string },
) {
  return apiRequest<AuthUser>("/auth/profile", {
    method: "PATCH",
    token,
    json: payload,
  });
}

export async function uploadProfileImage(token: string, file: File) {
  const formData = new FormData();
  formData.append("file", file);

  return apiRequest<{ profile_image_url?: string | null; message: string }>(
    "/auth/profile/image",
    {
      method: "POST",
      token,
      body: formData,
    },
  );
}

export async function deleteProfileImage(token: string) {
  return apiRequest<{ profile_image_url?: string | null; message: string }>(
    "/auth/profile/image",
    {
      method: "DELETE",
      token,
    },
  );
}

export function buildGoogleStartUrl(nextUrl: string, productCode?: string | null) {
  const params = new URLSearchParams({
    next: nextUrl,
  });

  if (productCode) {
    params.set("product_code", productCode);
  }

  return `${API_URL}/auth/google/start?${params.toString()}`;
}

export function buildXStartUrl(nextUrl: string, productCode?: string | null) {
  const params = new URLSearchParams({
    next: nextUrl,
  });

  if (productCode) {
    params.set("product_code", productCode);
  }

  return `${API_URL}/auth/x/start?${params.toString()}`;
}

export function buildAuthSuccessUrl(
  path: "/auth/google/success" | "/auth/x/success",
  options: {
    redirectUri?: string | null;
    productCode?: string | null;
  } = {},
) {
  if (typeof window === "undefined") {
    return path;
  }

  const url = new URL(path, window.location.origin);

  if (options.redirectUri) {
    url.searchParams.set("redirect_uri", options.redirectUri);
  }

  if (options.productCode) {
    url.searchParams.set("product_code", options.productCode);
  }

  return url.toString();
}

/**
 * Só estes domínios (e subdomínios) recebem tokens de login. Sem esta lista,
 * qualquer link /login?redirect_uri=https://atacante.com entregava a sessão ao atacante.
 * Extra por ambiente: NEXT_PUBLIC_ALLOWED_REDIRECT_HOSTS="app.exemplo.com,outro.com"
 */
const DEFAULT_REDIRECT_HOSTS = ["bluesparkmz.com", "skyvenda.com", "zymoz.tech"];

function allowedRedirectHosts() {
  const extra = (process.env.NEXT_PUBLIC_ALLOWED_REDIRECT_HOSTS || "")
    .split(",")
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean);
  return [...DEFAULT_REDIRECT_HOSTS, ...extra];
}

export function isAllowedRedirectUri(value: string | null | undefined) {
  if (!value) {
    return false;
  }
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return false;
  }
  if (url.username || url.password) {
    return false;
  }
  const host = url.hostname.toLowerCase();
  const isLocal = host === "localhost" || host === "127.0.0.1";
  if (isLocal) {
    // localhost só fora de produção
    return process.env.NODE_ENV !== "production" && (url.protocol === "http:" || url.protocol === "https:");
  }
  if (url.protocol !== "https:") {
    return false;
  }
  return allowedRedirectHosts().some((allowed) => host === allowed || host.endsWith(`.${allowed}`));
}

export function buildConsumerRedirectUrl(
  redirectUri: string,
  tokens: Pick<AuthTokens, "access_token" | "refresh_token" | "expires_in">,
) {
  if (!isAllowedRedirectUri(redirectUri)) {
    // Destino não autorizado: não entrega tokens, fica no perfil.
    return "/profile";
  }
  const url = new URL(redirectUri);
  url.searchParams.set("access_token", tokens.access_token);
  url.searchParams.set("refresh_token", tokens.refresh_token);
  url.searchParams.set("expires_in", String(tokens.expires_in));
  return url.toString();
}
