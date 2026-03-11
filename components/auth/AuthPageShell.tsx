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
      <header className="container mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-6">
        <Link
          href="/"
          className="whitespace-nowrap bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-base font-semibold text-transparent sm:text-lg"
        >
          BlueSpark MZ
        </Link>
        <AuthHeaderControls />
      </header>

      <main className="container mx-auto flex min-h-[calc(100vh-88px)] max-w-6xl items-center px-4 py-12">
        <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="space-y-6 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {title}
              </h1>
              <p className="mx-auto max-w-xl text-base text-muted-foreground lg:mx-0">
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
