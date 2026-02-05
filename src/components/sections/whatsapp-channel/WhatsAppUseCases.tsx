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

interface UseCaseCategory {
  id: string;
  label: string;
  useCases: UseCase[];
}

// Wrapper component for illustrations - WhatsApp chat style
function IllustrationWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative h-56 w-full rounded-xl overflow-hidden bg-gradient-to-br from-[#dcf8c6]/30 to-[#25D366]/10", className)}>
      <div className="relative h-full w-full px-3 py-3 flex flex-col">
        {children}
      </div>
    </div>
  );
}

// Buying Assistant Illustration
function BuyingAssistantIllustration() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const runAnimation = () => {
      setStep(0);
      setTimeout(() => setStep(1), 500);
      setTimeout(() => setStep(2), 1200);
      setTimeout(() => setStep(3), 2000);
    };

    runAnimation();
    const interval = setInterval(runAnimation, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <IllustrationWrapper>
      <div className="flex flex-col gap-2 h-full justify-center">
        <div className={cn("max-w-[85%] self-end transition-all duration-500", step >= 1 ? "opacity-100" : "opacity-0")}>
          <div className="rounded-lg rounded-tr-sm bg-[#dcf8c6] px-2.5 py-1.5 shadow-sm">
            <p className="text-[11px] text-gray-800">Looking for a gift for my mom</p>
          </div>
        </div>
        <div className={cn("max-w-[90%] self-start transition-all duration-500", step >= 2 ? "opacity-100" : "opacity-0")}>
          <div className="rounded-lg rounded-tl-sm bg-white px-2.5 py-1.5 shadow-sm">
            <p className="text-[11px] text-gray-800">I'd love to help! 💝 What does she enjoy? I can suggest:</p>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {["Jewelry", "Skincare", "Home Decor"].map((opt, i) => (
                <span key={i} className="px-2 py-0.5 rounded-full bg-[#25D366]/10 text-[9px] text-[#25D366] font-medium">{opt}</span>
              ))}
            </div>
          </div>
        </div>
        <div className={cn("max-w-[85%] self-end transition-all duration-500", step >= 3 ? "opacity-100" : "opacity-0")}>
          <div className="rounded-lg rounded-tr-sm bg-[#dcf8c6] px-2.5 py-1.5 shadow-sm">
            <p className="text-[11px] text-gray-800">She loves skincare!</p>
          </div>
        </div>
      </div>
    </IllustrationWrapper>
  );
}

// Sales Conversion Illustration
function SalesConversionIllustration() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const runAnimation = () => {
      setStep(0);
      setTimeout(() => setStep(1), 400);
      setTimeout(() => setStep(2), 1100);
      setTimeout(() => setStep(3), 1800);
    };

    runAnimation();
    const interval = setInterval(runAnimation, 7500);
    return () => clearInterval(interval);
  }, []);

  return (
    <IllustrationWrapper>
      <div className="flex flex-col gap-2 h-full justify-center">
        <div className={cn("max-w-[90%] self-start transition-all duration-500", step >= 1 ? "opacity-100" : "opacity-0")}>
          <div className="rounded-lg rounded-tl-sm bg-white shadow-sm overflow-hidden">
            <img src="/images/shoe-product.jpg" alt="Product" className="w-full h-14 object-cover" />
            <div className="p-2">
              <p className="text-[10px] font-medium text-gray-900">Premium Sneakers</p>
              <p className="text-[11px] font-semibold text-[#25D366]">$129 <span className="text-gray-400 line-through text-[9px]">$189</span></p>
            </div>
          </div>
        </div>
        <div className={cn("flex gap-1.5 transition-all duration-500", step >= 2 ? "opacity-100" : "opacity-0")}>
          <button className="px-3 py-1.5 rounded-full bg-[#25D366] text-white text-[10px] font-medium">Buy Now</button>
          <button className="px-3 py-1.5 rounded-full border border-[#25D366] text-[#25D366] text-[10px] font-medium">Add to Cart</button>
        </div>
        <div className={cn("max-w-[85%] self-end transition-all duration-500", step >= 3 ? "opacity-100" : "opacity-0")}>
          <div className="rounded-lg rounded-tr-sm bg-[#dcf8c6] px-2.5 py-1.5 shadow-sm">
            <p className="text-[11px] text-gray-800">Buy Now ✓</p>
          </div>
        </div>
      </div>
    </IllustrationWrapper>
  );
}

// Cart Recovery Illustration
function CartRecoveryIllustration() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const runAnimation = () => {
      setStep(0);
      setTimeout(() => setStep(1), 500);
      setTimeout(() => setStep(2), 1400);
      setTimeout(() => setStep(3), 2200);
    };

    runAnimation();
    const interval = setInterval(runAnimation, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <IllustrationWrapper>
      <div className="flex flex-col gap-2 h-full justify-center">
        <div className={cn("max-w-[90%] self-start transition-all duration-500", step >= 1 ? "opacity-100" : "opacity-0")}>
          <div className="rounded-lg rounded-tl-sm bg-white px-2.5 py-2 shadow-sm">
            <p className="text-[11px] text-gray-800">Hey! 👋 You left something in your cart</p>
            <div className="flex items-center gap-2 mt-1.5 p-1.5 bg-gray-50 rounded">
              <div className="w-8 h-8 rounded bg-gray-200"></div>
              <div>
                <p className="text-[10px] font-medium text-gray-900">Designer Bag</p>
                <p className="text-[10px] text-[#25D366] font-medium">15% off expires in 2h</p>
              </div>
            </div>
          </div>
        </div>
        <div className={cn("max-w-[85%] self-end transition-all duration-500", step >= 2 ? "opacity-100" : "opacity-0")}>
          <div className="rounded-lg rounded-tr-sm bg-[#dcf8c6] px-2.5 py-1.5 shadow-sm">
            <p className="text-[11px] text-gray-800">Yes, complete my order!</p>
          </div>
        </div>
        <div className={cn("max-w-[90%] self-start transition-all duration-500", step >= 3 ? "opacity-100" : "opacity-0")}>
          <div className="rounded-lg rounded-tl-sm bg-white px-2.5 py-1.5 shadow-sm">
            <p className="text-[11px] text-gray-800">🎉 Order confirmed! You saved $42</p>
          </div>
        </div>
      </div>
    </IllustrationWrapper>
  );
}

// Upsell Agent Illustration
function UpsellAgentIllustration() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const runAnimation = () => {
      setStep(0);
      setTimeout(() => setStep(1), 500);
      setTimeout(() => setStep(2), 1300);
    };

    runAnimation();
    const interval = setInterval(runAnimation, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <IllustrationWrapper>
      <div className="flex flex-col gap-2 h-full justify-center">
        <div className={cn("max-w-[90%] self-start transition-all duration-500", step >= 1 ? "opacity-100" : "opacity-0")}>
          <div className="rounded-lg rounded-tl-sm bg-white px-2.5 py-2 shadow-sm">
            <p className="text-[11px] text-gray-800">Based on your purchase, you might love these! ✨</p>
            <div className="flex gap-2 mt-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex-1 bg-gray-50 rounded p-1.5">
                  <div className="w-full h-8 rounded bg-gray-200 mb-1"></div>
                  <p className="text-[9px] text-gray-600 truncate">Item {i}</p>
                  <p className="text-[9px] font-medium text-[#25D366]">$29</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={cn("max-w-[85%] self-end transition-all duration-500", step >= 2 ? "opacity-100" : "opacity-0")}>
          <div className="rounded-lg rounded-tr-sm bg-[#dcf8c6] px-2.5 py-1.5 shadow-sm">
            <p className="text-[11px] text-gray-800">Add Item 2 to my order</p>
          </div>
        </div>
      </div>
    </IllustrationWrapper>
  );
}

// Loyalty Marketing Illustration
function LoyaltyMarketingIllustration() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const runAnimation = () => {
      setProgress(0);
      const startTime = Date.now();
      const duration = 2000;
      const targetProgress = 85;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progressPercent = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progressPercent, 4);
        setProgress(Math.round(eased * targetProgress));

        if (progressPercent < 1) {
          requestAnimationFrame(animate);
        }
      };

      setTimeout(() => requestAnimationFrame(animate), 500);
    };

    runAnimation();
    const interval = setInterval(runAnimation, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <IllustrationWrapper>
      <div className="flex flex-col gap-2 h-full justify-center">
        <div className="max-w-[90%] self-start">
          <div className="rounded-lg rounded-tl-sm bg-white px-2.5 py-2 shadow-sm">
            <p className="text-[11px] text-gray-800 mb-2">🎁 VIP Rewards Update!</p>
            <div className="bg-gradient-to-r from-[#25D366]/10 to-[#128C7E]/10 rounded-lg p-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] text-gray-600">Points</span>
                <span className="text-[12px] font-bold text-[#25D366]">2,450</span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-full transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-[9px] text-gray-500 mt-1">150 pts to next reward</p>
            </div>
          </div>
        </div>
      </div>
    </IllustrationWrapper>
  );
}

// Booking & Reminder Illustration
function BookingReminderIllustration() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const runAnimation = () => {
      setStep(0);
      setTimeout(() => setStep(1), 400);
      setTimeout(() => setStep(2), 1100);
      setTimeout(() => setStep(3), 1800);
    };

    runAnimation();
    const interval = setInterval(runAnimation, 7500);
    return () => clearInterval(interval);
  }, []);

  return (
    <IllustrationWrapper>
      <div className="flex flex-col gap-2 h-full justify-center">
        <div className={cn("max-w-[90%] self-start transition-all duration-500", step >= 1 ? "opacity-100" : "opacity-0")}>
          <div className="rounded-lg rounded-tl-sm bg-white px-2.5 py-2 shadow-sm">
            <p className="text-[11px] text-gray-800">📅 Book your appointment:</p>
            <div className="grid grid-cols-3 gap-1 mt-1.5">
              {["Mon 10am", "Tue 2pm", "Wed 4pm"].map((slot, i) => (
                <button
                  key={i}
                  className={cn(
                    "px-1.5 py-1 rounded text-[9px] font-medium",
                    i === 1 ? "bg-[#25D366] text-white" : "bg-gray-100 text-gray-600"
                  )}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className={cn("max-w-[85%] self-end transition-all duration-500", step >= 2 ? "opacity-100" : "opacity-0")}>
          <div className="rounded-lg rounded-tr-sm bg-[#dcf8c6] px-2.5 py-1.5 shadow-sm">
            <p className="text-[11px] text-gray-800">Tue 2pm please</p>
          </div>
        </div>
        <div className={cn("max-w-[90%] self-start transition-all duration-500", step >= 3 ? "opacity-100" : "opacity-0")}>
          <div className="rounded-lg rounded-tl-sm bg-white px-2.5 py-1.5 shadow-sm">
            <p className="text-[11px] text-gray-800">✅ Confirmed! Calendar invite sent.</p>
          </div>
        </div>
      </div>
    </IllustrationWrapper>
  );
}

// Customer Service Illustration
function CustomerServiceIllustration() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const runAnimation = () => {
      setStep(0);
      setTimeout(() => setStep(1), 400);
      setTimeout(() => setStep(2), 1100);
      setTimeout(() => setStep(3), 1800);
      setTimeout(() => setStep(4), 2500);
    };

    runAnimation();
    const interval = setInterval(runAnimation, 8500);
    return () => clearInterval(interval);
  }, []);

  return (
    <IllustrationWrapper>
      <div className="flex flex-col gap-1.5 h-full justify-center">
        <div className={cn("max-w-[85%] self-end transition-all duration-500", step >= 1 ? "opacity-100" : "opacity-0")}>
          <div className="rounded-lg rounded-tr-sm bg-[#dcf8c6] px-2.5 py-1.5 shadow-sm">
            <p className="text-[11px] text-gray-800">Need to return my order #4821</p>
          </div>
        </div>
        <div className={cn("max-w-[90%] self-start transition-all duration-500", step >= 2 ? "opacity-100" : "opacity-0")}>
          <div className="rounded-lg rounded-tl-sm bg-white px-2.5 py-1.5 shadow-sm">
            <p className="text-[11px] text-gray-800">I can help! What's the reason?</p>
          </div>
        </div>
        <div className={cn("max-w-[85%] self-end transition-all duration-500", step >= 3 ? "opacity-100" : "opacity-0")}>
          <div className="rounded-lg rounded-tr-sm bg-[#dcf8c6] px-2.5 py-1.5 shadow-sm">
            <p className="text-[11px] text-gray-800">Wrong size</p>
          </div>
        </div>
        <div className={cn("max-w-[90%] self-start transition-all duration-500", step >= 4 ? "opacity-100" : "opacity-0")}>
          <div className="rounded-lg rounded-tl-sm bg-white px-2.5 py-1.5 shadow-sm">
            <p className="text-[11px] text-gray-800">✅ Return initiated! Label sent to your email.</p>
          </div>
        </div>
      </div>
    </IllustrationWrapper>
  );
}

// Order Tracking Illustration
function OrderTrackingIllustration() {
  return (
    <IllustrationWrapper>
      <div className="flex flex-col gap-2 h-full justify-center">
        <div className="max-w-[90%] self-start">
          <div className="rounded-lg rounded-tl-sm bg-white px-2.5 py-2 shadow-sm">
            <p className="text-[11px] text-gray-800 mb-2">📦 Order #4821 Update</p>
            <div className="flex items-center gap-1">
              {["Ordered", "Shipped", "Out", "Delivered"].map((stage, i) => (
                <div key={i} className="flex-1 flex items-center">
                  <div className={cn(
                    "w-2.5 h-2.5 rounded-full flex items-center justify-center",
                    i < 3 ? "bg-[#25D366]" : "bg-gray-200"
                  )}>
                    {i < 3 && (
                      <svg className="w-1.5 h-1.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  {i < 3 && <div className={cn("flex-1 h-0.5", i < 2 ? "bg-[#25D366]" : "bg-gray-200")} />}
                </div>
              ))}
            </div>
            <p className="text-[10px] text-gray-600 mt-1.5">Out for delivery - arriving by 4 PM</p>
          </div>
        </div>
      </div>
    </IllustrationWrapper>
  );
}

// Feedback Survey Illustration
function FeedbackSurveyIllustration() {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const runAnimation = () => {
      setRating(0);
      setTimeout(() => {
        let r = 0;
        const ratingInterval = setInterval(() => {
          r++;
          setRating(r);
          if (r >= 5) clearInterval(ratingInterval);
        }, 150);
      }, 500);
    };

    runAnimation();
    const interval = setInterval(runAnimation, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <IllustrationWrapper>
      <div className="flex flex-col gap-2 h-full justify-center">
        <div className="max-w-[90%] self-start">
          <div className="rounded-lg rounded-tl-sm bg-white px-2.5 py-2 shadow-sm">
            <p className="text-[11px] text-gray-800 mb-2">How was your experience? 🌟</p>
            <div className="flex gap-0.5 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={cn(
                    "w-6 h-6 transition-colors duration-200",
                    star <= rating ? "text-yellow-400" : "text-gray-200"
                  )}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-[9px] text-gray-500 text-center mt-1">Tap to rate</p>
          </div>
        </div>
      </div>
    </IllustrationWrapper>
  );
}

const categories: UseCaseCategory[] = [
  {
    id: "convert",
    label: "Convert",
    useCases: [
      {
        title: "Buying Assistant",
        tags: ["eCommerce", "Retail", "Consumer services"],
        description: "Help customers find the perfect product with personalized recommendations based on their preferences and needs.",
        illustration: <BuyingAssistantIllustration />,
      },
      {
        title: "Sales Conversion Agent",
        tags: ["eCommerce", "Retail", "D2C brands"],
        description: "Enable instant checkouts with product showcases, pricing, and seamless payment flows right in WhatsApp.",
        illustration: <SalesConversionIllustration />,
      },
      {
        title: "Cart Recovery Agent",
        tags: ["eCommerce", "Retail", "Fashion"],
        description: "Automatically reach out to customers who abandoned their carts with personalized offers to complete purchases.",
        illustration: <CartRecoveryIllustration />,
      },
    ],
  },
  {
    id: "engage",
    label: "Engage",
    useCases: [
      {
        title: "AI-powered Upsell Agent",
        tags: ["eCommerce", "Retail", "Food & dining"],
        description: "Suggest complementary products and upgrades based on purchase history and browsing behavior.",
        illustration: <UpsellAgentIllustration />,
      },
      {
        title: "Loyalty Marketing Agent",
        tags: ["Retail", "Hospitality", "Consumer services"],
        description: "Send exclusive rewards, VIP perks, and personalized offers to your most valuable customers.",
        illustration: <LoyaltyMarketingIllustration />,
      },
      {
        title: "Booking & Reminder Agent",
        tags: ["Health", "Education", "Local services"],
        description: "Automate appointment scheduling, confirmations, and reminders to reduce no-shows.",
        illustration: <BookingReminderIllustration />,
      },
    ],
  },
  {
    id: "delight",
    label: "Delight",
    useCases: [
      {
        title: "AI Customer Service Agent",
        tags: ["eCommerce", "Health", "Travel"],
        description: "Provide 24/7 instant support for returns, exchanges, FAQs, and account issues without wait times.",
        illustration: <CustomerServiceIllustration />,
      },
      {
        title: "Order Tracking Agent",
        tags: ["eCommerce", "Logistics", "Food delivery"],
        description: "Send proactive shipping updates and delivery notifications to keep customers informed.",
        illustration: <OrderTrackingIllustration />,
      },
      {
        title: "Feedback & Survey Agent",
        tags: ["Travel", "Health", "Education", "eCommerce"],
        description: "Collect post-purchase feedback and reviews at the perfect moment to improve satisfaction.",
        illustration: <FeedbackSurveyIllustration />,
      },
    ],
  },
];

export default function WhatsAppUseCases() {
  const [activeCategory, setActiveCategory] = useState<string>("convert");
  const [isNavFixed, setIsNavFixed] = useState(false);
  const [navLeftOffset, setNavLeftOffset] = useState(0);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Scroll to section when clicking nav
  const scrollToSection = (categoryId: string) => {
    setActiveCategory(categoryId);
    const section = sectionRefs.current[categoryId];
    if (section) {
      const offset = 120;
      const top = section.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  // Handle scroll for both active category and sticky nav
  useEffect(() => {
    const handleScroll = () => {
      // Update active category based on which section is in view
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

      // Handle sticky nav positioning
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
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black text-center mb-4 max-w-3xl mx-auto">
          WhatsApp AI agents for every
          <br />
          customer interaction
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10 md:mb-14">
          From lead conversion to customer delight, deploy AI agents that handle it all on WhatsApp.
        </p>

        {/* Navigation + Content Layout */}
        <div ref={containerRef} className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left - Navigation Container */}
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
                      ? "lg:border-l-[#25D366] text-black font-semibold bg-[#25D366]/10 lg:bg-transparent"
                      : "lg:border-l-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent"
                  )}
                >
                  <span className="text-base">{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right - All Category Sections */}
          <div ref={contentRef} className="flex-1 space-y-16">
            {categories.map((category) => (
              <div
                key={category.id}
                ref={(el) => { sectionRefs.current[category.id] = el; }}
                id={`category-${category.id}`}
              >
                {/* Use Case Cards Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {category.useCases.map((useCase, index) => (
                    <div key={index} className="group">
                      {/* Illustration */}
                      <div className="mb-4 overflow-hidden rounded-lg transition-all">
                        {useCase.illustration}
                      </div>

                      {/* Title */}
                      <h3 className="mb-2 text-lg font-semibold text-black">
                        {useCase.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-gray-600 leading-relaxed mb-3">
                        {useCase.description}
                      </p>

                      {/* Tags */}
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
