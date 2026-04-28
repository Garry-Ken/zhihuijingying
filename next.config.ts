import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 移除静态导出，启用动态渲染以支持Sanity实时数据
  // output: "export",
  images: {
    unoptimized: true,
  },
  // 环境变量
  env: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "35d0cvvs",
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  },
};

export default nextConfig;