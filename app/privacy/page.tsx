"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  Shield,
  Lock,
  Eye,
  UserCheck,
  FileText,
  Clock,
  
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Header from "@/components/ui/header"

export default function PrivacyPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    if (typeof window !== "undefined") {
      try {
        const savedTheme = window.localStorage.getItem("privacy-dark-mode")
        if (savedTheme === "true") setDarkMode(true)
      } catch (e) {
        console.warn("Theme load error", e)
      }
    }
  }, [])

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem("privacy-dark-mode", newMode.toString())
      } catch (e) {
        console.warn("Theme save error", e)
      }
    }
  }

  const privacyPrinciples = [
    {
      icon: Shield,
      title: "Data Protection",
      description: "Your personal and medical information is encrypted and stored securely using industry-standard protocols.",
    },
    {
      icon: Lock,
      title: "Access Control",
      description: "Only authorized personnel can access your data, and all access is logged and monitored.",
    },
    {
      icon: Eye,
      title: "Transparency",
      description: "We clearly explain what data we collect, how we use it, and who we share it with.",
    },
    {
      icon: UserCheck,
      title: "Your Rights",
      description: "You have full control over your data - view, update, or delete your information anytime.",
    },
  ]

  const privacySections = [
    {
      icon: FileText,
      title: "Information We Collect",
      sections: [
        {
          heading: "Personal Information",
          items: [
            "Name, contact details, and demographic information",
            "Emergency contact information",
            "Government-issued ID for verification purposes",
            "Payment and billing information",
          ],
        },
        {
          heading: "Health Information",
          items: [
            "Medical history and current health conditions",
            "Medication information and allergies",
            "Emergency medical data for faster response",
            "Care reports and health monitoring data",
          ],
        },
        {
          heading: "Usage Information",
          items: [
            "App usage patterns and preferences",
            "Location data for emergency services",
            "Communication logs with our care team",
            "Device information and technical data",
          ],
        },
      ],
    },
    {
      icon: UserCheck,
      title: "How We Use Your Information",
      sections: [
        {
          heading: "Service Delivery",
          items: [
            "Provide emergency medical response",
            "Coordinate home care services",
            "Facilitate doctor consultations",
            "Manage hospital bed bookings",
          ],
        },
        {
          heading: "Communication",
          items: [
            "Send service updates and notifications",
            "Provide care reports to families",
            "Emergency alerts and communications",
            "Customer support interactions",
          ],
        },
      ],
    },
    {
      icon: Lock,
      title: "Data Security Measures",
      sections: [
        {
          heading: "Technical Safeguards",
          items: [
            "End-to-end encryption for all data",
            "Secure cloud storage with AWS/Azure",
            "Regular security audits and updates",
            "Multi-factor authentication",
          ],
        },
        {
          heading: "Operational Safeguards",
          items: [
            "Staff training on data privacy",
            "Access controls and monitoring",
            "Incident response procedures",
            "Regular compliance assessments",
          ],
        },
      ],
    },
    {
      icon: Shield,
      title: "Your Privacy Rights",
      sections: [
        {
          heading: "Access & Control",
          items: [
            "View all data we have about you",
            "Update or correct your information",
            "Download your data in portable format",
            "Delete your account and data",
          ],
        },
        {
          heading: "Communication Preferences",
          items: [
            "Opt-out of marketing communications",
            "Control notification settings",
            "Manage data sharing preferences",
            "Request data processing restrictions",
          ],
        },
      ],
    },
  ]

  return (
    <>
      
    <Header/>
    <div className="relative overflow-hidden w-full bg-gradient-to-br bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200/50
       dark:border-slate-700/50 shadow-lg">
      {/* Dark Mode Toggle */}
    

      {/* Hero Section */}
      <section className="pt-20 pb-2 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <Badge className="bg-gradient-to-r from-blue-900 to-red-900 text-white border-0 px-4 py-2">
            🔒 Privacy & Security
          </Badge>
          <h1 className="pt-0 text-4xl sm:text-3xl pb-2 lg:text-6xl font-bold bg-gradient-to-r from-red-800 to-blue-600 bg-clip-text text-transparent ">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground mt-0 mb-6">
            Your privacy and data security are fundamental to our mission. Learn how we protect your information and respect your privacy rights.
          </p>
          <div className="flex justify-center items-center space-x-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Last updated: June 2025</span>
          </div>
        </motion.div>
      </section>

      {/* Privacy Principles */}
      <section className="pt-8 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-800 to-red-600 bg-clip-text text-transparent mb-4">
              Our Privacy Principles
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              These core principles guide how we handle your personal information.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {privacyPrinciples.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="h-full flex flex-col text-center z-10 border-0 shadow-[0_4px_20px_rgba(0,0,0,0.1)] bg-white dark:bg-slate-800">
                  <CardHeader className="space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto">
                      <principle.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold">{principle.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{principle.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Details Sections */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {privacySections.map((block, idx) => (
              <Card key={idx} className="bg-white dark:bg-slate-800/50 shadow-lg border-0 dark:border dark:border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold flex items-center bg-gradient-to-r from-red-800 to-blue-600 bg-clip-text text-transparent">
                    <block.icon className="w-6 h-6 mr-3 text-primary " />
                    {block.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                  {block.sections.map((sec) => (
                    <div key={sec.heading}>
                      <h4 className="text-lg font-semibold mb-3">{sec.heading}</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        {sec.items.map((item, i) => (
                          <li key={i}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}

            {/* Contact Info */}
            <Card className="bg-gradient-to-r from-blue-600 to-red-600 text-white shadow-lg border-0">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Questions About Privacy?</h3>
                <p className="text-blue-100 mb-6">
                  If you have any questions about this privacy policy or how we handle your data, please contact our privacy team.
                </p>
                <div className="space-y-2">
                  <p className="font-semibold">Email: privacy@caresaathi.com</p>
                  <p className="font-semibold">Phone: +91 7084910836</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}
