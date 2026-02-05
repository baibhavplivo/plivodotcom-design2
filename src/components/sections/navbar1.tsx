import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import {
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

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { cn } from "@/lib/utils";

import {
  mainNavigation,
  secondaryNavigation,
  ctaNavigation,
  type NavDropdown,
  type NavItem,
  type NavSection,
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

interface Navbar1Props {
  currentPage?: string;
}

const Navbar1 = ({ currentPage = "/" }: Navbar1Props) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 5);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hasDropdown = (item: NavDropdown) => {
    return item.items || item.sections;
  };

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 border-b border-gray-100 transition-all duration-200",
        isScrolled ? "bg-white/95 shadow-sm backdrop-blur-sm" : "bg-white",
      )}
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <nav className="flex h-[72px] items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex shrink-0 items-center">
            <img
              src="/images/plivo-logo.svg"
              alt="Plivo"
              className="h-6 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-1">
              {mainNavigation.map((navItem) =>
                hasDropdown(navItem) ? (
                  <NavigationMenuItem key={navItem.title}>
                    <NavigationMenuTrigger className="bg-transparent text-[15px] font-normal text-black hover:bg-gray-50 hover:text-black data-[state=open]:bg-gray-50">
                      {navItem.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[700px] p-6">
                        {navItem.sections && (
                          <div className="grid grid-cols-2 gap-8">
                            {navItem.sections.map((section) => (
                              <div key={section.title}>
                                <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-wider text-[#323DFE]">
                                  {section.title}
                                </h3>
                                <div
                                  className={
                                    navItem.title === "Solutions"
                                      ? "space-y-0"
                                      : "space-y-1"
                                  }
                                >
                                  {section.items.map((item) => (
                                    <NavigationMenuLink
                                      key={item.title}
                                      asChild
                                    >
                                      <a
                                        href={item.href}
                                        className={cn(
                                          "group flex gap-3 rounded-lg transition-colors hover:bg-gray-50",
                                          navItem.title === "Solutions"
                                            ? "items-center p-2"
                                            : "items-start p-3",
                                        )}
                                      >
                                        {item.icon && iconMap[item.icon] && (
                                          <span
                                            className={
                                              navItem.title === "Solutions"
                                                ? "text-[#323DFE]"
                                                : "mt-0.5 text-[#323DFE]"
                                            }
                                          >
                                            {iconMap[item.icon]}
                                          </span>
                                        )}
                                        <div className="flex-1">
                                          <div className="text-[14px] font-semibold text-gray-900 group-hover:text-[#323DFE]">
                                            {item.title}
                                          </div>
                                          {item.description &&
                                            navItem.title !== "Solutions" && (
                                              <p className="mt-1 text-[13px] leading-relaxed text-gray-500">
                                                {item.description}
                                              </p>
                                            )}
                                          {item.subLinks &&
                                            item.subLinks.length > 0 && (
                                              <div className="mt-2 flex flex-wrap gap-3">
                                                {item.subLinks.map((link) => (
                                                  <a
                                                    key={link.title}
                                                    href={link.href}
                                                    className="text-[13px] text-[#323DFE] hover:underline"
                                                    onClick={(e) =>
                                                      e.stopPropagation()
                                                    }
                                                  >
                                                    {link.title}
                                                  </a>
                                                ))}
                                              </div>
                                            )}
                                        </div>
                                      </a>
                                    </NavigationMenuLink>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        {navItem.bottomItems &&
                          navItem.bottomItems.length > 0 && (
                            <div className="mt-6 border-t border-gray-100 pt-4">
                              <div className="flex items-center gap-6">
                                <span className="text-[13px] font-medium text-gray-500">
                                  More
                                </span>
                                {navItem.bottomItems.map((item) => (
                                  <a
                                    key={item.title}
                                    href={item.href}
                                    className="flex items-center gap-2 text-[14px] font-medium text-gray-900 hover:text-[#323DFE]"
                                  >
                                    {item.icon && iconMap[item.icon] && (
                                      <span className="text-[#323DFE]">
                                        {iconMap[item.icon]}
                                      </span>
                                    )}
                                    {item.title}
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={navItem.title}>
                    <NavigationMenuLink asChild>
                      <a
                        href={navItem.href}
                        className="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-[15px] font-normal text-black transition-colors hover:bg-gray-50 hover:text-black focus:bg-gray-50 focus:text-black focus:outline-none"
                      >
                        {navItem.title}
                      </a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ),
              )}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right Side - CTAs */}
          <div className="flex items-center gap-2">
            {/* Contact Sales - Desktop */}
            {secondaryNavigation.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="hidden items-center justify-center rounded-md border border-gray-300 bg-white px-3.5 py-1.5 text-[13px] font-normal text-gray-700 transition-all hover:border-gray-400 hover:text-black lg:inline-flex"
              >
                {item.title}
              </a>
            ))}

            {/* Primary CTA */}
            <a
              href={ctaNavigation.href}
              className="hidden items-center rounded-md bg-black px-3.5 py-1.5 text-[13px] font-normal text-white transition-all hover:bg-gray-800 sm:inline-flex"
              {...(ctaNavigation.external && {
                target: "_blank",
                rel: "noopener noreferrer",
              })}
            >
              {ctaNavigation.title}
            </a>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-full max-w-xs overflow-y-auto bg-white"
              >
                <SheetHeader>
                  <SheetTitle>
                    <a href="/" className="flex items-center">
                      <img
                        src="/images/plivo-logo.svg"
                        alt="Plivo"
                        className="h-6 w-auto"
                      />
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col py-6">
                  {/* Mobile CTA */}
                  <a
                    href={ctaNavigation.href}
                    className="mb-6 flex w-full items-center justify-center gap-2 rounded-md bg-black py-3 text-[14px] font-medium text-white"
                    onClick={() => setIsOpen(false)}
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

                  <Accordion type="single" collapsible className="w-full">
                    {mainNavigation.map((navItem, idx) =>
                      hasDropdown(navItem) ? (
                        <AccordionItem
                          key={navItem.title}
                          value={`item-${idx}`}
                          className="border-b border-gray-100"
                        >
                          <AccordionTrigger className="py-4 text-[16px] font-medium text-gray-900 hover:no-underline">
                            {navItem.title}
                          </AccordionTrigger>
                          <AccordionContent className="pb-4">
                            {navItem.sections?.map((section) => (
                              <div key={section.title} className="mb-4">
                                <h4 className="mb-2 pl-4 text-[12px] font-semibold uppercase tracking-wider text-[#323DFE]">
                                  {section.title}
                                </h4>
                                <div
                                  className={
                                    navItem.title === "Solutions"
                                      ? "space-y-0"
                                      : "space-y-1"
                                  }
                                >
                                  {section.items.map((item) => (
                                    <a
                                      key={item.title}
                                      href={item.href}
                                      className={cn(
                                        "flex gap-3 rounded-md transition-colors hover:bg-gray-50",
                                        navItem.title === "Solutions"
                                          ? "items-center py-1.5 pl-4"
                                          : "items-start py-2 pl-4",
                                      )}
                                      onClick={() => setIsOpen(false)}
                                    >
                                      {item.icon && iconMap[item.icon] && (
                                        <span
                                          className={
                                            navItem.title === "Solutions"
                                              ? "text-[#323DFE]"
                                              : "mt-0.5 text-[#323DFE]"
                                          }
                                        >
                                          {iconMap[item.icon]}
                                        </span>
                                      )}
                                      <div>
                                        <span className="block text-[14px] font-medium text-gray-900">
                                          {item.title}
                                        </span>
                                        {item.description &&
                                          navItem.title !== "Solutions" && (
                                            <span className="mt-0.5 block text-[12px] text-gray-500">
                                              {item.description}
                                            </span>
                                          )}
                                      </div>
                                    </a>
                                  ))}
                                </div>
                              </div>
                            ))}
                            {navItem.bottomItems && (
                              <div className="mt-2 border-t border-gray-100 pt-4">
                                <h4 className="mb-2 pl-4 text-[12px] font-medium text-gray-500">
                                  More
                                </h4>
                                <div className="flex flex-wrap gap-4 pl-4">
                                  {navItem.bottomItems.map((item) => (
                                    <a
                                      key={item.title}
                                      href={item.href}
                                      className="flex items-center gap-2 text-[14px] font-medium text-gray-900"
                                      onClick={() => setIsOpen(false)}
                                    >
                                      {item.icon && iconMap[item.icon] && (
                                        <span className="text-[#323DFE]">
                                          {iconMap[item.icon]}
                                        </span>
                                      )}
                                      {item.title}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      ) : (
                        <a
                          key={navItem.title}
                          href={navItem.href}
                          className="block border-b border-gray-100 py-4 text-[16px] font-medium text-gray-900"
                          onClick={() => setIsOpen(false)}
                        >
                          {navItem.title}
                        </a>
                      ),
                    )}
                  </Accordion>

                  {/* Secondary links */}
                  <div className="mt-6 space-y-3">
                    {secondaryNavigation.map((item) => (
                      <a
                        key={item.title}
                        href={item.href}
                        className="block text-center text-[14px] text-gray-600"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.title}
                      </a>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
};

export { Navbar1 };
export default Navbar1;
