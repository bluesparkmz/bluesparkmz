"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/components/auth/AuthProvider";
import { buildConsumerRedirectUrl, loginWithGoogleOneTap } from "@/lib/accounts-client";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (options: {
            client_id: string;
            callback: (response: { credential?: string }) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
            use_fedcm_for_prompt?: boolean;
          }) => void;
          prompt: () => void;
          cancel: () => void;
        };
      };
    };
  }
}

const GOOGLE_CLIENT_ID =
  process.env.NEXT_PUBLIC_BLUESPARK_GOOGLE_CLIENT_ID ||
  "530160641394-6d7tt7u2vp0sbvnpvp9mirc2nnagadd4.apps.googleusercontent.com";

export default function GoogleOneTap() {
  const router = useRouter();
  const { setSessionTokens } = useAuth();
  const initializedRef = useRef(false);
  const [redirectUri, setRedirectUri] = useState<string | null>(null);
  const [productCode, setProductCode] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nextRedirectUri = (params.get("redirect_uri") || "").trim() || null;
    const nextProductCode = (params.get("product_code") || "").trim() || null;
    setRedirectUri(nextRedirectUri);
    setProductCode(nextProductCode);
  }, []);

  useEffect(() => {
    return () => {
      window.google?.accounts.id.cancel();
    };
  }, []);

  async function handleCredentialResponse(response: { credential?: string }) {
    if (!response.credential) {
      return;
    }

    try {
      const params = new URLSearchParams(window.location.search);
      const nextRedirectUri = (params.get("redirect_uri") || "").trim() || null;
      const nextProductCode = (params.get("product_code") || "").trim() || null;

      const tokens = await loginWithGoogleOneTap(response.credential, {
        productCode: nextProductCode || productCode,
      });
      await setSessionTokens({
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      });

      toast.success("Sessao iniciada com Google");

      if (nextRedirectUri || redirectUri) {
        window.location.href = buildConsumerRedirectUrl(
          nextRedirectUri || redirectUri!,
          tokens,
        );
        return;
      }

      if (nextProductCode || productCode) {
        const params = new URLSearchParams();
        params.set("product_code", nextProductCode || productCode!);
        window.location.href = `/login?${params.toString()}`;
        return;
      }

      router.replace("/profile");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Falha no Google One Tap");
    }
  }

  function initializeGoogleOneTap() {
    if (!GOOGLE_CLIENT_ID || initializedRef.current || !window.google?.accounts.id) {
      return;
    }

    initializedRef.current = true;
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
      auto_select: false,
      cancel_on_tap_outside: false,
      use_fedcm_for_prompt: true,
    });
    window.google.accounts.id.prompt();
  }

  return (
    <Script
      src="https://accounts.google.com/gsi/client"
      strategy="afterInteractive"
      onLoad={initializeGoogleOneTap}
    />
  );
}
