import { Headphones, PhoneOutgoing, Users } from "lucide-react";

interface UseCase {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const useCases: UseCase[] = [
  {
    icon: <Headphones className="h-6 w-6" />,
    title: "Inbound support",
    description:
      "Handle customer inquiries 24/7 with AI agents that resolve issues instantly. Reduce wait times and improve satisfaction scores.",
  },
  {
    icon: <PhoneOutgoing className="h-6 w-6" />,
    title: "Outbound campaigns",
    description:
      "Scale your outreach with intelligent calling campaigns. Qualify leads, schedule appointments, and follow up automatically.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Customer engagement",
    description:
      "Proactive reminders, surveys, and personalized interactions that keep customers engaged and drive loyalty.",
  },
];

export default function AIUseCasesGrid() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.02em] text-black text-center mb-4 max-w-3xl mx-auto">
          AI voice agents for every
          <br />
          customer interaction
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10 md:mb-14">
          From support calls to sales outreach, deploy voice AI that handles it all.
        </p>

        {/* 3-Card Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="group rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-gray-300 hover:shadow-md"
            >
              {/* Icon */}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#323dfe]/10 to-[#323dfe]/10 text-[#323dfe] transition-colors group-hover:from-[#323dfe]/20 group-hover:to-[#323dfe]/20">
                {useCase.icon}
              </div>

              {/* Title */}
              <h3 className="mb-2 text-lg font-semibold text-black">
                {useCase.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
