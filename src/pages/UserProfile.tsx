
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ExternalLink, Share2, Heart, QrCode, Users, MessageCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Helmet } from 'react-helmet-async';

interface UserProfileData {
  id: string;
  username: string;
  display_name: string;
  bio: string;
  avatar_url: string;
  profile_title: string;
  plan: string;
  links: Array<{
    id: string;
    title: string;
    url: string;
    icon?: string;
    clicks: number;
  }>;
  total_clicks: number;
}

const UserProfile = () => {
  const { username } = useParams();
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (username) {
      fetchUserProfile(username);
    }
  }, [username]);

  const fetchUserProfile = async (username: string) => {
    try {
      setLoading(true);
      
      // Fetch user profile
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('username', username)
        .single();

      if (profileError) throw profileError;

      // Fetch user links
      const { data: links, error: linksError } = await supabase
        .from('links')
        .select('*')
        .eq('user_id', profile.id)
        .eq('is_active', true)
        .order('position');

      if (linksError) throw linksError;

      setProfileData({
        ...profile,
        links: links || []
      });

      // Track page view
      await supabase
        .from('analytics')
        .insert({
          user_id: profile.id,
          page_view: true,
          referrer: document.referrer,
          user_agent: navigator.userAgent,
          ip_address: 'masked' // In production, you'd get this from server
        });

    } catch (error: any) {
      console.error('Error fetching profile:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLinkClick = async (link: any) => {
    try {
      // Track link click
      await supabase
        .from('analytics')
        .insert({
          user_id: profileData?.id,
          link_id: link.id,
          link_click: true,
          referrer: window.location.href,
          user_agent: navigator.userAgent,
          ip_address: 'masked'
        });

      // Update link clicks count
      await supabase
        .from('links')
        .update({ clicks: link.clicks + 1 })
        .eq('id', link.id);

      // Open link
      window.open(link.url, '_blank');
    } catch (error) {
      console.error('Error tracking link click:', error);
      // Still open the link even if tracking fails
      window.open(link.url, '_blank');
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profileData?.display_name}'s Profile`,
          text: profileData?.bio || `Check out ${profileData?.display_name}'s links`,
          url: url,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(url);
      toast({
        title: "Link Copied!",
        description: "Profile link has been copied to clipboard.",
      });
    }
  };

  const handleTipUser = () => {
    toast({
      title: "Tip Feature",
      description: "Pi Network tipping will be available soon!",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center p-8">
          <CardContent>
            <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
            <p className="text-muted-foreground mb-4">
              The profile you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => window.location.href = '/'}>
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const themeClasses = "bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-900";

  return (
    <>
      <Helmet>
        <title>{profileData.display_name} - Droplink</title>
        <meta name="description" content={profileData.bio || `Check out ${profileData.display_name}'s links on Droplink`} />
        <meta property="og:title" content={`${profileData.display_name} - Droplink`} />
        <meta property="og:description" content={profileData.bio || `Check out ${profileData.display_name}'s links on Droplink`} />
        <meta property="og:image" content={profileData.avatar_url || `https://api.dicebear.com/7.x/adventurer/svg?seed=${profileData.username}`} />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className={`min-h-screen ${themeClasses} py-8 px-4`}>
        <div className="max-w-md mx-auto">
          {/* Pi Ads for Free Plan */}
          {profileData.plan === 'free' && (
            <div className="mb-6 p-4 bg-yellow-100 border border-yellow-300 rounded-lg text-center">
              <p className="text-sm text-yellow-800 font-medium">📢 Pi Network Ad</p>
              <p className="text-xs text-yellow-600 mt-1">Upgrade to remove ads</p>
            </div>
          )}

          {/* Profile Header */}
          <div className="text-center mb-8">
            <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-white shadow-lg">
              <AvatarImage 
                src={profileData.avatar_url || `https://api.dicebear.com/7.x/adventurer/svg?seed=${profileData.username}`}
                alt={`${profileData.username}'s avatar`} 
              />
              <AvatarFallback className="text-2xl font-bold">
                {profileData.username.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {profileData.display_name}
            </h1>
            
            {profileData.profile_title && (
              <p className="text-gray-600 text-sm mb-2">{profileData.profile_title}</p>
            )}
            
            <p className="text-gray-500 text-sm mb-3">@{profileData.username}</p>
            
            {profileData.bio && (
              <p className="text-gray-700 text-sm leading-relaxed mb-4 max-w-xs mx-auto">
                {profileData.bio}
              </p>
            )}
            
            <Badge className="text-xs mb-6">
              {profileData.plan === 'free' ? '❤️ Free' :
               profileData.plan === 'starter' ? '⚡ Starter' :
               profileData.plan === 'pro' ? '👑 Pro' : '💎 Premium'}
            </Badge>
          </div>

          {/* Links */}
          <div className="space-y-3 mb-8">
            {profileData.links.map((link) => (
              <Button 
                key={link.id}
                onClick={() => handleLinkClick(link)}
                className="w-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 shadow-sm rounded-xl py-6 h-auto transition-all duration-200 hover:shadow-md"
                variant="outline"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium text-left">{link.title}</span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
              </Button>
            ))}
            
            {profileData.links.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 text-sm">No links added yet</p>
              </div>
            )}
          </div>

          {/* Pi Tips Section (Starter+ only) */}
          {profileData.plan !== 'free' && (
            <div className="mb-6">
              <Button 
                onClick={handleTipUser}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-medium rounded-xl py-4"
              >
                <div className="flex items-center justify-center gap-2">
                  <Heart className="w-4 h-4" />
                  <span>💰 Tip me in Pi</span>
                </div>
              </Button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mb-6">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleShare}
              className="bg-white/80 border-gray-200 hover:bg-white"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            
            {profileData.plan !== 'free' && (
              <Button 
                size="sm" 
                variant="outline"
                className="bg-white/80 border-gray-200 hover:bg-white"
              >
                <QrCode className="w-4 h-4 mr-2" />
                QR Code
              </Button>
            )}
          </div>

          {/* Stats (if available) */}
          {profileData.total_clicks > 0 && (
            <div className="text-center mb-6">
              <p className="text-xs text-gray-500">
                {profileData.total_clicks} total clicks
              </p>
            </div>
          )}

          {/* Droplink Badge for Free Plan */}
          {profileData.plan === 'free' && (
            <div className="text-center">
              <p className="text-xs text-gray-400">Powered by Droplink</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
