
export type PlanType = 'free' | 'starter' | 'pro' | 'premium';

export interface PlanFeatures {
  maxLinks: number;
  hasPiDomain: boolean;
  hasPiTips: boolean;
  hasAnalytics: boolean;
  hasAdvancedAnalytics: boolean;
  hasQRCode: boolean;
  hasCustomThemes: boolean;
  hasProductSales: boolean;
  hasLinkScheduling: boolean;
  hasSEOTools: boolean;
  hasCustomCSS: boolean;
  hasAPIAccess: boolean;
  hasWhiteLabel: boolean;
  showAds: boolean;
  showDroplinkBadge: boolean;
  templateCount: number;
}

export interface PlanPricing {
  monthly: number;
  annual: number;
}
