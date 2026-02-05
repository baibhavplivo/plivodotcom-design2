import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  PhoneCall,
  MessageSquare,
  MessagesSquare,
  Slack,
  Sparkles,
  Wand2,
  Link,
  ShieldCheck,
  Smartphone,
  EyeOff,
  Target,
  Headphones,
  Calendar,
  TrendingUp,
  Bell,
  Truck,
  HeartPulse,
  Landmark,
  ShoppingCart,
  Plane,
  GraduationCap,
  Building,
  BookOpen,
  Code,
  Package,
  Activity,
  HelpCircle,
  Users,
  PenLine,
  Folder,
  Star,
  Briefcase,
} from "lucide-react";

import { cn } from "@/lib/utils";

import {
  mainNavigation,
  secondaryNavigation,
  ctaNavigation,
} from "@/data/navigation";

// Custom WhatsApp icon
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// Custom SIP icon
const SipIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <rect
      x="2"
      y="4"
      width="20"
      height="16"
      rx="2"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <text
      x="12"
      y="15"
      textAnchor="middle"
      fontSize="8"
      fontWeight="bold"
      fill="currentColor"
    >
      SIP
    </text>
  </svg>
);

const iconMap: Record<string, React.ReactNode> = {
  sparkles: <Sparkles className="h-5 w-5" />,
  wand: <Wand2 className="h-5 w-5" />,
  link: <Link className="h-5 w-5" />,
  "phone-call": <PhoneCall className="h-5 w-5" />,
  whatsapp: <WhatsAppIcon className="h-5 w-5" />,
  "whatsapp-call": <WhatsAppIcon className="h-5 w-5" />,
  "message-square": <MessageSquare className="h-5 w-5" />,
  "messages-square": <MessagesSquare className="h-5 w-5" />,
  slack: <Slack className="h-5 w-5" />,
  "shield-check": <ShieldCheck className="h-5 w-5" />,
  "eye-off": <EyeOff className="h-5 w-5" />,
  smartphone: <Smartphone className="h-5 w-5" />,
  sip: <SipIcon className="h-5 w-5" />,
  target: <Target className="h-5 w-5" />,
  headphones: <Headphones className="h-5 w-5" />,
  calendar: <Calendar className="h-5 w-5" />,
  "trending-up": <TrendingUp className="h-5 w-5" />,
  bell: <Bell className="h-5 w-5" />,
  truck: <Truck className="h-5 w-5" />,
  "heart-pulse": <HeartPulse className="h-5 w-5" />,
  landmark: <Landmark className="h-5 w-5" />,
  "shopping-cart": <ShoppingCart className="h-5 w-5" />,
  plane: <Plane className="h-5 w-5" />,
  "graduation-cap": <GraduationCap className="h-5 w-5" />,
  building: <Building className="h-5 w-5" />,
  "book-open": <BookOpen className="h-5 w-5" />,
  code: <Code className="h-5 w-5" />,
  package: <Package className="h-5 w-5" />,
  activity: <Activity className="h-5 w-5" />,
  "help-circle": <HelpCircle className="h-5 w-5" />,
  users: <Users className="h-5 w-5" />,
  "pen-line": <PenLine className="h-5 w-5" />,
  folder: <Folder className="h-5 w-5" />,
  star: <Star className="h-5 w-5" />,
  briefcase: <Briefcase className="h-5 w-5" />,
};

export const PlivoNavbar = ({ currentPage }: { currentPage: string }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 5);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const hasDropdown = (item: (typeof mainNavigation)[0]) => {
    return item.items || item.sections;
  };

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 border-b border-gray-100 transition-all duration-200",
        isScrolled ? "bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)]" : "bg-white",
      )}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-[72px] items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex shrink-0 items-center">
            <img
              src="/images/plivo-logo.svg"
              alt="Plivo"
              className="h-6 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <nav ref={navRef} className="hidden items-center lg:flex">
            <ul className="flex items-center">
              {mainNavigation.map((item) =>
                hasDropdown(item) ? (
                  <li key={item.title} className="relative">
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === item.title ? null : item.title,
                        )
                      }
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-6 text-[15px] font-normal transition-colors hover:text-gray-600",
                        openDropdown === item.title
                          ? "-mb-[2px] border-b-2 border-black text-black"
                          : "text-black",
                      )}
                    >
                      {item.title}
                      <svg
                        className="h-2 w-2"
                        viewBox="0 0 8 8"
                        fill="currentColor"
                      >
                        <circle cx="2" cy="2" r="1" />
                        <circle cx="6" cy="2" r="1" />
                        <circle cx="2" cy="6" r="1" />
                        <circle cx="6" cy="6" r="1" />
                      </svg>
                    </button>

                    {/* Mega Menu - Full Width */}
                    {item.sections && (
                      <div
                        className={cn(
                          "fixed left-0 right-0 top-[72px] origin-top border-t border-gray-100 bg-white shadow-lg transition-all duration-300 ease-out",
                          openDropdown === item.title
                            ? "visible translate-y-0 scale-y-100 opacity-100"
                            : "invisible -translate-y-2 scale-y-[0.98] opacity-0",
                        )}
                      >
                        {/* Main content */}
                        <div className="mx-auto max-w-7xl px-4 py-8">
                          <div className="grid grid-cols-2 gap-20">
                            {item.sections.map((section) => (
                              <div key={section.title}>
                                <h3 className="mb-6 text-[13px] font-semibold uppercase tracking-wider text-[#323dfe]">
                                  {section.title}
                                </h3>
                                <div className="space-y-1">
                                  {section.items.map((subItem) =>
                                    subItem.subLinks &&
                                    subItem.subLinks.length > 0 ? (
                                      // Items with subLinks - no hover bg on container
                                      <div
                                        key={subItem.title}
                                        className="flex items-start gap-4 p-3"
                                      >
                                        {subItem.icon &&
                                          iconMap[subItem.icon] && (
                                            <span className="mt-0.5 text-[#323dfe]">
                                              {iconMap[subItem.icon]}
                                            </span>
                                          )}
                                        <div>
                                          <a
                                            href={subItem.href}
                                            className="block text-[14px] font-semibold text-gray-900 transition-colors hover:text-[#323dfe]"
                                            onClick={() =>
                                              setOpenDropdown(null)
                                            }
                                          >
                                            {subItem.title}
                                          </a>
                                          {subItem.description && (
                                            <span className="mt-1 block text-[13px] leading-relaxed text-gray-500">
                                              {subItem.description}
                                            </span>
                                          )}
                                          <div className="mt-2 flex items-center gap-4">
                                            {subItem.subLinks.map((link) => (
                                              <a
                                                key={link.title}
                                                href={link.href}
                                                className="text-[13px] text-[#323dfe] hover:underline"
                                                onClick={() =>
                                                  setOpenDropdown(null)
                                                }
                                              >
                                                {link.title}
                                              </a>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    ) : (
                                      // Items without subLinks - full hover bg
                                      <a
                                        key={subItem.title}
                                        href={subItem.href}
                                        className="group flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-gray-50"
                                        onClick={() => setOpenDropdown(null)}
                                      >
                                        {subItem.icon &&
                                          iconMap[subItem.icon] && (
                                            <span className="mt-0.5 text-[#323dfe]">
                                              {iconMap[subItem.icon]}
                                            </span>
                                          )}
                                        <div>
                                          <span className="block text-[14px] font-semibold text-gray-900 transition-colors group-hover:text-[#323dfe]">
                                            {subItem.title}
                                          </span>
                                          {subItem.description && (
                                            <span className="mt-1 block text-[13px] leading-relaxed text-gray-500">
                                              {subItem.description}
                                            </span>
                                          )}
                                        </div>
                                      </a>
                                    ),
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Bottom section - Other Products */}
                        {item.bottomItems && (
                          <div className="border-t border-gray-100 bg-gray-50">
                            <div className="mx-auto max-w-7xl px-4 py-5">
                              <div className="flex items-center gap-10">
                                <span className="text-[13px] font-medium text-gray-500">
                                  More
                                </span>
                                {item.bottomItems.map((bottomItem) => (
                                  <a
                                    key={bottomItem.title}
                                    href={bottomItem.href}
                                    className="flex items-center gap-2 text-[14px] font-medium text-gray-900 hover:text-[#323dfe]"
                                    onClick={() => setOpenDropdown(null)}
                                  >
                                    {bottomItem.icon &&
                                      iconMap[bottomItem.icon] && (
                                        <span className="text-[#323dfe]">
                                          {iconMap[bottomItem.icon]}
                                        </span>
                                      )}
                                    {bottomItem.title}
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </li>
                ) : (
                  <li key={item.title}>
                    <a
                      href={item.href}
                      className="px-3 py-6 text-[15px] font-normal text-black transition-colors hover:text-gray-600"
                      {...(item.href?.startsWith("http") && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                    >
                      {item.title}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Secondary Navigation - Contact Sales */}
            <div className="hidden items-center lg:flex">
              {secondaryNavigation.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-5 py-2.5 text-[14px] font-medium text-black transition-all hover:bg-gray-50"
                >
                  {item.title}
                </a>
              ))}
            </div>

            {/* CTA Button - Get started now */}
            <a
              href={ctaNavigation.href}
              className={cn(
                "hidden items-center gap-2 rounded-md bg-black px-5 py-2.5 text-[14px] font-medium text-white transition-all hover:bg-gray-800 sm:inline-flex",
                isMenuOpen && "max-lg:hidden",
              )}
              {...(ctaNavigation.external && {
                target: "_blank",
                rel: "noopener noreferrer",
              })}
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
              {ctaNavigation.title}
            </a>

            {/* Mobile Menu Button */}
            <button
              className="flex h-10 w-10 items-center justify-center lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-900" />
              ) : (
                <Menu className="h-6 w-6 text-gray-900" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 top-[72px] z-50 bg-white transition-all duration-300 ease-in-out lg:hidden",
          isMenuOpen
            ? "visible translate-x-0 opacity-100"
            : "invisible translate-x-full opacity-0",
        )}
      >
        <div className="h-full overflow-y-auto px-6 py-6">
          {/* Mobile CTA */}
          <div className="mb-6">
            <a
              href={ctaNavigation.href}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-black py-3 text-[14px] font-medium text-white"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
              {ctaNavigation.title}
            </a>
          </div>

          {/* Mobile Navigation */}
          <nav>
            {mainNavigation.map((item) =>
              hasDropdown(item) ? (
                <div key={item.title} className="border-b border-gray-100">
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === item.title ? null : item.title,
                      )
                    }
                    className="flex w-full items-center justify-between py-4 text-[16px] font-medium text-gray-900"
                  >
                    {item.title}
                    <svg
                      className="h-2 w-2 text-gray-400"
                      viewBox="0 0 8 8"
                      fill="currentColor"
                    >
                      <circle cx="2" cy="2" r="1" />
                      <circle cx="6" cy="2" r="1" />
                      <circle cx="2" cy="6" r="1" />
                      <circle cx="6" cy="6" r="1" />
                    </svg>
                  </button>
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300",
                      openDropdown === item.title
                        ? "max-h-[1200px] pb-4"
                        : "max-h-0",
                    )}
                  >
                    {item.sections?.map((section) => (
                      <div key={section.title} className="mb-4">
                        <h3 className="mb-2 pl-4 text-[12px] font-semibold text-[#323dfe]">
                          {section.title}
                        </h3>
                        {section.items.map((subItem) => (
                          <a
                            key={subItem.title}
                            href={subItem.href}
                            className="flex items-start gap-3 py-2 pl-4"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.icon && iconMap[subItem.icon] && (
                              <span className="mt-0.5 text-[#323dfe]">
                                {iconMap[subItem.icon]}
                              </span>
                            )}
                            <div>
                              <span className="block text-[14px] font-medium text-gray-900">
                                {subItem.title}
                              </span>
                              {subItem.description && (
                                <span className="block text-[12px] text-gray-500">
                                  {subItem.description}
                                </span>
                              )}
                            </div>
                          </a>
                        ))}
                      </div>
                    ))}
                    {item.bottomItems && (
                      <div className="mt-2 border-t border-gray-100 pt-4">
                        <h3 className="mb-2 pl-4 text-[12px] font-medium text-gray-500">
                          Other Products
                        </h3>
                        <div className="flex flex-wrap gap-4 pl-4">
                          {item.bottomItems.map((bottomItem) => (
                            <a
                              key={bottomItem.title}
                              href={bottomItem.href}
                              className="flex items-center gap-2 text-[14px] font-medium text-gray-900"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {bottomItem.icon && iconMap[bottomItem.icon] && (
                                <span className="text-[#323dfe]">
                                  {iconMap[bottomItem.icon]}
                                </span>
                              )}
                              {bottomItem.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <a
                  key={item.title}
                  href={item.href}
                  className="block border-b border-gray-100 py-4 text-[16px] font-medium text-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </a>
              ),
            )}
          </nav>

          {/* Secondary links */}
          <div className="mt-6 space-y-3">
            {secondaryNavigation.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="block text-center text-[14px] text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default PlivoNavbar;
