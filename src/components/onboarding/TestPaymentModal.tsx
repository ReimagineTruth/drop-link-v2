
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock, Shield, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface TestPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: string;
  amount: number;
  onPaymentSuccess: () => void;
}

const TestPaymentModal = ({
  isOpen,
  onClose,
  selectedPlan,
  amount,
  onPaymentSuccess
}: TestPaymentModalProps) => {
  const [processing, setProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [expiryDate, setExpiryDate] = useState('12/25');
  const [cvv, setCvv] = useState('123');
  const [name, setName] = useState('Test User');

  const handleTestPayment = async () => {
    setProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Payment Successful! 🎉",
      description: `Your ${selectedPlan} plan has been activated. Welcome to Droplink!`,
    });
    
    setProcessing(false);
    onPaymentSuccess();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CreditCard className="w-5 h-5 text-blue-600" />
            </div>
            <DialogTitle>Complete Your Purchase</DialogTitle>
          </div>
          <DialogDescription>
            <div className="flex items-center justify-between">
              <span>Upgrading to</span>
              <Badge className="bg-gradient-to-r from-primary to-secondary text-white">
                <span className="capitalize">{selectedPlan}</span> Plan
              </Badge>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="capitalize">{selectedPlan} Plan (Monthly)</span>
                <span className="font-semibold">${amount}/month</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Tax</span>
                <span>$0.00</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>Total</span>
                <span>${amount}/month</span>
              </div>
            </CardContent>
          </Card>

          {/* Test Payment Form */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Test Payment (Development Mode)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="4242 4242 4242 4242"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    placeholder="MM/YY"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="123"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Cardholder Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                />
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center gap-2 text-green-700 text-sm">
              <Lock className="w-4 h-4" />
              <span>Test mode - No real charges will be made</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleTestPayment}
              disabled={processing}
              className="flex-1 bg-gradient-to-r from-primary to-secondary"
            >
              {processing ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Complete Purchase
                </div>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TestPaymentModal;
