"use client";

import { profile } from "@/lib/data";
import { useState } from "react";

export default function WechatButton({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
}) {
  const [copied, setCopied] = useState(false);

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(profile.wechat);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`bg-gold text-primary font-semibold rounded-full hover:bg-gold-light transition-all ${sizeClasses[size]} flex items-center gap-2`}
    >
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M8.69 4.06C5.94 4.06 4.11 6.03 4.11 8.74c0 1.67.85 3.14 2.19 4.06-.14.56-.45 1.2-.82 1.8-.45.69-.93 1.45-1.24 2.19-.22.52-.1.95.28 1.16.37.2.92.09 1.3-.33.4-.44.92-1.2 1.2-1.82.17-.36.33-.54.52-.54.17 0 .3.15.52.39.34.38.75 1 1.04 1.44.46.67.88 1.35 1.57 1.75.42.23.83.34 1.22.34 1.91 0 2.92-1.27 2.92-3.16 0-1.36-.56-2.54-1.37-3.43.11-.38.21-.81.11-1.24-.2-.87-1.48-1.66-2.09-1.87-.3-.12-.61-.21-.93-.31-.61-.18-1.2-.35-1.68-.63-.84-.48-1.4-1.2-1.68-2.09-.06-.19-.1-.39-.1-.61 0-1.18.86-2.18 2.09-2.18.4 0 .79.11 1.14.33.35.22.62.49.81.81.21-.23.31-.51.31-.81 0-.77-.45-1.38-1.14-1.71-.31-.14-.61-.2-.93-.2-.44 0-.85.14-1.22.39-.37.25-.61.57-.75.94z" />
      </svg>
      {copied ? "已复制微信号！" : `微信: ${profile.wechat}`}
    </button>
  );
}