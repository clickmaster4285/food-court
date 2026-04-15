import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Settings, GraduationCap, Puzzle, Headphones } from "lucide-react";
import teamMeeting from "@/assets/team-meeting.jpg";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: Settings, title: "System Setup & Configuration", desc: "We handle the entire setup — from infrastructure to customization — so your food court is ready to operate from day one." },
  { icon: GraduationCap, title: "Vendor Onboarding & Training", desc: "Hands-on training for every vendor, ensuring smooth adoption and confident usage of the platform." },
  { icon: Puzzle, title: "Integration with Existing Tools", desc: "Seamless integration with your current POS, payment gateways, accounting software, and loyalty programs." },
  { icon: Headphones, title: "Ongoing Support & Maintenance", desc: "Dedicated support team available around the clock to resolve issues and keep your system running smoothly." },
];

export default function Services() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".svc-item").forEach((el, i) => {
        gsap.from(el, { opacity: 0, x: -30, duration: 0.6, delay: i * 0.12, scrollTrigger: { trigger: el, start: "top 85%" } });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={ref} className="section-padding">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="section-label">Services</span>
          <h2 className="section-title mt-4">
            End-to-End <span className="text-primary">Support</span> for Your Food Court
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src={teamMeeting}
              alt="Our team providing services"
              className="rounded-2xl w-full object-cover aspect-[4/3]"
              loading="lazy"
              width={1200}
              height={800}
              style={{ boxShadow: "var(--shadow-elevated)" }}
            />
          </div>

          <div className="space-y-6">
            {services.map((s, i) => (
              <div key={s.title} className="svc-item flex gap-5 p-5 rounded-xl hover:bg-muted/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                  <s.icon className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1 font-heading">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
