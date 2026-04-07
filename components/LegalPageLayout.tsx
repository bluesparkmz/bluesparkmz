import Link from "next/link";
import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

type LegalPageLayoutProps = {
  title: string;
  description: string;
  updatedAt: string;
  children: ReactNode;
};

export default function LegalPageLayout({
  title,
  description,
  updatedAt,
  children,
}: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="bg-hero-gradient">
        <section className="border-b border-border/60">
          <div className="container mx-auto max-w-4xl px-4 py-20 lg:px-8">
            <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              Informação legal
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-display font-bold tracking-tight sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              {description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span>Última atualização: {updatedAt}</span>
              <Link
                href="/"
                className="font-medium text-primary transition-colors hover:text-primary/80"
              >
                Voltar ao início
              </Link>
            </div>
          </div>
        </section>

        <section>
          <div className="container mx-auto max-w-4xl px-4 py-12 lg:px-8">
            <article className="rounded-3xl border border-border/70 bg-card/95 p-6 shadow-indigo lg:p-10">
              <div className="prose prose-slate max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground dark:prose-invert">
                {children}
              </div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
