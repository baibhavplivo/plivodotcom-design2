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
    <section className="bg-background border-t border-border py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-8">
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-foreground/70">~</span>
            <span className="h-px w-6 bg-border" />
          </span>
          <span>ai use cases grid</span>
          <span className="flex-1 border-t border-dashed border-border" />
        </div>
        <h2 className="font-sora text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-normal leading-[1.04] tracking-[-0.035em] text-foreground mb-4">
          AI voice agents for every
          <br />
          customer interaction
        </h2>
        <p className="text-muted-foreground max-w-2xl  mb-10 md:mb-14">
          From support calls to sales outreach, deploy voice AI that handles it all.
        </p>

        {/* 3-Card Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="group rounded-lg border border-border bg-background p-6 transition-all hover:border-border-strong hover:shadow-md"
            >
              {/* Icon */}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-primary/10 text-primary transition-colors group-hover:from-primary/20 group-hover:to-primary/20">
                {useCase.icon}
              </div>

              {/* Title */}
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {useCase.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
