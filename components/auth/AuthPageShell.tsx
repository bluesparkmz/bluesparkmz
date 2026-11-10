import type { ReactNode } from "react";
import Link from "next/link";
import AuthHeaderControls from "@/components/auth/AuthHeaderControls";

export default function AuthPageShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-hero-gradient">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-5 sm:px-6">
        <Link href="/" className="text-base font-display font-bold text-primary sm:text-lg">
          BlueSpark MZ
        </Link>
        <AuthHeaderControls />
      </header>

      <main className="mx-auto flex min-h-[calc(100vh-76px)] w-full max-w-md items-center justify-center px-4 pb-12 pt-4 sm:px-6">
        <section className="w-full rounded-2xl border border-border/70 bg-card p-6 shadow-[0_20px_60px_-30px_rgba(103,61,230,0.35)] sm:p-8">
          <div className="mb-6 space-y-2 text-center">
            <h1 className="text-2xl font-display font-bold tracking-tight text-[#0B0A12] sm:text-[1.75rem]">
              {title}
            </h1>
            {description ? (
              <p className="text-sm text-muted-foreground">{description}</p>
            ) : null}
          </div>
          {children}
        </section>
      </main>
    </div>
  );
}
