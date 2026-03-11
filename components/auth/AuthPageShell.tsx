import type { ReactNode } from "react";
import Link from "next/link";
import AuthHeaderControls from "@/components/auth/AuthHeaderControls";

export default function AuthPageShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto flex max-w-6xl items-center justify-between px-4 py-6">
        <Link href="/" className="text-lg font-semibold text-foreground">
          BlueSpark MZ
        </Link>
        <AuthHeaderControls />
      </header>

      <main className="container mx-auto flex min-h-[calc(100vh-88px)] max-w-6xl items-center px-4 py-12">
        <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-foreground">
                {title}
              </h1>
              <p className="max-w-xl text-base text-muted-foreground">
                {description}
              </p>
            </div>
          </section>
          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:p-8">
            {children}
          </section>
        </div>
      </main>
    </div>
  );
}
