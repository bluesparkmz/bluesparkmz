import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "SmartMoz - Documentação BlueSpark MZ",
    description: "Conheça o SmartMoz, impulsionando a tecnologia em Moçambique.",
};

export default function SmartMozDocsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <Link href="/docs" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Voltar para Documentação</Link>
            <h1 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">SmartMoz</h1>
            <div className="prose dark:prose-invert max-w-none">
                <p className="mb-4">
                    O SmartMoz é a iniciativa da BlueSpark para trazer cidades inteligentes e soluções conectadas para Moçambique.
                </p>
                <h2 className="text-2xl font-semibold mt-6 mb-3">Pilares</h2>
                <ul className="list-disc pl-6 mb-4">
                    <li>Conectividade rural e urbana</li>
                    <li>Educação tecnológica</li>
                    <li>Infraestrutura digital</li>
                </ul>
            </div>
        </div>
    );
}
