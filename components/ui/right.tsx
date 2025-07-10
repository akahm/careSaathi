'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const medicalImages = ['/po.jpg','/r4.jpg', '/nothing.png', '/webposter1.png'];

export default function MedicalHeroCard() {
  const [currentImage, setCurrentImage] = useState(0);
  const [prevImage, setPrevImage] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevImage(currentImage);
      setCurrentImage((prev) => (prev + 1) % medicalImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [currentImage]);

  return (
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="relative w-full min-h-[50vh] sm:min-h-[80vh] overflow-hidden flex flex-col items-center  px-4 sm:px-8 pt-0 pb-8 bg-gray-5040 dark:from-slate-900/80 dark:via-slate-900/60 dark:to-slate-900/40"
>
  {/* Image Wrapper */}
  <div className="relative w-full max-w-4xl rounded-3xl overflow-hidden shadow-lg aspect-square sm:h-[450px] md:h-[500px] sm:aspect-auto">
    {/* Previous image fading out */}
    {prevImage !== null && (
      <motion.img
        key={`prev-${prevImage}`}
        src={medicalImages[prevImage]}
        alt="Previous Medical"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 w-full h-full object-cover"
      />
    )}

    {/* Current image fading in */}
    <motion.img
      key={`current-${currentImage}`}
      src={medicalImages[currentImage]}
      alt="Current Medical"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="absolute inset-0 w-full h-full object-cover"
    />
  </div>

  {/* Buttons */}
  <div className="mt-10 flex flex-col sm:flex-row gap-4 max-w-4xl w-full justify-center px-2 sm:px-0">
    <Button
      size="lg"
      className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white flex items-center justify-center"
    >
      <Download className="w-5 h-5 mr-2" />
      App Launching Soon
    </Button>
    <Button
      size="lg"
      variant="outline"
      className="w-full sm:w-auto border-purple-500 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950 flex items-center justify-center"
    >
      <Calendar className="w-5 h-5 mr-2" />
      Book Appointment
    </Button>
  </div>
</motion.div>

  );
}
