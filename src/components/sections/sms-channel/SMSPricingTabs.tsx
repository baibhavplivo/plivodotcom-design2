"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

type SectionId = "sms" | "mms" | "phone-numbers" | "add-ons" | "carrier-fees";

const sections: { id: SectionId; label: string }[] = [
  { id: "sms", label: "SMS" },
  { id: "mms", label: "MMS" },
  { id: "phone-numbers", label: "Phone Number Rental" },
  { id: "add-ons", label: "Add-On Services" },
  { id: "carrier-fees", label: "Carrier Surcharge Fees" },
];

// Country data
const countries = [
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "FR", name: "France", flag: "🇫🇷" },
];

export default function SMSPricingTabs() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("sms");
  const [sidebarStyle, setSidebarStyle] = useState<React.CSSProperties>({});
  const sidebarWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Handle sticky sidebar and scroll spy
  useEffect(() => {
    const handleScrollAndResize = () => {
      // Scroll spy for active section
      const sectionElements = sections.map(s => ({
        id: s.id,
        element: document.getElementById(s.id)
      }));

      for (const section of sectionElements) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom > 150) {
            setActiveSection(section.id);
            break;
          }
        }
      }

      // Sticky sidebar logic (only on desktop)
      if (window.innerWidth >= 1024 && sidebarWrapperRef.current && contentRef.current) {
        const wrapperRect = sidebarWrapperRef.current.getBoundingClientRect();
        const contentRect = contentRef.current.getBoundingClientRect();
        const topThreshold = 125; // navbar + subnav height + gap

        // Check if wrapper top is above threshold AND content is still visible
        if (wrapperRect.top <= topThreshold && contentRect.bottom > 300) {
          setSidebarStyle({
            position: 'fixed',
            top: `${topThreshold}px`,
            left: `${wrapperRect.left}px`,
            width: '256px',
          });
        } else {
          setSidebarStyle({});
        }
      } else {
        setSidebarStyle({});
      }
    };

    window.addEventListener("scroll", handleScrollAndResize);
    window.addEventListener("resize", handleScrollAndResize);
    handleScrollAndResize(); // Initial check
    return () => {
      window.removeEventListener("scroll", handleScrollAndResize);
      window.removeEventListener("resize", handleScrollAndResize);
    };
  }, []);

  const scrollToSection = (id: SectionId) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Account for fixed headers
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Hero Header */}
      <section className="bg-white pt-[56px] sm:pt-[64px] md:pt-[72px] pb-10">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center">
            <h1 className="font-sora text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-normal leading-[1.1] tracking-[-0.02em] text-black mb-4">
              SMS Pricing
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Competitive pay-as-you-go SMS pricing with add-on features included. Volume discounts as you scale.
            </p>
          </div>
        </div>
      </section>

      {/* Two Column Layout */}
      <section className="bg-white pb-12 lg:pb-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="lg:grid lg:grid-cols-[256px_1fr] lg:gap-8 lg:items-start">
            {/* Left Sidebar Wrapper - maintains layout space */}
            <div ref={sidebarWrapperRef} className="mb-8 lg:mb-0">
              {/* Sidebar content - becomes fixed on scroll */}
              <aside
                className="bg-white z-30"
                style={sidebarStyle}
              >
              {/* Country Selector */}
              <div className="relative mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Country</label>
                <button
                  onClick={() => setIsCountryOpen(!isCountryOpen)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                >
                  <span className="text-xl">{selectedCountry.flag}</span>
                  <span className="text-sm font-medium text-gray-900 flex-1 text-left">{selectedCountry.name}</span>
                  <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform", isCountryOpen && "rotate-180")} />
                </button>

                {isCountryOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-56 overflow-y-auto">
                    {countries.map((country) => (
                      <button
                        key={country.code}
                        onClick={() => {
                          setSelectedCountry(country);
                          setIsCountryOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left",
                          selectedCountry.code === country.code && "bg-[#323dfe]/5"
                        )}
                      >
                        <span className="text-xl">{country.flag}</span>
                        <span className="text-sm text-gray-900">{country.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Section Navigation */}
              <nav className="hidden lg:block">
                <p className="text-sm font-medium text-gray-700 mb-3">Jump to section</p>
                <ul className="space-y-1">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <button
                        onClick={() => scrollToSection(section.id)}
                        className={cn(
                          "w-full text-left px-3 py-2 text-sm transition-colors border-l-2",
                          activeSection === section.id
                            ? "border-[#323dfe] text-[#323dfe] font-medium"
                            : "border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900"
                        )}
                      >
                        {section.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
              </aside>
            </div>

            {/* Right Content - All Sections */}
            <div ref={contentRef} className="min-w-0">
            {/* SMS Section */}
            <div id="sms" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <SMSSection />
            </div>

            {/* MMS Section */}
            <div id="mms" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <MMSSection />
            </div>

            {/* Phone Numbers Section */}
            <div id="phone-numbers" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <PhoneNumbersSection />
            </div>

            {/* Add-Ons Section */}
            <div id="add-ons" className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <AddOnsSection />
            </div>

            {/* Carrier Fees Section */}
            <div id="carrier-fees" className="bg-white rounded-xl border border-gray-200 p-6">
              <CarrierFeesSection />
            </div>
          </div>
        </div>
      </div>
      </section>
    </>
  );
}

function SMSSection() {
  return (
    <div>
      <h2 className="font-inter text-xl font-semibold text-black mb-2">SMS Text Messages</h2>
      <p className="text-sm text-gray-500 mb-6">
        *Additional carrier surcharge fees applies to all inbound and outbound SMS usage rates.{" "}
        <button
          onClick={() => {
            const element = document.getElementById("carrier-fees");
            if (element) {
              const offset = 120;
              const top = element.getBoundingClientRect().top + window.scrollY - offset;
              window.scrollTo({ top, behavior: "smooth" });
            }
          }}
          className="text-[#323dfe] hover:underline"
        >
          View carrier surcharge fee
        </button>.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black">Route Type</th>
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black">To send SMS (Outbound)</th>
              <th className="py-3 text-left text-sm font-semibold text-black">To receive SMS (Inbound)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="py-3 pr-4 text-sm text-gray-900">Long Codes*</td>
              <td className="py-3 pr-4 text-sm font-medium text-black">$0.0070/sms</td>
              <td className="py-3 text-sm font-medium text-black">$0.0070/sms</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 text-sm text-gray-900">Toll-Free</td>
              <td className="py-3 pr-4 text-sm font-medium text-black">$0.0072/sms</td>
              <td className="py-3 text-sm font-medium text-black">$0.0072/sms</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 text-sm text-gray-900">Short Code*</td>
              <td className="py-3 pr-4 text-sm font-medium text-black">$0.0070/sms</td>
              <td className="py-3 text-sm font-medium text-black">$0.0070/sms</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MMSSection() {
  return (
    <div>
      <h2 className="font-inter text-xl font-semibold text-black mb-2">MMS Multimedia Messages</h2>
      <p className="text-sm text-gray-500 mb-6">
        *Additional carrier surcharge fees applies to all inbound and outbound MMS usage rates.{" "}
        <button
          onClick={() => {
            const element = document.getElementById("carrier-fees");
            if (element) {
              const offset = 120;
              const top = element.getBoundingClientRect().top + window.scrollY - offset;
              window.scrollTo({ top, behavior: "smooth" });
            }
          }}
          className="text-[#323dfe] hover:underline"
        >
          View carrier surcharge fee
        </button>.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black">Route Type</th>
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black">To send MMS (Outbound)</th>
              <th className="py-3 text-left text-sm font-semibold text-black">To receive MMS (Inbound)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="py-3 pr-4 text-sm text-gray-900">Long Codes*</td>
              <td className="py-3 pr-4 text-sm font-medium text-black">$0.0180/mms</td>
              <td className="py-3 text-sm font-medium text-black">$0.0180/mms</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 text-sm text-gray-900">Toll-Free Numbers</td>
              <td className="py-3 pr-4 text-sm font-medium text-black">$0.0180/mms</td>
              <td className="py-3 text-sm font-medium text-black">$0.0180/mms</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 text-sm text-gray-900">Short Code*</td>
              <td className="py-3 pr-4 text-sm font-medium text-black">$0.0180/mms</td>
              <td className="py-3 text-sm font-medium text-black">$0.0180/mms</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PhoneNumbersSection() {
  return (
    <div>
      <h2 className="font-inter text-xl font-semibold text-black mb-2">Phone Number Rental</h2>
      <p className="text-sm text-gray-500 mb-6">
        **All short codes have a $1,500 one-time fee charged at the time of purchase.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black">Route Type</th>
              <th className="py-3 text-left text-sm font-semibold text-black">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="py-3 pr-4 text-sm text-gray-900">Long Codes</td>
              <td className="py-3 text-sm font-medium text-black">$0.50/month</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 text-sm text-gray-900">Toll-Free Numbers</td>
              <td className="py-3 text-sm font-medium text-black">$1.00/month</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 text-sm text-gray-900 font-medium" colSpan={2}>
                Short Code <span className="text-gray-500 font-normal">Plus one-time setup fee**</span>
              </td>
            </tr>
            <tr>
              <td className="py-3 pr-4 text-sm text-gray-900 pl-4">Regular</td>
              <td className="py-3 text-sm font-medium text-black">$500/month (Billed quarterly)</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 text-sm text-gray-900 pl-4">Vanity</td>
              <td className="py-3 text-sm font-medium text-black">$1000/month (Billed quarterly)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AddOnsSection() {
  return (
    <div>
      <h2 className="font-inter text-xl font-semibold text-black mb-6">Add-On Services</h2>

      <div className="overflow-x-auto mb-8">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 pr-4 text-left text-sm font-semibold text-black">Service</th>
              <th className="py-3 text-left text-sm font-semibold text-black">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="py-3 pr-4 text-sm text-gray-900">Message Queueing</td>
              <td className="py-3 text-sm font-medium text-black">Included</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 text-sm text-gray-900">Powerpack</td>
              <td className="py-3 text-sm font-medium text-black">Included</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CarrierFeesSection() {
  return (
    <div className="space-y-10">
      <h2 className="font-inter text-xl font-semibold text-black">Additional Carrier Surcharge Fees</h2>

      {/* SMS Carrier Surcharge Fee */}
      <div>
        <h3 className="font-inter text-lg font-medium text-black mb-4">SMS Carrier Surcharge Fee</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 pr-4 text-left font-semibold text-black" rowSpan={2}>Carrier</th>
                <th className="py-2 px-2 text-center font-semibold text-black border-l border-gray-200" colSpan={2}>Long Codes</th>
                <th className="py-2 px-2 text-center font-semibold text-black border-l border-gray-200" colSpan={2}>Short Codes</th>
                <th className="py-2 px-2 text-center font-semibold text-black border-l border-gray-200" colSpan={2}>Toll-Free</th>
              </tr>
              <tr className="border-b border-gray-200">
                <th className="py-2 px-2 text-center text-xs font-medium text-gray-600 border-l border-gray-200">To send SMS</th>
                <th className="py-2 px-2 text-center text-xs font-medium text-gray-600">To receive SMS</th>
                <th className="py-2 px-2 text-center text-xs font-medium text-gray-600 border-l border-gray-200">To send SMS</th>
                <th className="py-2 px-2 text-center text-xs font-medium text-gray-600">To receive SMS</th>
                <th className="py-2 px-2 text-center text-xs font-medium text-gray-600 border-l border-gray-200">To send SMS</th>
                <th className="py-2 px-2 text-center text-xs font-medium text-gray-600">To receive SMS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-3 pr-4 text-gray-900">AT&T</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0030/sms</td>
                <td className="py-3 px-2 text-center">$0.0030/sms</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0030/sms</td>
                <td className="py-3 px-2 text-center text-gray-400">NA</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0030/sms</td>
                <td className="py-3 px-2 text-center">$0.0030/sms</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-gray-900">T-Mobile</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0045/sms</td>
                <td className="py-3 px-2 text-center">$0.0025/sms</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0045/sms</td>
                <td className="py-3 px-2 text-center">$0.0025/sms</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0045/sms</td>
                <td className="py-3 px-2 text-center">$0.0025/sms</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-gray-900">Verizon</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0040/sms</td>
                <td className="py-3 px-2 text-center text-gray-400">NA</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0040/sms</td>
                <td className="py-3 px-2 text-center text-gray-400">NA</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0040/sms</td>
                <td className="py-3 px-2 text-center text-gray-400">NA</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-gray-900">US Cellular & Other Carrier Networks</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0050/sms</td>
                <td className="py-3 px-2 text-center">$0.0025/sms</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0045/sms</td>
                <td className="py-3 px-2 text-center">$0.0025/sms</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0045/sms</td>
                <td className="py-3 px-2 text-center">$0.0025/sms</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* MMS Carrier Surcharge Fee */}
      <div>
        <h3 className="font-inter text-lg font-medium text-black mb-4">MMS Carrier Surcharge Fee</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 pr-4 text-left font-semibold text-black" rowSpan={2}>Carrier</th>
                <th className="py-2 px-2 text-center font-semibold text-black border-l border-gray-200" colSpan={2}>Long Codes</th>
                <th className="py-2 px-2 text-center font-semibold text-black border-l border-gray-200" colSpan={2}>Short Codes</th>
                <th className="py-2 px-2 text-center font-semibold text-black border-l border-gray-200" colSpan={2}>Toll-Free</th>
              </tr>
              <tr className="border-b border-gray-200">
                <th className="py-2 px-2 text-center text-xs font-medium text-gray-600 border-l border-gray-200">To send MMS</th>
                <th className="py-2 px-2 text-center text-xs font-medium text-gray-600">To receive MMS</th>
                <th className="py-2 px-2 text-center text-xs font-medium text-gray-600 border-l border-gray-200">To send MMS</th>
                <th className="py-2 px-2 text-center text-xs font-medium text-gray-600">To receive MMS</th>
                <th className="py-2 px-2 text-center text-xs font-medium text-gray-600 border-l border-gray-200">To send MMS</th>
                <th className="py-2 px-2 text-center text-xs font-medium text-gray-600">To receive MMS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-3 pr-4 text-gray-900">AT&T</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0075/mms</td>
                <td className="py-3 px-2 text-center">$0.0075/mms</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0075/mms</td>
                <td className="py-3 px-2 text-center text-gray-400">NA</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0075/mms</td>
                <td className="py-3 px-2 text-center">$0.0075/mms</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-gray-900">T-Mobile</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0100/mms</td>
                <td className="py-3 px-2 text-center">$0.0100/mms</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0100/mms</td>
                <td className="py-3 px-2 text-center">$0.0100/mms</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0100/mms</td>
                <td className="py-3 px-2 text-center">$0.0100/mms</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-gray-900">Verizon</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0065/mms</td>
                <td className="py-3 px-2 text-center text-gray-400">NA</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0065/mms</td>
                <td className="py-3 px-2 text-center text-gray-400">NA</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0065/mms</td>
                <td className="py-3 px-2 text-center text-gray-400">NA</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-gray-900">US Cellular & Other Carrier Networks</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0100/mms</td>
                <td className="py-3 px-2 text-center">$0.0100/mms</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0100/mms</td>
                <td className="py-3 px-2 text-center">$0.0100/mms</td>
                <td className="py-3 px-2 text-center border-l border-gray-100">$0.0100/mms</td>
                <td className="py-3 px-2 text-center">$0.0100/mms</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Network Pricing */}
      <div>
        <h3 className="font-inter text-lg font-medium text-black mb-4">Detailed Network Pricing — Outbound SMS</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 pr-4 text-left text-sm font-semibold text-black">Carrier Network</th>
                <th className="py-3 text-left text-sm font-semibold text-black">To Send SMS (Outbound)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-3 pr-4 text-sm text-gray-900">All Networks</td>
                <td className="py-3 text-sm font-medium text-black">$0.0070/sms</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
