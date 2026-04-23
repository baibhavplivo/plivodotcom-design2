"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface UseCase {
  title: string;
  tags: string[];
  description: string;
  illustration: React.ReactNode;
}

// Chat bubble wrapper for all illustrations
function ChatWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative h-56 w-full rounded-xl overflow-hidden", className)} style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }}>
      <div className="h-full px-5 py-3 flex flex-col justify-center gap-1.5">
        {children}
      </div>
    </div>
  );
}

function BotMsg({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-1.5 max-w-[88%]">
      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-black flex items-center justify-center flex-shrink-0 mt-0.5">
        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.813 15.904L12 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L5.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L12 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L18.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        </svg>
      </div>
      <div className="bg-background rounded-lg rounded-tl-sm px-2.5 py-1.5 shadow-sm border border-border">
        {children}
      </div>
    </div>
  );
}

function UserMsg({ children, avatar }: { children: React.ReactNode; avatar?: string }) {
  return (
    <div className="flex items-start justify-end gap-1.5">
      <div className="bg-background rounded-lg rounded-tr-sm px-2.5 py-1.5 max-w-[80%] shadow-sm border border-border">
        {children}
      </div>
      {avatar && (
        <img
          src={`${avatar}?w=48&h=48&fit=crop&crop=face`}
          alt="User"
          className="w-5 h-5 rounded-full object-cover flex-shrink-0 mt-0.5"
        />
      )}
    </div>
  );
}

// Order Management Illustration
function OrderManagementIllustration() {
  return (
    <ChatWrapper>
      <UserMsg avatar="/images/avatars/face-1.jpg">
        <p className="text-[12px] text-foreground leading-snug">Where's my order #4821?</p>
      </UserMsg>
      <BotMsg>
        <p className="text-[12px] text-foreground leading-snug mb-1.5">Your order is out for delivery!</p>
        <div className="flex items-center gap-1">
          {["Ordered", "Shipped", "Out", "Delivered"].map((stage, i) => (
            <div key={i} className="flex-1 flex items-center">
              <div className={cn("w-2.5 h-2.5 rounded-full", i < 3 ? "bg-primary" : "bg-gray-200")} />
              {i < 3 && <div className={cn("flex-1 h-0.5", i < 2 ? "bg-primary" : "bg-gray-200")} />}
            </div>
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground mt-1">Arriving by 4 PM today</p>
      </BotMsg>
    </ChatWrapper>
  );
}

// Booking Assistant Illustration
function BookingAssistantIllustration() {
  return (
    <ChatWrapper>
      <BotMsg>
        <p className="text-[12px] text-foreground leading-snug">I have these slots available:</p>
        <div className="grid grid-cols-3 gap-1 mt-1.5">
          {["Mon 10am", "Tue 2pm", "Wed 4pm"].map((slot, i) => (
            <span key={i} className="px-1.5 py-1 rounded text-[10px] font-medium text-center bg-muted text-primary">{slot}</span>
          ))}
        </div>
      </BotMsg>
      <UserMsg avatar="/images/avatars/face-2.jpg">
        <p className="text-[12px] text-foreground leading-snug">Tue 2pm please</p>
      </UserMsg>
      <BotMsg>
        <p className="text-[12px] text-foreground leading-snug">Confirmed! Calendar invite sent.</p>
      </BotMsg>
    </ChatWrapper>
  );
}

// Reservation Manager Illustration
function ReservationManagerIllustration() {
  return (
    <ChatWrapper>
      <UserMsg avatar="/images/avatars/face-3.jpg">
        <p className="text-[12px] text-foreground leading-snug">Table for 4, Saturday 7pm?</p>
      </UserMsg>
      <BotMsg>
        <p className="text-[12px] text-foreground leading-snug">Let me check availability...</p>
        <div className="mt-1.5 p-1.5 bg-surface rounded border border-border">
          <p className="text-[10px] font-medium text-foreground">Reservation Confirmed</p>
          <p className="text-[9px] text-muted-foreground">Sat, Jan 11 at 7:00 PM - 4 guests</p>
        </div>
      </BotMsg>
      <UserMsg avatar="/images/avatars/face-3.jpg">
        <p className="text-[12px] text-foreground leading-snug">Can we get a window seat?</p>
      </UserMsg>
    </ChatWrapper>
  );
}

// Lead Qualification Illustration
function LeadQualificationIllustration() {
  return (
    <ChatWrapper>
      <BotMsg>
        <p className="text-[12px] text-foreground leading-snug">Welcome! What brings you here today?</p>
        <div className="mt-1.5 flex flex-wrap gap-1">
          {["Pricing", "Demo", "Enterprise"].map((opt, i) => (
            <span key={i} className="px-2 py-0.5 rounded-full bg-muted text-[10px] text-foreground/80 font-medium">{opt}</span>
          ))}
        </div>
      </BotMsg>
      <UserMsg avatar="/images/avatars/face-4.jpg">
        <p className="text-[12px] text-foreground leading-snug">I'm interested in the enterprise plan</p>
      </UserMsg>
      <BotMsg>
        <p className="text-[12px] text-foreground leading-snug">Great! What's your team size and monthly volume?</p>
      </BotMsg>
    </ChatWrapper>
  );
}

// Returns & Exchanges Illustration
function ReturnsExchangesIllustration() {
  return (
    <ChatWrapper>
      <UserMsg avatar="/images/avatars/face-5.jpg">
        <p className="text-[12px] text-foreground leading-snug">Need to return order #4821</p>
      </UserMsg>
      <BotMsg>
        <p className="text-[12px] text-foreground leading-snug">I can help! What's the reason?</p>
        <div className="mt-1.5 flex flex-wrap gap-1">
          {["Wrong size", "Defective", "Changed mind"].map((opt, i) => (
            <span key={i} className="px-2 py-0.5 rounded-full bg-muted text-[10px] text-foreground/80 font-medium">{opt}</span>
          ))}
        </div>
      </BotMsg>
      <UserMsg avatar="/images/avatars/face-5.jpg">
        <p className="text-[12px] text-foreground leading-snug">Wrong size</p>
      </UserMsg>
    </ChatWrapper>
  );
}

// 24/7 Support Illustration
function SupportAgentIllustration() {
  return (
    <ChatWrapper>
      <UserMsg avatar="/images/avatars/face-6.jpg">
        <p className="text-[12px] text-foreground leading-snug">I can't log into my account</p>
      </UserMsg>
      <BotMsg>
        <p className="text-[12px] text-foreground leading-snug">I'll help you right away! Let me verify your identity.</p>
      </BotMsg>
      <UserMsg avatar="/images/avatars/face-6.jpg">
        <p className="text-[12px] text-foreground leading-snug">Email is sarah@example.com</p>
      </UserMsg>
      <BotMsg>
        <p className="text-[12px] text-foreground leading-snug">Password reset link sent! Check your inbox.</p>
      </BotMsg>
    </ChatWrapper>
  );
}

// Product Enquiry Illustration
function ProductEnquiryIllustration() {
  return (
    <ChatWrapper>
      <UserMsg avatar="/images/avatars/face-7.jpg">
        <p className="text-[12px] text-foreground leading-snug">Show me products under $100</p>
      </UserMsg>
      <BotMsg>
        <p className="text-[12px] text-foreground leading-snug">Here are our top picks!</p>
        <div className="grid grid-cols-2 gap-1 mt-1.5">
          {[
            { name: "Sneakers", price: "$89", img: "/images/products/sneakers.jpg" },
            { name: "Backpack", price: "$49", img: "/images/products/backpack.jpg" },
          ].map((item, i) => (
            <div key={i} className="bg-surface rounded p-1.5 text-center">
              <div className="w-full h-14 rounded bg-muted overflow-hidden mb-1">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <p className="text-[9px] text-muted-foreground">{item.name}</p>
              <p className="text-[9px] font-semibold text-foreground">{item.price}</p>
            </div>
          ))}
        </div>
      </BotMsg>
    </ChatWrapper>
  );
}

// FAQ Agent Illustration
function FAQAgentIllustration() {
  return (
    <ChatWrapper>
      <UserMsg avatar="/images/avatars/face-8.jpg">
        <p className="text-[12px] text-foreground leading-snug">What's your return policy?</p>
      </UserMsg>
      <BotMsg>
        <p className="text-[12px] text-foreground leading-snug">We offer a 30-day hassle-free return policy. Here's a quick summary:</p>
        <div className="mt-1.5 space-y-1">
          {["Full refund within 30 days", "Free return shipping", "Instant exchange available"].map((item, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <svg className="w-3 h-3 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <p className="text-[10px] text-muted-foreground">{item}</p>
            </div>
          ))}
        </div>
      </BotMsg>
    </ChatWrapper>
  );
}

// Technical Support Illustration
function TechSupportIllustration() {
  return (
    <ChatWrapper>
      <UserMsg avatar="/images/avatars/face-9.jpg">
        <p className="text-[12px] text-foreground leading-snug">My app keeps crashing on startup</p>
      </UserMsg>
      <BotMsg>
        <p className="text-[12px] text-foreground leading-snug">Let me help troubleshoot. Try these steps:</p>
        <div className="mt-1.5 space-y-1">
          {["1. Clear app cache", "2. Update to v3.2.1", "3. Restart device"].map((step, i) => (
            <p key={i} className="text-[10px] text-muted-foreground bg-surface rounded px-2 py-1">{step}</p>
          ))}
        </div>
      </BotMsg>
      <UserMsg avatar="/images/avatars/face-9.jpg">
        <p className="text-[12px] text-foreground leading-snug">Step 2 fixed it! Thanks!</p>
      </UserMsg>
    </ChatWrapper>
  );
}

const useCases: UseCase[] = [
  {
    title: "Order management agent",
    tags: ["eCommerce", "Retail", "Logistics"],
    description: "Track orders, modify purchases, process refunds and handle all order-related queries automatically.",
    illustration: <OrderManagementIllustration />,
  },
  {
    title: "Booking assistant",
    tags: ["Health", "Education", "Services"],
    description: "Schedule appointments, manage travel reservations, and handle service bookings with ease.",
    illustration: <BookingAssistantIllustration />,
  },
  {
    title: "Reservation manager",
    tags: ["Hospitality", "Food & dining", "Events"],
    description: "Handle restaurant reservations, modifications, and cancellations seamlessly.",
    illustration: <ReservationManagerIllustration />,
  },
  {
    title: "Lead qualification agent",
    tags: ["Sales", "B2B", "SaaS"],
    description: "Identify and qualify potential customers through smart conversational flows that capture intent and route high-value leads.",
    illustration: <LeadQualificationIllustration />,
  },
  {
    title: "Returns & exchanges assistant",
    tags: ["eCommerce", "Retail", "Fashion"],
    description: "Handle return policies, exchange requests, and refund processing with clear, step-by-step guidance.",
    illustration: <ReturnsExchangesIllustration />,
  },
  {
    title: "24/7 support agent",
    tags: ["All industries", "Customer service"],
    description: "Handle account inquiries, password resets, and general support queries around the clock.",
    illustration: <SupportAgentIllustration />,
  },
  {
    title: "Product enquiry agent",
    tags: ["eCommerce", "Retail", "Consumer"],
    description: "Help customers discover products with personalized recommendations based on preferences and needs.",
    illustration: <ProductEnquiryIllustration />,
  },
  {
    title: "FAQ agent",
    tags: ["All industries", "Support"],
    description: "Instantly answer common questions about products, policies, and services with accurate, detailed responses.",
    illustration: <FAQAgentIllustration />,
  },
  {
    title: "Technical support agent",
    tags: ["SaaS", "Technology", "Electronics"],
    description: "Provide setup guidance, troubleshooting steps, and issue resolution for technical products.",
    illustration: <TechSupportIllustration />,
  },
];

export default function ChatUseCases() {
  return (
    <section className="bg-background border-t border-border py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-8">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">~</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>use cases</span>
          <span className="flex-1 border-t border-dashed border-border" />
        </div>
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.04] tracking-[-0.035em] text-foreground mb-4">
          AI chat agents for every
          <br />
          customer interaction
        </h2>
        <p className="text-muted-foreground max-w-2xl  mb-10 md:mb-14">
          From automating routine queries to delighting customers with instant support, deploy AI agents that handle it all.
        </p>

        {/* Use Cases Grid - 3 columns */}
        <div className="grid gap-x-6 gap-y-14 sm:gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase, index) => (
            <div key={index} className="group">
              <div className="mb-4 overflow-hidden rounded-xl border border-border transition-all">
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
    </section>
  );
}
