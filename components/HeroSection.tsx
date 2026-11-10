import { ArrowRight, BrainCircuit, Cloud, Code2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const CLOUD_URL = "https://cloud.bluesparkmz.com/";

const floatingTags = [
  { icon: Cloud, label: "Cloud Computing", className: "left-[6%] top-[12%] sm:left-[8%] sm:top-[18%]" },
  { icon: BrainCircuit, label: "Inteligência Artificial", className: "right-[4%] top-[8%] sm:right-[6%] sm:top-[14%]" },
  { icon: Code2, label: "APIs & Apps", className: "bottom-[14%] left-[10%] sm:bottom-[18%] sm:left-[14%]" },
  { icon: Sparkles, label: "BlueSpark Cloud", className: "bottom-[10%] right-[6%] sm:bottom-[16%] sm:right-[10%]" },
];

const HeroSection = () => {
  return (
    <section
      id="inicio"
      className="relative -mt-16 w-full min-h-[100svh] overflow-hidden bg-hero-gradient lg:-mt-20"
    >
      <div className="pointer-events-none absolute inset-0 hero-mesh" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 hero-grid opacity-[0.35]" aria-hidden="true" />

      <div className="container relative z-10 mx-auto px-4 pb-20 pt-28 lg:px-8 lg:pb-24 lg:pt-36">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 xl:gap-16">
          <div className="animate-fade-in space-y-7 text-center lg:space-y-8 lg:text-left">
            <a
              href={CLOUD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/70 px-3 py-1 text-xs font-medium text-[#1B1340]/80 shadow-sm backdrop-blur-sm transition hover:border-primary/40 hover:text-primary"
            >
              <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground">
                Novo
              </span>
              BlueSpark Cloud — apps, APIs, email e WhatsApp
              <ArrowRight className="h-3 w-3" />
            </a>

            <div className="space-y-4">
              <h1 className="text-4xl font-display font-bold tracking-tight text-[#0B0A12] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08] xl:text-6xl">
                O futuro digital começa com{" "}
                <span className="text-gradient-indigo">novas possibilidades</span>.
              </h1>
              <p className="text-lg font-display font-semibold tracking-tight text-[#1B1340] sm:text-xl lg:text-2xl">
                BlueSpark MZ.{" "}
                <span className="text-primary">O futuro é agora.</span>
              </p>
            </div>

            <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
              Criamos tecnologia para transformar a maneira como pessoas e empresas
              trabalham, inovam e crescem. Desenvolvemos soluções Cloud, Inteligência
              Artificial e aplicações que tornam o amanhã possível, hoje.
            </p>

            <div className="flex flex-col items-center justify-center gap-3 pt-1 sm:flex-row lg:justify-start">
              <Button variant="hero" size="xl" className="group w-full sm:w-auto" asChild>
                <a href="#portfolio">
                  Explorar soluções
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button variant="hero-outline" size="xl" className="w-full sm:w-auto" asChild>
                <a href={CLOUD_URL} target="_blank" rel="noopener noreferrer">
                  Conhecer BlueSpark Cloud
                </a>
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 lg:justify-start">
              {["Cloud", "IA", "APIs", "Apps"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-primary/10 bg-white/60 px-3 py-1 text-xs font-medium text-[#1B1340]/75 backdrop-blur-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div
            className="relative mx-auto w-full max-w-lg animate-fade-in-right lg:max-w-none"
            style={{ animationDelay: "0.15s" }}
          >
            <div className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(circle_at_center,hsl(255_77%_57%/0.28),transparent_68%)] blur-2xl hero-glow" />

            <div className="relative">
              <img
                src="/cloud/hero-tech-visual.jpg"
                alt="Ilustração tecnológica BlueSpark — Cloud e Inteligência Artificial"
                width={1200}
                height={900}
                className="relative z-[1] w-full object-contain drop-shadow-2xl"
              />

              {floatingTags.map(({ icon: Icon, label, className }, index) => (
                <div
                  key={label}
                  className={`hero-float absolute z-[2] hidden rounded-2xl border border-white/70 bg-white/85 px-3 py-2 shadow-[0_10px_40px_-18px_rgba(103,61,230,0.55)] backdrop-blur-md sm:flex sm:items-center sm:gap-2 ${className}`}
                  style={{ animationDelay: `${index * 0.45}s` }}
                >
                  <span className="grid size-8 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </span>
                  <span className="text-xs font-semibold text-[#1B1340]">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
