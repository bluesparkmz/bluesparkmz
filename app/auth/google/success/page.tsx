"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authStorage } from "@/lib/accounts-client";

function GoogleSuccessContent() {
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
      <p className="text-sm text-muted-foreground">Completing Google login...</p>
    </main>
  );
}

export default function GoogleSuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-background px-4">
          <p className="text-sm text-muted-foreground">Loading...</p>
        </main>
      }
    >
      <GoogleSuccessContent />
    </Suspense>
  );
}
