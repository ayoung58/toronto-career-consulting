"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Course } from "@/types";
import Link from "next/link";
import { ArrowRight, DollarSign, Briefcase } from "lucide-react";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const { language } = useLanguage();

  // Get bilingual content based on current language
  const title =
    language === "zh" && course.title_zh ? course.title_zh : course.title_en;

  const description =
    language === "zh" && course.description_zh
      ? course.description_zh
      : course.description_en;

  const careerPathways =
    language === "zh" && course.career_pathways_zh
      ? course.career_pathways_zh
      : course.career_pathways_en;

  // Helper to format category for display
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

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full"
    >
      {/* Category Badge */}
      {course.category && (
        <div className="px-6 pt-6">
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-700">
            {formatCategory(course.category)}
          </span>
        </div>
      )}

      <div className="px-6 py-4 flex-1 flex flex-col">
        {/* Course Title */}
        <Link href={`/courses/${course.slug}`}>
          <h3 className="text-xl font-bold text-gray-900 hover:text-primary-600 transition-colors mb-3 line-clamp-2">
            {title}
          </h3>
        </Link>

        {/* Description (truncated) */}
        <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
          {description}
        </p>

        {/* Salary Range */}
        {course.salary_range && (
          <div className="flex items-center gap-2 text-green-600 text-sm mb-4">
            <DollarSign className="w-4 h-4" />
            <span className="font-semibold">{course.salary_range}</span>
          </div>
        )}

        {/* Career Pathways */}
        {careerPathways && careerPathways.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 text-gray-700 text-sm font-medium mb-2">
              <Briefcase className="w-4 h-4" />
              {language === "en" ? "Career Paths:" : "职业方向："}
            </div>
            <div className="flex flex-wrap gap-2">
              {careerPathways.slice(0, 3).map((path, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                >
                  {path}
                </span>
              ))}
              {careerPathways.length > 3 && (
                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-500 rounded">
                  +{careerPathways.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Learn More Link */}
        <Link
          href={`/courses/${course.slug}`}
          className="group mt-auto inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
        >
          {language === "en" ? "Learn More" : "了解更多"}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
