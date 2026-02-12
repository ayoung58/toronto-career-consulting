import { createClient } from "@/lib/supabase-server";
import Link from "next/link";
import { BookOpen, FileText, Languages, Plus, ArrowRight } from "lucide-react";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Fetch statistics
  const [
    { count: totalCourses },
    { count: publishedCourses },
    { count: draftCourses },
    { count: totalTranslations },
    { count: missingTranslations },
    { data: recentCourses },
  ] = await Promise.all([
    supabase.from("courses").select("*", { count: "exact", head: true }),
    supabase
      .from("courses")
      .select("*", { count: "exact", head: true })
      .eq("is_published", true),
    supabase
      .from("courses")
      .select("*", { count: "exact", head: true })
      .eq("is_published", false),
    supabase.from("translations").select("*", { count: "exact", head: true }),
    supabase
      .from("translations")
      .select("*", { count: "exact", head: true })
      .is("value_zh", null),
    supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const stats = [
    {
      label: "Total Courses",
      value: totalCourses || 0,
      icon: BookOpen,
      color: "bg-blue-100 text-blue-600",
      href: "/admin/courses",
    },
    {
      label: "Published",
      value: publishedCourses || 0,
      icon: FileText,
      color: "bg-green-100 text-green-600",
      href: "/admin/courses",
    },
    {
      label: "Drafts",
      value: draftCourses || 0,
      icon: FileText,
      color: "bg-yellow-100 text-yellow-600",
      href: "/admin/courses",
    },
    {
      label: "Translations",
      value: totalTranslations || 0,
      icon: Languages,
      color: "bg-purple-100 text-purple-600",
      href: "/admin/translations",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome back! Here's an overview of your content.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Link
            key={index}
            href={stat.href}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition group"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}
              >
                <stat.icon className="h-6 w-6" />
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </Link>
        ))}
      </div>

      {/* Alert for Missing Translations */}
      {missingTranslations && missingTranslations > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Languages className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-yellow-900 mb-1">
                Missing Translations
              </h3>
              <p className="text-sm text-yellow-800 mb-3">
                You have {missingTranslations} translation
                {missingTranslations !== 1 ? "s" : ""} without Chinese values.
              </p>
              <Link
                href="/admin/translations"
                className="inline-flex items-center gap-1 text-sm font-medium text-yellow-900 hover:text-yellow-700"
              >
                Manage Translations
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-heading font-bold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/admin/courses"
            className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition group"
          >
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition">
              <Plus className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Add New Course
              </h3>
              <p className="text-sm text-gray-600">
                Create a new training program
              </p>
            </div>
          </Link>

          <Link
            href="/admin/courses"
            className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition group"
          >
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition">
              <BookOpen className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Manage Courses
              </h3>
              <p className="text-sm text-gray-600">
                Edit or delete existing courses
              </p>
            </div>
          </Link>

          <Link
            href="/admin/translations"
            className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition group"
          >
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition">
              <Languages className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Manage Translations
              </h3>
              <p className="text-sm text-gray-600">
                Update Chinese translations
              </p>
            </div>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition group"
          >
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition">
              <ArrowRight className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">View Website</h3>
              <p className="text-sm text-gray-600">See your live site</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Courses */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-heading font-bold text-gray-900 mb-4">
          Recent Courses
        </h2>
        {recentCourses && recentCourses.length > 0 ? (
          <div className="space-y-3">
            {recentCourses.map((course: any) => (
              <Link
                key={course.id}
                href={`/admin/courses`}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-gray-50 transition"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {course.title_en}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {course.category || "Uncategorized"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      course.is_published
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {course.is_published ? "Published" : "Draft"}
                  </span>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-8">
            No courses yet. Create your first course!
          </p>
        )}
      </div>
    </div>
  );
}
