"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Phone,
  MessageCircle,
  Book,
  Video,
  Download,
  ChevronDown,
  Search,
  Moon,
  Sun,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import Navbar from "@/components/ui/navbar"

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [darkMode, setDarkMode] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const faqs = [
    {
      question: "How quickly can I get emergency help?",
      answer:
        "Our emergency response system activates within 30 seconds of your call. Ambulances are typically dispatched within 2-5 minutes, and we pre-allocate hospital beds to ensure zero-delay admission.",
    },
    {
      question: "Are your caregivers verified and trained?",
      answer:
        "Yes, all our caregivers undergo thorough background checks, medical training, and regular skill assessments. They are certified in elderly care, first aid, and emergency response.",
    },
    {
      question: "Can I track my elderly parent's care remotely?",
      answer:
        "Our app provides real-time updates, daily care reports, medication reminders, and video check-ins. You'll receive notifications about your loved one's health and activities.",
    },
    {
      question: "What areas do you currently serve?",
      answer:
        "We currently serve major cities across India including Mumbai, Delhi, Bangalore, Chennai, Hyderabad, and Pune. We're rapidly expanding to Tier 2 cities as well.",
    },
    {
      question: "How does the hospital bed booking system work?",
      answer:
        "Our system connects with 500+ partner hospitals in real-time. When you need a bed, we instantly check availability, book the bed, and provide you with a digital admission slip for faster entry.",
    },
    {
      question: "Is there a mobile app available?",
      answer:
        "Yes! Our mobile app is available on both iOS and Android. It includes all our services - emergency response, caregiver booking, doctor consultations, and family updates.",
    },
  ]

  const supportOptions = [
    {
      icon: Phone,
      title: "Emergency Hotline",
      description: "24/7 immediate assistance",
      action: "Call 1800-CARE-911",
      color: "red",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Quick responses to your queries",
      action: "Start Chat",
      color: "blue",
    },
    {
      icon: Video,
      title: "Video Support",
      description: "Face-to-face assistance",
      action: "Schedule Call",
      color: "green",
    },
    {
      icon: Book,
      title: "Help Center",
      description: "Comprehensive guides",
      action: "Browse Articles",
      color: "purple",
    },
  ]

  return (
    <>
    <Navbar/>
    <div
  className=" pt-[72px] min-h-screen transition-colors duration-300 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50"
>

      {/* Header */}
     

      {/* Hero Section */}
      <section className="pt-10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <Badge className="bg-gradient-to-r from-blue-900 to-red-900 text-white  dark:text-blue-200border-0 px-4 py-2">
              🆘 Support Center
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-800 to-red-600 bg-clip-text text-transparent">
              How Can We Help?
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Get instant support, find answers to common questions, or connect with our care team. We're here to help 24/7.
            </p>
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
  placeholder="Search for help articles, FAQs, or services..."
  className="pl-12 py-4 text-lg border-2 border-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-white placeholder:text-slate-400 focus:border-blue-500"
/>

              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Support Options */}
      <section className="pt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
<Card className="text-center h-full border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-slate-800/60 group cursor-pointer flex flex-col justify-between">

                  <CardHeader className="space-y-4">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${
                        option.color === "red"
                          ? "from-red-500 to-red-600"
                          : option.color === "blue"
                            ? "from-blue-500 to-blue-600"
                            : option.color === "green"
                              ? "from-green-500 to-green-600"
                              : "from-purple-500 to-purple-600"
                      } rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform`}
                    >
                      <option.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold ">{option.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 flex flex-col flex-grow justify-between">
                    <p className="">{option.description}</p>
                    <Button
                      className={`w-full mt-auto ${
                        option.color === "red"
                          ? "bg-red-500 hover:bg-red-600"
                          : option.color === "blue"
                            ? "bg-blue-500 hover:bg-blue-600"
                            : option.color === "green"
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-purple-500 hover:bg-purple-600"
                      } text-white`}
                      onClick={() => setShowModal(true)}
                    >
                      {option.action}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

  {/* FAQ Section */}
  <section className="py-20 ">
    <div className="container mx-auto px-4 max-w-4xl">
      <h2 className="text-3xl font-bold mb-8 text-center text-slate-900 dark:text-white">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <Collapsible
            key={idx}
            open={openFaq === idx}
            onOpenChange={() => setOpenFaq(openFaq === idx ? null : idx)}
          >
            <CollapsibleTrigger className="w-full bg-white dark:bg-slate-700 rounded-lg py-4 px-6 flex justify-between items-center text-left text-lg font-semibold text-slate-900 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900">
              {faq.question}
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  openFaq === idx ? "rotate-180" : ""
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="p-6 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg border-t border-slate-200 dark:border-slate-600">
              {faq.answer}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  </section>

  {/* Modal Dialog */}
  <Dialog open={showModal} onOpenChange={setShowModal}>
    <DialogContent className="max-w-lg rounded-xl bg-white dark:bg-slate-900">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-center text-blue-700 dark:text-blue-400">
          We're Launching Soon!
        </DialogTitle>
        <DialogDescription className="mt-2 text-center text-slate-700 dark:text-slate-300">
          Thank you for reaching out. Our dedicated support team is working hard to assist you. Please stay tuned — exciting features are on their way!
        </DialogDescription>
      </DialogHeader>
      <div className="mt-6 flex justify-center">
        <Button variant="outline" onClick={() => setShowModal(false)}>
          Close
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</div>
</>
  )
}