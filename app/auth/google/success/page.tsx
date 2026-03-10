"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authStorage } from "@/lib/accounts-client";

export default function GoogleSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");

    if (!accessToken || !refreshToken) {
      router.replace("/login");
      return;
    }

    localStorage.setItem(authStorage.accessTokenKey, accessToken);
    localStorage.setItem(authStorage.refreshTokenKey, refreshToken);
    router.replace("/profile");
  }, [router, searchParams]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <p className="text-sm text-muted-foreground">A concluir login com Google...</p>
    </main>
  );
}
