import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 h-1 z-[60] origin-left bg-gradient-gold"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
