import Link from "next/link";
import { notFound } from "next/navigation";
import { services, getService } from "@/lib/data";
import WechatButton from "@/components/WechatButton";

export function generateStaticParams() {
  return services.map((s) => ({ id: s.id }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = getService(id);
  if (!service) notFound();

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary to-primary-light text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            href="/services"
            className="text-white/60 hover:text-white text-sm mb-6 inline-block transition-colors"
          >
            ← 返回服务列表
          </Link>
          <h1 className="text-4xl font-bold mb-3">{service.name}</h1>
          <p className="text-white/70 text-lg">{service.description}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-surface rounded-2xl p-8">
              <div className="text-sm text-muted mb-2">服务报价</div>
              <div className="text-3xl font-bold text-gold-dark">
                {service.price}
              </div>
              <div className="text-muted mt-1">{service.duration}</div>
            </div>
            <div className="bg-surface rounded-2xl p-8">
              <div className="text-sm text-muted mb-2">服务形式</div>
              <div className="text-lg text-foreground font-medium">深度诊断 + 定制方案 + 全程陪跑</div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-6">服务内容</h2>
            <div className="space-y-4">
              {service.features.map((feature, index) => (
                <div
                  key={feature}
                  className="flex items-start gap-4 bg-white border border-border rounded-xl p-6"
                >
                  <span className="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center font-bold shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary text-white rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">开启您的专属服务</h2>
            <p className="text-white/70 mb-6">
              每位客户的需求都独一无二，请添加微信进行一对一深度沟通，为您定制专属方案
            </p>
            <WechatButton size="lg" />
          </div>
        </div>
      </section>
    </div>
  );
}