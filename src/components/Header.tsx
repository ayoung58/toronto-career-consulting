"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  href: string;
  label_en: string;
  label_zh: string;
}

const navItems: NavItem[] = [
  { href: "/", label_en: "Home", label_zh: "首页" },
  { href: "/courses", label_en: "Programs", label_zh: "课程" },
  { href: "/contact", label_en: "Contact", label_zh: "联系我们" },
];

/**
 * Main Header Component
 * Responsive navigation with language toggle and mobile menu
 */
export function Header() {
  const { language } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position for header shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes or window resizes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm transition-shadow duration-300",
        scrolled ? "shadow-md" : "shadow-sm",
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Site Title */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                {language === "en"
                  ? "Toronto Career Consulting"
                  : "多伦多职业咨询"}
              </span>
              <span className="text-xs text-gray-500 hidden sm:block">
                {language === "en"
                  ? "多伦多职业咨询"
                  : "Toronto Career Consulting"}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium text-gray-700 hover:text-primary-600",
                  "relative py-2 transition-colors duration-200",
                  "after:absolute after:bottom-0 after:left-0 after:h-0.5",
                  "after:w-0 after:bg-primary-600 after:transition-all after:duration-300",
                  "hover:after:w-full",
                )}
              >
                {language === "en" ? item.label_en : item.label_zh}
              </Link>
            ))}

            {/* Language Toggle */}
            <LanguageToggle variant="compact" />

            {/* Admin Link (subtle) */}
            <Link
              href="/admin-login"
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors ml-2"
            >
              {language === "en" ? "Admin" : "管理"}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageToggle variant="icon-only" />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "p-2 rounded-lg hover:bg-gray-100 transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-primary-500",
              )}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-1 border-t border-gray-100">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "block px-4 py-3 rounded-lg",
                        "text-base font-medium text-gray-700",
                        "hover:bg-primary-50 hover:text-primary-600",
                        "transition-colors duration-200",
                      )}
                    >
                      {language === "en" ? item.label_en : item.label_zh}
                    </Link>
                  </motion.div>
                ))}

                {/* Divider */}
                <div className="my-2 border-t border-gray-100" />

                {/* Admin Link in Mobile */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.05 }}
                >
                  <Link
                    href="/admin-login"
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "block px-4 py-3 rounded-lg",
                      "text-sm text-gray-500",
                      "hover:bg-gray-50 hover:text-gray-700",
                      "transition-colors duration-200",
                    )}
                  >
                    {language === "en" ? "Admin Login" : "管理员登录"}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
