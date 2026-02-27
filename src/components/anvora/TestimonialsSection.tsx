import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah K.",
    role: "Startup Founder",
    text: "Anvora turned my rough idea into a beautiful, functional website in days. They truly care about their clients — it felt like working with friends, not vendors.",
    stars: 5,
    company: "TechNova AI",
  },
  {
    id: 2,
    name: "James O.",
    role: "University Student",
    text: "I needed a portfolio fast for internship applications. Anvora delivered something beyond my expectations — and at a student-friendly price!",
    stars: 5,
    company: "CS Student, Stanford",
  },
  {
    id: 3,
    name: "Amina B.",
    role: "Small Business Owner",
    text: "Finally, a team that listens. My bakery website looks amazing, loads fast, and I've already seen more online orders. Highly recommend!",
    stars: 5,
    company: "Bloom Bakery",
  },
  {
    id: 4,
    name: "David L.",
    role: "Freelance Designer",
    text: "The attention to detail and the warmth of the team made all the difference. Anvora doesn't just build websites — they build relationships.",
    stars: 5,
    company: "Design Studio Owner",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-rotate
  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isAutoPlay]);

  const next = () => {
    setCurrent((c) => (c + 1) % testimonials.length);
    setIsAutoPlay(false);
  };

  const prev = () => {
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlay(false);
  };

  const goTo = (index: number) => {
    setCurrent(index);
    setIsAutoPlay(false);
  };

  const t = testimonials[current];

  return (
    <section id="testimonials" className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background pointer-events-none" />

      {/* Ambient glow */}
      <motion.div
        className="absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full blur-[120px]"
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

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm font-semibold text-gold uppercase tracking-[0.2em] mb-4 block font-display"
          >
            What People Say
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-display text-4xl md:text-5xl font-black text-foreground mb-4"
          >
            Loved by <span className="text-gradient-gold">Real People</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            Don't take our word for it. Hear from students, founders, and creators.
          </motion.p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-8 md:p-16 border border-white/10 shadow-cinematic relative overflow-hidden">
                {/* Gradient background glow */}
                <motion.div
                  className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-radial opacity-20 pointer-events-none"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  style={{
                    background:
                      "radial-gradient(circle, hsl(42 92% 55% / 0.3), transparent)",
                  }}
                />

                <div className="relative z-10">
                  {/* Quote mark */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                  >
                    <Quote className="w-12 h-12 text-gold/40" />
                  </motion.div>

                  {/* Testimonial text */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl md:text-2xl text-foreground leading-relaxed mb-8 font-body"
                  >
                    "{t.text}"
                  </motion.p>

                  {/* Stars */}
                  <motion.div
                    className="flex items-center gap-1 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          delay: 0.5 + i * 0.08,
                          type: "spring",
                          stiffness: 200,
                        }}
                      >
                        <Star className="w-5 h-5 fill-gold text-gold" />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Author info */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="border-t border-white/10 pt-8"
                  >
                    <div className="font-display font-black text-lg text-foreground">
                      {t.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t.role} — {t.company}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8">
            {/* Left button */}
            <motion.button
              onClick={prev}
              className="w-12 h-12 rounded-full bg-glass border border-white/10 flex items-center justify-center hover:border-gold/40 transition-all backdrop-blur-xl"
              aria-label="Previous testimonial"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px hsl(42 92% 55% / 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-6 h-6 text-muted-foreground hover:text-gold transition-colors" />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-3">
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all ${
                    i === current
                      ? "bg-gradient-gold w-10 h-3"
                      : "bg-white/20 w-2.5 h-2.5 hover:bg-white/30"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            {/* Right button */}
            <motion.button
              onClick={next}
              className="w-12 h-12 rounded-full bg-glass border border-white/10 flex items-center justify-center hover:border-gold/40 transition-all backdrop-blur-xl"
              aria-label="Next testimonial"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px hsl(42 92% 55% / 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-6 h-6 text-muted-foreground hover:text-gold transition-colors" />
            </motion.button>
          </div>

          {/* Auto-play indicator */}
          <motion.div
            className="mt-10 text-center"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-display font-semibold">
              {isAutoPlay ? "Auto-playing" : "Click navigation to continue"}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
