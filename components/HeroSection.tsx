import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CLOUD_URL = "https://cloud.bluesparkmz.com/";

const HeroSection = () => {
  return (
    <section
      id="inicio"
      className="relative -mt-16 min-h-screen overflow-hidden bg-hero-gradient lg:-mt-20"
    >
      <div className="container relative z-10 mx-auto flex min-h-screen items-center justify-center overflow-hidden px-4 pb-24 pt-32 lg:px-8 lg:pt-40">
        <div className="mx-auto max-w-3xl animate-fade-in space-y-8 text-center">
          <a
            href={CLOUD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm transition hover:border-primary/40 hover:text-foreground"
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
    </section>
  );
};

export default HeroSection;
