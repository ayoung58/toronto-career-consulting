import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Toaster } from "sonner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Toronto Career Consulting | 多伦多职业咨询",
  description: "One-year career programs in Toronto | 多伦多一年制职业培训项目",
  keywords: [
    "career consulting",
    "Toronto",
    "职业培训",
    "多伦多",
    "Second Career",
    "career programs",
    "professional development",
  ],
  authors: [{ name: "Toronto Career Consulting" }],
  openGraph: {
    title: "Toronto Career Consulting | 多伦多职业咨询",
    description:
      "One-year career programs in Toronto | 多伦多一年制职业培训项目",
    type: "website",
    locale: "en_CA",
    alternateLocale: "zh_CN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <LanguageProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster position="top-center" richColors />
        </LanguageProvider>
      </body>
    </html>
  );
}
