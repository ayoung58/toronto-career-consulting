import { createClient } from "@/lib/supabase-server";
import { News } from "@/types";
import { NextRequest, NextResponse } from "next/server";

// GET: Fetch all news (admin only)
export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();

    // Check if user is admin
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { data: adminCheck } = await supabase
      .from("admin_roles")
      .select("role")
      .eq("user_id", user.id)
      .single();

    if (!adminCheck) {
      return NextResponse.json(
        { success: false, error: "Admin access required" },
        { status: 403 },
      );
    }

    // Fetch all news for admin (including drafts and old items)
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json(
      { success: true, data: data as News[] },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
