
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useState, useEffect } from 'react';

const testimonials = [
    {
        text: "Anvora didn’t just build a website. They engineered a digital identity that fundamentally changed how clients perceive us. The ROI was immediate.",
        author: "Sarah Jenkins",
        role: "CEO, Horizon Ventures"
    },
    {
        text: "I was skeptical about 'cinematic' web design until I saw the first draft. It felt like watching a movie trailer for my own business.",
        author: "David Chen",
        role: "Founder, Chen Dynamics"
    },
    {
        text: "Fast. Professional. And insanely good at what they do. If you want to stand out, you need Anvora.",
        author: "Marcus Aurelius",
        role: "Influencer, 1M+ Followers"
    }
];

export const Testimonials = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-24 bg-anvora-black relative overflow-hidden flex items-center justify-center">
            {/* Background Glow */}
            {/* Background Glow & Grain */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-anvora-indigo/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute inset-0 z-[1] opacity-[0.05] pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
            />

            <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center">
                <Quote className="w-12 h-12 text-anvora-gold mx-auto mb-8 opacity-50" />

                <div className="min-h-[300px] relative">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            className="absolute inset-0 flex flex-col items-center justify-center p-8 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm"
                            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                            animate={{
                                opacity: i === index ? 1 : 0,
                                scale: i === index ? 1 : 0.9,
                                filter: i === index ? "blur(0px)" : "blur(10px)",
                                pointerEvents: i === index ? 'auto' : 'none',
                                zIndex: i === index ? 10 : 0
                            }}
                            transition={{ duration: 0.8 }}
                        >
                            <h3 className="text-2xl md:text-4xl font-display font-medium text-white leading-relaxed mb-8 relative z-10">
                                "{t.text}"
                            </h3>
                            <div className="relative z-10">
                                <p className="text-lg font-bold text-white">{t.author}</p>
                                <p className="text-anvora-gold/80">{t.role}</p>
                            </div>

                            {/* Subtle Glass Shine */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-3xl pointer-events-none" />
                        </motion.div>
                    ))}
                </div>

                {/* Indicators */}
                <div className="flex justify-center gap-3 mt-8">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === index ? 'bg-anvora-gold w-8' : 'bg-white/20'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
