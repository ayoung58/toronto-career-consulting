import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { News } from "@/types";
import { NewsPageClient } from "./NewsPageClient";

export default async function AdminNewsPage() {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/admin-login");
  }

  // Check if user has admin role
  const { data: adminRole } = await supabase
    .from("admin_roles")
    .select("role")
    .eq("user_id", session.user.id)
    .single();

  if (!adminRole) {
    redirect("/admin-login");
  }

  // Fetch all news for admin (including drafts and old items)
  const { data: allNews = [], error } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching news:", error);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">News Management</h1>
          <p className="text-gray-600 mt-1">Create and manage news articles</p>
        </div>
        <Link href="/admin/news/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create News
          </Button>
        </Link>
      </div>

      {/* News List Client Component */}
      <NewsPageClient initialNews={allNews as News[]} />
    </div>
  );
}
