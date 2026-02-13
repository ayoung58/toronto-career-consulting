"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Eye, EyeOff, Search } from "lucide-react";
import type { Course } from "@/types";
import { CourseForm } from "@/components/admin/CourseForm";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    setLoading(true);
    try {
      // Fetch ALL courses (including unpublished) for admin
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .order("title_en", { ascending: true });

      if (error) throw error;
      setCourses(data || []);
    } catch (error: any) {
      console.error("Error fetching courses:", error);
      toast.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  }

  async function togglePublished(id: string, currentStatus: boolean) {
    try {
      const { error } = await supabase
        .from("courses")
        .update({ is_published: !currentStatus })
        .eq("id", id);

      if (error) throw error;

      toast.success(`Course ${!currentStatus ? "published" : "unpublished"}`);
      fetchCourses();
    } catch (error: any) {
      console.error("Error toggling published:", error);
      toast.error("Failed to update course");
    }
  }

  async function deleteCourse(id: string, title: string) {
    if (
      !confirm(
        `Are you sure you want to delete "${title}"? This cannot be undone.`,
      )
    ) {
      return;
    }

    try {
      const { error } = await supabase.from("courses").delete().eq("id", id);

      if (error) throw error;

      toast.success("Course deleted successfully");
      fetchCourses();
    } catch (error: any) {
      console.error("Error deleting course:", error);
      toast.error("Failed to delete course");
    }
  }

  // Filter courses by search term
  const filteredCourses = courses.filter(
    (course) =>
      course.title_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.title_zh?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            Manage Courses
          </h1>
          <p className="text-gray-600">
            Create, edit, and manage your training programs
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
        >
          <Plus className="h-5 w-5" />
          Add Course
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* Courses Table */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <p className="text-gray-600">
            {searchTerm
              ? "No courses found matching your search."
              : "No courses yet. Create your first course!"}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Salary Range
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">
                          {course.title_en}
                        </div>
                        {course.title_zh && (
                          <div className="text-sm text-gray-600">
                            {course.title_zh}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {course.category || "Uncategorized"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {course.salary_range || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          course.is_published
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {course.is_published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() =>
                            togglePublished(course.id, course.is_published)
                          }
                          className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition"
                          title={course.is_published ? "Unpublish" : "Publish"}
                        >
                          {course.is_published ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          onClick={() => setEditingCourse(course)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() =>
                            deleteCourse(course.id, course.title_en)
                          }
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Course Modal */}
      {(showAddModal || editingCourse) && (
        <CourseForm
          course={editingCourse}
          onClose={() => {
            setShowAddModal(false);
            setEditingCourse(null);
          }}
          onSuccess={() => {
            fetchCourses();
          }}
        />
      )}
    </div>
  );
}
