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

export function buildConsumerRedirectUrl(
  redirectUri: string,
  tokens: Pick<AuthTokens, "access_token" | "refresh_token" | "expires_in">,
) {
  const url = new URL(redirectUri);
  url.searchParams.set("access_token", tokens.access_token);
  url.searchParams.set("refresh_token", tokens.refresh_token);
  url.searchParams.set("expires_in", String(tokens.expires_in));
  return url.toString();
}
