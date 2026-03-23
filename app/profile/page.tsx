"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Camera, CheckCircle2, ChevronRight, LogOut, Mail, Phone, ShieldCheck, WalletCards } from "lucide-react";
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
    <div className="flex items-center gap-4 rounded-[28px] bg-white px-4 py-4 shadow-sm ring-1 ring-black/5">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="text-sm text-slate-500">{value}</p>
      </div>
      <ChevronRight className="h-5 w-5 text-slate-300" />
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
      <div className="min-h-screen bg-[#eef3fb]">
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
            <p className="mt-4 text-sm text-slate-500">A carregar perfil...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eef3fb]">
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
        <Card className="overflow-hidden rounded-[32px] border-none bg-gradient-to-br from-white via-white to-indigo-50 shadow-sm">
          <CardContent className="p-5 sm:p-6">
            <div className="mb-5">
              <h2 className="text-3xl font-black tracking-tight text-slate-950">
                Perfil
              </h2>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                Conta central BlueSpark MZ
              </p>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-center gap-4">
                <div className="relative">
                  <Avatar className="h-20 w-20 ring-4 ring-white shadow-sm">
                    <AvatarImage src={user.profile_image_url || ""} alt={user.full_name || user.username} />
                    <AvatarFallback>{getInitials(user.full_name, user.username)}</AvatarFallback>
                  </Avatar>
                  <label className="absolute -bottom-1 -right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-indigo-600 shadow-md ring-1 ring-black/5">
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
                  <h1 className="truncate text-2xl font-semibold text-slate-900">
                    {user.full_name || user.username}
                  </h1>
                  <p className="truncate text-sm text-slate-500">{user.email}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {user.is_verified ? "Conta verificada" : "Conta pendente"}
                    </span>
                    <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      @{user.username}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="shrink-0 rounded-full border-red-200 bg-white text-red-600 hover:bg-red-50 hover:text-red-700"
                onClick={() => {
                  logout();
                  router.push("/login");
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sair
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

        <Card className="rounded-[32px] border-none shadow-sm">
          <CardContent className="space-y-5 p-5 sm:p-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Dados do perfil</h2>
              <p className="text-sm text-slate-500">Atualize os dados principais da sua conta BlueSpark.</p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Nome completo</Label>
                <Input
                  id="full_name"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  className="h-12 rounded-2xl border-slate-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="25884..."
                  className="h-12 rounded-2xl border-slate-200"
                />
              </div>

              <Button type="submit" disabled={isSaving} className="h-11 rounded-full px-6">
                {isSaving ? "A guardar..." : "Guardar alteracoes"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="rounded-[32px] border-none shadow-sm">
          <CardContent className="space-y-4 p-5 sm:p-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Produtos ativos</h2>
              <p className="text-sm text-slate-500">Apps e acessos ligados a esta conta central.</p>
            </div>

            {membershipSummary.length ? (
              <div className="space-y-3">
                {membershipSummary.map((membership) => (
                  <div
                    key={`${membership.product.code}-${membership.role}`}
                    className="flex items-center gap-4 rounded-[24px] bg-slate-50 px-4 py-4"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                      <WalletCards className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-900">{membership.product.name}</p>
                      <p className="text-sm text-slate-500">{membership.role}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-slate-300" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-[24px] bg-slate-50 px-4 py-5 text-sm text-slate-500">
                Ainda nao ha produtos ativos ligados a esta conta.
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-[32px] border-none shadow-sm">
          <CardContent className="space-y-3 p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-slate-900">Conta e login</h2>
            <div className="rounded-[24px] bg-slate-50 px-4 py-4">
              <p className="text-sm font-medium text-slate-900">Username</p>
              <p className="mt-1 text-sm text-slate-500">@{user.username}</p>
            </div>
            <div className="rounded-[24px] bg-slate-50 px-4 py-4">
              <p className="text-sm font-medium text-slate-900">ID central</p>
              <p className="mt-1 break-all text-sm text-slate-500">{user.id}</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
