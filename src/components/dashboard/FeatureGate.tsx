
import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FeatureRestrictionModal from '@/components/onboarding/FeatureRestrictionModal';
import { useUser } from '@/context/UserContext';
import { useNavigate } from 'react-router-dom';

interface FeatureGateProps {
  children: React.ReactNode;
  requiredPlan: 'starter' | 'pro' | 'premium';
  featureName: string;
  currentPlan: string;
  showLockIcon?: boolean;
}

const FeatureGate = ({ 
  children, 
  requiredPlan, 
  featureName, 
  currentPlan,
  showLockIcon = true 
}: FeatureGateProps) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const planHierarchy = {
    'free': 0,
    'starter': 1,
    'pro': 2,
    'premium': 3
  };

  const hasAccess = planHierarchy[currentPlan as keyof typeof planHierarchy] >= 
                   planHierarchy[requiredPlan];

  const handleUpgrade = () => {
    setShowModal(false);
    navigate('/pricing');
  };

  if (hasAccess) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="relative">
        <div className="opacity-50 pointer-events-none">
          {children}
        </div>
        
        {showLockIcon && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg">
            <Button
              variant="outline"
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 shadow-lg"
            >
              <Lock className="w-4 h-4" />
              Unlock {featureName}
            </Button>
          </div>
        )}
      </div>

      <FeatureRestrictionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        featureName={featureName}
        requiredPlan={requiredPlan}
        currentPlan={currentPlan}
        onUpgrade={handleUpgrade}
      />
    </>
  );
};

export default FeatureGate;
