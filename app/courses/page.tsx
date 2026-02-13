"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CourseCard } from "@/components/CourseCard";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Course } from "@/types";
import { Search, Filter } from "lucide-react";

export default function CoursesPage() {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("alphabetical");

  // Categories for filtering
  const categories = [
    { value: "all", label_en: "All Programs", label_zh: "所有课程" },
    { value: "business", label_en: "Business", label_zh: "商业" },
    { value: "healthcare", label_en: "Healthcare", label_zh: "医疗" },
    { value: "technology", label_en: "Technology", label_zh: "技术" },
    { value: "trades", label_en: "Trades & Services", label_zh: "技能与服务" },
  ];

  // Sort options
  const sortOptions = [
    {
      value: "alphabetical",
      label_en: "Alphabetical (A-Z)",
      label_zh: "按字母排序 (A-Z)",
    },
    {
      value: "starting_salary_low",
      label_en: "Low to High (starting salary)",
      label_zh: "低到高 (起薪)",
    },
    {
      value: "starting_salary_high",
      label_en: "High to Low (starting salary)",
      label_zh: "高到低 (起薪)",
    },
    {
      value: "ending_salary_low",
      label_en: "Low to High (ending salary)",
      label_zh: "低到高 (最高薪资)",
    },
    {
      value: "ending_salary_high",
      label_en: "High to Low (ending salary)",
      label_zh: "高到低 (最高薪资)",
    },
  ];

  // Initialize category from URL on mount
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      // Map "social services" to "trades" for backward compatibility
      const mappedCategory =
        categoryParam.toLowerCase() === "social services"
          ? "trades"
          : categoryParam.toLowerCase();

      // Check if it's a valid category
      const validCategory = categories.find(
        (cat) => cat.value === mappedCategory,
      );
      if (validCategory) {
        setSelectedCategory(mappedCategory);
      }
    }
  }, [searchParams]);

  // Fetch courses when filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCourses();
    }, 500); // Debounce search by 500ms

    return () => clearTimeout(timer);
  }, [selectedCategory, searchTerm, sortBy]);

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
        let sortedCourses = data.courses || [];

        // Helper functions for salary extraction
        const getSalaryStart = (range: string | null) => {
          if (!range) return 0;
          const match = range.match(/\$([\d,]+)/);
          return match ? parseInt(match[1].replace(/,/g, "")) : 0;
        };

        const getSalaryEnd = (range: string | null) => {
          if (!range) return 0;
          const matches = range.match(/\$([\d,]+)/g);
          if (!matches || matches.length < 2) return getSalaryStart(range);
          const lastMatch = matches[matches.length - 1];
          return parseInt(lastMatch.replace(/[\$,]/g, ""));
        };

        // Apply sorting
        if (sortBy === "alphabetical") {
          sortedCourses = [...sortedCourses].sort((a, b) =>
            a.title_en.localeCompare(b.title_en),
          );
        } else if (sortBy === "starting_salary_low") {
          sortedCourses = [...sortedCourses].sort(
            (a, b) =>
              getSalaryStart(a.salary_range) - getSalaryStart(b.salary_range),
          );
        } else if (sortBy === "starting_salary_high") {
          sortedCourses = [...sortedCourses].sort(
            (a, b) =>
              getSalaryStart(b.salary_range) - getSalaryStart(a.salary_range),
          );
        } else if (sortBy === "ending_salary_low") {
          sortedCourses = [...sortedCourses].sort(
            (a, b) =>
              getSalaryEnd(a.salary_range) - getSalaryEnd(b.salary_range),
          );
        } else if (sortBy === "ending_salary_high") {
          sortedCourses = [...sortedCourses].sort(
            (a, b) =>
              getSalaryEnd(b.salary_range) - getSalaryEnd(a.salary_range),
          );
        }

        setCourses(sortedCourses);
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

            {/* Category Filters and Sort - Horizontal on desktop, stacked on mobile */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Category Filters */}
              <div className="flex items-center gap-2 flex-1">
                <Filter className="h-5 w-5 text-gray-600 flex-shrink-0" />
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

              {/* Sort Dropdown */}
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                  {language === "en" ? "Sort by:" : "排序方式："}
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {language === "en" ? option.label_en : option.label_zh}
                    </option>
                  ))}
                </select>
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
