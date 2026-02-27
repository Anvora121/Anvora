
import { useRef } from 'react';
import { motion, useInView, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';

const stats = [
    { label: "Projects Completed", value: 3, suffix: "+" },
    { label: "Active Builds", value: 3, suffix: "" },
    { label: "Satisfied Clients", value: 100, suffix: "%" },
];

const AnimatedCounter = ({
    value,
    suffix,
    trigger,
}: {
    value: number;
    suffix: string;
    trigger: boolean;
}) => {
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { damping: 40, stiffness: 90 });
    const rounded = useTransform(springValue, (latest) => Math.round(latest));

    useEffect(() => {
        if (trigger) {
            motionValue.set(value);
        }
    }, [trigger, value, motionValue]);

    return (
        <span className="text-4xl md:text-5xl font-bold text-white font-display">
            <motion.span>{rounded}</motion.span>{suffix}
        </span>
    );
};


export const WhoWeAre = () => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-30%" });

    return (
        <section id="about" className="py-24 bg-anvora-black relative overflow-hidden">
            {/* 3D Abstract Shape Placeholder - CSS Circle for now */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] rounded-full border-[2px] border-anvora-indigo/10 blur-[2px] animate-grid-spin" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 w-[500px] h-[500px] rounded-full border-[1px] border-anvora-gold/10 blur-[1px] animate-[spin_10s_linear_infinite_reverse]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl">
                    <motion.div
                        ref={containerRef}
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-anvora-gold text-sm font-medium tracking-[0.3em] uppercase mb-4">
                            Start With Obsession
                        </h2>
                        <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-8 flex flex-col gap-4">
                            <span>Late nights. No investors.</span>
                            <span>Just skill and <span className="text-anvora-indigo">intent.</span></span>
                        </h3>
                        <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mb-12">
                            We build for students who want more than resumes. For startups that need credibility.
                            For creators who refuse to look small online. We don't just write code; we architect your digital authority.
                        </p>
                    </motion.div>

                    {/* Counters */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-white/10 pt-12">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                            >
                                <AnimatedCounter value={stat.value} suffix={stat.suffix} trigger={isInView} />
                                <p className="text-sm text-gray-500 uppercase tracking-wider mt-2">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
