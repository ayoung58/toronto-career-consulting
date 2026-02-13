"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  const { language } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {language === "en" ? "Contact Us" : "联系我们"}
              </h1>
              <p className="text-gray-600 text-lg">
                {language === "en"
                  ? "Get in touch to learn more about our programs"
                  : "联系我们了解更多课程信息"}
              </p>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl p-8 md:p-12 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                {language === "en" ? "Get in Touch" : "联系方式"}
              </h2>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {language === "en" ? "Email" : "电子邮件"}
                    </h3>
                    <a
                      href="mailto:secondcareerconsulting@gmail.com"
                      className="text-primary-600 hover:text-primary-700 hover:underline text-lg"
                    >
                      secondcareerconsulting@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {language === "en" ? "Phone" : "电话"}
                    </h3>
                    <a
                      href="tel:+14163030023"
                      className="text-primary-600 hover:text-primary-700 hover:underline text-lg"
                    >
                      (416) 303-0023
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {language === "en" ? "Location" : "地址"}
                    </h3>
                    <p className="text-gray-600 text-lg">
                      Toronto, Ontario, Canada
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-10 pt-8 border-t">
                <p className="text-gray-600 text-center">
                  {language === "en"
                    ? "We typically respond within 24-48 hours. Feel free to reach out with any questions about our programs."
                    : "我们通常在24-48小时内回复。如有任何关于课程的问题，请随时联系我们。"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
