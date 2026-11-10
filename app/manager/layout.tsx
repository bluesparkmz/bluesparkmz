import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Manager | BlueSpark MZ",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ManagerLayout({ children }: { children: ReactNode }) {
  return children;
}
