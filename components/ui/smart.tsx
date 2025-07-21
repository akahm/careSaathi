// components/EmergencyBanner.jsx (Your main banner component)

import { motion } from "framer-motion";
import { Clock, Phone } from "lucide-react";
import EmergencyCallConfirmDialog from "@/components/emergency-call-confirm-dialog"; // Renamed and re-pathed for clarity

const AnimatedSection = motion.section;

export function EmergencyBanner() {
  return (
    <AnimatedSection
      className="relative bg-gradient-to-br from-red-700 via-red-600 to-blue-700 py-8 sm:py-10 md:py-12 lg:py-16 overflow-hidden shadow-inset-2xl"
      initial={{ opacity: 0, y: -80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      style={{
        boxShadow: 'inset 0 0 50px rgba(0,0,0,0.5), inset 0 0 100px rgba(0,0,0,0.3)',
      }}
    >
      {/* Background layers (unchanged from previous unique version) */}
      <motion.div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
      <motion.div
        className="absolute inset-0 z-10"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          background: "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)",
        }}
      />
      <motion.div
        className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Content Layer */}
      <div className="relative z-30 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between text-white gap-8 lg:gap-12">
          {/* Left section: Icon and Text */}
          <div className="flex flex-col sm:flex-row items-center space-y-5 sm:space-y-0 sm:space-x-8 text-center sm:text-left">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                boxShadow: [
                  "0 0 0px transparent",
                  "0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,0,0,0.6), 0 0 60px rgba(0,0,255,0.5)",
                  "0 0 0px transparent",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="p-5 sm:p-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-2 border-white/70 flex-shrink-0"
            >
              <Clock className="w-10 h-10 sm:w-12 sm:h-12 text-white stroke-2" />
            </motion.div>

            <div>
              <motion.h3
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-wide drop-shadow-xl text-shadow-red"
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
              >
                Smart Emergency Care
              </motion.h3>
              <motion.p
                className="text-white/90 text-md sm:text-lg lg:text-xl mt-3 max-w-3xl mx-auto sm:mx-0 drop-shadow-lg"
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
              >
                Activate immediate hospital bed booking (Ventilator & ICU). Rapid ambulance deployment. Real-time bed status updates & guardian alerts.
              </motion.p>
            </div>
          </div>

          {/* Right section: Call to Action Button - Now using EmergencyCallConfirmDialog */}
          <div className="mt-8 lg:mt-0 flex-shrink-0">
            <EmergencyCallConfirmDialog // Renamed component
              triggerLabel={
                <>
                  <Phone className="w-6 h-6 sm:w-7 sm:h-7 mr-4 animate-pulse text-red-500" />
                  <span className="text-2xl sm:text-3xl font-extrabold">
                    CALL EMERGENCY
                  </span> {/* Changed text to be more action-oriented */}
                </>
              }
              phoneNumber="+917084910836" // Pass phone number as a prop
              size="lg"
              className="w-full text-center lg:w-auto bg-white text-red-700 font-extrabold py-5 px-10 rounded-full shadow-3xl hover:shadow-red-500/80 transition-all duration-300 transform hover:scale-105 border-4 border-red-500/80 focus:ring-4 focus:ring-red-300/50"
            />
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}