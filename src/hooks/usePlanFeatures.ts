
import { useUser } from '@/context/UserContext';

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

export const usePlanFeatures = (): PlanFeatures & { currentPlan: string } => {
  const { subscription, isAdmin, profile } = useUser();
  
  // Admin users get premium privileges
  const currentPlan = isAdmin ? 'premium' : (profile?.plan || subscription?.plan || 'free');
  
  const planFeatures: Record<string, PlanFeatures> = {
    free: {
      maxLinks: 1,
      hasPiDomain: false,
      hasPiTips: false,
      hasAnalytics: false,
      hasAdvancedAnalytics: false,
      hasQRCode: false,
      hasCustomThemes: false,
      hasProductSales: false,
      hasLinkScheduling: false,
      hasSEOTools: false,
      hasCustomCSS: false,
      hasAPIAccess: false,
      hasWhiteLabel: false,
      showAds: true,
      showDroplinkBadge: true,
      templateCount: 3
    },
    starter: {
      maxLinks: Infinity,
      hasPiDomain: true,
      hasPiTips: true,
      hasAnalytics: true,
      hasAdvancedAnalytics: false,
      hasQRCode: true,
      hasCustomThemes: true,
      hasProductSales: false,
      hasLinkScheduling: false,
      hasSEOTools: false,
      hasCustomCSS: false,
      hasAPIAccess: false,
      hasWhiteLabel: false,
      showAds: false,
      showDroplinkBadge: false,
      templateCount: 33
    },
    pro: {
      maxLinks: Infinity,
      hasPiDomain: true,
      hasPiTips: true,
      hasAnalytics: true,
      hasAdvancedAnalytics: true,
      hasQRCode: true,
      hasCustomThemes: true,
      hasProductSales: true,
      hasLinkScheduling: true,
      hasSEOTools: true,
      hasCustomCSS: false,
      hasAPIAccess: false,
      hasWhiteLabel: true,
      showAds: false,
      showDroplinkBadge: false,
      templateCount: 66
    },
    premium: {
      maxLinks: Infinity,
      hasPiDomain: true,
      hasPiTips: true,
      hasAnalytics: true,
      hasAdvancedAnalytics: true,
      hasQRCode: true,
      hasCustomThemes: true,
      hasProductSales: true,
      hasLinkScheduling: true,
      hasSEOTools: true,
      hasCustomCSS: true,
      hasAPIAccess: true,
      hasWhiteLabel: true,
      showAds: false,
      showDroplinkBadge: false,
      templateCount: 99
    }
  };

  return {
    ...planFeatures[currentPlan],
    currentPlan
  };
};
