import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const translations = [
  // Navigation
  {
    key: "nav.home",
    value_en: "Home",
    value_zh: "首页",
    category: "navigation",
  },
  {
    key: "nav.about",
    value_en: "About",
    value_zh: "关于",
    category: "navigation",
  },
  {
    key: "nav.courses",
    value_en: "Courses",
    value_zh: "课程",
    category: "navigation",
  },
  {
    key: "nav.contact",
    value_en: "Contact",
    value_zh: "联系",
    category: "navigation",
  },
  {
    key: "nav.adminLogin",
    value_en: "Admin Login",
    value_zh: "管理员登录",
    category: "navigation",
  },

  // Common
  {
    key: "common.loading",
    value_en: "Loading...",
    value_zh: "加载中...",
    category: "common",
  },
  {
    key: "common.save",
    value_en: "Save",
    value_zh: "保存",
    category: "common",
  },
  {
    key: "common.cancel",
    value_en: "Cancel",
    value_zh: "取消",
    category: "common",
  },
  {
    key: "common.delete",
    value_en: "Delete",
    value_zh: "删除",
    category: "common",
  },
  {
    key: "common.edit",
    value_en: "Edit",
    value_zh: "编辑",
    category: "common",
  },
  {
    key: "common.search",
    value_en: "Search",
    value_zh: "搜索",
    category: "common",
  },
  {
    key: "common.filter",
    value_en: "Filter",
    value_zh: "筛选",
    category: "common",
  },
  {
    key: "common.all",
    value_en: "All",
    value_zh: "全部",
    category: "common",
  },
  {
    key: "common.yes",
    value_en: "Yes",
    value_zh: "是",
    category: "common",
  },
  {
    key: "common.no",
    value_en: "No",
    value_zh: "否",
    category: "common",
  },
  {
    key: "common.back",
    value_en: "Back",
    value_zh: "返回",
    category: "common",
  },
  {
    key: "common.next",
    value_en: "Next",
    value_zh: "下一步",
    category: "common",
  },
  {
    key: "common.submit",
    value_en: "Submit",
    value_zh: "提交",
    category: "common",
  },
  {
    key: "common.close",
    value_en: "Close",
    value_zh: "关闭",
    category: "common",
  },

  // Forms
  {
    key: "form.name",
    value_en: "Name",
    value_zh: "姓名",
    category: "form",
  },
  {
    key: "form.email",
    value_en: "Email",
    value_zh: "电子邮件",
    category: "form",
  },
  {
    key: "form.phone",
    value_en: "Phone",
    value_zh: "电话",
    category: "form",
  },
  {
    key: "form.message",
    value_en: "Message",
    value_zh: "留言",
    category: "form",
  },
  {
    key: "form.required",
    value_en: "Required field",
    value_zh: "必填项",
    category: "form",
  },
  {
    key: "form.invalidEmail",
    value_en: "Invalid email address",
    value_zh: "无效的电子邮件地址",
    category: "form",
  },
  {
    key: "form.success",
    value_en: "Form submitted successfully",
    value_zh: "表单提交成功",
    category: "form",
  },
  {
    key: "form.error",
    value_en: "An error occurred",
    value_zh: "发生错误",
    category: "form",
  },

  // Courses
  {
    key: "course.duration",
    value_en: "Duration",
    value_zh: "学期",
    category: "course",
  },
  {
    key: "course.format",
    value_en: "Format",
    value_zh: "授课方式",
    category: "course",
  },
  {
    key: "course.category",
    value_en: "Category",
    value_zh: "类别",
    category: "course",
  },
  {
    key: "course.learningAreas",
    value_en: "Key Learning Areas",
    value_zh: "主要学习领域",
    category: "course",
  },
  {
    key: "course.careerPathways",
    value_en: "Career Pathways",
    value_zh: "职业发展路径",
    category: "course",
  },
  {
    key: "course.viewDetails",
    value_en: "View Details",
    value_zh: "查看详情",
    category: "course",
  },
  {
    key: "course.learnMore",
    value_en: "Learn More",
    value_zh: "了解更多",
    category: "course",
  },
  {
    key: "course.noCourses",
    value_en: "No courses found",
    value_zh: "未找到课程",
    category: "course",
  },
  {
    key: "course.allCourses",
    value_en: "All Courses",
    value_zh: "全部课程",
    category: "course",
  },

  // Course Categories
  {
    key: "category.business",
    value_en: "Business",
    value_zh: "商业",
    category: "course",
  },
  {
    key: "category.healthcare",
    value_en: "Healthcare",
    value_zh: "医疗保健",
    category: "course",
  },
  {
    key: "category.technology",
    value_en: "Technology",
    value_zh: "技术",
    category: "course",
  },
  {
    key: "category.trades",
    value_en: "Trades & Services",
    value_zh: "贸易与服务",
    category: "course",
  },

  // Admin
  {
    key: "admin.dashboard",
    value_en: "Dashboard",
    value_zh: "仪表板",
    category: "navigation",
  },
  {
    key: "admin.courses",
    value_en: "Courses",
    value_zh: "课程管理",
    category: "navigation",
  },
  {
    key: "admin.translations",
    value_en: "Translations",
    value_zh: "翻译管理",
    category: "navigation",
  },
  {
    key: "admin.logout",
    value_en: "Logout",
    value_zh: "登出",
    category: "navigation",
  },
];

async function seedTranslations() {
  console.log("Starting translation seed...");

  try {
    // Delete existing translations
    const { error: deleteError } = await supabase
      .from("translations")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000"); // Delete all

    if (deleteError) {
      console.error("Error deleting existing translations:", deleteError);
      throw deleteError;
    }

    console.log("Deleted existing translations");

    // Insert new translations
    const { data, error } = await supabase
      .from("translations")
      .insert(translations)
      .select();

    if (error) {
      console.error("Error inserting translations:", error);
      throw error;
    }

    console.log(`✅ Successfully seeded ${data?.length} translations`);

    // Show breakdown by category
    const categoryCounts = translations.reduce(
      (acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    console.log("\nBreakdown by category:");
    Object.entries(categoryCounts).forEach(([category, count]) => {
      console.log(`  - ${category}: ${count}`);
    });
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

seedTranslations();
