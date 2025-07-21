"use client";

import ComingSoonDialog from "@/components/ComingSoonDialog";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  Heart,
  ArrowRight,
  CheckCircle,
  Truck,
  Users,
  Stethoscope,
  HeartHandshake,
  Building2,
} from "lucide-react";
import { DialogContent } from "@/components/ui/dialog";
import { useTheme } from "@/components/theme-provider";

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

function ServiceModal({ service }: { service: any }) {
  return (
    <DialogContent className="max-w-2xl">
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div
            className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center`}
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
        <Button className="w-full bg-gradient-to-r from-red-500 to-blue-500 text-white">
          Get This Service
        </Button>
      </div>
    </DialogContent>
  );
}

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

export default function CTASection() {
  const { theme } = useTheme();

  return (
    <AnimatedSection className="py-4 sm:py-3 lg:py-8 relative bg-gradient-to-br bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl overflow-hidden">
      

      <div className="relative container mx-auto px-1 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8"
        >
          <Badge className="bg-gradient-to-r from-blue-900 to-red-900 text-white dark:text-blue-200 border-0 px-3 py-1.5 text-xs sm:text-sm font-medium hover:scale-105 transition-transform cursor-pointer">
            🤝 Join Our Care Family
          </Badge>
          <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-blue-800 to-red-600 bg-clip-text text-transparent leading-tight">
            "Apno Ki Muskurahat, Hamari Jimmedari"
          </h2>
          <p className="text-base sm:text-xs md:text-lg lg:text-lg xl:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl mx-auto">
            You can't be everywhere at once. But with CareSaathi — you'll never
            feel far. Join thousands of families who trust us with their most
            precious relationships.
          </p>
<motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col px-4 sm:flex-row gap-3 sm:gap-4 justify-center"
              >
                <ComingSoonDialog
                  triggerLabel={
                    <>
                      Start your journey
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                    </>
                  }
                  triggerIcon={<Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />}
                  size="lg"
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                />

                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Talk to experts
                </Button>
              </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}