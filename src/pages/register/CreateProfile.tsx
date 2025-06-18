
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Upload, User, FileText, ExternalLink } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import FeatureGate from '@/components/dashboard/FeatureGate';
import { usePlanFeatures } from '@/hooks/usePlanFeatures';

const CreateProfile = () => {
  const navigate = useNavigate();
  const { user, refreshUserData } = useUser();
  const { currentPlan } = usePlanFeatures();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Profile data
  const [profileData, setProfileData] = useState({
    displayName: '',
    bio: '',
    avatar: '',
    username: '',
    title: ''
  });

  // Links data
  const [links, setLinks] = useState([
    { title: '', url: '', icon: '' }
  ]);

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const addLink = () => {
    if (currentPlan === 'free' && links.length >= 1) {
      toast({
        title: "Link Limit Reached",
        description: "Free plan allows only 1 link. Upgrade to add more links.",
        variant: "destructive"
      });
      return;
    }
    setLinks([...links, { title: '', url: '', icon: '' }]);
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const updateLink = (index: number, field: string, value: string) => {
    const updatedLinks = links.map((link, i) => 
      i === index ? { ...link, [field]: value } : link
    );
    setLinks(updatedLinks);
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      // Update profile
      const { error: profileError } = await supabase
        .from('user_profiles')
        .update({
          display_name: profileData.displayName,
          bio: profileData.bio,
          avatar_url: profileData.avatar,
          profile_title: profileData.title,
          updated_at: new Date().toISOString()
        })
        .eq('id', user?.id);

      if (profileError) throw profileError;

      // Save links
      for (const link of links.filter(l => l.title && l.url)) {
        const { error: linkError } = await supabase
          .from('links')
          .insert({
            user_id: user?.id,
            title: link.title,
            url: link.url,
            icon: link.icon,
            position: links.indexOf(link)
          });
        
        if (linkError) throw linkError;
      }

      await refreshUserData();
      
      toast({
        title: "Profile Created Successfully! 🎉",
        description: "Your profile is now live and ready to share.",
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating profile:', error);
      toast({
        title: "Error",
        description: "Failed to create profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Create Your Profile</h2>
              <p className="text-muted-foreground">Tell the world who you are</p>
            </div>
            
            <div className="space-y-4">
              {/* Avatar Upload */}
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profileData.avatar} />
                  <AvatarFallback className="text-2xl">
                    <User className="w-8 h-8" />
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Photo
                </Button>
              </div>

              {/* Profile Fields */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="username">Username *</Label>
                  <Input
                    id="username"
                    value={profileData.username}
                    onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                    placeholder="your-username"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Your profile will be available at: droplink.app/u/{profileData.username || 'username'}
                  </p>
                </div>

                <div>
                  <Label htmlFor="displayName">Display Name *</Label>
                  <Input
                    id="displayName"
                    value={profileData.displayName}
                    onChange={(e) => setProfileData({...profileData, displayName: e.target.value})}
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={profileData.title}
                    onChange={(e) => setProfileData({...profileData, title: e.target.value})}
                    placeholder="Your title or profession"
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    placeholder="Tell people about yourself..."
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Add Your Links</h2>
              <p className="text-muted-foreground">Share your important links</p>
              <Badge className="mt-2">
                {currentPlan === 'free' ? '1 link available' : 'Unlimited links'}
              </Badge>
            </div>

            <div className="space-y-4">
              {links.map((link, index) => (
                <FeatureGate
                  key={index}
                  requiredPlan="starter"
                  featureName="Additional Links"
                  currentPlan={currentPlan}
                  showLockIcon={index > 0 && currentPlan === 'free'}
                >
                  <Card className={index > 0 && currentPlan === 'free' ? 'opacity-50' : ''}>
                    <CardContent className="pt-4">
                      <div className="space-y-3">
                        <div>
                          <Label>Link Title</Label>
                          <Input
                            value={link.title}
                            onChange={(e) => updateLink(index, 'title', e.target.value)}
                            placeholder="My Website"
                            disabled={index > 0 && currentPlan === 'free'}
                          />
                        </div>
                        <div>
                          <Label>URL</Label>
                          <Input
                            value={link.url}
                            onChange={(e) => updateLink(index, 'url', e.target.value)}
                            placeholder="https://example.com"
                            disabled={index > 0 && currentPlan === 'free'}
                          />
                        </div>
                        {links.length > 1 && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => removeLink(index)}
                            disabled={index > 0 && currentPlan === 'free'}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </FeatureGate>
              ))}

              <Button 
                variant="outline" 
                onClick={addLink}
                className="w-full"
                disabled={currentPlan === 'free' && links.length >= 1}
              >
                + Add Link
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Preview Your Profile</h2>
              <p className="text-muted-foreground">See how your profile will look to visitors</p>
            </div>

            {/* Profile Preview */}
            <Card className="max-w-sm mx-auto">
              <CardContent className="p-6 text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={profileData.avatar} />
                  <AvatarFallback>
                    {profileData.displayName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <h3 className="text-xl font-bold mb-1">{profileData.displayName}</h3>
                {profileData.title && (
                  <p className="text-sm text-muted-foreground mb-2">{profileData.title}</p>
                )}
                {profileData.bio && (
                  <p className="text-sm mb-4">{profileData.bio}</p>
                )}

                <div className="space-y-2">
                  {links.filter(l => l.title && l.url).map((link, index) => (
                    <Button 
                      key={index}
                      variant="outline" 
                      className="w-full"
                      size="sm"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {link.title}
                    </Button>
                  ))}
                </div>

                {currentPlan === 'free' && (
                  <p className="text-xs text-muted-foreground mt-4">
                    Powered by Droplink
                  </p>
                )}
              </CardContent>
            </Card>

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Your profile URL: 
                <br />
                <code className="bg-gray-100 px-2 py-1 rounded">
                  droplink.app/u/{profileData.username || 'username'}
                </code>
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Setup Your Profile</h1>
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        <Card className="mb-8">
          <CardContent className="p-8">
            {renderStep()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          
          {currentStep < totalSteps ? (
            <Button
              onClick={handleNext}
              className="flex items-center gap-2"
              disabled={!profileData.displayName || !profileData.username}
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              disabled={loading}
              className="bg-gradient-to-r from-primary to-secondary"
            >
              {loading ? 'Creating...' : 'Complete Setup'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
