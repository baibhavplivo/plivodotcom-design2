import { Marquee } from "@/components/magicui/marquee";

const LOGOS = [
  { name: "Meta", src: "/images/logos/meta.svg", className: "h-6" },
  { name: "Uber", src: "/images/logos/uber.svg", className: "h-6" },
  { name: "Hoka", src: "/images/logos/hoka.svg", className: "h-5" },
  { name: "Discord", src: "/images/logos/discord.svg", className: "h-6" },
  { name: "DocuSign", src: "/images/logos/docusign.svg", className: "h-6" },
  { name: "Trip.com", src: "/images/logos/trip.svg", className: "h-6" },
  { name: "GoDaddy", src: "/images/logos/godaddy.svg", className: "h-6" },
  { name: "Atomberg", src: "/images/logos/atomberg.svg", className: "h-6" },
  { name: "Tata 1mg", src: "/images/logos/tata1mg.svg", className: "h-6" },
];

export default function ClientLogos() {
  return (
    <section className="bg-white py-6 sm:py-8 lg:py-10">
      <div
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 5%, rgba(0,0,0,0.4) 10%, rgba(0,0,0,0.7) 18%, rgba(0,0,0,0.9) 25%, black 35%, black 65%, rgba(0,0,0,0.9) 75%, rgba(0,0,0,0.7) 82%, rgba(0,0,0,0.4) 90%, rgba(0,0,0,0.15) 95%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 5%, rgba(0,0,0,0.4) 10%, rgba(0,0,0,0.7) 18%, rgba(0,0,0,0.9) 25%, black 35%, black 65%, rgba(0,0,0,0.9) 75%, rgba(0,0,0,0.7) 82%, rgba(0,0,0,0.4) 90%, rgba(0,0,0,0.15) 95%, transparent 100%)",
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
                className={`${logo.className} w-auto object-contain opacity-50 grayscale transition-opacity hover:opacity-80`}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
