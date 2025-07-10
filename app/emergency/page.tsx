"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Phone,
  MapPin,
  Clock,
  Heart,
  Truck,
  Building2,
  AlertTriangle,
  CheckCircle,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/ui/navbar"

export default function EmergencyPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [emergencyType, setEmergencyType] = useState("")

  const emergencyTypes = [
    { id: "cardiac", label: "Heart Attack", icon: Heart, color: "red" },
    { id: "stroke", label: "Stroke", icon: Zap, color: "orange" },
    { id: "accident", label: "Accident", icon: Truck, color: "yellow" },
    { id: "breathing", label: "Breathing Issues", icon: AlertTriangle, color: "blue" },
    { id: "other", label: "Other Emergency", icon: Phone, color: "purple" },
  ]

  const emergencySteps = [
    {
      step: 1,
      title: "Call Emergency Hotline",
      description: "Dial 1800-CARE-911 immediately",
      icon: Phone,
      time: "0-30 seconds",
    },
    {
      step: 2,
      title: "AI Triage Assessment",
      description: "Quick symptom evaluation and priority assignment",
      icon: CheckCircle,
      time: "30-60 seconds",
    },
    {
      step: 3,
      title: "Ambulance Dispatch",
      description: "Nearest ambulance dispatched with GPS tracking",
      icon: Truck,
      time: "1-3 minutes",
    },
    {
      step: 4,
      title: "Hospital Bed Booking",
      description: "Automatic bed reservation at nearest suitable hospital",
      icon: Building2,
      time: "2-5 minutes",
    },
  ]

  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen bg-gradient-to-br bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-lg">


        {/* Emergency Alert Banner */}
        <section className="py-4  bg-red-700 ">
          <div className="container mx-auto px-4">
            <div role="alert" className="relative flex w-full items-center rounded-lg border border-red-400 p-4 text-white">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" />
              <div className="ml-4 text-sm sm:text-base">
                <strong>MEDICAL EMERGENCY?</strong> Call +91 7084910836 immediately or use the emergency form below.
              </div>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="py-12 sm:py-20 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto space-y-6 sm:space-y-8"
            >
              <Badge className="bg-gradient-to-r from-blue-900 to-red-900 text-white dark:text-blue-200 px-4 py-2 text-sm">
                🚨 Emergency Response
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-red-800 to-blue-600 bg-clip-text text-transparent">
                Emergency Care
              </h1>
              <p className="text-sm sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                When every second counts, CareSaathi ensures immediate AI-powered emergency assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Emergency: +91 7084910836
                </Button>
                <Button variant="outline" className="border-white px-6 py-3">
                  <Heart className="w-5 h-5 mr-2" />
                  Quick Emergency Form
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Emergency Process */}
        <section className="py-12 sm:py-20 bg-transparent">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-red-800 to-blue-600 bg-clip-text text-transparent">
                How Our Emergency Response Works
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Our AI-powered emergency system ensures rapid and coordinated response.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {emergencySteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="text-center h-full border-0 shadow-2xl bg-transparent  dark:bg-slate-800">
                    <CardHeader className="space-y-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto">
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-lg font-bold text-red-600 dark:text-red-400">Step {step.step}</div>
                      <CardTitle className="text-base font-bold text-slate-800 dark:text-slate-200">
                        {step.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{step.description}</p>
                      <Badge variant="outline" className="text-xs mt-2">{step.time}</Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency Form */}
        <section className="py-12 sm:py-20 ">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6 sm:space-y-8"
              >
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-red-800 to-blue-600 bg-clip-text text-transparent mb-4 sm:mb-6">
                    Quick Emergency Form
                  </h2>
                  <p className="text-sm sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                    Fill this form for immediate emergency response. Our team will contact you within 30 seconds.
                  </p>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center space-x-4">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base text-slate-800 dark:text-slate-200">
                        Response Time
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Within 30 seconds</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base text-slate-800 dark:text-slate-200">
                        Location Tracking
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                        Automatic GPS location detection
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white dark:bg-slate-800/60 shadow-2xl border border-slate-200 dark:border-slate-700/50 backdrop-blur-md rounded-2xl">
                  <CardContent className="p-6 sm:p-8">
                    <form className="space-y-4 sm:space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                          Emergency Type
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                          {emergencyTypes.map((type) => (
                            <button
                              key={type.id}
                              type="button"
                              onClick={() => setEmergencyType(type.id)}
                              className={`p-2 sm:p-3 rounded-lg border-2 transition-all text-xs sm:text-sm ${emergencyType === type.id
                                  ? "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
                                  : "border-slate-200 dark:border-slate-700 hover:border-red-300 dark:hover:border-red-400"
                                }`}
                            >
                              <type.icon className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1" />
                              {type.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                            Patient Name
                          </label>
                          <Input
                            placeholder="Enter patient name"
                            className="text-sm border border-slate-300 dark:border-slate-800 dark:bg-slate-800 dark:text-white placeholder:text-slate-400"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                            Age
                          </label>
                          <Input
                            type="number"
                            placeholder="Age"
                            className="text-sm border border-slate-300 dark:border-slate-800 dark:bg-slate-800 dark:text-white placeholder:text-slate-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                          Contact Number
                        </label>
                        <Input
                          type="tel"
                          placeholder="Enter contact number"
                          className="text-sm border border-slate-300 dark:border-slate-800 dark:bg-slate-800 dark:text-white placeholder:text-slate-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                          Current Location
                        </label>
                        <Input
                          placeholder="Enter current address"
                          className="text-sm border border-slate-300 dark:border-slate-800 dark:bg-slate-800 dark:text-white placeholder:text-slate-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                          Symptoms/Description
                        </label>
                        <Textarea
                          placeholder="Describe the emergency situation..."
                          rows={3}
                          className="text-sm border border-slate-300 dark:border-slate-800 dark:bg-slate-800 dark:text-white placeholder:text-slate-400"
                        />
                      </div>

                      <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 text-sm sm:text-base rounded-md">
                        <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        Submit Emergency Request
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Emergency Contacts */}
        <section className="py-12 sm:py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-red-800 to-blue-600 bg-clip-text text-transparent mb-2 sm:mb-4">
                Emergency Contacts
              </h2>
              <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg border-0">
                  <CardContent className="p-6 text-center">
                    <Phone className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4" />
                    <h3 className="text-lg sm:text-xl font-bold mb-2">Emergency Hotline</h3>
                    <p className="text-red-100 mb-4 text-sm sm:text-base">24/7 Medical Emergency</p>
                    <p className="text-xl sm:text-2xl font-bold">+91 7084910836</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg border-0">
                  <CardContent className="p-6 text-center">
                    <Heart className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4" />
                    <h3 className="text-lg sm:text-xl font-bold mb-2">Support Line</h3>
                    <p className="text-blue-100 mb-4 text-sm sm:text-base">General Health Support</p>
                    <p className="text-xl sm:text-2xl font-bold">+91 7084910836</p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}