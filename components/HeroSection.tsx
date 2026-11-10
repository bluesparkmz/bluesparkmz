import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CLOUD_URL = "https://cloud.bluesparkmz.com/";

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

      <div className="container relative z-10 mx-auto flex min-h-screen items-center justify-center overflow-hidden px-4 pb-24 pt-32 lg:px-8 lg:pt-40">
        <div className="mx-auto max-w-3xl animate-fade-in space-y-8 text-center">
          <a
            href={CLOUD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
          >
            <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground">
              Novo
            </span>
            BlueSpark Cloud — apps, APIs, email e WhatsApp
            <ArrowRight className="h-3 w-3" />
          </a>

          <h1 className="text-4xl font-display font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            Transformamos <span className="text-gradient-indigo">Ideias</span>
            <br />
            em <span className="text-gradient-instagram">Soluções</span> Digitais
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Criamos aplicativos móveis, sistemas desktop e websites que
            impulsionam negócios em Moçambique e além.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row">
            <Button variant="hero" size="xl" className="group w-full sm:w-auto" asChild>
              <a href="#portfolio">
                Ver Projetos
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button variant="hero-outline" size="xl" className="w-full sm:w-auto" asChild>
              <a href={CLOUD_URL} target="_blank" rel="noopener noreferrer">
                Conhecer BlueSpark Cloud
              </a>
            </Button>
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
