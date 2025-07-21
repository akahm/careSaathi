"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Sun, Moon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import AnimatedHeader from "@/components/ui/header";

export default function TermsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      try {
        const savedTheme = window.localStorage.getItem("terms-dark-mode");
        if (savedTheme === "true") setDarkMode(true);
      } catch (e) {
        console.warn("Theme load error", e);
      }
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem("terms-dark-mode", newMode.toString());
      } catch (e) {
        console.warn("Theme save error", e);
      }
    }
  };

  return (
    <>
      <AnimatedHeader />

      <div
        className={`min-h-screen pt-12 transition-colors duration-300 ${
          darkMode
            ? "dark bg-background text-foreground"
            : "bg-background text-foreground"
        }`}
      >
        {/* Hero */}
        <section className="pt-12 pb-4 text-center">
          <Badge className="bg-gradient-to-r from-blue-900 to-red-900 text-white px-4 py-2  ">
            📋 Legal Terms
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-800 to-red-600 bg-clip-text text-transparent mt-4">
            Terms & Conditions
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 mt-2 flex flex-col justify-center sm:flex-row items-center gap-0.5 sm:gap-2">
            <span>  Effective Date:16/06/2025 </span>
            <span className="hidden sm:inline">|</span>
            <span>Last Updated:16/06/2025</span>
          </p>
        </section>

        {/* Important Notice */}
        <section className="pt-3 pb-0">
          <div className="container mx-auto px-4">
            <Alert className="max-w-4xl mx-auto border-red-200 bg-red-50 dark:bg-red-900/30 dark:border-red-700">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-red-700 dark:text-red-300">
                <strong>Important:</strong> CareSaathi is not a hospital or
                emergency medical provider. Always dial 108 in emergencies.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Terms Sections */}
        <section className="py-6">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">
            {[
              {
                icon: () => <span>⚖</span>,
                title: "General Use of Services",
                points: [
                  "By using CareSaathi, you confirm that you are 18 years or older or using the platform under the guidance of a legal guardian.",
                  "All services are provided on a best-effort basis. While we strive for excellence, we do not guarantee uninterrupted, error-free, or perfect services.",
                ],
              },
              {
                icon: () => <span>⚠</span>,
                title: "Medical Disclaimer",
                points: [
                  "CareSaathi is not a hospital, emergency medical provider, or medical institution.",
                  "All medical consultations provided through our platform are opinions from licensed third-party doctors. These do not constitute a final medical verdict.",
                  "Users are advised to seek physical consultation and use their own discretion before acting.",
                ],
              },
              {
                icon: () => <span>🚑</span>,
                title: "Ambulance & Emergency Response",
                points: [
                  "Our ambulance services are provided via third-party logistics partners and hospitals.",
                  "CareSaathi is a facilitator and not the operator of emergency vehicles.",
                  "We do not guarantee availability, ETA, or medical readiness of any ambulance.",
                  "CareSaathi shall bear no liability for delays or death enroute.",
                  "Always also dial 108 during medical emergencies.",
                ],
              },
              {
                icon: () => <span>🩺</span>,
                title: "Caregiver & Nurse Services",
                points: [
                  "All caregivers, nurses, and support staff are verified and onboarded via partner agencies.",
                  "CareSaathi is not responsible for the behavior or actions of caregivers.",
                  "Users must maintain personal supervision and security.",
                  "Report misconduct immediately for partner-level action.",
                ],
              },
              {
                icon: () => <span>🤝</span>,
                title: "Emotional & Psychological Support",
                points: [
                  "Peer-based emotional support only; not a clinical therapy service.",
                  "Advice is based on personal experience, not medical certification.",
                  "CareSaathi is not liable for mental health outcomes.",
                ],
              },
              {
                icon: () => <span>💳</span>,
                title: "Payments & Refunds",
                points: [
                  "Payments are handled via third-party gateways (e.g., Razorpay).",
                  "Refunds are not guaranteed once a service is booked/rendered.",
                  "All payment issues must be directed to the gateway. CareSaathi is not liable.",
                ],
              },
              {
                icon: () => <span>🚨</span>,
                title: "Limitation of Liability",
                points: [
                  "CareSaathi shall not be liable for indirect, incidental, or punitive damages.",
                  "We are not responsible for death, delay, misdiagnosis, or treatment failure.",
                  "All services are availed at user’s own risk.",
                ],
              },
              {
                icon: () => <span>©</span>,
                title: "Intellectual Property",
                points: [
                  "All content and design elements are property of CareSaathi Pvt. Ltd.",
                  "Unauthorized use or reproduction is prohibited.",
                ],
              },
              {
                icon: () => <span>📜</span>,
                title: "Governing Law & Jurisdiction",
                points: [
                  "Terms are governed by Indian law.",
                  "All disputes will fall under Lucknow, Uttar Pradesh jurisdiction.",
                ],
              },
            ].map((section, i) => (
              <Card
                key={i}
                className="bg-card text-card-foreground border border-border shadow-md"
              >
                <CardHeader>
                  <CardTitle className="flex items-center bg-gradient-to-r from-blue-800 to-red-600 bg-clip-text text-transparent">
                    <span className="mr-2 text-lg">{section.icon()}</span>
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-muted-foreground text-sm">
                  {section.points.map((point, idx) => (
                    <p key={idx}>• {point}</p>
                  ))}
                </CardContent>
              </Card>
            ))}

            {/* Contact */}
            <Card className="bg-card text-card-foreground border border-border shadow-md">
              <CardContent className="text-center py-6 space-y-1">
                <h3 className="text-xl font-bold">Need Assistance?</h3>
                <p>
                  Email:{" "}
                  <a href="mailto:legal@caresaathi.in" className="underline">
                    legal@caresaathi.in
                  </a>
                </p>
                <p>Location: Lucknow, Uttar Pradesh</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
}