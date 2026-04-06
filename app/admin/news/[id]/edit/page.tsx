"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import { NewsForm } from "@/components/admin/NewsForm";
import { News } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface EditNewsPageProps {
  params: Promise<{ id: string }>;
}

export default function EditNewsPage({ params }: EditNewsPageProps) {
  const unwrappedParams = use(params);
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Fetch from the admin all news endpoint and find the one we need
        const res = await fetch("/api/news-admin");
        const result = await res.json();

        if (result.success) {
          const newsItem = result.data.find(
            (n: News) => n.id === unwrappedParams.id,
          );
          if (newsItem) {
            setNews(newsItem);
          } else {
            toast.error("News item not found");
            router.push("/admin/news");
          }
        } else {
          throw new Error(result.error);
        }
      } catch (error: any) {
        console.error("Error fetching news:", error);
        toast.error("Failed to load news item");
        router.push("/admin/news");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [unwrappedParams.id, router]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">News item not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Edit News</h1>
        <p className="text-gray-600 mt-1">
          Update the news article content and translations
        </p>
      </div>

      <NewsForm initialData={news} />
    </div>
  );
}
