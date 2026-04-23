import { Marquee } from "@/components/magicui/marquee";

const LOGOS = [
  { name: "Meta", src: "/images/logos/meta.svg", className: "h-7" },
  { name: "Uber", src: "/images/logos/uber.svg", className: "h-7" },
  { name: "Hoka", src: "/images/logos/hoka.svg", className: "h-5" },
  { name: "Discord", src: "/images/logos/discord.svg", className: "h-7" },
  { name: "DocuSign", src: "/images/logos/docusign.svg", className: "h-7" },
  { name: "Trip.com", src: "/images/logos/trip.svg", className: "h-7" },
  { name: "GoDaddy", src: "/images/logos/godaddy.svg", className: "h-7" },
  { name: "Atomberg", src: "/images/logos/atomberg.svg", className: "h-7" },
  { name: "Tata 1mg", src: "/images/logos/tata1mg.svg", className: "h-7" },
];

export default function Logos() {
  return (
    <div className="relative py-4 lg:py-6">
      {/* Heading */}
      <div className="mb-4 text-center">
        <p className="text-[15px] font-normal text-muted-foreground lg:text-[16px]">
          Trusted by 10,000+ startups and enterprises worldwide
        </p>
      </div>

      {/* Marquee with gradual fade mask on sides */}
      <div
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, hsl(var(--border)) 5%, rgba(0,0,0,0.4) 10%, rgba(0,0,0,0.7) 18%, rgba(0,0,0,0.9) 25%, black 35%, black 65%, rgba(0,0,0,0.9) 75%, rgba(0,0,0,0.7) 82%, rgba(0,0,0,0.4) 90%, hsl(var(--border)) 95%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, hsl(var(--border)) 5%, rgba(0,0,0,0.4) 10%, rgba(0,0,0,0.7) 18%, rgba(0,0,0,0.9) 25%, black 35%, black 65%, rgba(0,0,0,0.9) 75%, rgba(0,0,0,0.7) 82%, rgba(0,0,0,0.4) 90%, hsl(var(--border)) 95%, transparent 100%)",
        }}
      >
        <Marquee
          pauseOnHover
          repeat={4}
          className="[--duration:40s] [--gap:3.5rem]"
        >
          {LOGOS.map((logo) => (
            <div
              key={logo.name}
              className="flex w-[90px] shrink-0 items-center justify-center"
            >
              <img
                src={logo.src}
                alt={logo.name}
                width={90}
                height={32}
                className={`${logo.className} w-auto object-contain opacity-60 grayscale transition-opacity hover:opacity-90`}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
