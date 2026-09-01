export type SiteSettings = {
  address: string;
  phone: string;
  secondaryPhone: string;
  email: string;
  footerHeading: string;
  footerDescription: string;
  linkedin: string;
  facebook: string;
  youtube: string;
  instagram: string;
};

export const defaultSiteSettings: SiteSettings = {
  address: "The One Tower, Sheikh Zayed Rd, Tecom, Barsha Heights, Dubai, UAE",
  phone: "+971 58 628 7157",
  secondaryPhone: "+971 58 658 0518",
  email: "customer@cordovaproperty.com",
  footerHeading: "How can our property management team help you?",
  footerDescription: "Cordova Property Management supports Dubai landlords with leasing, inspections, maintenance coordination, tenant care, and premium property readiness.",
  linkedin: "https://www.linkedin.com/company/cordova-property-mangement/about/",
  facebook: "https://www.facebook.com/profile.php?id=61559895031581",
  youtube: "https://www.youtube.com/channel/UCjfrb24xHEWa5j1SDbnZFUg",
  instagram: "https://www.instagram.com/thecordova_group/"
};
