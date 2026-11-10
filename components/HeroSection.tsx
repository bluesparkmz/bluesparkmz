import { ArrowRight, BrainCircuit, Cloud, Code2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const CLOUD_URL = "https://cloud.bluesparkmz.com/";

const floatingTags = [
  { icon: Cloud, label: "Cloud Computing", className: "left-0 top-[8%] sm:left-[2%] sm:top-[12%]" },
  { icon: BrainCircuit, label: "Inteligência Artificial", className: "right-0 top-[4%] sm:right-[2%] sm:top-[8%]" },
  { icon: Code2, label: "APIs & Apps", className: "bottom-[8%] left-[2%] sm:bottom-[12%] sm:left-[6%]" },
  { icon: Sparkles, label: "BlueSpark Cloud", className: "bottom-[4%] right-[2%] sm:bottom-[10%] sm:right-[4%]" },
];

function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
      <div className="pointer-events-none absolute inset-[8%] rounded-full bg-[radial-gradient(circle,hsl(255_77%_57%/0.28),transparent_68%)] blur-3xl hero-glow" />
      <div className="pointer-events-none absolute left-[12%] top-[18%] size-40 rounded-full bg-[radial-gradient(circle,hsl(256_100%_75%/0.35),transparent_70%)] blur-2xl hero-float" />
      <div
        className="pointer-events-none absolute bottom-[16%] right-[10%] size-48 rounded-full bg-[radial-gradient(circle,hsl(255_77%_57%/0.22),transparent_70%)] blur-2xl hero-float"
        style={{ animationDelay: "1.2s" }}
      />

      <svg
        viewBox="0 0 520 520"
        className="relative z-[1] h-full w-full"
        role="img"
        aria-label="Ilustração Cloud e Inteligência Artificial BlueSpark"
      >
        <defs>
          <linearGradient id="bsOrb" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A78BFA" />
            <stop offset="55%" stopColor="#673DE6" />
            <stop offset="100%" stopColor="#4C1D95" />
          </linearGradient>
          <linearGradient id="bsGlass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#E9E2FF" stopOpacity="0.75" />
          </linearGradient>
          <filter id="bsSoft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* conexões digitais */}
        <g stroke="#673DE6" strokeOpacity="0.22" strokeWidth="1.5" fill="none">
          <path d="M110 150 C170 120, 220 200, 260 240" />
          <path d="M400 130 C360 180, 330 210, 280 250" />
          <path d="M120 360 C180 330, 220 300, 260 280" />
          <path d="M410 370 C350 340, 310 300, 275 270" />
        </g>
        <g fill="#673DE6">
          <circle cx="110" cy="150" r="4" opacity="0.45" />
          <circle cx="400" cy="130" r="4" opacity="0.35" />
          <circle cx="120" cy="360" r="3.5" opacity="0.4" />
          <circle cx="410" cy="370" r="3.5" opacity="0.35" />
          <circle cx="260" cy="240" r="3" opacity="0.5" />
        </g>

        {/* nuvem de vidro */}
        <g filter="url(#bsSoft)" opacity="0.95">
          <ellipse cx="250" cy="290" rx="150" ry="78" fill="url(#bsGlass)" />
          <circle cx="170" cy="250" r="70" fill="url(#bsGlass)" />
          <circle cx="250" cy="230" r="88" fill="url(#bsGlass)" />
          <circle cx="335" cy="250" r="74" fill="url(#bsGlass)" />
        </g>

        {/* órbita / IA */}
        <circle cx="258" cy="248" r="58" fill="url(#bsOrb)" opacity="0.95" />
        <circle cx="258" cy="248" r="42" fill="none" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="2" />
        <g stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="1.4" fill="#FFFFFF">
          <line x1="230" y1="230" x2="286" y2="266" />
          <line x1="286" y1="230" x2="230" y2="266" />
          <line x1="258" y1="214" x2="258" y2="282" />
          <circle cx="230" cy="230" r="3.2" />
          <circle cx="286" cy="230" r="3.2" />
          <circle cx="230" cy="266" r="3.2" />
          <circle cx="286" cy="266" r="3.2" />
          <circle cx="258" cy="248" r="4.5" />
        </g>

        {/* anéis orbitais */}
        <ellipse
          cx="258"
          cy="248"
          rx="118"
          ry="46"
          fill="none"
          stroke="#673DE6"
          strokeOpacity="0.28"
          strokeWidth="1.5"
          transform="rotate(-18 258 248)"
        />
        <ellipse
          cx="258"
          cy="248"
          rx="132"
          ry="52"
          fill="none"
          stroke="#A78BFA"
          strokeOpacity="0.2"
          strokeWidth="1.2"
          transform="rotate(24 258 248)"
        />
      </svg>

      {floatingTags.map(({ icon: Icon, label, className }, index) => (
        <div
          key={label}
          className={`hero-float absolute z-[2] hidden rounded-2xl border border-white/80 bg-white/90 px-3 py-2 shadow-[0_12px_40px_-20px_rgba(103,61,230,0.55)] backdrop-blur-md sm:flex sm:items-center sm:gap-2 ${className}`}
          style={{ animationDelay: `${index * 0.45}s` }}
        >
          <span className="grid size-8 place-items-center rounded-xl bg-primary/10 text-primary">
            <Icon className="size-4" />
          </span>
          <span className="text-xs font-semibold text-[#1B1340]">{label}</span>
        </div>
      ))}
    </div>
  );
}

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
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
