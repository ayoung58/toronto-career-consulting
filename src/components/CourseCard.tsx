"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Course } from "@/types";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  DollarSign,
  Briefcase,
  Image as ImageIcon,
} from "lucide-react";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const { language, t } = useLanguage();

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

  // Helper to translate salary range text
  const translateSalaryRange = (salaryRange: string) => {
    if (!salaryRange) return salaryRange;

    let translated = salaryRange;
    // Replace "entry-level" with translated version
    translated = translated.replace(/entry-level/gi, t("salary.entryLevel"));
    // Replace "with experience" with translated version
    translated = translated.replace(
      /with experience/gi,
      t("salary.withExperience"),
    );

    return translated;
  };

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full group"
    >
      {/* Course Image */}
      <div className="relative w-full aspect-video bg-gradient-to-br from-gray-100 to-gray-200">
        {course.image_url ? (
          <Image
            src={course.image_url}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          // Placeholder when no image
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="h-16 w-16 text-gray-300" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Category Badge */}
        {course.category && (
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-700">
              {formatCategory(course.category)}
            </span>
          </div>
        )}

        {/* Course Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {title}
        </h3>

        {/* Description (truncated) */}
        <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
          {description}
        </p>

        {/* Salary Range */}
        {course.salary_range && (
          <div className="flex items-center gap-2 text-green-600 text-sm mb-5">
            <DollarSign className="w-4 h-4" />
            <span className="font-semibold">
              {translateSalaryRange(course.salary_range)}
            </span>
          </div>
        )}

        {/* Career Pathways */}
        {careerPathways && careerPathways.length > 0 && (
          <div>
            <div className="flex items-center gap-2 text-gray-700 text-sm font-medium mb-2">
              <Briefcase className="w-4 h-4" />
              {language === "en" ? "Career Paths:" : "职业方向："}
            </div>
            <div className="flex flex-wrap gap-2">
              {careerPathways.slice(0, 2).map((path, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                >
                  {path}
                </span>
              ))}
              {careerPathways.length > 2 && (
                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-500 rounded">
                  +{careerPathways.length - 2}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
