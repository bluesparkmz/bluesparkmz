import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ContaBliza - BlueSpark MZ Docs",
  description:
    "ContaBliza is a modern accounting system for companies and businesses.",
};

export default function ContaBlizaDocsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Link href="/docs" className="mb-4 inline-block text-blue-600 hover:underline">
        &larr; Back to documentation
      </Link>
      <h1 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">
        ContaBliza
      </h1>
      <div className="space-y-4 text-slate-700 dark:text-slate-300">
        <p>
          ContaBliza is a modern accounting platform for companies and businesses
          that need structured financial control and reliable reporting.
        </p>
        <p>
          It is designed to support bookkeeping workflows, billing, expense
          management, cash flow visibility and operational reporting in a single
          system.
        </p>
        <p>
          The product targets organizations that want to reduce manual work and
          improve financial accuracy with a practical and scalable toolset.
        </p>
      </div>
    </div>
  );
}
