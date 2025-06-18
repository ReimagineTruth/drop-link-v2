
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Lock, Star, Zap, Crown, Shield } from 'lucide-react';

export type PlanType = 'free' | 'starter' | 'pro' | 'premium';

interface PlanSelectorProps {
  selectedPlan: PlanType;
  onPlanSelect: (plan: PlanType) => void;
}

const PlanSelector = ({ selectedPlan, onPlanSelect }: PlanSelectorProps) => {
  const plans = [
    {
      id: 'free' as PlanType,
      name: 'Free',
      price: '0π',
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
      price: '8π',
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
      price: '12π',
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
      price: '18π',
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {plans.map((plan) => (
        <Card
          key={plan.id}
          className={`relative cursor-pointer transition-all duration-200 hover:shadow-lg ${
            selectedPlan === plan.id
              ? 'ring-2 ring-primary shadow-lg'
              : plan.color
          }`}
          onClick={() => onPlanSelect(plan.id)}
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
            <div className="text-2xl font-bold text-primary">{plan.price}/month</div>
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
            
            <Button
              className={`w-full ${plan.buttonColor} text-white`}
              variant={selectedPlan === plan.id ? "default" : "outline"}
            >
              {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PlanSelector;
