export type SiteSettings = {
  address: string;
  phone: string;
  secondaryPhone: string;
  tertiaryPhone: string;
  email: string;
  footerHeading: string;
  footerDescription: string;
  blogCtaHeading: string;
  blogCtaDescription: string;
  blogCtaButtonLabel: string;
  linkedin: string;
  facebook: string;
  youtube: string;
  instagram: string;
};

export const defaultSiteSettings: SiteSettings = {
  address: "The One Tower, Sheikh Zayed Rd, Tecom, Barsha Heights, Dubai, UAE",
  phone: "+971 58 628 7157",
  secondaryPhone: "+971 58 245 2703",
  tertiaryPhone: "+971 55 984 9732",
  email: "customer@cordovaproperty.com",
  footerHeading: "How can our property management team help you?",
  footerDescription: "Cordova Property Management supports Dubai landlords with leasing, inspections, maintenance coordination, tenant care, and premium property readiness.",
  blogCtaHeading: "Professional Property Management Support",
  blogCtaDescription: "Cordova Property Management helps Dubai landlords protect property performance and long-term value.",
  blogCtaButtonLabel: "Get Started Today",
  linkedin: "https://www.linkedin.com/company/cordova-property-mangement/about/",
  facebook: "https://www.facebook.com/profile.php?id=61559895031581",
  youtube: "https://www.youtube.com/channel/UCjfrb24xHEWa5j1SDbnZFUg",
  instagram: "https://www.instagram.com/thecordova_group/"
};

export function mergeSiteSettings(settings?: Partial<SiteSettings>): SiteSettings {
  const merged = { ...defaultSiteSettings, ...settings };

  // Migrate the previous default number until the settings are saved again.
  if (!settings?.tertiaryPhone && settings?.secondaryPhone === "+971 58 658 0518") {
    merged.secondaryPhone = defaultSiteSettings.secondaryPhone;
  }

  return merged;
}
