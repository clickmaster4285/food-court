import { useEffect, useRef, useState, useCallback } from "react";
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
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const setImageRef = useCallback((el: HTMLDivElement | null, index: number) => {
    if (el) {
      imageRefs.current[index] = el;
    }
  }, []);

  // Preload all images
  useEffect(() => {
    const preloadImages = async () => {
      const promises = images.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = resolve;
        });
      });
      await Promise.all(promises);
      setImagesLoaded(true);
    };
    preloadImages();
  }, []);

  // Auto slide with smooth fade
  useEffect(() => {
    if (!imagesLoaded) return;
    
    const interval = setInterval(() => {
      setCurrent((p) => (p + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [imagesLoaded]);

  // Smooth fade transition between images
  useEffect(() => {
    if (!imagesLoaded) return;
    
    imageRefs.current.forEach((ref) => {
      if (ref) {
        gsap.to(ref, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
        });
      }
    });
    
    const currentRef = imageRefs.current[current];
    if (currentRef) {
      gsap.to(currentRef, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.inOut",
        delay: 0.1,
      });
    }
  }, [current, imagesLoaded]);

  // Entrance animation
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
          ref={(el) => setImageRef(el, i)}
          className="absolute inset-0"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={img}
            alt="Food court environment"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
      ))}

      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1
            ref={headingRef}
            className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight tracking-tight font-heading"
            style={{
              textShadow: "0 0 20px rgba(0,0,0,0.5), 0 0 40px rgba(0,0,0,0.3), 0 0 60px rgba(0,0,0,0.2)",
            }}
          >
            <span className="text-white">One System.</span>{" "}
            <span className="text-primary" style={{
              textShadow: "0 0 20px rgba(249,115,22,0.5), 0 0 40px rgba(249,115,22,0.3), 0 0 60px rgba(249,115,22,0.2)",
            }}>Multiple Vendors.</span>{" "}
            <span className="text-white">Total Control.</span>
          </h1>
          <p
            ref={subRef}
            className="mt-6 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.95)",
              textShadow: "0 0 15px rgba(0,0,0,0.5), 0 0 30px rgba(0,0,0,0.3)",
            }}
          >
            Simplify vendor management, streamline billing, and gain full visibility
            with a modern, easy-to-use platform built for food courts.
          </p>
          <div ref={ctaRef} className="mt-8 flex flex-wrap gap-4 justify-center">
            <button onClick={scrollToContact} className="btn-primary text-base px-10 py-4 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all">
              Get Started <ArrowRight className="w-5 h-5 ml-1 inline" />
            </button>
            <button
              onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-outline-warm border-white/40 text-white hover:bg-white/10 hover:text-white text-base px-10 py-4 backdrop-blur-sm"
              style={{
                textShadow: "0 0 10px rgba(0,0,0,0.3)",
              }}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "bg-primary w-8 shadow-lg shadow-primary/50" : "bg-white/40 w-6 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}