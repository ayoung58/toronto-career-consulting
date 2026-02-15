import { createClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

// GET /api/courses
// Fetches published courses with optional filtering
export async function GET(request: Request) {
  try {
    // Parse query parameters from URL
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const slug = searchParams.get("slug");

    // Create Supabase client
    const supabase = await createClient();

    // If slug is provided, fetch single course by slug
    if (slug) {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();

      if (error) {
        console.error("Supabase error:", error);
        return NextResponse.json(
          { error: "Course not found" },
          { status: 404 },
        );
      }

      return NextResponse.json([data]); // Return as array for consistency
    }

    // Start building query for multiple courses
    let query = supabase.from("courses").select("*").eq("is_published", true); // Only published courses

    // Apply category filter if provided
    if (category && category !== "all") {
      query = query.eq("category", category);
    }

    // Apply search filter if provided
    // Search in both English and Chinese titles and descriptions
    if (search && search.trim() !== "") {
      const searchTerm = `%${search}%`;
      query = query.or(
        `title_en.ilike.${searchTerm},title_zh.ilike.${searchTerm},description_en.ilike.${searchTerm},description_zh.ilike.${searchTerm}`,
      );
    }

    // Order by created_at descending (newest first)
    query = query.order("created_at", { ascending: false });

    // Execute query
    const { data, error } = await query;

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    // Return success response
    return NextResponse.json({
      courses: data || [],
      count: data?.length || 0,
    });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses", message: error.message },
      { status: 500 },
    );
  }
}

// POST /api/courses
// Creates a new course (admin only)
export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { session },
      error: authError,
    } = await supabase.auth.getSession();

    if (authError || !session) {
      return NextResponse.json(
        { error: "Unauthorized - Please login" },
        { status: 401 },
      );
    }

    // Check if user is admin
    const { data: adminCheck, error: adminError } = await supabase
      .from("admin_roles")
      .select("*")
      .eq("user_id", session.user.id)
      .single();

    if (adminError || !adminCheck) {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 },
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate required fields
    if (!body.title_en || !body.slug) {
      return NextResponse.json(
        { error: "Missing required fields: title_en and slug" },
        { status: 400 },
      );
    }

    // Insert new course
    const { data, error } = await supabase
      .from("courses")
      .insert([
        {
          slug: body.slug,
          title_en: body.title_en,
          title_zh: body.title_zh || null,
          description_en: body.description_en || null,
          description_zh: body.description_zh || null,
          key_learning_en: body.key_learning_en || [],
          key_learning_zh: body.key_learning_zh || null,
          career_pathways_en: body.career_pathways_en || [],
          career_pathways_zh: body.career_pathways_zh || null,
          employment_outlook_en: body.employment_outlook_en || null,
          employment_outlook_zh: body.employment_outlook_zh || null,
          salary_range: body.salary_range || null,
          category: body.category || null,
          is_published:
            body.is_published !== undefined ? body.is_published : true,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Insert error:", error);
      throw error;
    }

    return NextResponse.json(
      { course: data, message: "Course created successfully" },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to create course", message: error.message },
      { status: 500 },
    );
  }
}
