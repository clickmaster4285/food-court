import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, Wallet, BarChart2, FileText } from "lucide-react";
import dashboard from "@/assets/dashboard.jpg";

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: Users, title: "Vendor Management", desc: "Onboard, track, and manage all vendors from a single dashboard with role-based access controls." },
  { icon: Wallet, title: "Central Billing", desc: "Unified billing across every stall — automated splits, consolidated invoices, and transparent payouts." },
  { icon: BarChart2, title: "Analytics Dashboard", desc: "Live metrics on sales, footfall, peak hours, and vendor performance to drive smarter decisions." },
  { icon: FileText, title: "Reporting Tools", desc: "Generate detailed reports — daily summaries, vendor comparisons, tax filings, and custom exports." },
];

export default function Features() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".feat-card").forEach((el, i) => {
        gsap.from(el, { opacity: 0, y: 30, duration: 0.6, delay: i * 0.1, scrollTrigger: { trigger: el, start: "top 85%" } });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={ref} className="section-padding gradient-warm">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="section-label">Features</span>
          <h2 className="section-title mt-4">
            Everything You Need, <span className="text-primary">Nothing You Don't</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((f) => (
            <div key={f.title} className="feat-card card-warm-hover text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <f.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-2 font-heading">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="feat-card max-w-4xl mx-auto">
          <img
            src={dashboard}
            alt="Platform features overview"
            className="rounded-xl w-full object-cover"
            loading="lazy"
            width={1200}
            height={800}
            style={{ boxShadow: "var(--shadow-card)" }}
          />
        </div>
      </div>
    </section>
  );
}
