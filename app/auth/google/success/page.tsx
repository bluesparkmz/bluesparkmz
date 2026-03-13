"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { buildConsumerRedirectUrl } from "@/lib/accounts-client";

function GoogleSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setSessionTokens } = useAuth();

  useEffect(() => {
    let cancelled = false;

    async function completeGoogleLogin() {
      const accessToken = searchParams.get("access_token");
      const refreshToken = searchParams.get("refresh_token");
      const redirectUri = searchParams.get("redirect_uri");
      const expiresIn = Number(searchParams.get("expires_in") || "0");

      if (!accessToken || !refreshToken) {
        router.replace("/login");
        return;
      }

      try {
        await setSessionTokens({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (!cancelled) {
          if (redirectUri) {
            window.location.href = buildConsumerRedirectUrl(redirectUri, {
              access_token: accessToken,
              refresh_token: refreshToken,
              expires_in: expiresIn || 0,
            });
            return;
          }
          router.replace("/profile");
        }
      } catch {
        if (!cancelled) {
          router.replace("/login");
        }
      }
    }

    completeGoogleLogin();

    return () => {
      cancelled = true;
    };
  }, [router, searchParams, setSessionTokens]);

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
