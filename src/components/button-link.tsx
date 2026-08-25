import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { clsx } from "clsx";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "gold" | "navy" | "ghost" | "light" | "lightOutline";
  className?: string;
};

export function ButtonLink({ href, children, variant = "gold", className }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={clsx(
        "inline-flex min-h-12 w-full max-w-full items-center justify-center gap-2 rounded-[10px] border-2 px-6 py-3 text-center text-sm font-black uppercase tracking-[0.1em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e1ab39] sm:w-auto",
        (variant === "gold" || variant === "navy") && "brand-button-primary",
        variant === "ghost" && "brand-button-outline",
        variant === "light" && "brand-button-on-dark",
        variant === "lightOutline" && "brand-button-outline-on-dark",
        className
      )}
    >
      {children}
      <ArrowRight aria-hidden size={16} strokeWidth={2.5} />
    </Link>
  );
}
