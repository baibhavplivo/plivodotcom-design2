import { Marquee } from '@/components/magicui/marquee';

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
      <div className="text-center mb-4">
        <p className="text-[15px] font-normal text-gray-600 lg:text-[16px]">
          Trusted by 10,000+ startups and enterprises worldwide
        </p>
      </div>

      {/* Marquee with fade mask - darker in center, lighter at edges */}
      <div
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,0.7) 25%, black 40%, black 60%, rgba(0,0,0,0.7) 75%, rgba(0,0,0,0.3) 90%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,0.7) 25%, black 40%, black 60%, rgba(0,0,0,0.7) 75%, rgba(0,0,0,0.3) 90%, transparent 100%)',
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
              className="flex items-center justify-center shrink-0 w-[90px]"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className={`${logo.className} w-auto object-contain grayscale opacity-60 hover:opacity-90 transition-opacity`}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
