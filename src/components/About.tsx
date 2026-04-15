import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle } from "lucide-react";
import teamMeeting from "@/assets/team-meeting.jpg";
import foodVariety from "@/assets/food-variety.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".about-fade").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={ref} className="section-padding">
      <div className="section-container">
        <div className="text-center mb-16 about-fade">
          <span className="section-label">About Us</span>
          <h2 className="section-title mt-4">
            Powering Smarter <span className="text-primary">Food Courts</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            We build powerful yet simple digital systems designed to manage food courts
            efficiently — bringing multiple vendors together into one seamless platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="about-fade">
            <div className="relative">
              <img
                src={teamMeeting}
                alt="Team collaborating on food court solutions"
                className="rounded-2xl w-full object-cover aspect-[4/3]"
                loading="lazy"
                width={1200}
                height={800}
              />
              <img
                src={foodVariety}
                alt="Diverse cuisine"
                className="absolute -bottom-6 -right-6 w-48 h-48 rounded-2xl object-cover border-4 border-background hidden md:block"
                loading="lazy"
                width={1200}
                height={800}
                style={{ boxShadow: "var(--shadow-elevated)" }}
              />
            </div>
          </div>

          <div className="about-fade">
            <h3 className="text-2xl font-bold font-heading text-foreground mb-4">
              From Chaos to Clarity — One Platform at a Time
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              From small shared spaces to large food courts, we help businesses gain better
              control, improve coordination, and scale with confidence. Our platform makes
              operations smoother, faster, and more organized.
            </p>
            <div className="space-y-4">
              {[
                "Unified vendor management in one place",
                "Streamlined billing & payment flows",
                "Real-time operational insights",
                "Built to scale with your growth",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                  <span className="text-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
