"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AuthHeaderControls from "@/components/auth/AuthHeaderControls";
import { useAuth } from "@/components/auth/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function ProfilePage() {
  const router = useRouter();
  const {
    user,
    isLoading,
    logout,
    saveProfile,
    saveProfileImage,
    removeProfileImage,
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

  async function handleDeleteImage() {
    setIsUploadingImage(true);
    try {
      await removeProfileImage();
      toast.success("Foto removida");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Falha ao remover imagem");
    } finally {
      setIsUploadingImage(false);
    }
  }

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-background">
        <header className="container mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-6">
          <Link
            href="/"
            className="whitespace-nowrap bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-base font-semibold text-transparent sm:text-lg"
          >
            BlueSpark MZ
          </Link>
          <AuthHeaderControls />
        </header>
        <main className="container mx-auto px-4 py-28">
          <p className="text-muted-foreground">A carregar perfil...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-6">
        <Link
          href="/"
          className="whitespace-nowrap bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-base font-semibold text-transparent sm:text-lg"
        >
          BlueSpark MZ
        </Link>
        <AuthHeaderControls />
      </header>

      <main className="container mx-auto space-y-6 px-4 py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Perfil</h1>
            <p className="text-muted-foreground">
              Conta central usada nos produtos BlueSpark MZ.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              logout();
              router.push("/login");
            }}
          >
            Terminar sessão
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Conta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.profile_image_url || ""} alt={user.full_name || user.username} />
                  <AvatarFallback>{getInitials(user.full_name, user.username)}</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div>
                    <p className="font-medium text-foreground">
                      {user.full_name || user.username}
                    </p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                        disabled={isUploadingImage}
                      />
                      <span className="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground">
                        {isUploadingImage ? "A enviar..." : "Trocar foto"}
                      </span>
                    </label>
                    {user.profile_image_url ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleDeleteImage}
                        disabled={isUploadingImage}
                      >
                        Remover
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Username</p>
                  <p className="text-sm text-muted-foreground">{user.username}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">
                    {user.whatsapp_number || "Não verificado"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Estado</p>
                  <p className="text-sm text-muted-foreground">
                    {user.is_verified ? "Conta verificada" : "Conta pendente"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dados do perfil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Nome completo</Label>
                  <Input
                    id="full_name"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="25884..."
                  />
                </div>

                <Button type="submit" disabled={isSaving}>
                  {isSaving ? "A guardar..." : "Guardar alterações"}
                </Button>
              </form>

              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">Produtos ativos</h2>
                {membershipSummary.length ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {membershipSummary.map((membership) => (
                      <div
                        key={`${membership.product.code}-${membership.role}`}
                        className="rounded-xl border border-border p-4"
                      >
                        <p className="font-medium text-foreground">
                          {membership.product.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {membership.role}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Ainda não há produtos ativos ligados a esta conta.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
