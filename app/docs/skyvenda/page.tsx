import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "SkyVenda - Documentação BlueSpark MZ",
    description: "Detalhes sobre o SkyVenda, o sistema de gestão de vendas da BlueSpark.",
};

export default function SkyVendaDocsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <Link href="/docs" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Voltar para Documentação</Link>
            <h1 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">SkyVenda</h1>
            <div className="prose dark:prose-invert max-w-none">
                <p className="mb-4">
                    O SkyVenda é a solução definitiva para o controle das suas vendas. Com ele, você pode gerenciar estoques, realizar vendas rápidas e acompanhar relatórios em tempo real.
                </p>
                <h2 className="text-2xl font-semibold mt-6 mb-3">Funcionalidades Principais</h2>
                <ul className="list-disc pl-6 mb-4">
                    <li>Gestão de Estoque em tempo real</li>
                    <li>Relatórios detalhados de vendas e lucros</li>
                    <li>Interface intuitiva e fácil de usar</li>
                    <li>Suporte multi-usuário</li>
                </ul>
            </div>
        </div>
    );
}
