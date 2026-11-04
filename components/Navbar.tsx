import NavbarClient from "@/components/NavbarClient";

const navLinks = [
  { href: "/#inicio", label: "Início" },
  { href: "/#cloud", label: "Cloud", badge: "Novo" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#servicos", label: "Serviços" },
  { href: "/#portfolio", label: "Produtos" },
  { href: "/#equipa", label: "Equipa" },
  { href: "/#contacto", label: "Contacto" },
];

export default function Navbar() {
  return <NavbarClient navLinks={navLinks} />;
}
