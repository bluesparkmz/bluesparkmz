import Link from "next/link";
import { Heart, MapPin, Zap } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    company: [
      { label: "About", href: "#sobre" },
      { label: "Services", href: "#servicos" },
      { label: "Portfolio", href: "#portfolio" },
      { label: "Team", href: "#equipa" },
    ],
    products: [
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
      { label: "Política de Privacidade", href: "/politica-de-privacidade" },
      { label: "Termos e Condições", href: "/termos-e-condicoes" },
    ],
  };

  return (
    <footer className="bg-foreground py-16 text-background dark:bg-card dark:text-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <a href="#inicio" className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-gradient">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-display font-bold">BlueSpark MZ</span>
            </a>
            <p className="mb-6 leading-relaxed text-background/70 dark:text-muted-foreground">
              Startup de tecnologia moçambicana focada em software, automação e
              plataformas digitais.
            </p>
            <div className="flex items-center gap-2 text-sm text-background/50 dark:text-muted-foreground/80">
              <MapPin className="h-4 w-4" />
              <span>Niassa, Moçambique</span>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-display font-semibold">Company</h4>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="transition-colors text-background/70 hover:text-background dark:text-muted-foreground dark:hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-display font-semibold">Products</h4>
            <ul className="space-y-3">
              {links.products.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="transition-colors text-background/70 hover:text-background dark:text-muted-foreground dark:hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-display font-semibold">Contact</h4>
            <ul className="space-y-3">
              {links.contact.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="transition-colors text-background/70 hover:text-background dark:text-muted-foreground dark:hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-display font-semibold">Legal</h4>
            <ul className="space-y-3">
              {links.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition-colors text-background/70 hover:text-background dark:text-muted-foreground dark:hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-background/10 pt-8 dark:border-border md:flex-row">
          <p className="text-sm text-background/50 dark:text-muted-foreground/60">
            © {currentYear} BlueSpark MZ. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-sm text-background/50 dark:text-muted-foreground/60">
            Built with <Heart className="h-4 w-4 fill-accent text-accent" /> in Mozambique
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
