import { Smartphone, Monitor, Globe, Code, Palette, Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedSection from "./AnimatedSection";

const services = [
  {
    icon: Smartphone,
    title: "Aplicativos Móveis",
    description: "Desenvolvimento de apps nativos e híbridos para Android e iOS com foco em experiência do usuário.",
    gradient: "from-pink-500 to-purple-500",
  },
  {
    icon: Monitor,
    title: "Sistemas Desktop",
    description: "Criação de software desktop robusto para gestão empresarial e automação de processos.",
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    icon: Globe,
    title: "Websites",
    description: "Websites modernos, responsivos e otimizados para conversão e presença digital.",
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    icon: Code,
    title: "APIs & Backend",
    description: "Desenvolvimento de APIs escaláveis e sistemas backend seguros e eficientes.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Design de interfaces intuitivas e experiências de usuário memoráveis.",
    gradient: "from-cyan-500 to-teal-500",
  },
  {
    icon: Rocket,
    title: "Consultoria Tech",
    description: "Orientação estratégica para transformação digital e adopção de tecnologias.",
    gradient: "from-teal-500 to-green-500",
  },
];

const ServicesSection = () => {
  return (
    <section id="servicos" className="py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Nossos Serviços
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            O que{" "}
            <span className="text-gradient-indigo">oferecemos</span>?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Da concepção à implementação, oferecemos soluções completas de desenvolvimento de software para impulsionar o seu negócio.
          </p>
        </AnimatedSection>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <AnimatedSection
              key={service.title}
              animation="scale"
              delay={index * 100}
            >
              <Card variant="hover" className="group overflow-hidden h-full">
                <CardContent className="p-8 relative">
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="relative text-xl font-display font-semibold text-foreground mb-3 group-hover:text-gradient-indigo transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="relative text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
