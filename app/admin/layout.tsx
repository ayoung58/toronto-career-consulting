import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  BookOpen,
  Languages,
  LogOut,
  Home,
} from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Verify user is authenticated and is admin
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/admin-login");
  }

  // Get admin info
  const { data: adminRole, error: adminError } = await supabase
    .from("admin_roles")
    .select("*")
    .eq("user_id", session.user.id)
    .single();

  if (!adminRole) {
    redirect("/admin-login");
  }

  const navItems = [
    { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/courses", icon: BookOpen, label: "Courses" },
    { href: "/admin/translations", icon: Languages, label: "Translations" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <h1 className="text-xl font-heading font-bold text-primary-600">
                Admin Panel
              </h1>

              {/* Navigation */}
              <nav className="hidden md:flex items-center gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              {/* User Info */}
              <div className="text-sm text-gray-600">{session.user.email}</div>

              {/* View Website Link */}
              <Link
                href="/"
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition"
              >
                <Home className="h-4 w-4" />
                View Site
              </Link>

              {/* Logout Form */}
              <form action="/api/auth/signout" method="POST">
                <button
                  type="submit"
                  className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 transition"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
