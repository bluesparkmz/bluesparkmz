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

export default function RegisterPage() {
  const router = useRouter();
  const { register, user, isLoading } = useAuth();
  const [form, setForm] = useState({
    email: "",
    username: "",
    full_name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/profile");
    }
  }, [isLoading, router, user]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    setIsSubmitting(true);
    try {
      await register({
        email: form.email,
        username: form.username,
        full_name: form.full_name || undefined,
        phone: form.phone || undefined,
        password: form.password,
      });
      toast.success("Conta criada com sucesso");
      router.push("/profile");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Falha ao criar conta");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthPageShell
      title="Criar conta BlueSpark"
      description="A mesma conta pode ser usada no SkyVenda, FastFood, SmartMoz e SkyPDV."
    >
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

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "A criar..." : "Criar conta"}
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
          Continuar com Google
        </Button>

        <p className="text-sm text-muted-foreground">
          Já tem conta?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Entrar
          </Link>
        </p>
      </form>
    </AuthPageShell>
  );
}
