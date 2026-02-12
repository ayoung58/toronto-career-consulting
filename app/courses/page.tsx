"use client";

import { useState, useEffect } from "react";
import { CourseCard } from "@/components/CourseCard";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Course } from "@/types";
import { Search, Filter } from "lucide-react";

export default function CoursesPage() {
  const { language } = useLanguage();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Categories for filtering
  const categories = [
    { value: "all", label_en: "All Programs", label_zh: "所有课程" },
    { value: "business", label_en: "Business", label_zh: "商业" },
    { value: "healthcare", label_en: "Healthcare", label_zh: "医疗" },
    { value: "technology", label_en: "Technology", label_zh: "技术" },
    { value: "trades", label_en: "Trades & Services", label_zh: "技能与服务" },
  ];

  // Fetch courses when filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCourses();
    }, 500); // Debounce search by 500ms

    return () => clearTimeout(timer);
  }, [selectedCategory, searchTerm]);

  async function fetchCourses() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== "all") {
        params.append("category", selectedCategory);
      }
      if (searchTerm.trim()) {
        params.append("search", searchTerm);
      }

      const response = await fetch(`/api/courses?${params}`);
      const data = await response.json();

      if (response.ok) {
        setCourses(data.courses || []);
      } else {
        console.error("Failed to fetch courses:", data.error);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col">
      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {language === "en" ? "Explore Our Programs" : "浏览我们的课程"}
            </h1>
            <p className="text-gray-600">
              {language === "en"
                ? "Browse our comprehensive selection of one-year career programs"
                : "浏览我们全面的一年制职业培训课程"}
            </p>
          </div>

          {/* Filters Section */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={
                  language === "en" ? "Search programs..." : "搜索课程..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      selectedCategory === cat.value
                        ? "bg-primary-600 text-white"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {language === "en" ? cat.label_en : cat.label_zh}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          {!loading && (
            <div className="mb-4 text-sm text-gray-600">
              {language === "en"
                ? `Showing ${courses.length} program${courses.length !== 1 ? "s" : ""}`
                : `显示 ${courses.length} 个课程`}
            </div>
          )}

          {/* Courses Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">
                {language === "en"
                  ? "No programs found. Try adjusting your filters."
                  : "未找到课程。请尝试调整筛选条件。"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
