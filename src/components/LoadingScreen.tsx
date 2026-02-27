import { useEffect, useCallback, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
    onComplete: () => void;
}

type DeviceTier = 'mobile' | 'tablet' | 'desktop';

function getDeviceTier(): DeviceTier {
    const w = window.innerWidth;
    if (w < 768) return 'mobile';
    if (w < 1024) return 'tablet';
    return 'desktop';
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
    const [tier, setTier] = useState<DeviceTier>(getDeviceTier);
    const [videoReady, setVideoReady] = useState(false);
    const [progress, setProgress] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);
    const completedRef = useRef(false);

    // Re-evaluate tier on resize (edge case: orientation change)
    useEffect(() => {
        const onResize = () => setTier(getDeviceTier());
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const handleEnd = useCallback(() => {
        if (completedRef.current) return;
        completedRef.current = true;
        onComplete();
    }, [onComplete]);

    // ─── Mobile: 2s logo reveal + bar ───────────────────────────────────────
    useEffect(() => {
        if (tier !== 'mobile') return;
        const t = setTimeout(handleEnd, 2000);
        return () => clearTimeout(t);
    }, [tier, handleEnd]);

    // ─── Tablet: 2.5s staggered logo animation ───────────────────────────────
    useEffect(() => {
        if (tier !== 'tablet') return;
        const t = setTimeout(handleEnd, 2500);
        return () => clearTimeout(t);
    }, [tier, handleEnd]);

    // ─── Desktop: video-driven, with 8s hard cap ─────────────────────────────
    useEffect(() => {
        if (tier !== 'desktop') return;
        // Hard cap — never freeze longer than 8 s
        const cap = setTimeout(handleEnd, 8000);
        return () => clearTimeout(cap);
    }, [tier, handleEnd]);

    // Animate progress bar for non-desktop tiers
    useEffect(() => {
        if (tier === 'desktop') return;
        const duration = tier === 'mobile' ? 1800 : 2200;
        const start = performance.now();
        let raf: number;
        const tick = (now: number) => {
            const pct = Math.min((now - start) / duration, 1);
            setProgress(pct);
            if (pct < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [tier]);

    // ─── Render ───────────────────────────────────────────────────────────────
    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{
                opacity: 0,
                scale: 1.04,
                transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
            }}
        >
            {/* ── MOBILE ─────────────────────────────────────────────────────── */}
            {tier === 'mobile' && (
                <div className="flex flex-col items-center justify-center gap-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-anvora-indigo/20 blur-3xl rounded-full scale-150 animate-pulse" />
                        <img
                            src="/logo-removebg-preview.png"
                            alt="Anvora"
                            className="w-24 h-auto relative z-10 drop-shadow-[0_0_12px_rgba(79,70,229,0.5)]"
                        />
                    </motion.div>

                    {/* Thin progress bar */}
                    <div className="w-36 h-[2px] bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-anvora-indigo to-anvora-gold rounded-full transition-none"
                            style={{ width: `${progress * 100}%` }}
                        />
                    </div>
                </div>
            )}

            {/* ── TABLET ─────────────────────────────────────────────────────── */}
            {tier === 'tablet' && (
                <div className="flex flex-col items-center justify-center gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-anvora-indigo/25 blur-2xl rounded-full scale-150 animate-pulse" />
                        <img
                            src="/logo-removebg-preview.png"
                            alt="Anvora"
                            className="w-28 h-auto relative z-10 drop-shadow-[0_0_14px_rgba(79,70,229,0.55)]"
                        />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, letterSpacing: '0.3em' }}
                        animate={{ opacity: 0.5, letterSpacing: '0.45em' }}
                        transition={{ duration: 1.1, delay: 0.3, ease: 'easeOut' }}
                        className="text-white/50 text-[10px] uppercase tracking-widest font-light"
                    >
                        ANVORA INTERACTIVE
                    </motion.p>

                    {/* Progress bar */}
                    <div className="w-44 h-[2px] bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-anvora-indigo to-anvora-gold rounded-full transition-none"
                            style={{ width: `${progress * 100}%` }}
                        />
                    </div>
                </div>
            )}

            {/* ── DESKTOP ────────────────────────────────────────────────────── */}
            {tier === 'desktop' && (
                <>
                    <video
                        ref={videoRef}
                        src="/loading.mp4?v=1"
                        autoPlay
                        muted
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover"
                        onEnded={handleEnd}
                        onCanPlayThrough={() => setVideoReady(true)}
                        onError={() => {
                            console.error('Loading video failed');
                            handleEnd();
                        }}
                    />

                    {/* Buffering indicator — shown only while video hasn't started */}
                    {!videoReady && (
                        <motion.div
                            className="absolute inset-0 flex flex-col items-center justify-center bg-black gap-6"
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.4 } }}
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-anvora-indigo/20 blur-3xl rounded-full scale-150 animate-pulse" />
                                <img
                                    src="/logo-removebg-preview.png"
                                    alt="Anvora"
                                    className="w-28 h-auto relative z-10 drop-shadow-[0_0_14px_rgba(79,70,229,0.5)]"
                                />
                            </div>
                            {/* Elegant spinner ring */}
                            <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-anvora-indigo animate-spin" />
                        </motion.div>
                    )}
                </>
            )}

            {/* Shared vignette crossfade on exit */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(circle at 50% 0%, hsl(243 40% 12%) 0%, hsl(235 45% 6%) 60%)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 1, transition: { duration: 0.9, delay: 0.1 } }}
            />
        </motion.div>
    );
};
