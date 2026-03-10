"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AuthPageShell from "@/components/auth/AuthPageShell";
import { useAuth } from "@/components/auth/AuthProvider";
import { buildGoogleStartUrl } from "@/lib/accounts-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const { login, user, isLoading } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/profile");
    }
  }, [isLoading, router, user]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await login({ identifier, password });
      toast.success("Sessão iniciada");
      router.push("/profile");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Falha no login");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthPageShell
      title="Entrar na sua conta"
      description="Use a conta central da BlueSpark MZ para aceder aos seus produtos."
    >
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
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "A entrar..." : "Entrar"}
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => {
            const nextUrl = `${window.location.origin}/auth/google/success`;
            window.location.href = buildGoogleStartUrl(nextUrl);
          }}
        >
          Entrar com Google
        </Button>

        <p className="text-sm text-muted-foreground">
          Ainda não tem conta?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Criar conta
          </Link>
        </p>
      </form>
    </AuthPageShell>
  );
}
