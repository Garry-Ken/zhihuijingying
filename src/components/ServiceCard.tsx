import Link from "next/link";
import { Service } from "@/lib/data";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.id}`}
      className="group bg-white border border-border rounded-2xl p-8 hover:shadow-xl hover:border-gold/50 transition-all duration-300"
    >
      <h3 className="text-xl font-semibold text-primary group-hover:text-gold-dark transition-colors mb-3">
        {service.name}
      </h3>
      <p className="text-sm text-muted leading-relaxed mb-6">
        {service.description}
      </p>
      <div className="space-y-3 mb-6">
        {service.features.slice(0, 3).map((feature) => (
          <div key={feature} className="flex items-start gap-2 text-sm">
            <span className="text-gold mt-0.5">✓</span>
            <span className="text-foreground">{feature}</span>
          </div>
        ))}
        {service.features.length > 3 && (
          <div className="text-sm text-muted">
            +{service.features.length - 3} 项服务细节
          </div>
        )}
      </div>
      <div className="pt-6 border-t border-border flex items-center justify-between">
        <div>
          <span className="text-2xl font-bold text-gold-dark">
            {service.price}
          </span>
          <span className="text-sm text-muted ml-2">{service.duration}</span>
        </div>
        <span className="text-gold-dark text-sm font-medium group-hover:underline">
          了解详情 →
        </span>
      </div>
    </Link>
  );
}