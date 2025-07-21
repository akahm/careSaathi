"use client" // This must be at the very top for client-side functionality

import React, { useState, useEffect, useRef } from "react"
import {
  Phone, Heart, Users, Clock, Stethoscope, HeartHandshake,
  Truck, Building2, Star, CheckCircle, ArrowRight, Award,
  Moon, Sun, Menu, X, ChevronLeft, ChevronRight, Quote,
  Download, Smartphone, Activity, Zap, Mail, PhoneIcon,
  Play, Calendar, HeartIcon, Brain, Shield // Added Brain and Shield for networkNodes
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ComingSoonDialog from "@/components/ComingSoonDialog"

import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useTheme } from "@/components/theme-provider"
import doctorPersonImage from "@/public/i.png" 
import { useIsMobile } from "@/hooks/use-mobile"


function AnimatedCounter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, end, duration])

  return <span ref={ref}>{count.toLocaleString()}</span>
}

// Animated Section Component
function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// --- Data for CareSaathiNetworkHero part ---
const networkNodes = [
  { icon: Shield, label: "Verified Elderly", angle: 0, delay: 0.2 },
  { icon: Truck, label: "Emergency Ambulance", angle: 60, delay: 0.4 },
  { icon: Building2, label: "Hospital Booking", angle: 120, delay: 0.6 },
  { icon: Brain, label: "Mental Wellness", angle: 180, delay: 0.8 },
  { icon: Heart, label: "2nd Opinions", angle: 240, delay: 1.0 },
  { icon: Heart, label: "AI Emotional Companion", angle: 300, delay: 1.2 },
  { icon: Heart, label: "Post Surgery Care", angle: 360, delay: 1.4 },
]

// --- Main HomePage Component ---
export default function HomePage() {
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [currentPoster, setCurrentPoster] = useState(0)
  
  const [radius, setRadius] = useState(245);

const getRadius = () => {
  if (typeof window !== "undefined") {
    const w = window.innerWidth;
    if (w < 640) return 150;   // mobile
    if (w < 1024) return 180;  // tab
    return 245;                // desktop
  }
  return 245;
};
useEffect(() => {
  setRadius(getRadius());
  const handleResize = () => setRadius(getRadius());
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  // These transforms are for the main hero section's background elements (if any are still using them)
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3])

  const backgroundPosters = [
    {
      title: "Emergency Response",
      subtitle: "AI-Powered • Instant Care",
      gradient: "from-red-500 via-red-600 to-orange-500",
      bgImage: "linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(251, 146, 60, 0.1) 100%)",
      icon: Truck,
      pattern: "emergency",
    },
    {
      title: "Home Care Services",
      subtitle: "Verified • Compassionate",
      gradient: "from-blue-500 via-blue-600 to-cyan-500",
      bgImage: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)",
      icon: Users,
      pattern: "homecare",
    },
    {
      title: "Expert Consultations",
      subtitle: "Specialists • Video Calls",
      gradient: "from-green-500 via-emerald-600 to-teal-500",
      bgImage: "linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(20, 184, 166, 0.1) 100%)",
      icon: Stethoscope,
      pattern: "consultation",
    },
    {
      title: "Emotional Support",
      subtitle: "AI Companion • Peer Care",
      gradient: "from-purple-500 via-violet-600 to-indigo-500",
      bgImage: "linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)",
      icon: HeartHandshake,
      pattern: "support",
    },
  ]




  return (
    <>
      {/* Enhanced Hero Section with Dynamic Background */}
      <section
        ref={heroRef}
        className="relative overflow-hidden min-h-screen flex items-center pt-20"
      >
        {/* Dynamic Background Poster */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPoster}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
            
          >
            {/* Animated Pattern Overlay */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    x: [0, Math.random() * 100 - 50, 0],
                    y: [0, Math.random() * 100 - 50, 0],
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 10 + Math.random() * 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute w-8 h-8 sm:w-12 sm:h-12 opacity-10 dark:opacity-5"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                >
                  {React.createElement(
                    [
                      Truck, Users, Stethoscope, Heart, Activity, Zap, Building2, HeartHandshake,
                    ][i % 8],
                    { className: "w-full h-full text-blue-350 " }
                  )}
                </motion.div>
              ))}
            </div>

            {/* Gradient Overlay */}
          </motion.div>
        </AnimatePresence>

        {/* Main Content Container of Hero Section */}
        <div className="relative z-10 container mx-auto px-5 py-0">
          <div className="grid lg:grid-cols-2 gap-2 lg:gap-8 items-center">
            {/* Left Content (Text, Badge, Buttons, Stats) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 text-center lg:text-left lg:space-y-8 lg:pl-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Badge className="bg-gradient-to-r from-blue-900 to-red-900 text-white dark:text-blue-200 border-0 px-3 py-1.5 text-xs sm:text-sm font-medium hover:scale-105 transition-transform cursor-pointer">
                  🏥 India's Most Trusted Healthcare Platform
                  <Award className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                </Badge>
              </motion.div>

              {/* Headings */}
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
                >
                  <motion.span
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="block bg-gradient-to-r from-blue-800 via-blue-600 to-red-600 bg-clip-text text-transparent"
                  >
                    Your Companion
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="block bg-gradient-to-r from-red-700 via-red-400 to-blue-600 bg-clip-text text-transparent"
                  >
                    in Care
                  </motion.span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-md sm:text-lg lg:text-xl font-semibold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent"
                >
                  "Apno ke liye apno jaisa saathi"
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl"
                >
                  Experience India's next-gen healthcare platform with
                  AI-powered emergency response, verified home care, and 24/7
                  emotional support.
                </motion.p>
              </div>

              {/* Poster Info */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPoster}
                  initial={{ opacity: 0, x: -20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center space-x-4 p-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-slate-700/30 shadow-lg"
                >
                  <motion.div
                    animate={{
                      rotate: [0, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className={`w-12 h-12 bg-gradient-to-br ${backgroundPosters[currentPoster].gradient} rounded-xl flex items-center justify-center shadow-lg`}
                  >
                    {React.createElement(
                      backgroundPosters[currentPoster].icon,
                      { className: "w-6 h-6 text-white" }
                    )}
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm sm:text-base">
                      {backgroundPosters[currentPoster].title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      {backgroundPosters[currentPoster].subtitle}
                    </p>
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 bg-green-500 rounded-full ml-auto"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
              >
                <ComingSoonDialog
                  triggerLabel={
                    <>
                      Emergency Care
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                    </>
                  }
                  triggerIcon={<HeartIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />}
                  size="lg"
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                />

                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Watch Demo
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="grid grid-cols-3 gap-3"
              >
                <div className="text-center mb-3">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
                    <AnimatedCounter end={500} />
                    +
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    Happy Families
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                    24/7
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    Emergency Support
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
                    <AnimatedCounter end={50} />+
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    Partner Hospitals
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content: Integrated CareSaathiNetworkHero's visual */}
            <div className="relative w-full h-[450px]
                           sm:w-full sm:h-[450px]
                           md:w-full md:h-[480px]
                           lg:w-full lg:h-[510px] flex items-center justify-center lg:mt-0">
           
              <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-200">
                <div className="w-52 h-52 md:w-70 md:h-70 lg:w-96 lg:h-96 rounded-full flex items-center justify-center relative overflow-hidden shadow-2xl">
                  {/* Rotating Gradient Ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 12, ease: "linear" }}
                    className="absolute inset-0 rounded-full"
                  >
                    <div className="w-full h-full rounded-full bg-gradient-to-r from-red-600 to-blue-600 p-[8px] shadow-inner shadow-blue-500/30">
                      <div className="w-full h-full rounded-full bg-white dark:bg-black shadow-xl"></div>
                    </div>
                  </motion.div>

                  {/* Image */}
                  <img
                    src={typeof doctorPersonImage === "string" ? doctorPersonImage : doctorPersonImage.src}
                    alt="Healthcare Professional"
                    className="relative w-44 h-44 md:w-70 md:h-70 lg:w-80 lg:h-80 object-cover rounded-full shadow-2xl z-10"
                  />
                </div>

                {/* Orbiting Nodes */}
                <div className="absolute inset-0 flex items-center justify-center"> {/* Centered within its parent */}
                  {networkNodes.map((node, index) => {
                    const angleRad = (node.angle * Math.PI) /360 
                    // We'll calculate x and y relative to the center of the image container
                    const nodeX = radius* Math.cos(angleRad)
                    const nodeY = radius * Math.sin(angleRad)

                    return (
                      <motion.div
                        key={`node-${index}`}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: node.delay, type: "spring" }}
                        className="absolute"
                        style={{
                          left: `calc(35% + ${nodeX}px)`,
                          top: `calc(34% + ${nodeY}px)`,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <motion.div
                          whileHover={{
                            scale: 1.1,
                            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(220, 38, 38, 0.05)",
                          }}
                          whileTap={{ scale: 0.95 }}
                          className="
                            w-16 h-16 sm:w-22 sm:h-22 md:w-22 md:h-22 lg:w-24 lg:h-24
                            rounded-full shadow-lg flex flex-col items-center justify-center
                            border-2 border-purple-200/50 dark:text-white  p-1 sm:p-1.5  lg:mt-[20px] lg:ml-[10px] md:mt-[-10px] text-center z-10
                          "
                        >
                          <node.icon className="w-5 h-5 sm:w-6 h-6 md:w-7 h-7 lg:w-10 h-10 text-blue-600 mb-1" />
                          <span className="text-[8px] sm:text-[7px] md:text-[8px] lg:text-xs text-gray-700 dark:text-white font-semibold leading-tight">
                            {node.label}
                          </span>
                        </motion.div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
              <motion.div className="flex justify-center absolute lg:bottom-[-20px] bottom-2 sm:bottom-10 w-full px-4">
                <div className="flex flex-col sm:flex-row gap-4 max-w-4xl w-full justify-center mt-4">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white flex items-center justify-center"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    App Launching Soon
                  </Button>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white flex items-center justify-center"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Appointment
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Banner (remains unchanged) */}
      <AnimatedSection className="relative bg-gradient-to-r from-red-600 via-red-500 to-blue-600 py-4 sm:py-10 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        />
        <div className="relative container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between text-white gap-4 lg:gap-6">
            <div className="flex items-center space-x-4 sm:space-x-6">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
              >
                <Clock className="w-5 h-5 sm:w-8 sm:h-8" />
              </motion.div>
              <div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1">Smart Emergency Response</h3>
                <p className="text-red-100 text-sm sm:text-base lg:text-md">
                  One-Tap Hospital Bed Booking with Ventilator & ICU + Instant Ambulance in Minutes and real-time Bed Booking + Guardian Notification
                </p>
              </div>
            </div>
            <ComingSoonDialog
              triggerLabel={
                <>
                  Call Emergency: +91 7084910836
                </>
              }
              triggerIcon={<Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />}
              size="lg"
              className="bg-white text-red-600 hover:bg-red-50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base"
            />
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}