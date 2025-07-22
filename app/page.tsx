"use client";

import React from "react";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import CoreServices from "@/components/ui/coreServices";
import Stats from "@/components/ui/stats";
import RealStories from "@/components/ui/realStories";
import CTASection from "@/components/ui/CTASection";
import HeroSection from "@/components/ui/heroSection";
import FloatingChatButtons from "@/components/ui/chatbuttons";
import { EmergencyBanner } from "@/components/ui/smart";
import LaunchModal from "@/components/ui/LaunchModal"; // ✅ Import karo

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-y-hidden">
      <LaunchModal /> {/* ✅ Modal pehle hi mount hoga */}

      {/* Header Section */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      <EmergencyBanner /> {/* Emergency Banner Section */}

      {/* Core Services Section */}
      <CoreServices />

      {/* Stats Section */}
      <Stats />

      {/* Real Stories Section */}
      <RealStories />

      {/* CTA Section */}
      <CTASection />

      {/* Footer Section */}
      <Footer />

      {/* Floating Chat Buttons */}
      <FloatingChatButtons />
    </div>
  );
}
