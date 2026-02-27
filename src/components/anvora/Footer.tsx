import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <a href="#home" className="font-display text-2xl font-black">
              <span className="text-gradient-gold">Anvora</span>
            </a>
            <p className="text-sm text-muted-foreground mt-1">
              Service-first digital solutions.
            </p>
          </div>

          <div className="flex items-center gap-8 text-sm">
            <a href="#home" className="text-muted-foreground hover:text-foreground transition-colors">Home</a>
            <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">Services</a>
            <a href="#portfolio" className="text-muted-foreground hover:text-foreground transition-colors">Portfolio</a>
            <a href="#community" className="text-muted-foreground hover:text-foreground transition-colors">Community</a>
          </div>

          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-gold" /> by Anvora © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
