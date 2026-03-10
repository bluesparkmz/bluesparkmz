import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SparkFlow - BlueSpark MZ Docs",
  description:
    "SparkFlow is a WhatsApp and SMS automation gateway for business communication.",
};

export default function SparkFlowDocsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Link href="/docs" className="mb-4 inline-block text-blue-600 hover:underline">
        &larr; Back to documentation
      </Link>
      <h1 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">
        SparkFlow
      </h1>
      <div className="space-y-4 text-slate-700 dark:text-slate-300">
        <p>
          SparkFlow is a messaging automation gateway built for WhatsApp and SMS
          communication across campaigns, alerts and transactional flows.
        </p>
        <p>
          It is designed to integrate with BlueSpark products and third-party
          systems that need programmable, trackable and scalable messaging.
        </p>
        <p>
          Typical use cases include reminders, confirmations, payment alerts,
          operational notifications and customer engagement flows.
        </p>
      </div>
    </div>
  );
}
