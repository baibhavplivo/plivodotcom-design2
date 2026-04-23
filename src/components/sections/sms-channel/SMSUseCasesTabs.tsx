"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface UseCase {
  title: string;
  tags: string[];
  description: string;
  illustration: React.ReactNode;
}

interface Category {
  id: string;
  label: string;
  useCases: UseCase[];
}

// SMS Waveform component for visual interest
function SMSIcon({ variant = "default" }: { variant?: "default" | "success" | "promo" }) {
  const colors = {
    default: "from-primary to-black",
    success: "from-emerald-500 to-emerald-600",
    promo: "from-primary to-black",
  };

  return (
    <div className={cn("w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center", colors[variant])}>
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    </div>
  );
}

// Illustration: OTP Verification
function OTPVerificationIllustration() {
  return (
    <div className="relative h-56 w-full rounded-xl overflow-hidden bg-gradient-to-br from-surface to-muted">
      <div className="relative h-full w-full p-4 flex flex-col gap-3">
        {/* SMS message */}
        <div className="flex items-start gap-2">
          <SMSIcon variant="success" />
          <div className="bg-background rounded-xl px-3 py-2 max-w-[80%] shadow-sm">
            <p className="text-[11px] text-foreground/80">Your OTP is <span className="font-bold text-primary">4839</span>. Valid for 5 mins.</p>
          </div>
        </div>

        {/* OTP Input UI */}
        <div className="bg-background rounded-xl p-3 shadow-sm mt-auto">
          <p className="text-[10px] text-muted-foreground mb-2">Enter verification code</p>
          <div className="flex gap-2 justify-center mb-3">
            {["4", "8", "3", "9"].map((digit, i) => (
              <div
                key={i}
                className="w-9 h-11 rounded-lg bg-surface border-2 border-primary flex items-center justify-center text-lg font-semibold text-foreground"
              >
                {digit}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-emerald-500 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-xs text-emerald-600 dark:text-emerald-300 font-medium">Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Illustration: Alerts & Notifications
function AlertsIllustration() {
  return (
    <div className="relative h-56 w-full rounded-xl overflow-hidden bg-gradient-to-br from-surface to-muted">
      <div className="relative h-full w-full p-4 flex flex-col gap-2.5">
        {/* Order confirmation */}
        <div className="flex items-start gap-2">
          <SMSIcon />
          <div className="bg-background rounded-xl px-3 py-2 max-w-[80%] shadow-sm">
            <p className="text-[11px] text-foreground/80">Order #45892 confirmed! Estimated delivery: Tomorrow by 5 PM.</p>
            <p className="text-[9px] text-muted-foreground mt-1">9:30 AM</p>
          </div>
        </div>

        {/* Shipping update */}
        <div className="flex items-start gap-2">
          <SMSIcon variant="success" />
          <div className="bg-background rounded-xl px-3 py-2 max-w-[80%] shadow-sm">
            <p className="text-[11px] text-foreground/80">Your package is out for delivery! Track: acme.co/track/45892</p>
            <p className="text-[9px] text-muted-foreground mt-1">2:15 PM</p>
          </div>
        </div>

        {/* Appointment reminder */}
        <div className="flex items-start gap-2">
          <SMSIcon />
          <div className="bg-background rounded-xl px-3 py-2 max-w-[80%] shadow-sm">
            <p className="text-[11px] text-foreground/80">Reminder: Your appointment is tomorrow at 10 AM. Reply 1 to confirm.</p>
            <p className="text-[9px] text-muted-foreground mt-1">5:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Illustration: Payment Reminders
function PaymentReminderIllustration() {
  return (
    <div className="relative h-56 w-full rounded-xl overflow-hidden bg-gradient-to-br from-surface to-muted">
      <div className="relative h-full w-full p-4 flex flex-col gap-3">
        {/* Payment reminder SMS */}
        <div className="flex items-start gap-2">
          <SMSIcon />
          <div className="bg-background rounded-xl px-3 py-2.5 max-w-[80%] shadow-sm">
            <p className="text-[11px] text-foreground/80 mb-2">Your payment of $245 is due on Feb 15.</p>
            <div className="flex gap-2">
              <button className="text-[10px] px-2.5 py-1 bg-primary text-white rounded-md font-medium">Pay Now</button>
              <button className="text-[10px] px-2.5 py-1 border border-border text-muted-foreground rounded-md">Remind Later</button>
            </div>
          </div>
        </div>

        {/* User response */}
        <div className="flex justify-end">
          <div className="bg-primary rounded-xl px-3 py-2 max-w-[60%]">
            <p className="text-[11px] text-white">Pay Now</p>
          </div>
        </div>

        {/* Confirmation */}
        <div className="flex items-start gap-2">
          <SMSIcon variant="success" />
          <div className="bg-background rounded-xl px-3 py-2 max-w-[80%] shadow-sm">
            <p className="text-[11px] text-foreground/80">Payment of $245 received. Thank you!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Illustration: Promotional Campaign
function PromoIllustration() {
  return (
    <div className="relative h-56 w-full rounded-xl overflow-hidden bg-gradient-to-br from-surface to-muted">
      <div className="relative h-full w-full p-4 flex flex-col gap-3">
        {/* Promo SMS */}
        <div className="flex items-start gap-2">
          <SMSIcon variant="promo" />
          <div className="bg-background rounded-xl px-3 py-2.5 max-w-[85%] shadow-sm">
            <p className="text-[11px] text-foreground/80 mb-2">Flash Sale! 25% off everything with code <span className="font-bold text-primary">FLASH25</span>. Ends midnight!</p>
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <span>acme.com/sale</span>
              <span>•</span>
              <span>Reply STOP to opt out</span>
            </div>
          </div>
        </div>

        {/* Stats overlay */}
        <div className="mt-auto bg-background rounded-xl p-3 shadow-sm">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-sm font-semibold text-foreground">45%</p>
              <p className="text-[9px] text-muted-foreground">Open Rate</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">12%</p>
              <p className="text-[9px] text-muted-foreground">Click Rate</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">$2.4K</p>
              <p className="text-[9px] text-muted-foreground">Revenue</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Illustration: Abandoned Cart
function AbandonedCartIllustration() {
  return (
    <div className="relative h-56 w-full rounded-xl overflow-hidden bg-gradient-to-br from-surface to-muted">
      <div className="relative h-full w-full p-4 flex flex-col gap-3">
        {/* Cart reminder SMS */}
        <div className="flex items-start gap-2">
          <SMSIcon />
          <div className="bg-background rounded-xl px-3 py-2.5 max-w-[85%] shadow-sm">
            <p className="text-[11px] text-foreground/80">You left something behind! Complete your order and get 10% off with code <span className="font-bold">COMEBACK10</span></p>
          </div>
        </div>

        {/* Cart preview */}
        <div className="bg-background rounded-xl p-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-xl">
              👟
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-foreground">Running Shoes</p>
              <p className="text-[10px] text-muted-foreground">Size: 10 • Qty: 1</p>
            </div>
            <p className="text-sm font-semibold text-foreground">$89</p>
          </div>
        </div>

        {/* CTA */}
        <button className="w-full py-2.5 bg-primary text-white text-xs rounded-lg font-medium">
          Complete Purchase
        </button>
      </div>
    </div>
  );
}

// Illustration: Loyalty Program
function LoyaltyIllustration() {
  return (
    <div className="relative h-56 w-full rounded-xl overflow-hidden bg-gradient-to-br from-surface to-muted">
      <div className="relative h-full w-full p-4 flex flex-col gap-3">
        {/* Loyalty SMS */}
        <div className="flex items-start gap-2">
          <SMSIcon variant="promo" />
          <div className="bg-background rounded-xl px-3 py-2.5 max-w-[85%] shadow-sm">
            <p className="text-[11px] text-foreground/80">Congrats! You've earned 500 points. Redeem for $10 off your next order!</p>
          </div>
        </div>

        {/* Points progress */}
        <div className="bg-background rounded-xl p-3 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-muted-foreground">Your Points</span>
            <span className="text-xs font-semibold text-primary">500 pts</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-gradient-to-r from-primary to-black rounded-full" />
          </div>
          <p className="text-[9px] text-muted-foreground mt-1.5">250 more points to Gold status</p>
        </div>

        {/* Birthday message */}
        <div className="flex items-start gap-2">
          <SMSIcon variant="success" />
          <div className="bg-background rounded-xl px-3 py-2 max-w-[80%] shadow-sm">
            <p className="text-[11px] text-foreground/80">🎂 Happy Birthday! Enjoy 20% off today only with code BDAY20</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Illustration: Conversational Support
function ConversationalIllustration() {
  return (
    <div className="relative h-56 w-full rounded-xl overflow-hidden bg-gradient-to-br from-surface to-muted">
      <div className="relative h-full w-full p-4 flex flex-col gap-2.5">
        {/* User question */}
        <div className="flex justify-end">
          <div className="bg-primary rounded-xl px-3 py-2 max-w-[70%]">
            <p className="text-[11px] text-white">What's the status of my order?</p>
          </div>
        </div>

        {/* AI response */}
        <div className="flex items-start gap-2">
          <SMSIcon />
          <div className="bg-background rounded-xl px-3 py-2 max-w-[80%] shadow-sm">
            <p className="text-[11px] text-foreground/80">Your order #45892 shipped yesterday and will arrive by Friday. Track here: acme.co/track</p>
          </div>
        </div>

        {/* Follow-up */}
        <div className="flex justify-end">
          <div className="bg-primary rounded-xl px-3 py-2 max-w-[70%]">
            <p className="text-[11px] text-white">Can I change the delivery address?</p>
          </div>
        </div>

        {/* AI response */}
        <div className="flex items-start gap-2">
          <SMSIcon />
          <div className="bg-background rounded-xl px-3 py-2 max-w-[80%] shadow-sm">
            <p className="text-[11px] text-foreground/80">Yes! Reply with your new address and I'll update it for you.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Illustration: Customer Support
function SupportIllustration() {
  return (
    <div className="relative h-56 w-full rounded-xl overflow-hidden bg-gradient-to-br from-surface to-muted">
      <div className="relative h-full w-full p-4 flex flex-col gap-2.5">
        {/* Customer issue */}
        <div className="flex justify-end">
          <div className="bg-primary rounded-xl px-3 py-2 max-w-[70%]">
            <p className="text-[11px] text-white">I received the wrong item</p>
          </div>
        </div>

        {/* AI response with options */}
        <div className="flex items-start gap-2">
          <SMSIcon />
          <div className="bg-background rounded-xl px-3 py-2.5 max-w-[85%] shadow-sm">
            <p className="text-[11px] text-foreground/80 mb-2">I'm sorry about that! How would you like us to resolve this?</p>
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[10px] px-2 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-md">Free Replacement</span>
              <span className="text-[10px] px-2 py-1 bg-blue-50 text-blue-700 rounded-md">Full Refund</span>
              <span className="text-[10px] px-2 py-1 bg-purple-50 text-purple-700 rounded-md">Store Credit</span>
            </div>
          </div>
        </div>

        {/* Resolution status */}
        <div className="mt-auto bg-background rounded-lg px-3 py-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground">Resolution Status</span>
            <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-300">Replacement Shipped</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Illustration: Feedback Collection
function FeedbackIllustration() {
  return (
    <div className="relative h-56 w-full rounded-xl overflow-hidden bg-gradient-to-br from-surface to-muted">
      <div className="relative h-full w-full p-4 flex flex-col gap-3">
        {/* Feedback request */}
        <div className="flex items-start gap-2">
          <SMSIcon />
          <div className="bg-background rounded-xl px-3 py-2.5 max-w-[85%] shadow-sm">
            <p className="text-[11px] text-foreground/80 mb-2">How was your experience? Rate 1-5:</p>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <div
                  key={num}
                  className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-medium",
                    num === 5
                      ? "bg-gradient-to-br from-primary to-black text-white"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {num}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User response */}
        <div className="flex justify-end">
          <div className="bg-primary rounded-xl px-3 py-2 max-w-[50%]">
            <p className="text-[11px] text-white">5</p>
          </div>
        </div>

        {/* Thank you */}
        <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-lg px-3 py-2">
          <div className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-[11px] text-emerald-700 dark:text-emerald-300 font-medium">Thank you for your feedback!</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const categories: Category[] = [
  {
    id: "verify",
    label: "Verify",
    useCases: [
      {
        title: "OTP authentication",
        tags: ["Financial Services", "E-commerce", "SaaS"],
        description: "Secure user logins and transactions with instant one-time passwords delivered via SMS.",
        illustration: <OTPVerificationIllustration />,
      },
      {
        title: "Alerts & notifications",
        tags: ["Logistics", "Healthcare", "Retail"],
        description: "Send real-time updates on orders, deliveries, appointments, and account changes.",
        illustration: <AlertsIllustration />,
      },
      {
        title: "Payment reminders",
        tags: ["Financial Services", "Utilities", "Subscriptions"],
        description: "Reduce late payments with automated reminders and easy payment links.",
        illustration: <PaymentReminderIllustration />,
      },
    ],
  },
  {
    id: "engage",
    label: "Engage",
    useCases: [
      {
        title: "Promotional campaigns",
        tags: ["Retail", "E-commerce", "Hospitality"],
        description: "Drive sales with targeted SMS campaigns, flash sales, and personalized offers.",
        illustration: <PromoIllustration />,
      },
      {
        title: "Abandoned cart recovery",
        tags: ["E-commerce", "Retail", "Travel"],
        description: "Recover lost sales with timely reminders and exclusive discount codes.",
        illustration: <AbandonedCartIllustration />,
      },
      {
        title: "Loyalty programs",
        tags: ["Retail", "Hospitality", "Food & Beverage"],
        description: "Reward customers with points updates, exclusive perks, and birthday offers.",
        illustration: <LoyaltyIllustration />,
      },
    ],
  },
  {
    id: "support",
    label: "Support",
    useCases: [
      {
        title: "Conversational commerce",
        tags: ["E-commerce", "Retail", "D2C"],
        description: "Enable two-way conversations for product inquiries, recommendations, and purchases.",
        illustration: <ConversationalIllustration />,
      },
      {
        title: "Customer support",
        tags: ["All Industries"],
        description: "Resolve issues quickly with AI-powered SMS support that handles common queries 24/7.",
        illustration: <SupportIllustration />,
      },
      {
        title: "Feedback collection",
        tags: ["All Industries"],
        description: "Gather customer feedback and NPS scores through simple SMS surveys.",
        illustration: <FeedbackIllustration />,
      },
    ],
  },
];

export default function SMSUseCasesTabs() {
  const [activeCategory, setActiveCategory] = useState<string>("verify");
  const [isNavFixed, setIsNavFixed] = useState(false);
  const [navLeftOffset, setNavLeftOffset] = useState(0);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const scrollToSection = (categoryId: string) => {
    setActiveCategory(categoryId);
    const section = sectionRefs.current[categoryId];
    if (section) {
      const offset = 120;
      const top = section.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      for (const category of categories) {
        const section = sectionRefs.current[category.id];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom > 200) {
            setActiveCategory(category.id);
            break;
          }
        }
      }

      if (navContainerRef.current && contentRef.current) {
        const containerRect = navContainerRef.current.getBoundingClientRect();
        const contentRect = contentRef.current.getBoundingClientRect();
        const navbarHeight = 96;

        const shouldFix = containerRect.top <= navbarHeight && contentRect.bottom > navbarHeight + 150;
        setIsNavFixed(shouldFix);
        setNavLeftOffset(containerRect.left);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section className="bg-background border-t border-border py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-8">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">~</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>use cases tabs</span>
          <span className="flex-1 border-t border-dashed border-border" />
        </div>
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.04] tracking-[-0.035em] text-foreground mb-4">
          SMS Use Cases for Every
          <br />
          Customer Journey
        </h2>
        <p className="text-muted-foreground max-w-2xl  mb-10 md:mb-14">
          From verification to engagement to support, deploy SMS that handles it all.
        </p>

        {/* Navigation + Content Layout */}
        <div ref={containerRef} className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left - Navigation */}
          <div ref={navContainerRef} className="lg:w-40 flex-shrink-0">
            <div
              className={cn(
                "flex lg:flex-col gap-2",
                isNavFixed ? "lg:fixed lg:top-24 lg:w-40" : ""
              )}
              style={isNavFixed ? { left: navLeftOffset } : undefined}
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => scrollToSection(category.id)}
                  className={cn(
                    "px-4 py-3 text-left transition-all rounded-lg lg:rounded-none lg:border-l-2 lg:pl-4 lg:pr-0",
                    activeCategory === category.id
                      ? "lg:border-l-[#323dfe] text-foreground font-semibold bg-blue-50 lg:bg-transparent"
                      : "lg:border-l-gray-200 text-muted-foreground hover:text-foreground/80 hover:bg-surface lg:hover:bg-transparent"
                  )}
                >
                  <span className="text-base">{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right - Content */}
          <div ref={contentRef} className="flex-1 space-y-16">
            {categories.map((category) => (
              <div
                key={category.id}
                ref={(el) => { sectionRefs.current[category.id] = el; }}
                id={`category-${category.id}`}
              >
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {category.useCases.map((useCase, index) => (
                    <div key={index} className="group">
                      <div className="mb-4 overflow-hidden rounded-lg bg-surface transition-all group-hover:bg-muted">
                        {useCase.illustration}
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-foreground">
                        {useCase.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        {useCase.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {useCase.tags.map((tag, i) => (
                          <Badge key={i} variant="outline" size="sm">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
