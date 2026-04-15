import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, Layers, TrendingUp, Shield } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  { icon: Target, title: "Built for Food Courts", desc: "Not a generic solution. Our platform is purpose-built for multi-vendor food environments." },
  { icon: Layers, title: "Intuitive Interface", desc: "Clean, easy-to-use design that vendors and managers can learn in minutes, not days." },
  { icon: TrendingUp, title: "Scalable Architecture", desc: "Whether you have 5 vendors or 50, our system grows seamlessly with your business." },
  { icon: Shield, title: "Reliable Performance", desc: "99.9% uptime, lightning-fast operations, and robust data security you can count on." },
];

export default function WhyChooseUs() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".why-card").forEach((el, i) => {
        gsap.from(el, { opacity: 0, scale: 0.95, duration: 0.6, delay: i * 0.1, scrollTrigger: { trigger: el, start: "top 85%" } });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="section-padding gradient-warm">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="section-label">Why Choose Us</span>
          <h2 className="section-title mt-4">
            The <span className="text-primary">Smart Choice</span> for Food Court Operators
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r) => (
            <div key={r.title} className="why-card card-warm-hover text-center group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
                <r.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2 font-heading">{r.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
