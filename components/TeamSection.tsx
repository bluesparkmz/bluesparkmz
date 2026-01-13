import { Code2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedSection from "./AnimatedSection";

const team = [
  {
    name: "Dique Joaquim",
    role: "CEO & Co-Fundador",
    nickname: "Ghost04",
    bio: "Programador desde 2020, especializado em HTML, CSS, JavaScript, Python e PHP. Apaixonado por criar soluções que fazem a diferença.",
    languages: ["Python", "JavaScript", "HTML/CSS", "Java", "PHP"],
    gradient: "from-indigo-500 to-purple-500",
    avatar: "https://avatars.githubusercontent.com/diguijoaquim",
  },
  {
    name: "Jorge Sebastião Paulo",
    role: "CEO & Co-Fundador",
    nickname: null,
    bio: "Programador desde 2021, domina JavaScript e Python. Lidera com visão estratégica e paixão pela inovação tecnológica.",
    languages: ["JavaScript", "Python", "PHP"],
    gradient: "from-purple-500 to-pink-500",
    avatar: "https://avatars.githubusercontent.com/Jorgepaulo123",
  },
];

const TeamSection = () => {
  return (
    <section id="equipa" className="py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Nossa Equipa
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Conheça os{" "}
            <span className="text-gradient-indigo">Fundadores</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Uma dupla jovem e talentosa que está a construir o futuro da tecnologia em Moçambique.
          </p>
        </AnimatedSection>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <AnimatedSection
              key={member.name}
              animation={index === 0 ? "fade-left" : "fade-right"}
              delay={index * 150}
            >
              <Card variant="elevated" className="group overflow-hidden h-full">
                <CardContent className="p-8 relative">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Avatar */}
                  <div className="relative mb-6">
                    <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300 overflow-hidden`}>
                      {member.avatar ? (
                        <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-4xl font-display font-bold text-primary-foreground">
                          {member.name.charAt(0)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="relative space-y-4">
                    <div>
                      <h3 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
                        {member.name}
                        {member.nickname && (
                          <span className="text-sm font-normal text-muted-foreground">
                            ({member.nickname})
                          </span>
                        )}
                      </h3>
                      <p className="text-primary font-medium">{member.role}</p>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                      {member.bio}
                    </p>

                    {/* Languages */}
                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center gap-2 mb-3">
                        <Code2 className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">Linguagens</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {member.languages.map((lang) => (
                          <span
                            key={lang}
                            className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-lg"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        {/* Location Badge */}
        <AnimatedSection className="mt-16 text-center" delay={400}>
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-card border border-border/50 rounded-2xl shadow-sm">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-muted-foreground">
              Baseados em <span className="text-foreground font-semibold">Niassa, Norte de Moçambique</span>
            </span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default TeamSection;
