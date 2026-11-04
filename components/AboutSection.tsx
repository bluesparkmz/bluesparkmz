import { Target, Lightbulb, Users } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const AboutSection = () => {
  const features = [
    {
      icon: Target,
      title: "Nossa MissÃ£o",
      description: "Desenvolver soluÃ§Ãµes tecnolÃ³gicas inovadoras que transformam a forma como os moÃ§ambicanos fazem negÃ³cios e se conectam.",
    },
    {
      icon: Lightbulb,
      title: "Nossa VisÃ£o",
      description: "Ser a referÃªncia em inovaÃ§Ã£o tecnolÃ³gica em MoÃ§ambique, criando produtos que impactam positivamente a sociedade.",
    },
    {
      icon: Users,
      title: "Nossos Valores",
      description: "InovaÃ§Ã£o, qualidade, compromisso com o cliente e paixÃ£o pela tecnologia guiam todas as nossas aÃ§Ãµes.",
    },
  ];

  return (
    <section id="sobre" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Sobre NÃ³s
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Quem Ã© a{" "}
            <span className="text-primary">BlueSpark MZ</span>?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Fundada em 2023 por Dique Joaquim e Jorge SebastiÃ£o Paulo, a BlueSpark MZ nasceu com o objetivo de revolucionar o mercado tecnolÃ³gico moÃ§ambicano. Com sede no norte de MoÃ§ambique, em Niassa, nossa equipa jovem e apaixonada dedica-se Ã  criaÃ§Ã£o de aplicativos e sistemas que fazem a diferenÃ§a.
          </p>
        </AnimatedSection>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <AnimatedSection
              key={feature.title}
              animation="scale"
              delay={index * 150}
            >
              <div className="group relative h-full rounded-2xl border border-border bg-card p-8 shadow-card transition hover:-translate-y-0.5">
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="grid size-12 place-items-center rounded-xl bg-accent text-accent-foreground">
                    <feature.icon className="size-6" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="relative text-xl font-display font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="relative text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Timeline */}
        <div className="mt-20 relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />
          
          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedSection animation="fade-left" delay={0}>
              <div className="md:text-right md:pr-8 space-y-2">
                <div className="text-3xl font-display font-bold text-primary">2023</div>
                <h4 className="text-xl font-semibold text-foreground">FundaÃ§Ã£o</h4>
                <p className="text-muted-foreground">InÃ­cio da jornada BlueSpark MZ com foco em desenvolvimento de software.</p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-up" delay={150}>
              <div className="space-y-2">
                <div className="text-3xl font-display font-bold text-primary">2024</div>
                <h4 className="text-xl font-semibold text-foreground">InÃ­cio do SkyVenda MZ</h4>
                <p className="text-muted-foreground">ComeÃ§o do desenvolvimento da primeira rede social moÃ§ambicana de vendas.</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-right" delay={300}>
              <div className="md:text-left md:pl-8 space-y-2">
                <div className="text-3xl font-display font-bold text-primary">2026</div>
                <h4 className="text-xl font-semibold text-foreground">LanÃ§amento</h4>
                <p className="text-muted-foreground">Em Janeiro, o SkyVenda MZ serÃ¡ oficialmente lanÃ§ado ao pÃºblico.</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
