import { Headphones, ShieldCheck, Users } from "lucide-react";

const SERVICES = [
  {
    icon: Headphones,
    title: "Guided Onboarding",
    description:
      "Personalized live sessions with experienced solutions engineers. Expert advice on industry best practices and compliance.",
  },
  {
    icon: ShieldCheck,
    title: "Global Compliance Assistance",
    description:
      "Assisted Sender ID registration in 20+ countries. White-glove 10DLC migration service for seamless transitions.",
  },
  {
    icon: Users,
    title: "Proactive Engagement",
    description:
      "Prioritized issue resolution with 24/7 premium support. Personalized account management by dedicated Customer Success Managers.",
  },
];

export default function WhiteGloveService() {
  return (
    <section className="py-12 lg:py-16 bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="font-sora text-[2rem] sm:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black">
            White glove service at every step
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mt-3 max-w-2xl mx-auto">
            From onboarding to scaling, our team is with you every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="rounded-lg border border-gray-200 bg-white p-6 sm:p-8"
              >
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#323dfe]" />
                </div>
                <h3 className="font-sora text-lg font-semibold text-black">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
