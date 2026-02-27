import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, MessageCircle, Zap } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/1234567890?text=Hi%20Anvora,%20I%20want%20to%20start%20my%20project";

export default function CTASection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);

  return (
    <section id="contact" className="relative py-24 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background pointer-events-none" />

      {/* Animated background elements */}
      <motion.div
        className="absolute top-1/3 -left-1/3 w-[700px] h-[700px] rounded-full blur-[150px]"
        style={{
          background: "hsl(42 92% 55% / 0.1)",
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

      <motion.div
        className="absolute -bottom-1/4 right-[5%] w-[600px] h-[600px] rounded-full blur-[150px]"
        style={{
          background: "hsl(243 80% 55% / 0.1)",
        }}
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        ref={containerRef}
        style={{ scale, opacity }}
        className="relative z-10 container mx-auto px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Main card with gradient border effect */}
          <div className="relative rounded-3xl overflow-hidden">
            {/* Gradient border animation */}
            <motion.div
              className="absolute inset-0 rounded-3xl p-1 opacity-75"
              style={{
                background: "linear-gradient(135deg, hsl(42 92% 55%), hsl(243 80% 55%), hsl(42 92% 55%))",
                backgroundSize: "200% 200%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Content card */}
            <div className="relative bg-gradient-to-br from-gradient-hero via-background to-background rounded-3xl p-10 md:p-20 text-center overflow-hidden group">
              {/* Animated gradient mesh background */}
              <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `radial-gradient(at 20% 50%, hsl(243 80% 55% / 0.2) 0%, transparent 50%),
                    radial-gradient(at 80% 80%, hsl(42 92% 55% / 0.2) 0%, transparent 50%)`,
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-gold/20 backdrop-blur-xl mb-8 mx-auto"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Zap className="w-8 h-8 text-gold" />
                  </motion.div>
                </motion.div>

                {/* Heading */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="font-display text-3xl md:text-6xl font-black mb-6 leading-tight"
                  style={{ color: "hsl(0 0% 100%)" }}
                >
                  Ready to Be{" "}
                  <span className="text-gradient-cinematic">Taken Seriously Online?</span>
                </motion.h2>

                {/* Subtext */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-base md:text-lg max-w-2xl mx-auto mb-8"
                  style={{ color: "hsl(0 0% 100% / 0.65)" }}
                >
                  Tell us your idea. We'll engineer the rest. Your next project is just a message away.
                </motion.p>

                {/* Highlight box */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="inline-block bg-gold/10 backdrop-blur-xl border border-gold/30 rounded-2xl px-6 md:px-8 py-3 md:py-4 mb-10"
                >
                  <p className="text-sm md:text-base font-display font-bold text-gold">
                    ⚡ Fast. Friendly. Professional.
                  </p>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                  <motion.a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-3 bg-gradient-gold font-display font-black text-base md:text-lg px-10 md:px-14 py-5 md:py-6 rounded-2xl shadow-gold transition-all"
                    style={{ color: "hsl(235 40% 12%)" }}
                    whileHover={{
                      scale: 1.08,
                      boxShadow: "0 20px 40px hsl(42 92% 55% / 0.4)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageCircle className="w-6 h-6" />
                    <span>Place Your Order</span>
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-6 h-6" />
                    </motion.div>
                  </motion.a>

                  <motion.a
                    href="#portfolio"
                    className="font-display font-bold text-base md:text-lg px-10 md:px-14 py-5 md:py-6 rounded-2xl bg-glass backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all"
                    style={{ color: "hsl(0 0% 100% / 0.85)" }}
                    whileHover={{ scale: 1.05, borderColor: "hsl(42 92% 55% / 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Our Work
                  </motion.a>
                </motion.div>

                {/* Trust line */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="mt-10 text-xs uppercase tracking-widest font-display font-semibold"
                  style={{ color: "hsl(0 0% 100% / 0.35)" }}
                >
                  ✓ No spam • ✓ No obligations • ✓ Just a friendly chat
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
