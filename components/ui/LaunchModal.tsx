"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { FaGift } from "react-icons/fa";

const COUPONS = [
  { code: "RAKHI50", description: "₹50 OFF on 1st booking" },
  { code: "FREECALL", description: "Free Tele-Consultation" },
  { code: "CAREPRIORITY", description: "Priority Care Access" },
  { code: "HAPPYFAMILY", description: "Surprise Gift at Launch" },
];

export default function LaunchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [showSurprise, setShowSurprise] = useState(false);
  const [coupon, setCoupon] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubscribe = async () => {
    if (email) {
      // Save to backend
      /*
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, campaign: "raksha_bandhan_2025" }),
      });
      */

      const selectedCoupon = COUPONS[Math.floor(Math.random() * COUPONS.length)];
      setCoupon(selectedCoupon);

      /*
      await fetch("/api/save-coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, coupon: selectedCoupon.code }),
      });
      */

      setShowSurprise(true);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          {/* 🔥 Confetti + Fireworks Layer */}
          {showSurprise && (
            <>
              <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                colors={["#FF69B4", "#FFD700", "#FF4500"]}
              />
              <div className="absolute inset-0 bg-[url('/fireworks.gif')] bg-cover opacity-30 pointer-events-none" />
            </>
          )}

          {/* 📌 Frosted Modal */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white/30 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10 max-w-md w-full text-center relative overflow-hidden"
          >
            {/* Gradient Swirl */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-300/20 to-purple-300/20 -z-10" />

            {/* 🎀 Surprise Box / Form */}
            {!showSurprise ? (
              <>
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-4xl font-bold mb-3 text-white drop-shadow-md">
                    🎀 Raksha Bandhan Surprise!
                  </h2>
                  <p className="text-gray-100 mb-6">
                    Enter your email & unlock your festival surprise 🎁
                  </p>

                  <input
                    type="email"
                    placeholder="Your email address"
                    className="border border-white/40 rounded-full px-5 py-3 w-full mb-4 bg-white/20 text-white placeholder:text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <button
                    onClick={handleSubscribe}
                    className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg"
                  >
                    ✨ Notify & Open Box
                  </button>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="mt-4 text-gray-200 hover:underline text-sm"
                  >
                    Close
                  </button>
                </motion.div>
              </>
            ) : (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, ease: "backOut" }}
                className="flex flex-col items-center justify-center"
              >
                <motion.div
                  animate={{ y: [0, -10, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-6xl mb-4 text-yellow-300"
                >
                  <FaGift />
                </motion.div>
                <h2 className="text-4xl font-bold mb-2 text-white drop-shadow-md">
                  🎉 Surprise Unlocked!
                </h2>
                <p className="text-gray-100 mb-2">
                  You got: <strong>{coupon.description}</strong>
                </p>
                <div className="text-2xl font-mono bg-white/20 border border-white/30 text-white p-4 rounded-lg mb-4 inline-block">
                  {coupon.code}
                </div>
                <button
                  onClick={handleCopy}
                  className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600"
                >
                  {copied ? "✅ Copied!" : "Copy Coupon Code"}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-4 text-gray-200 hover:underline text-sm block w-full"
                >
                  Close
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
}
