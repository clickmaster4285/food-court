import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const images = [hero1, hero2, hero3];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((p) => (p + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, { opacity: 0, y: 40, duration: 1, delay: 0.3 });
      gsap.from(subRef.current, { opacity: 0, y: 30, duration: 1, delay: 0.6 });
      gsap.from(ctaRef.current, { opacity: 0, y: 20, duration: 0.8, delay: 0.9 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={img}
            alt="Food court environment"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
      ))}

      <div className="relative z-10 section-container pt-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 backdrop-blur-sm px-4 py-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-semibold text-primary-foreground/90 uppercase tracking-wider">
              Smart Food Court Management
            </span>
          </div>
          <h1
            ref={headingRef}
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight font-heading"
          >
            One System.{" "}
            <span className="text-primary">Multiple Vendors.</span>{" "}
            Total Control.
          </h1>
          <p
            ref={subRef}
            className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed"
          >
            Simplify vendor management, streamline billing, and gain full visibility
            with a modern, easy-to-use platform built for food courts.
          </p>
          <div ref={ctaRef} className="mt-8 flex flex-wrap gap-4">
            <button onClick={scrollToContact} className="btn-primary text-base px-10 py-4">
              Get Started <ArrowRight className="w-5 h-5 ml-1" />
            </button>
            <button
              onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-outline-warm border-white/40 text-white hover:bg-white/10 hover:text-white text-base px-10 py-4"
            >
              Learn More
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-10 h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "bg-primary" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
