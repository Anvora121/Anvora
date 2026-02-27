import { motion } from "framer-motion";
import { Users, Star, TrendingUp, Award, ArrowUpRight, Heart } from "lucide-react";

const stats = [
  { icon: Users, value: "500+", label: "Happy Clients", color: "hsl(42 92% 55%)" },
  { icon: Star, value: "4.9", label: "Average Rating", color: "hsl(42 92% 55%)" },
  { icon: TrendingUp, value: "200+", label: "Projects Delivered", color: "hsl(243 80% 55%)" },
  { icon: Award, value: "50+", label: "Community Projects", color: "hsl(243 80% 55%)" },
];

const projects = [
  {
    title: "Portfolio → Internship",
    description: "Student portfolios that directly led to internship offers at top tech companies.",
    tag: "Student Success",
    impact: "120+ students helped",
    icon: Award,
  },
  {
    title: "Startup → First Users",
    description: "Launch websites that captured first 100 users within the first week.",
    tag: "Growth",
    impact: "50+ startups launched",
    icon: TrendingUp,
  },
  {
    title: "Creator → Community",
    description: "Portfolio and community sites that built engaged audiences from scratch.",
    tag: "Impact",
    impact: "1M+ reach created",
    icon: Users,
  },
];

export default function CommunitySection() {
  return (
    <section id="community" className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background pointer-events-none" />

      {/* Ambient glow */}
      <motion.div
        className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full blur-[120px]"
        style={{
          background: "hsl(243 80% 55% / 0.08)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          y: [0, -40, 0],
        }}
        transition={{
          scale: { duration: 15, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 12, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px]"
        style={{
          background: "hsl(42 92% 55% / 0.06)",
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
            Built With Students. For Students.
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-display text-4xl md:text-5xl font-black text-foreground mb-4"
          >
            Our Community's <span className="text-gradient-gold">Real Impact</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            We don't just build websites. We build futures. Here's what our community achieved.
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative"
            >
              <div className="bg-glass backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/10 hover:border-white/20 transition-all duration-300 text-center h-full">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: `${stat.color}20`,
                  }}
                >
                  <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                </motion.div>
                <div className="font-display text-3xl md:text-4xl font-black text-foreground">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground mt-2 uppercase tracking-wider font-display font-semibold">
                  {stat.label}
                </div>

                {/* Glow on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  whileHover={{
                    boxShadow: `0 0 40px ${stat.color}30`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Impact Stories */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl font-black text-foreground mb-10 text-center"
          >
            Stories of Success
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, i) => {
              const IconComponent = project.icon;
              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="group relative"
                >
                  <motion.div
                    className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl rounded-2xl p-8 md:p-10 border border-white/10 hover:border-gold/30 transition-all duration-300 h-full relative overflow-hidden"
                    whileHover={{ y: -5, boxShadow: "0 30px 60px hsl(42 92% 55% / 0.1)" }}
                  >
                    {/* Gradient background on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    />

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-6">
                        <motion.div
                          className="w-12 h-12 rounded-xl flex items-center justify-center bg-gold/20"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <IconComponent className="w-6 h-6 text-gold" />
                        </motion.div>
                        <motion.div
                          animate={{ rotate: [0, 20, 0] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          <Heart className="w-4 h-4 text-gold/60" />
                        </motion.div>
                      </div>

                      <h4 className="font-display text-xl font-black text-foreground mb-3 group-hover:text-gold transition-colors">
                        {project.title}
                      </h4>

                      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                        {project.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="inline-block text-xs font-bold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1.5 rounded-full font-display">
                          {project.tag}
                        </span>
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <ArrowUpRight className="w-4 h-4 text-gold" />
                        </motion.div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-white/10">
                        <p className="text-xs font-display font-semibold text-gold">
                          {project.impact}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
