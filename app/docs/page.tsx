import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Documentação BlueSpark MZ",
    description: "Informações detalhadas sobre a BlueSpark MZ e seus serviços.",
    openGraph: {
        title: "Documentação BlueSpark MZ",
        description: "Saiba mais sobre a BlueSpark MZ, SkyVenda, SkyPDV, e outros serviços.",
        type: "website",
    },
};

export default function DocsPage() {
    const sections = [
        {
            title: "Sobre a BlueSpark",
            description: "Conheça a história e missão da BlueSpark MZ.",
            href: "/docs/about",
        },
        {
            title: "SkyVenda",
            description: "Solução completa para gestão de vendas.",
            href: "/docs/skyvenda",
        },
        {
            title: "SkyPDV",
            description: "Ponto de Venda moderno e eficiente.",
            href: "/docs/skypdv",
        },
        {
            title: "SkyWallet",
            description: "Sua carteira digital inteligente.",
            href: "/docs/skywallet",
        },
        {
            title: "FastFood",
            description: "Soluções ágeis para o setor de alimentação.",
            href: "/docs/fastfood",
        },
        {
            title: "SmartMoz",
            description: "Inovação e tecnologia para Moçambique.",
            href: "/docs/smartmoz",
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">Documentação BlueSpark MZ</h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
                Bem-vindo à área de documentação. Aqui você encontra detalhes sobre nossos produtos e serviços.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sections.map((section) => (
                    <Link
                        key={section.href}
                        href={section.href}
                        className="block p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-slate-200 dark:border-slate-700"
                    >
                        <h2 className="text-2xl font-semibold mb-3 text-blue-600 dark:text-blue-400">{section.title}</h2>
                        <p className="text-slate-600 dark:text-slate-300">{section.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
