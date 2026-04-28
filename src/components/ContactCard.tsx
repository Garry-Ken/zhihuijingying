import { profile } from "@/lib/data";
import WechatButton from "./WechatButton";

export default function ContactCard() {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto text-center">
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center">
        <span className="text-4xl text-white">👤</span>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{profile.name}</h3>
      <p className="text-white/70 mb-6">{profile.title}</p>
      <WechatButton size="lg" />
      <p className="text-white/50 text-sm mt-4">
        添加后请备注"网站咨询"，方便快速响应
      </p>
    </div>
  );
}