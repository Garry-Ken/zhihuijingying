import siteConfig from "../../config/site.json";

export interface Service {
  id: string;
  name: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  icon: string;
  poster: string;
  detailSections: {
    title: string;
    content: string;
  }[];
}

export interface Testimonial {
  quote: string;
  author: string;
  tag: string;
  avatar: string;
}

export interface Profile {
  name: string;
  brand: string;
  title: string;
  wechat: string;
  email: string;
  phone: string;
  description: string;
  philosophy: string;
  achievements: { value: string; label: string }[];
  avatar: string;
  heroBanner: string;
}

export interface Settings {
  siteTitle: string;
  siteDescription: string;
  contactFormTitle: string;
  contactFormSubtitle: string;
  successMessage: string;
  footerText: string;
}

export const config = siteConfig as {
  profile: Profile;
  services: Service[];
  testimonials: Testimonial[];
  settings: Settings;
};

export function getProfile(): Profile {
  return config.profile;
}

export function getServices(): Service[] {
  return config.services;
}

export function getService(id: string): Service | undefined {
  return config.services.find((s) => s.id === id);
}

export function getTestimonials(): Testimonial[] {
  return config.testimonials;
}

export function getSettings(): Settings {
  return config.settings;
}
