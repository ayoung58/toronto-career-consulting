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

| Technology | Purpose | Why This Choice |
|------------|---------|-----------------|
| **Next.js 14** | React framework | Server-side rendering, API routes, optimal performance |
| **TypeScript** | Type safety | Catch errors early, better developer experience |
| **Tailwind CSS** | Styling | Rapid development, easy customization, modern design |
| **Framer Motion** | Animations | Smooth, declarative animations |
| **Lucide React** | Icons | Beautiful, consistent icon set |
| **Sonner** | Toast notifications | Clean, simple notifications |

### Backend & Data Stack

| Technology | Purpose | Why This Choice |
|------------|---------|-----------------|
| **Supabase** | Database + Auth | PostgreSQL, built-in auth, free tier generous |
| **Next.js API Routes** | Backend endpoints | Integrated with frontend, serverless |
| **Row Level Security** | Data protection | Database-level security policies |

### Translation Stack

| Technology | Purpose | Why This Choice |
|------------|---------|-----------------|
| **next-intl** | i18n framework | Built for Next.js App Router |
| **LibreTranslate** (optional) | Auto-translation | Free, self-hosted, no API keys |
| **Supabase translations table** | Translation storage | Centralized, editable by admin |

### Hosting & Deployment

| Service | Purpose | Free Tier Limits |
|---------|---------|------------------|
| **Vercel** | Frontend hosting | 100GB bandwidth/month |
| **Supabase** | Database + Auth | 500MB database, 50K MAU |
| **GitHub** | Version control | Unlimited public/private repos |

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
  id: string                       // UUID from database
  slug: string                     // URL-friendly identifier (e.g., "digital-marketing")
  title_en: string                 // English title
  title_zh: string | null          // Chinese title (optional)
  description_en: string | null    // English description
  description_zh: string | null    // Chinese description
  key_learning_en: string[]        // Array of learning points (English)
  key_learning_zh: string[] | null // Array of learning points (Chinese)
  career_pathways_en: string[]     // Career options (English)
  career_pathways_zh: string[] | null
  employment_outlook_en: string | null
  employment_outlook_zh: string | null
  salary_range: string | null      // e.g., "$45,000-$55,000"
  category: string | null          // e.g., "business", "technology"
  created_at: string               // ISO timestamp
  updated_at: string
  is_published: boolean            // Show on public site?
}

// Translation for UI text (navigation, buttons, etc.)
export interface Translation {
  id: string
  key: string                      // e.g., "nav.home"
  value_en: string                 // English value
  value_zh: string | null          // Chinese value
  category: string | null          // e.g., "navigation", "common"
  created_at: string
  updated_at: string
}

// Language can only be 'en' or 'zh'
export type Language = 'en' | 'zh'

// Shape of the Language Context
export interface LanguageContextType {
  language: Language               // Current language
  setLanguage: (lang: Language) => void  // Function to change language
  t: (key: string, fallback?: string) => string  // Translation function
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
import { createClient } from '@supabase/supabase-js'

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create a singleton Supabase client instance
// This will be used in client components and API routes
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper function: Get current user session
export async function getSession() {
  const { data, error } = await supabase.auth.getSession()
  if (error) throw error
  return data.session
}

// Helper function: Sign out current user
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
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
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Function to create server-side Supabase client
// This handles cookies properly in Next.js 14 App Router
export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Read cookie value
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        // Set cookie value
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Handle cookie setting errors (can happen in Server Components)
          }
        },
        // Remove cookie
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Handle cookie removal errors
          }
        },
      },
    }
  )
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
'use client'  // This is a client component

import React, { createContext, useState, useContext, useEffect } from 'react'
import type { Language, LanguageContextType } from '@/types'

// Create the context (initially undefined)
const LanguageContext = createContext(undefined)

// Provider component that wraps the app
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // State: current language (default to 'en')
  const [language, setLanguageState] = useState('en')
  
  // State: translations loaded from database (we'll implement fetching later)
  const [translations, setTranslations] = useState<Record>({})

  // On component mount: load saved language from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('preferred-language')
    if (saved === 'en' || saved === 'zh') {
      setLanguageState(saved)
    }
  }, [])

  // Function to change language
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('preferred-language', lang)
  }

  // Translation function: t(key, fallback)
  // - key: translation key like "nav.home"
  // - fallback: default text if translation not found
  const t = (key: string, fallback?: string) => {
    // If English, just return the fallback or key
    if (language === 'en') {
      return fallback || key
    }
    
    // If Chinese, look up in translations object
    // If not found, return fallback or key
    return translations[key] || fallback || key
  }

  // TODO: Load translations from Supabase
  // We'll implement this later when we have the translations table populated

  return (
    
      {children}
    
  )
}

// Hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
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
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary blue palette for professional look
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',  // Main blue
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
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
    transition: { duration: 0.5, ease: 'easeInOut' } 
  }
}

// Slide up animation (from below)
export const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: 'easeOut' } 
  }
}

// Slide down animation (from above)
export const slideDown = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

// Container that staggers children animations
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,  // 0.1s delay between each child
      delayChildren: 0.2,     // Wait 0.2s before starting
    }
  }
}

// Scale animation on hover
export const scaleOnHover = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05, 
    transition: { duration: 0.2, ease: 'easeInOut' } 
  }
}

// Fade and scale combo
export const fadeScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' }
  }
}
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
import { createClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

// GET /api/courses
// Fetches published courses with optional filtering
export async function GET(request: Request) {
  try {
    // Parse query parameters from URL
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    // Create Supabase client
    const supabase = createClient()
    
    // Start building query
    let query = supabase
      .from('courses')
      .select('*')
      .eq('is_published', true)  // Only published courses

    // Apply category filter if provided
    if (category && category !== 'all') {
      query = query.eq('category', category)
    }

    // Apply search filter if provided
    // Search in both English and Chinese titles and descriptions
    if (search && search.trim() !== '') {
      const searchTerm = `%${search}%`
      query = query.or(`title_en.ilike.${searchTerm},title_zh.ilike.${searchTerm},description_en.ilike.${searchTerm},description_zh.ilike.${searchTerm}`)
    }

    // Order by created_at descending (newest first)
    query = query.order('created_at', { ascending: false })

    // Execute query
    const { data, error } = await query

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }

    // Return success response
    return NextResponse.json({ 
      courses: data || [],
      count: data?.length || 0
    })

  } catch (error: any) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch courses', message: error.message },
      { status: 500 }
    )
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
    const supabase = createClient()

    // Check authentication
    const { data: { session }, error: authError } = await supabase.auth.getSession()
    
    if (authError || !session) {
      return NextResponse.json(
        { error: 'Unauthorized - Please login' },
        { status: 401 }
      )
    }

    // Check if user is admin
    const { data: adminCheck, error: adminError } = await supabase
      .from('admin_roles')
      .select('*')
      .eq('user_id', session.user.id)
      .single()

    if (adminError || !adminCheck) {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }

    // Parse request body
    const body = await request.json()

    // Validate required fields
    if (!body.title_en || !body.slug) {
      return NextResponse.json(
        { error: 'Missing required fields: title_en and slug' },
        { status: 400 }
      )
    }

    // Insert new course
    const { data, error } = await supabase
      .from('courses')
      .insert([{
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
        is_published: body.is_published !== undefined ? body.is_published : true,
      }])
      .select()
      .single()

    if (error) {
      console.error('Insert error:', error)
      throw error
    }

    return NextResponse.json(
      { course: data, message: 'Course created successfully' },
      { status: 201 }
    )

  } catch (error: any) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Failed to create course', message: error.message },
      { status: 500 }
    )
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
```typescript
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
    description_zh: '