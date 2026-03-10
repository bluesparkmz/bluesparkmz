import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AnimatedSection from "./AnimatedSection";

const skyvendaPreview = "/skyvenda-preview.webp";
const skywalletPreview = "/skywallet-preview.png";
const smartmozPreview = "/smartmoz-preview.png";
const fastfoodPreview = "/fastfood-preview.png";
const skypdvPreview = "/skypdv-preview.png";
const contablizaPreview = "/favicon.png";
const sparkflowPreview = "/favicon.png";

const projects = [
  {
    title: "SkyVenda MZ",
    category: "Social Commerce",
    description:
      "A primeira rede social moçambicana focada em vendas e interação em tempo real entre clientes e lojas.",
    image: skyvendaPreview,
    link: "https://skyvenda.com",
    featured: true,
    tags: ["React", "Commerce", "Realtime"],
  },
  {
    title: "SkyWallet",
    category: "Fintech",
    description:
      "Carteira digital integrada ao ecossistema BlueSpark para transações seguras e rápidas.",
    image: skywalletPreview,
    link: null,
    featured: false,
    tags: ["Payments", "Wallet", "Security"],
  },
  {
    title: "SmartMoz",
    category: "Digital Learning",
    description:
      "Plataforma para venda e distribuição de cursos, e-books e outros produtos digitais.",
    image: smartmozPreview,
    link: null,
    featured: false,
    tags: ["Learning", "Digital Products", "Streaming"],
  },
  {
    title: "FastFood",
    category: "Food Delivery",
    description:
      "Sistema para operações de restaurantes, menu digital, pedidos e entrega.",
    image: fastfoodPreview,
    link: null,
    featured: false,
    tags: ["Restaurants", "Orders", "Delivery"],
  },
  {
    title: "SkyPDV",
    category: "Retail Operations",
    description:
      "Sistema PDV para gestão de vendas locais, caixa, inventário e operação comercial.",
    image: skypdvPreview,
    link: null,
    featured: false,
    tags: ["POS", "Inventory", "Sales"],
  },
  {
    title: "ContaBliza",
    category: "Accounting",
    description:
      "Sistema moderno de contabilidade para empresas e negócios com foco em controlo financeiro, faturação e relatórios.",
    image: contablizaPreview,
    link: null,
    featured: false,
    tags: ["Accounting", "Finance", "Reports"],
  },
  {
    title: "SparkFlow",
    category: "Messaging Automation",
    description:
      "Gateway de automação de mensagens WhatsApp e SMS para campanhas, notificações e fluxos operacionais.",
    image: sparkflowPreview,
    link: null,
    featured: false,
    tags: ["WhatsApp", "SMS", "Automation"],
  },
];

const PortfolioSection = () => {
  const featuredProject = projects.find((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);

  return (
    <section id="portfolio" className="bg-background py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <AnimatedSection className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Portfolio
          </span>
          <h2 className="mb-6 text-3xl font-display font-bold text-foreground md:text-4xl lg:text-5xl">
            Our <span className="text-gradient-indigo">Products</span>
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Conheça os produtos que a BlueSpark MZ está a construir para comércio,
            finanças, operações, contabilidade e automação de comunicação.
          </p>
        </AnimatedSection>

        {featuredProject ? (
          <AnimatedSection animation="scale" className="mb-12">
            <Card variant="project" className="overflow-hidden">
              <div className="grid lg:grid-cols-2">
                <div className="relative overflow-hidden">
                  <img
                    src={featuredProject.image}
                    alt={featuredProject.title}
                    className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105 lg:h-full"
                  />
                  <div className="absolute inset-0 bg-indigo-gradient opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
                </div>

                <div className="flex flex-col justify-center p-8 lg:p-12">
                  <span className="mb-4 inline-block w-fit rounded-full bg-instagram-gradient px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Featured
                  </span>
                  <span className="mb-2 text-sm text-muted-foreground">
                    {featuredProject.category}
                  </span>
                  <h3 className="mb-4 text-2xl font-display font-bold text-foreground lg:text-3xl">
                    {featuredProject.title}
                  </h3>
                  <p className="mb-6 leading-relaxed text-muted-foreground">
                    {featuredProject.description}
                  </p>

                  <div className="mb-6 flex flex-wrap gap-2">
                    {featuredProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {featuredProject.link ? (
                    <Button variant="hero" className="group w-fit" asChild>
                      <a href={featuredProject.link} target="_blank" rel="noopener noreferrer">
                        Visit product
                        <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </Button>
                  ) : null}
                </div>
              </div>
            </Card>
          </AnimatedSection>
        ) : null}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {otherProjects.map((project, index) => (
            <AnimatedSection key={project.title} animation="fade-up" delay={index * 100}>
              <Card variant="project" className="h-full">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-card/90 px-2 py-0.5 text-xs font-medium text-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <span className="text-xs font-medium text-primary">
                    {project.category}
                  </span>
                  <h3 className="mb-2 mt-1 text-lg font-display font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <p className="line-clamp-3 text-sm text-muted-foreground">
                    {project.description}
                  </p>
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
