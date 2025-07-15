"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Phone, Users, X, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { usePathname, useRouter } from "next/navigation";
import ComingSoonDialog from "@/components/ComingSoonDialog";

export default function AnimatedHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    router.push("/auth");
  };
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const navLinks = [
    "Home",
    "Services",
    "About",
    "Emergency",
    "Support",
    "Contact",
  ]; // Add this too
  const headerClasses = `fixed top-0 left-0 right-0 z-50 border-b shadow-lg ${
    isHomePage
      ? "bg-white dark:bg-slate-900"
      : "bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl"
  } border-slate-200/50 dark:border-slate-700/50`;

  // mbile menu close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Only handle clicks outside on mobile screens
      if (window.innerWidth >= 1024) return; 

      const target = event.target as Node;

      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(target)
      ) {
       
        const toggleButton = document.querySelector(
          '[aria-label="Toggle mobile menu"]'
        );
        if (toggleButton && !toggleButton.contains(target)) {
          setMobileMenuOpen(false);
        }
      }
    };

    if (mobileMenuOpen) {
      // delay for not immediate closing kharab lagta
      const timeoutId = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <motion.header
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className={headerClasses}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3 max-w-full"
          >
            <div className="max-w-[150px] sm:max-w-[200px]">
              <Image
                src={theme === "dark" ? "/logoblack.svg" : "/logowhite.svg"}
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
            {navLinks.map((item) => (
              <Link
                key={item}
                href={`/${
                  item.toLowerCase() === "home" ? "" : item.toLowerCase()
                }`}
                className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-red-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hidden md:flex"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>

            {/* Emergency Button with Popup */}
            <ComingSoonDialog
              triggerLabel="Emergency"
              triggerIcon={<Phone className="w-4 h-4 mr-2" />}
              className="hidden md:flex bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm px-4 py-2"
            />

            {/* Signup Button */}
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm px-4 py-2">
                <Users className="w-4 h-4 mr-2" />
                Sign up
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-4 pb-4 border-t border-slate-200 dark:border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col space-y-4 pt-4">
              {[
                "Home",
                "Services",
                "About",
                "Emergency",
                "Support",
                "Contact",
              ].map((item) => (
                <Link
                  key={item}
                  href={`/${
                    item.toLowerCase() === "home" ? "" : item.toLowerCase()
                  }`}
                  className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <Button className="bg-gradient-to-r from-red-500 to-red-600 text-white w-full">
                <Phone className="w-4 h-4 mr-2" /> Emergency
              </Button>

              {/* Theme Toggle for Mobile */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700 mt-3">
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                  Theme
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="h-6 w-6 p-0"
                >
                  {theme === "dark" ? (
                    <Sun className="w-3 h-3" />
                  ) : (
                    <Moon className="w-3 h-3" />
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}