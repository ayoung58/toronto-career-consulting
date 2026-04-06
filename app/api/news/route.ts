import { createClient } from "@/lib/supabase-server";
import { News } from "@/types";
import { NextRequest, NextResponse } from "next/server";

const NEWS_DAYS_THRESHOLD = 30;

// GET: Fetch all published news (within 30 days)
export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();

    // Calculate date 30 days ago
    const thirtyDaysAgo = new Date(
      Date.now() - NEWS_DAYS_THRESHOLD * 24 * 60 * 60 * 1000,
    );

    const { data, error } = await supabase
      .from("news")
      .select("*")
      .eq("is_published", true)
      .gte("created_at", thirtyDaysAgo.toISOString())
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

// POST: Create new news (admin only)
export async function POST(req: NextRequest) {
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

    const body = await req.json();

    const { data, error } = await supabase
      .from("news")
      .insert([
        {
          title_en: body.title_en,
          title_zh: body.title_zh,
          content_en: body.content_en,
          content_zh: body.content_zh,
          image_url: body.image_url || null,
          links: body.links || [],
          is_published: body.is_published !== false,
        },
      ])
      .select();

    if (error) throw error;

    return NextResponse.json(
      { success: true, data: data[0] as News },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Error creating news:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
