
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Crown, Zap, Star, Shield } from "lucide-react";

interface FeatureRestrictionModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
  requiredPlan: string;
  currentPlan: string;
  onUpgrade: () => void;
}

const FeatureRestrictionModal = ({
  isOpen,
  onClose,
  featureName,
  requiredPlan,
  currentPlan,
  onUpgrade
}: FeatureRestrictionModalProps) => {
  const planIcons = {
    'starter': <Zap className="w-4 h-4" />,
    'pro': <Crown className="w-4 h-4" />,
    'premium': <Shield className="w-4 h-4" />
  };

  const planColors = {
    'starter': 'bg-blue-500',
    'pro': 'bg-purple-500',
    'premium': 'bg-gradient-to-r from-yellow-500 to-orange-500'
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Lock className="w-5 h-5 text-amber-600" />
            </div>
            <DialogTitle>Feature Locked</DialogTitle>
          </div>
          <DialogDescription className="text-left">
            <strong>{featureName}</strong> is only available on the{" "}
            <Badge className={`${planColors[requiredPlan as keyof typeof planColors]} text-white ml-1`}>
              {planIcons[requiredPlan as keyof typeof planIcons]}
              <span className="ml-1 capitalize">{requiredPlan}</span>
            </Badge>{" "}
            plan or higher.
            <br />
            <br />
            You're currently on the <strong className="capitalize">{currentPlan}</strong> plan.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Upgrade Benefits:</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Unlock {featureName.toLowerCase()}</li>
              <li>• Access to premium templates</li>
              <li>• Priority support</li>
              <li>• Remove limitations</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Maybe Later
            </Button>
            <Button onClick={onUpgrade} className="flex-1 bg-gradient-to-r from-primary to-secondary">
              <Crown className="w-4 h-4 mr-2" />
              Upgrade Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeatureRestrictionModal;
