"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, MapPin, Phone } from "lucide-react";

interface FooterLink {
  href: string;
  label_en: string;
  label_zh: string;
}

const footerLinks: FooterLink[] = [
  { href: "/", label_en: "Home", label_zh: "首页" },
  { href: "/courses", label_en: "Programs", label_zh: "课程" },
  { href: "/contact", label_en: "Contact", label_zh: "联系我们" },
];

const programCategories = [
  { label_en: "Business", label_zh: "商业" },
  { label_en: "Healthcare", label_zh: "医疗保健" },
  { label_en: "Technology", label_zh: "技术" },
  { label_en: "Social Services", label_zh: "社会服务" },
];

/**
 * Footer Component
 * Site footer with contact info, quick links, and copyright
 */
export function Footer() {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & About */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {language === "en"
                ? "Toronto Career Consulting"
                : "多伦多职业咨询"}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {language === "en"
                ? "多伦多职业咨询与规划服务"
                : "Toronto Career Consulting and Planning Services"}
            </p>
            <p className="text-sm text-gray-600">
              {language === "en"
                ? "Professional one-year career programs designed to help you gain job-ready skills and confidently enter the Canadian workforce."
                : "专业的一年制职业课程，帮助您掌握就业技能，自信地进入加拿大职场。"}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              {language === "en" ? "Quick Links" : "快捷链接"}
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    {language === "en" ? link.label_en : link.label_zh}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Program Categories */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              {language === "en" ? "Programs" : "课程类别"}
            </h4>
            <ul className="space-y-3">
              {programCategories.map((category) => (
                <li key={category.label_en}>
                  <Link
                    href={`/courses?category=${category.label_en.toLowerCase()}`}
                    className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    {language === "en" ? category.label_en : category.label_zh}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              {language === "en" ? "Contact" : "联系方式"}
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:secondcareerconsulting@gmail.com"
                  className="flex items-start gap-3 text-sm text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span className="break-all">
                    secondcareerconsulting@gmail.com
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Toronto, Ontario, Canada</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {currentYear} Toronto Career Consulting.{" "}
              {language === "en" ? "All rights reserved." : "版权所有。"}
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/admin/login"
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                {language === "en" ? "Admin" : "管理员"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
