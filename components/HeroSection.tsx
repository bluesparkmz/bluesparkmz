import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const skyvendaPreview = "/skyvenda-preview.webp";

const HeroSection = () => {
  return (
    <section
      id="inicio"
      className="relative -mt-16 min-h-screen overflow-hidden bg-hero-gradient lg:-mt-20"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-4 top-20 h-48 w-48 animate-pulse rounded-full bg-primary/5 blur-3xl sm:left-10 sm:h-72 sm:w-72" />
        <div
          className="absolute bottom-20 right-4 h-56 w-56 animate-pulse rounded-full bg-primary/10 blur-3xl sm:right-10 sm:h-96 sm:w-96"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute left-1/2 top-1/2 h-[140vw] w-[140vw] max-h-[800px] max-w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto overflow-hidden px-4 pb-20 pt-32 lg:px-8 lg:pt-40">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-border/50 bg-card px-4 py-2 shadow-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground sm:text-sm">
                Startup de Tecnologia em Moçambique
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-display font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                Transformamos <span className="text-gradient-indigo">Ideias</span>
                <br />
                em <span className="text-gradient-instagram">Soluções</span> Digitais
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                Criamos aplicativos móveis, sistemas desktop e websites que
                impulsionam negócios em Moçambique e além.
              </p>
            </div>

            <div className="flex flex-wrap gap-8 py-4">
              <div className="space-y-1">
                <div className="text-3xl font-display font-bold text-foreground">2023</div>
                <div className="text-sm text-muted-foreground">Founded</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-display font-bold text-gradient-indigo">5+</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-display font-bold text-foreground">100%</div>
                <div className="text-sm text-muted-foreground">Mozambican</div>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Button variant="hero" size="xl" className="group w-full sm:w-auto" asChild>
                <a href="#portfolio">
                  Ver Projetos
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button variant="hero-outline" size="xl" className="w-full sm:w-auto" asChild>
                <a href="https://skyvenda.com" target="_blank" rel="noopener noreferrer">
                  Conhecer SkyVenda MZ
                </a>
              </Button>
            </div>
          </div>

          <div
            className="relative flex justify-center overflow-hidden animate-fade-in-right lg:justify-end"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="group relative cursor-pointer">
              <div className="absolute inset-0 scale-90 rounded-[3rem] bg-indigo-gradient opacity-20 blur-3xl transition-all duration-500 group-hover:scale-95 group-hover:opacity-30" />

              <div className="relative rounded-[2.5rem] border border-border/50 bg-card p-3 shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:shadow-indigo-lg">
                <div className="relative overflow-hidden rounded-[2rem]">
                  <img
                    src={skyvendaPreview}
                    alt="SkyVenda MZ App Preview"
                    className="h-auto w-full max-w-[20rem] rounded-[2rem] object-cover sm:max-w-[24rem] lg:w-[26rem] lg:max-w-none xl:w-[32rem]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 animate-bounce sm:flex">
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-muted-foreground/30 pt-2">
          <div className="h-3 w-1.5 animate-pulse rounded-full bg-primary" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
