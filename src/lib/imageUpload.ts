import { supabase } from "./supabase";

// Helper to generate unique filename
function generateFileName(originalName: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 9);
  const extension = originalName.split(".").pop();
  return `${timestamp}-${randomString}.${extension}`;
}

// Helper to get public URL for an image
export function getImageUrl(path: string): string {
  const { data } = supabase.storage.from("course-images").getPublicUrl(path);

  return data.publicUrl;
}

// Upload image to Supabase Storage
export async function uploadCourseImage(
  file: File,
  courseSlug: string,
): Promise<{ url: string; path: string } | null> {
  try {
    // Validate file size (5MB max)
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > MAX_SIZE) {
      throw new Error("File size must be less than 5MB");
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      throw new Error("File must be a JPEG, PNG, or WebP image");
    }

    // Generate unique filename
    const fileName = generateFileName(file.name);
    const filePath = `${courseSlug}/${fileName}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from("course-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) throw error;

    // Get public URL
    const publicUrl = getImageUrl(data.path);

    return {
      url: publicUrl,
      path: data.path,
    };
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
}

// Delete image from Supabase Storage
export async function deleteCourseImage(path: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from("course-images")
      .remove([path]);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Delete error:", error);
    return false;
  }
}

// Extract storage path from full URL
export function extractStoragePath(url: string): string | null {
  try {
    // URL format: https://xxx.supabase.co/storage/v1/object/public/course-images/slug/filename.jpg
    const match = url.match(/course-images\/(.+)$/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}
