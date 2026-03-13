"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register, user, isLoading } = useAuth();
  const [step, setStep] = useState<"email" | "details">("email");
  const [form, setForm] = useState({
    email: "",
    username: "",
    full_name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHandingOff, setIsHandingOff] = useState(false);
  const redirectUri = (searchParams.get("redirect_uri") || "").trim() || null;
  const productCode = (searchParams.get("product_code") || "").trim() || null;
  const loginHref = (() => {
    const params = new URLSearchParams();
    if (redirectUri) {
      params.set("redirect_uri", redirectUri);
    }
    if (productCode) {
      params.set("product_code", productCode);
    }
    const query = params.toString();
    return query ? `/login?${query}` : "/login";
  })();

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

      const storedRefreshToken = localStorage.getItem("bluespark_refresh_token");
      if (!storedRefreshToken) {
        return;
      }

      setIsHandingOff(true);
      try {
        const tokens = await refreshAccessToken(storedRefreshToken, { productCode });
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
  }, [isLoading, productCode, redirectUri, router, user]);

  function handleContinueWithEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.email.trim()) {
      toast.error("Informe o email");
      return;
    }

    setStep("details");
  }

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("As senhas nao coincidem");
      return;
    }

    setIsSubmitting(true);
    try {
      const tokens = await register(
        {
          email: form.email,
          username: form.username,
          full_name: form.full_name || undefined,
          phone: form.phone || undefined,
          password: form.password,
        },
        { productCode },
      );
      toast.success("Conta criada com sucesso");
      redirectAfterAuth(tokens);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Falha ao criar conta");
    } finally {
      setIsSubmitting(false);
    }
  }

  const googleNextUrl =
    redirectUri ||
    buildAuthSuccessUrl("/auth/google/success", {
      redirectUri,
      productCode,
    });

  const xNextUrl =
    redirectUri ||
    buildAuthSuccessUrl("/auth/x/success", {
      redirectUri,
      productCode,
    });

  return (
    <AuthPageShell
      title="Criar conta BlueSpark"
      description="A mesma conta pode ser usada no SkyVenda, FastFood, SmartMoz e SkyPDV."
    >
      <GoogleOneTap />

      {step === "email" ? (
        <form onSubmit={handleContinueWithEmail} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isHandingOff}>
            Continuar com email
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
            Continuar com Google
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

          <p className="text-sm text-muted-foreground">
            Ja tem conta?{" "}
            <Link href={loginHref} className="text-primary hover:underline">
              Entrar
            </Link>
          </p>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={form.username}
              onChange={(event) => setForm((current) => ({ ...current, username: event.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="full_name">Nome completo</Label>
            <Input
              id="full_name"
              value={form.full_name}
              onChange={(event) => setForm((current) => ({ ...current, full_name: event.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              value={form.phone}
              onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
              placeholder="25884..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={form.password}
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar senha</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={(event) =>
                setForm((current) => ({ ...current, confirmPassword: event.target.value }))
              }
              required
            />
          </div>

          {redirectUri ? (
            <p className="text-xs text-muted-foreground">
              Depois de criar a conta, a sessao sera devolvida para a aplicacao consumidora.
            </p>
          ) : null}

          <div className="flex gap-3">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setStep("email")}>
              Voltar
            </Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting || isHandingOff}>
              {isSubmitting || isHandingOff ? "A criar..." : "Criar conta"}
            </Button>
          </div>
        </form>
      )}
    </AuthPageShell>
  );
}
