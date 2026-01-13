import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "SkyPDV - Documentação BlueSpark MZ",
    description: "Saiba tudo sobre o SkyPDV, o ponto de venda da BlueSpark.",
};

export default function SkyPDVDocsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <Link href="/docs" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Voltar para Documentação</Link>
            <h1 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">SkyPDV</h1>
            <div className="prose dark:prose-invert max-w-none">
                <p className="mb-4">
                    O SkyPDV transforma o atendimento no seu balcão. Um sistema de Ponto de Venda rápido, seguro e integrado com o SkyVenda.
                </p>
                <h2 className="text-2xl font-semibold mt-6 mb-3">Ideal para</h2>
                <ul className="list-disc pl-6 mb-4">
                    <li>Supermercados</li>
                    <li>Farmácias</li>
                    <li>Lojas de varejo em geral</li>
                </ul>
            </div>
        </div>
    );
}
