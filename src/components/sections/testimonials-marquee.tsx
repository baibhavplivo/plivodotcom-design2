import { Quote, Star } from "lucide-react";

import Noise from "@/components/elements/noise";
import { Marquee } from "@/components/magicui/marquee";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const platformLogos = [
  {
    name: "G2",
    src: "https://logo.clearbit.com/g2.com",
    alt: "G2",
  },
  {
    name: "Airtable",
    src: "https://logo.clearbit.com/airtable.com",
    alt: "Airtable",
  },
  {
    name: "Trustpilot",
    src: "https://logo.clearbit.com/trustpilot.com",
    alt: "Trustpilot",
  },
  {
    name: "GetApp",
    src: "https://logo.clearbit.com/getapp.com",
    alt: "GetApp",
  },
  {
    name: "Software Advice",
    src: "https://logo.clearbit.com/softwareadvice.com",
    alt: "Software Advice",
  },
];

const testimonials = [
  {
    id: "1",
    name: "Sarah Mitchell",
    title: "Head of Product",
    company: "Nike",
    image:
      "/images/avatars/testimonial-4.jpg",
    companyLogo: {
      src: "/images/logos/nike.png",
      width: 67.5,
      height: 24,
    },
    testimonial:
      "Lumen has completely changed the way we present our project workflows. We can create visual boards, share tasks instantly, and demo progress live.",
  },
  {
    id: "2",
    name: "Alex Chen",
    title: "Senior Designer",
    company: "Spotify",
    image:
      "/images/avatars/testimonial-5.jpg",
    testimonial:
      "Lumen was the missing layer between our product and engineering teams. We've never had this much clarity in how tasks move through the pipeline and deliver results.",
  },
  {
    id: "3",
    name: "Marcus Johnson",
    title: "VP Product",
    company: "T-Mobile",
    image:
      "/images/avatars/testimonial-6.jpg",
    testimonial:
      "We used to lose track of deliverables every week. With Lumen, task ownership is crystal clear and timelines are actually realistic for our team.",
  },
  {
    id: "4",
    name: "Emily Davis",
    title: "Product Manager",
    company: "Booking",
    image:
      "/images/avatars/testimonial-7.jpg",
    testimonial:
      "Lumen blended perfectly into our design-to-dev process. We organize prototypes, handoffs, and sprints without switching tools constantly.",
  },
  {
    id: "5",
    name: "Ben Parker",
    title: "Engineering Lead",
    company: "IBM",
    image:
      "/images/avatars/testimonial-8.jpg",
    testimonial:
      "Since adopting Lumen, our feedback cycles became shorter and much more effective. It's a must-have for any growing product team today.",
  },
  {
    id: "6",
    name: "Samantha Lee",
    title: "Design Director",
    company: "Logitech",
    image:
      "/images/avatars/testimonial-9.jpg",
    testimonial:
      "Lumen makes it incredibly easy to manage cross-functional work. We've cut coordination time in half and deliver with better insights.",
  },
  {
    id: "7",
    name: "David Kim",
    title: "CTO",
    company: "Fortinet",
    image:
      "/images/avatars/testimonial-10.jpg",
    testimonial:
      "We use Lumen across all departments - from tech to support. Creating shared workflows has drastically improved internal communication.",
  },
  {
    id: "8",
    name: "Rachel Green",
    title: "Product Designer",
    company: "Zapier",
    image:
      "/images/avatars/testimonial-11.jpg",
    companyLogo: {
      src: "/images/logos/zapiar.png",
      width: 105,
      height: 28,
    },
    testimonial:
      "Lumen has completely transformed how we approach daily project planning and execution. Before switching, we constantly missed deadlines due to misalignment. Our productivity skyrocketed.",
  },
  {
    id: "9",
    name: "Mike Johnson",
    title: "Startup Founder",
    company: "Tailwind CSS",
    image:
      "/images/avatars/testimonial-12.jpg",
    companyLogo: {
      src: "/images/logos/tailwindcss.png",
      width: 130,
      height: 20,
    },
    testimonial:
      "I created a workspace, invited my co-founder, and started assigning tasks in 45 seconds. That's how fast Lumen works for our team.",
  },
];

const TestimonialsMarquee = () => {
  return (
    <section className="section-padding relative">
      <Noise />
      <div className="container">
        {/* Reviews Section */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {/* 5 Star Rating */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="size-3 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            25,000+ reviews from
          </span>

          {/* Platform Logos */}
          {platformLogos.map((logo) => (
            <img
              key={logo.name}
              src={logo.src}
              alt={logo.alt}
              width={12}
              height={12}
            />
          ))}
        </div>

        <div className="max-w-4xl space-y-3 lg:space-y-4">
          <h2 className="text-4xl tracking-tight lg:text-5xl">
            Why teams are leaving Monday for Lumen
          </h2>
          <p className="text-lg leading-snug text-muted-foreground">
            Hear how teams are moving faster, collaborating better, and finally
            loving their workflow with Lumen.
          </p>
        </div>
      </div>

      <div className="mask-r-from-90% mask-r-to-100% mask-l-from-90% mask-l-to-100% mt-8 space-y-4 lg:mt-12">
        <Marquee pauseOnHover className="py-0">
          {firstRow.map((review) => (
            <ReviewCard
              key={review.id}
              name={review.name}
              title={review.title}
              company={review.company}
              image={review.image}
              testimonial={review.testimonial}
            />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="py-0">
          {secondRow.map((review) => (
            <ReviewCard
              key={review.id}
              name={review.name}
              title={review.title}
              company={review.company}
              image={review.image}
              testimonial={review.testimonial}
            />
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default TestimonialsMarquee;

// Split testimonials into two rows for marquee
const firstRow = testimonials.slice(0, 5);
const secondRow = testimonials.slice(5);

interface ReviewCardProps {
  name: string;
  title: string;
  company: string;
  image: string;
  testimonial: string;
}

function ReviewCard({
  name,
  title,
  company,
  image,
  testimonial,
}: ReviewCardProps) {
  return (
    <Card
      className={cn(
        "hover:bg-accent/10 max-w-xs gap-3 bg-transparent md:max-w-md",
        "transition-colors duration-200",
      )}
    >
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            className="rounded-full border border-input"
            width={48}
            height={48}
            src={image}
            alt={name}
          />
          <div className="flex flex-col">
            <CardTitle className="text-sm font-medium">
              <cite className="not-italic">{name}</cite>
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              {title} at {company}
            </CardDescription>
          </div>
        </div>
        <Quote className="size-5 fill-foreground" />
      </CardHeader>
      <CardContent className="">
        <blockquote className="leading-snug">{testimonial}</blockquote>
      </CardContent>
    </Card>
  );
}
