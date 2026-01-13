import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre a BlueSpark MZ - Documentação",
  description: "Saiba mais sobre a missão e visão da BlueSpark MZ.",
};

export default function AboutDocsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/docs" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Voltar para Documentação</Link>
      <h1 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Sobre a BlueSpark MZ</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="mb-4">
          A BlueSpark MZ é uma empresa dedicada a fornecer soluções tecnológicas inovadoras para impulsionar negócios em Moçambique e além.
        </p>
        <p>
          Nossa missão é simplificar processos complexos através de software intuitivo e poderoso, ajudando empresas a crescerem e prosperarem na era digital.
        </p>
      </div>
    </div>
  );
}
