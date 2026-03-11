"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";

type NavLink = {
  href: string;
  label: string;
};

export default function NavbarClient({ navLinks }: { navLinks: NavLink[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isLoading } = useAuth();
  const isHomePage = pathname === "/";

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 20);

      if (currentScrollY <= 16) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (isOpen) {
      setIsVisible(true);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function handleLogout() {
    setIsOpen(false);
    logout();
    router.push("/login");
  }

  return (
    <>
      <nav
        className={`sticky left-0 right-0 top-0 z-50 transition-all duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          (!isHomePage || scrolled || isOpen)
            ? "border-b border-border/50 bg-card shadow-none"
            : "border-b border-transparent bg-transparent shadow-none"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-20">
            <Link href="/" className="group">
              <span className="text-xl font-display font-bold text-foreground">
                Blue<span className="text-gradient-indigo">Spark</span> MZ
              </span>
            </Link>

            <div className="hidden items-center gap-8 lg:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group relative text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              {!isLoading && !user ? (
                <>
                  <Button variant="ghost" size="lg" asChild>
                    <Link href="/login">Entrar</Link>
                  </Button>
                  <Button variant="hero" size="lg" asChild>
                    <Link href="/register">Criar conta</Link>
                  </Button>
                </>
              ) : null}

              {!isLoading && user ? (
                <>
                  <Button variant="ghost" size="lg" asChild>
                    <Link href="/profile">Perfil</Link>
                  </Button>
                  <Button variant="hero" size="lg" onClick={handleLogout}>
                    Sair
                  </Button>
                </>
              ) : null}
            </div>

            <button
              onClick={() => setIsOpen((current) => !current)}
              className="rounded-lg p-2 text-foreground transition-colors hover:bg-secondary lg:hidden"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-background transition-all duration-300 lg:hidden ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col pt-16">
          <div className="flex-1 overflow-y-auto px-6 py-8">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="border-b border-border/60 py-5 text-2xl font-medium text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="border-t border-border/60 px-6 py-6">
            <div className="flex flex-col gap-3">
              {!isLoading && !user ? (
                <>
                  <Button variant="outline" className="h-12 w-full" asChild>
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      Entrar
                    </Link>
                  </Button>
                  <Button variant="hero" className="h-12 w-full" asChild>
                    <Link href="/register" onClick={() => setIsOpen(false)}>
                      Criar conta
                    </Link>
                  </Button>
                </>
              ) : null}

              {!isLoading && user ? (
                <>
                  <Button variant="outline" className="h-12 w-full" asChild>
                    <Link href="/profile" onClick={() => setIsOpen(false)}>
                      Perfil
                    </Link>
                  </Button>
                  <Button variant="hero" className="h-12 w-full" onClick={handleLogout}>
                    Sair
                  </Button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
