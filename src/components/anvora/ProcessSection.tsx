import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, Code2, Rocket } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    number: "01",
    title: "You Send The Idea",
    description: "Drop us a message on WhatsApp with your vision. Tell us what you want to build and we'll understand.",
    icon_color: "hsl(42 92% 55%)",
  },
  {
    icon: Code2,
    number: "02",
    title: "We Architect & Design",
    description: "Our team designs, codes, and crafts a website that's fast, beautiful, and converts visitors into believers.",
    icon_color: "hsl(243 60% 55%)",
  },
  {
    icon: Rocket,
    number: "03",
    title: "You Launch With Authority",
    description: "Your website goes live with impact. You get a digital asset that demands attention and builds trust.",
    icon_color: "hsl(42 92% 55%)",
  },
];

export default function ProcessSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Translate X based on scroll progress
  const translateX = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[300vh] flex items-center overflow-hidden bg-gradient-to-b from-background via-background/50 to-background"
    >
      {/* Ambient background */}
      <motion.div
        className="absolute top-1/4 right-[10%] w-[500px] h-[500px] rounded-full blur-[120px]"
        style={{
          background: "hsl(243 80% 55% / 0.08)",
        }}
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-[5%] w-[400px] h-[400px] rounded-full blur-[100px]"
        style={{
          background: "hsl(42 92% 55% / 0.06)",
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="sticky top-0 w-full h-screen flex items-center overflow-hidden">
        <div className="w-full">
          {/* Header */}
          <motion.div
            className="text-center mb-20 px-6 relative z-20"
            initial={{ opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm font-semibold text-gold uppercase tracking-[0.2em] mb-4 block font-display"
            >
              How It Works
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="font-display text-4xl md:text-5xl font-black text-foreground mb-4"
            >
              From Idea to <span className="text-gradient-gold">Digital Authority</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-muted-foreground max-w-2xl mx-auto text-lg"
            >
              Three intentional steps. No fluff. One powerful result.
            </motion.p>
          </motion.div>

          {/* Scrollable cards container */}
          <motion.div
            style={{ x: translateX }}
            className="flex gap-8 md:gap-12 px-6 md:px-12 w-max"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                transition={{ delay: 0.3 + index * 0.2, duration: 0.8 }}
                className="relative flex-shrink-0 w-96"
              >
                {/* Card */}
                <motion.div
                  className="bg-glass rounded-3xl p-10 md:p-12 backdrop-blur-xl border border-white/10 h-full flex flex-col relative overflow-hidden group"
                  whileHover={{ y: -8, boxShadow: "0 30px 60px rgba(255,255,255,0.1)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {/* Gradient overlay on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 pointer-events-none"
                    style={{
                      backgroundImage: `linear-gradient(135deg, hsl(243 80% 55% / 0.5), hsl(42 92% 55% / 0.5))`,
                    }}
                  />

                  {/* Number */}
                  <div className="font-display text-7xl font-black text-muted/20 absolute -top-8 -right-8">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <motion.div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 relative z-10"
                    style={{ background: `${step.icon_color}20` }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <step.icon className="w-8 h-8" style={{ color: step.icon_color }} />
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10 flex-1">
                    <h3 className="font-display text-2xl font-black text-foreground mb-4">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <motion.div
                    className="h-1 w-0 bg-gradient-gold mt-6 group-hover:w-12 transition-all duration-300 rounded-full"
                  />
                </motion.div>

                {/* Connector arrow (hidden on last) */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="absolute -right-8 top-1/2 -translate-y-1/2 z-20 pointer-events-none"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <svg
                      className="w-8 h-8 text-gold/40"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-display font-semibold">
              Scroll to explore
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
