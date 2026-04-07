import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Termos e Condições",
  description:
    "Conheça os termos e condições de utilização do website e dos serviços digitais da BlueSpark MZ.",
};

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Termos e Condições"
      description="Estes termos regulam o acesso e a utilização do website, conteúdos, plataformas e serviços disponibilizados pela BlueSpark MZ."
      updatedAt="07 de abril de 2026"
    >
      <h2>1. Aceitação dos termos</h2>
      <p>
        Ao aceder ao website da BlueSpark MZ ou utilizar qualquer um dos nossos
        serviços digitais, o utilizador declara que leu, compreendeu e aceita
        estes Termos e Condições.
      </p>

      <h2>2. Utilização permitida</h2>
      <p>
        O utilizador compromete-se a utilizar o website e os serviços de forma
        lícita, responsável e segura, abstendo-se de:
      </p>
      <ul>
        <li>Violar leis, regulamentos ou direitos de terceiros</li>
        <li>Tentar obter acesso não autorizado a sistemas, contas ou dados</li>
        <li>Introduzir código malicioso, spam ou conteúdos fraudulentos</li>
        <li>Usar os serviços para fins abusivos, ilícitos ou enganosos</li>
      </ul>

      <h2>3. Propriedade intelectual</h2>
      <p>
        Marcas, logótipos, textos, interfaces, imagens, software e demais
        conteúdos disponibilizados pela BlueSpark MZ pertencem à empresa ou aos
        respetivos titulares e não podem ser reproduzidos, distribuídos ou
        explorados sem autorização prévia, salvo quando permitido por lei.
      </p>

      <h2>4. Contas e informações fornecidas</h2>
      <p>
        Quando aplicável, o utilizador é responsável pela veracidade das
        informações submetidas e pela proteção das credenciais de acesso das suas
        contas. A BlueSpark MZ poderá suspender acessos em caso de uso indevido
        ou violação destes termos.
      </p>

      <h2>5. Disponibilidade do serviço</h2>
      <p>
        Procuramos manter os serviços disponíveis e atualizados, mas não
        garantimos funcionamento ininterrupto ou livre de erros. Poderão ocorrer
        interrupções para manutenção, evolução técnica ou fatores fora do nosso
        controlo.
      </p>

      <h2>6. Limitação de responsabilidade</h2>
      <p>
        Dentro dos limites legais aplicáveis, a BlueSpark MZ não será
        responsável por perdas indiretas, interrupções de negócio, danos
        resultantes de uso indevido do website ou falhas provocadas por terceiros
        ou por eventos externos.
      </p>

      <h2>7. Ligações externas</h2>
      <p>
        O website pode incluir links para plataformas ou serviços de terceiros.
        A BlueSpark MZ não controla esses websites e não se responsabiliza pelo
        respetivo conteúdo, políticas ou práticas.
      </p>

      <h2>8. Alterações aos termos</h2>
      <p>
        Podemos atualizar estes Termos e Condições a qualquer momento. Quando
        isso acontecer, a versão revista será publicada nesta página com a data
        de atualização correspondente.
      </p>

      <h2>9. Contacto</h2>
      <p>
        Para esclarecimentos sobre estes termos, entre em contacto pelo email{" "}
        <strong>bluesparkmz1@gmail.com</strong>.
      </p>
    </LegalPageLayout>
  );
}
