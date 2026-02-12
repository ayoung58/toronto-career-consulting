"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export async function loginAction(email: string, password: string) {
  const supabase = await createClient();

  // Sign in
  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (authError) {
    return { success: false, error: authError.message };
  }

  if (!authData.user) {
    return { success: false, error: "Login failed" };
  }

  // Check if user has admin role
  const { data: adminCheck, error: adminError } = await supabase
    .from("admin_roles")
    .select("role")
    .eq("user_id", authData.user.id)
    .single();

  if (adminError || !adminCheck) {
    await supabase.auth.signOut();
    return {
      success: false,
      error: "Unauthorized: Admin access required",
    };
  }

  // Redirect will happen after this returns
  redirect("/admin/dashboard");
}
