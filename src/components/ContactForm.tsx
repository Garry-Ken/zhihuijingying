"use client";

import { useState } from "react";
import WechatButton from "./WechatButton";
import { getSettings, getProfile } from "@/lib/config";

export default function ContactForm() {
  const settings = getSettings();
  const profile = getProfile();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "请输入姓名";
    if (!formData.phone.trim()) newErrors.phone = "请输入手机号";
    if (!formData.email.trim()) {
      newErrors.email = "请输入邮箱";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "请输入有效的邮箱地址";
    }
    if (!formData.message.trim()) newErrors.message = "请输入您的需求";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "06d97df7-3475-40b8-90af-65e330df511f",
          subject: `${profile.brand}网站新咨询 - ${formData.name}`,
          from_name: `${profile.brand}网站`,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          company: formData.company,
          message: formData.message,
          to_email: profile.email,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", phone: "", email: "", company: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-white rounded-2xl p-8 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-xl font-bold text-primary mb-2">提交成功！</h3>
        <p className="text-muted mb-6">
          {settings.successMessage}
        </p>
        <WechatButton size="lg" />
        <p className="text-sm text-muted mt-4">
          也可以直接扫码添加微信，快速沟通
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8">
      <h3 className="text-xl font-bold text-primary mb-2">{settings.contactFormTitle}</h3>
      <p className="text-muted text-sm mb-6">
        {settings.contactFormSubtitle}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="access_key" value="06d97df7-3475-40b8-90af-65e330df511f" />
        <input type="hidden" name="subject" value={`${profile.brand}网站新咨询`} />
        <input type="hidden" name="from_name" value={`${profile.brand}网站`} />
        <input type="hidden" name="to_email" value={profile.email} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              姓名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="请输入您的姓名"
              className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold transition-colors ${
                errors.name ? "border-red-500" : "border-border"
              }`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              手机号 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="请输入手机号码"
              className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold transition-colors ${
                errors.phone ? "border-red-500" : "border-border"
              }`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              邮箱 <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="请输入邮箱地址"
              className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold transition-colors ${
                errors.email ? "border-red-500" : "border-border"
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              公司/机构
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="请输入公司名称（选填）"
              className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            咨询需求 <span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={4}
            placeholder="请简要描述您的需求，如：想要了解私董会服务、企业AI转型咨询等..."
            className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold transition-colors resize-none ${
              errors.message ? "border-red-500" : "border-border"
            }`}
          />
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
        </div>

        {status === "error" && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
            提交失败，请稍后重试或直接添加微信联系我们
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-gold text-primary py-3 rounded-lg font-semibold hover:bg-gold-light transition-colors disabled:opacity-50"
        >
          {status === "loading" ? "提交中..." : "提交咨询"}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-border text-center">
        <p className="text-muted text-sm mb-3">或直接扫码添加微信</p>
        <WechatButton />
      </div>
    </div>
  );
}
