import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Check, Lock, Star, Zap, Crown, Shield } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import TestPaymentModal from '@/components/onboarding/TestPaymentModal';
import type { PlanType } from '@/types/plan';

const SelectPlan = () => {
  const navigate = useNavigate();
  const { user, refreshUserData } = useUser();
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('starter');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const progress = 50; // Step 2 of 4

  const plans = [
    {
      id: 'free' as PlanType,
      name: 'Free',
      price: 0,
      icon: <Star className="w-5 h-5" />,
      color: 'border-gray-200 bg-gray-50',
      buttonColor: 'bg-gray-500 hover:bg-gray-600',
      features: [
        '1 Link Only',
        'Basic Profile',
        'Pi Ads Shown',
        'Droplink Badge',
        '3 Basic Templates'
      ],
      limitations: [
        'No .pi Domain',
        'No Pi Tips',
        'No Analytics',
        'No QR Codes',
        'No Custom Themes'
      ]
    },
    {
      id: 'starter' as PlanType,
      name: 'Starter',
      price: 8,
      icon: <Zap className="w-5 h-5" />,
      color: 'border-blue-200 bg-blue-50',
      buttonColor: 'bg-blue-500 hover:bg-blue-600',
      popular: true,
      features: [
        'Unlimited Links',
        '.pi Domain Access',
        'Pi Tips Enabled',
        'No Ads',
        'QR Codes',
        'Basic Analytics',
        '33+ Templates'
      ],
      limitations: [
        'No Product Sales',
        'No Link Scheduling',
        'No SEO Tools'
      ]
    },
    {
      id: 'pro' as PlanType,
      name: 'Pro',
      price: 12,
      icon: <Crown className="w-5 h-5" />,
      color: 'border-purple-200 bg-purple-50',
      buttonColor: 'bg-purple-500 hover:bg-purple-600',
      features: [
        'Everything in Starter',
        'Digital Product Sales',
        'Advanced Analytics',
        'SEO Tools',
        'Link Scheduling',
        'Custom Themes',
        '66+ Premium Templates'
      ],
      limitations: [
        'No Custom CSS',
        'No API Access'
      ]
    },
    {
      id: 'premium' as PlanType,
      name: 'Premium',
      price: 18,
      icon: <Shield className="w-5 h-5" />,
      color: 'border-yellow-200 bg-yellow-50',
      buttonColor: 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600',
      features: [
        'Everything in Pro',
        'Sell Products with Pi',
        'Priority Support',
        'Custom CSS',
        'API Access',
        '99+ Exclusive Templates',
        'White-label Option'
      ],
      limitations: []
    }
  ];

  const handleSelectPlan = async (planId: PlanType) => {
    setSelectedPlan(planId);
    
    if (planId === 'free') {
      // For free plan, proceed directly
      await createSubscription(planId, 0);
    } else {
      // For paid plans, show payment modal
      setShowPaymentModal(true);
    }
  };

  const createSubscription = async (plan: PlanType, amount: number) => {
    setLoading(true);
    try {
      // Update user's plan
      const { error: profileError } = await supabase
        .from('user_profiles')
        .update({ plan })
        .eq('id', user?.id);

      if (profileError) throw profileError;

      // Create subscription record if not free
      if (plan !== 'free') {
        const expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + 1);

        const { error: subError } = await supabase
          .from('subscriptions')
          .insert({
            user_id: user?.id,
            plan,
            is_active: true,
            expires_at: expiresAt.toISOString(),
            amount
          });

        if (subError) throw subError;
      }

      await refreshUserData();
      
      toast({
        title: "Plan Selected! 🎉",
        description: `Welcome to the ${plan} plan! Let's create your profile.`,
      });

      navigate('/register/create-profile');
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

  const handlePaymentSuccess = async () => {
    setShowPaymentModal(false);
    const selectedPlanData = plans.find(p => p.id === selectedPlan);
    await createSubscription(selectedPlan, selectedPlanData?.price || 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Choose Your Plan</h1>
            <span className="text-sm text-muted-foreground">Step 2 of 4</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedPlan === plan.id
                  ? 'ring-2 ring-primary shadow-lg'
                  : plan.color
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary text-white">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-2">
                <div className="flex items-center justify-center mb-2">
                  {plan.icon}
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="text-2xl font-bold text-primary">
                  ${plan.price}{plan.price > 0 && '/month'}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-green-600">Included:</h4>
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {plan.limitations.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-gray-500">Limitations:</h4>
                    {plan.limitations.map((limitation, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Lock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-500">{limitation}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => navigate('/register/your-information')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          
          <Button
            onClick={() => handleSelectPlan(selectedPlan)}
            disabled={loading}
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary"
          >
            {loading ? 'Processing...' : 
             selectedPlan === 'free' ? 'Continue with Free' : 'Continue with Payment'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Test Payment Modal */}
      <TestPaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        selectedPlan={selectedPlan}
        amount={plans.find(p => p.id === selectedPlan)?.price || 0}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default SelectPlan;
