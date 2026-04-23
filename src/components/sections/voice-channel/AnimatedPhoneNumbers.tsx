"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/magicui/animated-list";
import MeshGradient from "@/components/ui/mesh-gradient";

interface PhoneNumber {
  country: string;
  countryCode: string;
  number: string;
  city: string;
  flag: string;
}

const phoneNumbers: PhoneNumber[] = [
  {
    country: "IND",
    countryCode: "+91",
    number: "98XXX XXXXX",
    city: "New Delhi",
    flag: "🇮🇳",
  },
  {
    country: "UK",
    countryCode: "+44",
    number: "20 XXXX XXXX",
    city: "London",
    flag: "🇬🇧",
  },
  {
    country: "CA",
    countryCode: "+1",
    number: "(416) XXX XXXX",
    city: "Toronto, Ontario",
    flag: "🇨🇦",
  },
  {
    country: "DE",
    countryCode: "+49",
    number: "30 XXXX XXXX",
    city: "Berlin",
    flag: "🇩🇪",
  },
  {
    country: "US",
    countryCode: "+1",
    number: "(415) XXX XXXX",
    city: "San Francisco",
    flag: "🇺🇸",
  },
  {
    country: "AU",
    countryCode: "+61",
    number: "2 XXXX XXXX",
    city: "Sydney",
    flag: "🇦🇺",
  },
  {
    country: "JP",
    countryCode: "+81",
    number: "3 XXXX XXXX",
    city: "Tokyo",
    flag: "🇯🇵",
  },
  {
    country: "SG",
    countryCode: "+65",
    number: "XXXX XXXX",
    city: "Singapore",
    flag: "🇸🇬",
  },
  {
    country: "FR",
    countryCode: "+33",
    number: "1 XX XX XX XX",
    city: "Paris",
    flag: "🇫🇷",
  },
  {
    country: "BR",
    countryCode: "+55",
    number: "11 XXXXX XXXX",
    city: "São Paulo",
    flag: "🇧🇷",
  },
];

// Repeat for continuous animation
const allNumbers = Array.from({ length: 3 }, () => phoneNumbers).flat();

const PhoneNumberCard = ({
  country,
  countryCode,
  number,
  city,
  flag,
}: PhoneNumber) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[340px] cursor-pointer overflow-hidden rounded-lg px-4 py-3",
        "transition-all duration-300 ease-out hover:scale-[101%]",
        "bg-background shadow-[0_1px_3px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)]"
      )}
    >
      <div className="flex flex-row items-center gap-4">
        {/* Flag and Country Code */}
        <div className="flex items-center gap-2 min-w-[70px]">
          <span className="text-xl">{flag}</span>
          <span className="text-sm font-semibold text-foreground">{country}</span>
        </div>

        {/* Divider */}
        <div className="h-9 w-px bg-gray-200" />

        {/* Phone Number and City */}
        <div className="flex flex-col">
          <span className="text-base font-semibold text-muted-foreground tracking-wide">
            {countryCode} {number}
          </span>
          <span className="text-xs text-primary font-medium">{city}</span>
        </div>
      </div>
    </figure>
  );
};

export default function AnimatedPhoneNumbers({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col overflow-hidden rounded-lg",
        className
      )}
    >
      {/* Mesh Gradient Background */}
      <MeshGradient variant="default" blur="lg" opacity={0.8} className="rounded-lg" />

      {/* Content */}
      <div className="relative z-10 h-full py-8 px-4 flex flex-col">
        <AnimatedList delay={2000}>
          {allNumbers.map((item, idx) => (
            <PhoneNumberCard {...item} key={idx} />
          ))}
        </AnimatedList>
      </div>

      {/* Top fade */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-28 bg-gradient-to-b from-background/60 via-background/30 to-transparent" />

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 bg-gradient-to-t from-background/60 via-background/30 to-transparent" />
    </div>
  );
}
