"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

export default function LaunchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubscribe = async () => {
    if (email) {
      setSubscribed(true);

      // Optional backend call
      /*
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, campaign: "launch_2025" }),
      });
      */
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          {subscribed && (
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              colors={["#4ADE80", "#60A5FA", "#FACC15"]}
            />
          )}

          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-10 max-w-md w-full text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-300/20 to-green-300/20 -z-10" />

            {!subscribed ? (
              <>
                <h2 className="text-4xl font-bold mb-3 text-white drop-shadow-md">
                  🚀 We’re Launching Soon!
                </h2>
                <p className="text-gray-100 mb-6">
                  Be the first to know when we go live.
                  <br /> Sign up now for early access!
                </p>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="border border-white/40 rounded-full px-5 py-3 w-full mb-4 bg-white/30 text-white placeholder:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button
                  onClick={handleSubscribe}
                  className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-full font-semibold hover:shadow-lg"
                >
                  🔔 Notify Me
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-4 text-gray-200 hover:underline text-sm"
                >
                  Close
                </button>
              </>
            ) : (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, ease: "backOut" }}
                className="flex flex-col items-center justify-center"
              >
                <h2 className="text-4xl font-bold mb-2 text-white drop-shadow-md">
                  🎉 You’re In!
                </h2>
                <p className="text-gray-100 mb-4">
                  Thanks for subscribing. We’ll notify you at{" "}
                  <strong>{email}</strong> once we launch.
                </p>

                <button
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600"
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
