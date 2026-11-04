import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CLOUD_URL = "https://cloud.bluesparkmz.com/";

const cloudStacks = [
  { name: "React", src: "/cloud/react.svg" },
  { name: "Next.js", src: "/cloud/nextjs.png" },
  { name: "FastAPI", src: "/cloud/fastapi_logo.png" },
  { name: "Laravel", src: "/cloud/laravel.png" },
  { name: "PostgreSQL", src: "/cloud/postgresql.png" },
  { name: "Redis", src: "/cloud/redis.svg" },
  { name: "WhatsApp", src: "/cloud/whatsapp.png" },
];

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
          <div className="animate-fade-in space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <a
                href={CLOUD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
              >
                <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground">
                  Novo
                </span>
                BlueSpark Cloud — deploy de apps, APIs e WhatsApp
                <ArrowRight className="h-3 w-3" />
              </a>
              <h1 className="text-4xl font-display font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                Transformamos <span className="text-gradient-indigo">Ideias</span>
                <br />
                em <span className="text-gradient-instagram">Soluções</span> Digitais
              </h1>
              <p className="mx-auto max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl lg:mx-0">
                Criamos aplicativos móveis, sistemas desktop e websites que
                impulsionam negócios em Moçambique e além.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8 py-4 lg:justify-start">
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

            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
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

          <div
            className="relative flex justify-center overflow-hidden animate-fade-in-right lg:justify-end"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="group relative cursor-pointer">
              <div className="absolute inset-0 scale-90 rounded-[3rem] bg-indigo-gradient opacity-20 blur-3xl transition-all duration-500 group-hover:scale-95 group-hover:opacity-30" />

              <div className="relative rounded-[2.5rem] border border-border/50 bg-card p-3 shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:shadow-indigo-lg">
                <a
                  href={CLOUD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Abrir BlueSpark Cloud"
                  className="relative block w-full max-w-[20rem] overflow-hidden rounded-[2rem] bg-background p-5 sm:max-w-[24rem] lg:w-[26rem] lg:max-w-none xl:w-[32rem]"
                >
                  <div className="flex items-center gap-3">
                    <img src="/cloud/logo.png" alt="" width={40} height={40} className="size-10 object-contain" />
                    <div className="text-left">
                      <p className="text-lg font-display font-bold leading-tight text-foreground">
                        BlueSpark <span className="text-primary">Cloud</span>
                      </p>
                      <p className="text-xs text-muted-foreground">Apps, APIs e automação WhatsApp</p>
                    </div>
                    <span className="ml-auto rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground">
                      Novo
                    </span>
                  </div>

                  <div className="fake-terminal mt-5 text-left" aria-hidden="true">
                    <div className="fake-terminal-bar">
                      <span className="fake-terminal-dot fake-terminal-dot-red" />
                      <span className="fake-terminal-dot fake-terminal-dot-yellow" />
                      <span className="fake-terminal-dot fake-terminal-dot-green" />
                    </div>
                    <div className="fake-terminal-body">
                      <p className="ft-row">
                        <span className="ft-prompt">$</span>
                        <span className="ft-type ft-l1">bluespark init my-app</span>
                      </p>
                      <p className="ft-row">
                        <span className="ft-prompt ft-p2">$</span>
                        <span className="ft-type ft-l2">bluespark add postgres</span>
                      </p>
                      <p className="ft-row">
                        <span className="ft-prompt ft-p3">$</span>
                        <span className="ft-type ft-l3">bluespark up</span>
                      </p>
                      <p className="ft-row">
                        <span className="ft-type ft-l4">✓ Deploy concluído em 14s</span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {cloudStacks.map((stack) => (
                      <span
                        key={stack.name}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                      >
                        <img src={stack.src} alt="" className="size-4 object-contain" />
                        {stack.name}
                      </span>
                    ))}
                  </div>

                  <p className="mt-4 text-center text-xs font-medium text-primary">
                    cloud.bluesparkmz.com →
                  </p>
                </a>
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
