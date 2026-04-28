import Link from "next/link";
import { profile, services, testimonials } from "@/lib/data";
import WechatButton from "@/components/WechatButton";
import ServiceCard from "@/components/ServiceCard";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary-light to-primary text-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="text-gold text-sm font-medium tracking-widest uppercase mb-4">
              {profile.brand} · 创始人
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {profile.name}
            </h1>
            <p className="text-xl md:text-2xl text-gold mb-6">
              {profile.title}
            </p>
            <p className="text-lg text-white/80 leading-relaxed mb-10 max-w-2xl">
              {profile.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <WechatButton size="lg" />
              <Link
                href="/services"
                className="border border-white/30 text-white px-8 py-3.5 rounded-full font-medium text-lg hover:bg-white/10 transition-colors text-center"
              >
                了解服务
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-surface py-12 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {profile.achievements.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-muted text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-primary mb-3">
              三大核心服务
            </h2>
            <p className="text-muted max-w-2xl mx-auto text-lg">
              从战略决策赋能到数字化落地，专注高净值人群的专属知识资产操盘
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-primary mb-6">核心理念</h2>
          <p className="text-lg text-muted leading-relaxed mb-8">
            {profile.philosophy}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { title: "知识资产化", desc: "将隐性经验转化为可量化的智能资产" },
              { title: "AI赋能", desc: "用前沿技术放大专业知识的影响力" },
              { title: "全程陪跑", desc: "从构想到落地，陪伴式顾问服务" },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-6 border border-border"
              >
                <h3 className="text-lg font-semibold text-gold-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-primary mb-3">
              客户评价
            </h2>
            <p className="text-muted">来自真实的合作伙伴</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((item) => (
              <div
                key={item.author}
                className="bg-white border border-border rounded-2xl p-8"
              >
                <div className="text-gold text-3xl mb-4">&ldquo;</div>
                <p className="text-foreground leading-relaxed mb-6">
                  {item.quote}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">
                    {item.author}
                  </span>
                  <span className="text-xs text-gold-dark bg-gold/10 px-3 py-1 rounded-full">
                    {item.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA with Contact */}
      <section className="bg-primary py-20" id="contact">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              开启您的<span className="text-gold">知识资产</span>之旅
            </h2>
            <p className="text-white/70 text-lg">
              填写下方表单，我们会在24小时内与您联系
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}