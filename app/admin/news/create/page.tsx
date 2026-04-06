"use client";

import { NewsForm } from "@/components/admin/NewsForm";

export default function CreateNewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Create News</h1>
        <p className="text-gray-600 mt-1">
          Add a new news article with English and Chinese translations
        </p>
      </div>

      <NewsForm />
    </div>
  );
}
