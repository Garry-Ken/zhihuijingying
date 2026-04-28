import Link from "next/link";
import { profile } from "@/lib/data";
import WechatButton from "@/components/WechatButton";

export default function AboutPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary to-primary-light text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-3">关于金天雄</h1>
          <p className="text-white/70 text-lg">
            专注服务企业家与高净值人群的知识资产操盘手
          </p>
        </div>
      </section>

      {/* About */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="w-28 h-28 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
              <span className="text-4xl text-white">金</span>
            </div>
            <h2 className="text-3xl font-bold text-primary mb-2">
              {profile.name}
            </h2>
            <p className="text-gold text-lg">{profile.title}</p>
          </div>

          <div className="bg-surface rounded-2xl p-8 mb-12">
            <p className="text-lg text-muted leading-relaxed">
              {profile.description}
            </p>
          </div>

          <div className="bg-white border border-border rounded-2xl p-8">
            <h3 className="text-xl font-bold text-primary mb-4">核心理念</h3>
            <p className="text-muted leading-relaxed">{profile.philosophy}</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">
            服务理念
          </h2>
          <p className="text-muted mb-12">让每一次知识服务都产生实际价值</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "深度定制",
                desc: "每位客户的需求都独一无二，我们拒绝模板化服务",
              },
              {
                title: "全程陪跑",
                desc: "从构想到落地，陪伴式顾问服务确保结果",
              },
              {
                title: "价值导向",
                desc: "以客户商业成果为最终衡量标准",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-8">
                <h3 className="text-lg font-semibold text-gold-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            开启您的专属<span className="text-gold">知识资产</span>之旅
          </h2>
          <p className="text-white/70 mb-8 text-lg">
            如需定制专属服务方案，敬请添加微信一对一深度沟通
          </p>
          <WechatButton size="lg" />
        </div>
      </section>
    </div>
  );
}