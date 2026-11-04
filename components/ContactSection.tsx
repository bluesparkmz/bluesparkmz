import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedSection from "./AnimatedSection";

const contactInfo = [
  {
    icon: Phone,
    label: "Telefone",
    value: "+258 86 071 6912",
    href: "tel:+258860716912",
  },
  {
    icon: Phone,
    label: "Telefone 2",
    value: "+258 86 028 9475",
    href: "tel:+258860289475",
  },
  {
    icon: Mail,
    label: "Email",
    value: "bluesparkmz1@gmail.com",
    href: "mailto:bluesparkmz1@gmail.com",
  },
  {
    icon: MapPin,
    label: "LocalizaÃ§Ã£o",
    value: "Niassa, MoÃ§ambique",
    href: null,
  },
];

const ContactSection = () => {
  return (
    <section id="contacto" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Contacto
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Vamos{" "}
            <span className="text-primary">conversar</span>?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Tem um projeto em mente? Entre em contacto connosco e vamos transformar a sua ideia em realidade.
          </p>
        </AnimatedSection>

        {/* Contact Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {contactInfo.map((info, index) => (
            <AnimatedSection
              key={info.label}
              animation="scale"
              delay={index * 100}
            >
              <Card variant="hover" className="group h-full rounded-2xl border-border shadow-card">
                <CardContent className="p-6 text-center">
                  {/* Icon */}
                  <div className="mb-4 flex justify-center">
                    <div className="size-12 bg-accent rounded-xl flex items-center justify-center group-hover:bg-primary transition-all duration-300">
                      <info.icon className="w-6 h-6 text-accent-foreground group-hover:text-primary-foreground transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-sm text-muted-foreground mb-1">{info.label}</h3>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-foreground font-medium hover:text-primary transition-colors"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-foreground font-medium">{info.value}</p>
                  )}
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection className="mt-16 text-center" delay={500}>
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="xl" className="group" asChild>
              <a href="mailto:bluesparkmz1@gmail.com">
                Enviar Email
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <a href="https://cloud.bluesparkmz.com/" target="_blank" rel="noopener noreferrer">
                Abrir BlueSpark Cloud
              </a>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ContactSection;
