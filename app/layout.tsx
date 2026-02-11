import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Toronto Career Consulting | 多伦多职业咨询",
  description: "One-year career programs in Toronto | 多伦多一年制职业培训项目",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          {children}
          <Toaster position="top-center" richColors />
        </LanguageProvider>
      </body>
    </html>
  );
}
