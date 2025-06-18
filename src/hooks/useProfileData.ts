import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Link {
  id: string;
  title: string;
  url: string;
  icon: string;
  clicks: number;
  type?: "featured" | "social" | "regular";
}

interface PiLink {
  title: string;
  url: string;
}

interface Theme {
  type: string;
}

interface ProfileData {
  id: string;
  username: string;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  imported_pi_avatar?: string | null;
  imported_pi_bio?: string | null;
  imported_pi_links?: PiLink[] | null;
  pi_profile_last_synced?: string | null;
  active_sticker_ids?: string[] | null;
  pi_wallet_address?: string | null;
  theme?: Theme | null;
  links: Link[];
}

export const useProfileData = (username: string | undefined) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        
        if (!username) {
          setError("User not found");
          setLoading(false);
          return;
        }
        
        // Fetch profile data including imported Pi data and active stickers
        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .select(`
            *,
            imported_pi_avatar,
            imported_pi_bio,
            imported_pi_links,
            pi_profile_last_synced,
            active_sticker_ids,
            pi_wallet_address,
            theme
          `)
          .eq('username', username)
          .maybeSingle();
        
        if (profileError || !profileData) {
          setError("User profile not found");
          setLoading(false);
          return;
        }
        
        // Fetch links data
        const { data: linksData, error: linksError } = await supabase
          .from('links')
          .select('*')
          .eq('user_id', profileData.id)
          .eq('is_active', true)
          .order('position', { ascending: true });
        
        if (linksError) {
          console.error("Failed to fetch links:", linksError);
        }
        
        // Track page view for this profile visit
        const { error: analyticsError } = await supabase
          .from('analytics')
          .insert({
            user_id: profileData.id,
            page_view: true,
            referrer: document.referrer,
            user_agent: navigator.userAgent,
          });
        
        if (analyticsError) {
          console.error("Failed to track page view:", analyticsError);
        }
        
        // Process links to categorize them
        const processedLinks = linksData ? linksData.map(link => {
          let type: "featured" | "social" | "regular" | undefined = undefined;
          
          if (
            link.url.includes('instagram.com') ||
            link.url.includes('twitter.com') ||
            link.url.includes('facebook.com') ||
            link.url.includes('linkedin.com') ||
            link.url.includes('youtube.com') ||
            link.icon?.toLowerCase() === 'instagram' ||
            link.icon?.toLowerCase() === 'twitter' ||
            link.icon?.toLowerCase() === 'facebook' ||
            link.icon?.toLowerCase() === 'linkedin' ||
            link.icon?.toLowerCase() === 'youtube'
          ) {
            type = "social";
          } else if (linksData.indexOf(link) < 2) {
            type = "featured";
          } else {
            type = "regular";
          }
          
          return { ...link, type };
        }) : [];

        // Add imported Pi links if available
        let importedPiLinks: PiLink[] = [];
        
        if (profileData.imported_pi_links) {
          try {
            if (typeof profileData.imported_pi_links === 'string') {
              importedPiLinks = JSON.parse(profileData.imported_pi_links);
            } else if (Array.isArray(profileData.imported_pi_links)) {
              importedPiLinks = profileData.imported_pi_links as unknown as PiLink[];
            }
          } catch (error) {
            console.error('Error parsing imported Pi links:', error);
            importedPiLinks = [];
          }
        }
        
        const piLinksWithType = importedPiLinks.map((link: PiLink, index: number) => ({
          id: `pi-${index}`,
          title: link.title,
          url: link.url,
          icon: "π",
          clicks: 0,
          type: "regular" as const,
          isPiImported: true
        }));
        
        const defaultLinks = [
          { id: 'default-1', title: "Tip in Pi", url: "#tip-in-pi", icon: "💰", clicks: 0 },
        ];
        
        const allLinks = [...processedLinks, ...piLinksWithType];
        
        // Properly handle active_sticker_ids JSONB conversion
        let activeStickerIds: string[] = [];
        if (profileData.active_sticker_ids) {
          try {
            if (typeof profileData.active_sticker_ids === 'string') {
              activeStickerIds = JSON.parse(profileData.active_sticker_ids);
            } else if (Array.isArray(profileData.active_sticker_ids)) {
              activeStickerIds = profileData.active_sticker_ids as unknown as string[];
            }
          } catch (error) {
            console.error('Error parsing active sticker IDs:', error);
            activeStickerIds = [];
          }
        }
        
        setProfileData({
          ...profileData,
          imported_pi_links: importedPiLinks,
          active_sticker_ids: activeStickerIds,
          links: allLinks.length > 0 ? allLinks : defaultLinks,
        });
        
        setLoading(false);
        
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setError("Failed to load profile");
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [username]);

  return { loading, error, profileData };
};
