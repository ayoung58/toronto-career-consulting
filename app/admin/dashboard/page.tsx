"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { LogOut, BookOpen } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    async function getUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        setUserEmail(session.user.email || "");
      }
    }
    getUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Signed out successfully");
      router.push("/admin/login");
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-600">{userEmail}</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome to the Admin Dashboard
          </h2>
          <p className="text-gray-600 mb-6">
            This is a placeholder dashboard page. Full admin functionality will
            be implemented in future development phases.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-primary-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Manage Courses
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Create, edit, and manage course listings
              </p>
              <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                Coming soon →
              </button>
            </div>

            <div className="bg-indigo-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                View Messages
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                See contact form submissions
              </p>
              <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                Coming soon →
              </button>
            </div>

            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Manage Content
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Update translations and site content
              </p>
              <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                Coming soon →
              </button>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              ← Back to Website
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
