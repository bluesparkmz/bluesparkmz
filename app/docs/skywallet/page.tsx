import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "SkyWallet - Documentação BlueSpark MZ",
    description: "Gerencie suas finanças com o SkyWallet da BlueSpark.",
};

export default function SkyWalletDocsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <Link href="/docs" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Voltar para Documentação</Link>
            <h1 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">SkyWallet</h1>
            <div className="prose dark:prose-invert max-w-none">
                <p className="mb-4">
                    O SkyWallet é sua carteira digital inteligente. Facilite pagamentos, transferências e a gestão do seu dinheiro de forma segura.
                </p>
                <h2 className="text-2xl font-semibold mt-6 mb-3">Recursos</h2>
                <ul className="list-disc pl-6 mb-4">
                    <li>Pagamentos QR Code</li>
                    <li>Histórico de transações detalhado</li>
                    <li>Alta segurança e criptografia</li>
                </ul>
            </div>
        </div>
    );
}
