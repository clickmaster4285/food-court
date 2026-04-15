import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Rajesh Patel",
    role: "Food Court Manager, Metro Mall",
    text: "FoodCourtPro transformed how we manage our 15-vendor food court. Billing errors dropped to near zero, and our vendors love the simplicity of the system.",
    rating: 5,
  },
  {
    name: "Sarah Chen",
    role: "Operations Director, CityBite Hub",
    text: "The analytics dashboard alone justified the investment. We can now make data-driven decisions about vendor performance and peak-hour staffing.",
    rating: 5,
  },
  {
    name: "Amit Sharma",
    role: "Owner, Spice Garden Food Court",
    text: "Setup was incredibly smooth. The onboarding team trained all our vendors in just two days. We were fully operational within a week.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const ref = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-section", { opacity: 0, y: 30, duration: 0.8, scrollTrigger: { trigger: ".testimonial-section", start: "top 80%" } });
    }, ref);
    return () => ctx.revert();
  }, []);

  // Auto-slide effect
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        navigate(1);
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, current]);

  const navigate = (dir: number) => {
    // Reset auto-play timer when manually navigating
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      if (isAutoPlaying) {
        autoPlayRef.current = setInterval(() => {
          navigate(1);
        }, 5000);
      }
    }

    gsap.to(cardRef.current, {
      opacity: 0,
      x: dir * -30,
      duration: 0.25,
      onComplete: () => {
        setCurrent((p) => (p + dir + testimonials.length) % testimonials.length);
        gsap.fromTo(cardRef.current, { opacity: 0, x: dir * 30 }, { opacity: 1, x: 0, duration: 0.35 });
      },
    });
  };

  const goToSlide = (index: number) => {
    if (index === current) return;
    
    // Reset auto-play timer
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      if (isAutoPlaying) {
        autoPlayRef.current = setInterval(() => {
          navigate(1);
        }, 5000);
      }
    }

    const dir = index > current ? 1 : -1;
    gsap.to(cardRef.current, {
      opacity: 0,
      x: dir * -30,
      duration: 0.25,
      onComplete: () => {
        setCurrent(index);
        gsap.fromTo(cardRef.current, { opacity: 0, x: dir * 30 }, { opacity: 1, x: 0, duration: 0.35 });
      },
    });
  };

  const pauseAutoPlay = () => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const resumeAutoPlay = () => {
    setIsAutoPlaying(true);
  };

  const t = testimonials[current];

  return (
    <section 
      ref={ref} 
      className="section-padding"
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
    >
      <div className="section-container">
        <div className="text-center mb-16 testimonial-section">
          <span className="section-label">Testimonials</span>
          <h2 className="section-title mt-4">
            What Our <span className="text-primary">Clients</span> Say
          </h2>
        </div>

        <div className="max-w-3xl mx-auto testimonial-section">
          <div ref={cardRef} className="card-warm text-center relative">
            <Quote className="w-10 h-10 text-primary/20 mx-auto mb-4" />
            <p className="text-lg text-foreground leading-relaxed mb-6 italic">"{t.text}"</p>
            <div className="flex items-center justify-center gap-1 mb-3">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-warm-yellow text-warm-yellow" />
              ))}
            </div>
            <p className="font-bold text-foreground font-heading">{t.name}</p>
            <p className="text-sm text-muted-foreground">{t.role}</p>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button 
              onClick={() => navigate(-1)} 
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-primary w-6" : "bg-muted-foreground/30"}`}
                />
              ))}
            </div>
            <button 
              onClick={() => navigate(1)} 
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}