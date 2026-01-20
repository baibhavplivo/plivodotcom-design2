const LOGOS = [
  { name: "Meta", src: "/images/logos/meta.svg" },
  { name: "Uber", src: "/images/logos/uber.svg" },
  { name: "Hoka", src: "/images/logos/hoka.svg" },
  { name: "Discord", src: "/images/logos/discord.svg" },
  { name: "DocuSign", src: "/images/logos/docusign.svg" },
  { name: "Trip.com", src: "/images/logos/trip.svg" },
  { name: "GoDaddy", src: "/images/logos/godaddy.svg" },
  { name: "Atomberg", src: "/images/logos/atomberg.svg" },
  { name: "Tata 1mg", src: "/images/logos/tata1mg.svg" },
];

export default function Logos() {
  return (
    <div className="relative overflow-hidden">
      {/* Constrained width to match hero video above */}
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="relative overflow-hidden py-6">
          <div className="flex w-full">
            {/* First marquee group */}
            <div className="animate-marquee flex shrink-0 items-center gap-14 pr-14">
              {LOGOS.map((logo, index) => (
                <div key={index} className="flex items-center justify-center">
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="h-5 w-auto max-w-[90px] object-contain"
                  />
                </div>
              ))}
            </div>
            {/* Second marquee group (duplicate for seamless loop) */}
            <div className="animate-marquee flex shrink-0 items-center gap-14 pr-14">
              {LOGOS.map((logo, index) => (
                <div key={`dup-${index}`} className="flex items-center justify-center">
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="h-5 w-auto max-w-[90px] object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
