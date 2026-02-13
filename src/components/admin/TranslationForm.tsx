"use client";

import { useState } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";
import type { Translation } from "@/types";

interface TranslationFormProps {
  translation?: Translation | null;
  onClose: () => void;
  onSuccess: () => void;
}

export function TranslationForm({
  translation,
  onClose,
  onSuccess,
}: TranslationFormProps) {
  const isEditing = !!translation;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    key: translation?.key || "",
    value_en: translation?.value_en || "",
    value_zh: translation?.value_zh || "",
    category: translation?.category || "common",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing) {
        // Update existing translation
        const response = await fetch("/api/translations", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: translation.id,
            ...formData,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to update translation");
        }

        toast.success("Translation updated successfully");
      } else {
        // Create new translation
        const response = await fetch("/api/translations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to create translation");
        }

        toast.success("Translation created successfully");
      }

      onSuccess();
      onClose();
    } catch (error: any) {
      console.error("Error saving translation:", error);
      toast.error(error.message || "Failed to save translation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-heading font-bold text-gray-900">
            {isEditing ? "Edit Translation" : "Add New Translation"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Key */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Key *
            </label>
            <input
              type="text"
              value={formData.key}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, key: e.target.value }))
              }
              required
              disabled={isEditing}
              placeholder="nav.home"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed font-mono text-sm"
            />
            {!isEditing && (
              <p className="mt-1 text-xs text-gray-500">
                Use dot notation (e.g., nav.home, form.submit)
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, category: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="navigation">Navigation</option>
              <option value="common">Common</option>
              <option value="form">Forms</option>
              <option value="course">Courses</option>
            </select>
          </div>

          {/* English Value */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              English Value *
            </label>
            <input
              type="text"
              value={formData.value_en}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, value_en: e.target.value }))
              }
              required
              placeholder="Home"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Chinese Value */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Chinese Value
            </label>
            <input
              type="text"
              value={formData.value_zh}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, value_zh: e.target.value }))
              }
              placeholder="首页"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <p className="mt-1 text-xs text-gray-500">
              Optional - can be added later
            </p>
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
            disabled={loading}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : isEditing
                ? "Update Translation"
                : "Create Translation"}
          </button>
        </div>
      </div>
    </div>
  );
}
