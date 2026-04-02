"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const sidebarLinks = [
  { title: "Terms", href: "/legal/tos/" },
  { title: "Privacy", href: "/legal/privacy/" },
  { title: "Cookie policy", href: "/cookie-policy/" },
  { title: "Acceptable use policy", href: "/legal/aup/" },
  { title: "Supplemental terms", href: "/legal/supplemental/" },
  { title: "Subprocessors", href: "/legal/subprocessors/" },
  { title: "Service level & support", href: "/legal/sla/" },
  { title: "Services schedule", href: "/legal/services-schedule/" },
  { title: "Additional service terms", href: "/legal/additional-terms/" },
  { title: "AI services addendum", href: "/legal/ai-addendum/" },
  { title: "Responsible disclosure", href: "/legal/responsible-disclosure/" },
  { title: "Law enforcement guidelines", href: "/legal/law-enforcement/" },
  { title: "Security overview", href: "/security/" },
  { title: "Copyright notification", href: "/legal/copyright/" },
];

interface LegalLayoutProps {
  activePage: string;
  children: ReactNode;
}

export default function LegalLayout({
  activePage,
  children,
}: LegalLayoutProps) {
  return (
    <>
      {/* Hero */}
      <section className="bg-white pb-10 pt-16 sm:pt-20 md:pt-24">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h1 className="font-sora mb-4 text-[2rem] font-normal leading-[1.1] tracking-[-0.02em] text-black sm:text-[2.5rem] md:text-[3rem]">
            Legal
          </h1>
          <p className="mx-auto max-w-2xl text-base text-gray-600 sm:text-lg">
            Terms, policies, and legal information for Plivo services.
          </p>
        </div>
      </section>

      {/* Two-Column Layout */}
      <section className="bg-white pb-16 lg:pb-24">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="lg:grid lg:grid-cols-[240px_1fr] lg:items-start lg:gap-10">
            {/* Sidebar */}
            <nav className="mb-8 lg:sticky lg:top-28 lg:mb-0">
              <ul className="space-y-0.5">
                {sidebarLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={cn(
                        "block rounded-md px-3 py-2 text-sm transition-colors",
                        activePage === link.href
                          ? "bg-gray-100 font-medium text-black"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                      )}
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Content */}
            <div className="min-w-0">
              <div className="rounded-xl border border-gray-200 p-6 sm:p-8">
                {children}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
