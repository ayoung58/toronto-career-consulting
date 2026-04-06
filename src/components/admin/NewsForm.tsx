"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { News, NewsInput, NewsLink } from "@/types";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Plus, Trash2, Loader } from "lucide-react";

interface NewsFormProps {
  initialData?: News;
  onSuccess?: () => void;
}

export function NewsForm({ initialData, onSuccess }: NewsFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState<NewsLink[]>(initialData?.links || []);
  const [formData, setFormData] = useState<NewsInput>({
    title_en: initialData?.title_en || "",
    title_zh: initialData?.title_zh || "",
    content_en: initialData?.content_en || "",
    content_zh: initialData?.content_zh || "",
    image_url: initialData?.image_url || "",
    links: initialData?.links || [],
    is_published: initialData?.is_published !== false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleAddLink = () => {
    const newLink: NewsLink = { title: "", url: "" };
    const updatedLinks = [...links, newLink];
    setLinks(updatedLinks);
    setFormData({ ...formData, links: updatedLinks });
  };

  const handleUpdateLink = (
    index: number,
    field: keyof NewsLink,
    value: string,
  ) => {
    const updatedLinks = [...links];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setLinks(updatedLinks);
    setFormData({ ...formData, links: updatedLinks });
  };

  const handleRemoveLink = (index: number) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
    setFormData({ ...formData, links: updatedLinks });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title_en ||
      !formData.title_zh ||
      !formData.content_en ||
      !formData.content_zh
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const method = initialData ? "PUT" : "POST";
      const url = initialData ? `/api/news/${initialData.id}` : "/api/news";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          links,
        }),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to save news");
      }

      toast.success(
        initialData
          ? "News updated successfully!"
          : "News created successfully!",
      );
      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/admin/news");
        router.refresh();
      }
    } catch (error: any) {
      console.error("Error saving news:", error);
      toast.error(error.message || "Failed to save news");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title Section */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Titles</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title (English) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title_en"
              value={formData.title_en}
              onChange={handleInputChange}
              placeholder="Enter English title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title (Chinese) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title_zh"
              value={formData.title_zh}
              onChange={handleInputChange}
              placeholder="输入中文标题"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>
        </div>
      </Card>

      {/* Content Section */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Content</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content (English) <span className="text-red-500">*</span>
            </label>
            <textarea
              name="content_en"
              value={formData.content_en}
              onChange={handleInputChange}
              placeholder="Enter English content"
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content (Chinese) <span className="text-red-500">*</span>
            </label>
            <textarea
              name="content_zh"
              value={formData.content_zh}
              onChange={handleInputChange}
              placeholder="输入中文内容"
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              required
            />
          </div>
        </div>
      </Card>

      {/* Media Section */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Media & Links</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL (thumbnail)
            </label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {formData.image_url && (
              <div className="mt-2 relative w-full h-40 rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={formData.image_url}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Links Section */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium text-gray-700">
                External Links
              </label>
              <button
                type="button"
                onClick={handleAddLink}
                className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-primary-100 text-primary-700 rounded hover:bg-primary-200 transition"
              >
                <Plus className="h-4 w-4" />
                Add Link
              </button>
            </div>

            <div className="space-y-3">
              {links.map((link, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={link.title}
                    onChange={(e) =>
                      handleUpdateLink(index, "title", e.target.value)
                    }
                    placeholder="Link title"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  />
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) =>
                      handleUpdateLink(index, "url", e.target.value)
                    }
                    placeholder="https://..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveLink(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Settings Section */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Settings</h3>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="is_published"
            checked={formData.is_published}
            onChange={handleInputChange}
            className="w-4 h-4 rounded border-gray-300"
          />
          <span className="text-sm font-medium text-gray-700">
            Publish immediately
          </span>
        </label>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? (
            <>
              <Loader className="h-4 w-4 animate-spin mr-2" />
              Saving...
            </>
          ) : initialData ? (
            "Update News"
          ) : (
            "Create News"
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
