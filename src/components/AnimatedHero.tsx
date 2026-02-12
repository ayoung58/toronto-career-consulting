"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { fadeIn, fadeInUp } from "@/lib/animations";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AnimatedHero() {
  const { language } = useLanguage();

  return (
    <section className="relative min-h-[85vh] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="space-y-8">
          {/* Main Heading with slide-up animation */}
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight"
          >
            {language === "en" ? (
              <>
                Build Your Career
                <br />
                <span className="text-primary-600">in One Year</span>
              </>
            ) : (
              <>
                用一年时间
                <br />
                <span className="text-primary-600">开启稳定职业道路</span>
              </>
            )}
          </motion.h1>

          {/* Subtitle with fade-in animation (delayed) */}
          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="text-xl sm:text-2xl text-gray-600 font-medium"
          >
            {language === "en"
              ? "Practical. Career-Focused. Toronto-Based."
              : "实用 · 就业导向 · 立足多伦多"}
          </motion.p>

          {/* Description */}
          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
            className="max-w-2xl mx-auto text-lg text-gray-700"
          >
            {language === "en"
              ? "Our one-year programs are designed to help you gain job-ready skills and confidently enter the Canadian workforce."
              : "我们的成人职业教育课程以就业为核心，帮助学员在一年内掌握实用技能，顺利进入加拿大职场。"}
          </motion.p>

          {/* CTA Buttons with fade-in animation (more delayed) */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/courses">
              <button className="group px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                {language === "en" ? "Explore Programs" : "浏览课程"}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-8 py-4 bg-white text-primary-600 rounded-lg hover:bg-gray-50 transition-all duration-200 border-2 border-primary-600 shadow-md hover:shadow-lg">
                {language === "en" ? "Request Information" : "获取课程资料"}
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
