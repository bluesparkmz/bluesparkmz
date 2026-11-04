import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CLOUD_URL, cloudStacks } from "@/lib/cloud";

function FrameworkRow() {
  const loop = [...cloudStacks, ...cloudStacks];

  return (
    <div
      className="stack-row-viewport mx-auto max-w-md"
      aria-label="Stacks e containers suportados"
    >
      <div className="stack-row-track flex w-max items-center gap-8 sm:gap-10">
        {loop.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="flex w-[7.25rem] shrink-0 items-center justify-center gap-2 sm:w-[8rem]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt=""
              className={`size-6 shrink-0 object-contain sm:size-7 ${
                item.id === "php" ? "rounded bg-[#777BB4] p-0.5" : ""
              }`}
            />
            <span className="truncate text-xs font-medium text-foreground sm:text-sm">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const HeroSection = () => {
  return (
    <section id="inicio" className="relative -mt-16 overflow-hidden lg:-mt-20">
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 bg-grid opacity-40 [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_65%,transparent)]" />

      <div className="container relative mx-auto max-w-4xl px-4 pb-24 pt-32 text-center lg:pt-40">
        <FrameworkRow />

        <a
          href={CLOUD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-card transition hover:border-primary/40 hover:text-foreground"
        >
          <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground">
            Novo
          </span>
          BlueSpark Cloud já está disponível
          <ArrowRight className="size-3" />
        </a>

        <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
          Faça deploy de qualquer coisa.{" "}
          <span className="text-primary">Sem complicação.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Com o BlueSpark Cloud, a BlueSpark MZ coloca no ar aplicações web, APIs e automação
          WhatsApp — deploy em segundos, na mesma plataforma.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button variant="hero" size="lg" className="group h-12 px-8 text-base" asChild>
            <a href={CLOUD_URL} target="_blank" rel="noopener noreferrer">
              Abrir BlueSpark Cloud
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
          <Button variant="hero-outline" size="lg" className="h-12 px-8 text-base" asChild>
            <a href="#cloud">Ver como funciona</a>
          </Button>
        </div>

        <div className="fake-terminal mx-auto mt-16 max-w-2xl text-left" aria-hidden="true">
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
              <span className="ft-type ft-l4">
                ✓ Deploy concluído em 14s → https://my-app.bluespark.app
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
