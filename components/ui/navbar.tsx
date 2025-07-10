"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Moon, Sun, Menu, X, Phone, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { useRouter } from "next/navigation";
import ComingSoonDialog from "@/components/ComingSoonDialog";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const handleClick = () => {
    router.push("/login");
  };
  const [scrolled, setScrolled] = useState(false);

  // Scroll shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 md:transition-none ${
        scrolled || mobileMenuOpen
          ? "bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-lg"
          : "bg-white dark:bg-slate-900 md:bg-transparent dark:md:bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="max-w-[150px] sm:max-w-[200px]">
              <Image
                src={theme === "dark" ? "/logowhite.png" : "/logo.png"}
                alt="CareSaathi Logo"
                width={200}
                height={60}
                className="h-10 sm:h-12 w-auto max-w-full"
                priority
              />
            </div>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {["Home", "Services", "About", "Emergency", "Support", "Contact"].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                  className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-red-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Theme Toggle Button (Desktop) */}
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="hidden md:flex">
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* Emergency Button with Popup */}
            <ComingSoonDialog
              triggerLabel="Emergency"
              triggerIcon={<Phone className="w-4 h-4 mr-2" />}
              className="hidden md:flex bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm px-4 py-2"
            />

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>

            {/* Responsive Login Button */}
            <Button
              onClick={handleClick}
              className="flex items-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm px-3 py-1.5 sm:px-4 sm:py-2"
            >
              <Users className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Sign up</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 z-40 h-full w-64 bg-white dark:bg-slate-900 shadow-lg p-6 lg:hidden"
          >
            <div className="flex flex-col space-y-4 pt-4">
              {["Home", "Services", "About", "Emergency", "Support", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                  className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <Button className="bg-gradient-to-r from-red-500 to-red-600 text-white w-full">
                <Phone className="w-4 h-4 mr-2" /> Emergency
              </Button>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700 mt-4">
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  Switch Theme
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    toggleTheme();
                    setMobileMenuOpen(false);
                  }}
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
