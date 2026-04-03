"use client";

import { useState, useEffect } from "react";


interface LeverJob {
  id: string;
  text: string;
  categories: {
    team?: string;
    location?: string;
    department?: string;
  };
  hostedUrl: string;
}

const perks = [
  {
    title: "Dynamic Work Environment",
    desc: "Fast-paced culture emphasizing innovation and high ownership across every team.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "Competitive Compensation",
    desc: "Market-aligned salary packages designed to attract and retain the best talent.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Tech-First Culture",
    desc: "Work with cutting-edge technology - from AI agents to global communications infrastructure.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    title: "Healthcare & Wellness",
    desc: "Comprehensive medical coverage to keep you and your family healthy and secure.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    title: "Transparent Culture",
    desc: "Feedback-driven environment with emphasis on trust, ownership, and open communication.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
];

export default function JobsPage() {
  const [jobs, setJobs] = useState<LeverJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationFilter, setLocationFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  useEffect(() => {
    fetch("https://api.lever.co/v0/postings/plivo?mode=json")
      .then((res) => res.json())
      .then((data: LeverJob[]) => {
        setJobs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const locations = Array.from(
    new Set(jobs.map((j) => j.categories.location).filter(Boolean))
  ) as string[];
  const departments = Array.from(
    new Set(jobs.map((j) => j.categories.team || j.categories.department).filter(Boolean))
  ) as string[];

  const filteredJobs = jobs.filter((j) => {
    const loc = locationFilter === "all" || j.categories.location === locationFilter;
    const dept =
      departmentFilter === "all" ||
      j.categories.team === departmentFilter ||
      j.categories.department === departmentFilter;
    return loc && dept;
  });

  const groupedJobs: Record<string, LeverJob[]> = {};
  filteredJobs.forEach((j) => {
    const dept = j.categories.team || j.categories.department || "Other";
    if (!groupedJobs[dept]) groupedJobs[dept] = [];
    groupedJobs[dept].push(j);
  });

  return (
    <>
      {/* Hero */}
      <section className="bg-white pt-16 sm:pt-20 md:pt-24 pb-0">
        <div className="container mx-auto max-w-7xl px-4 text-center mb-8 sm:mb-10">
          <h1 className="font-sora text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-normal leading-[1.1] tracking-[-0.02em] text-black mb-5">
            Come build the future of
            <br className="hidden sm:block" />
            {" "}Agentic AI with us
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-4">
            Plivo is redefining customer engagement through intelligent, autonomous conversations at global scale - handling over one billion API requests monthly.
          </p>
          <p className="text-black text-base sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            We're a 100+ person team with offices in India and the US, backed by Andreessen Horowitz, Battery Ventures, Qualcomm Ventures, and Y Combinator.
          </p>
        </div>
        <img
          src="/images/jobs-hero.avif"
          alt="Plivo team"
          className="w-full h-auto object-cover"
        />
      </section>

      {/* Company Overview */}
      <section className="bg-gray-50 py-12 lg:py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black mb-4">
              Our Journey
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Plivo began in 2011 offering programmable voice and messaging APIs, evolving into a Communications Platform as a Service (CPaaS) leader. Now we're building the next frontier - autonomous communication agents that handle complex customer interactions at scale. Profitable since 2015, we're backed by Andreessen Horowitz, Battery Ventures, Qualcomm Ventures, and Y Combinator. We're a 100+ person team with offices in India and the US.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
              {[
                { value: "2011", label: "Plivo Founded" },
                { value: "2015", label: "Profitable Since" },
                { value: "190+", label: "Countries Served" },
                { value: "02", label: "Countries Located" },
                { value: "1B+", label: "API Requests / month" },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className={`flex flex-col items-center justify-center px-4 py-8 sm:py-10 ${
                    index < 4 ? "border-r border-gray-200" : ""
                  } ${index >= 2 ? "border-t sm:border-t lg:border-t-0 border-gray-200" : ""} ${index >= 3 ? "border-t lg:border-t-0 border-gray-200" : ""}`}
                >
                  <div className="text-2xl sm:text-3xl font-semibold text-black mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="bg-white py-12 lg:py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black text-center mb-3">
            Perks & Benefits
          </h2>
          <p className="text-gray-600 text-base max-w-xl mx-auto text-center mb-10">
            We invest in our people so they can do their best work.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {perks.map((perk) => (
              <div
                key={perk.title}
                className="bg-gray-50 rounded-lg p-5"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white text-[#323dfe] border border-gray-200 mb-3">
                  {perk.icon}
                </div>
                <h3 className="font-inter text-sm font-semibold text-black mb-1.5">
                  {perk.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="bg-white py-12 lg:py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black text-center mb-3">
            Open Positions
          </h2>
          <p className="text-gray-600 text-base max-w-xl mx-auto text-center mb-8">
            Find your next role and help shape the future of AI-powered communication.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-gray-500"
            >
              <option value="all">All locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-gray-500"
            >
              <option value="all">All departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          {/* Job Listings */}
          {loading ? (
            <div className="text-center py-10">
              <div className="inline-block w-6 h-6 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
              <p className="text-sm text-gray-500 mt-2">Loading positions...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-sm text-gray-500">No open positions match your filters. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedJobs).map(([dept, deptJobs]) => (
                <div key={dept}>
                  <h3 className="font-inter text-base font-semibold text-black mb-3 px-1">
                    {dept}
                  </h3>
                  <div className="space-y-2">
                    {deptJobs.map((job) => (
                      <a
                        key={job.id}
                        href={job.hostedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between bg-white rounded-lg border border-gray-200 px-5 py-4 hover:border-gray-300 transition-colors group"
                      >
                        <div>
                          <span className="text-sm font-medium text-black group-hover:text-[#323dfe] transition-colors">
                            {job.text}
                          </span>
                          {job.categories.location && (
                            <span className="ml-3 inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600">
                              {job.categories.location}
                            </span>
                          )}
                        </div>
                        <span className="text-sm font-medium text-[#323dfe] flex-shrink-0 ml-4">
                          Apply →
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Pre-Footer CTA */}
      <section className="relative overflow-hidden bg-white py-12 sm:py-16 md:py-20">
        <div className="pointer-events-none absolute inset-0 z-[1]" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: 'center center' }} />
        <div className="container relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 text-center">
          <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black">
            Don't see a role that fits?
          </h2>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-gray-600 mt-3">
            We're always looking for talented individuals. Reach out and tell us how you'd contribute.
          </p>
          <a
            href="/contact/sales/"
            className="inline-flex items-center justify-center rounded-md bg-black px-8 py-3 text-base font-medium text-white transition-colors cta-hover-gradient mt-6"
          >
            Get in touch
          </a>
        </div>
      </section>
    </>
  );
}
