"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { News } from "@/types";
import { Calendar, Link as LinkIcon, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

const NEWS_DAYS_THRESHOLD = 30;
const LAST_VISITED_KEY = "news_last_visited";

export default function NewsPage() {
  const { language } = useLanguage();
  const [allNews, setAllNews] = useState<News[]>([]);
  const [filteredNews, setFilteredNews] = useState<News[]>([]);
  const [showOlderNews, setShowOlderNews] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isEnglish = language === "en";
  const getTitle = (news: News) => (isEnglish ? news.title_en : news.title_zh);
  const getContent = (news: News) =>
    isEnglish ? news.content_en : news.content_zh;

  // Fetch news on mount
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/news");
        const result = await res.json();

        if (!result.success) throw new Error(result.error);

        // Sort by date descending (newest first)
        const sorted = (result.data as News[]).sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );

        setAllNews(sorted);
        updateFilteredNews(sorted);

        // Update last visited time to the latest news item's date
        // This way, after visiting, all current news is marked as "old"
        // and only NEW news (posted after this visit) will show the badge
        let visitTimestamp: string;
        if (sorted.length > 0) {
          // Set to the latest news item's timestamp
          // This marks all current news as "read"
          visitTimestamp = sorted[0].created_at;
        } else {
          // No news yet, just use current time
          visitTimestamp = new Date().toISOString();
        }

        console.log(
          "[NewsPage] Setting last visited to:",
          visitTimestamp,
          "(based on latest news)",
        );
        localStorage.setItem(LAST_VISITED_KEY, visitTimestamp);

        // Dispatch custom event to notify other components
        console.log("[NewsPage] Dispatching news_visited event");
        window.dispatchEvent(new Event("news_visited"));
      } catch (err: any) {
        setError(err.message || "Failed to load news");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Update filtered news based on showOlderNews toggle
  const updateFilteredNews = (news: News[]) => {
    if (showOlderNews) {
      setFilteredNews(news);
    } else {
      const thirtyDaysAgo = new Date(
        Date.now() - NEWS_DAYS_THRESHOLD * 24 * 60 * 60 * 1000,
      );
      setFilteredNews(
        news.filter((item) => new Date(item.created_at) >= thirtyDaysAgo),
      );
    }
  };

  // Handle toggle older news
  const handleToggleOlderNews = () => {
    const newState = !showOlderNews;
    setShowOlderNews(newState);
    updateFilteredNews(allNews);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      isEnglish ? "en-US" : "zh-CN",
      { year: "numeric", month: "long", day: "numeric" },
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-indigo-100 px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-indigo-100 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            {isEnglish ? "News & Updates" : "新闻和更新"}
          </h1>
          <p className="text-gray-600 text-lg">
            {isEnglish
              ? "Stay informed about our latest courses and career consulting updates"
              : "了解我们最新的课程和职业咨询更新"}
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
            {error}
          </div>
        )}

        {/* News Items */}
        {filteredNews.length > 0 ? (
          <div className="space-y-6 mb-8">
            {filteredNews.map((news) => (
              <div
                key={news.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="grid md:grid-cols-3 gap-0">
                  {/* Image */}
                  {news.image_url && (
                    <div className="md:col-span-1 bg-gradient-to-br from-primary-100 to-indigo-100 aspect-video md:aspect-auto overflow-hidden">
                      <img
                        src={news.image_url}
                        alt={getTitle(news)}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div
                    className={`p-6 ${news.image_url ? "md:col-span-2" : "md:col-span-3"}`}
                  >
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Calendar className="h-4 w-4" />
                      {formatDate(news.created_at)}
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      {getTitle(news)}
                    </h2>

                    <p className="text-gray-700 leading-relaxed mb-4 line-clamp-3">
                      {getContent(news)}
                    </p>

                    {/* Links */}
                    {news.links && news.links.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {news.links.map((link, idx) => (
                          <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded hover:bg-primary-200 transition text-sm"
                          >
                            <LinkIcon className="h-3 w-3" />
                            {link.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">
              {isEnglish
                ? "No news available at the moment. Check back soon!"
                : "目前没有新闻。请稍后再来！"}
            </p>
          </div>
        )}

        {/* Show Older Posts Button */}
        {allNews.length > filteredNews.length && (
          <div className="text-center">
            <button
              onClick={handleToggleOlderNews}
              className="px-6 py-3 bg-white border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition"
            >
              {showOlderNews
                ? isEnglish
                  ? "Hide Older Posts"
                  : "隐藏较旧的帖子"
                : isEnglish
                  ? "Show Older Posts"
                  : "显示较旧的帖子"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
