"use client";

import React from "react";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import CoreServices from "@/components/ui/coreServices";
import Stats from "@/components/ui/stats";
import RealStories from "@/components/ui/realStories";
import CTASection from "@/components/ui/CTASection";
import HeroSection from "@/components/ui/heroSection";
import FloatingChatButtons from "@/components/ui/chatbuttons"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-y-hidden">
      {/* Header Section */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

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

      {/* ✅ Floating Chat Buttons */}
      <FloatingChatButtons />
    </div>
  );
}
