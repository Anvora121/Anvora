import { motion } from 'framer-motion';

export const BrandLogo = () => {
    return (
        <div className="relative inline-flex items-center justify-center overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10"
            >
                {/* Base Metallic Silver Gradient Text */}
                <span
                    className="font-display font-semibold text-2xl uppercase select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                    style={{
                        letterSpacing: '3px',
                        backgroundImage: 'linear-gradient(180deg, #F2F6FB 0%, #C9D4E2 50%, #9FAEC0 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}
                >
                    ANVORA
                </span>

                {/* Subtle Cool Blue Outer Glow */}
                <span
                    className="absolute inset-0 -z-10 font-display font-semibold text-2xl uppercase blur-md select-none pointer-events-none"
                    style={{
                        letterSpacing: '3px',
                        color: 'hsl(220 60% 70% / 0.35)',
                    }}
                >
                    ANVORA
                </span>

                {/* One-time Light Sweep */}
                <motion.span
                    className="absolute inset-0 font-display font-semibold text-2xl uppercase pointer-events-none select-none"
                    style={{
                        letterSpacing: '3px',
                        backgroundImage: 'linear-gradient(90deg, transparent 0%, transparent 30%, rgba(255,255,255,0.45) 50%, transparent 70%, transparent 100%)',
                        backgroundSize: '200% 100%',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}
                    initial={{ backgroundPosition: "150% 0%" }}
                    animate={{ backgroundPosition: "-50% 0%" }}
                    transition={{
                        duration: 1.8,
                        ease: "easeInOut",
                        delay: 1.0,
                        repeat: 0,
                    }}
                >
                    ANVORA
                </motion.span>
            </motion.div>
        </div>
    );
};
