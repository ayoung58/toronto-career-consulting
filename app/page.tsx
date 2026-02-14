"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatedHero } from "@/components/AnimatedHero";
import { CourseCard } from "@/components/CourseCard";
import { Button } from "@/components/ui";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import Link from "next/link";
import type { Course } from "@/types";
import {
  GraduationCap,
  Users,
  ArrowRight,
  CheckCircle,
  Briefcase,
  BookOpen,
  DollarSign,
  Award,
} from "lucide-react";

const categories = [
  {
    icon: Briefcase,
    titleEn: "Business & Administration",
    titleZh: "商业与行政",
    count: 10,
    slug: "business",
  },
  {
    icon: BookOpen,
    titleEn: "Healthcare",
    titleZh: "医疗保健",
    count: 7,
    slug: "healthcare",
  },
  {
    icon: GraduationCap,
    titleEn: "Technology",
    titleZh: "技术",
    count: 4,
    slug: "technology",
  },
  {
    icon: Users,
    titleEn: "Skilled Trades",
    titleZh: "技术工种",
    count: 4,
    slug: "trades",
  },
];

const benefits = [
  {
    en: "Government-funded Second Career programs",
    zh: "政府资助的第二职业计划",
  },
  {
    en: "One-year intensive diploma programs",
    zh: "一年制强化文凭课程",
  },
  {
    en: "Industry-recognized certifications",
    zh: "行业认可的证书",
  },
  {
    en: "Career placement assistance",
    zh: "职业安置帮助",
  },
  {
    en: "Bilingual support in English and Mandarin",
    zh: "英语和普通话双语支持",
  },
];

export default function Home() {
  const { language, t } = useLanguage();
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  // Fetch featured courses on mount
  useEffect(() => {
    async function fetchFeaturedCourses() {
      try {
        const response = await fetch("/api/courses");
        const data = await response.json();
        if (response.ok) {
          // Get first 6 courses for featured section
          setFeaturedCourses(data.courses.slice(0, 6));
        }
      } catch (error) {
        console.error("Error fetching featured courses:", error);
      } finally {
        setLoadingCourses(false);
      }
    }
    fetchFeaturedCourses();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <AnimatedHero />

      {/* Program Categories */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {language === "en" ? "Explore Our Programs" : "探索我们的课程"}
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              {language === "en"
                ? "Choose from 25+ career-focused programs across multiple industries"
                : "从多个行业的25+职业培训课程中选择"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/courses?category=${category.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                      <CardHeader className="text-center">
                        <div className="mx-auto w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                          <Icon className="h-6 w-6 text-primary-600" />
                        </div>
                        <CardTitle>
                          {language === "en"
                            ? category.titleEn
                            : category.titleZh}
                        </CardTitle>
                        <CardDescription>
                          {category.count}{" "}
                          {language === "en"
                            ? "programs available"
                            : "个课程可选"}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link href="/courses">
              <Button size="lg">
                {language === "en" ? "View All Programs" : "查看所有课程"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                {language === "en"
                  ? "Why Choose Toronto Career Consulting?"
                  : "为什么选择多伦多职业咨询？"}
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                {language === "en"
                  ? "We help you navigate government-funded career programs and find the right path for your future."
                  : "我们帮助您了解政府资助的职业培训课程，为您的未来找到正确的道路。"}
              </p>

              <ul className="mt-8 space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      {language === "en" ? benefit.en : benefit.zh}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 md:p-12">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <DollarSign className="h-8 w-8 text-green-500 mb-3" />
                    <h3 className="font-semibold text-gray-900">
                      {language === "en" ? "Government Funded" : "政府资助"}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {language === "en"
                        ? "Up to $28,000 in funding available"
                        : "最高可获得$28,000资助"}
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <Award className="h-8 w-8 text-primary-500 mb-3" />
                    <h3 className="font-semibold text-gray-900">
                      {language === "en" ? "Certified" : "认证课程"}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {language === "en"
                        ? "Industry-recognized credentials"
                        : "行业认可的资质证书"}
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <Users className="h-8 w-8 text-orange-500 mb-3" />
                    <h3 className="font-semibold text-gray-900">
                      {language === "en" ? "Bilingual" : "双语服务"}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {language === "en"
                        ? "English & Mandarin support"
                        : "英语和普通话支持"}
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <Briefcase className="h-8 w-8 text-purple-500 mb-3" />
                    <h3 className="font-semibold text-gray-900">
                      {language === "en" ? "Job Ready" : "就业准备"}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {language === "en"
                        ? "Career placement assistance"
                        : "职业安置帮助"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Programs Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {language === "en" ? "Featured Programs" : "精选课程"}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {language === "en"
                ? "Explore our most popular one-year career training programs designed to help you enter the Canadian workforce"
                : "探索我们最受欢迎的一年制职业培训课程，帮助您进入加拿大职场"}
            </p>
          </div>

          {loadingCourses ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {featuredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>

              <div className="text-center">
                <Link href="/courses">
                  <Button size="lg">
                    {language === "en" ? "View All Programs" : "查看所有课程"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {language === "en"
                ? "Ready to Start Your New Career?"
                : "准备开始您的新职业生涯了吗？"}
            </h2>
            <p className="text-lg text-primary-100 max-w-2xl mx-auto">
              {language === "en"
                ? "Contact us today for a free consultation. We'll help you find the perfect program and guide you through the application process."
                : "立即联系我们进行免费咨询。我们将帮助您找到最适合的课程，并指导您完成申请流程。"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white text-primary-700 hover:bg-primary-50 shadow-lg"
                >
                  {t("nav.contact")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="tel:+14167092030">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white bg-transparent text-white hover:bg-white/10"
                >
                  {language === "en"
                    ? "Call: (416) 709-2030"
                    : "电话: (416) 709-2030"}
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
