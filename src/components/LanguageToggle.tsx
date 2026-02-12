"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
  variant?: "default" | "compact" | "icon-only";
  className?: string;
}

/**
 * Language Toggle Button Component
 * Switches between English and Chinese
 */
export function LanguageToggle({
  variant = "default",
  className = "",
}: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en");
  };

  // Icon-only variant (just the globe icon)
  if (variant === "icon-only") {
    return (
      <button
        onClick={toggleLanguage}
        className={cn(
          "p-2 rounded-full hover:bg-gray-100 transition-colors duration-200",
          "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
          className,
        )}
        aria-label={language === "en" ? "切换到中文" : "Switch to English"}
        title={language === "en" ? "切换到中文" : "Switch to English"}
      >
        <Globe className="h-5 w-5 text-gray-600" />
      </button>
    );
  }

  // Compact variant (small pill with language code)
  if (variant === "compact") {
    return (
      <button
        onClick={toggleLanguage}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-full",
          "border border-gray-200 hover:border-primary-500",
          "bg-white hover:bg-primary-50",
          "text-sm font-medium text-gray-700 hover:text-primary-600",
          "transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
          className,
        )}
        aria-label={language === "en" ? "切换到中文" : "Switch to English"}
      >
        <Globe className="h-4 w-4" />
        <span>{language === "en" ? "中文" : "EN"}</span>
      </button>
    );
  }

  // Default variant (full button with text)
  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg",
        "border border-gray-200 hover:border-primary-500",
        "bg-white hover:bg-primary-50",
        "text-sm font-medium text-gray-700 hover:text-primary-600",
        "transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
        className,
      )}
      aria-label={language === "en" ? "切换到中文" : "Switch to English"}
    >
      <Globe className="h-5 w-5" />
      <span>{language === "en" ? "切换到中文" : "Switch to English"}</span>
    </button>
  );
}
