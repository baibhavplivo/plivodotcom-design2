"use client";

import { useState, useRef, useEffect } from "react";
import { CalendarPlus, Headphones, CheckSquare, CreditCard, CornerDownLeft, ChevronDown } from "lucide-react";

const AGENT_TEMPLATES = [
  {
    icon: CalendarPlus,
    label: "Appointment Booking Agent",
    prompt: "Create a voice AI agent that handles appointment scheduling for a dental clinic. It should check availability, book appointments, send confirmations, and handle rescheduling requests.",
  },
  {
    icon: Headphones,
    label: "Customer Support Agent",
    prompt: "Build a customer support agent for an e-commerce store that can handle order status inquiries, process returns, answer product questions, and escalate complex issues to human agents.",
  },
  {
    icon: CheckSquare,
    label: "Lead Qualification Agent",
    prompt: "Create a lead qualification agent that asks discovery questions, scores leads based on budget and timeline, captures contact information, and schedules follow-up calls with sales reps.",
  },
  {
    icon: CreditCard,
    label: "Payment Reminder Agent",
    prompt: "Build a payment reminder agent that calls customers about overdue invoices, offers payment plan options, processes payments over the phone, and sends confirmation receipts.",
  },
];

const BasicAIChatInput = () => {
  const [prompt, setPrompt] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const typingRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cleanup typing animation on unmount
  useEffect(() => {
    return () => {
      if (typingRef.current) {
        clearInterval(typingRef.current);
      }
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTemplateClick = (templatePrompt: string) => {
    // Close dropdown on mobile
    setIsDropdownOpen(false);

    // Clear any existing typing animation
    if (typingRef.current) {
      clearInterval(typingRef.current);
    }

    // Reset prompt and start typing animation
    setPrompt("");
    setIsTyping(true);

    let charIndex = 0;
    const typeSpeed = 15; // milliseconds per character

    typingRef.current = setInterval(() => {
      if (charIndex < templatePrompt.length) {
        setPrompt(templatePrompt.substring(0, charIndex + 1));
        charIndex++;
      } else {
        // Typing complete
        if (typingRef.current) {
          clearInterval(typingRef.current);
        }
        setIsTyping(false);
      }
    }, typeSpeed);
  };

  const handleSubmit = () => {
    // Navigate to cx.plivo.com with the prompt
    window.open("https://cx.plivo.com/", "_blank");
  };

  return (
    <div className="flex w-full flex-col items-center gap-3 sm:gap-4">
      {/* Bot Icon + Heading */}
      <div className="flex flex-col items-center gap-1.5 sm:gap-2">
        <img src="/images/buddy.svg" alt="AI Agent" className="h-8 sm:h-10 w-auto" />
        <h3 className="text-sm sm:text-base font-medium text-black/90">Start building your Agent</h3>
      </div>

      {/* Text Input */}
      <div className="relative w-full">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what you need and let AI build it for you"
          className="min-h-[90px] sm:min-h-[110px] w-full resize-none rounded-lg border border-gray-200 bg-white p-3 sm:p-4 pr-12 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-300 focus:outline-none focus:ring-0"
        />
        <button
          onClick={handleSubmit}
          className="absolute bottom-[18px] right-3 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-md bg-gray-800 text-white transition-colors hover:bg-gray-700"
        >
          <CornerDownLeft className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
        </button>
      </div>

      {/* Template Buttons - Grid on desktop */}
      <div className="hidden sm:grid w-full grid-cols-2 gap-2.5">
        {AGENT_TEMPLATES.map((template) => {
          const Icon = template.icon;
          return (
            <button
              key={template.label}
              onClick={() => handleTemplateClick(template.prompt)}
              disabled={isTyping}
              className={`flex items-center gap-2.5 rounded-full border border-gray-200 bg-white px-4 py-2 text-left transition-all ${
                isTyping ? "opacity-50 cursor-not-allowed" : "hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <Icon className="h-4 w-4 flex-shrink-0 text-[#323DFE]" />
              <span className="text-sm font-medium text-gray-600 truncate">{template.label}</span>
            </button>
          );
        })}
      </div>

      {/* Template Dropdown - Mobile only */}
      <div className="relative w-full sm:hidden" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          disabled={isTyping}
          className={`flex w-full items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-left transition-all ${
            isTyping ? "opacity-50 cursor-not-allowed" : "hover:border-gray-300"
          }`}
        >
          <span className="text-xs font-medium text-gray-500">Select a template to get started</span>
          <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
        </button>

        {/* Dropdown menu - opens downward */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 rounded-lg border border-gray-200 bg-white py-1 shadow-lg z-50">
            {AGENT_TEMPLATES.map((template) => {
              const Icon = template.icon;
              return (
                <button
                  key={template.label}
                  onClick={() => handleTemplateClick(template.prompt)}
                  className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left transition-colors hover:bg-gray-50"
                >
                  <Icon className="h-4 w-4 flex-shrink-0 text-[#323DFE]" />
                  <span className="text-xs font-medium text-gray-700">{template.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicAIChatInput;
