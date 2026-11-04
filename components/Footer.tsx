import Link from "next/link";
import { Heart, MapPin } from "lucide-react";
import { CLOUD_URL } from "@/lib/cloud";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    company: [
      { label: "Sobre", href: "#sobre" },
      { label: "Serviços", href: "#servicos" },
      { label: "Produtos", href: "#portfolio" },
      { label: "Equipa", href: "#equipa" },
    ],
    products: [
      { label: "BlueSpark Cloud", href: CLOUD_URL },
      { label: "SkyVenda MZ", href: "https://skyvenda.com" },
      { label: "SkyWallet", href: "#portfolio" },
      { label: "SmartMoz", href: "#portfolio" },
      { label: "FastFood", href: "#portfolio" },
      { label: "ContaBliza", href: "#portfolio" },
      { label: "SparkFlow", href: "#portfolio" },
    ],
    contact: [
      { label: "+258 86 071 6912", href: "tel:+258860716912" },
      { label: "+258 86 028 9475", href: "tel:+258860289475" },
      { label: "bluesparkmz1@gmail.com", href: "mailto:bluesparkmz1@gmail.com" },
    ],
    legal: [
      { label: "Política de Privacidade", href: "/privacy" },
      { label: "Termos e Condições", href: "/terms" },
    ],
  };

  const linkClass = "transition-colors hover:text-foreground";

  return (
    <footer className="border-t border-border bg-background py-14">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-3">
            <a href="#inicio" className="flex items-center gap-2 text-lg font-bold tracking-tight">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/favicon.png" alt="" width={32} height={32} className="size-8 object-contain" />
              <span>
                BlueSpark <span className="text-primary">MZ</span>
              </span>
            </a>
            <p className="max-w-xs text-sm text-muted-foreground">
              Empresa de tecnologia moçambicana focada em software, cloud, automação e plataformas
              digitais.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Niassa, Lichinga</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Empresa</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {links.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Produtos</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {links.products.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={linkClass}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Contacto</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {links.contact.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Legal</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {links.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row">
          <p>© {currentYear} BlueSpark MZ. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Feito com <Heart className="h-4 w-4 fill-primary text-primary" /> em Moçambique
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
