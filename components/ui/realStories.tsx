"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

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
]

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

export default function RealStories() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatedSection className="pt-12 pb-0 sm:py-10 lg:py-15 bg-gradient-to-br bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <Badge className="bg-gradient-to-r from-blue-900 to-red-900 text-white dark:text-blue-200 border-0 px-3 py-1.5 text-xs sm:text-sm font-medium hover:scale-105 transition-transform cursor-pointer">
            💝 Real Stories, Real Saathi
          </Badge>
          {/* <h2 className="mt-5 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-blue-800 to-red-600 bg-clip-text text-transparent leading-tight mb-4 sm:mb-6">
  Because they're not patients — they're family
</h2> */}
  <div className="w-full overflow-visible">
  <h2
    className="text-center mt-5 text-xl sm:text-3xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-blue-800 to-red-600 bg-clip-text text-transparent leading-[1.2]"
    style={{
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }}
  >
    Because they're not patients — they're family
  </h2>
</div>

          
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-slate-800 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.4)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.6)] p-6 sm:p-8 lg:p-12"
            >
              <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                <Quote className="w-8 h-8 sm:w-12 sm:h-12 text-blue-500 flex-shrink-0" />
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-base sm:text-lg lg:text-xl text-slate-700 dark:text-slate-300 leading-relaxed italic">
                    "{testimonials[currentTestimonial].content}"
                  </p>
                  <div className="flex items-center space-x-4">
                    <img
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm sm:text-base">
                        {testimonials[currentTestimonial].name}
                      </h4>
                      <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
                        {testimonials[currentTestimonial].role}
                      </p>
                      <div className="flex space-x-1 mt-1 sm:mt-2">
                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center space-x-4 mt-6 sm:mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
              }
              className="w-8 h-8 sm:w-10 sm:h-10"
            >
              <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
              }
              className="w-8 h-8 sm:w-10 sm:h-10"
            >
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
