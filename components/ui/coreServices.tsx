"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  ArrowRight,
  Truck,
  Users,
  Stethoscope,
  Heart,
  HeartHandshake,
  Building2,
} from "lucide-react";
import ComingSoonDialog from "@/components/ComingSoonDialog";
import Image from "next/image";

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

function AnimatedSection({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { rootMargin: "-100px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
      id={id}
    >
      {children}
    </motion.div>
  );
}

function ServiceModal({
  service,
  onOpenComingSoon,
}: {
  service: any;
  onOpenComingSoon: () => void;
}) {
  return (
    <DialogContent className="w-11/12 max-w-[600px] rounded-lg max-h-[80vh] overflow-y-auto">
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div
            style={{ width: "64px", height: "64px" }}
            className={`bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center flex-shrink-0`}
          >
            {service.icon && <service.icon className="w-8 h-8 text-white" />}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              {service.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              {service.description}
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">How it works:</h4>
          <ul className="space-y-2">
            {service.features.map((feature: string, index: number) => (
              <li key={index} className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center pt-4">
          <DialogClose asChild>
            <Button
              className="bg-gradient-to-r from-blue-500 to-red-500 text-white hover:from-blue-600 hover:to-red-600"
              onClick={onOpenComingSoon}
            >
              Get This Service
            </Button>
          </DialogClose>
        </div>
      </div>
    </DialogContent>
  );
}

export default function CoreServices() {
  const [comingSoonOpen, setComingSoonOpen] = useState(false);

  const handleOpenComingSoon = () => {
    setComingSoonOpen(true);
  };

  return (
    <>
      <AnimatedSection id="services" className="py-6 sm:py-6 lg:py-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-white/50 dark:from-slate-800/50 dark:to-slate-900/50" />
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-6 sm:mb-12 lg:mb-8"
          >
            <Badge className="bg-gradient-to-r from-blue-900 to-red-900 text-white dark:text-blue-200 border-0 px-3 py-2 text-xs sm:text-sm font-medium hover:scale-105 transition-transform cursor-pointer mb-4 sm:mb-6">
              🩺 Comprehensive Care Solutions
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-blue-800 to-red-600 bg-clip-text text-transparent mb-3 sm:mb-6">
              Our Core Services
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              All in one place Our goal is to combine human compassion with
              smart technology to give your loved ones the care they deserve.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 sm:gap-x-4 sm:gap-y-8">
            {" "}
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative group hover:-translate-y-2 transition-transform duration-500">
                      {/* Dark Glow on Hover */}
                      <div
                        className="absolute -inset-4 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"
                        style={{
                          background: `
            radial-gradient(ellipse 100% 100% at 30% 30%, rgba(255, 80, 120, 0.35), transparent 60%),
            radial-gradient(ellipse 100% 100% at 70% 70%, rgba(80, 120, 255, 0.35), transparent 60%)
          `,
                        }}
                      />

                      {/* Card with default soft shadow */}
                      <Card className="relative z-10 border-0 shadow-[0_4px_20px_rgba(0,0,0,0.1)] bg-gradient-to-br from-white to-red-50/30 dark:from-slate-800 dark:to-slate-700 overflow-hidden cursor-pointer h-full flex flex-col transition-shadow duration-500 sm:min-h-[420px] md:min-h-[460px] lg:min-h-0">
                        <CardHeader className="relative flex-shrink-0 p-3 sm:p-6">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg`}
                          >
                            {service.icon && (
                              <service.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                            )}
                          </motion.div>
                          <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 dark:text-slate-200 group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-blue-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 ">
                            {service.title}
                          </CardTitle>
                          <CardDescription className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">

                            {service.description}
                          </CardDescription>
                          <p className="text-xs sm:text-sm italic text-blue-600 dark:text-blue-400 ">
                            {service.emotion}
                          </p>
                        </CardHeader>
                        <CardContent className="relative  flex flex-col justify-between p-4 sm:p-6 pt-0 ">
                          <ul className="space-y-2 sm:space-y-3 flex-grow">
                            {service.features
                              .slice(0, 3)
                              .map((feature, featureIndex) => (
                                <li
                                  key={featureIndex}
                                  className="flex items-center space-x-3 text-slate-600 dark:text-slate-400 text-xs sm:text-sm"
                                >
                                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                          </ul>
                          <Button
                            variant="link"
                            className="mt-1 sm:mt-4 p-0 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 self-start text-sm w-auto"
                          >
                            Learn More{" "}
                            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </DialogTrigger>
                  <ServiceModal
                    service={service}
                    onOpenComingSoon={handleOpenComingSoon}
                  />
                </Dialog>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Coming Soon Dialog */}
      <Dialog open={comingSoonOpen} onOpenChange={setComingSoonOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="w-[90%] rounded-sm flex flex-col items-center justify-center text-center p-8 dark:bg-slate-900/95">
          <DialogHeader>
            <div className="flex justify-center flex-col items-center mb-4 ">
              <Image src="rocket.png" alt="Rocket" width={64} height={64} />
            </div>
            <DialogTitle className="text-2xl text-center font-bold">
              We're Launching Soon!
            </DialogTitle>
            <DialogDescription className="text-slate-600 mt-2 text-center">
              Thank you for trusting us with your loved ones' care. ❤
              <br />
              Our team is working tirelessly to bring this feature to life. Your
              patience means everything to us.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-6">
            <DialogClose asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-red-500 text-white hover:from-blue-600 hover:to-red-600 px-8 py-2 rounded-md">
                Got It!
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}