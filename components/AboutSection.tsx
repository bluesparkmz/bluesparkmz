import { Target, Lightbulb, Users } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const AboutSection = () => {
  const features = [
    {
      icon: Target,
      title: "Nossa Missão",
      description: "Desenvolver soluções tecnológicas inovadoras que transformam a forma como os moçambicanos fazem negócios e se conectam.",
    },
    {
      icon: Lightbulb,
      title: "Nossa Visão",
      description: "Ser a referência em inovação tecnológica em Moçambique, criando produtos que impactam positivamente a sociedade.",
    },
    {
      icon: Users,
      title: "Nossos Valores",
      description: "Inovação, qualidade, compromisso com o cliente e paixão pela tecnologia guiam todas as nossas ações.",
    },
  ];

  return (
    <section id="sobre" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Sobre Nós
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Quem é a{" "}
            <span className="text-gradient-indigo">BlueSpark MZ</span>?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Fundada em 2023 por Dique Joaquim e Jorge Sebastião Paulo, a BlueSpark MZ nasceu com o objetivo de revolucionar o mercado tecnológico moçambicano. Com sede no norte de Moçambique, em Niassa, nossa equipa jovem e apaixonada dedica-se à criação de aplicativos e sistemas que fazem a diferença.
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
              <div className="group relative p-8 bg-card rounded-2xl border border-border/50 shadow-sm hover:shadow-xl transition-all duration-500 card-hover h-full">
                {/* Gradient Background on Hover */}
                <div className="absolute inset-0 bg-indigo-gradient rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-indigo-gradient group-hover:shadow-indigo transition-all duration-300">
                    <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
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
                <div className="text-3xl font-display font-bold text-gradient-indigo">2023</div>
                <h4 className="text-xl font-semibold text-foreground">Fundação</h4>
                <p className="text-muted-foreground">Início da jornada BlueSpark MZ com foco em desenvolvimento de software.</p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-up" delay={150}>
              <div className="space-y-2">
                <div className="text-3xl font-display font-bold text-gradient-instagram">2024</div>
                <h4 className="text-xl font-semibold text-foreground">Início do SkyVenda MZ</h4>
                <p className="text-muted-foreground">Começo do desenvolvimento da primeira rede social moçambicana de vendas.</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-right" delay={300}>
              <div className="md:text-left md:pl-8 space-y-2">
                <div className="text-3xl font-display font-bold text-gradient-indigo">2026</div>
                <h4 className="text-xl font-semibold text-foreground">Lançamento</h4>
                <p className="text-muted-foreground">Em Janeiro, o SkyVenda MZ será oficialmente lançado ao público.</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
