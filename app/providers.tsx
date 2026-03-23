"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

import AuthProvider from "@/components/auth/AuthProvider";
import GlobalErrorHandler from "@/components/system/GlobalErrorHandler";
import { Toaster } from "@/components/ui/sonner";
import { Toaster as ShadcnToaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <AuthProvider>
          <ShadcnToaster />
          <Toaster />
          <GlobalErrorHandler />
          {children}
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
