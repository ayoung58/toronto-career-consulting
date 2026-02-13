/**
 * Supabase Client for Browser/Client Components
 *
 * This client is used in client-side React components.
 * Uses the anon key which respects Row Level Security (RLS) policies.
 * Properly handles cookies for authentication in App Router.
 */

import { createBrowserClient } from "@supabase/ssr";

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Check your .env.local file.",
  );
}

// Create and export the Supabase client
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

/**
 * Get the current user session
 * @returns The session object or null if not authenticated
 */
export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("Error getting session:", error.message);
    return null;
  }
  return data.session;
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(`Sign out failed: ${error.message}`);
  }
}

/**
 * Check if the current user is an admin
 * @returns true if user is admin, false otherwise
 */
export async function isAdmin(): Promise<boolean> {
  const session = await getSession();
  if (!session?.user?.id) return false;

  const { data, error } = await supabase
    .from("admin_roles")
    .select("role")
    .eq("user_id", session.user.id)
    .single();

  if (error || !data) return false;
  return data.role === "admin" || data.role === "editor";
}
