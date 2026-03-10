import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BlueSpark MZ - Official Documentation",
  description:
    "Official documentation and product overview for BlueSpark MZ.",
  openGraph: {
    title: "BlueSpark MZ - Wiki",
    description:
      "Overview of BlueSpark MZ, its products, services and company background.",
    type: "article",
  },
};

export default function DocsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-2 text-4xl font-display font-bold text-slate-900 dark:text-white">
        BlueSpark MZ
      </h1>
      <div className="mb-6 h-px w-full bg-slate-200 dark:bg-slate-700" />

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="prose max-w-none flex-1 dark:prose-invert">
          <p className="lead text-lg">
            <strong>BlueSpark MZ</strong> is a Mozambican technology startup founded
            in 2023, focused on software products, mobile apps and digital
            infrastructure for businesses and consumers.
          </p>

          <div className="not-prose my-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
            <h3 className="mb-2 font-semibold">Contents</h3>
            <ul className="space-y-1 pl-5 text-blue-600 dark:text-blue-400">
              <li>
                <a href="#history" className="hover:underline">
                  1. History
                </a>
              </li>
              <li>
                <a href="#mission" className="hover:underline">
                  2. Mission and values
                </a>
              </li>
              <li>
                <a href="#products" className="hover:underline">
                  3. Products
                </a>
              </li>
              <li>
                <a href="#services" className="hover:underline">
                  4. Services
                </a>
              </li>
            </ul>
          </div>

          <section id="history">
            <h2 className="mt-8 border-b border-slate-200 pb-2 text-2xl font-bold dark:border-slate-700">
              1. History
            </h2>
            <p>
              BlueSpark MZ was founded by <strong>Dique Joaquim</strong> and{" "}
              <strong>Jorge Sebastião Paulo</strong> with the goal of building
              scalable digital products and modern business systems for the
              Mozambican market.
            </p>
            <p>
              The company expanded from custom software work into a growing product
              ecosystem spanning commerce, payments, education, accounting and
              automation.
            </p>
            <div className="mt-4">
              <Link
                href="/docs/about"
                className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                Main article: About BlueSpark MZ &rarr;
              </Link>
            </div>
          </section>

          <section id="mission">
            <h2 className="mt-8 border-b border-slate-200 pb-2 text-2xl font-bold dark:border-slate-700">
              2. Mission and values
            </h2>
            <p>
              BlueSpark MZ builds software that reduces operational friction,
              improves visibility and supports digital transformation with practical
              tools that businesses can adopt quickly.
            </p>
          </section>

          <section id="products">
            <h2 className="mt-8 border-b border-slate-200 pb-2 text-2xl font-bold dark:border-slate-700">
              3. Products
            </h2>
            <p>
              BlueSpark MZ is building a connected product ecosystem with shared
              identity and specialized business systems.
            </p>

            <h3 className="mb-2 mt-4 text-xl font-semibold">SkyVenda MZ</h3>
            <p>Social commerce and online sales platform for stores and customers.</p>
            <Link
              href="/docs/skyvenda"
              className="mb-4 block text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              More about SkyVenda &rarr;
            </Link>

            <h3 className="mb-2 mt-4 text-xl font-semibold">SkyPDV</h3>
            <p>Point-of-sale and retail operations system for local business workflows.</p>
            <Link
              href="/docs/skypdv"
              className="mb-4 block text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              More about SkyPDV &rarr;
            </Link>

            <h3 className="mb-2 mt-4 text-xl font-semibold">SkyWallet</h3>
            <p>Digital wallet and payments layer for secure financial operations.</p>
            <Link
              href="/docs/skywallet"
              className="mb-4 block text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              More about SkyWallet &rarr;
            </Link>

            <h3 className="mb-2 mt-4 text-xl font-semibold">SmartMoz</h3>
            <p>Digital content and learning platform for courses and online products.</p>
            <Link
              href="/docs/smartmoz"
              className="mb-4 block text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              More about SmartMoz &rarr;
            </Link>

            <h3 className="mb-2 mt-4 text-xl font-semibold">FastFood</h3>
            <p>Restaurant and delivery operations platform for modern food businesses.</p>
            <Link
              href="/docs/fastfood"
              className="mb-4 block text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              More about FastFood &rarr;
            </Link>

            <h3 className="mb-2 mt-4 text-xl font-semibold">ContaBliza</h3>
            <p>
              Modern accounting system for companies and businesses with financial
              control, billing and reporting.
            </p>
            <Link
              href="/docs/contabliza"
              className="mb-4 block text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              More about ContaBliza &rarr;
            </Link>

            <h3 className="mb-2 mt-4 text-xl font-semibold">SparkFlow</h3>
            <p>
              WhatsApp and SMS messaging automation gateway for alerts, campaigns
              and operational communication.
            </p>
            <Link
              href="/docs/sparkflow"
              className="mb-4 block text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              More about SparkFlow &rarr;
            </Link>
          </section>

          <section id="services">
            <h2 className="mt-8 border-b border-slate-200 pb-2 text-2xl font-bold dark:border-slate-700">
              4. Services
            </h2>
            <ul className="list-disc pl-5">
              <li>Mobile app development</li>
              <li>Business software systems</li>
              <li>Responsive web platforms</li>
              <li>Technology consulting</li>
              <li>UI/UX design</li>
            </ul>
          </section>
        </div>

        <div className="shrink-0 lg:w-80">
          <div className="sticky top-24 rounded-lg border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <h3 className="mb-4 rounded bg-slate-200 p-2 text-center text-xl font-bold dark:bg-slate-800">
              BlueSpark MZ
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-slate-200 pb-2 dark:border-slate-800">
                <span className="font-semibold">Type</span>
                <span>Private company</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2 dark:border-slate-800">
                <span className="font-semibold">Founded</span>
                <span>2023</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2 dark:border-slate-800">
                <span className="font-semibold">Founders</span>
                <div className="text-right">
                  <div>Dique Joaquim</div>
                  <div>Jorge Sebastião Paulo</div>
                </div>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2 dark:border-slate-800">
                <span className="font-semibold">Headquarters</span>
                <span>Niassa, Mozambique</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2 dark:border-slate-800">
                <span className="font-semibold">Industry</span>
                <span>Technology, Software</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2 dark:border-slate-800">
                <span className="font-semibold">Products</span>
                <span className="text-right">
                  SkyVenda, SkyPDV, SkyWallet, SmartMoz, FastFood, ContaBliza,
                  SparkFlow
                </span>
              </div>
              <div className="pt-2 text-center">
                <a href="https://bluesparkmz.com" className="text-blue-600 hover:underline">
                  bluesparkmz.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
