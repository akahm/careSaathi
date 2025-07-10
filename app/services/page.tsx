"use client"

import { motion } from "framer-motion"
import {
  Truck,
  Users,
  Stethoscope,
  Heart,
  HeartHandshake,
  Building2,
  CheckCircle,
  ArrowRight,
  Phone,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/ui/navbar"
import ComingSoonDialog from "@/components/ComingSoonDialog"
import { useState } from "react"

export default function ServicesPage() {
  const services = [
    {
      icon: Truck,
      title: "Emergency Medical Response",
      description: "Instant triage, ambulance dispatch, and auto-routing to available hospital beds",
      features: [
        "AI-powered symptom assessment in under 30 seconds",
        "Immediate ambulance dispatch with GPS tracking",
        "Real-time family notifications with live updates",
        "Pre-allocated hospital beds to avoid delays",
        "24/7 emergency hotline with medical experts",
      ],
      price: "₹ Revealing Soon",
      popular: true,
    },
    {
      icon: Users,
      title: "Verified Home Care",
      description: "Background-checked caregivers for elderly daily monitoring and companionship",
      features: [
        "Trained nurses & caretakers with verified credentials",
        "Daily health monitoring with digital reports",
        "Medicine reminders and health tracking",
        "Emotional companionship and social interaction",
        "Family updates with photo/video reports",
      ],
      price: "₹ Revealing Soon",
      popular: false,
    },
    {
      icon: Stethoscope,
      title: "Doctor Consultation",
      description: "Affordable teleconsultations and second opinions from verified specialists",
      features: [
        "Video/audio consultations with specialists",
        "Second opinion services for critical decisions",
        "Digital medical records with cloud storage",
        "Elder-friendly interface with large fonts",
        "Prescription delivery to your doorstep",
      ],
      price: "₹ Revealing Soon",
      popular: false,
    },
    {
      icon: Heart,
      title: "Post-Surgery Care",
      description: "ICU-trained nurses for home recovery with personalized care plans",
      features: [
        "ICU-trained home nurses available 24/7",
        "Medicine management and wound dressing",
        "Mobility support and physiotherapy",
        "Recovery monitoring with progress reports",
        "Coordination with your primary doctor",
      ],
      price: "₹ Revealing Soon",
      popular: false,
    },
    {
      icon: HeartHandshake,
      title: "Emotional Support",
      description: "Bada Bhai/Badi Behen program for students and AI emotional companions",
      features: [
        "Peer mentoring support for students",
        "AI emotional companion for daily check-ins",
        "Daily mood tracking and wellness tips",
        "Anonymous counseling sessions",
        "Crisis intervention and professional referrals",
      ],
      price: "₹ Revealing Soon",
      popular: false,
    },
    {
      icon: Building2,
      title: "Hospital Bed Booking",
      description: "Real-time bed availability and instant booking across partner hospitals",
      features: [
        "Real-time bed tracking across 500+ hospitals",
        "Instant booking system with confirmation",
        "ICU/oxygen bed filters and availability",
        "Digital admission slips for faster entry",
        "Cost comparison and insurance verification",
      ],
      price: "Free with emergency plan",
      popular: false,
    },
  ]

  return (
    <>
      <Navbar />
      <div className="pt-[0px] min-h-screen bg-gradient-to-br bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200/50
       dark:border-slate-700/50 shadow-lg">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto space-y-8"
            >
              <Badge className="bg-gradient-to-r from-blue-900 to-red-900 text-white border-0 px-4 py-2">
                🩺 Complete Care Solutions
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-800 to-red-600 bg-clip-text text-transparent">
                Our Services
              </h1>
              <p className="text-sm sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                Comprehensive healthcare solutions designed for every stage of life. From emergency response to daily
                care, we're your trusted companion in health.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="pb-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                return (
                     
                  <motion.div
  key={service.title}
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.1 }}
  className="h-full"
>
  <div className="relative group hover:-translate-y-2 transition-transform duration-500">
    {/* Dark Crimson Glow on Hover (all sides) */}
     <div
    className="absolute -inset-4 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"
    style={{
      background: `
        radial-gradient(ellipse 100% 100% at 30% 30%, rgba(255, 80, 120, 0.35), transparent 60%),
        radial-gradient(ellipse 100% 100% at 70% 70%, rgba(80, 120, 255, 0.35), transparent 60%)
      `,
    }}
  />
  
    {/* Card with default soft grey shadow */}
    <Card className="relative z-10 border-0 shadow-[0_4px_20px_rgba(0,0,0,0.1)] bg-white dark:bg-slate-800 overflow-hidden cursor-pointer h-full flex flex-col transition-shadow duration-500">
      {service.popular && (
        <div className="absolute top-4 right-4 z-20">
          <Badge className="bg-gradient-to-r from-red-500 to-blue-500 text-white">
            <Star className="w-3 h-3 mr-1" />
            Popular
          </Badge>
        </div>
      )}

      {/* Card Content Below */}
      <CardHeader className="relative flex-shrink-0 p-6">
        <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
          <service.icon className="w-10 h-10 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-slate-800 dark:text-slate-200 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
          {service.title}
        </CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-400 text-base leading-relaxed pt-2">
          {service.description}
        </CardDescription>
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent pt-2">
          {service.price}
        </div>
      </CardHeader>
      <CardContent className="relative flex-grow flex flex-col justify-between p-6 pt-0">
        <ul className="space-y-3 flex-grow mb-4">
          {service.features.map((feature, i) => (
            <li key={i} className="flex items-center space-x-3 text-slate-600 dark:text-slate-400">
              <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <ComingSoonDialog
          triggerLabel="Get Started"
          className="bg-gradient-to-r from-blue-500 to-red-500 text-white hover:from-blue-600 hover:to-red-600"
        />
      </CardContent>
    </Card>
  </div>
</motion.div>




                )
              })}
              
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-red-500 to-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto space-y-8"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Ready to Experience CareSaathi?</h2>
              <p className="text-sm sm:text-lg lg:text-xl text-red-100">
                Join thousands of families who trust us with their healthcare needs. Get started today with a free
                consultation.
              </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ComingSoonDialog
              triggerLabel="Book Free Consultation"
              triggerIcon={<Phone className="w-5 h-5 mr-2" />}
              size="lg"
              className="bg-red-600 text-white hover:bg-red-700"
              />
             <ComingSoonDialog
            triggerLabel="Emergency Support"
            triggerIcon={<Heart className="w-5 h-5 mr-2" />}
            size="lg"
            className="bg-white text-red-600 border border-red-600 hover:bg-red-50"
              />
            </div>


            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
