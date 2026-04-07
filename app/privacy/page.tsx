import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Saiba como a BlueSpark MZ recolhe, utiliza, protege e partilha os dados pessoais dos utilizadores.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Política de Privacidade"
      description="Esta política explica como tratamos dados pessoais ao utilizar o nosso site, formulários, canais de contacto e serviços digitais."
      updatedAt="07 de abril de 2026"
    >
      <h2>1. Introdução</h2>
      <p>
        A BlueSpark MZ respeita a privacidade dos seus utilizadores, clientes e
        parceiros. Esta Política de Privacidade descreve como recolhemos,
        utilizamos, armazenamos e protegemos as informações partilhadas através
        do nosso website e dos nossos serviços.
      </p>

      <h2>2. Dados que podemos recolher</h2>
      <p>Podemos recolher informações como:</p>
      <ul>
        <li>Nome completo</li>
        <li>Endereço de email</li>
        <li>Número de telefone</li>
        <li>Nome da empresa ou projeto</li>
        <li>Informações enviadas em formulários de contacto ou registo</li>
        <li>Dados técnicos como endereço IP, navegador e páginas visitadas</li>
      </ul>

      <h2>3. Como utilizamos os dados</h2>
      <p>As informações recolhidas podem ser utilizadas para:</p>
      <ul>
        <li>Responder a pedidos de contacto, suporte ou demonstração</li>
        <li>Gerir contas, acessos e comunicações relacionadas com os serviços</li>
        <li>Melhorar a experiência no website e nas plataformas digitais</li>
        <li>Enviar atualizações importantes sobre produtos e serviços</li>
        <li>Cumprir obrigações legais, contratuais e de segurança</li>
      </ul>

      <h2>4. Partilha de dados</h2>
      <p>
        A BlueSpark MZ não vende dados pessoais. Podemos partilhar informações
        apenas quando isso for necessário para operação dos serviços, para
        cumprimento legal, ou com fornecedores tecnológicos que atuem sob
        obrigações adequadas de confidencialidade e segurança.
      </p>

      <h2>5. Conservação e segurança</h2>
      <p>
        Mantemos medidas técnicas e organizacionais razoáveis para proteger os
        dados contra acesso não autorizado, perda, alteração ou divulgação
        indevida. Conservamos os dados apenas pelo tempo necessário para as
        finalidades descritas nesta política ou para cumprimento de requisitos
        legais.
      </p>

      <h2>6. Cookies e dados de navegação</h2>
      <p>
        O nosso website pode utilizar cookies ou tecnologias semelhantes para
        melhorar desempenho, analisar tráfego e compreender a utilização da
        plataforma. O utilizador pode gerir cookies através das definições do
        navegador.
      </p>

      <h2>7. Direitos do titular dos dados</h2>
      <p>
        O utilizador pode solicitar acesso, correção, atualização ou eliminação
        dos seus dados pessoais, salvo quando a conservação for necessária por
        motivos legais ou contratuais.
      </p>

      <h2>8. Contacto</h2>
      <p>
        Para questões relacionadas com privacidade ou tratamento de dados, entre
        em contacto através do email <strong>bluesparkmz1@gmail.com</strong> ou
        pelos números <strong>+258 86 071 6912</strong> e{" "}
        <strong>+258 86 028 9475</strong>.
      </p>

      <h2>9. Atualizações desta política</h2>
      <p>
        Esta política pode ser atualizada periodicamente para refletir mudanças
        legais, técnicas ou operacionais. A versão mais recente estará sempre
        disponível nesta página.
      </p>
    </LegalPageLayout>
  );
}
