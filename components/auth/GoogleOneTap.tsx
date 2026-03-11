"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/components/auth/AuthProvider";
import { loginWithGoogleOneTap } from "@/lib/accounts-client";

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

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_ID_FALLBACK =
  "512274443306-8pqcpur84doh27ovnu588jv2hamdqeej.apps.googleusercontent.com";

export default function GoogleOneTap() {
  const router = useRouter();
  const { setSessionTokens } = useAuth();
  const initializedRef = useRef(false);
  const clientId = GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID_FALLBACK;

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
      const tokens = await loginWithGoogleOneTap(response.credential);
      await setSessionTokens({
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      });
      toast.success("Sessao iniciada com Google");
      router.replace("/profile");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Falha no Google One Tap");
    }
  }

  function initializeGoogleOneTap() {
    if (!clientId || initializedRef.current || !window.google?.accounts.id) {
      return;
    }

    initializedRef.current = true;
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCredentialResponse,
      auto_select: false,
      cancel_on_tap_outside: false,
      use_fedcm_for_prompt: true,
    });
    window.google.accounts.id.prompt((notification: {
      isNotDisplayed?: () => boolean;
      getNotDisplayedReason?: () => string;
      isSkippedMoment?: () => boolean;
      getSkippedReason?: () => string;
      isDismissedMoment?: () => boolean;
      getDismissedReason?: () => string;
    }) => {
      try {
        if (notification?.isNotDisplayed?.()) {
          console.warn("Google One Tap nao exibido:", notification.getNotDisplayedReason?.());
        }
        if (notification?.isSkippedMoment?.()) {
          console.warn("Google One Tap ignorado:", notification.getSkippedReason?.());
        }
        if (notification?.isDismissedMoment?.()) {
          console.warn("Google One Tap fechado:", notification.getDismissedReason?.());
        }
      } catch {}
    });
  }

  return (
    <Script
      src="https://accounts.google.com/gsi/client"
      strategy="afterInteractive"
      onLoad={initializeGoogleOneTap}
    />
  );
}
