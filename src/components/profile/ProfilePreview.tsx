
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Share2, Heart, QrCode } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface ProfilePreviewProps {
  profileData: any;
  currentPlan: string;
  onShareProfile: () => void;
}

const ProfilePreview = ({ profileData, currentPlan, onShareProfile }: ProfilePreviewProps) => {
  const profileUrl = `${window.location.origin}/u/${profileData.username}`;
  
  const themeClasses = {
    light: "bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-900",
    dark: "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white",
    pastel: "bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 text-purple-900"
  };

  const theme = profileData.theme?.type || 'light';
  const containerClass = themeClasses[theme as keyof typeof themeClasses] || themeClasses.light;

  return (
    <div className="max-w-sm mx-auto">
      {/* Mobile phone frame */}
      <div className="relative bg-gray-900 rounded-3xl p-2 shadow-2xl">
        <div className="bg-white rounded-2xl overflow-hidden">
          {/* Status bar */}
          <div className="bg-gray-900 text-white text-xs flex justify-between items-center px-4 py-1">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2 bg-white rounded-sm"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
          </div>
          
          {/* URL Bar */}
          <div className="bg-gray-100 px-4 py-2 border-b">
            <div className="bg-white rounded-lg px-3 py-1 flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-mono text-sm font-bold text-primary">
                {currentPlan !== 'free' && profileData.pi_domain ? 
                  `${profileData.pi_domain}.pi` : 
                  `droplink.app/u/${profileData.username}`
                }
              </span>
            </div>
          </div>
          
          {/* Profile content */}
          <div className={`p-4 min-h-[500px] ${containerClass}`}>
            {/* Pi Ads for Free Plan */}
            {currentPlan === 'free' && (
              <div className="mb-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg text-center">
                <p className="text-xs text-yellow-800 font-medium">📢 Pi Network Ad</p>
                <p className="text-xs text-yellow-600 mt-1">Upgrade to remove ads</p>
              </div>
            )}
            
            {/* Profile header */}
            <div className="text-center mb-4">
              <Avatar className="w-16 h-16 mx-auto mb-3 border-4 border-white shadow-lg">
                <AvatarImage 
                  src={profileData.avatar_url || `https://api.dicebear.com/7.x/adventurer/svg?seed=${profileData.username}`}
                  alt={`${profileData.username}'s avatar`} 
                />
                <AvatarFallback className="text-xl font-bold">
                  {profileData.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <h1 className="text-lg font-bold text-white mb-1 drop-shadow-md">
                {profileData.display_name || profileData.username}
              </h1>
              
              {profileData.display_name && (
                <p className="text-white/90 text-xs mb-2 drop-shadow-sm">@{profileData.username}</p>
              )}
              
              {profileData.bio && (
                <p className="text-white/90 text-xs leading-relaxed mb-3 drop-shadow-sm">
                  {profileData.bio}
                </p>
              )}
              
              <Badge className="text-xs mb-4">
                {currentPlan === 'free' ? '❤️ Free' :
                 currentPlan === 'starter' ? '⚡ Starter' :
                 currentPlan === 'pro' ? '👑 Pro' : '💎 Premium'}
              </Badge>
            </div>
            
            {/* Links */}
            <div className="space-y-2 mb-4">
              {profileData.links && profileData.links.slice(0, currentPlan === 'free' ? 1 : 6).map((link: any, index: number) => (
                <Button 
                  key={index}
                  className="w-full bg-white/90 hover:bg-white text-gray-800 backdrop-blur-sm rounded-xl py-2 h-auto text-xs shadow-lg"
                  variant="default"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium">{link.title}</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </Button>
              ))}
              
              {currentPlan === 'free' && (
                <div className="text-center py-2">
                  <p className="text-xs text-white/70 drop-shadow-sm">Upgrade for unlimited links</p>
                </div>
              )}
            </div>

            {/* Pi Tips Section (Starter+ only) */}
            {currentPlan !== 'free' && (
              <div className="mb-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-3 text-center">
                <Button 
                  className="w-full border-2 border-white/50 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm rounded-xl py-2 text-xs"
                  variant="outline"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium">💰 Tip me in Pi</span>
                    <Heart className="w-3 h-3" />
                  </div>
                </Button>
              </div>
            )}
            
            {/* Social links */}
            <div className="flex justify-center gap-2 mb-4">
              <Button size="sm" variant="outline" className="w-8 h-8 p-0 rounded-full bg-white/20 border-white/50 text-white hover:bg-white/30 backdrop-blur-sm">
                <span>𝕏</span>
              </Button>
              <Button size="sm" variant="outline" className="w-8 h-8 p-0 rounded-full bg-white/20 border-white/50 text-white hover:bg-white/30 backdrop-blur-sm">
                <span>📷</span>
              </Button>
              <Button size="sm" variant="outline" className="w-8 h-8 p-0 rounded-full bg-white/20 border-white/50 text-white hover:bg-white/30 backdrop-blur-sm">
                <span>💼</span>
              </Button>
            </div>
            
            {/* QR Code (Starter+ only) */}
            {currentPlan !== 'free' && (
              <div className="text-center mb-4">
                <Button size="sm" variant="ghost" className="text-white/80 hover:text-white text-xs bg-white/10 hover:bg-white/20 backdrop-blur-sm">
                  <QrCode className="w-3 h-3 mr-1" />
                  Show QR Code
                </Button>
              </div>
            )}
            
            {/* Share button */}
            <div className="text-center mb-4">
              <Button 
                size="sm" 
                variant="ghost" 
                className="text-white/80 hover:text-white text-xs"
                onClick={onShareProfile}
              >
                <Share2 className="w-3 h-3 mr-1" />
                Share Profile
              </Button>
            </div>
            
            {/* Droplink Badge for Free Plan */}
            {currentPlan === 'free' && (
              <div className="text-center">
                <p className="text-xs text-white/60 drop-shadow-sm">Powered by Droplink</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile URL */}
      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground mb-2">Your profile URL:</p>
        <div className="bg-gray-100 rounded-lg p-2">
          <code className="text-sm font-mono break-all">{profileUrl}</code>
        </div>
      </div>
    </div>
  );
};

export default ProfilePreview;
