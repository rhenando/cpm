"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Mail, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { navItems } from "@/data/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#d5d2db] bg-white/95 backdrop-blur">
      <div className="bg-[#191c33] text-white">
        <div className="container flex items-center justify-between gap-3 py-2 text-[0.68rem] font-semibold sm:text-xs">
          <span className="hidden leading-5 sm:block">The One Tower, Sheikh Zayed Rd, Barsha Heights, Dubai</span>
          <div className="flex min-w-0 flex-1 flex-wrap items-center justify-between gap-x-3 gap-y-1 sm:flex-none sm:justify-end sm:gap-4">
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
      <div className="container flex h-16 items-center justify-between gap-4 sm:h-20 sm:gap-6">
        <Link href="/" className="flex items-center gap-3" aria-label="Cordova Property home">
          <Image
            src="/images/brand/CPM-primary-logo-header.png"
            alt="Cordova Property Management"
            width={220}
            height={75}
            priority
            className="h-auto w-36 object-contain sm:w-44"
          />
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.href} className="group relative">
                <button
                  type="button"
                  className="inline-flex cursor-pointer appearance-none items-center gap-1.5 border-0 bg-transparent px-0 py-7 text-xs font-medium uppercase tracking-[0.1em] text-[#191c33] transition hover:text-[#555069]"
                  aria-haspopup="true"
                >
                  {item.label}
                  <ChevronDown size={14} strokeWidth={2.5} className="transition group-hover:rotate-180 group-focus-within:rotate-180" aria-hidden />
                </button>
                <div className="invisible absolute left-1/2 top-full w-64 -translate-x-1/2 translate-y-2 border-t-2 border-[#191c33] bg-white p-2 opacity-0 shadow-[0_18px_45px_rgba(25,28,51,0.18)] transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block border-b border-[#f1f0f3] px-4 py-3.5 text-xs font-medium uppercase tracking-wide text-[#191c33] transition last:border-0 hover:bg-[#f7f8f9] hover:pl-5 hover:text-[#bd8f13]"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center py-7 text-xs font-medium uppercase tracking-[0.1em] text-[#191c33] transition hover:text-[#555069]"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[#d3d3d3] text-[#191c33] lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      {open ? (
        <nav className="max-h-[calc(100svh-7rem)] overflow-y-auto overscroll-contain border-t border-[#d3d3d3] bg-white lg:hidden">
          <div className="container grid gap-1 py-4">
            {navItems.map((item) => (
              <div key={item.href}>
                {item.children ? (
                  <div className="flex items-center justify-between rounded-md px-3 py-3 text-sm font-medium uppercase tracking-wide text-[#191c33]">
                    {item.label}
                    <ChevronDown size={16} className="text-[#bd8f13]" aria-hidden />
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center justify-between rounded-md px-3 py-3 text-sm font-medium uppercase tracking-wide text-[#191c33] hover:bg-[#f1f0f3]"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
                {item.children ? (
                  <div className="ml-3 border-l border-[#bd8f13]/50 pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-md px-3 py-2.5 text-xs font-normal uppercase tracking-wide text-[#242424] hover:bg-[#f1f0f3] hover:text-[#bd8f13]"
                        onClick={() => setOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
