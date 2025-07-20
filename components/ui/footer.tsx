"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ComingSoonDialog from "@/components/ComingSoonDialog";
import DialogFooter from "@/components/ui/DialogFooter";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGooglePlay,
  FaApple,
  FaPhoneAlt,
  FaBolt,
  FaTruck,
  FaHeart,
  FaStethoscope,
  FaRunning,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-blue-900 to-red-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 left-10 w-20 h-20 text-red-400/50"
        >
          <FaTruck className="w-[80%] h-[80%]" />
        </motion.div>

        <motion.div
          animate={{ x: [0, -80, 0], y: [0, 60, 0], rotate: [0, -180, -360] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-40 right-20 w-20 h-20 text-blue-400/30"
        >
          <FaHeart className="w-[80%] h-[80%]" />
        </motion.div>

        <motion.div
          animate={{ x: [0, 120, 0], y: [0, -80, 0], rotate: [0, 90, 180] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-40 left-1/4 w-12 h-12 text-red-400/30"
        >
          <FaStethoscope className="w-[80%] h-[80%]" />
        </motion.div>

        <motion.div
          animate={{ x: [0, -60, 0], y: [0, 40, 0], rotate: [0, -90, -180] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-1/3 w-14 h-14 text-blue-400/30"
        >
          <FaRunning className="w-[80%] h-[80%]" />
        </motion.div>

        <motion.div
          animate={{ x: [0, 90, 0], y: [0, -30, 0], rotate: [0, 270, 360] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 left-1/2 w-10 h-10 text-red-400/30"
        >
          <FaBolt className="w-[80%] h-[80%]" />
        </motion.div>
      </div>

      <div className="relative px-4 py-8">
        <div className="container mx-auto text-center">
          {/* Brand & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block mb-3"
            >
              <Image
                src="/footerlogonew.svg"
                alt="CareSaathi Logo"
                width={240}
                height={80}
                className="h-14 w-auto brightness-0 invert mx-auto"
              />
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent mb-2"
            >
              "Jahan Care sirf Service nahi, Saathi ban jaata hai"
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-slate-300 text-lg max-w-2xl mx-auto mb-0"
            >
              Reimagining healthcare with compassion, technology, and the warmth
              of family care.
            </motion.p>

           
          </motion.div>

          {/* Footer Links Grid */}
          <div className=" grid  grid-cols-2 md:grid-cols-4 gap-12 mb-2 text-left max-w-6xl mx-auto">
            {/* Main Pages */}
            <div>
              <h4 className="text-xl font-bold text-blue-400 mb-2 flex items-center gap-2">
                <FaBolt />
                Main Pages
              </h4>
              <ul className="space-y-3 text-slate-300">
                {[
                  { text: "Home", link: "/" },
                  { text: "Services", link: "/services" },
                  { text: "About Us", link: "/about" },
                  { text: "Contact", link: "/contact" },
                ].map((item) => (
                  <li key={item.text}>
                    <Link
                      href={item.link}
                      className="hover:text-blue-400 transition-colors"
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-xl font-bold text-red-400 mb-2 flex items-center gap-2">
                <FaHeart />
                Support
              </h4>
              <ul className="space-y-3 text-slate-300">
                {[
                  { text: "Emergency", link: "/emergency" },
                  { text: "Support Center", link: "/support" },
                  { text: "Help & FAQ", link: "/support" },
                  { text: "Live Chat", link: "/support" },
                ].map((item) => (
                  <li key={item.text}>
                    <Link
                      href={item.link}
                      className="hover:text-red-400 transition-colors"
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-xl font-bold text-blue-400 mb-2 flex items-center gap-2">
                <FaTruck />
                Company
              </h4>
              <ul className="space-y-3 text-slate-300">
                {[
                  { text: "Careers", link: "/careers" },
                  { text: "Blog", link: "/blog" },
                  { text: "Press", link: "/about" },
                  { text: "Partners", link: "/about" },
                ].map((item) => (
                  <li key={item.text}>
                    <Link
                      href={item.link}
                      className="hover:text-blue-400 transition-colors"
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect & Download */}
            <div>
              <h4 className="text-xl font-bold text-red-400 mb-0 flex items-center gap-2">
                <FaPhoneAlt />
                Connect
              </h4>
              {/* Email */}
              <div className="flex items-center space-x-3 text-slate-300 mb-6 justify-start">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=hello@caresaathi.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-400 transition-colors text-sm"
                >
                  ✉️ hello@caresaathi.com
                </a>
              </div>

              {/* Download Buttons */}
              <div className="flex flex-col ml-5 sm:flex-col items-center sm:items-start justify-center sm:justify-start gap-0.5 w-full overflow-visible">
                {/* Google Play Button */}
                <div className="flex-shrink-0 w-full sm:w-auto max-w-[160px] sm:max-w-[180px] lg:max-w-none">
                  <DialogFooter
                    triggerLabel={
                      <img
                        src="/google-play.png"
                        alt="Get it on Google Play"
                        className="h-10 sm:h-12 w-full object-contain"
                      />
                    }
                  />
                </div>

                {/* App Store Button */}
                <div className="flex-shrink-0 w-full sm:w-auto max-w-[160px] sm:max-w-[180px] lg:max-w-none">
                  <DialogFooter
                    triggerLabel={
                      <img
                        src="/app-store.png"
                        alt="Download on the App Store"
                        className="h-10 sm:h-12 w-full object-contain"
                      />
                    }
                  />
                </div>
              </div>

              {/* Follow Us Section - Positioned after Google Play in mobile view */}
              <div className="w-full order-5 sm:mt-0 sm:order-none  mr-4 sm:mr-4">
                <div className="flex flex-col mr-10 items-center sm:items-center">
                  <p className="text-slate-300 font-medium mb-3">Follow Us</p>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.facebook.com/people/Caresaathi/61577145807693/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="p-2 bg-blue-700 hover:bg-blue-800 rounded-full transition-colors"
                    >
                      <FaFacebookF className="w-4 h-4" />
                    </a>
                    <a
                      href="https://x.com/CareSaathi"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter"
                      className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors"
                    >
                      <FaTwitter className="w-4 h-4" />
                    </a>
                    <a
                      href="https://www.instagram.com/caresaathi_/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="p-2 bg-red-600 hover:bg-red-700 rounded-full transition-colors"
                    >
                      <FaInstagram className="w-4 h-4" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="p-2 bg-blue-800 hover:bg-blue-900 rounded-full transition-colors"
                    >
                      <FaLinkedinIn className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Legal Links */}
          <div className="mb-2">
            <div className="flex justify-center space-x-6 text-slate-300 text-sm">
              <Link
                href="/terms"
                className="hover:text-red-400 transition-colors"
              >
                Terms and Conditions
              </Link>
              <span>|</span>
              <Link
                href="/privacy"
                className="hover:text-red-400 transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="border-t border-red-700 pt-4 flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm"
          >
            <p className="mb-4 md:mb-0">
              &copy; 2025 CareSaathi. All rights reserved. Made with{" "}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-red-500 inline-block"
              >
                ❤️
              </motion.span>{" "}
              for India's families.
            </p>

            <div className="flex items-center space-x-3">
              <span>Trusted by 10K+ families</span>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                  >
                    <FaHeart className="text-red-500 w-4 h-4" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="text-center text-xs text-gray mt-0 py-0 pb-2">
        Designed & Developed by Team CareSaathi
      </div>
    </footer>
  );
}