import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "BlueSpark MZ - Documentação Oficial",
    description: "Documentação completa e detalhes sobre a BlueSpark MZ, seus produtos e serviços.",
    openGraph: {
        title: "BlueSpark MZ - Wiki",
        description: "Tudo sobre a BlueSpark MZ: História, Produtos, Serviços e Missão.",
        type: "article",
    },
};

export default function DocsPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-4xl font-display font-bold mb-2 text-slate-900 dark:text-white">
                BlueSpark MZ
            </h1>
            <div className="h-px bg-slate-200 dark:bg-slate-700 w-full mb-6"></div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Content */}
                <div className="flex-1 prose dark:prose-invert max-w-none">
                    <p className="lead text-lg">
                        A <strong>BlueSpark MZ</strong> é uma startup de tecnologia moçambicana, fundada em 2023, dedicada ao desenvolvimento de software, aplicativos móveis e soluções digitais inovadoras. Sediada na província de Niassa, a empresa foca na transformação digital de negócios em Moçambique.
                    </p>

                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border border-slate-200 dark:border-slate-700 rounded-lg my-6 not-prose">
                        <h3 className="font-semibold mb-2">Conteúdo</h3>
                        <ul className="list-disc pl-5 space-y-1 text-blue-600 dark:text-blue-400">
                            <li><a href="#historia" className="hover:underline">1. História</a></li>
                            <li><a href="#missao" className="hover:underline">2. Missão e Valores</a></li>
                            <li><a href="#produtos" className="hover:underline">3. Produtos e Projetos</a></li>
                            <li><a href="#servicos" className="hover:underline">4. Serviços</a></li>
                        </ul>
                    </div>

                    <section id="historia">
                        <h2 className="text-2xl font-bold mt-8 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">1. História</h2>
                        <p>
                            A BlueSpark MZ foi fundada em 2023 por <strong>Dique Joaquim</strong> e <strong>Jorge Sebastião Paulo</strong> com o objetivo de revolucionar o mercado tecnológico em Moçambique. A empresa começou como uma pequena equipa de desenvolvimento e rapidamente expandiu seu portfólio.
                        </p>
                        <p>
                            Em 2024, iniciou-se o desenvolvimento do seu principal produto, o <strong>SkyVenda MZ</strong>, uma plataforma inovadora que combina rede social e e-commerce. O lançamento oficial ao público está previsto para Janeiro de 2026.
                        </p>
                        <div className="mt-4">
                            <Link href="/docs/about" className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium">
                                Ver artigo principal: Sobre a BlueSpark &rarr;
                            </Link>
                        </div>
                    </section>

                    <section id="missao">
                        <h2 className="text-2xl font-bold mt-8 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">2. Missão e Valores</h2>
                        <p>
                            A missão da BlueSpark é simplificar processos complexos através de software intuitivo. A empresa valoriza a inovação, a qualidade técnica e o compromisso com o crescimento tecnológico de Moçambique.
                        </p>
                    </section>

                    <section id="produtos">
                        <h2 className="text-2xl font-bold mt-8 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">3. Produtos e Projetos</h2>
                        <p>A BlueSpark MZ possui diversos produtos em seu ecossistema:</p>

                        <h3 className="text-xl font-semibold mt-4 mb-2">SkyVenda MZ</h3>
                        <p>
                            A primeira rede social moçambicana focada em vendas. Permite interação em tempo real entre lojas e clientes.
                        </p>
                        <Link href="/docs/skyvenda" className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium block mb-4">
                            Mais detalhes sobre SkyVenda &rarr;
                        </Link>

                        <h3 className="text-xl font-semibold mt-4 mb-2">SkyPDV</h3>
                        <p>Sistema de Ponto de Venda integrado para restaurantes e supermercados.</p>
                        <Link href="/docs/skypdv" className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium block mb-4">
                            Mais detalhes sobre SkyPDV &rarr;
                        </Link>

                        <h3 className="text-xl font-semibold mt-4 mb-2">SkyWallet</h3>
                        <p>Carteira digital para pagamentos seguros dentro do ecossistema Sky.</p>
                        <Link href="/docs/skywallet" className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium block mb-4">
                            Mais detalhes sobre SkyWallet &rarr;
                        </Link>

                        <h3 className="text-xl font-semibold mt-4 mb-2">SmartMoz e FastFood</h3>
                        <p>Soluções para educação/produtos digitais e gestão de delivery, respectivamente.</p>
                        <div className="flex gap-4">
                            <Link href="/docs/smartmoz" className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium">
                                SmartMoz &rarr;
                            </Link>
                            <Link href="/docs/fastfood" className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium">
                                FastFood &rarr;
                            </Link>
                        </div>
                    </section>

                    <section id="servicos">
                        <h2 className="text-2xl font-bold mt-8 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">4. Serviços</h2>
                        <ul className="list-disc pl-5">
                            <li>Desenvolvimento de Aplicativos Móveis (iOS e Android)</li>
                            <li>Sistemas Desktop Corporativos</li>
                            <li>Criação de Websites Responsivos</li>
                            <li>Consultoria Tecnológica</li>
                            <li>Design UI/UX</li>
                        </ul>
                    </section>
                </div>

                {/* Sidebar / Info Box */}
                <div className="lg:w-80 shrink-0">
                    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow-sm sticky top-24">
                        <h3 className="text-center font-bold text-xl mb-4 bg-slate-200 dark:bg-slate-800 p-2 rounded">BlueSpark MZ</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                                <span className="font-semibold">Tipo</span>
                                <span>Empresa Privada (Startup)</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                                <span className="font-semibold">Fundação</span>
                                <span>2023</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                                <span className="font-semibold">Fundadores</span>
                                <div className="text-right">
                                    <div>Dique Joaquim</div>
                                    <div>Jorge Sebastião Paulo</div>
                                </div>
                            </div>
                            <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                                <span className="font-semibold">Sede</span>
                                <span>Niassa, Moçambique</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                                <span className="font-semibold">Indústria</span>
                                <span>Tecnologia, Software</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                                <span className="font-semibold">Produtos</span>
                                <span className="text-right">SkyVenda, SkyPDV, SmartMoz</span>
                            </div>
                            <div className="pt-2 text-center">
                                <a href="https://bluesparkmz.com" className="text-blue-600 hover:underline">bluesparkmz.com</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
