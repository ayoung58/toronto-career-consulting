# Toronto Career Consulting Website - Complete Implementation Plan

**Last Updated**: February 2026  
**Estimated Timeline**: 9-10 development days  
**Total Cost**: $0 (using free tiers)

---

## 📋 Table of Contents

1. [Project Summary](#1-project-summary)
2. [Tech Stack Overview](#2-tech-stack-overview)
3. [Project Architecture](#3-project-architecture)
4. [Database Design](#4-database-design)
5. [PRE-CODING SETUP (Do This First!)](#5-pre-coding-setup-do-this-first)
6. [Chronological Development Guide](#6-chronological-development-guide)
7. [Testing & Deployment](#7-testing--deployment)
8. [Maintenance & Ongoing Updates](#8-maintenance--ongoing-updates)

---

## 1. Project Summary

### What You're Building

A professional bilingual (English/Chinese Mandarin) education consulting website that:

- Showcases 25+ career training programs
- Allows visitors to explore courses and contact the business
- Provides an admin dashboard to manage courses and translations
- Automatically translates missing Chinese content
- Features modern animations and minimalist design

### Key Features

✅ **Bilingual Interface** - Toggle between English and Chinese  
✅ **Course Catalog** - Browse, filter, and search programs  
✅ **Admin Dashboard** - Manage courses and translations  
✅ **Auto-Translation** - Automatically translate English to Chinese  
✅ **Contact Form** - Inquiry submission  
✅ **Responsive Design** - Works on mobile, tablet, desktop  
✅ **Animations** - Smooth, professional animations

### User Flows

**Visitor Flow:**

1. Land on homepage → See animated hero with featured courses
2. Browse courses → Filter by category, search by keyword
3. View course details → See salary, career paths, descriptions
4. Contact → Submit inquiry form

**Admin Flow:**

1. Login → Secure email/password authentication
2. Dashboard → View statistics and quick actions
3. Manage Courses → Add, edit, delete, publish/unpublish
4. Manage Translations → Edit Chinese translations, auto-translate

---

## 2. Tech Stack Overview

### Frontend Stack

| Technology        | Purpose             | Why This Choice                                        |
| ----------------- | ------------------- | ------------------------------------------------------ |
| **Next.js 14**    | React framework     | Server-side rendering, API routes, optimal performance |
| **TypeScript**    | Type safety         | Catch errors early, better developer experience        |
| **Tailwind CSS**  | Styling             | Rapid development, easy customization, modern design   |
| **Framer Motion** | Animations          | Smooth, declarative animations                         |
| **Lucide React**  | Icons               | Beautiful, consistent icon set                         |
| **Sonner**        | Toast notifications | Clean, simple notifications                            |

### Backend & Data Stack

| Technology             | Purpose           | Why This Choice                               |
| ---------------------- | ----------------- | --------------------------------------------- |
| **Supabase**           | Database + Auth   | PostgreSQL, built-in auth, free tier generous |
| **Next.js API Routes** | Backend endpoints | Integrated with frontend, serverless          |
| **Row Level Security** | Data protection   | Database-level security policies              |

### Translation Stack

| Technology                      | Purpose             | Why This Choice                |
| ------------------------------- | ------------------- | ------------------------------ |
| **next-intl**                   | i18n framework      | Built for Next.js App Router   |
| **LibreTranslate** (optional)   | Auto-translation    | Free, self-hosted, no API keys |
| **Supabase translations table** | Translation storage | Centralized, editable by admin |

### Hosting & Deployment

| Service      | Purpose          | Free Tier Limits               |
| ------------ | ---------------- | ------------------------------ |
| **Vercel**   | Frontend hosting | 100GB bandwidth/month          |
| **Supabase** | Database + Auth  | 500MB database, 50K MAU        |
| **GitHub**   | Version control  | Unlimited public/private repos |

---

## 3. Project Architecture

### Directory Structure

```
toronto-career-consulting/
├── app/                           # Next.js 14 App Router
│   ├── layout.tsx                 # Root layout (providers)
│   ├── page.tsx                   # Homepage
│   ├── courses/
│   │   └── page.tsx               # Course listing
│   ├── contact/
│   │   └── page.tsx               # Contact form
│   ├── admin/
│   │   ├── login/
│   │   │   └── page.tsx           # Admin login
│   │   ├── dashboard/
│   │   │   └── page.tsx           # Admin dashboard
│   │   ├── courses/
│   │   │   └── page.tsx           # Course management
│   │   └── translations/
│   │       └── page.tsx           # Translation management
│   └── api/
│       ├── courses/
│       │   └── route.ts           # Course CRUD API
│       ├── translations/
│       │   └── route.ts           # Translation API
│       └── auto-translate/
│           └── route.ts           # Auto-translation endpoint
├── src/
│   ├── components/
│   │   ├── ui/                    # Reusable UI components
│   │   ├── Header.tsx             # Site header
│   │   ├── Footer.tsx             # Site footer
│   │   ├── LanguageToggle.tsx     # Language switcher
│   │   ├── CourseCard.tsx         # Course display card
│   │   └── AnimatedHero.tsx       # Homepage hero
│   ├── lib/
│   │   ├── supabase.ts            # Supabase client (browser)
│   │   ├── supabase-server.ts     # Supabase client (server)
│   │   ├── animations.ts          # Framer Motion variants
│   │   └── utils.ts               # Helper functions
│   ├── contexts/
│   │   └── LanguageContext.tsx    # Language state management
│   ├── types/
│   │   └── index.ts               # TypeScript interfaces
│   └── middleware.ts              # Auth middleware
├── public/
│   ├── images/                    # Static images
│   └── locales/                   # Translation JSON files
│       ├── en/
│       │   └── common.json
│       └── zh/
│           └── common.json
├── scripts/
│   ├── seedCourses.ts             # Initial course data
│   └── seedTranslations.ts        # Initial translations
├── .env.local                     # Environment variables (DO NOT COMMIT)
├── .gitignore
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         USER BROWSER                         │
│                                                              │
│  ┌──────────────┐         ┌──────────────┐                 │
│  │  Public Pages │         │ Admin Pages  │                 │
│  │  - Homepage   │         │  - Dashboard │                 │
│  │  - Courses    │         │  - Courses   │                 │
│  │  - Contact    │         │  - Trans.    │                 │
│  └──────┬───────┘         └──────┬───────┘                 │
│         │                         │                          │
│         └─────────┬───────────────┘                          │
│                   │                                          │
└───────────────────┼──────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────┐
│                    NEXT.JS 14 APP ROUTER                     │
│                                                              │
│  ┌──────────────────┐       ┌──────────────────┐           │
│  │  Server          │       │  API Routes      │           │
│  │  Components      │◄──────┤  /api/courses    │           │
│  │  (SSR)           │       │  /api/trans.     │           │
│  └──────────────────┘       └──────────────────┘           │
│                                                              │
│  ┌──────────────────┐       ┌──────────────────┐           │
│  │  Client          │       │  Middleware      │           │
│  │  Components      │       │  (Auth Guard)    │           │
│  └──────────────────┘       └──────────────────┘           │
│                                                              │
└───────────────────┬──────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────┐
│                         SUPABASE                             │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  PostgreSQL  │  │  Auth        │  │  Storage     │     │
│  │  - courses   │  │  - Users     │  │  (Future)    │     │
│  │  - trans.    │  │  - Sessions  │  │              │     │
│  │  - admin     │  │  - RLS       │  │              │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Database Design

### Entity Relationship Diagram

```
┌─────────────────────────────────────────┐
│              COURSES                     │
├─────────────────────────────────────────┤
│ id (PK)              UUID                │
│ slug                 TEXT UNIQUE         │
│ title_en             TEXT                │
│ title_zh             TEXT                │
│ description_en       TEXT                │
│ description_zh       TEXT                │
│ key_learning_en      TEXT[]              │
│ key_learning_zh      TEXT[]              │
│ career_pathways_en   TEXT[]              │
│ career_pathways_zh   TEXT[]              │
│ employment_outlook_en TEXT               │
│ employment_outlook_zh TEXT               │
│ salary_range         TEXT                │
│ category             TEXT                │
│ is_published         BOOLEAN             │
│ created_at           TIMESTAMP           │
│ updated_at           TIMESTAMP           │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│            TRANSLATIONS                  │
├─────────────────────────────────────────┤
│ id (PK)              UUID                │
│ key                  TEXT UNIQUE         │
│ value_en             TEXT                │
│ value_zh             TEXT                │
│ category             TEXT                │
│ created_at           TIMESTAMP           │
│ updated_at           TIMESTAMP           │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│            ADMIN_ROLES                   │
├─────────────────────────────────────────┤
│ user_id (PK, FK)     UUID ─────────┐    │
│ role                 TEXT           │    │
│ created_at           TIMESTAMP      │    │
└──────────────────────────────────────────┘
                                      │
                                      │
                  ┌───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│         AUTH.USERS (Supabase)            │
├─────────────────────────────────────────┤
│ id (PK)              UUID                │
│ email                TEXT                │
│ encrypted_password   TEXT                │
│ created_at           TIMESTAMP           │
│ ...                  (managed by Supabase)
└─────────────────────────────────────────┘
```

### SQL Schema

```sql
-- Table: courses
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title_en TEXT NOT NULL,
  title_zh TEXT,
  description_en TEXT,
  description_zh TEXT,
  key_learning_en TEXT[],
  key_learning_zh TEXT[],
  career_pathways_en TEXT[],
  career_pathways_zh TEXT[],
  employment_outlook_en TEXT,
  employment_outlook_zh TEXT,
  salary_range TEXT,
  category TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  is_published BOOLEAN DEFAULT true
);

-- Index for performance
CREATE INDEX idx_courses_slug ON courses(slug);
CREATE INDEX idx_courses_category ON courses(category);
CREATE INDEX idx_courses_published ON courses(is_published);

-- Table: translations
CREATE TABLE translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value_en TEXT NOT NULL,
  value_zh TEXT,
  category TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index for performance
CREATE INDEX idx_translations_key ON translations(key);
CREATE INDEX idx_translations_category ON translations(category);

-- Table: admin_roles
CREATE TABLE admin_roles (
  user_id UUID REFERENCES auth.users(id) PRIMARY KEY,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Row Level Security (RLS) Policies

-- Courses: Public can read published, admin can do everything
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published courses" ON courses
  FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admin full access to courses" ON courses
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_roles
      WHERE admin_roles.user_id = auth.uid()
    )
  );

-- Translations: Public read, admin write
ALTER TABLE translations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read translations" ON translations
  FOR SELECT
  USING (true);

CREATE POLICY "Admin full access to translations" ON translations
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_roles
      WHERE admin_roles.user_id = auth.uid()
    )
  );

-- Admin roles: Only viewable by admins
ALTER TABLE admin_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin view admin roles" ON admin_roles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_roles
      WHERE admin_roles.user_id = auth.uid()
    )
  );
```

---

## 5. PRE-CODING SETUP (Do This First!)

**⚠️ IMPORTANT**: Complete ALL steps in this section before writing any code. This ensures you have all accounts, credentials, and tools ready.

### Estimated Time: 30-45 minutes

---

### Step 5.1: GitHub Account & Repository Setup

**Time**: 10 minutes

#### 5.1.1 Create GitHub Account (if needed)

1. Go to https://github.com
2. Click "Sign up"
3. Follow the registration process
4. Verify your email address

#### 5.1.2 Create New Repository

1. Click the "+" icon in top right → "New repository"
2. **Repository name**: `toronto-career-consulting`
3. **Description**: `Bilingual education consulting website with course management`
4. **Visibility**: Choose Private or Public
5. ✅ Check "Add a README file"
6. ✅ Check "Add .gitignore" → Select **Node** template
7. ❌ Don't add a license (optional)
8. Click "Create repository"

#### 5.1.3 Clone Repository Locally

```bash
# Open your terminal (macOS/Linux) or Git Bash (Windows)
cd ~/Documents  # Or your preferred projects folder

git clone https://github.com/YOUR_USERNAME/toronto-career-consulting.git
cd toronto-career-consulting
```

**✅ Verification**:

```bash
ls -la
# Should see: .git, .gitignore, README.md
```

---

### Step 5.2: Supabase Account & Database Setup

**Time**: 15 minutes

#### 5.2.1 Create Supabase Account

1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with **GitHub** (recommended) or email
4. Authorize Supabase to access your GitHub (read-only access)

#### 5.2.2 Create New Project

1. Click "New Project"
2. **Organization**: Select your personal org or create new
3. **Name**: `Toronto Career Consulting`
4. **Database Password**: **CRITICAL** - Create a strong password and save it securely
   - Example: `Tr0nt0C@reer2026!`
   - Save this in a password manager or secure note
5. **Region**: Select **East US (North Virginia)** (closest to Toronto)
6. **Pricing Plan**: **Free**
7. Click "Create new project"
8. ⏳ Wait ~2 minutes for database provisioning

#### 5.2.3 Get API Credentials

1. Once project is created, click **"Settings"** (gear icon in sidebar)
2. Click **"API"** in the settings menu
3. Copy these values (you'll need them soon):

**Project URL**:

```
https://xxxxxxxxxxxxxx.supabase.co
```

**anon public key** (under "Project API keys"):

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6...
```

**service_role secret key** (⚠️ Keep this SECRET):

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6...
```

💡 **Tip**: Create a temporary text file to store these values:

```bash
# In your project folder
touch supabase-credentials.txt
# Add the values, then you'll copy them to .env.local later
# DELETE this file after setup!
```

#### 5.2.4 Setup Database Tables

1. Click **"SQL Editor"** in Supabase sidebar
2. Click **"New Query"**
3. Copy the **entire SQL schema** from Section 4 above
4. Paste into the SQL editor
5. Click **"Run"** (or press `Ctrl+Enter` / `Cmd+Enter`)
6. You should see: "Success. No rows returned"

**✅ Verification**:

1. Click **"Table Editor"** in sidebar
2. You should see 3 tables:
   - `courses` (0 rows)
   - `translations` (0 rows)
   - `admin_roles` (0 rows)

#### 5.2.5 Create First Admin User

1. Click **"Authentication"** in sidebar → **"Users"**
2. Click **"Add user"** → **"Create new user"**
3. **Email**: Your email (e.g., `your.email@gmail.com`)
4. **Password**: Create a strong password (you'll use this to log into admin)
   - Example: `Admin2026!Secure`
   - **Save this password** - you'll need it to login
5. ✅ Check "Auto Confirm User"
6. Click **"Create user"**
7. **Copy the User ID** (it looks like: `a1b2c3d4-5e6f-7g8h-9i0j-k1l2m3n4o5p6`)

#### 5.2.6 Grant Admin Access

1. Go back to **"SQL Editor"**
2. Click **"New Query"**
3. Run this SQL (replace `YOUR_USER_ID` with the ID you copied):

```sql
INSERT INTO admin_roles (user_id, role)
VALUES ('YOUR_USER_ID_HERE', 'admin');
```

Example:

```sql
INSERT INTO admin_roles (user_id, role)
VALUES ('a1b2c3d4-5e6f-7g8h-9i0j-k1l2m3n4o5p6', 'admin');
```

4. Click **"Run"**
5. Success message: "Success. 1 rows affected"

**✅ Verification**:

- Go to **"Table Editor"** → **"admin_roles"**
- Should see 1 row with your user_id

---

### Step 5.3: Vercel Account Setup

**Time**: 5 minutes

#### 5.3.1 Create Vercel Account

1. Go to https://vercel.com
2. Click "Sign Up"
3. Choose **"Continue with GitHub"** (recommended)
4. Authorize Vercel to access your GitHub
5. You'll be redirected to Vercel dashboard

#### 5.3.2 Don't Import Yet

- **DO NOT** import your project yet
- We'll deploy after coding is complete
- Just verify you have access to the dashboard

**✅ Verification**: You should see the Vercel dashboard with "Let's build something new"

---

### Step 5.4: Local Development Environment

**Time**: 10 minutes

#### 5.4.1 Install Node.js (if not installed)

1. Check if Node.js is installed:

```bash
node --version
npm --version
```

2. If not installed or version is < 18:
   - Go to https://nodejs.org
   - Download **LTS version** (e.g., v20.x.x)
   - Run the installer
   - Restart your terminal
   - Verify: `node --version` should show v18 or higher

#### 5.4.2 Install VS Code (if not installed)

1. Download from https://code.visualstudio.com
2. Install for your operating system
3. Open VS Code

#### 5.4.3 Install VS Code Extensions

Open VS Code and install these extensions:

1. **GitHub Copilot** (if you have access)
   - Press `Cmd+Shift+X` (Mac) or `Ctrl+Shift+X` (Windows)
   - Search "GitHub Copilot"
   - Click "Install"

2. **ESLint**
   - Search "ESLint"
   - Install the official Microsoft version

3. **Prettier - Code formatter**
   - Search "Prettier"
   - Install

4. **Tailwind CSS IntelliSense**
   - Search "Tailwind CSS IntelliSense"
   - Install

5. **TypeScript and JavaScript Language Features** (usually pre-installed)

#### 5.4.4 Open Project in VS Code

```bash
# In your terminal, navigate to project folder
cd ~/Documents/toronto-career-consulting

# Open in VS Code
code .
```

---

### Step 5.5: Pre-Coding Verification Checklist

**Before proceeding to Day 1**, verify you have:

- [ ] GitHub account created
- [ ] `toronto-career-consulting` repository created and cloned
- [ ] Supabase account created
- [ ] Supabase project created and database provisioned
- [ ] Supabase API credentials saved (URL, anon key, service_role key)
- [ ] Database tables created successfully (courses, translations, admin_roles)
- [ ] First admin user created and added to admin_roles table
- [ ] Admin email and password saved securely
- [ ] Vercel account created and GitHub connected
- [ ] Node.js v18+ installed
- [ ] VS Code installed with recommended extensions
- [ ] Project folder open in VS Code

**If all checked ✅, you're ready to start coding!**

---

## 6. Chronological Development Guide

### 🎯 Development Day 1: Project Foundation & Setup

**Goal**: Initialize the Next.js project, install dependencies, setup TypeScript types, and create the basic Supabase connection.

**Estimated Time**: 3-4 hours

---

#### Day 1, Step 1: Initialize Next.js Project

**Time**: 15 minutes

**What you're doing**: Creating the base Next.js 14 application with TypeScript and Tailwind CSS.

**Commands**:

```bash
# Make sure you're in the project directory
cd ~/Documents/toronto-career-consulting

# Initialize Next.js (this will add files to existing repo)
npx create-next-app@latest . --typescript --tailwind --app --no-src

# When prompted, answer:
# ✅ TypeScript? Yes
# ✅ ESLint? Yes
# ✅ Tailwind CSS? Yes
# ✅ `src/` directory? No (we'll use app/ directory)
# ✅ App Router? Yes
# ❌ customize default import alias? No
# ⚠️ Overwrite existing files? Yes (it's safe, we only have .gitignore and README)
```

**What this creates**:

- `app/` folder - Next.js 14 App Router
- `public/` folder - Static assets
- `tailwind.config.ts` - Tailwind configuration
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies
- `next.config.js` - Next.js configuration

**✅ Verification**:

```bash
npm run dev
```

- Open http://localhost:3000
- You should see the Next.js welcome page
- Press `Ctrl+C` to stop the server

---

#### Day 1, Step 2: Install All Dependencies

**Time**: 10 minutes

**What you're doing**: Installing all libraries needed for the project in one go.

**Commands**:

```bash
# Supabase (database & auth)
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs @supabase/ssr

# Internationalization
npm install next-intl

# Animations
npm install framer-motion

# UI Components & Icons
npm install lucide-react class-variance-authority clsx tailwind-merge

# Radix UI primitives (for dialogs, dropdowns, etc.)
npm install @radix-ui/react-dropdown-menu @radix-ui/react-dialog @radix-ui/react-select @radix-ui/react-slot @radix-ui/react-label

# Form handling & validation
npm install react-hook-form zod @hookform/resolvers

# Toast notifications
npm install sonner
```

**✅ Verification**:

```bash
# Check package.json
cat package.json | grep supabase
# Should see @supabase packages
```

---

#### Day 1, Step 3: Create Environment Variables File

**Time**: 5 minutes

**What you're doing**: Storing Supabase credentials securely in a local file.

**Create**: `.env.local` in the root directory

**Pseudocode**:

```bash
# Copy your Supabase credentials from earlier
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

**In VS Code**:

1. Click "New File" in root directory
2. Name it `.env.local`
3. Add the three environment variables above
4. Replace with YOUR actual values from Supabase
5. Save the file (`Cmd+S` or `Ctrl+S`)

**✅ Verification**:

```bash
# This file should NOT be tracked by git
git status
# .env.local should NOT appear in the list (it's in .gitignore)
```

⚠️ **CRITICAL**: Never commit `.env.local` to GitHub!

---

#### Day 1, Step 4: Setup TypeScript Type Definitions

**Time**: 10 minutes

**What you're doing**: Defining the data structures (interfaces) used throughout the app.

**Create**: `src/types/index.ts`

**Pseudocode**:

```typescript
// Course represents a training program
export interface Course {
  id: string; // UUID from database
  slug: string; // URL-friendly identifier (e.g., "digital-marketing")
  title_en: string; // English title
  title_zh: string | null; // Chinese title (optional)
  description_en: string | null; // English description
  description_zh: string | null; // Chinese description
  key_learning_en: string[]; // Array of learning points (English)
  key_learning_zh: string[] | null; // Array of learning points (Chinese)
  career_pathways_en: string[]; // Career options (English)
  career_pathways_zh: string[] | null;
  employment_outlook_en: string | null;
  employment_outlook_zh: string | null;
  salary_range: string | null; // e.g., "$45,000-$55,000"
  category: string | null; // e.g., "business", "technology"
  created_at: string; // ISO timestamp
  updated_at: string;
  is_published: boolean; // Show on public site?
}

// Translation for UI text (navigation, buttons, etc.)
export interface Translation {
  id: string;
  key: string; // e.g., "nav.home"
  value_en: string; // English value
  value_zh: string | null; // Chinese value
  category: string | null; // e.g., "navigation", "common"
  created_at: string;
  updated_at: string;
}

// Language can only be 'en' or 'zh'
export type Language = "en" | "zh";

// Shape of the Language Context
export interface LanguageContextType {
  language: Language; // Current language
  setLanguage: (lang: Language) => void; // Function to change language
  t: (key: string, fallback?: string) => string; // Translation function
}
```

**AI Prompt for Copilot**:

```
Create src/types/index.ts with TypeScript interfaces for:

1. Course interface matching the Supabase courses table:
   - id, slug, title_en, title_zh (nullable)
   - description_en, description_zh (nullable)
   - key_learning_en (string array), key_learning_zh (nullable string array)
   - career_pathways_en (string array), career_pathways_zh (nullable)
   - employment_outlook_en, employment_outlook_zh (nullable)
   - salary_range, category (nullable)
   - created_at, updated_at (string)
   - is_published (boolean)

2. Translation interface matching translations table:
   - id, key, value_en, value_zh (nullable), category (nullable)
   - created_at, updated_at

3. Language type: union of 'en' | 'zh'

4. LanguageContextType interface:
   - language: Language
   - setLanguage: (lang: Language) => void
   - t: (key: string, fallback?: string) => string

Export all interfaces and types.
Use strict TypeScript with proper null handling.
```

**✅ Verification**:

- File created at `src/types/index.ts`
- No TypeScript errors in VS Code

---

#### Day 1, Step 5: Create Supabase Client (Browser)

**Time**: 10 minutes

**What you're doing**: Creating a Supabase client for use in browser/client components.

**Create**: `src/lib/supabase.ts`

**Pseudocode**:

```typescript
// Import the Supabase client library
import { createClient } from "@supabase/supabase-js";

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create a singleton Supabase client instance
// This will be used in client components and API routes
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function: Get current user session
export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

// Helper function: Sign out current user
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
```

**AI Prompt for Copilot**:

```
Create src/lib/supabase.ts for client-side Supabase operations:

1. Import createClient from @supabase/supabase-js
2. Get NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY from environment
3. Create and export a supabase client using createClient()
4. Export async helper function getSession() that:
   - Calls supabase.auth.getSession()
   - Throws error if failed
   - Returns the session data
5. Export async helper function signOut() that:
   - Calls supabase.auth.signOut()
   - Throws error if failed

Use TypeScript with proper error handling.
```

**✅ Verification**:

- File created at `src/lib/supabase.ts`
- No import errors

---

#### Day 1, Step 6: Create Supabase Server Client

**Time**: 10 minutes

**What you're doing**: Creating a server-side Supabase client for server components and API routes.

**Create**: `src/lib/supabase-server.ts`

**Pseudocode**:

```typescript
// Import server client creator from Supabase SSR
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

// Function to create server-side Supabase client
// This handles cookies properly in Next.js 14 App Router
export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Read cookie value
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        // Set cookie value
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Handle cookie setting errors (can happen in Server Components)
          }
        },
        // Remove cookie
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            // Handle cookie removal errors
          }
        },
      },
    },
  );
}
```

**AI Prompt for Copilot**:

```
Create src/lib/supabase-server.ts for server-side Supabase operations in Next.js 14 App Router:

1. Import createServerClient and CookieOptions from '@supabase/ssr'
2. Import cookies from 'next/headers'
3. Export function createClient() that:
   - Gets cookie store using cookies()
   - Returns createServerClient with:
     - NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
     - cookies object with get, set, remove methods
     - get: returns cookieStore.get(name)?.value
     - set: calls cookieStore.set() with try-catch
     - remove: calls cookieStore.set() with empty value and try-catch

Use TypeScript with proper typing.
Handle errors gracefully in set/remove (they can fail in Server Components).
```

**✅ Verification**:

- File created at `src/lib/supabase-server.ts`
- No TypeScript errors

---

#### Day 1, Step 7: Create Language Context

**Time**: 20 minutes

**What you're doing**: Creating React Context to manage language state (English/Chinese) across the app.

**Create**: `src/contexts/LanguageContext.tsx`

**Pseudocode**:

```typescript
"use client"; // This is a client component

import React, { createContext, useState, useContext, useEffect } from "react";
import type { Language, LanguageContextType } from "@/types";

// Create the context (initially undefined)
const LanguageContext = createContext(undefined);

// Provider component that wraps the app
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // State: current language (default to 'en')
  const [language, setLanguageState] = useState("en");

  // State: translations loaded from database (we'll implement fetching later)
  const [translations, setTranslations] = useState<Record>({});

  // On component mount: load saved language from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("preferred-language");
    if (saved === "en" || saved === "zh") {
      setLanguageState(saved);
    }
  }, []);

  // Function to change language
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("preferred-language", lang);
  };

  // Translation function: t(key, fallback)
  // - key: translation key like "nav.home"
  // - fallback: default text if translation not found
  const t = (key: string, fallback?: string) => {
    // If English, just return the fallback or key
    if (language === "en") {
      return fallback || key;
    }

    // If Chinese, look up in translations object
    // If not found, return fallback or key
    return translations[key] || fallback || key;
  };

  // TODO: Load translations from Supabase
  // We'll implement this later when we have the translations table populated

  return { children };
}

// Hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
```

**AI Prompt for Copilot**:

```
Create src/contexts/LanguageContext.tsx as a client component:

1. Import React, createContext, useState, useContext, useEffect
2. Import Language and LanguageContextType from '@/types'
3. Create LanguageContext with createContext<LanguageContextType | undefined>()
4. Export LanguageProvider component that:
   - Takes children prop
   - Has state: language (Language type, default 'en')
   - Has state: translations (Record<string, string>, default {})
   - useEffect on mount: load 'preferred-language' from localStorage, set if valid
   - Function setLanguage: updates state and saves to localStorage
   - Function t(key: string, fallback?: string):
     - If language is 'en', return fallback or key
     - If language is 'zh', return translations[key] or fallback or key
   - Returns LanguageContext.Provider with value {language, setLanguage, t}
5. Export useLanguage() hook that:
   - Gets context with useContext
   - Throws error if used outside provider
   - Returns context

Use 'use client' directive at top.
Use TypeScript with proper typing.
```

**✅ Verification**:

- File created at `src/contexts/LanguageContext.tsx`
- No TypeScript errors
- File starts with `'use client'`

---

#### Day 1, Step 8: Update Root Layout

**Time**: 10 minutes

**What you're doing**: Wrapping the entire app with the LanguageProvider and adding toast notifications.

**Edit**: `app/layout.tsx`

**Pseudocode**:

```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { Toaster } from 'sonner'

// Load Inter font
const inter = Inter({ subsets: ['latin'] })

// Metadata for SEO
export const metadata: Metadata = {
  title: 'Toronto Career Consulting | 多伦多职业咨询',
  description: 'One-year career programs in Toronto',
}

// Root layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (


        {/* Wrap everything in LanguageProvider */}

          {children}
          {/* Toast notifications (positioned top-right) */}




  )
}
```

**AI Prompt for Copilot**:

```
Update app/layout.tsx:

1. Keep existing imports (Metadata, Inter, globals.css)
2. Import LanguageProvider from '@/contexts/LanguageContext'
3. Import Toaster from 'sonner'
4. Keep Inter font initialization
5. Update metadata:
   - title: 'Toronto Career Consulting | 多伦多职业咨询'
   - description: 'One-year career programs in Toronto'
6. In RootLayout component:
   - Wrap {children} with <LanguageProvider>
   - Add <Toaster position="top-right" /> inside LanguageProvider, after children
   - Keep html lang="en" and body className={inter.className}

Use TypeScript with proper types.
```

**✅ Verification**:

```bash
npm run dev
```

- Server starts without errors
- Visit http://localhost:3000
- No console errors in browser

---

#### Day 1, Step 9: Test the Setup

**Time**: 10 minutes

**What you're doing**: Verifying everything works before moving to Day 2.

**Test 1: Development Server**

```bash
npm run dev
```

- Should start on http://localhost:3000
- No errors in terminal

**Test 2: Supabase Connection**
Create a test file: `app/test-supabase/page.tsx`

```typescript
import { createClient } from '@/lib/supabase-server'

export default async function TestPage() {
  const supabase = createClient()
  const { data, error } = await supabase.from('courses').select('count')

  return (

      Supabase Test
      {error ? (
        Error: {error.message}
      ) : (
        ✅ Connection successful!
      )}

  )
}
```

Visit: http://localhost:3000/test-supabase

- Should see "✅ Connection successful!"
- Delete this test file after verification

**Test 3: Language Context**
Edit `app/page.tsx` temporarily:

```typescript
'use client'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Home() {
  const { language, setLanguage } = useLanguage()

  return (

      Current Language: {language}
      <button
        onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Toggle Language


  )
}
```

- Click the button
- Language should toggle between 'en' and 'zh'
- Refresh page - language should persist

**✅ Day 1 Complete!**

Commit your work:

```bash
git add .
git commit -m "Day 1: Initialize project, setup Supabase, create language context"
git push origin main
```

---

### 🎯 Development Day 2: Core UI Components

**Goal**: Build Header, Footer, and reusable UI components with bilingual support.

**Estimated Time**: 4-5 hours

---

#### Day 2, Step 1: Configure Tailwind CSS

**Time**: 15 minutes

**What you're doing**: Customizing Tailwind with brand colors, fonts, and animations.

**Edit**: `tailwind.config.ts`

**Pseudocode**:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary blue palette for professional look
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6", // Main blue
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Poppins", "Inter", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

**AI Prompt for Copilot**:

```
Update tailwind.config.ts with custom configuration:

1. Keep existing content paths, add './src/**/*.{js,ts,jsx,tsx,mdx}'
2. In theme.extend, add:
   - colors.primary: Full blue palette (50-900) with 500 as main blue (#3b82f6)
   - fontFamily.sans: ['Inter', 'system-ui', 'sans-serif']
   - fontFamily.heading: ['Poppins', 'Inter', 'sans-serif']
   - animation:
     - 'fade-in': 'fadeIn 0.5s ease-in-out'
     - 'slide-up': 'slideUp 0.5s ease-out'
     - 'slide-down': 'slideDown 0.5s ease-out'
   - keyframes:
     - fadeIn: from opacity 0 to 1
     - slideUp: from translateY(20px) opacity 0 to translateY(0) opacity 1
     - slideDown: from translateY(-20px) opacity 0 to translateY(0) opacity 1

Use TypeScript Config type.
```

**✅ Verification**:

```bash
npm run dev
```

- No build errors

---

#### Day 2, Step 2: Create Framer Motion Animation Variants

**Time**: 10 minutes

**What you're doing**: Creating reusable animation configurations for Framer Motion.

**Create**: `src/lib/animations.ts`

**Pseudocode**:

```typescript
// Reusable Framer Motion animation variants

// Fade in animation
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

// Slide up animation (from below)
export const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Slide down animation (from above)
export const slideDown = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Container that staggers children animations
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // 0.1s delay between each child
      delayChildren: 0.2, // Wait 0.2s before starting
    },
  },
};

// Scale animation on hover
export const scaleOnHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};

// Fade and scale combo
export const fadeScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};
```

**AI Prompt for Copilot**:

```
Create src/lib/animations.ts with Framer Motion variant objects:

Export these animation variants:
1. fadeIn: hidden (opacity 0), visible (opacity 1, duration 0.5s, ease easeInOut)
2. slideUp: hidden (opacity 0, y: 20), visible (opacity 1, y: 0, duration 0.5s)
3. slideDown: hidden (opacity 0, y: -20), visible (opacity 1, y: 0, duration 0.5s)
4. staggerContainer:
   - hidden: opacity 0
   - visible: opacity 1, staggerChildren 0.1s, delayChildren 0.2s
5. scaleOnHover: rest (scale 1), hover (scale 1.05, duration 0.2s)
6. fadeScale: hidden (opacity 0, scale 0.95), visible (opacity 1, scale 1, duration 0.3s)

Use TypeScript with proper Framer Motion types.
```

**✅ Verification**:

- File created
- No TypeScript errors

---

#### Day 2, Step 3: Create Header Component

**Time**: 30 minutes

**What you're doing**: Creating the main navigation header with bilingual support and mobile menu.

**Create**: `src/components/Header.tsx`

**Pseudocode**:

```typescript
'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { Menu, X, Globe } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const { language, setLanguage, t } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Function to toggle language
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en')
  }

  // Navigation items with translation keys
  const navItems = [
    { href: '/', label_en: 'Home', label_zh: '首页' },
    { href: '/courses', label_en: 'Explore Our Courses', label_zh: '浏览课程' },
    { href: '/contact', label_en: 'Contact Us', label_zh: '联系我们' },
  ]

  return (




          {/* Logo / Site Title */}

            {language === 'en'
              ? 'Toronto Career Consulting'
              : '多伦多职业咨询'
            }


          {/* Desktop Navigation */}

            {navItems.map(item => (

                {language === 'en' ? item.label_en : item.label_zh}

            ))}

            {/* Language Toggle Button */}



                {language === 'en' ? '中文' : 'EN'}



            {/* Admin Link */}

              {language === 'en' ? 'Admin' : '管理'}



          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-md transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (

            ) : (

            )}



        {/* Mobile Menu */}
        {mobileMenuOpen && (


              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition"
                >
                  {language === 'en' ? item.label_en : item.label_zh}

              ))}

              <button
                onClick={() => {
                  toggleLanguage()
                  setMobileMenuOpen(false)
                }}
                className="px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md transition flex items-center gap-2"
              >

                {language === 'en' ? 'Switch to Chinese' : '切换到英文'}


              <Link
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-md transition"
              >
                {language === 'en' ? 'Admin Login' : '管理员登录'}



        )}


  )
}
```

**AI Prompt for Copilot**:

```
Create src/components/Header.tsx as a client component:

1. Import: Link from next/link, useLanguage hook, useState
2. Import icons: Menu, X, Globe from lucide-react
3. Component state:
   - mobileMenuOpen: boolean
   - Get language, setLanguage from useLanguage()
4. Define navItems array:
   - Home (/, 首页)
   - Explore Our Courses (/courses, 浏览课程)
   - Contact Us (/contact, 联系我们)
5. Header structure:
   - Sticky header with white background and shadow
   - Container with flex layout
   - Logo/title (changes based on language)
   - Desktop nav (hidden on mobile):
     - Nav items with hover effects
     - Language toggle button with Globe icon
     - Admin link (small, gray text)
   - Mobile menu button (hamburger icon, only on mobile)
   - Mobile menu dropdown (when mobileMenuOpen is true):
     - Vertical nav items
     - Language toggle
     - Admin link
     - Close menu when item clicked
6. Styling:
   - Use Tailwind classes
   - Minimalist, clean design
   - Primary color for brand elements
   - Smooth transitions
   - animate-slide-down for mobile menu

Use 'use client' directive.
Use TypeScript with proper typing.
```

**✅ Verification**:

```bash
npm run dev
```

- Import Header in `app/page.tsx`
- Header should display
- Language toggle should work
- Mobile menu should work on narrow screens

---

#### Day 2, Step 4: Create Footer Component

**Time**: 20 minutes

**What you're doing**: Creating a simple footer with contact info and links.

**Create**: `src/components/Footer.tsx`

**Pseudocode**:

```typescript
'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { Mail, MapPin } from 'lucide-react'

export function Footer() {
  const { language } = useLanguage()

  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { href: '/', label_en: 'Home', label_zh: '首页' },
    { href: '/courses', label_en: 'Courses', label_zh: '课程' },
    { href: '/contact', label_en: 'Contact', label_zh: '联系' },
  ]

  return (




          {/* Contact Information */}


              {language === 'en' ? 'Contact' : '联系方式'}





                  secondcareerconsulting@gmail.com




                Toronto, Ontario, Canada




          {/* Quick Links */}


              {language === 'en' ? 'Quick Links' : '快捷链接'}


              {footerLinks.map(link => (


                    {language === 'en' ? link.label_en : link.label_zh}


              ))}



          {/* Copyright */}


              {language === 'en' ? 'About' : '关于'}


              {language === 'en'
                ? 'Professional career consulting and training programs in Toronto.'
                : '多伦多专业职业咨询与培训课程。'
              }


              © {currentYear} Toronto Career Consulting





  )
}
```

**AI Prompt for Copilot**:

```
Create src/components/Footer.tsx as a client component:

1. Import: Link, useLanguage hook
2. Import icons: Mail, MapPin from lucide-react
3. Get current year with new Date().getFullYear()
4. Define footerLinks array (Home, Courses, Contact with Chinese labels)
5. Footer structure:
   - Gray background (bg-gray-50) with top border
   - Three-column grid (1 col mobile, 3 on desktop):

     Column 1 - Contact:
     - Heading: "Contact" / "联系方式"
     - Email with Mail icon: secondcareerconsulting@gmail.com (mailto link)
     - Location with MapPin icon: Toronto, Ontario, Canada

     Column 2 - Quick Links:
     - Heading: "Quick Links" / "快捷链接"
     - List of footer links

     Column 3 - About:
     - Heading: "About" / "关于"
     - Brief description (bilingual)
     - Copyright notice with current year
6. Styling:
   - Container with padding
   - Text sizes: sm for links, xs for copyright
   - Gray text with hover effects
   - Icons with consistent sizing

Use 'use client' directive.
Use TypeScript.
```

**✅ Verification**:

- Import Footer in `app/page.tsx`
- Should display at bottom
- Links should work
- Language toggle should update text

---

#### Day 2, Step 5: Create Language Toggle Button Component

**Time**: 10 minutes

**What you're doing**: Creating a reusable language toggle button.

**Create**: `src/components/LanguageToggle.tsx`

**Pseudocode**:

```typescript
'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { Globe } from 'lucide-react'

interface LanguageToggleProps {
  variant?: 'default' | 'compact'
  className?: string
}

export function LanguageToggle({ variant = 'default', className = '' }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en')
  }

  if (variant === 'compact') {
    return (

        {language === 'en' ? '中文' : 'EN'}

    )
  }

  return (



        {language === 'en' ? 'Switch to Chinese' : '切换到英文'}


  )
}
```

**AI Prompt for Copilot**:

```
Create src/components/LanguageToggle.tsx as a reusable button component:

1. Import useLanguage hook and Globe icon
2. Accept props:
   - variant?: 'default' | 'compact'
   - className?: string for additional styling
3. Get language and setLanguage from useLanguage()
4. toggleLanguage function: switches between 'en' and 'zh'
5. Two variants:
   - compact: Small button showing "中文" or "EN"
   - default: Button with Globe icon and full text "Switch to Chinese" / "切换到英文"
6. Styling:
   - Border with hover effects
   - Smooth transitions
   - Accessible aria-label
   - Merge className prop with default classes

Use 'use client' directive.
Use TypeScript with prop types.
```

**✅ Verification**:

- Component created
- Can be imported and used in other components

---

#### Day 2, Step 6: Update Homepage with Header and Footer

**Time**: 10 minutes

**What you're doing**: Adding Header and Footer to the homepage.

**Edit**: `app/page.tsx`

**Pseudocode**:

```typescript
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function HomePage() {
  return (




        {/* Temporary content - we'll add the hero section tomorrow */}


            Welcome to Toronto Career Consulting


            We'll add the animated hero section next!






  )
}
```

**AI Prompt for Copilot**:

```
Update app/page.tsx to be a simple layout page:

1. Import Header and Footer components
2. Structure:
   - Wrapper div with min-h-screen and flex flex-col
   - Header component
   - Main section with flex-1:
     - Container with padding
     - Temporary heading and text (placeholder for hero)
   - Footer component
3. This creates a sticky footer layout (footer at bottom)

Use server component (no 'use client').
```

**✅ Verification**:

```bash
npm run dev
```

- Visit http://localhost:3000
- Should see Header, content, Footer
- Language toggle works
- Mobile menu works
- Footer stays at bottom

---

#### Day 2, Step 7: Commit Progress

**Time**: 5 minutes

```bash
git add .
git commit -m "Day 2: Create Header, Footer, and UI components with bilingual support"
git push origin main
```

**✅ Day 2 Complete!**

---

### 🎯 Development Day 3: Animated Hero & Course Card

**Goal**: Create the animated homepage hero section and course card component.

**Estimated Time**: 4 hours

---

#### Day 3, Step 1: Create Animated Hero Component

**Time**: 35 minutes

**What you're doing**: Building the homepage hero with Framer Motion animations.

**Create**: `src/components/AnimatedHero.tsx`

**Pseudocode**:

```typescript
'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { fadeIn, slideUp } from '@/lib/animations'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function AnimatedHero() {
  const { language } = useLanguage()

  return (


      {/* Background decoration */}







        {/* Main Heading with slide-up animation */}

          {language === 'en'
            ? (
              <>
                Build Your Career

                in One Year
              </>
            )
            : (
              <>
                用一年时间

                开启稳定职业道路
              </>
            )
          }


        {/* Subtitle with fade-in animation (delayed) */}

          {language === 'en'
            ? 'Practical. Career-Focused. Toronto-Based.'
            : '实用 · 就业导向 · 立足多伦多'
          }


        {/* Description */}

          {language === 'en'
            ? 'Our one-year programs are designed to help you gain job-ready skills and confidently enter the Canadian workforce.'
            : '我们的成人职业教育课程以就业为核心，帮助学员在一年内掌握实用技能，顺利进入加拿大职场。'
          }


        {/* CTA Buttons with fade-in animation (more delayed) */}


            {language === 'en' ? 'Explore Programs' : '浏览课程'}




            {language === 'en' ? 'Request Information' : '获取课程资料'}



        {/* Statistics (optional, can be added later) */}


            25+

              {language === 'en' ? 'Career Programs' : '职业课程'}



            1

              {language === 'en' ? 'Year Duration' : '年制课程'}



            100%

              {language === 'en' ? 'Job-Focused' : '就业导向'}





  )
}
```

**AI Prompt for Copilot**:

```
Create src/components/AnimatedHero.tsx as a client component:

1. Import: motion from framer-motion, useLanguage hook, fadeIn and slideUp from animations, Link, ArrowRight icon
2. Get current language from useLanguage()
3. Section structure:
   - Full viewport height (min-h-[85vh])
   - Gradient background: blue-50 to indigo-50 to purple-50
   - Background decorations: two blurred circles for visual interest
   - Container with centered text
4. Animated elements using Framer Motion:
   - Heading (slideUp animation):
     - EN: "Build Your Career / in One Year" (second line primary color)
     - ZH: "用一年时间 / 开启稳定职业道路"
     - Large responsive font (4xl to 7xl)
   - Subtitle (fadeIn, delay 0.3s):
     - EN: "Practical. Career-Focused. Toronto-Based."
     - ZH: "实用 · 就业导向 · 立足多伦多"
   - Description (fadeIn, delay 0.5s):
     - Full description in both languages
   - CTA buttons (fadeIn, delay 0.7s):
     - Primary button: "Explore Programs" → /courses (with ArrowRight icon)
     - Secondary button: "Request Information" → /contact (outlined)
     - Responsive: column on mobile, row on desktop
   - Statistics (fadeIn, delay 0.9s):
     - 25+ Programs, 1 Year, 100% Job-Focused
     - Three-column grid
5. Styling:
   - Modern, professional design
   - Smooth animations
   - Hover effects on buttons
   - Responsive typography

Use 'use client' directive.
Use TypeScript.
```

**✅ Verification**:

- Component created
- Import and use in `app/page.tsx`
- Animations should play on page load
- Buttons should link correctly

---

#### Day 3, Step 2: Create Course Card Component

**Time**: 30 minutes

**What you're doing**: Building a reusable card to display course information.

**Create**: `src/components/CourseCard.tsx`

**Pseudocode**:

```typescript
'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import type { Course } from '@/types'
import Link from 'next/link'
import { ArrowRight, DollarSign, Briefcase } from 'lucide-react'

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  const { language } = useLanguage()

  // Get bilingual content based on current language
  const title = (language === 'zh' && course.title_zh)
    ? course.title_zh
    : course.title_en

  const description = (language === 'zh' && course.description_zh)
    ? course.description_zh
    : course.description_en

  const careerPathways = (language === 'zh' && course.career_pathways_zh)
    ? course.career_pathways_zh
    : course.career_pathways_en

  // Helper to format category for display
  const formatCategory = (cat: string | null) => {
    if (!cat) return null
    const categoryNames: Record = {
      'business': { en: 'Business', zh: '商业' },
      'healthcare': { en: 'Healthcare', zh: '医疗' },
      'technology': { en: 'Technology', zh: '技术' },
      'trades': { en: 'Trades', zh: '技能' },
    }
    return categoryNames[cat]?.[language] || cat
  }

  return (

      {/* Category Badge */}
      {course.category && (


            {formatCategory(course.category)}


      )}

      {/* Course Title */}

        {title}


      {/* Description (truncated) */}

        {description}


      {/* Salary Range */}
      {course.salary_range && (


          {course.salary_range}

      )}

      {/* Career Pathways */}
      {careerPathways && careerPathways.length > 0 && (



            {language === 'en' ? 'Career Paths:' : '职业方向：'}


            {careerPathways.slice(0, 3).map((path, i) => (

                {path}

            ))}
            {careerPathways.length > 3 && (

                +{careerPathways.length - 3}

            )}


      )}

      {/* Learn More Link */}

        {language === 'en' ? 'Learn More' : '了解更多'}



  )
}
```

**AI Prompt for Copilot**:

```
Create src/components/CourseCard.tsx:

1. Import: motion from framer-motion, useLanguage hook, Course type, Link
2. Import icons: ArrowRight, DollarSign, Briefcase from lucide-react
3. Accept props: course (Course type)
4. Get current language from useLanguage()
5. Extract bilingual content:
   - title: use title_zh if language is 'zh' and exists, else title_en
   - description: same pattern
   - careerPathways: same pattern
6. Helper function formatCategory: maps category codes to display names (EN/ZH)
7. Card structure (with Framer Motion hover effect):
   - White background, rounded, border
   - Hover: lift up (-4px) and shadow

   Components:
   - Category badge (if exists): colored pill at top
   - Title: large, bold, hover changes to primary color
   - Description: gray text, truncated to 3 lines (line-clamp-3)
   - Salary range (if exists): with DollarSign icon, green color
   - Career pathways (if exist):
     - "Career Paths" label with Briefcase icon
     - Show first 3 as pills
     - Show "+X" if more than 3
   - "Learn More" link:
     - Links to /courses/[slug]
     - Primary color with arrow icon
     - Arrow animates on hover

8. Styling:
   - Use flex-col with flex-grow for description
   - mt-auto for "Learn More" link (pushes to bottom)
   - Consistent spacing
   - Hover effects

Use 'use client' directive.
Use TypeScript with Course interface.
```

**✅ Verification**:

- Component created
- No TypeScript errors

---

#### Day 3, Step 3: Update Homepage with Hero

**Time**: 10 minutes

**What you're doing**: Adding the AnimatedHero to the homepage.

**Edit**: `app/page.tsx`

**Pseudocode**:

```typescript
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AnimatedHero } from '@/components/AnimatedHero'

export default function HomePage() {
  return (






        {/* Placeholder for featured courses - we'll add this next */}


            Featured Programs


            We'll add course cards here once we have data






  )
}
```

**AI Prompt for Copilot**:

```
Update app/page.tsx:

1. Import: Header, Footer, AnimatedHero components
2. Structure:
   - Wrapper div (min-h-screen, flex flex-col)
   - Header
   - Main (flex-1):
     - AnimatedHero component
     - Featured Programs section (placeholder):
       - Container with padding
       - Centered heading and text
   - Footer

Keep as server component (no 'use client').
```

**✅ Verification**:

```bash
npm run dev
```

- Visit http://localhost:3000
- Hero section should animate on load
- All animations should play smoothly
- Buttons should link correctly

---

#### Day 3, Step 4: Commit Progress

**Time**: 5 minutes

```bash
git add .
git commit -m "Day 3: Create animated hero section and course card component"
git push origin main
```

**✅ Day 3 Complete!**

Tomorrow we'll create the courses API, fetch real data, and build the courses listing page.

---

### 🎯 Development Day 4: API Routes & Courses Page

**Goal**: Create API endpoints for courses and build the courses listing page with search and filters.

**Estimated Time**: 5 hours

---

#### Day 4, Step 1: Create Courses API Route (GET)

**Time**: 30 minutes

**What you're doing**: Building the backend API to fetch courses from Supabase.

**Create**: `app/api/courses/route.ts`

**Pseudocode**:

```typescript
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

    // Create Supabase client
    const supabase = createClient();

    // Start building query
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
```

**AI Prompt for Copilot**:

```
Create app/api/courses/route.ts with a GET handler:

1. Import: createClient from lib/supabase-server, NextResponse from next/server
2. Export async GET function that accepts Request
3. Inside try-catch:
   - Parse URL searchParams to get 'category' and 'search' query params
   - Create Supabase client
   - Build query:
     - Select all from 'courses' table
     - Where is_published = true
     - If category provided and not 'all': filter by category
     - If search provided: use .or() to search in title_en, title_zh, description_en, description_zh (case-insensitive with .ilike)
     - Order by created_at descending
   - Execute query
   - If error, throw
   - Return NextResponse.json with {courses: data, count: data.length}
4. Catch block:
   - Log error
   - Return NextResponse.json with error message and 500 status

Use TypeScript with proper typing.
Add console.error for debugging.
```

**✅ Verification**:

- File created
- No TypeScript errors
- Test endpoint (we'll do this after seeding data)

---

#### Day 4, Step 2: Create Courses API Route (POST - Admin Only)

**Time**: 25 minutes

**What you're doing**: Building the API endpoint to create new courses (admin only).

**Continue editing**: `app/api/courses/route.ts`

**Pseudocode**:

```typescript
// Add this to the same file, after the GET function

// POST /api/courses
// Creates a new course (admin only)
export async function POST(request: Request) {
  try {
    const supabase = createClient();

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
```

**AI Prompt for Copilot**:

```
Add a POST handler to app/api/courses/route.ts (in the same file):

1. Export async POST function
2. Inside try-catch:
   - Create Supabase client
   - Get session with supabase.auth.getSession()
   - If no session or error: return 401 Unauthorized
   - Check if user is in admin_roles table:
     - Query admin_roles where user_id = session.user.id
     - If not found or error: return 403 Forbidden
   - Parse request body with request.json()
   - Validate: title_en and slug are required
   - If missing: return 400 Bad Request
   - Insert new course into courses table:
     - Map all fields from body
     - Use null for optional fields
     - Default is_published to true if not provided
   - Select and return the created course
   - If error: throw
   - Return 201 Created with course data
3. Catch block:
   - Log error
   - Return 500 with error message

Use TypeScript.
Add proper error handling for each step.
```

**✅ Verification**:

- Both GET and POST handlers in same file
- No TypeScript errors

---

#### Day 4, Step 3: Seed Initial Course Data

**Time**: 40 minutes

**What you're doing**: Creating a script to populate the database with initial courses from the document.

**Create**: `scripts/seedCourses.ts`

**Pseudocode**:

````typescript
import { createClient } from '@supabase/supabase-js'

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!  // Use service_role key for admin access

const supabase = createClient(supabaseUrl, supabaseKey)

// Course data from the document
const courses = [
  {
    slug: 'digital-marketing',
    title_en: 'Digital Marketing',
    title_zh: '数字营销',
    description_en: 'Provides practical skills in online marketing, analytics, and digital strategy.',
    description_zh: '本课程教授线上营销、数据分析及数字战略的实用技能。',
key_learning_en: ['Social media marketing', 'SEO and SEM', 'Content creation', 'Marketing analytics'],
key_learning_zh: ['社交媒体营销', '搜索引擎优化与营销', '内容创作', '营销数据分析'],
career_pathways_en: ['Digital Marketing Specialist', 'Marketing Coordinator', 'Social Media Manager'],
career_pathways_zh: ['数字营销专员', '市场协调员', '社交媒体经理'],
employment_outlook_en: 'High demand across businesses adapting to digital channels.',
employment_outlook_zh: '企业数字化转型推动该领域需求持续上升。',
salary_range: '$45,000–$65,000',
category: 'business',
is_published: true,
},
{
slug: 'accounting-clerk',
title_en: 'Accounting Clerk',
title_zh: '会计文员',
description_en: 'Prepares students for entry-level accounting and bookkeeping roles.',
description_zh: '本课程帮助学员进入会计及记账相关的入门岗位。',
key_learning_en: ['Accounts payable/receivable', 'Payroll basics', 'Accounting software', 'Financial records'],
key_learning_zh: ['应收应付账款', '薪资基础', '会计软件', '财务记录'],
career_pathways_en: ['Accounting Clerk', 'Bookkeeper', 'Payroll Assistant'],
career_pathways_zh: ['会计文员', '记账员', '薪资助理'],
employment_outlook_en: 'Stable demand across small and medium-sized businesses.',
employment_outlook_zh: '中小型企业对该岗位长期保持稳定需求。',
salary_range: '$42,000–$55,000',
category: 'business',
is_published: true,
},
// Add more courses here following the same pattern
// You can add all 25 courses from the document
]
async function seedCourses() {
console.log('🌱 Starting course seeding...')
try {
// Check connection
const { data: testData, error: testError } = await supabase
.from('courses')
.select('count')
.limit(1)
if (testError) {
  console.error('❌ Database connection failed:', testError)
  process.exit(1)
}

console.log('✅ Database connection successful')

// Delete existing courses (optional - be careful!)
// const { error: deleteError } = await supabase.from('courses').delete().neq('id', '00000000-0000-0000-0000-000000000000')
// if (deleteError) console.error('Warning: Could not clear existing courses:', deleteError)

// Insert courses
console.log(`📝 Inserting ${courses.length} courses...`)

const { data, error } = await supabase
  .from('courses')
  .insert(courses)
  .select()

if (error) {
  console.error('❌ Insert failed:', error)
  process.exit(1)
}

console.log(`✅ Successfully inserted ${data?.length || 0} courses`)
console.log('🎉 Seeding complete!')
} catch (error) {
console.error('❌ Seeding failed:', error)
process.exit(1)
}
}
// Run the seed function
seedCourses()

**AI Prompt for Copilot**:
Create scripts/seedCourses.ts to populate the database with initial course data:

Import createClient from @supabase/supabase-js
Get environment variables: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
Create Supabase client with service_role key (for admin access)
Define courses array with data from the Google Doc:

Include at least 5-10 sample courses
Each course should have all fields: slug, title_en, title_zh, description_en, description_zh, key_learning arrays, career_pathways arrays, employment_outlook, salary_range, category, is_published


Create async seedCourses function:

Test database connection
Log progress to console
Insert courses with supabase.from('courses').insert()
Handle errors
Exit with appropriate status code


Call seedCourses() at the end

Use TypeScript.
Add helpful console.log messages with emojis.

**Add script to package.json**:

Edit `package.json` and add to "scripts":
```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "seed": "tsx scripts/seedCourses.ts"
}
````

**Install tsx** (to run TypeScript scripts):

```bash
npm install -D tsx
```

**Run the seed script**:

```bash
npm run seed
```

**✅ Verification**:

- Script runs without errors
- Check Supabase Table Editor → courses table should have data
- Visit http://localhost:3000/api/courses in browser
- Should see JSON with courses array

---

#### Day 4, Step 4: Create Courses Listing Page

**Time**: 45 minutes

**What you're doing**: Building the main courses page with search and filtering.

**Create**: `app/courses/page.tsx`

**Pseudocode**:

```typescript
'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CourseCard } from '@/components/CourseCard'
import { useLanguage } from '@/contexts/LanguageContext'
import type { Course } from '@/types'
import { Search, Filter } from 'lucide-react'

export default function CoursesPage() {
  const { language } = useLanguage()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Categories for filtering
  const categories = [
    { value: 'all', label_en: 'All Programs', label_zh: '所有课程' },
    { value: 'business', label_en: 'Business', label_zh: '商业' },
    { value: 'healthcare', label_en: 'Healthcare', label_zh: '医疗' },
    { value: 'technology', label_en: 'Technology', label_zh: '技术' },
    { value: 'trades', label_en: 'Trades & Services', label_zh: '技能与服务' },
  ]

  // Fetch courses when filters change
  useEffect(() => {
    fetchCourses()
  }, [selectedCategory, searchTerm])

  async function fetchCourses() {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (selectedCategory !== 'all') {
        params.append('category', selectedCategory)
      }
      if (searchTerm.trim()) {
        params.append('search', searchTerm)
      }

      const response = await fetch(`/api/courses?${params}`)
      const data = await response.json()

      if (response.ok) {
        setCourses(data.courses || [])
      } else {
        console.error('Failed to fetch courses:', data.error)
      }
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setLoading(false)
    }
  }

  // Debounced search (wait 500ms after user stops typing)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== undefined) {
        fetchCourses()
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-12">

          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold text-gray-900 mb-2">
              {language === 'en' ? 'Explore Our Programs' : '浏览我们的课程'}
            </h1>
            <p className="text-gray-600">
              {language === 'en'
                ? 'Browse our comprehensive selection of one-year career programs'
                : '浏览我们全面的一年制职业培训课程'
              }
            </p>
          </div>

          {/* Filters Section */}
          <div className="mb-8 space-y-4">

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={language === 'en' ? 'Search programs...' : '搜索课程...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <div className="flex gap-2 flex-wrap">
                {categories.map(cat => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      selectedCategory === cat.value
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {language === 'en' ? cat.label_en : cat.label_zh}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          {!loading && (
            <div className="mb-4 text-sm text-gray-600">
              {language === 'en'
                ? `Showing ${courses.length} program${courses.length !== 1 ? 's' : ''}`
                : `显示 ${courses.length} 个课程`
              }
            </div>
          )}

          {/* Courses Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">
                {language === 'en'
                  ? 'No programs found. Try adjusting your filters.'
                  : '未找到课程。请尝试调整筛选条件。'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
```

**AI Prompt for Copilot**:
Create app/courses/page.tsx as a client component:

Import: useState, useEffect, Header, Footer, CourseCard, useLanguage, Course type
Import icons: Search, Filter from lucide-react
Component state:

courses: Course[]
loading: boolean
searchTerm: string
selectedCategory: string (default 'all')

Define categories array (all, business, healthcare, technology, trades) with EN/ZH labels
useEffect to fetch courses when category or searchTerm changes
fetchCourses async function:

Build URLSearchParams with category and search
Fetch from /api/courses with params
Update courses state
Handle errors

Search debouncing: useEffect with 500ms setTimeout for searchTerm
Page structure:

Header
Main section:

Page title and description
Search input (with Search icon)
Category filter buttons (with active state styling)
Results count
Loading spinner while fetching
Empty state if no results
Grid of CourseCard components (1 col mobile, 2 tablet, 3 desktop)

Footer

Styling:

Gray background for main
White cards/inputs
Primary color for active filters
Smooth transitions

Use 'use client' directive.
Use TypeScript with proper typing.

**✅ Verification**:

```bash
npm run dev
```

- Visit http://localhost:3000/courses
- Should see all courses
- Search should work (with 500ms debounce)
- Category filters should work
- Loading state should appear briefly

---

#### Day 4, Step 5: Update Homepage with Featured Courses

**Time**: 15 minutes

**What you're doing**: Adding a featured courses section to the homepage.

**Edit**: `app/page.tsx`

**Pseudocode**:

```typescript
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AnimatedHero } from '@/components/AnimatedHero'
import { CourseCard } from '@/components/CourseCard'
import { createClient } from '@/lib/supabase-server'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default async function HomePage() {
  // Fetch first 6 published courses for featured section
  const supabase = createClient()
  const { data: courses } = await supabase
    .from('courses')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(6)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <AnimatedHero />

        {/* Featured Programs Section */}
        <section className="container mx-auto px-4 py-16 bg-white">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Featured Programs
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our most popular one-year career training programs designed to help you enter the Canadian workforce
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {courses?.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
            >
              View All Programs
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
```

**AI Prompt for Copilot**:
Update app/page.tsx to show featured courses:

Import: Header, Footer, AnimatedHero, CourseCard, createClient from lib/supabase-server, Link, ArrowRight icon
Make it an async server component
Fetch 6 most recent published courses using Supabase
Structure:

Header
Main:

AnimatedHero
Featured Programs section:

Centered heading and description
Grid of CourseCard components (1/2/3 cols)
"View All Programs" button linking to /courses

Footer

Keep as server component (no 'use client').
Use TypeScript.

**✅ Verification**:

- Homepage shows featured courses
- "View All Programs" links to /courses page
- Course cards display correctly

---

#### Day 4, Step 6: Commit Day 4 Progress

**Time**: 5 minutes

```bash
git add .
git commit -m "Day 4: Create courses API, seed data, build courses listing page"
git push origin main
```

**✅ Day 4 Complete!**

---

### 🎯 Development Day 5: Contact Page & Admin Login

**Goal**: Build contact form and admin authentication.

**Estimated Time**: 3-4 hours

---

#### Day 5, Step 1: Create Contact Page

**Time**: 35 minutes

**What you're doing**: Building a contact form for inquiries.

**Create**: `app/contact/page.tsx`

**Pseudocode**:

```typescript
'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useLanguage } from '@/contexts/LanguageContext'
import { toast } from 'sonner'
import { Mail, MapPin, Send } from 'lucide-react'

export default function ContactPage() {
  const { language } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interestedCourse: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission (add actual email service later if needed)
    setTimeout(() => {
      toast.success(
        language === 'en'
          ? 'Thank you! We will contact you soon.'
          : '感谢您的联系！我们会尽快回复。'
      )
      setFormData({ name: '', email: '', phone: '', interestedCourse: '', message: '' })
      setLoading(false)
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">

            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">
                {language === 'en' ? 'Contact Us' : '联系我们'}
              </h1>
              <p className="text-gray-600 text-lg">
                {language === 'en'
                  ? 'Get in touch to learn more about our programs'
                  : '联系我们了解更多课程信息'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* Contact Information */}
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
                  {language === 'en' ? 'Get in Touch' : '联系方式'}
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {language === 'en' ? 'Email' : '电子邮件'}
                      </h3>
                      <a
                        href="mailto:secondcareerconsulting@gmail.com"
                        className="text-primary-600 hover:text-primary-700 hover:underline"
                      >
                        secondcareerconsulting@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {language === 'en' ? 'Location' : '地址'}
                      </h3>
                      <p className="text-gray-600">
                        Toronto, Ontario, Canada
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mt-8 pt-8 border-t">
                  <p className="text-sm text-gray-600">
                    {language === 'en'
                      ? 'We typically respond within 24-48 hours. Feel free to reach out with any questions about our programs.'
                      : '我们通常在24-48小时内回复。如有任何关于课程的问题，请随时联系我们。'
                    }
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
                  {language === 'en' ? 'Send us a Message' : '发送消息'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'en' ? 'Name' : '姓名'} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'en' ? 'Email' : '电子邮件'} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'en' ? 'Phone' : '电话'}
                      <span className="text-gray-400 ml-1">
                        ({language === 'en' ? 'optional' : '可选'})
                      </span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="interestedCourse" className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'en' ? 'Interested Program' : '感兴趣的课程'}
                      <span className="text-gray-400 ml-1">
                        ({language === 'en' ? 'optional' : '可选'})
                      </span>
                    </label>
                    <input
                      type="text"
                      id="interestedCourse"
                      name="interestedCourse"
                      value={formData.interestedCourse}
                      onChange={handleChange}
                      placeholder={language === 'en' ? 'e.g., Digital Marketing' : '例如：数字营销'}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'en' ? 'Message' : '留言'} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        {language === 'en' ? 'Sending...' : '发送中...'}
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        {language === 'en' ? 'Send Message' : '发送消息'}
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
```

**AI Prompt for Copilot**:
Create app/contact/page.tsx as a client component:

Import: useState, Header, Footer, useLanguage, toast from sonner
Import icons: Mail, MapPin, Send from lucide-react
Component state:

loading: boolean
formData: {name, email, phone, interestedCourse, message}

handleSubmit function:

Prevent default
Set loading true
Simulate submission with setTimeout (1s)
Show success toast
Clear form
Set loading false

Page structure:

Header
Main (gray background):

Page title and description
Two-column layout (1 col mobile, 2 on desktop):
Left Column - Contact Info:

"Get in Touch" heading
Email with Mail icon (mailto link)
Location with MapPin icon
Additional info text

Right Column - Contact Form:

"Send us a Message" heading
Form fields:

Name (required)
Email (required)
Phone (optional)
Interested Program (optional)
Message (required textarea)

Submit button with Send icon and loading state

Footer

Styling:

White cards with rounded corners and shadows
Primary blue for links and button
Proper focus states on inputs
Responsive layout

Use 'use client' directive.
Use TypeScript with proper typing.
All labels and placeholders bilingual.

**✅ Verification**:

```bash
npm run dev
```

- Visit http://localhost:3000/contact
- Form should work
- Toast notification appears on submit
- Form clears after submission

---

#### Day 5, Step 2: Create Admin Login Page

**Time**: 30 minutes

**What you're doing**: Building the admin login form with Supabase authentication.

**Create**: `app/admin/login/page.tsx`

**Pseudocode**:

```typescript
'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { LogIn, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function AdminLoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Sign in with Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error) throw error

      // Check if user is admin
      const { data: adminCheck, error: adminError } = await supabase
        .from('admin_roles')
        .select('*')
        .eq('user_id', data.user.id)
        .single()

      if (adminError || !adminCheck) {
        // Not an admin - sign them out
        await supabase.auth.signOut()
        throw new Error('You are not authorized as an admin')
      }

      toast.success('Login successful! Redirecting...')
      router.push('/admin/dashboard')

    } catch (error: any) {
      console.error('Login error:', error)
      toast.error(error.message || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-indigo-100 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">

        {/* Back to Website Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-6 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Website
        </Link>

        {/* Login Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn className="h-8 w-8 text-primary-600" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-gray-900 mb-2">
            Admin Login
          </h1>
          <p className="text-gray-600">
            Sign in to access the admin dashboard
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Signing in...
              </>
            ) : (
              <>
                <LogIn className="h-5 w-5" />
                Sign In
              </>
            )}
          </button>
        </form>

        {/* Security Notice */}
        <p className="text-xs text-center text-gray-500 mt-6">
          This area is restricted to authorized administrators only.
        </p>
      </div>
    </div>
  )
}
```

**AI Prompt for Copilot**:
Create app/admin/login/page.tsx as a client component:

Import: useState, supabase client, useRouter, toast, LogIn and ArrowLeft icons, Link
Component state: loading (boolean), formData ({email, password})
handleSubmit async function:

Prevent default
Set loading true
Call supabase.auth.signInWithPassword()
If error, throw
Check if user is in admin_roles table
If not admin, sign out and throw error
If success, show toast and redirect to /admin/dashboard
Catch block: show error toast
Finally: set loading false

Page structure:

Centered login card on gradient background
"Back to Website" link at top
Login icon in circle
Heading and description
Form:

Email input
Password input
Submit button with loading state

Security notice at bottom

Styling:

White card with shadow on gradient background
Primary blue accent colors
Proper focus states
Responsive padding

Use 'use client' directive.
Use TypeScript with proper typing.

**✅ Verification**:

- Visit http://localhost:3000/admin/login
- Try logging in with your admin credentials (from Supabase setup)
- Should redirect to /admin/dashboard (we'll create this next)
- Try with wrong credentials - should show error

---

#### Day 5, Step 3: Create Admin Middleware

**Time**: 20 minutes

**What you're doing**: Protecting admin routes with authentication middleware.

**Create**: `src/middleware.ts`

**Pseudocode**:

```typescript
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    },
  );

  // Check auth for /admin routes (except /admin/login)
  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    !request.nextUrl.pathname.startsWith("/admin/login")
  ) {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // No session - redirect to login
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // Check if user is admin
    const { data: adminCheck } = await supabase
      .from("admin_roles")
      .select("*")
      .eq("user_id", session.user.id)
      .single();

    // Not an admin - sign out and redirect to login
    if (!adminCheck) {
      await supabase.auth.signOut();
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: "/admin/:path*",
};
```

**AI Prompt for Copilot**:
Create src/middleware.ts to protect admin routes:

Import: createServerClient and CookieOptions from @supabase/ssr, NextResponse and NextRequest from next/server
Export async middleware function that accepts NextRequest
Create NextResponse
Create Supabase server client with cookie handling:

get: returns request.cookies.get(name)?.value
set: sets on both request and response cookies
remove: sets empty value on both

Check if pathname starts with '/admin' but NOT '/admin/login':

Get session with supabase.auth.getSession()
If no session: redirect to /admin/login
Check admin_roles table for user_id
If not admin: sign out and redirect to /admin/login

Return response
Export config with matcher: '/admin/:path\*'

Use TypeScript with proper typing.

**✅ Verification**:

- Try accessing http://localhost:3000/admin/dashboard without login
- Should redirect to /admin/login
- Log in, then try accessing /admin/dashboard
- Should NOT redirect (we'll create dashboard next)

---

#### Day 5, Step 4: Commit Day 5 Progress

**Time**: 5 minutes

```bash
git add .
git commit -m "Day 5: Create contact page, admin login, and auth middleware"
git push origin main
```

**✅ Day 5 Complete!**

Tomorrow we'll build the admin dashboard and course management interface!

🎯 Development Day 6: Admin Dashboard & Course Management
Goal: Build admin dashboard with statistics and create course management interface.
Estimated Time: 5-6 hours

Day 6, Step 1: Create Admin Dashboard Layout
Time: 20 minutes
What you're doing: Creating a shared layout for all admin pages with navigation.
Create: app/admin/layout.tsx
Pseudocode:
typescriptimport { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, BookOpen, Languages, LogOut, Home } from 'lucide-react'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Verify user is authenticated and is admin
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    redirect('/admin/login')
  }

  // Get admin info
  const { data: adminRole } = await supabase
    .from('admin_roles')
    .select('*')
    .eq('user_id', session.user.id)
    .single()

  if (!adminRole) {
    redirect('/admin/login')
  }

  const navItems = [
    { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/courses', icon: BookOpen, label: 'Courses' },
    { href: '/admin/translations', icon: Languages, label: 'Translations' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <h1 className="text-xl font-heading font-bold text-primary-600">
                Admin Panel
              </h1>
              
              {/* Navigation */}
              <nav className="hidden md:flex items-center gap-1">
                {navItems.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              {/* User Info */}
              <div className="text-sm text-gray-600">
                {session.user.email}
              </div>

              {/* View Website Link */}
              <Link
                href="/"
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition"
              >
                <Home className="h-4 w-4" />
                View Site
              </Link>

              {/* Logout Form */}
              <form action="/api/auth/signout" method="POST">
                <button 
                  type="submit"
                  className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 transition"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
AI Prompt for Copilot:
Create app/admin/layout.tsx as a server component:

1. Import: createClient from lib/supabase-server, redirect, Link
2. Import icons: LayoutDashboard, BookOpen, Languages, LogOut, Home from lucide-react
3. Make it an async component
4. Verify authentication:
   - Get session
   - If no session, redirect to /admin/login
   - Check admin_roles table
   - If not admin, redirect to /admin/login
5. Define navItems array (Dashboard, Courses, Translations)
6. Layout structure:
   - Header (white background, sticky):
     - Logo/title "Admin Panel"
     - Navigation links (desktop only)
     - User email
     - "View Site" link
     - Logout button
   - Main content area with children
7. Styling:
   - Gray background for main area
   - White header with border
   - Clean, professional admin interface

Use TypeScript.
This is a server component (no 'use client').
Create: app/api/auth/signout/route.ts
Pseudocode:
typescriptimport { createClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

export async function POST() {
  const supabase = createClient()
  await supabase.auth.signOut()
  return NextResponse.redirect(new URL('/admin/login', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'))
}
AI Prompt for Copilot:
Create app/api/auth/signout/route.ts:

1. Import createClient and NextResponse
2. Export async POST function
3. Create Supabase client
4. Call supabase.auth.signOut()
5. Redirect to /admin/login

Simple and straightforward.
✅ Verification:

Admin layout wraps all admin pages
Navigation shows on all admin pages
Logout button works



Day 6, Step 2: Create Admin Dashboard Page
Time: 40 minutes
What you're doing: Building the main admin dashboard with statistics and quick actions.
Create: app/admin/dashboard/page.tsx
Pseudocode:
typescriptimport { createClient } from '@/lib/supabase-server'
import Link from 'next/link'
import { BookOpen, FileText, Languages, Plus, ArrowRight } from 'lucide-react'

export default async function AdminDashboardPage() {
  const supabase = createClient()

  // Fetch statistics
  const [
    { count: totalCourses },
    { count: publishedCourses },
    { count: draftCourses },
    { count: totalTranslations },
    { count: missingTranslations },
    { data: recentCourses }
  ] = await Promise.all([
    supabase.from('courses').select('*', { count: 'exact', head: true }),
    supabase.from('courses').select('*', { count: 'exact', head: true }).eq('is_published', true),
    supabase.from('courses').select('*', { count: 'exact', head: true }).eq('is_published', false),
    supabase.from('translations').select('*', { count: 'exact', head: true }),
    supabase.from('translations').select('*', { count: 'exact', head: true }).is('value_zh', null),
    supabase.from('courses').select('*').order('created_at', { ascending: false }).limit(5)
  ])

  const stats = [
    {
      label: 'Total Courses',
      value: totalCourses || 0,
      icon: BookOpen,
      color: 'bg-blue-100 text-blue-600',
      href: '/admin/courses'
    },
    {
      label: 'Published',
      value: publishedCourses || 0,
      icon: FileText,
      color: 'bg-green-100 text-green-600',
      href: '/admin/courses'
    },
    {
      label: 'Drafts',
      value: draftCourses || 0,
      icon: FileText,
      color: 'bg-yellow-100 text-yellow-600',
      href: '/admin/courses'
    },
    {
      label: 'Translations',
      value: totalTranslations || 0,
      icon: Languages,
      color: 'bg-purple-100 text-purple-600',
      href: '/admin/translations'
    },
  ]

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome back! Here's an overview of your content.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Link
            key={index}
            href={stat.href}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600">
              {stat.label}
            </div>
          </Link>
        ))}
      </div>

      {/* Alert for Missing Translations */}
      {missingTranslations && missingTranslations > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Languages className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-yellow-900 mb-1">
                Missing Translations
              </h3>
              <p className="text-sm text-yellow-800 mb-3">
                You have {missingTranslations} translation{missingTranslations !== 1 ? 's' : ''} without Chinese values.
              </p>
              <Link
                href="/admin/translations"
                className="inline-flex items-center gap-1 text-sm font-medium text-yellow-900 hover:text-yellow-700"
              >
                Manage Translations
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-heading font-bold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/admin/courses"
            className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition group"
          >
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition">
              <Plus className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Add New Course
              </h3>
              <p className="text-sm text-gray-600">
                Create a new training program
              </p>
            </div>
          </Link>

          <Link
            href="/admin/courses"
            className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition group"
          >
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition">
              <BookOpen className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Manage Courses
              </h3>
              <p className="text-sm text-gray-600">
                Edit or delete existing courses
              </p>
            </div>
          </Link>

          <Link
            href="/admin/translations"
            className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition group"
          >
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition">
              <Languages className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Manage Translations
              </h3>
              <p className="text-sm text-gray-600">
                Update Chinese translations
              </p>
            </div>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition group"
          >
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition">
              <ArrowRight className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                View Website
              </h3>
              <p className="text-sm text-gray-600">
                See your live site
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Courses */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-heading font-bold text-gray-900 mb-4">
          Recent Courses
        </h2>
        {recentCourses && recentCourses.length > 0 ? (
          <div className="space-y-3">
            {recentCourses.map(course => (
              <Link
                key={course.id}
                href={`/admin/courses`}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-gray-50 transition"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {course.title_en}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {course.category || 'Uncategorized'}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    course.is_published 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {course.is_published ? 'Published' : 'Draft'}
                  </span>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-8">
            No courses yet. Create your first course!
          </p>
        )}
      </div>
    </div>
  )
}
AI Prompt for Copilot:
Create app/admin/dashboard/page.tsx as a server component:

1. Import: createClient, Link, icons (BookOpen, FileText, Languages, Plus, ArrowRight)
2. Fetch statistics using Promise.all:
   - Total courses count
   - Published courses count
   - Draft courses count
   - Total translations count
   - Missing translations count (where value_zh is null)
   - Recent 5 courses
3. Page structure:
   - Page header with title and description
   - Statistics cards (4 columns on desktop):
     * Total Courses (blue)
     * Published (green)
     * Drafts (yellow)
     * Translations (purple)
     Each card is clickable and shows icon, value, label
   - Alert banner if missing translations > 0
   - Quick Actions section (2x2 grid):
     * Add New Course
     * Manage Courses
     * Manage Translations
     * View Website
   - Recent Courses list:
     * Shows last 5 courses
     * Displays title, category, published status
     * Clickable to courses page
4. Styling:
   - White cards with shadows
   - Hover effects
   - Color-coded statistics
   - Professional admin UI

Use TypeScript.
Server component (no 'use client').
✅ Verification:
bashnpm run dev

Login to admin
Should redirect to /admin/dashboard
Statistics should display correctly
All links should work


Day 6, Step 3: Create Course Management Page
Time: 60 minutes
What you're doing: Building the course management interface with list, add, edit, delete functionality.
Create: app/admin/courses/page.tsx
Pseudocode:
typescript'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import { Plus, Edit, Trash2, Eye, EyeOff, Search } from 'lucide-react'
import type { Course } from '@/types'
import { CourseForm } from '@/components/admin/CourseForm'

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)

  useEffect(() => {
    fetchCourses()
  }, [])

  async function fetchCourses() {
    setLoading(true)
    try {
      // Fetch ALL courses (including unpublished) for admin
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setCourses(data || [])
    } catch (error: any) {
      console.error('Error fetching courses:', error)
      toast.error('Failed to load courses')
    } finally {
      setLoading(false)
    }
  }

  async function togglePublished(id: string, currentStatus: boolean) {
    try {
      const { error } = await supabase
        .from('courses')
        .update({ is_published: !currentStatus })
        .eq('id', id)

      if (error) throw error

      toast.success(`Course ${!currentStatus ? 'published' : 'unpublished'}`)
      fetchCourses()
    } catch (error: any) {
      console.error('Error toggling published:', error)
      toast.error('Failed to update course')
    }
  }

  async function deleteCourse(id: string, title: string) {
    if (!confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
      return
    }

    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast.success('Course deleted successfully')
      fetchCourses()
    } catch (error: any) {
      console.error('Error deleting course:', error)
      toast.error('Failed to delete course')
    }
  }

  // Filter courses by search term
  const filteredCourses = courses.filter(course =>
    course.title_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.title_zh?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            Manage Courses
          </h1>
          <p className="text-gray-600">
            Create, edit, and manage your training programs
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
        >
          <Plus className="h-5 w-5" />
          Add Course
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* Courses Table */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <p className="text-gray-600">
            {searchTerm ? 'No courses found matching your search.' : 'No courses yet. Create your first course!'}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Salary Range
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCourses.map(course => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">
                          {course.title_en}
                        </div>
                        {course.title_zh && (
                          <div className="text-sm text-gray-600">
                            {course.title_zh}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {course.category || 'Uncategorized'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {course.salary_range || 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        course.is_published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {course.is_published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => togglePublished(course.id, course.is_published)}
                          className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition"
                          title={course.is_published ? 'Unpublish' : 'Publish'}
                        >
                          {course.is_published ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          onClick={() => setEditingCourse(course)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteCourse(course.id, course.title_en)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Course Modal */}
      {(showAddModal || editingCourse) && (
        <CourseForm
          course={editingCourse}
          onClose={() => {
            setShowAddModal(false)
            setEditingCourse(null)
          }}
          onSuccess={() => {
            fetchCourses()
          }}
        />
      )}
    </div>
  )
}
AI Prompt for Copilot:
Create app/admin/courses/page.tsx as a client component:

1. Import: useState, useEffect, supabase, toast, icons, Course type, CourseForm component
2. Component state:
   - courses: Course[]
   - loading: boolean
   - searchTerm: string
   - showAddModal: boolean
   - editingCourse: Course | null
3. useEffect to fetch courses on mount
4. fetchCourses function: fetch ALL courses from Supabase
5. togglePublished function: update is_published field
6. deleteCourse function: delete with confirmation
7. Filter courses by searchTerm
8. Page structure:
   - Header with "Add Course" button
   - Search input
   - Table with course data and action buttons
   - Loading/empty states
   - CourseForm modal (shown when adding or editing)
9. Styling: Clean table design with hover effects

Use 'use client' directive.
Use TypeScript.

Day 6, Step 4: Create Course Form Component
Time: 70 minutes
What you're doing: Building a comprehensive form for adding and editing courses.
Create: src/components/admin/CourseForm.tsx
Pseudocode:
typescript'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import { X, Plus } from 'lucide-react'
import type { Course } from '@/types'

interface CourseFormProps {
  course?: Course | null
  onClose: () => void
  onSuccess: () => void
}

export function CourseForm({ course, onClose, onSuccess }: CourseFormProps) {
  const isEditing = !!course

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    slug: course?.slug || '',
    title_en: course?.title_en || '',
    title_zh: course?.title_zh || '',
    description_en: course?.description_en || '',
    description_zh: course?.description_zh || '',
    key_learning_en: course?.key_learning_en || [''],
    key_learning_zh: course?.key_learning_zh || [''],
    career_pathways_en: course?.career_pathways_en || [''],
    career_pathways_zh: course?.career_pathways_zh || [''],
    employment_outlook_en: course?.employment_outlook_en || '',
    employment_outlook_zh: course?.employment_outlook_zh || '',
    salary_range: course?.salary_range || '',
    category: course?.category || 'business',
    is_published: course?.is_published ?? true,
  })

  // Array helpers
  const addArrayItem = (field: 'key_learning_en' | 'key_learning_zh' | 'career_pathways_en' | 'career_pathways_zh') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }))
  }

  const updateArrayItem = (field: 'key_learning_en' | 'key_learning_zh' | 'career_pathways_en' | 'career_pathways_zh', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }))
  }

  const removeArrayItem = (field: 'key_learning_en' | 'key_learning_zh' | 'career_pathways_en' | 'career_pathways_zh', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Filter out empty strings from arrays
      const cleanData = {
        ...formData,
        key_learning_en: formData.key_learning_en.filter(item => item.trim()),
        key_learning_zh: formData.key_learning_zh.filter(item => item.trim()) || null,
        career_pathways_en: formData.career_pathways_en.filter(item => item.trim()),
        career_pathways_zh: formData.career_pathways_zh.filter(item => item.trim()) || null,
      }

      if (isEditing) {
        const { error } = await supabase
          .from('courses')
          .update(cleanData)
          .eq('id', course.id)

        if (error) throw error
        toast.success('Course updated successfully')
      } else {
        const { error } = await supabase
          .from('courses')
          .insert([cleanData])

        if (error) throw error
        toast.success('Course created successfully')
      }

      onSuccess()
      onClose()
    } catch (error: any) {
      console.error('Error saving course:', error)
      toast.error(error.message || 'Failed to save course')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-heading font-bold text-gray-900">
            {isEditing ? 'Edit Course' : 'Add New Course'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug (URL-friendly) *
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  required
                  placeholder="digital-marketing"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="business">Business</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="technology">Technology</option>
                  <option value="trades">Trades & Services</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title (English) *
                </label>
                <input
                  type="text"
                  value={formData.title_en}
                  onChange={(e) => setFormData(prev => ({ ...prev, title_en: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title (Chinese)
                </label>
                <input
                  type="text"
                  value={formData.title_zh}
                  onChange={(e) => setFormData(prev => ({ ...prev, title_zh: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (English)
                </label>
                <textarea
                  value={formData.description_en}
                  onChange={(e) => setFormData(prev => ({ ...prev, description_en: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (Chinese)
                </label>
                <textarea
                  value={formData.description_zh}
                  onChange={(e) => setFormData(prev => ({ ...prev, description_zh: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salary Range
              </label>
              <input
                type="text"
                value={formData.salary_range}
                onChange={(e) => setFormData(prev => ({ ...prev, salary_range: e.target.value }))}
                placeholder="$45,000–$65,000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Key Learning Areas */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Key Learning Areas</h3>
              <button
                type="button"
                onClick={() => addArrayItem('key_learning_en')}
                className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
              >
                <Plus className="h-4 w-4" />
                Add Item
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  English
                </label>
                <div className="space-y-2">
                  {formData.key_learning_en.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateArrayItem('key_learning_en', index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      {formData.key_learning_en.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('key_learning_en', index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chinese
                </label>
                <div className="space-y-2">
                  {formData.key_learning_zh.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateArrayItem('key_learning_zh', index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      {formData.key_learning_zh.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('key_learning_zh', index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('key_learning_zh')}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    + Add Chinese item
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Career Pathways */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Career Pathways</h3>
              <button
                type="button"
                onClick={() => addArrayItem('career_pathways_en')}
                className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
              >
                <Plus className="h-4 w-4" />
                Add Item
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  English
                </label>
                <div className="space-y-2">
                  {formData.career_pathways_en.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateArrayItem('career_pathways_en', index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      {formData.career_pathways_en.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('career_pathways_en', index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chinese
                </label>
                <div className="space-y-2">
                  {formData.career_pathways_zh.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateArrayItem('career_pathways_zh', index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      {formData.career_pathways_zh.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('career_pathways_zh', index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('career_pathways_zh')}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    + Add Chinese item
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Employment Outlook */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Employment Outlook (English)
              </label>
              <textarea
                value={formData.employment_outlook_en}
                onChange={(e) => setFormData(prev => ({ ...prev, employment_outlook_en: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Employment Outlook (Chinese)
              </label>
              <textarea
                value={formData.employment_outlook_zh}
                onChange={(e) => setFormData(prev => ({ ...prev, employment_outlook_zh: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Publish Status */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_published"
              checked={formData.is_published}
              onChange={(e) => setFormData(prev => ({ ...prev, is_published: e.target.checked }))}
              className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
            />
            <label htmlFor="is_published" className="text-sm font-medium text-gray-700">
              Publish this course immediately
            </label>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
          >
            {loading ? 'Saving...' : (isEditing ? 'Update Course' : 'Create Course')}
          </button>
        </div>
      </div>
    </div>
  )
}
AI Prompt for Copilot:
Create src/components/admin/CourseForm.tsx as a comprehensive course form:

1. Import: useState, supabase, toast, icons, Course type
2. Props: course (optional for editing), onClose, onSuccess callbacks
3. State: formData with all course fields, loading
4. Helper functions for array manipulation (add, update, remove items)
5. handleSubmit: validate, clean data, insert or update in Supabase
6. Form structure (scrollable modal):
   - Header with title and close button
   - Basic Info section:
     * Slug, Category (dropdown)
     * Title EN/ZH (side by side)
     * Description EN/ZH (textareas)
     * Salary Range
   - Key Learning Areas:
     * Dynamic array inputs (EN/ZH columns)
     * Add/remove buttons for each item
   - Career Pathways:
     * Same dynamic array structure
   - Employment Outlook EN/ZH
   - Publish checkbox
   - Footer with Cancel and Save buttons
7. Styling: Modal overlay, scrollable content, form inputs with focus states

Use 'use client' directive.
Use TypeScript with proper types.
✅ Verification:

Add new course works
Edit existing course works
Array fields can be added/removed
Form validates required fields
Success/error toasts appear


Day 6, Step 5: Commit Day 6 Progress
Time: 5 minutes
bashgit add .
git commit -m "Day 6: Build admin dashboard and complete course management with CRUD"
git push origin main
✅ Day 6 Complete!

🎯 Development Day 7: Translation Management
Goal: Build translation management interface with CRUD operations.
Estimated Time: 3-4 hours

Day 7, Step 1: Create Translations API Route
Time: 25 minutes
What you're doing: Building API endpoints for translation CRUD operations.
Create: app/api/translations/route.ts
Pseudocode:
typescriptimport { createClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

// GET /api/translations
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const missingOnly = searchParams.get('missingOnly') === 'true'

    const supabase = createClient()
    
    let query = supabase
      .from('translations')
      .select('*')
      .order('created_at', { ascending: false })

    if (category && category !== 'all') {
      query = query.eq('category', category)
    }

    if (missingOnly) {
      query = query.is('value_zh', null)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json({ translations: data || [] })
  } catch (error: any) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch translations', message: error.message },
      { status: 500 }
    )
  }
}

// POST /api/translations
export async function POST(request: Request) {
  try {
    const supabase = createClient()

    // Check authentication
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check admin
    const { data: adminCheck } = await supabase
      .from('admin_roles')
      .select('*')
      .eq('user_id', session.user.id)
      .single()

    if (!adminCheck) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()

    if (!body.key || !body.value_en) {
      return NextResponse.json(
        { error: 'Missing required fields: key and value_en' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('translations')
      .insert([body])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(
      { translation: data, message: 'Translation created' },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Failed to create translation', message: error.message },
      { status: 500 }
    )
  }
}

// PATCH /api/translations (for updates)
export async function PATCH(request: Request) {
  try {
    const supabase = createClient()

    // Check authentication
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json({ error: 'Missing translation ID' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('translations')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ translation: data, message: 'Translation updated' })
  } catch (error: any) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Failed to update translation', message: error.message },
      { status: 500 }
    )
  }
}
AI Prompt for Copilot:
Create app/api/translations/route.ts with handlers for translation CRUD:

1. GET handler:
   - Accept query params: category, missingOnly (boolean)
   - Fetch from translations table
   - Filter by category if provided
   - Filter to only null value_zh if missingOnly=true
   - Return { translations: Translation[] }

2. POST handler:
   - Require authentication (check session + admin_roles)
   - Validate required fields: key, value_en
   - Insert new translation
   - Return created translation with 201 status

3. PATCH handler:
   - Require authentication
   - Accept id and update fields in body
   - Update translation by id
   - Return updated translation

Use TypeScript.
Include error handling for all routes.

Day 7, Step 2: Create Translation Management Page
Time: 60 minutes
What you're doing: Building the UI for managing translations.
Create: app/admin/translations/page.tsx
Pseudocode:
typescript'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import { Plus, Edit, Trash2, Search, AlertCircle } from 'lucide-react'
import type { Translation } from '@/types'

export default function AdminTranslationsPage() {
  const [translations, setTranslations] = useState<Translation[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [showMissingOnly, setShowMissingOnly] = useState(false)
  const [editingTranslation, setEditingTranslation] = useState<Translation | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'navigation', label: 'Navigation' },
    { value: 'common', label: 'Common' },
    { value: 'form', label: 'Forms' },
    { value: 'course', label: 'Courses' },
  ]

  useEffect(() => {
    fetchTranslations()
  }, [categoryFilter, showMissingOnly])

  async function fetchTranslations() {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (categoryFilter !== 'all') {
        params.append('category', categoryFilter)
      }
      if (showMissingOnly) {
        params.append('missingOnly', 'true')
      }

      const response = await fetch(`/api/translations?${params}`)
      const data = await response.json()
      setTranslations(data.translations || [])
    } catch (error) {
      console.error('Error fetching translations:', error)
      toast.error('Failed to load translations')
    } finally {
      setLoading(false)
    }
  }

  async function deleteTranslation(id: string, key: string) {
    if (!confirm(`Delete translation "${key}"?`)) return

    try {
      const { error } = await supabase
        .from('translations')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast.success('Translation deleted')
      fetchTranslations()
    } catch (error: any) {
      console.error('Error deleting translation:', error)
      toast.error('Failed to delete translation')
    }
  }

  const filteredTranslations = translations.filter(t =>
    t.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.value_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.value_zh?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const missingCount = translations.filter(t => !t.value_zh).length

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            Manage Translations
          </h1>
          <p className="text-gray-600">
            Add and edit Chinese translations for UI text
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
        >
          <Plus className="h-5 w-5" />
          Add Translation
        </button>
      </div>

      {/* Missing Translations Alert */}
      {missingCount > 0 && !showMissingOnly && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-yellow-900 mb-1">
                {missingCount} Missing Translation{missingCount !== 1 ? 's' : ''}
              </h3>
              <p className="text-sm text-yellow-800 mb-3">
                Some translations don't have Chinese values yet.
              </p>
              <button
                onClick={() => setShowMissingOnly(true)}
                className="text-sm font-medium text-yellow-900 hover:text-yellow-700"
              >
                Show Missing Only →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search translations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          {categories.map(cat => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>

        {/* Missing Only Toggle */}
        <button
          onClick={() => setShowMissingOnly(!showMissingOnly)}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            showMissingOnly
              ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          {showMissingOnly ? 'Show All' : 'Missing Only'}
        </button>
      </div>

      {/* Translations Table */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : filteredTranslations.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <p className="text-gray-600">
            {searchTerm 
              ? 'No translations found matching your search.' 
              : 'No translations yet. Add your first translation!'
            }
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Key
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    English
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Chinese
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTranslations.map(translation => (
                  <tr key={translation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <code className="text-sm text-gray-900 bg-gray-100 px-2 py-1 rounded">
                        {translation.key}
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {translation.value_en}
                    </td>
                    <td className="px-6 py-4">
                      {translation.value_zh ? (
                        <span className="text-sm text-gray-900">{translation.value_zh}</span>
                      ) : (
                        <span className="text-sm text-yellow-600 italic">Missing</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {translation.category || 'None'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingTranslation(translation)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteTranslation(translation.id, translation.key)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Modal - Placeholder */}
      {(showAddModal || editingTranslation) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-4">
              {editingTranslation ? 'Edit Translation' : 'Add Translation'}
            </h2>
            <p className="text-gray-600 mb-4">
              Form will be created in next step
            </p>
            <button
              onClick={() => {
                setShowAddModal(false)
                setEditingTranslation(null)
              }}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
AI Prompt for Copilot:
Create app/admin/translations/page.tsx as a client component:

1. Import: useState, useEffect, supabase, toast, icons, Translation type
2. Component state:
   - translations: Translation[]
   - loading, searchTerm, categoryFilter, showMissingOnly
   - editingTranslation, showAddModal
3. Fetch translations on mount and when filters change
4. deleteTranslation function with confirmation
5. Filter translations by search term (key, value_en, value_zh)
6. Calculate missingCount (translations without value_zh)
7. Page structure:
   - Header with "Add Translation" button
   - Alert banner if missing translations (with "Show Missing Only" link)
   - Filters:
     * Search input
     * Category dropdown
     * "Missing Only" toggle button
   - Table showing:
     * Key (in code font)
     * English value
     * Chinese value (or "Missing" in yellow)
     * Category
     * Actions (Edit, Delete)
   - Loading and empty states
   - Placeholder modal
8. Styling: Clean table design with proper spacing

Use 'use client' directive.
Use TypeScript.
✅ Verification:

Visit /admin/translations
Should see translations table
Filters work (category, missing only)
Search filters results
Delete works


Day 7, Step 3: Create Translation Form Component
Time: 40 minutes
What you're doing: Building a form for adding/editing translations.
Create: src/components/admin/TranslationForm.tsx
Pseudocode:
typescript'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { X } from 'lucide-react'
import type { Translation } from '@/types'

interface TranslationFormProps {
  translation?: Translation | null
  onClose: () => void
  onSuccess: () => void
}

export function TranslationForm({ translation, onClose, onSuccess }: TranslationFormProps) {
  const isEditing = !!translation

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    key: translation?.key || '',
    value_en: translation?.value_en || '',
    value_zh: translation?.value_zh || '',
    category: translation?.category || 'common',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isEditing) {
        // Update existing translation
        const response = await fetch('/api/translations', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: translation.id,
            ...formData
          })
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.message || 'Update failed')
        }

        toast.success('Translation updated successfully')
      } else {
        // Create new translation
        const response = await fetch('/api/translations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.message || 'Create failed')
        }

        toast.success('Translation created successfully')
      }

      onSuccess()
      onClose()
    } catch (error: any) {
      console.error('Error saving translation:', error)
      toast.error(error.message || 'Failed to save translation')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-heading font-bold text-gray-900">
            {isEditing ? 'Edit Translation' : 'Add New Translation'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Key (unique identifier) *
            </label>
            <input
              type="text"
              value={formData.key}
              onChange={(e) => setFormData(prev => ({ ...prev, key: e.target.value }))}
              required
              disabled={isEditing}
              placeholder="nav.home"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            {isEditing && (
              <p className="text-xs text-gray-500 mt-1">
                Keys cannot be changed after creation
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="navigation">Navigation</option>
              <option value="common">Common</option>
              <option value="form">Forms</option>
              <option value="course">Courses</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              English Value *
            </label>
            <input
              type="text"
              value={formData.value_en}
              onChange={(e) => setFormData(prev => ({ ...prev, value_en: e.target.value }))}
              required
              placeholder="Home"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Chinese Value
            </label>
            <input
              type="text"
              value={formData.value_zh}
              onChange={(e) => setFormData(prev => ({ ...prev, value_zh: e.target.value }))}
              placeholder="首页"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Leave blank if not yet translated
            </p>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
          >
            {loading ? 'Saving...' : (isEditing ? 'Update' : 'Create')}
          </button>
        </div>
      </div>
    </div>
  )
}
AI Prompt for Copilot:
Create src/components/admin/TranslationForm.tsx:

1. Import: useState, toast, X icon, Translation type
2. Props: translation (optional), onClose, onSuccess
3. State: formData (key, value_en, value_zh, category), loading
4. handleSubmit:
   - If editing: PATCH to /api/translations
   - If creating: POST to /api/translations
   - Show success toast and call onSuccess/onClose
5. Form fields:
   - Key (disabled when editing, required)
   - Category (dropdown: navigation, common, form, course)
   - English Value (required)
   - Chinese Value (optional, with helper text)
6. Modal structure: header, form, footer buttons
7. Styling: Clean form design, proper focus states

Use 'use client' directive.
Use TypeScript.
Update: app/admin/translations/page.tsx
Replace the placeholder modal with:
typescriptimport { TranslationForm } from '@/components/admin/TranslationForm'

// ... in the return statement, replace the modal placeholder with:

{(showAddModal || editingTranslation) && (
  <TranslationForm
    translation={editingTranslation}
    onClose={() => {
      setShowAddModal(false)
      setEditingTranslation(null)
    }}
    onSuccess={() => {
      fetchTranslations()
    }}
  />
)}
✅ Verification:

Add new translation works
Edit existing translation works
Key field is disabled when editing
Form validates required fields


Day 7, Step 4: Seed Initial Translations
Time: 20 minutes
What you're doing: Creating a script to populate common UI translations.
Create: scripts/seedTranslations.ts
Pseudocode:
typescriptimport { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

const translations = [
  // Navigation
  { key: 'nav.home', value_en: 'Home', value_zh: '首页', category: 'navigation' },
  { key: 'nav.courses', value_en: 'Explore Our Courses', value_zh: '浏览课程', category: 'navigation' },
  { key: 'nav.contact', value_en: 'Contact Us', value_zh: '联系我们', category: 'navigation' },
  { key: 'nav.admin', value_en: 'Admin', value_zh: '管理', category: 'navigation' },

  // Common
  { key: 'common.loading', value_en: 'Loading...', value_zh: '加载中...', category: 'common' },
  { key: 'common.save', value_en: 'Save', value_zh: '保存', category: 'common' },
  { key: 'common.cancel', value_en: 'Cancel', value_zh: '取消', category: 'common' },
  { key: 'common.edit', value_en: 'Edit', value_zh: '编辑', category: 'common' },
  { key: 'common.delete', value_en: 'Delete', value_zh: '删除', category: 'common' },
  { key: 'common.search', value_en: 'Search', value_zh: '搜索', category: 'common' },

  // Forms
  { key: 'form.name', value_en: 'Name', value_zh: '姓名', category: 'form' },
  { key: 'form.email', value_en: 'Email', value_zh: '电子邮件', category: 'form' },
  { key: 'form.phone', value_en: 'Phone', value_zh: '电话', category: 'form' },
  { key: 'form.message', value_en: 'Message', value_zh: '留言', category: 'form' },
  { key: 'form.submit', value_en: 'Submit', value_zh: '提交', category: 'form' },

  // Courses
  { key: 'course.learnMore', value_en: 'Learn More', value_zh: '了解更多', category: 'course' },
  { key: 'course.careerPaths', value_en: 'Career Paths', value_zh: '职业方向', category: 'course' },
  { key: 'course.salaryRange', value_en: 'Salary Range', value_zh: '薪资范围', category: 'course' },
]

async function seedTranslations() {
  console.log('🌱 Starting translation seeding...')

  try {
    // Test connection
    const { data: testData, error: testError } = await supabase
      .from('translations')
      .select('count')
      .limit(1)

    if (testError) {
      console.error('❌ Database connection failed:', testError)
      process.exit(1)
    }

    console.log('✅ Database connection successful')

    // Insert translations
    console.log(`📝 Inserting ${translations.length} translations...`)
    
    const { data, error } = await supabase
      .from('translations')
      .insert(translations)
      .select()

    if (error) {
      console.error('❌ Insert failed:', error)
      process.exit(1)
    }

    console.log(`✅ Successfully inserted ${data?.length || 0} translations`)
    console.log('🎉 Seeding complete!')

  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  }
}

seedTranslations()
Update package.json scripts:
json{
  "scripts": {
    "seed": "tsx scripts/seedCourses.ts",
    "seed:translations": "tsx scripts/seedTranslations.ts",
    "seed:all": "npm run seed && npm run seed:translations"
  }
}
Run:
bashnpm run seed:translations
AI Prompt for Copilot:
Create scripts/seedTranslations.ts:

1. Import createClient from @supabase/supabase-js
2. Get environment variables for Supabase
3. Define translations array with common UI translations:
   - Navigation (Home, Courses, Contact, Admin)
   - Common (Loading, Save, Cancel, Edit, Delete, Search)
   - Forms (Name, Email, Phone, Message, Submit)
   - Courses (Learn More, Career Paths, Salary Range)
   Each with key, value_en, value_zh, category
4. Create async seedTranslations function:
   - Test connection
   - Insert translations
   - Log progress
5. Call seedTranslations()

Use TypeScript.
Add console.log messages with emojis.
✅ Verification:

Script runs successfully
Check /admin/translations - should see seeded translations


Day 7, Step 5: Commit Day 7 Progress
Time: 5 minutes
bashgit add .
git commit -m "Day 7: Build translation management with CRUD and seed initial translations"
git push origin main
✅ Day 7 Complete!

🎉 Days 6 & 7 Summary
You've now completed:
Day 6:

✅ Admin layout with navigation
✅ Dashboard with statistics
✅ Complete course management (list, add, edit, delete)
✅ Comprehensive course form with dynamic arrays

Day 7:

✅ Translation API routes
✅ Translation management interface
✅ Translation form component
✅ Seed script for initial translations

Still needed (Days 8-9):

Day 8: Testing, polish, bug fixes
Day 9: Deployment to Vercel