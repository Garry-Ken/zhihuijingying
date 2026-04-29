import Link from "next/link";
import { getServices, getProfile } from "@/lib/config";
import WechatButton from "@/components/WechatButton";

export default function ServicesPage() {
  const services = getServices();
  const profile = getProfile();

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary to-primary-light text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-3">服务项目</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            专注高净值人群的专属知识资产操盘，从战略决策赋能到数字化落地的全链路服务
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className="scroll-mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="text-gold text-sm font-medium mb-2">0{index + 1}</div>
                <h2 className="text-3xl font-bold text-primary mb-4">
                  {service.name}
                </h2>
                <p className="text-lg text-muted leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* 服务详情区块 */}
                {service.detailSections && service.detailSections.map((section, i) => (
                  <div key={i} className="mb-4 bg-surface rounded-xl p-4">
                    <h4 className="font-semibold text-primary mb-1">{section.title}</h4>
                    <p className="text-sm text-muted">{section.content}</p>
                  </div>
                ))}

                <div className="bg-surface rounded-xl p-6 mb-6">
                  <div className="text-sm text-muted mb-2">服务报价</div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-gold-dark">
                      {service.price}
                    </span>
                    <span className="text-muted">{service.duration}</span>
                  </div>
                </div>
                <div className="space-y-3 mb-8">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <span className="text-gold">✓</span>
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                <WechatButton />
              </div>
              <div
                className={`bg-gradient-to-br from-primary to-primary-light rounded-2xl h-64 flex items-center justify-center ${
                  index % 2 === 1 ? "lg:order-1" : ""
                }`}
              >
                <span className="text-6xl text-white/20">
                  {service.icon || (index === 0 ? "👑" : index === 1 ? "🤖" : "🏢")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">
            需要定制专属服务方案？
          </h2>
          <p className="text-muted mb-6">
            每位客户的需求都独一无二，请添加微信进行一对一深度沟通
          </p>
          <WechatButton size="lg" />
        </div>
      </section>
    </div>
  );
}
