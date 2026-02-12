"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { Mail, MapPin, Send, Phone } from "lucide-react";

export default function ContactPage() {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interestedCourse: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission (add actual email service later if needed)
    setTimeout(() => {
      toast.success(
        language === "en"
          ? "Thank you! We will contact you soon."
          : "感谢您的联系！我们会尽快回复。",
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
        interestedCourse: "",
        message: "",
      });
      setLoading(false);
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-5xl mx-auto">
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {language === "en" ? "Get in Touch" : "联系方式"}
                </h2>

                <div className="space-y-6">
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
                        className="text-primary-600 hover:text-primary-700 hover:underline"
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
                        className="text-primary-600 hover:text-primary-700 hover:underline"
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
                      <p className="text-gray-600">Toronto, Ontario, Canada</p>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mt-8 pt-8 border-t">
                  <p className="text-sm text-gray-600">
                    {language === "en"
                      ? "We typically respond within 24-48 hours. Feel free to reach out with any questions about our programs."
                      : "我们通常在24-48小时内回复。如有任何关于课程的问题，请随时联系我们。"}
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {language === "en" ? "Send us a Message" : "发送消息"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {language === "en" ? "Name" : "姓名"} *
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
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {language === "en" ? "Email" : "电子邮件"} *
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
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {language === "en" ? "Phone" : "电话"}
                      <span className="text-gray-400 ml-1">
                        ({language === "en" ? "optional" : "可选"})
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
                    <label
                      htmlFor="interestedCourse"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {language === "en"
                        ? "Interested Program"
                        : "感兴趣的课程"}
                      <span className="text-gray-400 ml-1">
                        ({language === "en" ? "optional" : "可选"})
                      </span>
                    </label>
                    <input
                      type="text"
                      id="interestedCourse"
                      name="interestedCourse"
                      value={formData.interestedCourse}
                      onChange={handleChange}
                      placeholder={
                        language === "en"
                          ? "e.g., Digital Marketing"
                          : "例如：数字营销"
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {language === "en" ? "Message" : "留言"} *
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
                        {language === "en" ? "Sending..." : "发送中..."}
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        {language === "en" ? "Send Message" : "发送消息"}
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
