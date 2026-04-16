import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, Mail, Phone, MapPin, Clock, Navigation, MessageSquare } from "lucide-react";
import { toast } from "sonner";

gsap.registerPlugin(ScrollTrigger);

// Location data
const LOCATION = {
  fullAddress:
    "Paris Shopping Mall, 4th floor, Main PWD Rd, PWD Housing Society Sector A, Islamabad, Punjab 45700, Pakistan",
};

const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  LOCATION.fullAddress
)}&output=embed`;

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-content", { opacity: 0, y: 30, duration: 0.8, scrollTrigger: { trigger: ".contact-content", start: "top 80%" } });
    }, ref);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Button animation
    if (btnRef.current) {
      gsap.fromTo(btnRef.current, { scale: 1 }, { scale: 1.05, duration: 0.15, yoyo: true, repeat: 1 });
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          phone: form.phone,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();

      if (data.success) {
        toast.success("Message sent successfully!");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to send. Please try again or email marketing@clickmasters.pk");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="contact-content text-sm uppercase tracking-widest text-primary font-bold">Contact Us</span>
          <h2 className="contact-content text-3xl md:text-5xl font-bold font-[var(--font-heading)] text-foreground mt-4">
            Ready to <span className="text-gradient-primary">Transform</span> Your Buisness?
          </h2>
          <p className="contact-content text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
            Get in touch and let's discuss how we can streamline your operations.
          </p>
        </div>

        <div className="contact-content grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Left side - Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Email */}
            <div className="flex items-start gap-4 bg-card rounded-xl p-5 border border-border">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground text-sm mb-1">Email</p>
                <p className="text-muted-foreground text-sm">marketing@clickmasters.pk</p>
                <p className="text-muted-foreground text-sm">info@clickmasters.pk</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4 bg-card rounded-xl p-5 border border-border">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground text-sm mb-1">Phone</p>
                <p className="text-muted-foreground text-sm">+92 333-1116842</p>
                <p className="text-muted-foreground text-sm">+92 332-5394285</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4 bg-card rounded-xl p-5 border border-border">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground text-sm mb-1">Location</p>
                <p className="text-muted-foreground text-sm">{LOCATION.fullAddress}</p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="flex items-start gap-4 bg-card rounded-xl p-5 border border-border">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground text-sm mb-1">Business Hours</p>
                <p className="text-muted-foreground text-sm">Monday - Saturday: 9AM - 6PM</p>
                <p className="text-muted-foreground text-sm">Sunday: Closed</p>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-xl overflow-hidden border border-border h-48">
              <iframe
                src={MAP_EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title="Location"
                className="w-full h-full"
              />
            </div>

            {/* Directions Link */}
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                LOCATION.fullAddress
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary text-sm hover:underline"
            >
              <Navigation className="w-4 h-4" />
              Get Directions
            </a>
          </div>

          {/* Right side - Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-xl border border-border space-y-5">
              <div className="flex gap-2 items-center mb-4 pb-3 border-b border-border">
                <MessageSquare className="w-5 h-5 text-primary" />
                <h3 className="font-[var(--font-heading)] font-semibold text-foreground text-lg">Send us a message</h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                    placeholder="you@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Phone <span className="text-muted-foreground text-xs">(Optional)</span>
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                  placeholder="+92 XXX XXXXXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Message *</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition resize-none"
                  placeholder="Tell us about your buisness..."
                />
              </div>

              <button
                ref={btnRef}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-70"
              >
                {isSubmitting ? "Sending Message..." : "Send Message"}
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}