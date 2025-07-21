"use client"

import { motion } from "framer-motion"
import { Heart, Shield, Truck, Building2, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import doctorPersonImage from "@/public/image.png"
import { Calendar, Download } from "lucide-react"

const networkNodes = [
  { icon: Shield, label: "Verified Elderly", angle: 0, delay: 0.2 },
  { icon: Truck, label: "Emergency Ambulance", angle: 60, delay: 0.4 },
  { icon: Building2, label: "Hospital Booking", angle: 120, delay: 0.6 },
  { icon: Brain, label: "Mental Wellness", angle: 180, delay: 0.8 },
  { icon: Heart, label: "2nd Opinions", angle: 240, delay: 1.0 },
  { icon: Heart, label: "AI Emotional Companion", angle: 300, delay: 1.2 },
  { icon: Heart, label: "Post Surgery Care", angle: 360, delay: 1.4 },
]

export default function CareSaathiNetworkHero() {
  const radius = 240 // spacing

  return (
      <div className="max-w-6xl mx-auto text-center lg:min-h-screen sm:min-h-[50vh] md:min-h-[50vh]  relative overflow-hidden flex flex-col items-center justify-center">
        {/* Main circular container */}
        <div className="relative   w-[300px] h-[430px]
          sm:w-[480px] sm:h-[180px] 
          md:w-[600px] md:h-[500px] 
          lg:w-[600px] lg:h-[510px]  max-w-6xl mx-auto text-center">
          {/* Central Image with rotating gradient ring */}
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="w-64 h-64 md:w-80 md:h-80 lg:w-92 lg:h-92 rounded-full flex items-center justify-center relative overflow-hidden shadow-2xl">

  {/* Rotating Gradient Ring */}
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 12, ease: "linear" }}
    className="absolute inset-0 rounded-full"
  >
    <div className="w-full h-full rounded-full bg-gradient-to-r from-red-600 to-blue-600 p-[8px] shadow-inner shadow-blue-500/30">
      <div className="w-full h-full rounded-full bg-white dark:bg-black shadow-xl"></div>
    </div>
  </motion.div>

  {/* Image */}
  <img
    src={typeof doctorPersonImage === "string" ? doctorPersonImage : doctorPersonImage.src}
    alt="Healthcare Professional"
    className="relative w-52 h-52 md:w-72 md:h-72 lg:w-78 lg:h-78 object-cover rounded-full shadow-2xl z-10"
  />

</div>


            {/* Orbiting Nodes */}
            <div className="lg:block absolute inset-0">
              {networkNodes.map((node, index) => {
                const angleRad = (node.angle * Math.PI) / 360
                const x = radius * Math.cos(angleRad)
                const y = radius * Math.sin(angleRad)

               return (
              // Framer Motion div for initial animation and positioning.
              <motion.div
                key={`node-${index}`}
                initial={{ opacity: 0, scale: 0 }} // Start invisible and small
                animate={{ opacity: 1, scale: 1 }} // Animate to visible and full size
                transition={{ delay: node.delay, type: "spring" }} // Spring animation with delay
                className="absolute"
                style={{
                  left: `calc(35% + ${x}px)`,
                  top: `calc(30% + ${y}px)`,
                  transform: "translate(-50%, -50%)", // Center the node element itself
                }}
              >
                {/* Inner div for the node's content, with hover/tap animations and responsive styling. */}
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(220, 38, 38, 0.05)", // Add shadow on hover
                  }}
                  whileTap={{ scale: 0.95 }} 
                  className="
                    w-14 h-14 sm:w-21 sm:h-18 md:w-24 md:h-24 lg:w-24 lg:h-24 
                    rounded-full shadow-lg flex flex-col items-center justify-center
                    border-2 border-purple-200/50 dark:text-white to-purple-50 p-1 sm:p-1.5 text-center
                  "
                >
                  {/* Node icon with responsive sizing and color. */}
                  <node.icon className="w-5 h-5 sm:w-6 h-6 md:w-7 h-7 lg:w-10 h-10 text-blue-600 mb-1" />
                  {/* Node label text with responsive font size. */}
                  <span className="text-[6px] sm:text-[7px] md:text-[8px] lg:text-xs text-gray-700 dark:text-white font-semibold leading-tight">
                    {node.label}
                  </span>
                </motion.div>
              </motion.div>
            )
              })}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <motion.div className="flex justify-center">
          <div className="flex flex-col sm:flex-row gap-4 max-w-4xl w-full justify-center px-4 sm:px-0">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white flex items-center justify-center"
            >
              <Download className="w-5 h-5 mr-2" />
              App Launching Soon
            </Button>
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white flex items-center justify-center"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Appointment
            </Button>
          </div>
        </motion.div>
      </div>
    
  )
}
