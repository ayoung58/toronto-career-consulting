"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Course } from "@/types";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  DollarSign,
  Briefcase,
  TrendingUp,
  BookOpen,
  Image as ImageIcon,
} from "lucide-react";
import { motion } from "framer-motion";

export default function CourseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const { language, t } = useLanguage();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourse() {
      try {
        setLoading(true);
        const response = await fetch(`/api/courses?slug=${slug}`);
        const data = await response.json();

        if (response.ok && data.length > 0) {
          setCourse(data[0]);
        } else {
          setError("Course not found");
        }
      } catch (err) {
        console.error("Error fetching course:", err);
        setError("Failed to load course");
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchCourse();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            {language === "en" ? "Loading course..." : "加载中..."}
          </p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {language === "en" ? "Course Not Found" : "未找到课程"}
          </h1>
          <p className="text-gray-600 mb-6">
            {language === "en"
              ? "The course you're looking for doesn't exist."
              : "您查找的课程不存在。"}
          </p>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700"
          >
            <ArrowLeft className="w-4 h-4" />
            {language === "en" ? "Back to Courses" : "返回课程"}
          </Link>
        </div>
      </div>
    );
  }

  // Get bilingual content
  const title =
    language === "zh" && course.title_zh ? course.title_zh : course.title_en;
  const description =
    language === "zh" && course.description_zh
      ? course.description_zh
      : course.description_en;
  const keyLearnings =
    language === "zh" && course.key_learning_zh
      ? course.key_learning_zh
      : course.key_learning_en;
  const careerPathways =
    language === "zh" && course.career_pathways_zh
      ? course.career_pathways_zh
      : course.career_pathways_en;
  const employmentOutlook =
    language === "zh" && course.employment_outlook_zh
      ? course.employment_outlook_zh
      : course.employment_outlook_en;

  // Helper to format category
  const formatCategory = (cat: string | null) => {
    if (!cat) return null;
    const categoryNames: Record<string, { en: string; zh: string }> = {
      business: { en: "Business", zh: "商业" },
      healthcare: { en: "Healthcare", zh: "医疗" },
      technology: { en: "Technology", zh: "技术" },
      trades: { en: "Trades", zh: "技能" },
      education: { en: "Education", zh: "教育" },
      hospitality: { en: "Hospitality", zh: "酒店管理" },
      creative: { en: "Creative Arts", zh: "创意艺术" },
      finance: { en: "Finance", zh: "金融" },
    };
    return categoryNames[cat]?.[language] || cat;
  };

  // Helper to translate salary range text
  const translateSalaryRange = (salaryRange: string) => {
    if (!salaryRange) return salaryRange;
    let translated = salaryRange;
    translated = translated.replace(/entry-level/gi, t("salary.entryLevel"));
    translated = translated.replace(
      /with experience/gi,
      t("salary.withExperience"),
    );
    return translated;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Header with back button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {language === "en" ? "Back to Courses" : "返回课程"}
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Image and Title Section */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            {/* Image */}
            <div className="relative w-full aspect-[16/5] bg-gradient-to-br from-gray-100 to-gray-200">
              {course.image_url ? (
                <Image
                  src={course.image_url}
                  alt={title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="h-16 w-16 text-gray-300" />
                </div>
              )}
            </div>

            {/* Title and Category */}
            <div className="p-5 sm:p-6 lg:p-8">
              {course.category && (
                <span className="inline-block px-3 py-1.5 text-xs font-semibold rounded-full bg-primary-100 text-primary-700 mb-3">
                  {formatCategory(course.category)}
                </span>
              )}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                {title}
              </h1>

              {/* Salary Range */}
              {course.salary_range && (
                <div className="flex items-center gap-2 text-green-600 text-base sm:text-lg font-semibold">
                  <DollarSign className="w-5 h-5" />
                  <span>{translateSalaryRange(course.salary_range)}</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content - Left Column (2/3) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {language === "en" ? "About This Program" : "关于此课程"}
                </h2>
                <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                  {description}
                </div>
              </div>

              {/* Key Learnings */}
              {keyLearnings && keyLearnings.length > 0 && (
                <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <BookOpen className="w-6 h-6 text-primary-600" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      {language === "en" ? "What You'll Learn" : "您将学到什么"}
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {keyLearnings.map((learning, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-semibold mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-gray-700 leading-relaxed">
                          {learning}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Employment Outlook */}
              {employmentOutlook && (
                <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      {language === "en" ? "Employment Outlook" : "就业前景"}
                    </h2>
                  </div>
                  <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                    {employmentOutlook}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - Right Column (1/3) */}
            <div className="lg:col-span-1">
              {/* Career Pathways */}
              {careerPathways && careerPathways.length > 0 && (
                <div className="bg-white rounded-xl shadow-md p-6 sticky top-24 max-h-[calc(100vh-180px)] overflow-y-auto">
                  <div className="flex items-center gap-3 mb-6">
                    <Briefcase className="w-6 h-6 text-primary-600" />
                    <h2 className="text-xl font-bold text-gray-900">
                      {language === "en" ? "Career Paths" : "职业方向"}
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {careerPathways.map((path, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-4 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg border border-primary-100 hover:border-primary-300 transition-colors"
                      >
                        <p className="text-sm font-medium text-gray-800">
                          {path}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
