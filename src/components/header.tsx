"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { navItems } from "@/data/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#ece6d8] bg-white/95 backdrop-blur">
      <div className="bg-[#191c33] text-white">
        <div className="container flex flex-wrap items-center justify-between gap-3 py-2 text-xs font-semibold">
          <span>The One Tower, Sheikh Zayed Rd, Barsha Heights, Dubai</span>
          <div className="flex flex-wrap items-center gap-4">
            <a className="inline-flex items-center gap-2" href="tel:+971586287157">
              <Phone size={14} aria-hidden />
              +971 58 628 7157
            </a>
            <a className="inline-flex items-center gap-2" href="mailto:customer@cordovaproperty.com">
              <Mail size={14} aria-hidden />
              customer@cordovaproperty.com
            </a>
          </div>
        </div>
      </div>
      <div className="container flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3" aria-label="Cordova Property home">
          <Image
            src="/brand/cordova-logo.jpg"
            alt="Cordova Property Management"
            width={220}
            height={75}
            priority
            className="h-auto w-44 rounded-sm object-contain"
          />
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-extrabold uppercase tracking-wide text-[#191c33] transition hover:text-[#bd8f13]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[#e6e0d2] text-[#191c33] lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      {open ? (
        <nav className="border-t border-[#ece6d8] bg-white lg:hidden">
          <div className="container grid gap-1 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-3 text-sm font-extrabold uppercase tracking-wide text-[#191c33] hover:bg-[#f6f5f1]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
