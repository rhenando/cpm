import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { clsx } from "clsx";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "gold" | "navy" | "ghost";
  className?: string;
};

export function ButtonLink({ href, children, variant = "gold", className }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={clsx(
        "inline-flex min-h-11 w-full max-w-full items-center justify-center gap-2 rounded-md px-5 py-3 text-center text-sm font-extrabold uppercase tracking-wide transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bd8f13] sm:w-auto",
        variant === "gold" && "bg-[#bd8f13] text-white shadow-sm hover:bg-[#ca8a04]",
        variant === "navy" && "bg-[#191c33] text-white hover:bg-[#242424]",
        variant === "ghost" &&
          "border border-[#bd8f13] bg-transparent text-[#191c33] hover:bg-[#bd8f13] hover:text-white",
        className
      )}
    >
      {children}
      <ArrowRight aria-hidden size={16} strokeWidth={2.5} />
    </Link>
  );
}
