"use client";

import { useEffect, useState } from "react";

const LAST_VISITED_KEY = "news_last_visited";
const NEWS_DAYS_THRESHOLD = 30;

interface NewsBadgeProps {
  className?: string;
}

/**
 * Badge that shows a red indicator when there is new news since last visit
 */
export function NewsBadge({ className = "" }: NewsBadgeProps) {
  console.log("[NewsBadge] Rendering component");
  const [hasNewNews, setHasNewNews] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkForNewNews = async () => {
    try {
      // Get last visited time from localStorage
      const lastVisited = localStorage.getItem(LAST_VISITED_KEY);
      const lastVisitedDate = lastVisited ? new Date(lastVisited) : new Date(0);

      console.log(
        "[NewsBadge] Last visited:",
        lastVisited,
        "->",
        lastVisitedDate.toISOString(),
      );

      // Fetch recent news
      const res = await fetch("/api/news");
      const result = await res.json();

      if (result.success && Array.isArray(result.data)) {
        console.log("[NewsBadge] Fetched news items:", result.data.length);

        // Check if any news item was posted after last visit
        const hasNew = result.data.some((news: any) => {
          const newsDate = new Date(news.created_at);
          console.log(
            "[NewsBadge] Comparing - News:",
            newsDate.toISOString(),
            "vs Last visited:",
            lastVisitedDate.toISOString(),
            "-> New?",
            newsDate > lastVisitedDate,
          );
          return newsDate > lastVisitedDate;
        });

        console.log("[NewsBadge] Has new news?", hasNew);
        setHasNewNews(hasNew);
      }
    } catch (error) {
      console.error("Error checking for new news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(
      "[NewsBadge] useEffect running - Component mounted, checking for new news",
    );
    checkForNewNews();

    // Listen for custom event when user visits news page
    const handleNewsVisited = () => {
      console.log("[NewsBadge] ✓ news_visited event received!");
      checkForNewNews();
    };

    // Listen for storage changes (when user visits news page in another tab/window)
    const handleStorageChange = (e: StorageEvent) => {
      console.log("[NewsBadge] Storage changed:", e.key);
      if (e.key === LAST_VISITED_KEY) {
        console.log("[NewsBadge] ✓ news_last_visited changed in localStorage!");
        checkForNewNews();
      }
    };

    // Also check when page becomes visible (user returns from another tab)
    const handleVisibilityChange = () => {
      console.log("[NewsBadge] Visibility changed:", document.visibilityState);
      if (document.visibilityState === "visible") {
        checkForNewNews();
      }
    };

    console.log("[NewsBadge] Adding event listeners...");
    window.addEventListener("news_visited", handleNewsVisited);
    window.addEventListener("storage", handleStorageChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    console.log("[NewsBadge] Event listeners attached");

    return () => {
      console.log("[NewsBadge] Cleaning up event listeners");
      window.removeEventListener("news_visited", handleNewsVisited);
      window.removeEventListener("storage", handleStorageChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  if (loading || !hasNewNews) return null;

  return (
    <span
      className={`absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse ${className}`}
      aria-label="New news available"
    />
  );
}
