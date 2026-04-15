import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { UserPlus, Cog, Activity, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { icon: UserPlus, step: "01", title: "Onboard Vendors", desc: "Register vendors, set up their profiles, menus, and pricing in minutes." },
  { icon: Cog, step: "02", title: "Configure System", desc: "Customize billing rules, reporting preferences, and integrations to match your workflow." },
  { icon: Activity, step: "03", title: "Monitor & Optimize", desc: "Track performance in real-time, identify trends, and continuously improve operations." },
];

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".step-card").forEach((el, i) => {
        gsap.from(el, { opacity: 0, x: -30, duration: 0.7, delay: i * 0.2, scrollTrigger: { trigger: ".steps-row", start: "top 80%" } });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="section-padding">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="section-label">How It Works</span>
          <h2 className="section-title mt-4">
            Three Simple Steps to <span className="text-primary">Get Started</span>
          </h2>
        </div>

        <div className="steps-row flex flex-col md:flex-row items-stretch gap-6">
          {steps.map((s, i) => (
            <div key={s.step} className="step-card flex-1 flex flex-col md:flex-row items-center gap-4">
              <div className="card-warm-hover flex-1 text-center w-full">
                <span className="text-5xl font-bold text-primary/15 font-heading">{s.step}</span>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto my-4">
                  <s.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2 font-heading">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight className="w-6 h-6 text-primary/40 shrink-0 hidden md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
