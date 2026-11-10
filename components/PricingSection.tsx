"use client";

import { useMemo, useState } from "react";
import { Check, Cloud, Mail, MessageCircle, Store } from "lucide-react";
import { Button } from "@/components/ui/button";

type Billing = "monthly" | "yearly";
type ProductId = "cloud" | "mail" | "whatsapp" | "skypdv";

type Plan = {
  name: string;
  description: string;
  monthly: number;
  cta: string;
  href: string;
  featured?: boolean;
  items: string[];
};

const products: {
  id: ProductId;
  label: string;
  icon: typeof Cloud;
  plans: Plan[];
}[] = [
  {
    id: "cloud",
    label: "BlueSpark Cloud",
    icon: Cloud,
    plans: [
      {
        name: "Free",
        description: "Para experimentar a plataforma",
        monthly: 0,
        cta: "Começar grátis",
        href: "https://cloud.bluesparkmz.com/login",
        items: [
          "1 projeto",
          "1 app: FastAPI, Flask ou Express",
          "1 banco PostgreSQL",
          "1 instância WhatsApp",
        ],
      },
      {
        name: "Hobby",
        description: "Para projetos pessoais",
        monthly: 5,
        cta: "Escolher Hobby",
        href: "https://cloud.bluesparkmz.com/login",
        items: [
          "5 projetos",
          "Vários apps e bancos",
          "8 serviços no total",
          "3 instâncias WhatsApp",
          "1 email (até 3 domínios)",
        ],
      },
      {
        name: "Pro",
        description: "Para devs e startups",
        monthly: 20,
        cta: "Escolher Pro",
        href: "https://cloud.bluesparkmz.com/login",
        featured: true,
        items: [
          "8 projetos",
          "20 serviços no total",
          "5 instâncias WhatsApp",
          "5 emails (5 domínios)",
          "Suporte prioritário",
        ],
      },
      {
        name: "Premium",
        description: "Para quem quer acompanhamento",
        monthly: 40,
        cta: "Escolher Premium",
        href: "https://cloud.bluesparkmz.com/login",
        items: [
          "Tudo do Pro",
          "10 instâncias WhatsApp",
          "20 emails (domínios ilimitados)",
          "Manutenção e suporte",
          "Ajuda em deploy e debug",
        ],
      },
    ],
  },
  {
    id: "mail",
    label: "BlueSpark Mail",
    icon: Mail,
    plans: [
      {
        name: "Basic",
        description: "Email profissional para começar",
        monthly: 6,
        cta: "Escolher Basic",
        href: "https://cloud.bluesparkmz.com/dashboard/mail",
        items: [
          "Até 5 caixas de email",
          "1 domínio próprio",
          "Webmail, IMAP e SMTP",
          "SSL/TLS e antispam",
          "Quota 5 GB por caixa",
        ],
      },
      {
        name: "Pro",
        description: "Para equipas e marcas em crescimento",
        monthly: 25,
        cta: "Escolher Pro",
        href: "https://cloud.bluesparkmz.com/dashboard/mail",
        featured: true,
        items: [
          "Até 25 caixas de email",
          "Até 5 domínios",
          "Aliases e encaminhamento",
          "DKIM, SPF e DMARC",
          "Quota 20 GB por caixa",
        ],
      },
      {
        name: "Premium",
        description: "Capacidade e suporte para operações maiores",
        monthly: 35,
        cta: "Escolher Premium",
        href: "https://cloud.bluesparkmz.com/dashboard/mail",
        items: [
          "Até 60 caixas de email",
          "Domínios ilimitados",
          "Prioridade no suporte",
          "Backup e retenção alargada",
          "Quota 50 GB por caixa",
        ],
      },
    ],
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: MessageCircle,
    plans: [
      {
        name: "Básico",
        description: "Para testar e enviar mensagens manuais",
        monthly: 0,
        cta: "Começar grátis",
        href: "https://cloud.bluesparkmz.com/dashboard/whatsapp",
        items: [
          "1 instância WhatsApp",
          "Ligar número com QR",
          "Envio de texto pelo playground",
          "Sem webhooks",
          "Ideal para testes",
        ],
      },
      {
        name: "Pro",
        description: "Automação com webhooks e mais instâncias",
        monthly: 6,
        cta: "Escolher Pro",
        href: "https://cloud.bluesparkmz.com/dashboard/whatsapp",
        featured: true,
        items: [
          "Até 5 instâncias WhatsApp",
          "Webhooks para eventos",
          "Envio de texto e media via API",
          "Token de API por instância",
          "Suporte a automações",
        ],
      },
    ],
  },
  {
    id: "skypdv",
    label: "SkyPDV",
    icon: Store,
    plans: [
      {
        name: "Básico",
        description: "Ponto de venda essencial para o balcão",
        monthly: 16,
        cta: "Escolher Básico",
        href: "https://skypdv.bluesparkmz.com/",
        items: [
          "1 loja / terminal",
          "Vendas e recibos",
          "Catálogo de produtos",
          "Relatórios básicos",
          "Suporte padrão",
        ],
      },
      {
        name: "Pro",
        description: "O plano mais escolhido para operações diárias",
        monthly: 20,
        cta: "Escolher Pro",
        href: "https://skypdv.bluesparkmz.com/",
        featured: true,
        items: [
          "Até 3 terminais",
          "Stock e alertas",
          "Múltiplos métodos de pagamento",
          "Relatórios avançados",
          "Integração SkyVenda",
        ],
      },
      {
        name: "Plus",
        description: "Mais capacidade para redes e equipas",
        monthly: 40,
        cta: "Escolher Plus",
        href: "https://skypdv.bluesparkmz.com/",
        items: [
          "Terminais ilimitados",
          "Multi-loja",
          "Gestão de utilizadores",
          "Exportações e auditoria",
          "Suporte prioritário",
        ],
      },
    ],
  },
];

function formatPrice(value: number) {
  if (value === 0) return "0";
  return value % 1 === 0 ? String(value) : value.toFixed(2);
}

const PricingSection = () => {
  const [productId, setProductId] = useState<ProductId>("cloud");
  const [billing, setBilling] = useState<Billing>("monthly");

  const product = useMemo(
    () => products.find((item) => item.id === productId) ?? products[0],
    [productId],
  );

  return (
    <section id="precos" className="relative overflow-hidden bg-background py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 hero-mesh opacity-60" aria-hidden="true" />

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
            Preços
          </p>
          <h2 className="text-3xl font-display font-bold tracking-tight text-[#0B0A12] md:text-4xl lg:text-5xl">
            Planos simples para cada plataforma
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Escolha BlueSpark Cloud, BlueSpark Mail ou SkyPDV e comece no plano certo.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2 rounded-2xl border border-border/70 bg-white/80 p-1.5 shadow-sm backdrop-blur-sm">
            {products.map((item) => {
              const Icon = item.icon;
              const active = item.id === productId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setProductId(item.id)}
                  className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-[#1B1340]/75 hover:bg-secondary hover:text-primary"
                  }`}
                >
                  <Icon className="size-4" />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="inline-flex self-start rounded-full border border-border bg-white p-1 shadow-sm lg:self-auto">
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                billing === "monthly"
                  ? "bg-primary text-primary-foreground"
                  : "text-[#1B1340]/70 hover:text-primary"
              }`}
            >
              Mensal
            </button>
            <button
              type="button"
              onClick={() => setBilling("yearly")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                billing === "yearly"
                  ? "bg-primary text-primary-foreground"
                  : "text-[#1B1340]/70 hover:text-primary"
              }`}
            >
              Anual
            </button>
          </div>
        </div>

        {billing === "yearly" ? (
          <p className="mb-6 text-sm text-muted-foreground lg:text-right">
            No anual paga 10 meses (2 meses grátis). Preço mostrado é o equivalente mensal.
          </p>
        ) : (
          <div className="mb-6 h-5" />
        )}

        <div className="flex flex-wrap justify-center gap-5">
          {product.plans.map((plan) => {
            const monthlyShown =
              billing === "yearly" && plan.monthly > 0
                ? Math.round((plan.monthly * 10) / 12)
                : plan.monthly;

            return (
              <article
                key={`${product.id}-${plan.name}`}
                className={`relative flex w-full max-w-[250px] flex-col rounded-2xl border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-indigo ${
                  plan.featured
                    ? "border-primary shadow-[0_18px_50px_-28px_rgba(103,61,230,0.55)]"
                    : "border-border"
                }`}
              >
                {plan.featured ? (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-primary-foreground">
                    Recomendado
                  </div>
                ) : null}

                <div className={plan.featured ? "pt-2" : ""}>
                  <h3 className="text-lg font-display font-bold text-[#0B0A12]">{plan.name}</h3>
                  <p className="mt-1 min-h-[40px] text-sm text-muted-foreground">
                    {plan.description}
                  </p>

                  <p className="mt-5 flex items-end gap-1">
                    <span className="text-sm font-medium text-muted-foreground">US$</span>
                    <span className="text-4xl font-display font-extrabold tracking-tight text-[#0B0A12]">
                      {formatPrice(monthlyShown)}
                    </span>
                    <span className="pb-1 text-sm text-muted-foreground">/mês</span>
                  </p>
                  {billing === "yearly" && plan.monthly > 0 ? (
                    <p className="mt-1 text-xs text-primary">
                      US$ {formatPrice(plan.monthly * 10)} /ano
                    </p>
                  ) : (
                    <p className="mt-1 text-xs text-transparent">.</p>
                  )}

                  <Button
                    asChild
                    className="mt-5 w-full"
                    variant={plan.featured ? "nav" : "hero-outline"}
                    size="sm"
                  >
                    <a href={plan.href} target="_blank" rel="noopener noreferrer">
                      {plan.cta}
                    </a>
                  </Button>

                  <ul className="mt-5 flex-1 space-y-2.5 text-sm text-[#1B1340]/85">
                    {plan.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
