"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { X, Plus, Upload, Image as ImageIcon } from "lucide-react";
import {
  uploadCourseImage,
  deleteCourseImage,
  extractStoragePath,
} from "@/lib/imageUpload";
import type { Course } from "@/types";

interface CourseFormProps {
  course?: Course | null;
  onClose: () => void;
  onSuccess: () => void;
}

export function CourseForm({ course, onClose, onSuccess }: CourseFormProps) {
  const isEditing = !!course;

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    course?.image_url || null,
  );
  const [uploadingImage, setUploadingImage] = useState(false);
  const [deletingImage, setDeletingImage] = useState(false);
  const [formData, setFormData] = useState({
    slug: course?.slug || "",
    title_en: course?.title_en || "",
    title_zh: course?.title_zh || "",
    description_en: course?.description_en || "",
    description_zh: course?.description_zh || "",
    key_learning_en: course?.key_learning_en || [""],
    key_learning_zh: course?.key_learning_zh || [""],
    career_pathways_en: course?.career_pathways_en || [""],
    career_pathways_zh: course?.career_pathways_zh || [""],
    employment_outlook_en: course?.employment_outlook_en || "",
    employment_outlook_zh: course?.employment_outlook_zh || "",
    salary_range: course?.salary_range || "",
    category: course?.category || "business",
    is_published: course?.is_published ?? true,
  });

  // Array helpers
  const addArrayItem = (
    field:
      | "key_learning_en"
      | "key_learning_zh"
      | "career_pathways_en"
      | "career_pathways_zh",
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const updateArrayItem = (
    field:
      | "key_learning_en"
      | "key_learning_zh"
      | "career_pathways_en"
      | "career_pathways_zh",
    index: number,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const removeArrayItem = (
    field:
      | "key_learning_en"
      | "key_learning_zh"
      | "career_pathways_en"
      | "career_pathways_zh",
    index: number,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  // Image handling functions
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_SIZE) {
      toast.error("Image must be less than 5MB");
      return;
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast.error("Image must be JPEG, PNG, or WebP");
      return;
    }

    setImageFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = async () => {
    if (imagePreview && course?.image_url) {
      // If editing and has existing image, delete from storage
      setDeletingImage(true);
      const storagePath = extractStoragePath(course.image_url);
      if (storagePath) {
        await deleteCourseImage(storagePath);
      }
      setDeletingImage(false);
    }

    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload image first if there's a new one
      let imageUrl = course?.image_url || null;

      if (imageFile) {
        setUploadingImage(true);
        const result = await uploadCourseImage(imageFile, formData.slug);
        if (result) {
          imageUrl = result.url;

          // If editing and had old image, delete it
          if (course?.image_url) {
            const oldPath = extractStoragePath(course.image_url);
            if (oldPath) {
              await deleteCourseImage(oldPath);
            }
          }
        }
        setUploadingImage(false);
      }

      // Filter out empty strings from arrays
      const cleanData = {
        ...formData,
        image_url: imageUrl,
        key_learning_en: formData.key_learning_en.filter((item) => item.trim()),
        key_learning_zh:
          formData.key_learning_zh.filter((item) => item.trim()) || null,
        career_pathways_en: formData.career_pathways_en.filter((item) =>
          item.trim(),
        ),
        career_pathways_zh:
          formData.career_pathways_zh.filter((item) => item.trim()) || null,
      };

      if (isEditing) {
        const { error } = await supabase
          .from("courses")
          .update(cleanData)
          .eq("id", course.id);

        if (error) throw error;
        toast.success("Course updated successfully");
      } else {
        const { error } = await supabase.from("courses").insert([cleanData]);

        if (error) throw error;
        toast.success("Course created successfully");
      }

      onSuccess();
      onClose();
    } catch (error: any) {
      console.error("Error saving course:", error);
      toast.error(error.message || "Failed to save course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-heading font-bold text-gray-900">
            {isEditing ? "Edit Course" : "Add New Course"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Basic Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug (URL-friendly) *
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, slug: e.target.value }))
                  }
                  required
                  placeholder="digital-marketing"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="business">Business</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="technology">Technology</option>
                  <option value="trades">Trades & Services</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title (English) *
                </label>
                <input
                  type="text"
                  value={formData.title_en}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      title_en: e.target.value,
                    }))
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title (Chinese)
                </label>
                <input
                  type="text"
                  value={formData.title_zh}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      title_zh: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (English)
                </label>
                <textarea
                  value={formData.description_en}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description_en: e.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (Chinese)
                </label>
                <textarea
                  value={formData.description_zh}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description_zh: e.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salary Range
              </label>
              <input
                type="text"
                value={formData.salary_range}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    salary_range: e.target.value,
                  }))
                }
                placeholder="$45,000–$65,000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Course Image */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Course Image</h3>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              {imagePreview ? (
                // Preview existing or selected image
                <div className="space-y-4">
                  <div className="relative aspect-video w-full max-w-md mx-auto rounded-lg overflow-hidden">
                    <img
                      src={imagePreview}
                      alt="Course preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex justify-center gap-2">
                    <label className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition cursor-pointer">
                      Replace Image
                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleImageSelect}
                        className="hidden"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      disabled={deletingImage}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition disabled:opacity-50"
                    >
                      {deletingImage ? "Removing..." : "Remove Image"}
                    </button>
                  </div>
                </div>
              ) : (
                // Upload new image
                <label className="flex flex-col items-center justify-center cursor-pointer">
                  <Upload className="h-12 w-12 text-gray-400 mb-3" />
                  <span className="text-sm font-medium text-gray-700 mb-1">
                    Click to upload course image
                  </span>
                  <span className="text-xs text-gray-500">
                    PNG, JPG, WebP up to 5MB (16:9 aspect ratio recommended)
                  </span>
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <p className="text-xs text-gray-500">
              💡 <strong>Tip:</strong> Use AI image generation tools like DALL-E
              or Midjourney to create professional course images.
            </p>
          </div>

          {/* Key Learning Areas */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">
                Key Learning Areas
              </h3>
              <button
                type="button"
                onClick={() => addArrayItem("key_learning_en")}
                className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
              >
                <Plus className="h-4 w-4" />
                Add Item
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  English
                </label>
                <div className="space-y-2">
                  {formData.key_learning_en.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) =>
                          updateArrayItem(
                            "key_learning_en",
                            index,
                            e.target.value,
                          )
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      {formData.key_learning_en.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeArrayItem("key_learning_en", index)
                          }
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chinese
                </label>
                <div className="space-y-2">
                  {formData.key_learning_zh.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) =>
                          updateArrayItem(
                            "key_learning_zh",
                            index,
                            e.target.value,
                          )
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      {formData.key_learning_zh.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeArrayItem("key_learning_zh", index)
                          }
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem("key_learning_zh")}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    + Add Chinese item
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Career Pathways */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Career Pathways</h3>
              <button
                type="button"
                onClick={() => addArrayItem("career_pathways_en")}
                className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
              >
                <Plus className="h-4 w-4" />
                Add Item
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  English
                </label>
                <div className="space-y-2">
                  {formData.career_pathways_en.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) =>
                          updateArrayItem(
                            "career_pathways_en",
                            index,
                            e.target.value,
                          )
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      {formData.career_pathways_en.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeArrayItem("career_pathways_en", index)
                          }
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chinese
                </label>
                <div className="space-y-2">
                  {formData.career_pathways_zh.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) =>
                          updateArrayItem(
                            "career_pathways_zh",
                            index,
                            e.target.value,
                          )
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      {formData.career_pathways_zh.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeArrayItem("career_pathways_zh", index)
                          }
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem("career_pathways_zh")}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    + Add Chinese item
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Employment Outlook */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Employment Outlook (English)
              </label>
              <textarea
                value={formData.employment_outlook_en}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    employment_outlook_en: e.target.value,
                  }))
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Employment Outlook (Chinese)
              </label>
              <textarea
                value={formData.employment_outlook_zh}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    employment_outlook_zh: e.target.value,
                  }))
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Publish Status */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_published"
              checked={formData.is_published}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  is_published: e.target.checked,
                }))
              }
              className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
            />
            <label
              htmlFor="is_published"
              className="text-sm font-medium text-gray-700"
            >
              Publish this course immediately
            </label>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || uploadingImage}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
          >
            {uploadingImage
              ? "Uploading Image..."
              : loading
                ? "Saving..."
                : isEditing
                  ? "Update Course"
                  : "Create Course"}
          </button>
        </div>
      </div>
    </div>
  );
}
