/**
 * Language Context Provider
 *
 * Manages the application's language state (English/Chinese)
 * and provides translation functions throughout the app.
 */

"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import type { Language, LanguageContextType } from "@/types";

// In-memory translation store
// This will be populated from the database in production
const translations: Record<string, Record<Language, string>> = {
  "nav.home": { en: "Home", zh: "首页" },
  "nav.courses": { en: "Courses", zh: "课程" },
  "nav.about": { en: "About", zh: "关于" },
  "nav.contact": { en: "Contact", zh: "联系我们" },
  "button.learnMore": { en: "Learn More", zh: "了解更多" },
  "button.submit": { en: "Submit", zh: "提交" },
  "button.cancel": { en: "Cancel", zh: "取消" },
  "footer.rights": { en: "All rights reserved", zh: "版权所有" },
  "salary.entryLevel": { en: "entry-level", zh: "入门级" },
  "salary.withExperience": { en: "with experience", zh: "有经验" },
};

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

// Local storage key
const LANGUAGE_STORAGE_KEY = "tcc-language";

/**
 * Language Provider Component
 * Wrap your app with this to enable language switching
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Initialize language from localStorage or default to 'en'
  const [language, setLanguageState] = useState<Language>("en");
  const [isInitialized, setIsInitialized] = useState(false);

  // Load language from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem(
        LANGUAGE_STORAGE_KEY,
      ) as Language | null;
      if (savedLanguage === "en" || savedLanguage === "zh") {
        setLanguageState(savedLanguage);
      }
      setIsInitialized(true);
    }
  }, []);

  // Update localStorage when language changes
  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    }
  }, []);

  /**
   * Translation function
   * @param key - Translation key (e.g., 'nav.home')
   * @param fallback - Optional fallback text if key not found
   * @returns Translated string
   */
  const t = useCallback(
    (key: string, fallback?: string): string => {
      const translation = translations[key];
      if (translation && translation[language]) {
        return translation[language];
      }
      // Return fallback or the key itself
      return fallback || key;
    },
    [language],
  );

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
  };

  // Don't render children until language is initialized to avoid hydration mismatch
  if (!isInitialized) {
    return null;
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Hook to use the Language Context
 * Must be used within a LanguageProvider
 */
export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
