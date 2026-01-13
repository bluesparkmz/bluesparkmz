import { Zap, Heart, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    empresa: [
      { label: "Sobre", href: "#sobre" },
      { label: "Serviços", href: "#servicos" },
      { label: "Portfólio", href: "#portfolio" },
      { label: "Equipa", href: "#equipa" },
    ],
    produtos: [
      { label: "SkyVenda MZ", href: "https://skyvenda.com" },
      { label: "SkyWallet", href: "#portfolio" },
      { label: "SmartMoz", href: "#portfolio" },
      { label: "Fastfood", href: "#portfolio" },
    ],
    contacto: [
      { label: "+258 86 071 6912", href: "tel:+258860716912" },
      { label: "+258 86 028 9475", href: "tel:+258860289475" },
      { label: "bluesparkmz1@gmail.com", href: "mailto:bluesparkmz1@gmail.com" },
    ],
  };

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#inicio" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-indigo-gradient rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-display font-bold">
                BlueSpark MZ
              </span>
            </a>
            <p className="text-background/70 leading-relaxed mb-6">
              Startup de tecnologia moçambicana focada em criar soluções digitais inovadoras.
            </p>
            <div className="flex items-center gap-2 text-sm text-background/50">
              <MapPin className="w-4 h-4" />
              <span>Niassa, Moçambique</span>
            </div>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Empresa</h4>
            <ul className="space-y-3">
              {links.empresa.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Produtos */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Produtos</h4>
            <ul className="space-y-3">
              {links.produtos.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Contacto</h4>
            <ul className="space-y-3">
              {links.contacto.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/50 text-sm">
            © {currentYear} BlueSpark MZ. Todos os direitos reservados.
          </p>
          <p className="text-background/50 text-sm flex items-center gap-1">
            Feito com <Heart className="w-4 h-4 text-accent fill-accent" /> em Moçambique
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
