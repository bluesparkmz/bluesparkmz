"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Camera, ChevronRight, LogOut, Mail, Phone, ShieldCheck, WalletCards } from "lucide-react";
import { toast } from "sonner";
import AuthHeaderControls from "@/components/auth/AuthHeaderControls";
import { useAuth } from "@/components/auth/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function getInitials(name?: string | null, username?: string) {
  const source = (name || username || "BS").trim();
  return source
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function InfoRow({
  icon,
  title,
  value,
}: {
  icon: ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-[28px] border border-border/70 bg-card px-4 py-4 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{value}</p>
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground/60" />
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const {
    user,
    isLoading,
    logout,
    saveProfile,
    saveProfileImage,
  } = useAuth();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [isLoading, router, user]);

  useEffect(() => {
    if (user) {
      setFullName(user.full_name || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  const membershipSummary = useMemo(
    () => user?.memberships?.filter((membership) => membership.status === "active") || [],
    [user],
  );

  async function handleSaveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    try {
      await saveProfile({
        full_name: fullName || undefined,
        phone: phone || undefined,
      });
      toast.success("Perfil atualizado");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Falha ao atualizar perfil");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setIsUploadingImage(true);
    try {
      await saveProfileImage(file);
      toast.success("Foto de perfil atualizada");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Falha ao enviar imagem");
    } finally {
      event.target.value = "";
      setIsUploadingImage(false);
    }
  }

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-background">
        <header className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-5">
          <Link
            href="/"
            className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-base font-semibold text-transparent"
          >
            BlueSpark MZ
          </Link>
          <AuthHeaderControls />
        </header>
        <main className="mx-auto flex min-h-[60vh] w-full max-w-3xl items-center justify-center px-4">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
            <p className="mt-4 text-sm text-muted-foreground">A carregar perfil...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-5">
        <Link
          href="/"
          className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-base font-semibold text-transparent"
        >
          BlueSpark MZ
        </Link>
        <AuthHeaderControls />
      </header>

      <main className="mx-auto w-full max-w-3xl space-y-5 px-4 pb-10 pt-2">
        <Card className="overflow-hidden rounded-[28px] border border-border/60 bg-gradient-to-br from-card via-card to-primary/5 shadow-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
                Perfil
              </h2>
              <p className="mt-1 text-xs font-semibold text-muted-foreground sm:text-sm">
                Conta central BlueSpark MZ
              </p>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-center gap-4">
                <div className="relative">
                  <Avatar className="h-16 w-16 ring-4 ring-background shadow-sm sm:h-20 sm:w-20">
                    <AvatarImage src={user.profile_image_url || ""} alt={user.full_name || user.username} />
                    <AvatarFallback>{getInitials(user.full_name, user.username)}</AvatarFallback>
                  </Avatar>
                  <label className="absolute -bottom-1 -right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-primary shadow-md">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                      disabled={isUploadingImage}
                    />
                    <Camera className="h-4 w-4" />
                  </label>
                </div>

                <div className="min-w-0">
                  <h1 className="truncate text-xl font-semibold text-foreground sm:text-2xl">
                    {user.full_name || user.username}
                  </h1>
                  <p className="truncate text-xs text-muted-foreground sm:text-sm">{user.email}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="inline-flex rounded-full bg-secondary px-3 py-1 text-[11px] font-medium text-secondary-foreground sm:text-xs">
                      @{user.username}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="shrink-0 rounded-full border-red-200/70 bg-card px-3 text-red-600 hover:bg-red-500/10 hover:text-red-700 dark:border-red-900/70 dark:text-red-400 dark:hover:bg-red-500/15 dark:hover:text-red-300"
                onClick={() => {
                  logout();
                  router.push("/login");
                }}
              >
                <LogOut className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Sair</span>
              </Button>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <input
                id="profile-image-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                disabled={isUploadingImage}
              />
            </div>
          </CardContent>
        </Card>

        <section className="space-y-3">
          <InfoRow icon={<Mail className="h-5 w-5" />} title="Email" value={user.email || "Nao definido"} />
          <InfoRow icon={<Phone className="h-5 w-5" />} title="Telefone" value={user.phone || "Nao definido"} />
          <InfoRow icon={<ShieldCheck className="h-5 w-5" />} title="WhatsApp" value={user.whatsapp_number || "Nao verificado"} />
        </section>

        <Card className="rounded-[32px] border border-border/60 bg-card shadow-sm">
          <CardContent className="space-y-5 p-5 sm:p-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Dados do perfil</h2>
              <p className="text-sm text-muted-foreground">Atualize os dados principais da sua conta BlueSpark.</p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Nome completo</Label>
                <Input
                  id="full_name"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  className="h-12 rounded-2xl border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="25884..."
                  className="h-12 rounded-2xl border-border"
                />
              </div>

              <Button type="submit" disabled={isSaving} className="h-11 rounded-full px-6">
                {isSaving ? "A guardar..." : "Guardar alteracoes"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="rounded-[32px] border border-border/60 bg-card shadow-sm">
          <CardContent className="space-y-4 p-5 sm:p-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Produtos ativos</h2>
              <p className="text-sm text-muted-foreground">Apps e acessos ligados a esta conta central.</p>
            </div>

            {membershipSummary.length ? (
              <div className="space-y-3">
                {membershipSummary.map((membership) => (
                  <div
                    key={`${membership.product.code}-${membership.role}`}
                    className="flex items-center gap-4 rounded-[24px] bg-secondary/60 px-4 py-4"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <WalletCards className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-foreground">{membership.product.name}</p>
                      <p className="text-sm text-muted-foreground">{membership.role}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground/60" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-[24px] bg-secondary/60 px-4 py-5 text-sm text-muted-foreground">
                Ainda nao ha produtos ativos ligados a esta conta.
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
