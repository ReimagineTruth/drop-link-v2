import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import PlanSelector from '@/components/onboarding/PlanSelector';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import type { PlanType } from '@/types/plan';

const Onboarding = () => {
  const navigate = useNavigate();
  const { user, refreshUserData } = useUser();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('starter');
  const [loading, setLoading] = useState(false);

  const totalSteps = 4;
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

  const handlePlanSelection = async () => {
    setLoading(true);
    try {
      // Update user's selected plan in the database
      const { error } = await supabase
        .from('user_profiles')
        .update({ plan: selectedPlan })
        .eq('id', user?.id);

      if (error) throw error;

      // Create subscription record if not free
      if (selectedPlan !== 'free') {
        const expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + 1); // 1 month subscription

        const { error: subError } = await supabase
          .from('subscriptions')
          .insert({
            user_id: user?.id,
            plan: selectedPlan,
            is_active: true,
            expires_at: expiresAt.toISOString(),
            amount: selectedPlan === 'starter' ? 8 : selectedPlan === 'pro' ? 12 : 18
          });

        if (subError) throw subError;
      }

      await refreshUserData();
      toast({
        title: "Plan Selected!",
        description: `You've successfully selected the ${selectedPlan} plan.`,
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Error selecting plan:', error);
      toast({
        title: "Error",
        description: "Failed to select plan. Please try again.",
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
              <h2 className="text-2xl font-bold mb-2">Welcome to Droplink! 🎉</h2>
              <p className="text-muted-foreground">Let's set up your Pi Network profile in just a few steps.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="text-center p-4">
                <div className="text-3xl mb-2">🔗</div>
                <h3 className="font-semibold">Create Links</h3>
                <p className="text-sm text-muted-foreground">Add unlimited links to your profile</p>
              </Card>
              <Card className="text-center p-4">
                <div className="text-3xl mb-2">💰</div>
                <h3 className="font-semibold">Earn Pi</h3>
                <p className="text-sm text-muted-foreground">Receive Pi tips from your audience</p>
              </Card>
              <Card className="text-center p-4">
                <div className="text-3xl mb-2">📊</div>
                <h3 className="font-semibold">Track Performance</h3>
                <p className="text-sm text-muted-foreground">Monitor clicks and engagement</p>
              </Card>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Choose Your Plan</h2>
              <p className="text-muted-foreground">Select the plan that best fits your needs.</p>
            </div>
            <PlanSelector selectedPlan={selectedPlan} onPlanSelect={setSelectedPlan} />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Plan Summary</h2>
              <p className="text-muted-foreground">Review your selected plan features.</p>
            </div>
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-center capitalize">{selectedPlan} Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {selectedPlan === 'free' ? '0π' : 
                     selectedPlan === 'starter' ? '8π' :
                     selectedPlan === 'pro' ? '12π' : '18π}/month
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold">You'll get access to:</h4>
                  <ul className="text-sm space-y-1">
                    {selectedPlan === 'free' && (
                      <>
                        <li>• 1 Link</li>
                        <li>• Basic Profile</li>
                        <li>• 3 Basic Templates</li>
                      </>
                    )}
                    {selectedPlan === 'starter' && (
                      <>
                        <li>• Unlimited Links</li>
                        <li>• .pi Domain</li>
                        <li>• Pi Tips</li>
                        <li>• 33+ Templates</li>
                        <li>• Basic Analytics</li>
                      </>
                    )}
                    {selectedPlan === 'pro' && (
                      <>
                        <li>• Everything in Starter</li>
                        <li>• Product Sales</li>
                        <li>• Advanced Analytics</li>
                        <li>• 66+ Premium Templates</li>
                        <li>• SEO Tools</li>
                      </>
                    )}
                    {selectedPlan === 'premium' && (
                      <>
                        <li>• Everything in Pro</li>
                        <li>• Custom CSS</li>
                        <li>• API Access</li>
                        <li>• 99+ Templates</li>
                        <li>• White-label Option</li>
                      </>
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-2">You're All Set!</h2>
            <p className="text-muted-foreground mb-6">
              Your account is ready with the <strong className="capitalize">{selectedPlan}</strong> plan.
              Start building your Pi Network presence today!
            </p>
            <Button 
              onClick={handlePlanSelection}
              disabled={loading}
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary"
            >
              {loading ? 'Setting up...' : 'Go to Dashboard'}
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Setup Your Account</h1>
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
          
          {currentStep < totalSteps && (
            <Button
              onClick={handleNext}
              className="flex items-center gap-2"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
