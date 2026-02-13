"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Search, AlertCircle } from "lucide-react";
import type { Translation } from "@/types";
import { TranslationForm } from "@/components/admin/TranslationForm";

export default function AdminTranslationsPage() {
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showMissingOnly, setShowMissingOnly] = useState(false);
  const [editingTranslation, setEditingTranslation] =
    useState<Translation | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "navigation", label: "Navigation" },
    { value: "common", label: "Common" },
    { value: "form", label: "Forms" },
    { value: "course", label: "Courses" },
  ];

  useEffect(() => {
    fetchTranslations();
  }, [categoryFilter, showMissingOnly]);

  async function fetchTranslations() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (categoryFilter !== "all") {
        params.append("category", categoryFilter);
      }
      if (showMissingOnly) {
        params.append("missingOnly", "true");
      }

      const response = await fetch(`/api/translations?${params}`);
      const data = await response.json();
      setTranslations(data.translations || []);
    } catch (error) {
      console.error("Error fetching translations:", error);
      toast.error("Failed to load translations");
    } finally {
      setLoading(false);
    }
  }

  async function deleteTranslation(id: string, key: string) {
    if (!confirm(`Delete translation "${key}"?`)) return;

    try {
      const { error } = await supabase
        .from("translations")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("Translation deleted");
      fetchTranslations();
    } catch (error: any) {
      console.error("Error deleting translation:", error);
      toast.error("Failed to delete translation");
    }
  }

  const filteredTranslations = translations.filter(
    (t) =>
      t.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.value_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.value_zh?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const missingCount = translations.filter((t) => !t.value_zh).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            Manage Translations
          </h1>
          <p className="text-gray-600">
            Manage bilingual content for the website
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
        >
          <Plus className="h-5 w-5" />
          Add Translation
        </button>
      </div>

      {/* Missing Translations Alert */}
      {missingCount > 0 && !showMissingOnly && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-yellow-900 mb-1">
                Missing Chinese Translations
              </h3>
              <p className="text-sm text-yellow-800 mb-2">
                {missingCount} translation{missingCount !== 1 ? "s" : ""} need
                Chinese values.
              </p>
              <button
                onClick={() => setShowMissingOnly(true)}
                className="text-sm font-medium text-yellow-900 hover:text-yellow-700 underline"
              >
                Show Missing Only
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search translations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>

        {/* Missing Only Toggle */}
        <button
          onClick={() => setShowMissingOnly(!showMissingOnly)}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            showMissingOnly
              ? "bg-yellow-100 text-yellow-900 border-2 border-yellow-300"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          {showMissingOnly ? "Show All" : "Missing Only"}
        </button>
      </div>

      {/* Translations Table */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : filteredTranslations.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <p className="text-gray-600">
            {searchTerm
              ? "No translations found matching your search."
              : showMissingOnly
                ? "No missing translations! Great job!"
                : "No translations yet. Add your first translation!"}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Key
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    English
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Chinese
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTranslations.map((translation) => (
                  <tr key={translation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <code className="text-sm font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
                        {translation.key}
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {translation.value_en}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {translation.value_zh ? (
                        <span className="text-gray-900">
                          {translation.value_zh}
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Missing
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {translation.category || "—"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingTranslation(translation)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() =>
                            deleteTranslation(translation.id, translation.key)
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

      {/* Add/Edit Modal */}
      {(showAddModal || editingTranslation) && (
        <TranslationForm
          translation={editingTranslation}
          onClose={() => {
            setShowAddModal(false);
            setEditingTranslation(null);
          }}
          onSuccess={() => {
            fetchTranslations();
          }}
        />
      )}
    </div>
  );
}
