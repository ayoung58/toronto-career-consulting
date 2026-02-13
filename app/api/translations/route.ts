import { createClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

// GET /api/translations
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const missingOnly = searchParams.get("missingOnly") === "true";

    const supabase = await createClient();

    let query = supabase
      .from("translations")
      .select("*")
      .order("created_at", { ascending: false });

    if (category && category !== "all") {
      query = query.eq("category", category);
    }

    if (missingOnly) {
      query = query.is("value_zh", null);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json({ translations: data || [] });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch translations", message: error.message },
      { status: 500 },
    );
  }
}

// POST /api/translations
export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check admin
    const { data: adminCheck } = await supabase
      .from("admin_roles")
      .select("*")
      .eq("user_id", session.user.id)
      .single();

    if (!adminCheck) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();

    if (!body.key || !body.value_en) {
      return NextResponse.json(
        { error: "Missing required fields: key and value_en" },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from("translations")
      .insert([body])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(
      { translation: data, message: "Translation created" },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to create translation", message: error.message },
      { status: 500 },
    );
  }
}

// PATCH /api/translations (for updates)
export async function PATCH(request: Request) {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Missing translation ID" },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from("translations")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      translation: data,
      message: "Translation updated",
    });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to update translation", message: error.message },
      { status: 500 },
    );
  }
}
