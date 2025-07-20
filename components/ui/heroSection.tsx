"use client";

import React from "react";

import { useState, useEffect } from "react";
import {
  Phone,
  Heart,
  Users,
  Clock,
  Stethoscope,
  HeartHandshake,
  Truck,
  Building2,
  Star,
  CheckCircle,
  ArrowRight,
  Award,
  Moon,
  Sun,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Quote,
  Download,
  Smartphone,
  Activity,
  Zap,
  Mail,
  PhoneIcon,
  Play,
  Calendar,
  HeartIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import ComingSoonDialog from "@/components/ComingSoonDialog";

import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef } from "react";
import { useTheme } from "@/components/theme-provider";
import MedicalHeroCard from "@/components/ui/right"; // ✅ CORRECT if default exported

// Counter Animation Component
function AnimatedCounter({
  end,
  duration = 2000,
}: {
  end: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

// Animated Section Component
function AnimatedSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
  );
}

export default function HomePage() {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentPoster, setCurrentPoster] = useState(0);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const backgroundPosters = [
    {
      title: "Emergency Response",
      subtitle: "AI-Powered • Instant Care",
      gradient: "from-red-500 via-red-600 to-orange-500",
      bgImage:
        "linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(251, 146, 60, 0.1) 100%)",
      icon: Truck,
      pattern: "emergency",
    },
    {
      title: "Home Care Services",
      subtitle: "Verified • Compassionate",
      gradient: "from-blue-500 via-blue-600 to-cyan-500",
      bgImage:
        "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)",
      icon: Users,
      pattern: "homecare",
    },
    {
      title: "Expert Consultations",
      subtitle: "Specialists • Video Calls",
      gradient: "from-green-500 via-emerald-600 to-teal-500",
      bgImage:
        "linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(20, 184, 166, 0.1) 100%)",
      icon: Stethoscope,
      pattern: "consultation",
    },
    {
      title: "Emotional Support",
      subtitle: "AI Companion • Peer Care",
      gradient: "from-purple-500 via-violet-600 to-indigo-500",
      bgImage:
        "linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)",
      icon: HeartHandshake,
      pattern: "support",
    },
  ];

  const services = [
    {
      icon: Truck,
      title: "Emergency Medical Response",
      description:
        "Instant triage, ambulance dispatch, and auto-routing to available hospital beds",
      gradient: "from-red-500 to-red-600",
      features: [
        "AI-powered symptom assessment in under 30 seconds",
        "Immediate ambulance dispatch with GPS tracking",
        "Real-time family notifications with live updates",
        "Pre-allocated hospital beds to avoid delays",
        "24/7 emergency hotline with medical experts",
      ],
      emotion: "Help reaches you before panic sets in.",
    },
    {
      icon: Users,
      title: "Verified Home Care",
      description:
        "Background-checked caregivers for elderly daily monitoring and companionship",
      gradient: "from-blue-500 to-blue-600",
      features: [
        "Trained nurses & caretakers with verified credentials",
        "Daily health monitoring with digital reports",
        "Medicine reminders and health tracking",
        "Emotional companionship and social interaction",
        "Family updates with photo/video reports",
      ],
      emotion: "Because they're not patients — they're family.",
    },
    {
      icon: Stethoscope,
      title: "Doctor Consultation",
      description:
        "Affordable teleconsultations and second opinions from verified specialists",
      gradient: "from-red-500 via-red-400 to-blue-500",
      features: [
        "Video/audio consultations with specialists",
        "Second opinion services for critical decisions",
        "Digital medical records with cloud storage",
        "Elder-friendly interface with large fonts",
        "Prescription delivery to your doorstep",
      ],
      emotion: "Expert care, just a video call away.",
    },
    {
      icon: Heart,
      title: "Post-Surgery Care",
      description:
        "ICU-trained nurses for home recovery with personalized care plans",
      gradient: "from-blue-500 via-blue-400 to-red-500",
      features: [
        "ICU-trained home nurses available 24/7",
        "Medicine management and wound dressing",
        "Mobility support and physiotherapy",
        "Recovery monitoring with progress reports",
        "Coordination with your primary doctor",
      ],
      emotion: "Healing happens best at home.",
    },
    {
      icon: HeartHandshake,
      title: "Emotional Support",
      description:
        "Bada Bhai/Badi Behen program for students and AI emotional companions",
      gradient: "from-red-500 to-red-600",
      features: [
        "Peer mentoring support for students",
        "AI emotional companion for daily check-ins",
        "Daily mood tracking and wellness tips",
        "Anonymous counseling sessions",
        "Crisis intervention and professional referrals",
      ],
      emotion: "Sometimes you just need someone who gets it.",
    },
    {
      icon: Building2,
      title: "Hospital Bed Booking",
      description:
        "Real-time bed availability and instant booking across partner hospitals",
      gradient: "from-blue-500 to-blue-600",
      features: [
        "Real-time bed tracking across 500+ hospitals",
        "Instant booking system with confirmation",
        "ICU/oxygen bed filters and availability",
        "Digital admission slips for faster entry",
        "Cost comparison and insurance verification",
      ],
      emotion: "No more calling hospitals in panic.",
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Daughter caring for elderly mother",
      content:
        "CareSaathi saved my mother's life during a heart attack. The ambulance reached in 8 minutes and the hospital bed was already reserved. I was in Mumbai, she was in Delhi, but I felt like I was right there with her.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Rajesh Kumar",
      role: "NRI Family, USA",
      content:
        "Living in the US, I was always worried about my parents in India. CareSaathi's daily care reports and video updates give me such peace of mind. The caregivers treat them like their own family.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Dr. Anita Verma",
      role: "Partner Hospital, Delhi",
      content:
        "CareSaathi's emergency system is revolutionary. Patients arrive with complete medical history and pre-allocated beds. It's changed how we handle emergencies completely.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPoster((prev) => (prev + 1) % backgroundPosters.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [backgroundPosters.length]);

  return (
    <>
      {/* Enhanced Hero Section with Dynamic Background */}
      <section
        ref={heroRef}
        className="relative overflow-hidden min-h-[80vh] sm:min-h-[85vh] md:min-h-[90vh] lg:min-h-[55vh] flex items-center pt-20 pb-0"
      >
        {/* Dynamic Background Poster */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPoster}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 z-0 overflow-hidden"
            style={{
              background: backgroundPosters[currentPoster].bgImage,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Animated Pattern Overlay */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    x: [0, Math.random() * 50 - 25, 0],
                    y: [0, Math.random() * 50 - 25, 0],
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
                      Truck,
                      Users,
                      Stethoscope,
                      Heart,
                      Activity,
                      Zap,
                      Building2,
                      HeartHandshake,
                    ][i % 8],
                    { className: "w-full h-full text-blue-350 " }
                  )}
                </motion.div>
              ))}
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-white/40 dark:from-slate-900/80 dark:via-slate-900/60 dark:to-slate-900/40"></div>
          </motion.div>
        </AnimatePresence>

        {/* Main Container */}
        <div className="relative z-10  container mx-auto px-5 py-0">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Left Content */}
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
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
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
                    className="block bg-gradient-to-r from-red-600 via-red-500 to-blue-600 bg-clip-text text-transparent"
                  >
                    in Care
                  </motion.span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-lg sm:text-xl lg:text-2xl font-semibold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent"
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
                  triggerIcon={
                    <HeartIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  }
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
                className="grid grid-cols-3 gap-4 pt-4"
              >
                <div className="text-center mb-3">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
                    <AnimatedCounter end={10} />
                    K+
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
                    <AnimatedCounter end={500} />+
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    Partner Hospitals
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content */}
            <MedicalHeroCard />
          </div>
        </div>

        {/* Scroll Indicator */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-slate-400 dark:border-slate-600 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-slate-400 dark:bg-slate-600 rounded-full mt-2"
            />
          </motion.div>
        </motion.div> */}
      </section>

      {/* Emergency Banner */}
      <AnimatedSection className="relative bg-gradient-to-r from-red-600 via-red-500 to-blue-600 py-2 sm:py-3 md:py-2 lg:py-3 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        />
        <div className="relative container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between text-white gap-2 lg:gap-6">
            <div className="flex items-center space-x-4 sm:space-x-6">
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="-mt-14 md:-mt-12 lg:-mt-14 "
                // className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
              >
                <Clock className="w-6 h-6 sm:w-8 sm:h-8" />
              </motion.div>
              <div>
                <h3 className="text-xl sm:text-xs md:text-lg lg:text-2xl font-bold mb-1">
                  
                  Smart Emergency Response
                </h3>
                <p className="text-red-100 text-sm sm:text-base lg:text-lg">
                  One-Tap Hospital Bed Booking with Ventilator & ICU + Instant
                  Ambulance in Minutes and real-time Bed Booking + Guardian
                  Notification
                </p>
              </div>
            </div>
            <ComingSoonDialog
              triggerLabel={<>Call Emergency: +91 7084910836</>}
              triggerIcon={<Phone className="w-4 h-4 mr-2" />}
              size="lg"
              className="bg-white text-red-500 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base"
            />
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}