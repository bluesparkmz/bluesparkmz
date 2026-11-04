import { Smartphone, Monitor, Globe, Cloud, Palette, Rocket } from "lucide-react";
import { CLOUD_URL } from "@/lib/cloud";
import AnimatedSection from "./AnimatedSection";

const services = [
  {
    icon: Smartphone,
    title: "Aplicativos Móveis",
    description: "Desenvolvimento de apps nativos e híbridos para Android e iOS com foco em experiência do usuário.",
  },
  {
    icon: Monitor,
    title: "Sistemas Desktop",
    description: "Criação de software desktop robusto para gestão empresarial e automação de processos.",
  },
  {
    icon: Globe,
    title: "Websites",
    description: "Websites modernos, responsivos e otimizados para conversão e presença digital.",
  },
  {
    icon: Cloud,
    title: "Cloud, APIs & Backend",
    description: "APIs escaláveis e sistemas backend seguros, hospedados no BlueSpark Cloud com deploy via Git.",
    href: CLOUD_URL,
    cta: "Conhecer BlueSpark Cloud",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Design de interfaces intuitivas e experiências de usuário memoráveis.",
  },
  {
    icon: Rocket,
    title: "Consultoria Tech",
    description: "Orientação estratégica para transformação digital e adopção de tecnologias.",
  },
];

const ServicesSection = () => {
  return (
    <section id="servicos" className="bg-secondary/40 py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <AnimatedSection className="mx-auto mb-16 max-w-3xl text-center">
          <p className="text-sm font-medium text-primary">Nossos Serviços</p>
          <h2 className="mt-2 mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            O que <span className="text-primary">oferecemos</span>?
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Da concepção à implementação, oferecemos soluções completas de desenvolvimento de software para impulsionar o seu negócio.
          </p>
        </AnimatedSection>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <AnimatedSection key={service.title} animation="scale" delay={index * 100}>
              <div className="group h-full rounded-2xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-0.5">
                <span className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <service.icon className="size-5" />
                </span>
                <h3 className="mt-4 font-semibold text-foreground">{service.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                {service.href ? (
                  <a
                    href={service.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
                  >
                    {service.cta} →
                  </a>
                ) : null}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
