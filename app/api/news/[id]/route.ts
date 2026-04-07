import { createClient } from "@/lib/supabase-server";
import { News } from "@/types";
import { NextRequest, NextResponse } from "next/server";

// PUT: Update a news item (admin only)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
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
      .update({
        title_en: body.title_en,
        title_zh: body.title_zh,
        content_en: body.content_en,
        content_zh: body.content_zh,
        image_url: body.image_url || null,
        links: body.links || [],
        is_published: body.is_published,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return NextResponse.json(
        { success: false, error: "News item not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, data: data[0] as News },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error updating news:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

// DELETE: Delete a news item (admin only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
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

    const { error } = await supabase.from("news").delete().eq("id", id);

    if (error) throw error;

    return NextResponse.json(
      { success: true, message: "News item deleted" },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error deleting news:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
