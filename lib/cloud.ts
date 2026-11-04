import {
  Database,
  GitBranch,
  Globe,
  MessageCircle,
  Shield,
  Terminal,
  type LucideIcon,
} from "lucide-react";

export const CLOUD_URL = "https://cloud.bluesparkmz.com/";

export const cloudStacks = [
  { id: "postgres", name: "PostgreSQL", src: "/cloud/postgresql.png" },
  { id: "mariadb", name: "MariaDB", src: "/cloud/mariadb.svg" },
  { id: "mysql", name: "MySQL", src: "/cloud/mysql.svg" },
  { id: "mongodb", name: "MongoDB", src: "/cloud/mongodb.svg" },
  { id: "redis", name: "Redis", src: "/cloud/redis.svg" },
  { id: "fastapi", name: "FastAPI", src: "/cloud/fastapi_logo.png" },
  { id: "flask", name: "Flask", src: "/cloud/flask_icon.svg" },
  { id: "express", name: "Express", src: "/cloud/express.png" },
  { id: "php", name: "PHP", src: "/cloud/php-logo-white.svg" },
  { id: "laravel", name: "Laravel", src: "/cloud/laravel.png" },
  { id: "react", name: "React", src: "/cloud/react.svg" },
  { id: "vite", name: "Vite", src: "/cloud/vite.png" },
  { id: "next", name: "Next.js", src: "/cloud/nextjs.png" },
  { id: "tanstack", name: "TanStack", src: "/cloud/tanstack.png" },
];

export const cloudPillars = [
  {
    src: "/cloud/server.png",
    title: "Hospedagem de apps",
    desc: "React, Next, Vite, FastAPI e mais — deploy a partir do Git.",
  },
  {
    src: "/cloud/code.png",
    title: "APIs & backends",
    desc: "APIs e bancos na mesma rede, com domínio e SSL prontos.",
  },
  {
    src: "/cloud/whatsapp.png",
    title: "Automação WhatsApp",
    desc: "Gateway com QR, webhooks e envio de mensagens via API.",
  },
];

export const cloudFeatures: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: GitBranch,
    title: "Deploy via Git",
    desc: "Conecte o seu repositório e cada push vira um deploy automático.",
  },
  {
    icon: Database,
    title: "Bancos em 1 clique",
    desc: "Postgres, MySQL, Redis e MongoDB prontos em segundos.",
  },
  {
    icon: MessageCircle,
    title: "Gateway WhatsApp",
    desc: "Ligue o número com QR e automatize conversas pela API.",
  },
  {
    icon: Globe,
    title: "Domínios e SSL",
    desc: "Domínios personalizados com HTTPS automático.",
  },
  {
    icon: Terminal,
    title: "Logs em tempo real",
    desc: "Acompanhe builds e runtime direto no painel.",
  },
  {
    icon: Shield,
    title: "Variáveis seguras",
    desc: "Segredos encriptados e isolados por ambiente.",
  },
];

export const cloudPlans = [
  {
    name: "Free",
    price: "0",
    priceMzn: "0 MT",
    desc: "Para experimentar a plataforma",
    items: ["1 projeto", "1 app: FastAPI, Flask ou Express", "1 banco PostgreSQL", "1 instância WhatsApp"],
    featured: false,
  },
  {
    name: "Hobby",
    price: "5",
    priceMzn: "300 MT",
    desc: "Para projetos pessoais",
    items: ["5 projetos", "Vários apps e bancos", "8 serviços no total", "3 instâncias WhatsApp"],
    featured: false,
  },
  {
    name: "Pro",
    price: "20",
    priceMzn: "1.300 MT",
    desc: "Para devs e startups",
    items: ["8 projetos", "20 serviços no total", "5 instâncias WhatsApp", "Suporte prioritário"],
    featured: true,
  },
  {
    name: "Premium",
    price: "40",
    priceMzn: null,
    desc: "Para quem quer acompanhamento",
    items: ["Tudo do Pro", "10 instâncias WhatsApp", "Manutenção e suporte", "Ajuda em deploy e debug de código"],
    featured: false,
  },
];
