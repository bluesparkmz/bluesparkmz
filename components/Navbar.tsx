"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/#inicio", label: "Início" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#servicos", label: "Serviços" },
  { href: "/#portfolio", label: "Portfólio" },
  { href: "/#equipa", label: "Equipa" },
  { href: "/#contacto", label: "Contacto" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const { user, logout, isLoading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? "border-b border-border/50 bg-card shadow-lg"
          : "bg-transparent"
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
                  <Link href="/entrar">Entrar</Link>
                </Button>
                <Button variant="hero" size="lg" asChild>
                  <Link href="/criar-conta">Criar conta</Link>
                </Button>
              </>
            ) : null}

            {!isLoading && user ? (
              <>
                <Button variant="ghost" size="lg" asChild>
                  <Link href="/perfil">Perfil</Link>
                </Button>
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => {
                    logout();
                    router.push("/entrar");
                  }}
                >
                  Sair
                </Button>
              </>
            ) : null}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-foreground transition-colors hover:bg-secondary lg:hidden"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 lg:hidden ${
            isOpen ? "max-h-96 pb-6" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-2 pt-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-4 py-3 text-muted-foreground transition-all duration-200 hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </a>
            ))}

            {!isLoading && !user ? (
              <>
                <Button variant="outline" className="mt-4" asChild>
                  <Link href="/entrar" onClick={() => setIsOpen(false)}>
                    Entrar
                  </Link>
                </Button>
                <Button variant="hero" asChild>
                  <Link href="/criar-conta" onClick={() => setIsOpen(false)}>
                    Criar conta
                  </Link>
                </Button>
              </>
            ) : null}

            {!isLoading && user ? (
              <>
                <Button variant="outline" className="mt-4" asChild>
                  <Link href="/perfil" onClick={() => setIsOpen(false)}>
                    Perfil
                  </Link>
                </Button>
                <Button
                  variant="hero"
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                    router.push("/entrar");
                  }}
                >
                  Sair
                </Button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
