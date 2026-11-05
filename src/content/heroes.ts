import type { StaticImageData } from "next/image";
import about from "@/assets/heroes/about.jpg";
import leadership from "@/assets/heroes/leadership.jpg";
import sustainability from "@/assets/heroes/sustainability.jpg";
import credit from "@/assets/heroes/credit.jpg";
import assetManagement from "@/assets/heroes/asset-management.jpg";
import assetReconstruction from "@/assets/heroes/asset-reconstruction.jpg";
import insurance from "@/assets/heroes/insurance.jpg";
import investors from "@/assets/heroes/investors.jpg";
import financialResults from "@/assets/heroes/financial-results.jpg";
import annualReports from "@/assets/heroes/annual-reports.jpg";
import governance from "@/assets/heroes/governance.jpg";
import media from "@/assets/heroes/media.jpg";
import careers from "@/assets/heroes/careers.jpg";
import contact from "@/assets/heroes/contact.jpg";

/**
 * Hero images for inner pages. To change one, replace the file in
 * src/assets/heroes/ (keep the name) or point the entry at a new import.
 * Pages without an entry keep the plain blue hero.
 */
export const heroImages = {
  about,
  leadership,
  sustainability,
  investors,
  financialResults,
  annualReports,
  governance,
  media,
  careers,
  contact,
  business: {
    credit,
    "asset-management": assetManagement,
    "asset-reconstruction": assetReconstruction,
    insurance,
  } as Record<string, StaticImageData>,
};
