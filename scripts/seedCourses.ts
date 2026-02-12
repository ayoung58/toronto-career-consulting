import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

// Course data - all 25 courses from course-translations.md
const courses = [
  // Business & Administration (10 courses)
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
    slug: "business-administration",
    title_en: "Business Administration Management",
    title_zh: "工商管理",
    description_en:
      "This program provides a strong foundation in business operations and management for adult learners seeking administrative or entry-level management roles.",
    description_zh:
      "本课程为成人学习者提供全面的商业运营与管理基础，适合希望进入行政或管理岗位的人士。",
    key_learning_en: [
      "Business operations and office management",
      "Human resources fundamentals",
      "Financial and budgeting basics",
      "Business communication",
      "Team and project coordination",
    ],
    key_learning_zh: [
      "商业运作与办公管理",
      "人力资源基础",
      "财务与预算基础",
      "商务沟通",
      "团队与项目协调",
    ],
    career_pathways_en: [
      "Administrative Manager",
      "Office Manager",
      "Business Coordinator",
      "Management Assistant",
    ],
    career_pathways_zh: ["行政经理", "办公室经理", "商业协调员", "管理助理"],
    employment_outlook_en:
      "Employment opportunities exist across nearly all industries with stable demand.",
    employment_outlook_zh: "各行业都有就业机会，需求稳定。",
    salary_range:
      "$45,000–$55,000 entry-level | $60,000–$80,000 with experience",
    category: "business",
    is_published: true,
  },
  {
    slug: "education-assistant",
    title_en: "Education Assistant",
    title_zh: "教育助理",
    description_en:
      "This program prepares adult learners to support teachers and students in school environments, focusing on classroom assistance and student support.",
    description_zh:
      "本课程培养成人学习者在学校环境中协助教师并支持学生，重点涵盖课堂协助与学生支持技能。",
    key_learning_en: [
      "Classroom support and learning assistance",
      "Student behavior and safety",
      "Special education fundamentals",
      "Communication with educators and families",
      "Documentation and school procedures",
    ],
    key_learning_zh: [
      "课堂协助与学习支持",
      "学生行为与安全管理",
      "特殊教育基础",
      "与教师及家庭沟通",
      "文书记录与学校流程",
    ],
    career_pathways_en: [
      "Education Assistant",
      "Classroom Assistant",
      "Special Education Assistant",
      "School Support Worker",
    ],
    career_pathways_zh: [
      "教育助理",
      "课堂助理",
      "特殊教育助理",
      "学校支持工作者",
    ],
    employment_outlook_en:
      "Stable demand exists in public and private schools, particularly in elementary and special education settings.",
    employment_outlook_zh:
      "公立和私立学校对该岗位需求稳定，尤其是在小学和特殊教育领域。",
    salary_range:
      "$40,000–$50,000 entry-level | $50,000–$60,000 with experience",
    category: "business",
    is_published: true,
  },
  {
    slug: "event-planner",
    title_en: "Event Planner",
    title_zh: "活动策划",
    description_en:
      "This program equips learners with the skills to plan, coordinate, and execute professional events.",
    description_zh: "本课程培养学员策划、组织并执行商业与文化活动的实务能力。",
    key_learning_en: [
      "Event planning and logistics",
      "Budgeting and vendor coordination",
      "Event marketing",
      "Risk management",
      "Client and project coordination",
    ],
    key_learning_zh: [
      "活动策划与执行",
      "预算与供应商协调",
      "活动推广与营销",
      "风险管理",
      "客户与项目协调",
    ],
    career_pathways_en: [
      "Event Planner",
      "Event Coordinator",
      "Corporate Event Assistant",
      "Marketing & Events Assistant",
    ],
    career_pathways_zh: [
      "活动策划师",
      "活动协调员",
      "企业活动助理",
      "营销与活动助理",
    ],
    employment_outlook_en:
      "Toronto's active business and cultural sectors provide ongoing opportunities in event-related roles.",
    employment_outlook_zh:
      "多伦多活跃的商业和文化领域为活动相关职位提供持续机会。",
    salary_range:
      "$45,000–$55,000 entry-level | $60,000–$75,000 with experience",
    category: "business",
    is_published: true,
  },
  {
    slug: "banking-financial-services",
    title_en: "Banking and Financial Services",
    title_zh: "银行与金融服务",
    description_en:
      "This program prepares learners for entry-level roles in banking and financial institutions, focusing on customer service, financial products, and regulatory awareness.",
    description_zh:
      "本课程培养学员进入银行及金融机构从事初级岗位的能力，重点涵盖客户服务、金融产品与合规意识。",
    key_learning_en: [
      "Banking operations and services",
      "Financial products and accounts",
      "Customer service in finance",
      "Regulatory compliance basics",
      "Professional communication",
    ],
    key_learning_zh: [
      "银行业务与服务",
      "金融产品与账户",
      "金融客户服务",
      "金融合规基础",
      "专业沟通",
    ],
    career_pathways_en: [
      "Banking Clerk",
      "Financial Services Representative",
      "Customer Service Associate",
    ],
    career_pathways_zh: ["银行职员", "金融服务代表", "客户服务专员"],
    employment_outlook_en:
      "Stable demand exists within banks, credit unions, and financial service firms.",
    employment_outlook_zh: "银行、信用合作社和金融服务公司对该岗位需求稳定。",
    salary_range:
      "$45,000–$55,000 entry-level | $55,000–$70,000 with experience",
    category: "business",
    is_published: true,
  },
  {
    slug: "office-administrative-assistant",
    title_en: "Office Administrative Assistant",
    title_zh: "办公室行政助理",
    description_en:
      "This program prepares learners for administrative support roles across various office environments.",
    description_zh:
      "本课程帮助学员掌握在各类办公环境中从事行政支持工作的实用技能。",
    key_learning_en: [
      "Office administration",
      "Business correspondence",
      "Scheduling and coordination",
      "Office software applications",
      "Professional workplace skills",
    ],
    key_learning_zh: [
      "办公室行政管理",
      "商务文书与沟通",
      "日程安排与协调",
      "办公软件应用",
      "职场职业素养",
    ],
    career_pathways_en: [
      "Office Administrative Assistant",
      "Administrative Assistant",
      "Office Coordinator",
    ],
    career_pathways_zh: ["办公室行政助理", "行政助理", "办公室协调员"],
    employment_outlook_en:
      "Administrative roles remain in demand across most industries.",
    employment_outlook_zh: "行政职位在大多数行业中仍有需求。",
    salary_range:
      "$42,000–$52,000 entry-level | $55,000–$65,000 with experience",
    category: "business",
    is_published: true,
  },
  {
    slug: "supply-chain-logistics",
    title_en: "Supply Chain Management and Logistics",
    title_zh: "供应链管理与物流",
    description_en:
      "This program prepares learners for roles in logistics, supply chain coordination, and operations.",
    description_zh: "本课程培养学员从事供应链、物流及运营协调相关工作的能力。",
    key_learning_en: [
      "Supply chain fundamentals",
      "Inventory management",
      "Logistics and transportation",
      "Procurement basics",
      "Operations coordination",
    ],
    key_learning_zh: [
      "供应链基础",
      "库存管理",
      "物流与运输",
      "采购基础",
      "运营协调",
    ],
    career_pathways_en: [
      "Logistics Coordinator",
      "Supply Chain Assistant",
      "Operations Coordinator",
    ],
    career_pathways_zh: ["物流协调员", "供应链助理", "运营协调员"],
    employment_outlook_en:
      "Toronto's logistics and distribution sector continues to expand.",
    employment_outlook_zh: "多伦多的物流和分销行业持续扩张。",
    salary_range:
      "$50,000–$60,000 entry-level | $65,000–$80,000 with experience",
    category: "business",
    is_published: true,
  },
  {
    slug: "hospitality-tourism",
    title_en: "Hospitality and Tourism Operations Management",
    title_zh: "酒店与旅游运营管理",
    description_en:
      "This program prepares learners for supervisory and operations roles in hospitality and tourism.",
    description_zh:
      "本课程培养学员在酒店与旅游行业从事运营与管理相关工作的能力。",
    key_learning_en: [
      "Hospitality operations",
      "Customer service excellence",
      "Tourism industry fundamentals",
      "Team supervision",
      "Operational planning",
    ],
    key_learning_zh: [
      "酒店运营",
      "高端客户服务",
      "旅游行业基础",
      "团队管理",
      "运营规划",
    ],
    career_pathways_en: [
      "Hospitality Supervisor",
      "Hotel Operations Coordinator",
      "Tourism Services Manager",
    ],
    career_pathways_zh: ["酒店主管", "酒店运营协调员", "旅游服务经理"],
    employment_outlook_en:
      "Tourism and hospitality roles continue to rebound and grow.",
    employment_outlook_zh: "旅游和酒店职位持续反弹和增长。",
    salary_range:
      "$45,000–$55,000 entry-level | $60,000–$75,000 with experience",
    category: "business",
    is_published: true,
  },
  {
    slug: "accounting-payroll",
    title_en: "Accounting – Payroll and Business Administrator",
    title_zh: "会计—薪资与商务管理",
    description_en:
      "This program prepares learners for accounting support roles with a focus on payroll and business administration.",
    description_zh:
      "本课程培养学员从事会计支持、薪资处理及商务行政相关工作的能力。",
    key_learning_en: [
      "Payroll processing",
      "Accounting fundamentals",
      "Business administration",
      "Financial records and reporting",
      "Compliance and documentation",
    ],
    key_learning_zh: [
      "薪资处理",
      "会计基础",
      "商务行政",
      "财务记录与报告",
      "合规与文档管理",
    ],
    career_pathways_en: [
      "Payroll Administrator",
      "Accounting Clerk",
      "Business Administrator",
    ],
    career_pathways_zh: ["薪资管理员", "会计文员", "商务管理员"],
    employment_outlook_en:
      "Businesses across industries require payroll and accounting support staff.",
    employment_outlook_zh: "各行业企业都需要薪资和会计支持人员。",
    salary_range:
      "$45,000–$55,000 entry-level | $60,000–$75,000 with experience",
    category: "business",
    is_published: true,
  },

  // Healthcare (7 courses)
  {
    slug: "health-service-administration",
    title_en: "Health Service Administration and Management",
    title_zh: "医疗服务行政与管理",
    description_en:
      "This program prepares learners for administrative and management roles within healthcare environments without providing clinical care.",
    description_zh:
      "本课程为学员进入医疗环境中的行政与管理岗位提供系统培训，无需从事临床工作。",
    key_learning_en: [
      "Canadian healthcare system overview",
      "Medical office administration",
      "Patient scheduling and records",
      "Medical billing and insurance basics",
      "Healthcare compliance and privacy",
    ],
    key_learning_zh: [
      "加拿大医疗体系概览",
      "医疗办公室行政管理",
      "患者预约与记录管理",
      "医疗账单与保险基础",
      "医疗合规与隐私",
    ],
    career_pathways_en: [
      "Health Services Administrator",
      "Medical Office Manager",
      "Clinic Coordinator",
      "Healthcare Administrative Assistant",
    ],
    career_pathways_zh: [
      "医疗服务管理员",
      "医疗办公室经理",
      "诊所协调员",
      "医疗行政助理",
    ],
    employment_outlook_en:
      "Healthcare facilities continue to require trained administrative professionals with system knowledge.",
    employment_outlook_zh:
      "医疗机构持续需要具备系统知识的经过培训的行政专业人员。",
    salary_range:
      "$45,000–$55,000 entry-level | $60,000–$75,000 with experience",
    category: "healthcare",
    is_published: true,
  },
  {
    slug: "dental-administration",
    title_en: "Dental Administration",
    title_zh: "牙科行政",
    description_en:
      "This program prepares learners to manage front-desk and administrative operations in dental clinics.",
    description_zh:
      "本课程培养学员在牙科诊所从事前台接待与行政管理工作的能力。",
    key_learning_en: [
      "Dental clinic operations",
      "Patient scheduling and reception",
      "Dental billing and insurance claims",
      "Records management and privacy",
      "Dental software fundamentals",
    ],
    key_learning_zh: [
      "牙科诊所运作",
      "患者预约与接待",
      "牙科账单与保险理赔",
      "记录管理与隐私合规",
      "牙科软件基础",
    ],
    career_pathways_en: [
      "Dental Administrative Assistant",
      "Dental Receptionist",
      "Dental Office Coordinator",
    ],
    career_pathways_zh: ["牙科行政助理", "牙科接待员", "牙科办公室协调员"],
    employment_outlook_en:
      "Consistent demand exists due to the high number of dental clinics across Toronto.",
    employment_outlook_zh: "由于多伦多牙科诊所数量众多，需求稳定。",
    salary_range:
      "$45,000–$55,000 entry-level | $55,000–$65,000 with experience",
    category: "healthcare",
    is_published: true,
  },
  {
    slug: "medical-esthetics",
    title_en: "Medical Esthetics",
    title_zh: "医学美容",
    description_en:
      "This program prepares learners for professional skincare and aesthetic treatments in clinical and medical spa environments.",
    description_zh:
      "本课程结合医学与美容基础，培养学员从事专业皮肤护理与医学美容服务。",
    key_learning_en: [
      "Skin anatomy and care",
      "Medical esthetic techniques",
      "Laser and device fundamentals",
      "Health and safety standards",
      "Client consultation",
    ],
    key_learning_zh: [
      "皮肤结构与护理",
      "医学美容技术",
      "激光与设备基础",
      "卫生与安全标准",
      "客户咨询与服务",
    ],
    career_pathways_en: [
      "Medical Esthetician",
      "Clinical Esthetics Technician",
      "Skincare Specialist",
    ],
    career_pathways_zh: ["医学美容师", "临床美容技师", "皮肤护理专家"],
    employment_outlook_en:
      "The medical esthetics sector continues to grow with strong demand for trained professionals.",
    employment_outlook_zh:
      "医学美容行业持续增长，对经过培训的专业人员需求强劲。",
    salary_range:
      "$45,000–$55,000 entry-level | $60,000–$80,000+ with experience or commission",
    category: "healthcare",
    is_published: true,
  },
  {
    slug: "medical-office-administrator",
    title_en: "Medical Office Administrator",
    title_zh: "医疗办公室行政",
    description_en:
      "This program trains learners to manage administrative operations in medical offices and clinics.",
    description_zh:
      "本课程培养学员在医疗诊所与办公室中从事行政管理与患者服务工作的能力。",
    key_learning_en: [
      "Medical office procedures",
      "Patient scheduling and records",
      "Medical billing and insurance",
      "Privacy and compliance",
      "Medical office software",
    ],
    key_learning_zh: [
      "医疗办公室流程",
      "患者预约与记录",
      "医疗账单与保险",
      "隐私与合规",
      "医疗行政软件",
    ],
    career_pathways_en: [
      "Medical Office Administrator",
      "Medical Administrative Assistant",
      "Clinic Receptionist",
    ],
    career_pathways_zh: ["医疗办公室管理员", "医疗行政助理", "诊所接待员"],
    employment_outlook_en:
      "Healthcare clinics continue to require trained office administrators.",
    employment_outlook_zh: "医疗诊所持续需要经过培训的办公室管理员。",
    salary_range:
      "$45,000–$55,000 entry-level | $55,000–$65,000 with experience",
    category: "healthcare",
    is_published: true,
  },
  {
    slug: "developmental-service-worker",
    title_en: "Developmental Service Worker",
    title_zh: "发展性服务工作者",
    description_en:
      "This program prepares learners to support individuals with developmental disabilities.",
    description_zh:
      "本课程培养学员为有发展性障碍人士提供支持与照护的专业能力。",
    key_learning_en: [
      "Developmental disabilities overview",
      "Individual support strategies",
      "Life skills assistance",
      "Safety and advocacy",
      "Professional ethics",
    ],
    key_learning_zh: [
      "发展性障碍概览",
      "个体支持策略",
      "生活技能协助",
      "安全与权益维护",
      "职业道德",
    ],
    career_pathways_en: [
      "Developmental Service Worker",
      "Support Worker",
      "Residential Support Staff",
    ],
    career_pathways_zh: ["发展性服务工作者", "支持工作者", "住宿支持人员"],
    employment_outlook_en:
      "Ongoing demand exists within community and care organizations.",
    employment_outlook_zh: "社区和护理机构对该岗位需求持续。",
    salary_range:
      "$40,000–$50,000 entry-level | $50,000–$60,000 with experience",
    category: "healthcare",
    is_published: true,
  },
  {
    slug: "nacc-personal-support-worker",
    title_en: "NACC Personal Support Worker",
    title_zh: "NACC 个人护理员",
    description_en:
      "This NACC-aligned program prepares learners for personal support roles in healthcare and community settings.",
    description_zh:
      "本课程符合 NACC 标准，培养学员在医疗及社区环境中从事个人护理工作的能力。",
    key_learning_en: [
      "Personal care assistance",
      "Infection control",
      "Patient mobility and safety",
      "Communication in care settings",
      "Professional standards",
    ],
    key_learning_zh: [
      "个人护理支持",
      "感染控制",
      "患者行动与安全",
      "护理沟通",
      "职业标准",
    ],
    career_pathways_en: [
      "Personal Support Worker",
      "Home Care Assistant",
      "Healthcare Aide",
    ],
    career_pathways_zh: ["个人护理员", "居家护理助理", "医疗护理助理"],
    employment_outlook_en:
      "Strong and ongoing demand exists across healthcare and community care sectors.",
    employment_outlook_zh: "医疗和社区护理行业对该岗位需求强劲且持续。",
    salary_range:
      "$40,000–$50,000 entry-level | $50,000–$60,000 with experience",
    category: "healthcare",
    is_published: true,
  },
  {
    slug: "early-childhood-assistant",
    title_en: "Early Childhood Assistant with Placement",
    title_zh: "幼儿教育助理（含实习）",
    description_en:
      "This program combines classroom instruction with supervised placement to prepare learners for early childhood education environments.",
    description_zh:
      "本课程通过课堂学习与实习相结合，帮助学员进入幼儿教育与托育环境工作。",
    key_learning_en: [
      "Child development fundamentals",
      "Early learning activities",
      "Health, safety, and nutrition",
      "Communication with parents and teams",
      "Supervised field placement",
    ],
    key_learning_zh: [
      "儿童发展基础",
      "早期学习活动支持",
      "健康、安全与营养",
      "与家长及教育团队沟通",
      "带指导的实习经验",
    ],
    career_pathways_en: [
      "Early Childhood Assistant",
      "Childcare Assistant",
      "Daycare Support Worker",
    ],
    career_pathways_zh: ["幼儿教育助理", "托儿助理", "日托支持工作者"],
    employment_outlook_en:
      "Ongoing demand exists across childcare centers and early learning facilities.",
    employment_outlook_zh: "托儿中心和早期学习机构对该岗位需求持续。",
    salary_range:
      "$38,000–$48,000 entry-level | $45,000–$55,000 with experience",
    category: "healthcare",
    is_published: true,
  },

  // Technology (4 courses)
  {
    slug: "cyber-security-network",
    title_en: "Cyber Security and Computer Network Engineering",
    title_zh: "网络安全与计算机网络工程",
    description_en:
      "This program prepares learners for technical roles in cybersecurity and computer networking.",
    description_zh:
      "本课程培养学员从事网络安全与计算机网络相关技术岗位的基础能力。",
    key_learning_en: [
      "Computer networks and protocols",
      "Cybersecurity fundamentals",
      "Network administration",
      "System security and monitoring",
      "IT troubleshooting",
    ],
    key_learning_zh: [
      "计算机网络与协议",
      "网络安全基础",
      "网络管理",
      "系统安全与监控",
      "信息技术故障排查",
    ],
    career_pathways_en: [
      "Network Technician",
      "Cybersecurity Analyst (Junior)",
      "IT Support Specialist",
    ],
    career_pathways_zh: ["网络技术员", "网络安全分析师（初级）", "IT 支持专员"],
    employment_outlook_en:
      "Demand continues to grow as organizations prioritize digital security.",
    employment_outlook_zh: "随着组织优先考虑数字安全，需求持续增长。",
    salary_range:
      "$55,000–$70,000 entry-level | $70,000–$90,000 with experience",
    category: "technology",
    is_published: true,
  },
  {
    slug: "software-qa-testing",
    title_en: "Software Quality Assurance and Testing Analyst",
    title_zh: "软件质量保证与测试分析师",
    description_en:
      "This program prepares learners to test software applications and ensure quality standards.",
    description_zh: "本课程培养学员从事软件测试与质量保证相关工作的能力。",
    key_learning_en: [
      "Software testing fundamentals",
      "Manual and automated testing",
      "Test documentation",
      "Bug tracking tools",
      "Quality assurance processes",
    ],
    key_learning_zh: [
      "软件测试基础",
      "手动与自动化测试",
      "测试文档编写",
      "缺陷跟踪工具",
      "质量保证流程",
    ],
    career_pathways_en: [
      "QA Analyst",
      "Software Tester",
      "Quality Assurance Coordinator",
    ],
    career_pathways_zh: ["QA 分析师", "软件测试员", "质量保证协调员"],
    employment_outlook_en:
      "Technology companies maintain steady demand for QA professionals.",
    employment_outlook_zh: "科技公司对 QA 专业人员保持稳定需求。",
    salary_range:
      "$55,000–$65,000 entry-level | $70,000–$85,000 with experience",
    category: "technology",
    is_published: true,
  },
  {
    slug: "data-analyst",
    title_en: "Data Analyst",
    title_zh: "数据分析",
    description_en:
      "This program equips learners with skills to collect, analyze, and interpret data for business decision-making.",
    description_zh: "本课程培养学员利用数据进行分析并支持商业决策的能力。",
    key_learning_en: [
      "Data analysis fundamentals",
      "Excel and data tools",
      "Data visualization",
      "Statistical concepts",
      "Business reporting",
    ],
    key_learning_zh: [
      "数据分析基础",
      "Excel 与数据工具",
      "数据可视化",
      "统计概念",
      "商业报告",
    ],
    career_pathways_en: [
      "Data Analyst",
      "Business Analyst (Junior)",
      "Reporting Analyst",
    ],
    career_pathways_zh: ["数据分析师", "商业分析师（初级）", "报告分析师"],
    employment_outlook_en:
      "Data-driven roles continue to expand across industries.",
    employment_outlook_zh: "数据驱动的职位在各行业持续扩张。",
    salary_range:
      "$55,000–$70,000 entry-level | $75,000–$95,000 with experience",
    category: "technology",
    is_published: true,
  },
  {
    slug: "web-development",
    title_en: "Web Development",
    title_zh: "网页开发",
    description_en:
      "This program prepares learners to design and build functional websites and web applications.",
    description_zh: "本课程培养学员进行网站与网页应用开发的实用技能。",
    key_learning_en: [
      "HTML, CSS, and JavaScript",
      "Responsive web design",
      "Web development frameworks",
      "Website deployment",
      "Web project fundamentals",
    ],
    key_learning_zh: [
      "网页前端基础",
      "响应式网页设计",
      "网页开发框架",
      "网站部署",
      "网页项目基础",
    ],
    career_pathways_en: [
      "Web Developer",
      "Junior Front-End Developer",
      "Web Designer",
    ],
    career_pathways_zh: ["网页开发员", "初级前端开发员", "网页设计师"],
    employment_outlook_en:
      "Web development skills remain in strong demand across sectors.",
    employment_outlook_zh: "网页开发技能在各行业仍有强劲需求。",
    salary_range:
      "$55,000–$70,000 entry-level | $75,000–$90,000 with experience",
    category: "technology",
    is_published: true,
  },

  // Trades & Services (4 courses)
  {
    slug: "community-service-worker",
    title_en: "Community Service Worker",
    title_zh: "社区服务工作者",
    description_en:
      "This program prepares learners to support individuals and communities through social service and nonprofit organizations.",
    description_zh:
      "本课程帮助学员掌握在社会服务及非营利机构中支持个人与社区的实务能力。",
    key_learning_en: [
      "Community support systems",
      "Client assessment and documentation",
      "Mental health and addiction basics",
      "Multicultural communication",
      "Crisis response and referrals",
    ],
    key_learning_zh: [
      "社区支持体系",
      "个案评估与记录",
      "心理健康与成瘾基础",
      "多元文化沟通",
      "危机应对与资源转介",
    ],
    career_pathways_en: [
      "Community Service Worker",
      "Support Worker",
      "Case Worker Assistant",
      "Social Service Assistant",
    ],
    career_pathways_zh: [
      "社区服务工作者",
      "支持工作者",
      "个案工作助理",
      "社会服务助理",
    ],
    employment_outlook_en:
      "Steady employment opportunities exist in nonprofit organizations and public service agencies.",
    employment_outlook_zh: "非营利组织和公共服务机构提供稳定的就业机会。",
    salary_range:
      "$40,000–$50,000 entry-level | $50,000–$60,000 with experience",
    category: "trades",
    is_published: true,
  },
  {
    slug: "food-service-worker",
    title_en: "Food Service Worker",
    title_zh: "餐饮服务人员",
    description_en:
      "This program prepares learners for entry-level roles in food service and hospitality environments.",
    description_zh: "本课程培养学员从事餐饮服务行业基础岗位的实用技能。",
    key_learning_en: [
      "Food preparation basics",
      "Health and safety standards",
      "Customer service",
      "Kitchen operations",
      "Workplace teamwork",
    ],
    key_learning_zh: [
      "食品准备基础",
      "卫生与安全标准",
      "客户服务",
      "厨房运作",
      "团队协作",
    ],
    career_pathways_en: [
      "Food Service Worker",
      "Kitchen Assistant",
      "Restaurant Crew Member",
    ],
    career_pathways_zh: ["餐饮服务人员", "厨房助理", "餐厅工作人员"],
    employment_outlook_en:
      "Food service roles are consistently available across the city.",
    employment_outlook_zh: "全市餐饮服务岗位持续可用。",
    salary_range:
      "$35,000–$42,000 entry-level | $42,000–$50,000 with experience",
    category: "trades",
    is_published: true,
  },
  {
    slug: "building-maintenance-property",
    title_en: "Building Maintenance and Property Management",
    title_zh: "建筑维护与物业管理",
    description_en:
      "This program prepares learners to manage building operations and property maintenance.",
    description_zh: "本课程培养学员从事建筑维护及物业管理相关工作的能力。",
    key_learning_en: [
      "Building systems basics",
      "Maintenance planning",
      "Property management fundamentals",
      "Health and safety compliance",
      "Tenant communication",
    ],
    key_learning_zh: [
      "建筑系统基础",
      "维护计划",
      "物业管理基础",
      "安全与合规",
      "住户沟通",
    ],
    career_pathways_en: [
      "Building Superintendent",
      "Property Manager Assistant",
      "Maintenance Coordinator",
    ],
    career_pathways_zh: ["建筑管理员", "物业经理助理", "维护协调员"],
    employment_outlook_en:
      "Residential and commercial properties require ongoing management staff.",
    employment_outlook_zh: "住宅和商业物业需要持续的管理人员。",
    salary_range:
      "$45,000–$55,000 entry-level | $60,000–$75,000 with experience",
    category: "trades",
    is_published: true,
  },
  {
    slug: "hair-stylist",
    title_en: "Hair Stylist",
    title_zh: "美发造型师",
    description_en:
      "This program prepares learners for professional hairstyling roles in salons.",
    description_zh: "本课程培养学员从事专业美发与造型服务的技能。",
    key_learning_en: [
      "Hair cutting and styling",
      "Hair coloring techniques",
      "Salon hygiene and safety",
      "Client consultation",
      "Professional salon practices",
    ],
    key_learning_zh: [
      "剪发与造型",
      "染发技术",
      "沙龙卫生与安全",
      "客户咨询",
      "美发行业规范",
    ],
    career_pathways_en: [
      "Hair Stylist",
      "Salon Assistant",
      "Junior Hairstylist",
    ],
    career_pathways_zh: ["美发造型师", "沙龙助理", "初级发型师"],
    employment_outlook_en: "Personal care services maintain steady demand.",
    employment_outlook_zh: "个人护理服务保持稳定需求。",
    salary_range:
      "$38,000–$45,000 entry-level | $45,000–$60,000+ with experience and tips",
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
      `   - Trades & Services: ${courses.filter((c) => c.category === "trades").length} courses`,
    );
    console.log(`   - Total: ${courses.length} courses`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

// Run the seed function
seedCourses();
