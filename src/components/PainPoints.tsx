import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AlertTriangle, Receipt, Clock, BarChart3 } from "lucide-react";
import vendorPos from "@/assets/vendor-pos.jpg";
import billing from "@/assets/billing.jpg";

gsap.registerPlugin(ScrollTrigger);

const painPoints = [
  {
    icon: AlertTriangle,
    title: "Vendor Complexity",
    desc: "Managing multiple vendors becomes complex and unorganized, leading to inefficiencies, miscommunication, and lost revenue across your food court.",
    image: vendorPos,
  },
  {
    icon: Receipt,
    title: "Billing Conflicts",
    desc: "Different outlets with separate billing systems create conflicts, reconciliation nightmares, and revenue leakage that compounds over time.",
    image: billing,
  },
  {
    icon: Clock,
    title: "Order Delays",
    desc: "Orders getting mixed or delayed across counters frustrates customers, hurts repeat business, and damages your food court's reputation.",
    image: vendorPos,
  },
  {
    icon: BarChart3,
    title: "Zero Visibility",
    desc: "No centralized reporting or performance visibility means you're flying blind — unable to make data-driven decisions or identify underperformers.",
    image: billing,
  },
];

export default function PainPoints() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".pain-card").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.7,
          delay: i * 0.15,
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="section-padding gradient-warm">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="section-label" style={{ background: "oklch(0.577 0.245 27.325 / 0.1)", color: "oklch(0.577 0.245 27.325)" }}>
            The Problem
          </span>
          <h2 className="section-title mt-4">
            Common <span className="text-destructive">Pain Points</span> in Food Court Management
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            Running a multi-vendor food court without the right tools leads to chaos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {painPoints.map((p) => (
            <div key={p.title} className="pain-card card-warm-hover flex flex-col md:flex-row gap-6">
              <div className="shrink-0">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full md:w-40 h-32 md:h-full rounded-xl object-cover"
                  loading="lazy"
                  width={1200}
                  height={800}
                />
              </div>
              <div>
                <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center mb-3">
                  <p.icon className="w-5 h-5 text-destructive" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 font-heading">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
