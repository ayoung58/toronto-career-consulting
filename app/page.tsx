"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-blue-50 to-white">
      <main className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-gray-900">
            Toronto Career Consulting
          </h1>
          <p className="text-2xl text-gray-600">多伦多职业咨询</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Current Language:</p>
              <p className="text-2xl font-semibold text-gray-900">
                {language === "en" ? "🇨🇦 English" : "🇨🇳 中文"}
              </p>
            </div>

            <button
              onClick={() => setLanguage(language === "en" ? "zh" : "en")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Switch to {language === "en" ? "中文" : "English"}
            </button>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Translation Test:
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-sm text-gray-500 mb-1">nav.home</p>
                <p className="text-lg font-medium">{t("nav.home")}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-sm text-gray-500 mb-1">nav.courses</p>
                <p className="text-lg font-medium">{t("nav.courses")}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-sm text-gray-500 mb-1">nav.contact</p>
                <p className="text-lg font-medium">{t("nav.contact")}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-sm text-gray-500 mb-1">button.submit</p>
                <p className="text-lg font-medium">{t("button.submit")}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <p className="text-gray-600">
            ✅ Language Context is working! The language persists in
            localStorage.
          </p>
          <a
            href="/test-supabase"
            className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Test Supabase Connection →
          </a>
        </div>
      </main>
    </div>
  );
}
