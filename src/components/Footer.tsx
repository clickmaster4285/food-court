import { UtensilsCrossed, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const links = {
  Product: ["Features", "Solutions", "Pricing", "Case Studies"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Support: ["Help Center", "Documentation", "API", "Status"],
};

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="section-container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 text-xl font-bold font-heading mb-4">
              <UtensilsCrossed className="w-6 h-6 text-primary" />
              <span className="text-foreground">FoodCourt<span className="text-primary">Pro</span></span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mb-6">
              The modern platform for managing multi-vendor food courts — simplifying operations,
              unifying billing, and delivering real-time insights.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-bold text-foreground mb-4 font-heading">{title}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} FoodCourtPro. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
