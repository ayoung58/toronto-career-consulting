"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { News } from "@/types";
import { Button } from "@/components/ui/Button";
import { Trash2, Edit, Calendar } from "lucide-react";

interface NewsPageClientProps {
  initialNews: News[];
}

export function NewsPageClient({ initialNews }: NewsPageClientProps) {
  const router = useRouter();
  const [news, setNews] = useState<News[]>(initialNews);
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this news item?")) return;

    try {
      setDeleting(id);
      const res = await fetch(`/api/news/${id}`, { method: "DELETE" });
      const result = await res.json();

      if (result.success) {
        toast.success("News item deleted");
        setNews(news.filter((n) => n.id !== id));
        router.refresh();
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      console.error("Error deleting news:", error);
      toast.error("Failed to delete news item");
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (news.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center">
        <p className="text-gray-600 text-lg mb-4">No news items yet</p>
        <Link href="/admin/news/create">
          <Button>Create First News Item</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Title (EN)
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Title (ZH)
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Date
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Status
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {news.map((item) => (
            <tr
              key={item.id}
              className="border-b border-gray-200 hover:bg-gray-50 transition"
            >
              <td className="px-6 py-4 text-sm text-gray-900 font-medium max-w-xs truncate">
                {item.title_en}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">
                {item.title_zh}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(item.created_at)}
                </div>
              </td>
              <td className="px-6 py-4 text-sm">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    item.is_published
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {item.is_published ? "Published" : "Draft"}
                </span>
              </td>
              <td className="px-6 py-4 text-sm">
                <div className="flex gap-2">
                  <Link href={`/admin/news/${item.id}/edit`}>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={deleting === item.id}
                    className="inline-flex items-center justify-center px-3 py-1 border border-red-300 text-red-600 rounded hover:bg-red-50 transition disabled:opacity-50"
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
  );
}
