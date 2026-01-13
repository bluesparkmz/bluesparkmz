import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AnimatedSection from "./AnimatedSection";

const skyvendaPreview = "/skyvenda-preview.webp";
const skywalletPreview = "/skywallet-preview.png";
const smartmozPreview = "/smartmoz-preview.png";
const fastfoodPreview = "/fastfood-preview.png";
const skypdvPreview = "/skypdv-preview.png";

const projects = [
  {
    title: "SkyVenda MZ",
    category: "Rede Social",
    description: "A primeira rede social moçambicana focada em vendas e interação em tempo real com amigos e lojas.",
    image: skyvendaPreview,
    link: "https://skyvenda.com",
    featured: true,
    tags: ["React", "Node.js", "Real-time"],
  },
  {
    title: "SkyWallet",
    category: "Fintech",
    description: "Carteira digital integrada à SkyVenda MZ para transações seguras e rápidas.",
    image: skywalletPreview,
    link: null,
    featured: false,
    tags: ["Mobile", "Pagamentos", "Segurança"],
  },
  {
    title: "SmartMoz",
    category: "E-Learning",
    description: "Plataforma de vendas de produtos digitais como e-books e cursos online.",
    image: smartmozPreview,
    link: null,
    featured: false,
    tags: ["Educação", "E-commerce", "Streaming"],
  },
  {
    title: "Fastfood",
    category: "Delivery",
    description: "Cardápio digital e sistema de localização de restaurantes próximos.",
    image: fastfoodPreview,
    link: null,
    featured: false,
    tags: ["Geolocalização", "Restaurantes", "Delivery"],
  },
  {
    title: "SkyPDV",
    category: "Gestão",
    description: "Sistema PDV para gestão de vendas online e locais em restaurantes e supermercados.",
    image: skypdvPreview,
    link: null,
    featured: false,
    tags: ["POS", "Inventário", "Vendas"],
  },
];

const PortfolioSection = () => {
  const featuredProject = projects.find((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="portfolio" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Portfólio
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Nossos{" "}
            <span className="text-gradient-indigo">Projetos</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Conheça os produtos que estamos a desenvolver para transformar o ecossistema digital moçambicano.
          </p>
        </AnimatedSection>

        {/* Featured Project */}
        {featuredProject && (
          <AnimatedSection animation="scale" className="mb-12">
            <Card variant="project" className="overflow-hidden">
              <div className="grid lg:grid-cols-2">
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={featuredProject.image}
                    alt={featuredProject.title}
                    className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-indigo-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="inline-block px-3 py-1 bg-instagram-gradient text-primary-foreground text-xs font-semibold rounded-full w-fit mb-4">
                    Destaque
                  </span>
                  <span className="text-sm text-muted-foreground mb-2">{featuredProject.category}</span>
                  <h3 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-4">
                    {featuredProject.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {featuredProject.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {featuredProject.link && (
                    <Button variant="hero" className="w-fit group" asChild>
                      <a href={featuredProject.link} target="_blank" rel="noopener noreferrer">
                        Visitar Projeto
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </AnimatedSection>
        )}

        {/* Other Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {otherProjects.map((project, index) => (
            <AnimatedSection
              key={project.title}
              animation="fade-up"
              delay={index * 100}
            >
              <Card variant="project" className="h-full">
                {/* Image */}
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Overlay Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-card/90 text-foreground text-xs font-medium rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <span className="text-xs text-primary font-medium">{project.category}</span>
                  <h3 className="text-lg font-display font-semibold text-foreground mt-1 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
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
