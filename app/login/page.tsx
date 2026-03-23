"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AuthPageShell from "@/components/auth/AuthPageShell";
import { useAuth } from "@/components/auth/AuthProvider";
import GoogleOneTap from "@/components/auth/GoogleOneTap";
import {
  buildAuthSuccessUrl,
  buildConsumerRedirectUrl,
  buildGoogleStartUrl,
  buildXStartUrl,
  refreshAccessToken,
} from "@/lib/accounts-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const { login, user, isLoading, refreshToken } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHandingOff, setIsHandingOff] = useState(false);
  const [redirectUri, setRedirectUri] = useState<string | null>(null);
  const [productCode, setProductCode] = useState<string | null>(null);
  const [provider, setProvider] = useState<string | null>(null);
  const shouldHideForm = isLoading || isHandingOff || !!user;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nextRedirectUri = (params.get("redirect_uri") || "").trim() || null;
    const nextProductCode = (params.get("product_code") || "").trim() || null;
    const nextProvider = (params.get("provider") || "").trim() || null;
    setRedirectUri(nextRedirectUri);
    setProductCode(nextProductCode);
    setProvider(nextProvider);
  }, []);
  const registerHref = (() => {
    const params = new URLSearchParams();
    if (redirectUri) {
      params.set("redirect_uri", redirectUri);
    }
    if (productCode) {
      params.set("product_code", productCode);
    }
    const query = params.toString();
    return query ? `/register?${query}` : "/register";
  })();
  const forgotPasswordHref = (() => {
    const params = new URLSearchParams();
    if (redirectUri) {
      params.set("redirect_uri", redirectUri);
    }
    if (productCode) {
      params.set("product_code", productCode);
    }
    const query = params.toString();
    return query ? `/forgot-password?${query}` : "/forgot-password";
  })();

  function redirectAfterAuth(tokens: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
  }) {
    if (redirectUri) {
      window.location.href = buildConsumerRedirectUrl(redirectUri, tokens);
      return;
    }

    router.push("/profile");
  }

  useEffect(() => {
    let cancelled = false;

    async function handoffExistingSession() {
      if (isLoading || !user) {
        return;
      }

      if (!redirectUri) {
        router.replace("/profile");
        return;
      }

      if (!refreshToken) {
        return;
      }

      setIsHandingOff(true);
      try {
        const tokens = await refreshAccessToken(refreshToken, { productCode });
        if (!cancelled) {
          window.location.href = buildConsumerRedirectUrl(redirectUri, tokens);
        }
      } catch {
        if (!cancelled) {
          setIsHandingOff(false);
        }
      }
    }

    handoffExistingSession();

    return () => {
      cancelled = true;
    };
  }, [isLoading, productCode, redirectUri, refreshToken, router, user]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const tokens = await login({ identifier, password }, { productCode });
      toast.success("Sessao iniciada");
      redirectAfterAuth(tokens);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Falha no login");
    } finally {
      setIsSubmitting(false);
    }
  }

  const googleNextUrl = buildAuthSuccessUrl("/auth/google/success", {
    redirectUri,
    productCode,
  });

  const xNextUrl = buildAuthSuccessUrl("/auth/x/success", {
    redirectUri,
    productCode,
  });

  if (shouldHideForm) {
    return (
      <AuthPageShell
        title="Entrar na sua conta"
        description={user ? "Sessao encontrada. A redirecionar..." : "A validar a sua sessao..."}
      >
        <div className="flex min-h-[220px] flex-col items-center justify-center gap-4 text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
          <p className="text-sm text-muted-foreground">
            {user ? "A redirecionar..." : "A validar sessao..."}
          </p>
        </div>
      </AuthPageShell>
    );
  }

  return (
    <AuthPageShell
      title="Entrar na sua conta"
      description="Use a conta central da BlueSpark MZ para aceder aos seus produtos."
    >
      <GoogleOneTap />
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="identifier">Email, username ou telefone</Label>
          <Input
            id="identifier"
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
            placeholder="seu@email.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="********"
            required
          />
          <div className="text-right">
            <Link href={forgotPasswordHref} className="text-sm text-primary hover:underline">
              Esqueci a senha
            </Link>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting || isHandingOff}>
          {isSubmitting || isHandingOff ? "A entrar..." : "Entrar"}
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => {
            window.location.href = buildGoogleStartUrl(googleNextUrl, productCode);
          }}
        >
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
          </svg>
          Entrar com Google
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => {
            window.location.href = buildXStartUrl(xNextUrl, productCode);
          }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
            <path d="M18.9 2H22l-6.78 7.75L23.2 22h-6.25l-4.9-7.42L5.56 22H2.45l7.25-8.29L1.8 2h6.4l4.43 6.86zM17.8 19.9h1.72L7.26 3.98H5.4z" />
          </svg>
          Continuar com X
        </Button>

        {redirectUri ? (
          <p className="text-xs text-muted-foreground">
            Sessao sera devolvida para a aplicacao consumidora apos autenticar.
          </p>
        ) : null}

        <p className="text-sm text-muted-foreground">
          Ainda nao tem conta?{" "}
          <Link href={registerHref} className="text-primary hover:underline">
            Criar conta
          </Link>
        </p>
      </form>
    </AuthPageShell>
  );
}
