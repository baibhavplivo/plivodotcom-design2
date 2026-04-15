"use client";

import { useEffect, useRef, useState } from "react";

interface CaseStudyScrollQuoteProps {
  quote: string;
  name: string;
  role: string;
  avatar?: string;
}

export default function CaseStudyScrollQuote({
  quote,
  name,
  role,
  avatar,
}: CaseStudyScrollQuoteProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Start highlighting early, complete when quote reaches vertical mid-screen
      const start = windowH * 0.95;
      const end = windowH * 0.5;
      const current = rect.top + rect.height / 2;

      if (current >= start) {
        setProgress(0);
      } else if (current <= end) {
        setProgress(1);
      } else {
        setProgress((start - current) / (start - end));
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const words = quote.split(" ");
  const totalWords = words.length;

  return (
    <section
      ref={sectionRef}
      className="py-10 sm:py-12 md:py-16 bg-white"
    >
      <div className="container mx-auto max-w-4xl px-4 text-center">
        {/* Quote */}
        <blockquote>
          <p className="font-sora text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] font-normal italic leading-[1.4] tracking-[-0.02em]">
            <span aria-hidden="true" className="select-none">&ldquo;</span>
            {words.map((word, i) => {
              const wordProgress = i / totalWords;
              const isHighlighted = wordProgress < progress;

              return (
                <span
                  key={i}
                  className="transition-colors duration-300"
                  style={{
                    color: isHighlighted ? "#000000" : "#d1d5db",
                  }}
                >
                  {word}{" "}
                </span>
              );
            })}
            <span aria-hidden="true" className="select-none">&rdquo;</span>
          </p>

          {/* Screen reader accessible full quote */}
          <p className="sr-only">&ldquo;{quote}&rdquo;</p>

          {/* Attribution */}
          <footer className="mt-8 flex flex-col items-center gap-3">
            {avatar ? (
              <img
                src={avatar}
                alt={name}
                className="w-14 h-14 rounded-full object-cover border border-gray-200"
              />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#323dfe] to-[#0f1117] text-white font-semibold text-lg">
                {name.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-gray-900">
                <cite className="not-italic">{name}</cite>
              </p>
              <p className="text-sm text-gray-500">{role}</p>
            </div>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
