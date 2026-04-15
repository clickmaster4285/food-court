import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import happyCustomers from "@/assets/happy-customers.jpg";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: "Billing Errors", before: "12%", after: "0.5%", improved: true },
  { label: "Order Accuracy", before: "78%", after: "98%", improved: true },
  { label: "Avg. Wait Time", before: "14 min", after: "5 min", improved: true },
  { label: "Revenue Growth", before: "—", after: "+32%", improved: true },
];

export default function CaseStudies() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".case-main", { opacity: 0, y: 40, duration: 0.8, scrollTrigger: { trigger: ".case-main", start: "top 80%" } });
      gsap.utils.toArray<HTMLElement>(".stat-card").forEach((el, i) => {
        gsap.from(el, { opacity: 0, scale: 0.9, duration: 0.5, delay: i * 0.1, scrollTrigger: { trigger: el, start: "top 85%" } });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="case-studies" ref={ref} className="section-padding gradient-warm">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="section-label">Case Study</span>
          <h2 className="section-title mt-4">
            Real Results, <span className="text-primary">Real Impact</span>
          </h2>
        </div>

        <div className="case-main card-warm max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4 font-heading">
                City Square Food Court — A Transformation Story
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                A 20-vendor food court struggling with billing errors, delayed orders, and zero
                performance visibility implemented our platform. Within 3 months, they saw
                dramatic improvements across every metric.
              </p>
              <button onClick={scrollToContact} className="btn-primary">
                Get Similar Results <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <img src={hero1} alt="Food court before" className="rounded-xl w-full h-40 object-cover" loading="lazy" width={1920} height={1080} />
              <img src={happyCustomers} alt="Food court after" className="rounded-xl w-full h-40 object-cover" loading="lazy" width={1200} height={800} />
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 max-w-5xl mx-auto">
          {stats.map((s) => (
            <div key={s.label} className="stat-card card-warm text-center">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">{s.label}</p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-lg font-bold text-muted-foreground line-through">{s.before}</span>
                <ArrowRight className="w-4 h-4 text-primary" />
                <span className="text-2xl font-bold text-secondary">{s.after}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
