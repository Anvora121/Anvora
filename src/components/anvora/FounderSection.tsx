import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const storyText = [
  "Most websites exist.",
  "They're generic. Forgettable.\nNoise in an endless scroll.",
  "They don't convert. They don't build trust.",
  "They don't create connection.",
  "We saw that problem.",
  "Late nights. No investors. Just skill and obsession.",
  "We started building differently.",
  "Every line of code. Intentional.",
  "Every animation. Purposeful.",
  "Every interaction. Magnetic.",
];

function AnimatedCounter({ value }: { value: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let current = 0;
    const increment = value / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, 20);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div ref={ref} className="font-display text-4xl md:text-5xl font-black text-gradient-gold">
      {displayValue}+
    </div>
  );
}

export default function FounderSection() {
  const containerRef = useRef(null);
  const [sectionProgress, setSectionProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const element = containerRef.current as HTMLElement;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how far through the section we are (0-1)
      const progress = Math.max(
        0,
        Math.min(1, 1 - (rect.top - windowHeight) / (windowHeight + rect.height))
      );

      setSectionProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once initially
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-64 overflow-hidden min-h-[200vh] flex items-center"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/50" />

      {/* Animated background shapes */}
      <motion.div
        className="absolute top-1/4 right-[10%] w-[400px] h-[400px] rounded-full blur-[120px]"
        style={{
          background: "hsl(243 80% 55% / 0.08)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          scale: { duration: 15, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 60, repeat: Infinity, ease: "linear" },
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-[5%] w-[350px] h-[350px] rounded-full blur-[100px]"
        style={{
          background: "hsl(42 92% 55% / 0.05)",
        }}
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 container mx-auto px-6 sticky top-1/2 -translate-y-1/2">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Story text - left side */}
          <div className="flex flex-col gap-6 md:gap-10">
            {storyText.map((text, index) => {
              const startProgress = (index * 1) / storyText.length;
              const endProgress = ((index + 1) * 1) / storyText.length;
              const isActive = sectionProgress >= startProgress && sectionProgress < endProgress;
              const activeProgress = Math.max(0, Math.min(1, (sectionProgress - startProgress) / (endProgress - startProgress)));

              const opacity = isActive ? activeProgress : sectionProgress > endProgress ? 1 : 0;
              const displayText = sectionProgress > endProgress || isActive;

              return (
                <motion.div
                  key={index}
                  style={{ opacity }}
                  transition={{ duration: 0.2 }}
                  className={`transition-all duration-300 ${
                    displayText ? "text-3xl md:text-4xl text-foreground" : "text-2xl md:text-3xl text-muted-foreground"
                  }`}
                >
                  {displayText && (
                    <h2 className="font-display font-black leading-tight whitespace-pre-line">
                      {text}
                    </h2>
                  )}
                </motion.div>
              );
            })}

            {/* Final message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={sectionProgress > 0.9 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8 }}
              className="mt-8 pt-8 border-t border-border"
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                Now, we work with students building portfolios, startups launching with authority,
                and creators who refuse to look small online.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                <span className="text-gold font-display font-bold">Every project. Same obsession.</span>
              </p>
            </motion.div>
          </div>

          {/* Stats and visual side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={sectionProgress > 0.3 ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-8">
              <motion.div
                className="bg-glass rounded-2xl p-8 text-center backdrop-blur-xl"
                whileHover={{ y: -5, boxShadow: "0 20px 40px hsl(243 80% 55% / 0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <AnimatedCounter value={500} />
                <p className="text-muted-foreground text-sm mt-4 uppercase tracking-widest font-display font-semibold">
                  Projects Built
                </p>
              </motion.div>

              <motion.div
                className="bg-glass rounded-2xl p-8 text-center backdrop-blur-xl"
                whileHover={{ y: -5, boxShadow: "0 20px 40px hsl(243 80% 55% / 0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <AnimatedCounter value={200} />
                <p className="text-muted-foreground text-sm mt-4 uppercase tracking-widest font-display font-semibold">
                  Happy Clients
                </p>
              </motion.div>

              <motion.div
                className="bg-glass rounded-2xl p-8 text-center backdrop-blur-xl"
                whileHover={{ y: -5, boxShadow: "0 20px 40px hsl(243 80% 55% / 0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="font-display text-4xl md:text-5xl font-black text-gradient-gold">
                  4.9
                </div>
                <p className="text-muted-foreground text-sm mt-4 uppercase tracking-widest font-display font-semibold">
                  Avg Rating
                </p>
              </motion.div>

              <motion.div
                className="bg-glass rounded-2xl p-8 text-center backdrop-blur-xl"
                whileHover={{ y: -5, boxShadow: "0 20px 40px hsl(243 80% 55% / 0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="font-display text-4xl md:text-5xl font-black text-gradient-gold">
                  24h
                </div>
                <p className="text-muted-foreground text-sm mt-4 uppercase tracking-widest font-display font-semibold">
                  Response Time
                </p>
              </motion.div>
            </div>

            {/* Values section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={sectionProgress > 0.6 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-gold/10 backdrop-blur-xl border border-gold/20 rounded-2xl p-8 md:p-10"
            >
              <h3 className="font-display font-black text-xl mb-6 text-foreground">
                Our Promise
              </h3>
              <ul className="space-y-4">
                {[
                  "Crafted with obsession, not templates",
                  "Speed meets pixel-perfect precision",
                  "We treat your project like our own",
                  "Transparency from day one",
                ].map((promise, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={sectionProgress > 0.6 ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 text-muted-foreground"
                  >
                    <span className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                    {promise}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
