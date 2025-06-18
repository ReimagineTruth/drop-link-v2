
import React from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ExternalLink, Share2 } from "lucide-react";
import { MetaTags } from "@/components/seo/MetaTags";
import { useProfileData } from "@/hooks/useProfileData";
import LoadingState from "@/components/profile/LoadingState";
import ErrorState from "@/components/profile/ErrorState";

const UserProfile = () => {
  const { username } = useParams<{ username: string }>();
  const { loading, error, profileData } = useProfileData(username);

  if (loading) {
    return <LoadingState />;
  }

  if (error || !profileData) {
    return <ErrorState error={error || "Profile not found"} />;
  }

  const profileUrl = `https://droplink.space/u/${username}`;
  const themeClasses = {
    light: "bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-900",
    dark: "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white",
    pastel: "bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 text-purple-900"
  };

  const theme = profileData.theme?.type || 'light';
  const containerClass = themeClasses[theme as keyof typeof themeClasses] || themeClasses.light;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profileData.display_name || profileData.username} | Droplink`,
          text: profileData.bio || `Check out ${profileData.username}'s profile`,
          url: profileUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(profileUrl);
    }
  };

  const handleLinkClick = async (linkId: string, url: string) => {
    // Track link click analytics
    try {
      await fetch('/api/analytics/link-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          linkId,
          profileId: profileData.id,
          referrer: document.referrer,
          userAgent: navigator.userAgent
        })
      });
    } catch (error) {
      console.error('Failed to track link click:', error);
    }

    // Open the link
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <MetaTags
        title={`${profileData.display_name || profileData.username} | Droplink`}
        description={profileData.bio || `Check out ${profileData.username}'s links and content`}
        image={profileData.avatar_url || `https://api.dicebear.com/7.x/adventurer/svg?seed=${profileData.username}`}
        url={profileUrl}
      />
      
      <div className={`min-h-screen ${containerClass} py-8 px-4`}>
        <div className="max-w-md mx-auto">
          {/* Profile Header */}
          <div className="text-center mb-8">
            <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-white shadow-lg">
              <AvatarImage 
                src={profileData.avatar_url || `https://api.dicebear.com/7.x/adventurer/svg?seed=${profileData.username}`}
                alt={`${profileData.username}'s avatar`} 
              />
              <AvatarFallback className="text-xl font-bold">
                {profileData.username.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <h1 className="text-2xl font-bold mb-2">
              {profileData.display_name || `@${profileData.username}`}
            </h1>
            
            {profileData.display_name && (
              <p className="text-lg opacity-80 mb-2">@{profileData.username}</p>
            )}
            
            {profileData.bio && (
              <p className="text-center max-w-sm mx-auto opacity-90 leading-relaxed">
                {profileData.bio}
              </p>
            )}
            
            {/* Share Button */}
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Profile
            </Button>
          </div>

          {/* Links Section */}
          <div className="space-y-4">
            {profileData.links && profileData.links.length > 0 ? (
              profileData.links.map((link) => (
                <div
                  key={link.id}
                  className="p-1 hover:scale-[1.02] transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg bg-white/90 backdrop-blur-sm border border-white/20 rounded-lg"
                  onClick={() => handleLinkClick(link.id, link.url)}
                >
                  <Button
                    variant="ghost"
                    className="w-full h-14 justify-start text-left font-medium text-gray-900 hover:bg-transparent"
                  >
                    <div className="flex items-center w-full">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-3 text-white text-sm">
                        {link.icon || <ExternalLink className="w-4 h-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold truncate">{link.title}</div>
                        <div className="text-xs text-gray-500 truncate">{link.url}</div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    </div>
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-lg opacity-70">No links added yet</p>
                <p className="text-sm opacity-50 mt-2">Check back later for updates!</p>
              </div>
            )}
          </div>

          {/* Pi Tips Section */}
          {profileData.pi_wallet_address && (
            <div className="mt-8 p-6 text-center bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border-yellow-300/30 rounded-lg border">
              <h3 className="font-semibold mb-2">💝 Support with Pi</h3>
              <p className="text-sm opacity-80 mb-4">
                Show your appreciation by sending Pi tips!
              </p>
              <Button 
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                onClick={() => {
                  // Implementation for Pi tipping would go here
                  alert('Pi tipping feature coming soon!');
                }}
              >
                💰 Tip with Pi
              </Button>
            </div>
          )}

          {/* Footer */}
          <div className="text-center mt-12 pb-8">
            <p className="text-sm opacity-60">
              Powered by{' '}
              <a 
                href="https://droplink.space" 
                className="font-semibold hover:opacity-80 transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
              >
                Droplink
              </a>
            </p>
            <p className="text-xs opacity-40 mt-1">
              Create your own link-in-bio page
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
