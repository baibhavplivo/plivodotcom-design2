import { footerNavigation, socialLinks } from "@/data/navigation";
import { Youtube, Twitter, Linkedin, Github, Facebook } from "lucide-react";

const SocialIcon = ({ icon }: { icon: string }) => {
  switch (icon) {
    case "youtube":
      return <Youtube className="h-5 w-5" />;
    case "twitter":
      return <Twitter className="h-5 w-5" />;
    case "linkedin":
      return <Linkedin className="h-5 w-5" />;
    case "github":
      return <Github className="h-5 w-5" />;
    case "facebook":
      return <Facebook className="h-5 w-5" />;
    default:
      return null;
  }
};

export const PlivoFooter = () => {
  const footerSections = [
    footerNavigation.platform,
    footerNavigation.communications,
    footerNavigation.aiAgents,
    footerNavigation.apiPlatform,
    footerNavigation.resources,
    footerNavigation.company,
  ];

  return (
    <footer className="bg-[#0f1117] border-t border-gray-800">
      <div className="container mx-auto max-w-7xl px-4 py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-sm font-semibold text-white">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li key={item.title}>
                    <a
                      href={item.href}
                      className="text-sm text-gray-400 transition-colors hover:text-white"
                      {...((item as any).external && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="relative mt-16 flex flex-col items-center gap-6 border-t border-gray-800 pt-8 md:flex-row md:justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img
              src="/images/plivo-logo.svg"
              alt="Plivo"
              className="h-5 w-auto invert"
            />
          </a>

          {/* Copyright - Centered */}
          <p className="text-sm text-gray-400 md:absolute md:left-1/2 md:-translate-x-1/2">
            Copyright &copy; {new Date().getFullYear()} Plivo Inc.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-white"
                aria-label={link.name}
              >
                <SocialIcon icon={link.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PlivoFooter;
