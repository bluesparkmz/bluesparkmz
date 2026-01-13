"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<LinkProps, "className" | "href"> {
  to: string;
  className?: string | ((props: { isActive: boolean }) => string);
  activeClassName?: string;
  children: React.ReactNode;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, to, children, ...props }, ref) => {
    const pathname = usePathname();
    // Simple exact match for active state. 
    // You might want 'startsWith' depending on requirement, but exact is safer for now.
    const isActive = pathname === to;

    const computedClassName = typeof className === "function"
      ? className({ isActive })
      : cn(className as string, isActive && activeClassName);

    return (
      <Link
        ref={ref}
        href={to}
        className={computedClassName}
        {...props}
      >
        {children}
      </Link>
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
