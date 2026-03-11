import type { ReactNode } from "react";
import Link from "next/link";

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
    <div className="relative min-h-screen overflow-hidden bg-[#f4f1ff] text-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(123,97,255,0.14),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(123,97,255,0.12),_transparent_30%)]" />

      <header className="relative z-10">
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-7 md:px-10">
          <Link href="/" className="inline-flex items-center gap-3 text-[#5b4bdb] transition-opacity hover:opacity-90">
            <span className="text-[2.1rem] font-semibold tracking-[-0.06em]">BlueSpark</span>
          </Link>
          <Link href="/" className="text-sm font-medium text-[#6f63da] transition-colors hover:text-[#5547d0]">
            Voltar ao site
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex min-h-[calc(100vh-88px)] items-center justify-center px-4 pb-12 pt-4">
        <section className="w-full max-w-[37rem] rounded-[2rem] border border-white/70 bg-white/78 p-7 shadow-[0_24px_80px_-28px_rgba(108,86,237,0.28)] backdrop-blur-sm md:p-10">
          <div className="mb-8 space-y-3">
            <h1 className="text-[2.15rem] font-semibold tracking-[-0.05em] text-[#12111f]">
              {title}
            </h1>
            <p className="text-[1.05rem] leading-7 text-[#67627f]">
              {description}
            </p>
          </div>

          {children}
        </section>
      </main>
    </div>
  );
}
