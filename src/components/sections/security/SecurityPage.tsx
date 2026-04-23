"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";


type SectionId =
  | "physical-security"
  | "infrastructure-security"
  | "application-security"
  | "data-security"
  | "payment-security"
  | "compliance";

const sections: { id: SectionId; label: string }[] = [
  { id: "physical-security", label: "Physical security" },
  { id: "infrastructure-security", label: "Infrastructure security" },
  { id: "application-security", label: "Application security" },
  { id: "data-security", label: "Data security & privacy" },
  { id: "payment-security", label: "Payment security" },
  { id: "compliance", label: "Compliance" },
];

const complianceCerts = [
  {
    name: "GDPR",
    logo: "/images/compliance/GDPR black.svg",
    description:
      "Plivo systems are compliant with the data protection principles of the European Union's General Data Protection Regulation.",
  },
  {
    name: "SOC 2 certified",
    logo: "/images/compliance/AICPA black.svg",
    description:
      "Plivo is SOC 2 certified. Our SOC 3 report provides more details.",
    link: "/docs/Plivo_SOC3_Report.pdf",
    linkText: "Read report",
  },
  {
    name: "HIPAA / HITECH compliant",
    logo: "/images/compliance/HIPAA black.svg",
    description:
      "Plivo is willing to sign a Business Associate Agreement for customers who handle protected health information (PHI). We're audited annually by an independent auditor.",
  },
  {
    name: "PCI DSS Level 1",
    logo: "/images/compliance/PCI black.svg",
    description:
      "Plivo is certified compliant with PCI DSS Level 1. We're audited annually by an independent auditor.",
  },
  {
    name: "CSA STAR Level 1",
    logo: "/images/compliance/Star Black.svg",
    description:
      "Plivo has completed the CSA STAR Level 1 self-assessment, demonstrating transparency and adherence to cloud security controls.",
    link: "/docs/Plivo_SOC3_Report.pdf",
    linkText: "View listing",
  },
  {
    name: "Data privacy framework",
    logo: "/images/compliance/DPF Framework logo.svg",
    description:
      "Plivo participates in the EU\u2013U.S. Data Privacy Framework (DPF). The DPF allows personal data to flow from the EU to certified U.S. companies without extra contractual safeguards. Participating companies must follow core privacy principles and provide redress mechanisms while limiting U.S. intelligence access.",
  },
];

const CheckIcon = () => (
  <svg className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function SecurityPage() {
  const [activeSection, setActiveSection] = useState<SectionId>("physical-security");
  const [sidebarStyle, setSidebarStyle] = useState<React.CSSProperties>({});
  const sidebarWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll spy + sticky sidebar
  useEffect(() => {
    const handleScrollAndResize = () => {
      // Scroll spy
      const sectionIds = sections.map((s) => s.id);
      let current: SectionId = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            current = id;
          }
        }
      }
      setActiveSection(current);

      // Sticky sidebar via manual fixed positioning
      if (window.innerWidth >= 1024 && sidebarWrapperRef.current && contentRef.current) {
        const wrapperRect = sidebarWrapperRef.current.getBoundingClientRect();
        const contentRect = contentRef.current.getBoundingClientRect();
        const topThreshold = 125;

        if (wrapperRect.top <= topThreshold && contentRect.bottom > 300) {
          setSidebarStyle({
            position: "fixed",
            top: `${topThreshold}px`,
            left: `${wrapperRect.left}px`,
            width: "220px",
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
    handleScrollAndResize();
    return () => {
      window.removeEventListener("scroll", handleScrollAndResize);
      window.removeEventListener("resize", handleScrollAndResize);
    };
  }, []);

  const scrollToSection = (id: SectionId) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-background border-t border-border pt-16 sm:pt-20 md:pt-24 pb-12">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h1 className="font-sora text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-normal leading-[1.1] tracking-[-0.02em] text-foreground mb-4">
            Secure cloud communications
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl">
            We employ security best practices and policies to ensure that our network is secured physically and virtually, and that our customers' data and payment information are both private and secure.
          </p>
        </div>
      </section>

      {/* Security Pillars */}
      <section className="relative py-12 lg:py-16 overflow-hidden bg-background border-t border-border">
        <div className="pointer-events-none absolute inset-0 z-[1]" style={{ maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)", backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }} />
        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                title: "Physical security",
                desc: "State-of-the-art on-premises security for all of our distributed computing and storage networks worldwide.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                  </svg>
                ),
              },
              {
                title: "Network security",
                desc: "All data entering and leaving Plivo is encrypted with TLS/HTTPS.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                ),
              },
              {
                title: "Application security",
                desc: "Encryption and authentication for secure and efficient access of Plivo's APIs.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                ),
              },
              {
                title: "Data security",
                desc: "Backup encryption and account access limitations to mitigate risk and threats to our customer data.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                  </svg>
                ),
              },
              {
                title: "Payment security",
                desc: "Use of leading industry transaction processing vendors to protect all transactions and payment information.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                  </svg>
                ),
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="bg-background rounded-lg border border-border p-5 text-center"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-surface text-primary mb-3">
                  {pillar.icon}
                </div>
                <h3 className="font-inter text-sm font-semibold text-foreground mb-1.5">
                  {pillar.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two-Column Detail Sections */}
      <section className="bg-background border-t border-border py-12 lg:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-10 lg:items-start">
            {/* Sidebar Nav Wrapper */}
            <div ref={sidebarWrapperRef} className="hidden lg:block">
              <nav className="bg-background z-30" style={sidebarStyle}>
                <p className="text-sm font-medium text-foreground/80 mb-3">Sections</p>
                <ul className="space-y-1">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <button
                        onClick={() => scrollToSection(s.id)}
                        className={cn(
                          "w-full text-left px-3 py-2 text-sm transition-colors border-l-2",
                          activeSection === s.id
                            ? "border-primary text-primary font-medium"
                            : "border-transparent text-muted-foreground hover:border-border-strong hover:text-foreground"
                        )}
                      >
                        {s.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Content */}
            <div ref={contentRef} className="space-y-10">
              {/* Physical Security */}
              <div id="physical-security" className="rounded-xl border border-border p-6">
                <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-8">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">~</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>security page</span>
          <span className="flex-1 border-t border-dashed border-border" />
        </div>
        <h2 className="font-sora text-xl font-medium text-foreground mb-2">
                  Physical on-premises security
                </h2>
                <p className="text-sm text-muted-foreground mb-5">
                  State-of-the-art on-premises security for all of our distributed computing and storage networks worldwide.
                </p>
                <div className="space-y-4">
                  {[
                    {
                      title: "24/7 surveillance",
                      desc: "AWS provides dedicated 24/7 state-of-the-art electronic surveillance and physical security measures at all of our server locations, including foot patrols, security logs, and perimeter inspections.",
                    },
                    {
                      title: "Personnel authorization",
                      desc: "Only authorized Plivo personnel are granted access credentials to our data centers. Every access is also logged and reviewed to ensure that our systems are not breached by internal threats.",
                    },
                    {
                      title: "Security logs",
                      desc: "All activity on our servers are logged, and we review historical reports for system change tracking, security analysis, and compliance auditing.",
                    },
                    {
                      title: 'Infrastructure "Security of the Cloud"',
                      desc: "Plivo uses cloud storage and compute services from Amazon Web Services (AWS). AWS is responsible for the security of the cloud, i.e. protecting the infrastructure that runs all of the services offered in the AWS Cloud. Plivo is responsible for securing the application platform deployed in AWS.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <CheckIcon />
                      <div>
                        <span className="text-sm font-semibold text-foreground">{item.title}</span>
                        <p className="text-sm text-muted-foreground mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Infrastructure Security */}
              <div id="infrastructure-security" className="rounded-xl border border-border p-6">
                <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-8">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">~</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>security page</span>
          <span className="flex-1 border-t border-dashed border-border" />
        </div>
        <h2 className="font-sora text-xl font-medium text-foreground mb-2">
                  Infrastructure security & availability
                </h2>
                <p className="text-sm text-muted-foreground mb-5">
                  Redundant, distributed infrastructure designed for maximum uptime and rapid failover.
                </p>
                <div className="space-y-4">
                  {[
                    {
                      title: "Annual penetration tests",
                      desc: "Our infrastructure, web applications, and APIs are penetration tested annually by external independent parties, and any vulnerabilities found are fixed.",
                    },
                    {
                      title: "Full redundancy",
                      desc: "Redundant links reroute traffic over backup networks in less than two seconds in case of backbone failover.",
                    },
                    {
                      title: "HVAC and power stability",
                      desc: "All of our facilities offer 100% power and HVAC functionality in any given month.",
                    },
                    {
                      title: "Optimized load balancing",
                      desc: "We distribute workloads across multiple resources to optimize response times, maximize throughput, and avoid single points of failure.",
                    },
                    {
                      title: "Carrier redundancy",
                      desc: "We aim to connect to multiple carriers in each country. At a minimum, we connect to at least two local carriers in each country.",
                    },
                    {
                      title: "Clustered and distributed infrastructure",
                      desc: "We use automated systems to deploy new code to clusters in real time to ensure smooth transitions between software updates with no downtime.",
                    },
                    {
                      title: "Network firewalls",
                      desc: "Defensive systems embedded at multiple points and layers across the infrastructure and server environment work to protect our systems from unauthorized, potentially harmful, malicious, and problematic traffic and input.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <CheckIcon />
                      <div>
                        <span className="text-sm font-semibold text-foreground">{item.title}</span>
                        <p className="text-sm text-muted-foreground mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Application Security */}
              <div id="application-security" className="rounded-xl border border-border p-6">
                <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-8">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">~</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>security page</span>
          <span className="flex-1 border-t border-dashed border-border" />
        </div>
        <h2 className="font-sora text-xl font-medium text-foreground mb-2">
                  Application security
                </h2>
                <p className="text-sm text-muted-foreground mb-5">
                  Encryption and authentication for secure and efficient access of Plivo's APIs.
                </p>
                <div className="space-y-4">
                  {[
                    {
                      title: "Multifactor authentication (MFA)",
                      desc: "To prevent unauthorized account access, each session requires the account username and a strong passphrase for access to each Plivo account. We also require phone number verification delivered through an SMS text message or a voice call.",
                    },
                    {
                      title: "Authentication IDs and tokens",
                      desc: "We employ unique Authentication IDs and Authentication tokens for every user to ensure that only authorized people have access to accounts.",
                    },
                    {
                      title: "TLS encryption",
                      desc: "All web session traffic between customer applications and Plivo is encrypted using TLS (transport layer security). All data entering or leaving Plivo infrastructure is encrypted with TLS/HTTPS.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <CheckIcon />
                      <div>
                        <span className="text-sm font-semibold text-foreground">{item.title}</span>
                        <p className="text-sm text-muted-foreground mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Security */}
              <div id="data-security" className="rounded-xl border border-border p-6">
                <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-8">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">~</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>security page</span>
          <span className="flex-1 border-t border-dashed border-border" />
        </div>
        <h2 className="font-sora text-xl font-medium text-foreground mb-2">
                  Data security & privacy
                </h2>
                <p className="text-sm text-muted-foreground mb-5">
                  Backup encryption and account access limitations to mitigate risk and threats to our customer data.
                </p>
                <div className="space-y-4">
                  {[
                    {
                      title: "Customer data protection",
                      desc: "Plivo provides logical tenant separation, encryption in transit (TLS 1.2 or greater) and encryption at rest (256-bit Advanced Encryption Standard (AES-256)).",
                    },
                    {
                      title: "Limited data access",
                      desc: "Administrative access privileges within the production environment are restricted to authorized personnel. Only Plivo employees who require customer data access as part of their job functions are permitted to access customer data.",
                    },
                    {
                      title: "Backup encryption",
                      desc: "We perform regular backups on all Plivo customer data. All backups are stored redundantly and are encrypted using AES-256.",
                    },
                    {
                      title: "Mobile device management (MDM)",
                      desc: "All laptop devices issued to Plivo employees come with encrypted storage partitions and MDM software. We have the ability to remotely wipe a device in the event of it being lost or stolen.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <CheckIcon />
                      <div>
                        <span className="text-sm font-semibold text-foreground">{item.title}</span>
                        <p className="text-sm text-muted-foreground mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Security */}
              <div id="payment-security" className="rounded-xl border border-border p-6">
                <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-8">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">~</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>security page</span>
          <span className="flex-1 border-t border-dashed border-border" />
        </div>
        <h2 className="font-sora text-xl font-medium text-foreground mb-2">
                  Payment security
                </h2>
                <p className="text-sm text-muted-foreground mb-5">
                  Use of leading industry transaction processing vendors to protect all transactions and payment information.
                </p>
                <div className="space-y-4">
                  {[
                    {
                      title: "Payment encryption",
                      desc: "We don't store any credit card information on our servers. Instead, all credit card information is encrypted using AES-256 and handled by our payment platform provider.",
                    },
                    {
                      title: "PCI compliance",
                      desc: "Our payment platform provider is PCI DSS (Payment Card Industry Data Security Standard) compliant.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <CheckIcon />
                      <div>
                        <span className="text-sm font-semibold text-foreground">{item.title}</span>
                        <p className="text-sm text-muted-foreground mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compliance */}
              <div id="compliance" className="rounded-xl border border-border p-6">
                <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-8">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">~</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>security page</span>
          <span className="flex-1 border-t border-dashed border-border" />
        </div>
        <h2 className="font-sora text-xl font-medium text-foreground mb-2">
                  Compliance & certifications
                </h2>
                <p className="text-sm text-muted-foreground mb-5">
                  Plivo maintains the highest standards of compliance, validated through independent audits and certifications.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {complianceCerts.map((cert) => (
                    <div key={cert.name} className="bg-surface rounded-lg p-4">
                      <div className="flex items-start gap-4">
                        {cert.logo && (
                          <img src={cert.logo}
                            alt={cert.name}
                            className="w-12 h-12 object-contain flex-shrink-0 dark:invert"
                          />
                        )}
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-1">{cert.name}</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">{cert.description}</p>
                          {cert.link && (
                            <a
                              href={cert.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline mt-1.5"
                            >
                              {cert.linkText}
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Operational Transparency */}
              <div className="rounded-xl border border-border p-6">
                <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-8">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">~</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>security page</span>
          <span className="flex-1 border-t border-dashed border-border" />
        </div>
        <h2 className="font-sora text-xl font-medium text-foreground mb-2">
                  Operational transparency
                </h2>
                <p className="text-sm text-muted-foreground mb-5">
                  Transparent incident response and employee accountability across all operations.
                </p>
                <div className="space-y-4">
                  {[
                    {
                      title: "Transparent incident response",
                      desc: "We respond to priority 1 business-critical incidents around the clock, 365 days a year.",
                    },
                    {
                      title: "Privacy policy",
                      desc: "All Plivo employees are bound by Plivo's privacy policy.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <CheckIcon />
                      <div>
                        <span className="text-sm font-semibold text-foreground">{item.title}</span>
                        <p className="text-sm text-muted-foreground mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
