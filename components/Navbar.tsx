import NavbarClient from "@/components/NavbarClient";

const navLinks = [
  { href: "/#inicio", label: "Inicio" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#servicos", label: "Servicos" },
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/#equipa", label: "Equipa" },
  { href: "/#contacto", label: "Contacto" },
];

export default function Navbar() {
  return <NavbarClient navLinks={navLinks} />;
}
