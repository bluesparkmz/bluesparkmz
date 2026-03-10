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

type RequestOptions = {
  method?: string;
  token?: string | null;
  body?: BodyInit | null;
  json?: unknown;
  headers?: HeadersInit;
};

const API_URL = (
  process.env.NEXT_PUBLIC_ACCOUNTS_API_URL ||
  "http://localhost:8000"
).replace(/\/+$/, "");

export const authStorage = {
  accessTokenKey: "bluespark_access_token",
  refreshTokenKey: "bluespark_refresh_token",
};

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
}) {
  return apiRequest<AuthTokens>("/auth/register", {
    method: "POST",
    json: payload,
  });
}

export async function loginAccount(payload: { identifier: string; password: string }) {
  return apiRequest<AuthTokens>("/auth/login", {
    method: "POST",
    json: payload,
  });
}

export async function refreshAccessToken(refreshToken: string) {
  return apiRequest<AuthTokens>("/auth/refresh", {
    method: "POST",
    json: { refresh_token: refreshToken },
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

export function buildGoogleStartUrl(nextUrl: string) {
  return `${API_URL}/auth/google/start?next=${encodeURIComponent(nextUrl)}`;
}
