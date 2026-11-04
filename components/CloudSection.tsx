import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CLOUD_URL, cloudFeatures, cloudPillars, cloudPlans } from "@/lib/cloud";
import AnimatedSection from "./AnimatedSection";

const whatsappPoints = [
  "Ligar número com QR em segundos",
  "Enviar texto e media via API",
  "Webhooks para automatizar respostas",
];

const CloudSection = () => {
  return (
    <section id="cloud" className="relative">
      {/* Pilares */}
      <div className="container mx-auto px-4 pb-8 pt-4 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {cloudPillars.map((pillar, index) => (
            <AnimatedSection key={pillar.title} delay={index * 100}>
              <div className="text-center md:text-left">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pillar.src}
                  alt=""
                  className="mx-auto size-12 object-contain md:mx-0 md:size-14"
                />
                <h2 className="mt-3 text-lg font-semibold">{pillar.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{pillar.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Recursos */}
      <div className="container mx-auto px-4 py-24 lg:px-8">
        <AnimatedSection className="text-center">
          <p className="text-sm font-medium text-primary">BlueSpark Cloud</p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight">Tudo que precisa para lançar</h2>
          <p className="mt-3 text-muted-foreground">Uma plataforma, todos os seus serviços.</p>
        </AnimatedSection>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {cloudFeatures.map((feature, index) => (
            <AnimatedSection key={feature.title} animation="scale" delay={index * 80}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-0.5">
                <span className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <feature.icon className="size-5" />
                </span>
                <h3 className="mt-4 font-semibold">{feature.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* WhatsApp */}
      <div id="whatsapp" className="border-y border-border bg-secondary/40 py-24">
        <AnimatedSection className="container mx-auto max-w-3xl px-4 text-center lg:px-8">
          <p className="text-sm font-medium text-primary">Gateway WhatsApp</p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight">
            Automatize conversas. Sem servidor à parte.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Crie uma instância, escaneie o QR e envie mensagens pela API — igual ao deploy das suas
            apps, no mesmo painel.
          </p>
          <ul className="mx-auto mt-6 max-w-md space-y-3 text-left text-sm">
            {whatsappPoints.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="size-4 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>
          <Button className="group mt-8" variant="hero" size="lg" asChild>
            <a href={CLOUD_URL} target="_blank" rel="noopener noreferrer">
              Começar com WhatsApp
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </AnimatedSection>
      </div>

      {/* Preços */}
      <div id="precos" className="bg-secondary/60 py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection className="text-center">
            <h2 className="text-4xl font-bold tracking-tight">Preços simples</h2>
            <p className="mt-3 text-muted-foreground">Comece grátis, pague só quando crescer.</p>
          </AnimatedSection>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {cloudPlans.map((plan, index) => (
              <AnimatedSection key={plan.name} animation="scale" delay={index * 100}>
                <div
                  className={`relative h-full rounded-2xl border bg-card p-8 shadow-card ${
                    plan.featured ? "border-primary shadow-glow" : "border-border"
                  }`}
                >
                  {plan.featured ? (
                    <span className="absolute -top-3 left-8 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                      Mais popular
                    </span>
                  ) : null}
                  <h3 className="font-semibold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.desc}</p>
                  <p className="mt-6">
                    <span className="text-5xl font-extrabold">${plan.price}</span>
                    <span className="text-muted-foreground">/mês</span>
                  </p>
                  {plan.priceMzn ? (
                    <p className="mt-1 text-sm font-medium text-muted-foreground">
                      ou {plan.priceMzn}/mês
                    </p>
                  ) : null}
                  <ul className="mt-6 space-y-3 text-sm">
                    {plan.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check className="size-4 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="mt-8 w-full"
                    variant={plan.featured ? "hero" : "outline"}
                    asChild
                  >
                    <a href={CLOUD_URL} target="_blank" rel="noopener noreferrer">
                      Escolher {plan.name}
                    </a>
                  </Button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CloudSection;
