"use client"

import { motion } from "framer-motion"
import { Heart, Users, Shield, TrendingUp, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import Navbar from "@/components/ui/navbar"
import Stats from "@/components/ui/stats"
import ComingSoonDialog from "@/components/ComingSoonDialog"

export default function AboutPage() {
  const [darkMode, setDarkMode] = useState(false)

  const values = [
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "Every interaction is guided by empathy and genuine concern for our patients and their families.",
    },
    {
      icon: Shield,
      title: "Trust & Reliability",
      description:
        "We build lasting relationships through consistent, dependable service and transparent communication.",
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "Leveraging cutting-edge technology to make healthcare more accessible and efficient.",
    },
    {
      icon: Users,
      title: "Family-Centered",
      description: "We treat every patient as family, ensuring personalized care that meets individual needs.",
    },
  ]

  const milestones = [
    { year: "2024", title: "CareSaathi Founded", description: "Started with a vision to revolutionize elderly care" },
    { year: "2024", title: "First 500 Families", description: "Reached our first milestone of serving 500 families" },
    { year: "2025", title: "500+ Hospital Partners", description: "Expanded network to 500+ partner hospitals" },
    { year: "2025", title: "10K+ Happy Families", description: "Crossed 10,000 families trusting CareSaathi" },
  ]

  return (
    <>
    <Navbar/>
    <div className="pt-[0px] min-h-screen bg-gradient-to-br bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-lg">
      {/* Header */}
     
          
               

      {/* Hero Section */}
      <section className="pt-20 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br "></div>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto space-y-8"
          >
            <Badge className="bg-gradient-to-r from-blue-900 to-red-900 text-white dark:text-blue-200 border-0 px-4 py-2">
              💝 Our Story
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-800 to-red-600 bg-clip-text text-transparent">
              About CareSaathi
            </h1>
            <p className="text-sm sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              Born from a simple yet powerful truth: Care isn't a service. It's a promise. We're reimagining healthcare
              in India by blending compassion with cutting-edge technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="pt-8 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-800 to-red-600 bg-clip-text text-transparent mb-4 sm:mb-6">
                  Our Mission
                </h2>
                <p className="text-sm sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                  CareSaathi is dedicated to bringing compassion, dignity, and emotional connection back into healthcare, powered by speed, trust, and technology.
                </p>
              </div>

              <div>
                <p className="text-sm sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-semibold mb-4">
                  We envision a world where:
                </p>
                <div className="space-y-4">
                  {[
                    "Elders feel safe, supported, and heard at home.",
                    "Students can talk to a caring \"Bada Bhai/Badi Behen\" during emotional stress.",
                    "NRIs stay connected with their loved ones emotionally and medically, from anywhere.",
                  ].map((point, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-lg text-slate-700 dark:text-slate-300">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-semibold mt-6 mb-4">
                  In emergencies, our Emergency Triage System ensures rapid care through:
                </p>
                <div className="space-y-4">
                  {[
                    "Auto-routed ambulances",
                    "Real-time hospital bed tracking",
                    "Instant family alerts",
                    "Priority treatment with minimal delay",
                  ].map((point, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-lg text-slate-700 dark:text-slate-300">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mt-6">
                  Blending human empathy with smart tech, CareSaathi is a lifeline — ensuring no one faces medical or emotional crises alone.
                </p>
              </div>
            </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white dark:bg-slate-800/50 rounded-3xl shadow-[4px_4px_10px_rgba(59,130,246,0.15),_-4px_-4px_10px_rgba(239,68,68,0.15)] p-8 border border-red-100 dark:border-slate-700/50">
                  <div className="text-center space-y-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                      <Heart className="w-10 h-10 text-white" />
                    </div>
                    <blockquote className="text-lg italic text-slate-700 dark:text-slate-300 leading-relaxed">
                      "We started CareSaathi after seeing how helpless families feel during a sudden emergency. They have
                      money. They have phones. But they didn't have access. And more than that – they didn't have peace of
                      mind."
                    </blockquote>
                    <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                      <p className="font-bold text-xl bg-gradient-to-r from-blue-800 to-red-600 bg-clip-text text-transparent">
                        — Team, CareSaathi
                      </p>
                      <p className="text-slate-600 dark:text-slate-400 mt-2">A movement. A mission. A miracle in the making.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="pt-8 pb-20 bg-gradient-to-br ">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-800 to-red-600 bg-clip-text text-transparent mb-6">
                Our Values
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                These core values guide every decision we make and every service we provide.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="text-center h-full border-0 shadow-[4px_4px_10px_rgba(59,130,246,0.15),_-4px_-4px_10px_rgba(239,68,68,0.15)] bg-white dark:bg-slate-800/50">
                    <CardHeader className="space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto">
                        <value.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-200">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-800 to-red-600 bg-clip-text text-transparent mb-6">
                Our Journey
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                From a simple idea to serving thousands of families across India.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-red-500"></div>
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className={`relative flex items-center mb-4 ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                      <Card className="bg-white dark:bg-slate-800/50 shadow-[4px_4px_10px_rgba(59,130,246,0.15),_-4px_-4px_10px_rgba(239,68,68,0.15)] border-0 dark:border dark:border-slate-700/50">
                        <CardContent className="p-6">
                          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent mb-2">
                            {milestone.year}
                          </div>
                          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">{milestone.title}</h3>
                          <p className="text-slate-600 dark:text-slate-300">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-red-500 to-blue-500 rounded-full border-4 border-white shadow-lg"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <Stats />
      </div>
    </>
  )
}
