import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import FloatingWechat from "@/components/FloatingWechat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "金天雄 | 智汇菁英 - AI高净值知识资产架构师 · 企业战略私董会导师",
  description:
    "「智汇菁英」品牌创始人，专注服务企业家、行业专家型IP与高净值人群。以「知识资产化」为核心，提供企业家私董会、个人AI专家资产系统搭建、企业AI数字化转型顾问三大核心服务。",
  keywords: [
    "私董会",
    "知识IP",
    "企业顾问",
    "财税咨询",
    "知识资产化",
    "AI专家资产",
    "企业战略",
    "数字化转型",
  ],
  openGraph: {
    title: "金天雄 | 智汇菁英",
    description: "AI高���值知识资产架构师 · 企业战略私董会导师",
    type: "website",
  },
};

function Navbar() {
  return (
    <nav className="bg-primary text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-gold text-xl font-bold">智汇菁英</span>
          <span className="text-white/60 text-sm">| 金天雄</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm">
          <Link href="/" className="hover:text-gold transition-colors">
            首页
          </Link>
          <Link href="/services" className="hover:text-gold transition-colors">
            服务项目
          </Link>
          <Link href="/about" className="hover:text-gold transition-colors">
            关于
          </Link>
          <Link
            href="#contact"
            className="bg-gold text-primary px-5 py-2 rounded-full font-medium hover:bg-gold-light transition-colors"
          >
            立即咨询
          </Link>
        </div>
        <Link
          href="#contact"
          className="md:hidden bg-gold text-primary px-4 py-1.5 rounded-full text-sm font-medium"
        >
          咨询
        </Link>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-primary text-white/70" id="contact">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-gold text-xl font-bold mb-4">智汇菁英</h3>
            <p className="text-sm leading-relaxed">
              专注服务企业家、行业专家型IP与高净值人群，以「知识资产化」为核心，提供全链路高端定制服务。
            </p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">服务项目</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/services/private-board"
                  className="hover:text-gold transition-colors"
                >
                  企业家私董会
                </Link>
              </li>
              <li>
                <Link
                  href="/services/ai-knowledge-system"
                  className="hover:text-gold transition-colors"
                >
                  个人AI专家资产系统
                </Link>
              </li>
              <li>
                <Link
                  href="/services/enterprise-ai"
                  className="hover:text-gold transition-colors"
                >
                  企业AI数字化转型顾问
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">联系方式</h4>
            <ul className="space-y-2 text-sm">
              <li>微信：kt76189（添加请备注"网站咨询"）</li>
              <li>服务时间：周一至周五 9:00-20:00</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 text-center text-sm">
          © 2026 智汇菁英 · 金天雄 版权所有
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWechat />
      </body>
    </html>
  );
}