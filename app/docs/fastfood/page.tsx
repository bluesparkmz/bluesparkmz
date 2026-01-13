import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "FastFood - Documentação BlueSpark MZ",
    description: "Soluções ágeis para restaurantes e fast-food da BlueSpark.",
};

export default function FastFoodDocsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <Link href="/docs" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Voltar para Documentação</Link>
            <h1 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">FastFood</h1>
            <div className="prose dark:prose-invert max-w-none">
                <p className="mb-4">
                    O sistema FastFood da BlueSpark foi desenhado para a velocidade que o seu restaurante precisa. Gestão de pedidos, cozinha e entrega em um só lugar.
                </p>
                <h2 className="text-2xl font-semibold mt-6 mb-3">Benefícios</h2>
                <ul className="list-disc pl-6 mb-4">
                    <li>Agilidade no atendimento</li>
                    <li>Integração com impressoras de cozinha</li>
                    <li>Controle de mesas e comandas</li>
                </ul>
            </div>
        </div>
    );
}
