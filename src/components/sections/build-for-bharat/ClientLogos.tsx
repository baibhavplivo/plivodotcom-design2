import { Marquee } from "@/components/magicui/marquee";
import { useEffect, useState } from "react";

const INDIA_LOGOS = [
  { name: "Meta", src: "/images/client-logos/meta.svg", className: "h-6" },
  { name: "Zomato", src: "/images/client-logos/zomato.svg", className: "h-6" },
  { name: "Uber", src: "/images/client-logos/uber.svg", className: "h-6" },
  { name: "Tata 1mg", src: "/images/client-logos/tata-1mg.svg", className: "h-6" },
  { name: "Discord", src: "/images/client-logos/discord.svg", className: "h-6" },
  { name: "Amul", src: "/images/client-logos/amul.svg", className: "h-6" },
  { name: "GoDaddy", src: "/images/client-logos/godaddy.svg", className: "h-6" },
  { name: "Atomberg", src: "/images/client-logos/atomberg.svg", className: "h-6" },
  { name: "Healthify", src: "/images/client-logos/healthify.svg", className: "h-6" },
  { name: "Great Learning", src: "/images/client-logos/great-learning.svg", className: "h-6" },
  { name: "Yahoo", src: "/images/client-logos/yahoo.svg", className: "h-6" },
  { name: "Masai", src: "/images/client-logos/masai.svg", className: "h-6" },
  { name: "Zolve", src: "/images/client-logos/zolve.svg", className: "h-6" },
  { name: "Trip.com", src: "/images/client-logos/trip.com.svg", className: "h-6" },
];

const INTL_LOGOS = [
  { name: "Meta", src: "/images/client-logos/meta.svg", className: "h-6" },
  { name: "Uber", src: "/images/client-logos/uber.svg", className: "h-6" },
  { name: "Discord", src: "/images/client-logos/discord.svg", className: "h-6" },
  { name: "Adobe", src: "/images/client-logos/adobe.svg", className: "h-6" },
  { name: "GoDaddy", src: "/images/client-logos/godaddy.svg", className: "h-6" },
  { name: "Atlassian", src: "/images/client-logos/atlassian.svg", className: "h-6" },
  { name: "DocuSign", src: "/images/client-logos/docusign.svg", className: "h-6" },
  { name: "Yahoo", src: "/images/client-logos/yahoo.svg", className: "h-6" },
  { name: "Decker Brands", src: "/images/client-logos/decker-brands.svg", className: "h-6" },
  { name: "Trip.com", src: "/images/client-logos/trip.com.svg", className: "h-6" },
  { name: "Laz Parking", src: "/images/client-logos/laz-parking.svg", className: "h-6" },
];

export default function ClientLogos() {
  const [logos, setLogos] = useState(INTL_LOGOS);

  useEffect(() => {
    const cached = sessionStorage.getItem("plivo_ip_info");
    if (cached) {
      try {
        const { country } = JSON.parse(cached);
        if (country === "IN") setLogos(INDIA_LOGOS);
        return;
      } catch {}
    }

    const t = ["1aff", "17b3", "d558", "ec"].join("");
    fetch(`https://ipinfo.io/json?token=${t}`)
      .then((r) => r.json())
      .then((r) => {
        const country = (r && r.country) || "US";
        const ip = (r && r.ip) || "";
        sessionStorage.setItem("plivo_ip_info", JSON.stringify({ country, ip }));
        if (country === "IN") setLogos(INDIA_LOGOS);
      })
      .catch(() => {});
  }, []);

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
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex w-[90px] shrink-0 items-center justify-center"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className={`${logo.className} w-auto object-contain opacity-30 grayscale`}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
