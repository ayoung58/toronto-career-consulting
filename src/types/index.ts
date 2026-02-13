// ============================================
// DATABASE TYPES
// ============================================

/**
 * Course represents a training program in the database
 * Matches the Supabase 'courses' table schema
 */
export interface Course {
  id: string; // UUID from database
  slug: string; // URL-friendly identifier (e.g., "data-analytics")
  title_en: string; // English title
  title_zh: string | null; // Chinese title (nullable - auto-translated if missing)
  description_en: string; // English description (rich text)
  description_zh: string | null; // Chinese description (nullable)
  key_learning_en: string[]; // Array of key learning points in English
  key_learning_zh: string[] | null; // Array of key learning points in Chinese (nullable)
  career_pathways_en: string[]; // Array of career paths in English
  career_pathways_zh: string[] | null; // Array of career paths in Chinese (nullable)
  employment_outlook_en: string; // Employment outlook text in English
  employment_outlook_zh: string | null; // Employment outlook text in Chinese (nullable)
  salary_range: string; // E.g., "$50,000 - $80,000"
  category: string; // E.g., "Technology", "Healthcare", "Business"
  image_url: string | null; // URL path to course image in Supabase Storage
  is_published: boolean; // Whether to show on public site
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

/**
 * Translation for UI text (navigation, buttons, static content)
 * Matches the Supabase 'translations' table schema
 */
export interface Translation {
  id: string; // UUID from database
  key: string; // Translation key (e.g., "nav.home", "button.submit")
  value_en: string; // English translation
  value_zh: string | null; // Chinese translation (nullable)
  category: string | null; // Optional category for organization (e.g., "navigation", "forms")
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

// ============================================
// LANGUAGE & I18N TYPES
// ============================================

/**
 * Supported languages in the application
 * 'en' = English
 * 'zh' = Chinese (Mandarin, Simplified)
 */
export type Language = "en" | "zh";

/**
 * Shape of the Language Context used throughout the app
 * Provides language state and translation function
 */
export interface LanguageContextType {
  language: Language; // Current active language
  setLanguage: (lang: Language) => void; // Function to change language
  t: (key: string, fallback?: string) => string; // Translation function
}

// ============================================
// FORM & API TYPES
// ============================================

/**
 * Input data for creating or updating a course
 * Used in admin forms and API routes
 */
export interface CourseInput {
  slug: string;
  title_en: string;
  title_zh?: string;
  description_en: string;
  description_zh?: string;
  key_learning_en: string[];
  key_learning_zh?: string[];
  career_pathways_en: string[];
  career_pathways_zh?: string[];
  employment_outlook_en: string;
  employment_outlook_zh?: string;
  salary_range: string;
  category: string;
  is_published: boolean;
}

/**
 * Contact form submission data
 */
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  preferred_language: Language;
}

/**
 * API response wrapper for consistent error handling
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// ============================================
// AUTH TYPES
// ============================================

/**
 * Admin user role in the system
 */
export interface AdminRole {
  user_id: string; // References auth.users(id)
  role: "admin" | "editor"; // Role type
  created_at: string; // ISO timestamp
}

/**
 * User session data from Supabase Auth
 */
export interface UserSession {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at?: number;
  token_type: string;
  user: {
    id: string;
    email?: string;
    role?: string;
  };
}
