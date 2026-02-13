# Day 8: Manual Setup Steps Required

## 🔴 IMPORTANT: Complete These Steps in Supabase Before Testing

### Step 1: Create Storage Bucket

1. Go to your Supabase Dashboard: https://supabase.com
2. Navigate to **Storage** in the left sidebar
3. Click **"New bucket"**
4. Configure the bucket:
   - **Name**: `course-images`
   - **Public bucket**: ✅ **YES** (check this box)
   - **File size limit**: 5MB
   - **Allowed MIME types**: Leave default
5. Click **"Create bucket"**

---

### Step 2: Add Storage Policies

You have two options: **Use the SQL Editor (Recommended)** or create policies through the UI.

#### Option A: SQL Editor (Recommended - Faster & More Reliable)

1. Go to **SQL Editor** in Supabase
2. Click **"New Query"**
3. Paste this complete SQL (creates all 3 policies at once):

```sql
-- Policy 1: Allow anyone to read/view images
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'course-images');

-- Policy 2: Allow authenticated admins to upload
CREATE POLICY "Admin upload access"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'course-images'
  AND auth.role() = 'authenticated'
);

-- Policy 3: Allow authenticated admins to delete
CREATE POLICY "Admin delete access"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'course-images'
  AND auth.role() = 'authenticated'
);
```

4. Click **"Run"** (or press Ctrl+Enter / Cmd+Enter)
5. You should see: "Success. No rows returned"

#### Option B: Create Through UI (Alternative)

If you prefer the UI, use these simplified policies:

**Policy 1: Public Read**

- Go to Storage → course-images → Policies → New Policy
- Template: Custom
- Policy Name: `Public read access`
- Allowed operation: SELECT
- Policy definition (USING clause):
  ```sql
  bucket_id = 'course-images'
  ```

**Policy 2: Admin Upload**

- New Policy → Custom
- Policy Name: `Admin upload access`
- Allowed operation: INSERT
- WITH CHECK clause:
  ```sql
  bucket_id = 'course-images' AND auth.uid() IN (SELECT user_id FROM public.admin_roles)
  ```
  ⚠️ **Note**: Don't include "WITH CHECK" in the text box - just the condition!

**Policy 3: Admin Delete**

- New Policy → Custom
- Policy Name: `Admin delete access`
- Allowed operation: DELETE
- USING clause:
  ```sql
  bucket_id = 'course-images' AND auth.uid() IN (SELECT user_id FROM public.admin_roles)
  ```

1. Go to **SQL Editor** in Supabase
2. Click **"New Query"**
3. Copy and paste the SQL from: `sql/add_image_url_column.sql`

   OR paste this directly:

```sql
-- Add image_url column to courses table
ALTER TABLE courses
ADD COLUMN image_url TEXT;

-- Add comment for documentation
COMMENT ON COLUMN courses.image_url IS 'URL path to course image in Supabase Storage';

-- Verification query (should return null for all courses currently)
SELECT id, title_en, image_url FROM courses LIMIT 5;
```

4. Click **"Run"** (or press Ctrl+Enter / Cmd+Enter)
5. You should see: "Success. No rows returned" or see course rows with null image_url

---

### ✅ Verification Checklist

After completing all steps, verify:

- ☐ `course-images` bucket exists in Storage
- ☐ Bucket is **Public** (not private)
- ☐ 3 policies are created and **enabled**
- ☐ `courses` table has `image_url` column (run: `SELECT image_url FROM courses LIMIT 1;`)

---

### Next Steps

Once you've completed these manual steps:

1. **Restart the dev server** (if it's running):

   ```bash
   # Press Ctrl+C to stop
   npm run dev
   ```

2. **Test the image upload**:
   - Go to http://localhost:3000/admin/courses
   - Click "Add Course" or edit an existing course
   - Try uploading an image (JPG, PNG, or WebP under 5MB)
   - Verify the preview appears
   - Save the course
   - Check that the image appears on the course card

3. **Test different scenarios**:
   - Upload image to new course
   - Upload image to existing course
   - Replace existing image
   - Remove image
   - Try uploading file >5MB (should error)
   - Try uploading non-image file (should error)

---

## 📸 Want to Generate Course Images?

Check out the AI image generation guide at:
`docs/AI_IMAGE_GENERATION_GUIDE.md`

It contains prompts and tips for creating professional course images using tools like DALL-E or Midjourney!

---

## ❓ Troubleshooting

**Images not loading?**

- Check that the bucket is **Public**
- Verify all 3 policies are enabled
- Check browser console for errors

**Upload fails?**

- Make sure you're logged in as admin
- Check file size (<5MB)
- Check file type (JPG, PNG, WebP only)
- Check browser console for error messages

**Images show broken link?**

- Verify `next.config.ts` has the Supabase domain configured
- Restart the dev server after changing next.config.ts
- Check that the image URL is correct in the database

---

## 🎉 When Complete

Once everything works, you can commit your Day 8 work:

```bash
git add .
git commit -m "Day 8: Implement course image system with Supabase Storage"
git push origin main
```
