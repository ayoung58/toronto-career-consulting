import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

// Course data - comprehensive sample
const courses = [
  // Business & Administration
  {
    slug: "digital-marketing",
    title_en: "Digital Marketing",
    title_zh: "数字营销",
    description_en:
      "Provides practical skills in online marketing, analytics, and digital strategy.",
    description_zh: "本课程教授线上营销、数据分析及数字战略的实用技能。",
    key_learning_en: [
      "Social media marketing",
      "SEO and SEM",
      "Content creation",
      "Marketing analytics",
    ],
    key_learning_zh: [
      "社交媒体营销",
      "搜索引擎优化与营销",
      "内容创作",
      "营销数据分析",
    ],
    career_pathways_en: [
      "Digital Marketing Specialist",
      "Marketing Coordinator",
      "Social Media Manager",
    ],
    career_pathways_zh: ["数字营销专员", "市场协调员", "社交媒体经理"],
    employment_outlook_en:
      "High demand across businesses adapting to digital channels.",
    employment_outlook_zh: "企业数字化转型推动该领域需求持续上升。",
    salary_range: "$45,000-$65,000",
    category: "business",
    is_published: true,
  },
  {
    slug: "accounting-clerk",
    title_en: "Accounting Clerk",
    title_zh: "会计文员",
    description_en:
      "Prepares students for entry-level accounting and bookkeeping roles.",
    description_zh: "本课程帮助学员进入会计及记账相关的入门岗位。",
    key_learning_en: [
      "Accounts payable/receivable",
      "Payroll basics",
      "Accounting software",
      "Financial records",
    ],
    key_learning_zh: ["应收应付账款", "薪资基础", "会计软件", "财务记录"],
    career_pathways_en: ["Accounting Clerk", "Bookkeeper", "Payroll Assistant"],
    career_pathways_zh: ["会计文员", "记账员", "薪资助理"],
    employment_outlook_en:
      "Stable demand across small and medium-sized businesses.",
    employment_outlook_zh: "中小型企业对该岗位长期保持稳定需求。",
    salary_range: "$42,000-$55,000",
    category: "business",
    is_published: true,
  },
  {
    slug: "office-administration",
    title_en: "Office Administration",
    title_zh: "办公室行政",
    description_en:
      "Covers administrative duties including customer service, office software, and records management.",
    description_zh: "涵盖行政职责，包括客户服务、办公软件和档案管理。",
    key_learning_en: [
      "MS Office suite",
      "Office procedures",
      "Customer service",
      "Document management",
    ],
    key_learning_zh: ["MS Office套件", "办公流程", "客户服务", "文档管理"],
    career_pathways_en: [
      "Administrative Assistant",
      "Office Coordinator",
      "Receptionist",
    ],
    career_pathways_zh: ["行政助理", "办公室协调员", "前台接待"],
    employment_outlook_en:
      "Essential role in every industry with steady opportunities.",
    employment_outlook_zh: "各行业必不可少的角色，机会稳定。",
    salary_range: "$40,000-$52,000",
    category: "business",
    is_published: true,
  },
  {
    slug: "business-administration",
    title_en: "Business Administration",
    title_zh: "商业管理",
    description_en:
      "Comprehensive training in business operations, management, and entrepreneurship.",
    description_zh: "全面培训商业运营、管理和创业技能。",
    key_learning_en: [
      "Business planning",
      "Financial management",
      "Marketing principles",
      "HR basics",
    ],
    key_learning_zh: ["商业规划", "财务管理", "营销原理", "人力资源基础"],
    career_pathways_en: [
      "Business Analyst",
      "Operations Coordinator",
      "Small Business Owner",
    ],
    career_pathways_zh: ["商业分析师", "运营协调员", "小企业主"],
    employment_outlook_en:
      "Versatile qualification opening doors across sectors.",
    employment_outlook_zh: "多功能资格，可在各行业发展。",
    salary_range: "$48,000-$68,000",
    category: "business",
    is_published: true,
  },
  {
    slug: "human-resources",
    title_en: "Human Resources Management",
    title_zh: "人力资源管理",
    description_en:
      "Focuses on recruitment, employee relations, and HR administration.",
    description_zh: "专注于招聘、员工关系和人力资源管理。",
    key_learning_en: [
      "Recruitment processes",
      "Labor relations",
      "HR software",
      "Benefits administration",
    ],
    key_learning_zh: ["招聘流程", "劳资关系", "人力资源软件", "福利管理"],
    career_pathways_en: [
      "HR Assistant",
      "Recruitment Coordinator",
      "Payroll Specialist",
    ],
    career_pathways_zh: ["人力资源助理", "招聘协调员", "薪资专员"],
    employment_outlook_en:
      "Growing field with increasing focus on talent management.",
    employment_outlook_zh: "随着人才管理重视度提升，该领域增长迅速。",
    salary_range: "$45,000-$62,000",
    category: "business",
    is_published: true,
  },

  // Healthcare
  {
    slug: "personal-support-worker",
    title_en: "Personal Support Worker (PSW)",
    title_zh: "个人护理员",
    description_en:
      "Trains students to assist individuals with daily living activities in healthcare settings.",
    description_zh: "培训学员在医疗环境中协助个人日常生活活动。",
    key_learning_en: [
      "Patient care",
      "First aid & CPR",
      "Infection control",
      "Communication skills",
    ],
    key_learning_zh: ["病人护理", "急救与心肺复苏", "感染控制", "沟通技巧"],
    career_pathways_en: [
      "PSW in long-term care",
      "Home care worker",
      "Hospital assistant",
    ],
    career_pathways_zh: ["长期护理个人护理员", "居家护理员", "医院助理"],
    employment_outlook_en: "Very high demand due to aging population.",
    employment_outlook_zh: "由于人口老龄化，需求非常高。",
    salary_range: "$38,000-$48,000",
    category: "healthcare",
    is_published: true,
  },
  {
    slug: "medical-office-assistant",
    title_en: "Medical Office Assistant",
    title_zh: "医疗办公室助理",
    description_en:
      "Prepares students for administrative roles in medical clinics and hospitals.",
    description_zh: "培训学员在医疗诊所和医院担任行政职务。",
    key_learning_en: [
      "Medical terminology",
      "Patient scheduling",
      "Electronic health records",
      "Medical billing",
    ],
    key_learning_zh: ["医疗术语", "患者预约", "电子健康记录", "医疗账单"],
    career_pathways_en: [
      "Medical Receptionist",
      "Clinic Coordinator",
      "Medical Records Clerk",
    ],
    career_pathways_zh: ["医疗前台", "诊所协调员", "医疗记录文员"],
    employment_outlook_en: "Strong demand in healthcare administration.",
    employment_outlook_zh: "医疗管理领域需求强劲。",
    salary_range: "$42,000-$54,000",
    category: "healthcare",
    is_published: true,
  },
  {
    slug: "pharmacy-assistant",
    title_en: "Pharmacy Assistant",
    title_zh: "药房助理",
    description_en:
      "Teaches fundamentals of pharmacy operations and medication management.",
    description_zh: "教授药房运营和药物管理基础知识。",
    key_learning_en: [
      "Pharmacy software",
      "Medication dispensing",
      "Inventory management",
      "Customer service",
    ],
    key_learning_zh: ["药房软件", "药物配发", "库存管理", "客户服务"],
    career_pathways_en: [
      "Pharmacy Assistant",
      "Pharmacy Technician (with certification)",
      "Dispensary Clerk",
    ],
    career_pathways_zh: ["药房助理", "药房技师（需认证）", "配药员"],
    employment_outlook_en: "Steady demand in retail and hospital pharmacies.",
    employment_outlook_zh: "零售和医院药房需求稳定。",
    salary_range: "$40,000-$52,000",
    category: "healthcare",
    is_published: true,
  },
  {
    slug: "dental-assistant",
    title_en: "Dental Assistant",
    title_zh: "牙科助理",
    description_en:
      "Provides training in dental office procedures and patient care.",
    description_zh: "提供牙科诊所程序和患者护理培训。",
    key_learning_en: [
      "Dental procedures",
      "Sterilization",
      "X-ray operation",
      "Patient scheduling",
    ],
    key_learning_zh: ["牙科程序", "消毒", "X光操作", "患者预约"],
    career_pathways_en: [
      "Dental Assistant",
      "Dental Office Coordinator",
      "Orthodontic Assistant",
    ],
    career_pathways_zh: ["牙科助理", "牙科办公室协调员", "正畸助理"],
    employment_outlook_en: "Growing demand with expanding dental services.",
    employment_outlook_zh: "随着牙科服务扩展，需求增长。",
    salary_range: "$42,000-$56,000",
    category: "healthcare",
    is_published: true,
  },

  // Technology
  {
    slug: "web-development",
    title_en: "Web Development",
    title_zh: "网站开发",
    description_en:
      "Teaches modern web development technologies and frameworks.",
    description_zh: "教授现代网站开发技术和框架。",
    key_learning_en: [
      "HTML/CSS/JavaScript",
      "React/Vue frameworks",
      "Backend development",
      "Database management",
    ],
    key_learning_zh: [
      "HTML/CSS/JavaScript",
      "React/Vue框架",
      "后端开发",
      "数据库管理",
    ],
    career_pathways_en: [
      "Web Developer",
      "Front-end Developer",
      "Full-stack Developer",
    ],
    career_pathways_zh: ["网站开发员", "前端开发员", "全栈开发员"],
    employment_outlook_en: "Excellent opportunities in growing tech sector.",
    employment_outlook_zh: "在增长的科技行业有绝佳机会。",
    salary_range: "$55,000-$75,000",
    category: "technology",
    is_published: true,
  },
  {
    slug: "cybersecurity",
    title_en: "Cybersecurity Fundamentals",
    title_zh: "网络安全基础",
    description_en:
      "Provides essential skills in network security and data protection.",
    description_zh: "提供网络安全和数据保护的基本技能。",
    key_learning_en: [
      "Network security",
      "Threat detection",
      "Security protocols",
      "Risk management",
    ],
    key_learning_zh: ["网络安全", "威胁检测", "安全协议", "风险管理"],
    career_pathways_en: [
      "Security Analyst",
      "IT Security Specialist",
      "Network Administrator",
    ],
    career_pathways_zh: ["安全分析师", "IT安全专员", "网络管理员"],
    employment_outlook_en: "High demand with increasing cyber threats.",
    employment_outlook_zh: "随着网络威胁增加，需求很高。",
    salary_range: "$58,000-$80,000",
    category: "technology",
    is_published: true,
  },
  {
    slug: "data-analytics",
    title_en: "Data Analytics",
    title_zh: "数据分析",
    description_en:
      "Focuses on data analysis, visualization, and business intelligence.",
    description_zh: "专注于数据分析、可视化和商业智能。",
    key_learning_en: [
      "Excel advanced",
      "SQL databases",
      "Power BI/Tableau",
      "Statistical analysis",
    ],
    key_learning_zh: [
      "Excel高级应用",
      "SQL数据库",
      "Power BI/Tableau",
      "统计分析",
    ],
    career_pathways_en: [
      "Data Analyst",
      "Business Intelligence Analyst",
      "Data Coordinator",
    ],
    career_pathways_zh: ["数据分析师", "商业智能分析师", "数据协调员"],
    employment_outlook_en: "Strong growth across all industries.",
    employment_outlook_zh: "各行业强劲增长。",
    salary_range: "$52,000-$72,000",
    category: "technology",
    is_published: true,
  },
  {
    slug: "it-support",
    title_en: "IT Support Specialist",
    title_zh: "IT技术支持专员",
    description_en:
      "Trains students in technical support and system administration.",
    description_zh: "培训学员技术支持和系统管理。",
    key_learning_en: [
      "Hardware troubleshooting",
      "Software installation",
      "Network basics",
      "Help desk operations",
    ],
    key_learning_zh: ["硬件故障排除", "软件安装", "网络基础", "帮助台操作"],
    career_pathways_en: [
      "Help Desk Technician",
      "IT Support Specialist",
      "Systems Administrator",
    ],
    career_pathways_zh: ["帮助台技术员", "IT支持专员", "系统管理员"],
    employment_outlook_en: "Consistent demand for technical support roles.",
    employment_outlook_zh: "技术支持职位需求稳定。",
    salary_range: "$45,000-$60,000",
    category: "technology",
    is_published: true,
  },

  // Skilled Trades
  {
    slug: "hvac-technician",
    title_en: "HVAC Technician",
    title_zh: "暖通空调技师",
    description_en:
      "Comprehensive training in heating, ventilation, and air conditioning systems.",
    description_zh: "供暖、通风和空调系统的全面培训。",
    key_learning_en: [
      "HVAC systems",
      "Installation & repair",
      "Safety protocols",
      "Energy efficiency",
    ],
    key_learning_zh: ["暖通空调系统", "安装与维修", "安全协议", "能源效率"],
    career_pathways_en: [
      "HVAC Technician",
      "Refrigeration Mechanic",
      "Building Systems Technician",
    ],
    career_pathways_zh: ["暖通空调技师", "制冷技师", "建筑系统技师"],
    employment_outlook_en:
      "Strong demand in construction and maintenance sectors.",
    employment_outlook_zh: "建筑和维护领域需求强劲。",
    salary_range: "$50,000-$70,000",
    category: "trades",
    is_published: true,
  },
  {
    slug: "electrician",
    title_en: "Electrician (Pre-Apprenticeship)",
    title_zh: "电工（学徒前培训）",
    description_en: "Prepares students for electrical apprenticeship programs.",
    description_zh: "为学员的电工学徒计划做准备。",
    key_learning_en: [
      "Electrical theory",
      "Wiring techniques",
      "Safety codes",
      "Tool operation",
    ],
    key_learning_zh: ["电气理论", "布线技术", "安全规范", "工具操作"],
    career_pathways_en: [
      "Electrical Apprentice",
      "Maintenance Electrician",
      "Industrial Electrician",
    ],
    career_pathways_zh: ["电工学徒", "维护电工", "工业电工"],
    employment_outlook_en: "Excellent prospects in skilled trades.",
    employment_outlook_zh: "技术工种前景优异。",
    salary_range: "$48,000-$75,000",
    category: "trades",
    is_published: true,
  },
  {
    slug: "plumbing",
    title_en: "Plumbing (Pre-Apprenticeship)",
    title_zh: "管道工（学徒前培训）",
    description_en: "Foundational training for plumbing apprenticeships.",
    description_zh: "管道工学徒的基础培训。",
    key_learning_en: [
      "Pipe systems",
      "Installation techniques",
      "Blueprint reading",
      "Building codes",
    ],
    key_learning_zh: ["管道系统", "安装技术", "蓝图阅读", "建筑规范"],
    career_pathways_en: [
      "Plumbing Apprentice",
      "Pipefitter",
      "Service Plumber",
    ],
    career_pathways_zh: ["管道工学徒", "管道装配工", "服务管道工"],
    employment_outlook_en: "Consistent demand with retiring workforce.",
    employment_outlook_zh: "随着劳动力退休，需求稳定。",
    salary_range: "$46,000-$72,000",
    category: "trades",
    is_published: true,
  },
  {
    slug: "automotive-service",
    title_en: "Automotive Service Technician",
    title_zh: "汽车维修技师",
    description_en: "Training in vehicle maintenance, diagnostics, and repair.",
    description_zh: "车辆维护、诊断和维修培训。",
    key_learning_en: [
      "Engine diagnostics",
      "Brake systems",
      "Electrical systems",
      "Preventive maintenance",
    ],
    key_learning_zh: ["发动机诊断", "制动系统", "电气系统", "预防性维护"],
    career_pathways_en: [
      "Auto Mechanic",
      "Service Technician",
      "Shop Supervisor",
    ],
    career_pathways_zh: ["汽车技师", "服务技师", "车间主管"],
    employment_outlook_en: "Stable demand with vehicle complexity increasing.",
    employment_outlook_zh: "随着车辆复杂性增加，需求稳定。",
    salary_range: "$44,000-$65,000",
    category: "trades",
    is_published: true,
  },
];

async function seedCourses() {
  console.log("🌱 Starting course seeding...");

  try {
    // Check connection
    console.log("🔌 Testing database connection...");
    const { error: testError } = await supabase
      .from("courses")
      .select("count")
      .limit(1);

    if (testError) {
      console.error("❌ Database connection failed:", testError);
      process.exit(1);
    }

    console.log("✅ Database connection successful");

    // Optional: Clear existing courses
    console.log("🧹 Clearing existing courses...");
    const { error: deleteError } = await supabase
      .from("courses")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");

    if (deleteError) {
      console.warn(
        "⚠️  Warning: Could not clear existing courses:",
        deleteError.message,
      );
    } else {
      console.log("✅ Existing courses cleared");
    }

    // Insert courses
    console.log(`📝 Inserting ${courses.length} courses...`);

    const { data, error } = await supabase
      .from("courses")
      .insert(courses)
      .select();

    if (error) {
      console.error("❌ Insert failed:", error);
      process.exit(1);
    }

    console.log(`✅ Successfully inserted ${data?.length || 0} courses`);
    console.log("🎉 Seeding complete!");
    console.log("\n📊 Summary:");
    console.log(
      `   - Business: ${courses.filter((c) => c.category === "business").length} courses`,
    );
    console.log(
      `   - Healthcare: ${courses.filter((c) => c.category === "healthcare").length} courses`,
    );
    console.log(
      `   - Technology: ${courses.filter((c) => c.category === "technology").length} courses`,
    );
    console.log(
      `   - Trades: ${courses.filter((c) => c.category === "trades").length} courses`,
    );

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

// Run the seed function
seedCourses();
