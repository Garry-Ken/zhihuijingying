"use client";

import { useState, useEffect } from "react";
import siteConfig from "../../../config/site.json";

type Config = typeof siteConfig;

const ADMIN_PASSWORD = "zhihui2026";

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [config, setConfig] = useState<Config>(siteConfig);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"profile" | "services" | "testimonials" | "settings">("profile");

  useEffect(() => {
    const saved = localStorage.getItem("admin_logged_in");
    if (saved === "true") setLoggedIn(true);
  }, []);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setLoggedIn(true);
      localStorage.setItem("admin_logged_in", "true");
    } else {
      setMessage("密码错误");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("admin_logged_in");
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/save-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      if (res.ok) {
        setMessage("保存成功！网站将在1-2分钟内自动更新");
      } else {
        setMessage("保存失败，请重试");
      }
    } catch {
      setMessage("保存失败，请检查网络连接");
    }
    setSaving(false);
  };

  const updateProfile = (key: string, value: string) => {
    setConfig({ ...config, profile: { ...config.profile, [key]: value } });
  };

  const updateSettings = (key: string, value: string) => {
    setConfig({ ...config, settings: { ...config.settings, [key]: value } });
  };

  const updateService = (index: number, key: string, value: string) => {
    const newServices = [...config.services];
    newServices[index] = { ...newServices[index], [key]: value };
    setConfig({ ...config, services: newServices });
  };

  const updateServiceFeature = (serviceIndex: number, featureIndex: number, value: string) => {
    const newServices = [...config.services];
    const newFeatures = [...newServices[serviceIndex].features];
    newFeatures[featureIndex] = value;
    newServices[serviceIndex] = { ...newServices[serviceIndex], features: newFeatures };
    setConfig({ ...config, services: newServices });
  };

  const addServiceFeature = (serviceIndex: number) => {
    const newServices = [...config.services];
    newServices[serviceIndex] = {
      ...newServices[serviceIndex],
      features: [...newServices[serviceIndex].features, "新服务特点"],
    };
    setConfig({ ...config, services: newServices });
  };

  const removeServiceFeature = (serviceIndex: number, featureIndex: number) => {
    const newServices = [...config.services];
    newServices[serviceIndex] = {
      ...newServices[serviceIndex],
      features: newServices[serviceIndex].features.filter((_, i) => i !== featureIndex),
    };
    setConfig({ ...config, services: newServices });
  };

  const updateServiceDetail = (serviceIndex: number, detailIndex: number, field: string, value: string) => {
    const newServices = [...config.services];
    const newDetails = [...(newServices[serviceIndex].detailSections || [])];
    newDetails[detailIndex] = { ...newDetails[detailIndex], [field]: value };
    newServices[serviceIndex] = { ...newServices[serviceIndex], detailSections: newDetails };
    setConfig({ ...config, services: newServices });
  };

  const updateTestimonial = (index: number, key: string, value: string) => {
    const newTestimonials = [...config.testimonials];
    newTestimonials[index] = { ...newTestimonials[index], [key]: value };
    setConfig({ ...config, testimonials: newTestimonials });
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-sm w-full">
          <h1 className="text-2xl font-bold text-primary mb-6 text-center">管理后台登录</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="请输入管理密码"
            className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold mb-4"
          />
          {message && <p className="text-red-500 text-sm mb-3">{message}</p>}
          <button
            onClick={handleLogin}
            className="w-full bg-gold text-primary py-3 rounded-lg font-semibold hover:bg-gold-light transition-colors"
          >
            登录
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary text-white px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-bold">智汇菁英 · 内容管理</h1>
        <button onClick={handleLogout} className="text-white/60 hover:text-white text-sm">
          退出登录
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {([
            { key: "profile", label: "个人信息" },
            { key: "services", label: "服务项目" },
            { key: "testimonials", label: "客户评价" },
            { key: "settings", label: "网站设置" },
          ] as const).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.key ? "bg-primary text-white" : "bg-white text-muted hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="space-y-4">
            <Field label="姓名" value={config.profile.name} onChange={(v) => updateProfile("name", v)} />
            <Field label="品牌名" value={config.profile.brand} onChange={(v) => updateProfile("brand", v)} />
            <Field label="头衔" value={config.profile.title} onChange={(v) => updateProfile("title", v)} />
            <Field label="微信号" value={config.profile.wechat} onChange={(v) => updateProfile("wechat", v)} />
            <Field label="邮箱" value={config.profile.email} onChange={(v) => updateProfile("email", v)} />
            <Field label="电话" value={config.profile.phone || ""} onChange={(v) => updateProfile("phone", v)} placeholder="选填" />
            <Field label="个人简介" value={config.profile.description} onChange={(v) => updateProfile("description", v)} multiline />
            <Field label="核心理念" value={config.profile.philosophy} onChange={(v) => updateProfile("philosophy", v)} multiline />

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-semibold text-primary mb-4">成就数据</h3>
              {config.profile.achievements.map((a, i) => (
                <div key={i} className="flex gap-3 mb-3">
                  <input
                    value={a.value}
                    onChange={(e) => {
                      const newA = [...config.profile.achievements];
                      newA[i] = { ...newA[i], value: e.target.value };
                      setConfig({ ...config, profile: { ...config.profile, achievements: newA } });
                    }}
                    className="w-24 border border-gray-200 rounded px-3 py-2 text-sm"
                    placeholder="数值"
                  />
                  <input
                    value={a.label}
                    onChange={(e) => {
                      const newA = [...config.profile.achievements];
                      newA[i] = { ...newA[i], label: e.target.value };
                      setConfig({ ...config, profile: { ...config.profile, achievements: newA } });
                    }}
                    className="flex-1 border border-gray-200 rounded px-3 py-2 text-sm"
                    placeholder="标签"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === "services" && (
          <div className="space-y-8">
            {config.services.map((service, si) => (
              <div key={service.id} className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-primary mb-4 text-lg">{service.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Field label="服务名称" value={service.name} onChange={(v) => updateService(si, "name", v)} />
                  <Field label="图标" value={service.icon} onChange={(v) => updateService(si, "icon", v)} />
                  <Field label="价格" value={service.price} onChange={(v) => updateService(si, "price", v)} />
                  <Field label="时长" value={service.duration} onChange={(v) => updateService(si, "duration", v)} />
                </div>
                <Field label="描述" value={service.description} onChange={(v) => updateService(si, "description", v)} multiline />

                <div className="mt-4">
                  <h4 className="font-medium text-primary mb-2">服务特点</h4>
                  {service.features.map((f, fi) => (
                    <div key={fi} className="flex gap-2 mb-2">
                      <input
                        value={f}
                        onChange={(e) => updateServiceFeature(si, fi, e.target.value)}
                        className="flex-1 border border-gray-200 rounded px-3 py-2 text-sm"
                      />
                      <button
                        onClick={() => removeServiceFeature(si, fi)}
                        className="text-red-400 hover:text-red-600 text-sm px-2"
                      >
                        删除
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addServiceFeature(si)}
                    className="text-gold text-sm hover:underline mt-1"
                  >
                    + 添加特点
                  </button>
                </div>

                <div className="mt-4">
                  <h4 className="font-medium text-primary mb-2">详情区块</h4>
                  {(service.detailSections || []).map((d, di) => (
                    <div key={di} className="bg-gray-50 rounded-lg p-4 mb-3">
                      <input
                        value={d.title}
                        onChange={(e) => updateServiceDetail(si, di, "title", e.target.value)}
                        className="w-full border border-gray-200 rounded px-3 py-2 text-sm mb-2"
                        placeholder="标题"
                      />
                      <textarea
                        value={d.content}
                        onChange={(e) => updateServiceDetail(si, di, "content", e.target.value)}
                        className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                        rows={2}
                        placeholder="内容"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Testimonials Tab */}
        {activeTab === "testimonials" && (
          <div className="space-y-4">
            {config.testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-primary mb-3">评价 #{i + 1}</h3>
                <Field label="评价内容" value={t.quote} onChange={(v) => updateTestimonial(i, "quote", v)} multiline />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <Field label="作者" value={t.author} onChange={(v) => updateTestimonial(i, "author", v)} />
                  <Field label="标签" value={t.tag} onChange={(v) => updateTestimonial(i, "tag", v)} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-4">
            <Field label="网站标题" value={config.settings.siteTitle} onChange={(v) => updateSettings("siteTitle", v)} />
            <Field label="网站描述" value={config.settings.siteDescription} onChange={(v) => updateSettings("siteDescription", v)} multiline />
            <Field label="表单标题" value={config.settings.contactFormTitle} onChange={(v) => updateSettings("contactFormTitle", v)} />
            <Field label="表单副标题" value={config.settings.contactFormSubtitle} onChange={(v) => updateSettings("contactFormSubtitle", v)} />
            <Field label="提交成功提示" value={config.settings.successMessage} onChange={(v) => updateSettings("successMessage", v)} />
            <Field label="页脚文字" value={config.settings.footerText} onChange={(v) => updateSettings("footerText", v)} />
          </div>
        )}

        {/* Save Button */}
        <div className="mt-8 sticky bottom-4">
          {message && (
            <p className={`text-sm mb-3 text-center ${message.includes("成功") ? "text-green-600" : "text-red-500"}`}>
              {message}
            </p>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-gold text-primary py-4 rounded-xl font-bold text-lg hover:bg-gold-light transition-colors disabled:opacity-50 shadow-lg"
          >
            {saving ? "保存中..." : "保存并发布"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline = false,
  placeholder = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  placeholder?: string;
}) {
  const className = "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold transition-colors";
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} className={className} rows={3} placeholder={placeholder} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className={className} placeholder={placeholder} />
      )}
    </div>
  );
}
