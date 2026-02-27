import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingSceneProps {
  onComplete: () => void;
  duration?: number;
}

function GlowingDot() {
  return (
    <motion.div className="relative w-16 h-16">
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(42 92% 55% / 0.4), transparent)",
        }}
        animate={{
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Center dot expansion */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-gold"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1, 0.5] }}
        transition={{
          duration: 2,
          times: [0, 0.3, 1],
          ease: "easeOut",
        }}
      />

      {/* Grid wireframe sphere effect */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        style={{ opacity: 0.6 }}
      >
        <motion.circle
          cx="50"
          cy="50"
          r="30"
          fill="none"
          stroke="hsl(42 92% 55%)"
          strokeWidth="0.5"
          animate={{ r: [20, 35, 20] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.circle
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke="hsl(243 80% 55%)"
          strokeWidth="0.5"
          animate={{ r: [10, 25, 10] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
        />
      </svg>
    </motion.div>
  );
}

function ParticleField() {
  const [particles] = useState(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 1.5,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `50%`,
            top: `50%`,
            width: 2,
            height: 2,
            background: p.id % 2 === 0 ? "hsl(42 92% 55%)" : "hsl(243 80% 55%)",
            marginLeft: -1,
            marginTop: -1,
          }}
          animate={{
            x: [0, p.x * 2, p.x],
            y: [0, p.y * 2, p.y],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

const textSequence = [
  { text: "Initializing Presence…", duration: 1.8 },
  { text: "Calibrating Design…", duration: 1.8 },
  { text: "Engineering Impact…", duration: 1.8 },
];

export default function LoadingScene({ onComplete, duration = 3.5 }: LoadingSceneProps) {
  const [currentText, setCurrentText] = useState(0);
  const [showFinal, setShowFinal] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (currentText < textSequence.length) {
      timeoutId = setTimeout(() => {
        setCurrentText((prev) => prev + 1);
      }, textSequence[currentText].duration * 1000);
    } else if (!showFinal) {
      // All text sequences done, show final message
      setShowFinal(true);
      timeoutId = setTimeout(() => {
        // Start fade out
      }, 800);
    }

    return () => clearTimeout(timeoutId);
  }, [currentText, showFinal]);

  useEffect(() => {
    const completeTimer = setTimeout(onComplete, duration * 1000);
    return () => clearTimeout(completeTimer);
  }, [onComplete, duration]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        style={{ background: "hsl(235 45% 8%)" }}
      >
        <ParticleField />

        <div className="relative z-10 flex flex-col items-center gap-8">
          {/* Glowing center */}
          <GlowingDot />

          {/* Text sequence */}
          <div className="h-12 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {currentText < textSequence.length && (
                <motion.h2
                  key={`text-${currentText}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="font-display font-bold text-xl md:text-2xl text-center"
                  style={{ color: "hsl(0 0% 100% / 0.8)" }}
                >
                  {textSequence[currentText].text}
                </motion.h2>
              )}

              {showFinal && (
                <motion.h2
                  key="final"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="font-display font-black text-2xl md:text-4xl text-center text-gradient-gold"
                >
                  Welcome to Anvora.
                </motion.h2>
              )}
            </AnimatePresence>
          </div>

          {/* Progress indicator */}
          <motion.div
            className="w-64 h-1 bg-white/10 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <motion.div
              className="h-full bg-gradient-gold"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration, ease: "linear" }}
            />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
