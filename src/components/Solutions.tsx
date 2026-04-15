import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Monitor, CreditCard, LineChart, ClipboardList } from "lucide-react";
import dashboard from "@/assets/dashboard.jpg";
import vendorPos from "@/assets/vendor-pos.jpg";

gsap.registerPlugin(ScrollTrigger);

const solutions = [
  {
    icon: Monitor,
    title: "Multi-Vendor POS System",
    desc: "Unify all vendor operations under a single, intuitive POS system that syncs in real-time across every counter.",
  },
  {
    icon: CreditCard,
    title: "Centralized Billing",
    desc: "One billing system for seamless transactions — eliminating conflicts, simplifying reconciliation, and ensuring accuracy.",
  },
  {
    icon: LineChart,
    title: "Real-Time Analytics",
    desc: "A powerful dashboard delivering instant insights into sales, vendor performance, peak hours, and customer behavior.",
  },
  {
    icon: ClipboardList,
    title: "Order Management",
    desc: "Streamlined order flow that ensures clarity, speed, and accuracy — from the counter to the customer.",
  },
];

export default function Solutions() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".sol-card").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 30,
          duration: 0.7,
          delay: i * 0.12,
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
      gsap.from(".sol-image", {
        opacity: 0,
        x: 40,
        duration: 1,
        scrollTrigger: { trigger: ".sol-image", start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="solutions" ref={ref} className="section-padding">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="section-label">Our Solutions</span>
          <h2 className="section-title mt-4">
            Built to <span className="text-primary">Simplify</span> Every Operation
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            Our platform addresses every challenge food courts face — with powerful, elegant solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="grid sm:grid-cols-2 gap-6">
            {solutions.map((s) => (
              <div key={s.title} className="sol-card card-warm-hover">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <s.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 font-heading">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="sol-image relative">
            <img
              src={dashboard}
              alt="Analytics dashboard"
              className="rounded-2xl w-full object-cover"
              loading="lazy"
              width={1200}
              height={800}
              style={{ boxShadow: "var(--shadow-elevated)" }}
            />
            <img
              src={vendorPos}
              alt="POS system in action"
              className="absolute -bottom-6 -left-6 w-52 h-36 rounded-xl object-cover border-4 border-background hidden lg:block"
              loading="lazy"
              width={1200}
              height={800}
              style={{ boxShadow: "var(--shadow-elevated)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
