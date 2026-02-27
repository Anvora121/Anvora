
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const items = [
    { text: "Portfolio Refine → Internship Secured", color: "indigo" },
    { text: "Startup Launch → First 100 Users", color: "gold" },
    { text: "Brand Identity → Series A Funding", color: "indigo" },
    { text: "E-commerce Redesign → 300% Sales", color: "gold" },
];

export const Community = () => {
    return (
        <section className="py-24 bg-anvora-black relative overflow-hidden">
            {/* Network Connections Background */}
            <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none">
                <svg className="w-full h-full">
                    <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1" fill="white" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    <path d="M0,100 Q400,150 800,100 T1600,100" stroke="white" strokeWidth="1" fill="none" className="animate-pulse" />
                    <path d="M0,300 Q400,350 800,300 T1600,300" stroke="white" strokeWidth="1" fill="none" className="animate-pulse delay-700" />
                </svg>
            </div>
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-anvora-gold text-sm font-medium tracking-[0.3em] uppercase mb-4">
                        Community
                    </h2>
                    <h3 className="text-4xl md:text-5xl font-display font-bold text-white">
                        Built With Students. <br /> For Students.
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group glass-card p-8 rounded-2xl border border-white/5 hover:border-anvora-gold/30 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className={`absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity`}>
                                <ArrowUpRight className={`w-5 h-5 ${item.color === 'gold' ? 'text-anvora-gold' : 'text-anvora-indigo'} group-hover:animate-pulse`} />
                            </div>

                            <p className="text-lg font-medium text-white/90 relative z-10 leading-relaxed group-hover:text-white transition-colors">
                                {item.text}
                            </p>

                            {/* Hover Glow */}
                            <div className={`absolute -bottom-10 -right-10 w-24 h-24 rounded-full blur-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100 bg-${item.color === 'gold' ? 'anvora-gold' : 'anvora-indigo'}/20`} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
