import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
const skyvendaPreview = "/skyvenda-preview.webp";

const HeroSection = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen bg-hero-gradient overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 pt-32 lg:pt-40 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border/50 rounded-full shadow-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                Startup de Tecnologia em Moçambique
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight">
                Transformamos{" "}
                <span className="text-gradient-indigo">Ideias</span>
                <br />
                em{" "}
                <span className="text-gradient-instagram">Soluções</span>{" "}
                Digitais
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                Criamos aplicativos móveis, sistemas desktop e websites que impulsionam negócios em Moçambique e além.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 py-4">
              <div className="space-y-1">
                <div className="text-3xl font-display font-bold text-foreground">2023</div>
                <div className="text-sm text-muted-foreground">Fundada</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-display font-bold text-gradient-indigo">5+</div>
                <div className="text-sm text-muted-foreground">Projetos</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-display font-bold text-foreground">100%</div>
                <div className="text-sm text-muted-foreground">Moçambicano</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="xl" className="group" asChild>
                <a href="#portfolio">
                  Ver Projetos
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <a href="https://skyvenda.com" target="_blank" rel="noopener noreferrer">
                  Conhecer SkyVenda MZ
                </a>
              </Button>
            </div>
          </div>

          {/* Right Content - Phone Mockup */}
          <div className="relative flex justify-center lg:justify-end animate-fade-in-right" style={{ animationDelay: "0.3s" }}>
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-indigo-gradient rounded-[3rem] blur-3xl opacity-20 scale-90" />
              
              {/* Phone Frame */}
              <div className="relative bg-card rounded-[2.5rem] p-3 shadow-2xl border border-border/50">
                <div className="relative rounded-[2rem] overflow-hidden">
                  {/* Screen Content */}
                  <img
                    src={skyvendaPreview}
                    alt="SkyVenda MZ App Preview"
                    className="w-72 md:w-80 h-auto object-cover rounded-[2rem]"
                  />
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -left-8 top-20 bg-card rounded-2xl p-4 shadow-lg border border-border/50 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-instagram-gradient rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">SkyVenda MZ</div>
                    <div className="text-xs text-muted-foreground">Rede Social de Vendas</div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 bottom-32 bg-card rounded-2xl p-4 shadow-lg border border-border/50 animate-float" style={{ animationDelay: "1.5s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-gradient rounded-xl flex items-center justify-center">
                    <span className="text-lg">🚀</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Em Crescimento</div>
                    <div className="text-xs text-muted-foreground">Norte de Moçambique</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
