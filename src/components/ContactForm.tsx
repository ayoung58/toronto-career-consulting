"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "emailjs-com";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  // Initialize EmailJS on mount
  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "");
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    try {
      setIsLoading(true);

      // Send email using EmailJS
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        {
          to_email: "secondcareerconsulting@gmail.com",
          from_name: data.name,
          from_email: data.email,
          phone: data.phone,
          message: data.message,
          reply_to: data.email,
        },
      );

      toast.success(
        language === "en"
          ? "Message sent successfully! We'll get back to you soon."
          : "消息已成功发送！我们会尽快回复您。",
      );
      reset();
    } catch (error) {
      console.error("Email send error:", error);
      toast.error(
        language === "en"
          ? "Failed to send message. Please try again."
          : "发送消息失败。请重试。",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name Field */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {language === "en" ? "Full Name *" : "全名 *"}
        </label>
        <input
          type="text"
          {...register("name")}
          placeholder={language === "en" ? "John Doe" : "张三"}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {language === "en" ? "Email *" : "电子邮件 *"}
        </label>
        <input
          type="email"
          {...register("email")}
          placeholder="your.email@example.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {language === "en" ? "Phone Number *" : "电话号码 *"}
        </label>
        <input
          type="tel"
          {...register("phone")}
          placeholder={language === "en" ? "(416) 123-4567" : "(416) 123-4567"}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {language === "en" ? "Message *" : "消息 *"}
        </label>
        <textarea
          {...register("message")}
          placeholder={
            language === "en"
              ? "Tell us about your inquiry..."
              : "告诉我们您的咨询内容..."
          }
          rows={5}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2"
      >
        {isLoading && <Loader className="h-5 w-5 animate-spin" />}
        {language === "en" ? "Send Message" : "发送消息"}
      </button>

      <p className="text-xs text-gray-500 text-center">
        {language === "en"
          ? "We typically respond within 24-48 hours."
          : "我们通常在24-48小时内回复。"}
      </p>
    </form>
  );
}
