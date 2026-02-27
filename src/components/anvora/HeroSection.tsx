import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const WHATSAPP_URL =
  "https://wa.me/1234567890?text=Hi%20Anvora!%20I%27d%20like%20to%20start%20my%20project";

// Advanced particle field with depth
function Particles() {
  const [particles] = useState(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 0.5,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.6 + 0.05,
      depth: Math.random(),
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.id % 2 === 0
              ? "hsl(42 92% 55% / 0.5)"
              : "hsl(243 80% 65% / 0.3)",
            willChange: "transform, opacity"
          }}
          animate={{
            y: [0, -(p.depth * 400)],
            x: [0, Math.random() * 100 - 50],
            opacity: [0, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Advanced grid overlay
function GridOverlay() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.02]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(hsl(0 0% 100%) 1px, transparent 1px),
            linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
      />
    </div>
  );
}

// Magnetic button cursor effect
function MagneticButton({ children, href, target, ...props }: any) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const distance = Math.sqrt(x * x + y * y);
    if (distance < 80) {
      setPosition({ x: x * 0.3, y: y * 0.3 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      animate={position}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      {...props}
    >
      {children}
    </motion.a>
  );
}

export default function HeroSection() {
  const sectionRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient background base */}
      <div className="absolute inset-0 bg-gradient-hero" />

      {/* Ambient glow orbs with parallax */}
      <motion.div
        className="absolute top-1/4 left-[5%] w-[600px] h-[600px] rounded-full blur-[140px]"
        style={{
          background: "hsl(243 80% 55% / 0.2)",
          y: useTransform(scrollYProgress, [0, 1], [0, -80]),
        }}
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 40, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-1/4 right-[10%] w-[500px] h-[500px] rounded-full blur-[120px]"
        style={{
          background: "hsl(42 92% 55% / 0.12)",
          y: useTransform(scrollYProgress, [0, 1], [0, 60]),
        }}
        animate={{
          scale: [1, 1.2, 1],
          y: [0, -50, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute top-1/2 right-[5%] w-[400px] h-[400px] rounded-full blur-[100px]"
        style={{
          background: "hsl(280 70% 50% / 0.08)",
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <Particles />
      <GridOverlay />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 container mx-auto px-6 text-center max-w-5xl"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={mounted ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-glass rounded-full px-5 py-2.5 mb-8 backdrop-blur-xl"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-4 h-4 text-gold" />
          </motion.div>
          <span className="text-sm font-medium" style={{ color: "hsl(0 0% 100% / 0.85)" }}>
            Cinematic Digital Presence
          </span>
        </motion.div>

        {/* Headline with staggered animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ duration: 0.1 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] mb-6 tracking-tight"
            style={{ color: "hsl(0 0% 100%)" }}
          >
            Build Bold. <br /> <span className="text-gradient-cinematic">Rise Digital.</span>
          </motion.h1>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
          className="text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{ color: "hsl(0 0% 100% / 0.6)" }}
        >
          We engineer digital presence. <br />
          Not templates. Not noise. Real impact. <br />
          Built for those who refuse to be ignored.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-gradient-gold font-display font-bold text-base px-8 py-4 rounded-xl shadow-gold flex items-center gap-2 transition-all duration-300 hover:shadow-2xl"
            style={{ color: "hsl(235 40% 12%)" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Start Your Project
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </MagneticButton>

          <motion.a
            href="#portfolio"
            className="font-display font-semibold text-base px-8 py-4 rounded-xl bg-glass/50 transition-all duration-300 backdrop-blur-xl hover:bg-glass"
            style={{ color: "hsl(0 0% 100% / 0.85)" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            View Our Work
          </motion.a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="mt-20 flex items-center justify-center gap-8 md:gap-16"
        >
          {[
            { value: "500+", label: "Projects" },
            { value: "200+", label: "Happy Clients" },
            { value: "4.9★", label: "Average Rating" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={mounted ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.1 + i * 0.1, duration: 0.5 }}
            >
              <div className="font-display text-2xl md:text-3xl font-black text-gradient-gold">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-widest mt-1" style={{ color: "hsl(0 0% 100% / 0.4)" }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      {/* Animated scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg className="w-6 h-10" viewBox="0 0 24 36" fill="none">
          <path
            d="M12 5L12 25"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.3"
          />
          <motion.path
            d="M12 8L12 20"
            stroke="currentColor"
            strokeWidth="2"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <path
            d="M8 22L12 28L16 22"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.3"
          />
        </svg>
      </motion.div>
    </section>
  );
}
