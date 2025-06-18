
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Crown, Shield } from 'lucide-react';
import type { PlanType } from '@/types/plan';

interface PlanSelectorProps {
  selectedPlan: PlanType;
  onPlanSelect: (plan: PlanType) => void;
}

const PlanSelector = ({ selectedPlan, onPlanSelect }: PlanSelectorProps) => {
  const plans = [
    {
      id: 'free' as PlanType,
      name: 'Free',
      price: 0,
      icon: <Star className="w-5 h-5" />,
      color: 'border-gray-200',
      features: [
        '1 Link Only',
        'Basic Profile',
        '3 Basic Templates'
      ]
    },
    {
      id: 'starter' as PlanType,
      name: 'Starter',
      price: 8,
      icon: <Zap className="w-5 h-5" />,
      color: 'border-blue-200',
      popular: true,
      features: [
        'Unlimited Links',
        '.pi Domain Access',
        'Pi Tips Enabled',
        'QR Codes',
        'Basic Analytics',
        '33+ Templates'
      ]
    },
    {
      id: 'pro' as PlanType,
      name: 'Pro',
      price: 12,
      icon: <Crown className="w-5 h-5" />,
      color: 'border-purple-200',
      features: [
        'Everything in Starter',
        'Digital Product Sales',
        'Advanced Analytics',
        'SEO Tools',
        'Link Scheduling',
        '66+ Premium Templates'
      ]
    },
    {
      id: 'premium' as PlanType,
      name: 'Premium',
      price: 18,
      icon: <Shield className="w-5 h-5" />,
      color: 'border-yellow-200',
      features: [
        'Everything in Pro',
        'Custom CSS',
        'API Access',
        '99+ Exclusive Templates',
        'White-label Option'
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
            <div className="text-2xl font-bold text-primary">
              {plan.price === 0 ? 'Free' : `${plan.price}π/month`}
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
            
            <Button
              variant={selectedPlan === plan.id ? "default" : "outline"}
              className="w-full"
              onClick={(e) => {
                e.stopPropagation();
                onPlanSelect(plan.id);
              }}
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
