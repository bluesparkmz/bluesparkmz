"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const DEFAULT_MESSAGE =
  "Estamos em manutencao, tente mais tarde ou reporta para a nossa equipa";

export default function GlobalErrorHandler() {
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState(DEFAULT_MESSAGE);

  useEffect(() => {
    const handleErrorEvent = (event: Event) => {
      if (!(event instanceof CustomEvent)) {
        return;
      }

      if (event.detail?.type !== "MAINTENANCE_ERROR") {
        return;
      }

      setMessage(event.detail?.message || DEFAULT_MESSAGE);
      setShowError(true);
    };

    window.addEventListener("globalError", handleErrorEvent);
    return () => {
      window.removeEventListener("globalError", handleErrorEvent);
    };
  }, []);

  if (!showError) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 px-6 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-[28px] border border-border bg-card p-8 shadow-2xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <AlertTriangle className="h-8 w-8" />
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Sistema temporariamente indisponivel
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
            Estamos a trabalhar nisso
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{message}</p>
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            type="button"
            className="min-w-40 gap-2"
            onClick={() => {
              setShowError(false);
              window.location.reload();
            }}
          >
            <RefreshCcw className="h-4 w-4" />
            Tentar novamente
          </Button>
        </div>
      </div>
    </div>
  );
}
