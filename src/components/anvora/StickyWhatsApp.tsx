import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/1234567890?text=Hi%20Anvora!%20I%27d%20like%20to%20place%20an%20order%20for%20your%20digital%20services.";

export default function StickyWhatsApp() {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-gold shadow-gold flex items-center justify-center"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.15, y: -3 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Place your order on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 text-accent-foreground" />

      {/* Pulse ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-gold"
        animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      />
    </motion.a>
  );
}
