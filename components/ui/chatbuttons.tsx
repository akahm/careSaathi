"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaWhatsapp } from "react-icons/fa";
import ComingSoonDialog from "@/components/ComingSoonDialog";

export default function FloatingChatButtons() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const buttons = [
    // {
    //   label: "ChatBot",
    //   showDialog: true,
    //   icon: <FaRobot size={28} />,
    //   bgFrom: "from-indigo-500",
    //   bgTo: "to-purple-600",
    // },
    {
      label: "WhatsApp",
      href: "https://wa.me/7084910836",
      icon: <FaWhatsapp size={28} />,
      bgFrom: "from-green-400",
      bgTo: "to-emerald-600",
    }
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed bottom-6 right-6 z-50 flex flex-col gap-5"
        >
          {buttons.map((btn, index) => (
            <div key={index} className="group relative">
              {btn.showDialog ? (
                <ComingSoonDialog
  triggerIcon={
    <div className="flex flex-col items-center justify-center gap-1">
      <FaRobot size={28} />
    </div>
  }
  className={`
    w-16 h-16
    rounded-full 
    bg-gradient-to-br from-indigo-500 to-purple-600 
    backdrop-blur-lg 
    border border-white/10 
    hover:scale-105 
    transition-all 
    shadow-[0_4px_15px_rgba(0,0,0,0.3)] 
    flex items-center justify-center 
    text-white text-center p-2
  `}
/>

              ) : btn.href ? (
                <Link
                  href={btn.href}
                  target="_blank"
                  aria-label={btn.label}
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${btn.bgFrom} ${btn.bgTo} backdrop-blur-lg border border-white/10 hover:scale-105 transition-all shadow-[0_4px_15px_rgba(0,0,0,0.3)] flex items-center justify-center text-white`}
                >
                  {btn.icon}
                </Link>
              ) : (
                <button
                  aria-label={btn.label}
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${btn.bgFrom} ${btn.bgTo} backdrop-blur-lg border border-white/10 hover:scale-105 transition-all shadow-[0_4px_15px_rgba(0,0,0,0.3)] flex items-center justify-center text-white`}
                >
                  {btn.icon}
                </button>
              )}

              {/* Tooltip */}
              <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute right-20 top-1/2 -translate-y-1/2 bg-black/80 text-white text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg max-w-[120px] break-words text-center"
              >
             {btn.label}
              </motion.span>

            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
