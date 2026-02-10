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

// Consistent card frame for all illustrations
function ChatWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative h-56 w-full rounded-xl overflow-hidden bg-gray-100/70", className)}>
      <div className="h-full px-5 py-3 flex flex-col justify-center gap-1.5">
        {children}
      </div>
    </div>
  );
}

// Reusable message components
function IncomingMsg({ children, time = "9:41 AM" }: { children: React.ReactNode; time?: string }) {
  return (
    <div className="flex items-start max-w-[88%]">
      <div className="relative rounded-lg rounded-tl-sm px-2.5 py-1.5 bg-white shadow-sm">
        <div className="absolute -left-2 top-0 w-0 h-0 border-t-[8px] border-t-white border-l-[8px] border-l-transparent" />
        {children}
        <p className="text-[10px] text-gray-400 text-right mt-0.5">{time}</p>
      </div>
    </div>
  );
}

function OutgoingMsg({ children, time = "9:41 AM" }: { children: React.ReactNode; time?: string }) {
  return (
    <div className="flex justify-end">
      <div className="relative rounded-lg rounded-tr-sm px-2.5 py-1.5 max-w-[85%] bg-[#dcf8c6] shadow-sm">
        <div className="absolute -right-2 top-0 w-0 h-0 border-t-[8px] border-t-[#dcf8c6] border-r-[8px] border-r-transparent" />
        {children}
        <div className="flex items-center justify-end gap-1 mt-0.5">
          <p className="text-[10px] text-gray-500">{time}</p>
          <svg className="w-4 h-4 text-[#53bdeb]" viewBox="0 0 16 15" fill="currentColor">
            <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.512z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// Buying Assistant Illustration
function BuyingAssistantIllustration() {
  return (
    <ChatWrapper>
      <OutgoingMsg time="10:22 AM">
        <p className="text-[12px] text-gray-800 leading-snug">Looking for a gift for my mom 🎁</p>
      </OutgoingMsg>
      <IncomingMsg time="10:22 AM">
        <p className="text-[12px] text-gray-800 leading-snug">I'd love to help! What does she enjoy?</p>
        <div className="mt-1.5 flex flex-wrap gap-1">
          {["Serums", "Gift Sets", "Moisturizers"].map((opt, i) => (
            <span key={i} className="px-2 py-0.5 rounded-full bg-gray-100 text-[10px] text-[#323dfe] font-medium">{opt}</span>
          ))}
        </div>
      </IncomingMsg>
      <OutgoingMsg time="10:23 AM">
        <p className="text-[12px] text-gray-800 leading-snug">She'd love a gift set!</p>
      </OutgoingMsg>
    </ChatWrapper>
  );
}

// Sales Conversion Illustration
function SalesConversionIllustration() {
  return (
    <ChatWrapper>
      <IncomingMsg time="2:15 PM">
        <div className="rounded overflow-hidden mb-1.5">
          <img src="/images/shoe-product.jpg" alt="Product" className="w-full h-16 object-cover rounded" />
        </div>
        <p className="text-[12px] font-medium text-gray-900">Premium Running Sneakers</p>
        <p className="text-[12px] font-semibold text-gray-800 mb-2">$129 <span className="text-gray-400 line-through text-[10px]">$189</span></p>
        <div className="flex gap-1.5">
          <span className="px-2.5 py-1 rounded-full bg-gray-100 text-[10px] text-[#323dfe] font-medium">Buy Now</span>
          <span className="px-2.5 py-1 rounded-full bg-gray-100 text-[10px] text-[#323dfe] font-medium">Add to Cart</span>
        </div>
      </IncomingMsg>
      <OutgoingMsg time="2:16 PM">
        <p className="text-[12px] text-gray-800 leading-snug">Buy Now</p>
      </OutgoingMsg>
    </ChatWrapper>
  );
}

// Cart Recovery Illustration
function CartRecoveryIllustration() {
  return (
    <ChatWrapper>
      <IncomingMsg time="6:30 PM">
        <p className="text-[12px] text-gray-800 leading-snug">Hey! 👋 You left something in your cart</p>
        <div className="flex items-center gap-2 mt-1.5 p-1.5 bg-gray-50 rounded">
          <img src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=80&h=80&fit=crop" alt="Designer Bag" className="w-8 h-8 rounded object-cover flex-shrink-0" />
          <div>
            <p className="text-[11px] font-medium text-gray-900">Designer Bag</p>
            <p className="text-[11px] text-[#323dfe] font-medium">15% off - expires in 2h</p>
          </div>
        </div>
      </IncomingMsg>
      <OutgoingMsg time="6:32 PM">
        <p className="text-[12px] text-gray-800 leading-snug">Yes, complete my order!</p>
      </OutgoingMsg>
      <IncomingMsg time="6:32 PM">
        <p className="text-[12px] text-gray-800 leading-snug">🎉 Order confirmed! You saved $42</p>
      </IncomingMsg>
    </ChatWrapper>
  );
}

// Upsell Agent Illustration
function UpsellAgentIllustration() {
  return (
    <ChatWrapper>
      <IncomingMsg time="11:05 AM">
        <p className="text-[12px] text-gray-800 leading-snug">Based on your purchase, you might love these! ✨</p>
        <div className="grid grid-cols-3 gap-1 mt-1.5 max-w-[200px]">
          {[
            { name: "Earbuds", price: 29, icon: (
              <svg viewBox="0 0 48 48" fill="none" className="w-5 h-5">
                <path d="M16 18c0-4.4 3.6-8 8-8s8 3.6 8 8v4c0 2.2-1.8 4-4 4h-1v6h-6v-6h-1c-2.2 0-4-1.8-4-4v-4z" fill="#374151" />
                <circle cx="19" cy="20" r="2" fill="#9CA3AF" />
                <circle cx="29" cy="20" r="2" fill="#9CA3AF" />
              </svg>
            )},
            { name: "Case", price: 19, icon: (
              <svg viewBox="0 0 48 48" fill="none" className="w-5 h-5">
                <rect x="14" y="6" width="20" height="36" rx="4" fill="#374151" />
                <rect x="16" y="10" width="16" height="24" rx="1" fill="#9CA3AF" />
                <circle cx="24" cy="38" r="2" fill="#9CA3AF" />
              </svg>
            )},
            { name: "Charger", price: 24, icon: (
              <svg viewBox="0 0 48 48" fill="none" className="w-5 h-5">
                <rect x="16" y="8" width="16" height="24" rx="3" fill="#374151" />
                <rect x="20" y="32" width="8" height="4" rx="1" fill="#374151" />
                <rect x="22" y="36" width="4" height="6" rx="1" fill="#9CA3AF" />
                <rect x="20" y="14" width="3" height="8" rx="1" fill="#9CA3AF" />
                <rect x="25" y="14" width="3" height="8" rx="1" fill="#9CA3AF" />
              </svg>
            )},
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 rounded p-1 min-w-0">
              <div className="w-full aspect-square rounded bg-gray-100 flex items-center justify-center mb-0.5">
                {item.icon}
              </div>
              <p className="text-[8px] text-gray-600 truncate">{item.name}</p>
              <p className="text-[8px] font-semibold text-gray-800">${item.price}</p>
            </div>
          ))}
        </div>
      </IncomingMsg>
      <OutgoingMsg time="11:07 AM">
        <p className="text-[12px] text-gray-800 leading-snug">Add the earbuds to my order</p>
      </OutgoingMsg>
    </ChatWrapper>
  );
}

// Loyalty Marketing Illustration
function LoyaltyMarketingIllustration() {
  return (
    <ChatWrapper>
      <IncomingMsg time="9:00 AM">
        <div className="min-w-[230px]">
          <p className="text-[12px] text-gray-800 leading-snug mb-2">🎁 VIP Rewards Update!</p>
          <div className="bg-gray-50 rounded-lg p-2.5">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[10px] text-gray-600">Points</span>
              <span className="text-[12px] font-bold text-gray-900">2,450</span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#323dfe] to-[#cd3ef9] rounded-full" style={{ width: "85%" }} />
            </div>
            <p className="text-[9px] text-gray-500 mt-1">150 pts to Gold tier 🏆</p>
          </div>
        </div>
      </IncomingMsg>
      <OutgoingMsg time="9:02 AM">
        <p className="text-[12px] text-gray-800 leading-snug">How do I redeem my points?</p>
      </OutgoingMsg>
    </ChatWrapper>
  );
}

// Booking & Reminder Illustration
function BookingReminderIllustration() {
  return (
    <ChatWrapper>
      <IncomingMsg time="3:00 PM">
        <p className="text-[12px] text-gray-800 leading-snug">📅 Book your appointment:</p>
        <div className="grid grid-cols-3 gap-1 mt-1.5">
          {["Mon 10am", "Tue 2pm", "Wed 4pm"].map((slot, i) => (
            <span key={i} className="px-1.5 py-1 rounded text-[10px] font-medium text-center bg-gray-100 text-[#323dfe]">{slot}</span>
          ))}
        </div>
      </IncomingMsg>
      <OutgoingMsg time="3:01 PM">
        <p className="text-[12px] text-gray-800 leading-snug">Tue 2pm please</p>
      </OutgoingMsg>
      <IncomingMsg time="3:01 PM">
        <p className="text-[12px] text-gray-800 leading-snug">✅ Confirmed! Calendar invite sent to your email.</p>
      </IncomingMsg>
    </ChatWrapper>
  );
}

// Customer Service Illustration
function CustomerServiceIllustration() {
  return (
    <ChatWrapper>
      <OutgoingMsg time="4:10 PM">
        <p className="text-[12px] text-gray-800 leading-snug">Need to return order #4821</p>
      </OutgoingMsg>
      <IncomingMsg time="4:10 PM">
        <p className="text-[12px] text-gray-800 leading-snug">I can help with that! What's the reason for the return?</p>
      </IncomingMsg>
      <OutgoingMsg time="4:11 PM">
        <p className="text-[12px] text-gray-800 leading-snug">Wrong size</p>
      </OutgoingMsg>
    </ChatWrapper>
  );
}

// Order Tracking Illustration
function OrderTrackingIllustration() {
  return (
    <ChatWrapper>
      <OutgoingMsg time="1:30 PM">
        <p className="text-[12px] text-gray-800 leading-snug">Where is my order #4821?</p>
      </OutgoingMsg>
      <IncomingMsg time="1:30 PM">
        <p className="text-[12px] text-gray-800 leading-snug mb-2">📦 Order #4821 Update</p>
        <div className="flex items-center gap-1">
          {["Ordered", "Shipped", "Out", "Delivered"].map((stage, i) => (
            <div key={i} className="flex-1 flex items-center">
              <div className={cn(
                "w-2.5 h-2.5 rounded-full flex items-center justify-center",
                i < 3 ? "bg-[#323dfe]" : "bg-gray-200"
              )}>
                {i < 3 && (
                  <svg className="w-1.5 h-1.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              {i < 3 && <div className={cn("flex-1 h-0.5", i < 2 ? "bg-[#323dfe]" : "bg-gray-200")} />}
            </div>
          ))}
        </div>
        <p className="text-[10px] text-gray-600 mt-1.5">Out for delivery - arriving by 4 PM</p>
      </IncomingMsg>
    </ChatWrapper>
  );
}

// Feedback Survey Illustration
function FeedbackSurveyIllustration() {
  return (
    <ChatWrapper>
      <IncomingMsg time="5:00 PM">
        <p className="text-[12px] text-gray-800 leading-snug mb-1.5">How was your experience? Rate us:</p>
        <div className="flex gap-0.5 justify-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg key={star} className={cn("w-5 h-5", star <= 5 ? "text-yellow-400" : "text-gray-200")} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </IncomingMsg>
      <OutgoingMsg time="5:01 PM">
        <p className="text-[12px] text-gray-800 leading-snug">⭐⭐⭐⭐⭐</p>
      </OutgoingMsg>
      <IncomingMsg time="5:01 PM">
        <p className="text-[12px] text-gray-800 leading-snug">Thank you! We're glad you loved it 💙</p>
      </IncomingMsg>
    </ChatWrapper>
  );
}

const categories: UseCaseCategory[] = [
  {
    id: "convert",
    label: "Convert",
    useCases: [
      {
        title: "Buying assistant",
        tags: ["eCommerce", "Retail", "Consumer services"],
        description: "Help customers find the perfect product with personalized recommendations based on their preferences and needs.",
        illustration: <BuyingAssistantIllustration />,
      },
      {
        title: "Sales conversion agent",
        tags: ["eCommerce", "Retail", "D2C brands"],
        description: "Enable instant checkouts with product showcases, pricing, and seamless payment flows right in WhatsApp.",
        illustration: <SalesConversionIllustration />,
      },
      {
        title: "Cart recovery agent",
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
        title: "AI-powered upsell agent",
        tags: ["eCommerce", "Retail", "Food & dining"],
        description: "Suggest complementary products and upgrades based on purchase history and browsing behavior.",
        illustration: <UpsellAgentIllustration />,
      },
      {
        title: "Loyalty marketing agent",
        tags: ["Retail", "Hospitality", "Consumer services"],
        description: "Send exclusive rewards, VIP perks, and personalized offers to your most valuable customers.",
        illustration: <LoyaltyMarketingIllustration />,
      },
      {
        title: "Booking & reminder agent",
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
        title: "AI customer service agent",
        tags: ["eCommerce", "Health", "Travel"],
        description: "Provide 24/7 instant support for returns, exchanges, FAQs, and account issues without wait times.",
        illustration: <CustomerServiceIllustration />,
      },
      {
        title: "Order tracking agent",
        tags: ["eCommerce", "Logistics", "Food delivery"],
        description: "Send proactive shipping updates and delivery notifications to keep customers informed.",
        illustration: <OrderTrackingIllustration />,
      },
      {
        title: "Feedback & survey agent",
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
                      ? "lg:border-l-[#323dfe] text-black font-semibold bg-[#323dfe]/10 lg:bg-transparent"
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
