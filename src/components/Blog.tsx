import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Clock } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import foodVariety from "@/assets/food-variety.jpg";

gsap.registerPlugin(ScrollTrigger);

const posts = [
  {
    image: hero1,
    title: "5 Ways to Reduce Order Delays in Busy Food Courts",
    excerpt: "Discover practical strategies to streamline order flow and keep customers happy during peak hours.",
    date: "Mar 12, 2026",
    readTime: "5 min read",
  },
  {
    image: hero2,
    title: "The Future of Multi-Vendor Management Technology",
    excerpt: "How AI and automation are reshaping food court operations for the next decade.",
    date: "Feb 28, 2026",
    readTime: "7 min read",
  },
  {
    image: foodVariety,
    title: "Maximizing Revenue: Analytics-Driven Food Court Operations",
    excerpt: "Learn how data insights can boost vendor performance and overall food court profitability.",
    date: "Feb 14, 2026",
    readTime: "6 min read",
  },
];

export default function Blog() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".blog-card").forEach((el, i) => {
        gsap.from(el, { opacity: 0, y: 30, duration: 0.6, delay: i * 0.12, scrollTrigger: { trigger: el, start: "top 85%" } });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="blog" ref={ref} className="section-padding gradient-warm">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="section-label">Blog</span>
          <h2 className="section-title mt-4">
            Insights & <span className="text-primary">Resources</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((p) => (
            <div key={p.title} className="blog-card card-warm-hover overflow-hidden group cursor-pointer">
              <div className="overflow-hidden rounded-xl mb-5">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  width={1920}
                  height={1080}
                />
              </div>
              <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
                <span>{p.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {p.readTime}</span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2 font-heading group-hover:text-primary transition-colors">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.excerpt}</p>
            
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
