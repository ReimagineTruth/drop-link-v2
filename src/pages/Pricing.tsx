import { useState } from "react";
import { CheckIcon, ShieldCheck, BadgeDollarSign } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import PiAdsNetwork from "@/components/PiAdsNetwork";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/hooks/use-toast";
import { usePiPayment } from "@/hooks/usePiPayment";

const PricingCard = ({ 
  title, 
  price, 
  annualPrice,
  billingCycle,
  features, 
  isPopular = false,
  ctaText = "Get Started",
  ctaAction,
  currentPlan = false,
  processingPayment = false,
  isAdmin = false
}) => {
  // Calculate display price based on billing cycle
  const displayPrice = billingCycle === 'annual' ? annualPrice : price;
  
  // Calculate savings percentage for annual billing
  const savingsPercent = price > 0 ? Math.round(((price - annualPrice) / price) * 100) : 0;
  const annualSavings = price > 0 ? (price - annualPrice) * 12 : 0;
  
  return (
    <div className={`bg-white rounded-xl shadow-lg p-8 border ${currentPlan ? 'border-green-500' : isPopular ? 'border-primary' : 'border-gray-200'} relative`}>
      {isPopular && !currentPlan && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
          Most Popular
        </div>
      )}
      {currentPlan && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
          Your Plan
        </div>
      )}
      <h3 className="text-xl font-bold mb-2 text-primary">{title}</h3>
      <div className="mb-1">
        <span className="text-3xl font-bold">{displayPrice}π</span>
        <span className="text-gray-500">/month</span>
      </div>
      
      {/* Enhanced billing info */}
      <div className="text-gray-600 mb-6 text-sm">
        {billingCycle === 'annual' ? (
          <div className="space-y-1">
            <p>Billed annually ({annualPrice * 12}π/year)</p>
            <div className="flex items-center justify-center gap-1 text-green-600 font-medium bg-green-50 py-1 px-2 rounded-md">
              <BadgeDollarSign size={16} />
              <span>Save {savingsPercent}% ({annualSavings}π/year)</span>
            </div>
          </div>
        ) : (
          <p>Billed monthly</p>
        )}
      </div>
      
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-2 text-primary"><CheckIcon size={18} /></span>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button 
        onClick={ctaAction}
        className={`w-full ${
          currentPlan 
            ? 'bg-green-500 hover:bg-green-600 cursor-not-allowed' 
            : isAdmin 
              ? 'bg-green-600 hover:bg-green-700'
              : isPopular 
                ? 'bg-gradient-hero hover:bg-secondary' 
                : 'bg-white border border-primary text-primary hover:bg-muted'
        }`}
        disabled={currentPlan || processingPayment || (isAdmin && title !== "Admin Portal")}
      >
        {processingPayment 
          ? "Processing..." 
          : currentPlan 
            ? "Current Plan" 
            : isAdmin 
              ? "Included with Admin" 
              : ctaText
        }
      </Button>
    </div>
  );
};

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('annual'); // 'annual' or 'monthly'
  
  const { isLoggedIn, user, subscription, showAds, isAdmin } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { handleSubscribe, processingPayment } = usePiPayment();
  
  // Updated pricing with monthly/annual options
  const planPricing = {
    starter: { monthly: 10, annual: 8 },
    pro: { monthly: 15, annual: 12 },
    premium: { monthly: 22, annual: 18 }
  };
  
  const starterFeatures = [
    "Unlimited Links",
    "Connect All Social Profiles",
    "Pi AdNetwork",
    "Basic Analytics",
    "Email Support",
    "Community Forums Access"
  ];
  
  const proFeatures = [
    "Everything in Starter",
    "Multi-Factor Authentication",
    "QR Codes for Offline Traffic",
    "Schedule Links",
    "Link Animations",
    "Custom Button Styles",
    "Spotlight Links",
    "Performance Analytics",
    "Custom Themes",
    "Location Analytics",
    "Email/Phone Collection",
    "SEO & Pi Integrations",
    "Community Rewards"
  ];
  
  const premiumFeatures = [
    "Everything in Pro",
    "Sell Products with Pi Payments",
    "Tailored Onboarding",
    "Priority Support (4-Hour)",
    "Historical Insights",
    "Data Export",
    "Whitelabel Option",
    "Advanced Pi Payments",
    "Community Contributor Status"
  ];
  
  const isPlanActive = (plan: string): boolean => {
    if (isAdmin) {
      // For admins, treat all plans as available but not marked as "current"
      return false;
    }
    if (!subscription) return false;
    return subscription.plan.toLowerCase() === plan.toLowerCase();
  };
  
  const getCurrentBillingCycle = (): string => {
    if (!subscription) return 'monthly';
    
    // Determine billing cycle by checking if expires_at is more than 6 months away
    const expiresAt = new Date(subscription.expires_at);
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
    
    return expiresAt > sixMonthsFromNow ? 'annual' : 'monthly';
  };
  
  const userBillingCycle = getCurrentBillingCycle();
  
  const handleSubscribeClick = (plan: string) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    
    handleSubscribe(plan, billingCycle);
  };
  
  // Calculate savings for display in the billing toggle section
  const calculateSavings = () => {
    const monthlyTotal = planPricing.pro.monthly * 12;
    const annualTotal = planPricing.pro.annual * 12;
    return monthlyTotal - annualTotal;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-20 px-6">
        <div className="container mx-auto">
          {/* Show Pi Ads for Starter plan users */}
          {showAds && (
            <div className="mb-8">
              <PiAdsNetwork placementId="pricing-top" />
            </div>
          )}
          
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-primary">Pricing Plans</h1>
            <p className="text-xl max-w-2xl mx-auto text-gray-600">
              Choose a plan to amplify your presence and join our community-driven ecosystem.
            </p>
            
            {/* Admin notice */}
            {isAdmin && (
              <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-lg inline-block">
                <p className="text-green-800 flex items-center">
                  <ShieldCheck className="h-5 w-5 mr-2" />
                  <span className="font-bold">Admin account detected</span>
                </p>
                <p className="text-sm text-green-700 mt-1">
                  As an admin, you have access to all premium features without payment
                </p>
              </div>
            )}
            
            {!isAdmin && (
              <div className="mt-6">
                <div className="inline-flex items-center p-1 bg-muted rounded-lg">
                  <button
                    onClick={() => setBillingCycle('annual')}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                      billingCycle === 'annual' ? 'bg-white shadow-sm' : 'text-gray-500'
                    }`}
                  >
                    Annual
                  </button>
                  <button
                    onClick={() => setBillingCycle('monthly')}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                      billingCycle === 'monthly' ? 'bg-white shadow-sm' : 'text-gray-500'
                    }`}
                  >
                    Monthly
                  </button>
                </div>
                
                {/* Show savings callout for annual billing */}
                {billingCycle === 'annual' && (
                  <div className="mt-3 inline-flex items-center bg-green-50 text-green-700 py-1 px-3 rounded-lg text-sm">
                    <BadgeDollarSign size={16} className="mr-1" />
                    <span>Save up to {calculateSavings()}π per year with annual billing</span>
                  </div>
                )}
              </div>
            )}
            
            {isLoggedIn && subscription && !isAdmin && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg inline-block">
                <p className="text-sm text-blue-800">
                  You're currently on the <span className="font-bold">
                    {subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)} ({userBillingCycle})
                  </span> plan
                </p>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              title="Starter"
              price={planPricing.starter.monthly}
              annualPrice={planPricing.starter.annual}
              billingCycle={billingCycle}
              features={starterFeatures}
              ctaText={isAdmin ? "Admin Access" : isLoggedIn ? "Subscribe Now" : "Sign Up & Subscribe"}
              ctaAction={() => isAdmin ? 
                toast({
                  title: "Admin Access",
                  description: "You already have access to all features as an admin",
                }) : 
                handleSubscribeClick("Starter")
              }
              currentPlan={isPlanActive("starter") && userBillingCycle === billingCycle}
              processingPayment={processingPayment}
              isAdmin={isAdmin}
            />
            
            <PricingCard
              title="Pro"
              price={planPricing.pro.monthly}
              annualPrice={planPricing.pro.annual}
              billingCycle={billingCycle}
              features={proFeatures}
              isPopular={true}
              ctaText={isAdmin ? "Admin Access" : isLoggedIn ? "Subscribe Now" : "Sign Up & Subscribe"}
              ctaAction={() => isAdmin ? 
                toast({
                  title: "Admin Access",
                  description: "You already have access to all features as an admin",
                }) : 
                handleSubscribeClick("Pro")
              }
              currentPlan={isPlanActive("pro") && userBillingCycle === billingCycle}
              processingPayment={processingPayment}
              isAdmin={isAdmin}
            />
            
            <PricingCard
              title="Premium"
              price={planPricing.premium.monthly}
              annualPrice={planPricing.premium.annual}
              billingCycle={billingCycle}
              features={premiumFeatures}
              ctaText={isAdmin ? "Admin Access" : isLoggedIn ? "Subscribe Now" : "Sign Up & Subscribe"}
              ctaAction={() => isAdmin ? 
                toast({
                  title: "Admin Access",
                  description: "You already have access to all features as an admin",
                }) : 
                handleSubscribeClick("Premium")
              }
              currentPlan={isPlanActive("premium") && userBillingCycle === billingCycle}
              processingPayment={processingPayment}
              isAdmin={isAdmin}
            />
          </div>
          
          {/* Show another ad in the middle for Starter users */}
          {showAds && (
            <div className="my-16">
              <PiAdsNetwork placementId="pricing-middle" />
            </div>
          )}
          
          {/* FAQ section */}
          <div className="mt-16 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            
            <div className="text-left space-y-6 mt-8">
              <div>
                <h3 className="font-bold text-lg">Do I need a Pi account to use Droplink?</h3>
                <p className="text-gray-600 mt-2">
                  Yes, you'll need a Pi Network account to receive payments and tips through your Droplink page.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg">What's in the Pro trial?</h3>
                <p className="text-gray-600 mt-2">
                  The 7-day Pro trial includes all Pro features (analytics, themes, QR codes). After the trial period, it's 6π/month, billed annually.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg">Can I switch between plans or billing cycles?</h3>
                <p className="text-gray-600 mt-2">
                  Yes, you can upgrade, downgrade, or change your billing cycle at any time. When upgrading or changing to monthly billing, the changes take effect immediately. When downgrading or switching to annual billing, changes will apply at the end of your current billing period.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg">What happens when I cancel my subscription?</h3>
                <p className="text-gray-600 mt-2">
                  If you cancel your subscription, you'll keep premium access until the end of your current billing period. After that, your account will revert to the free tier features. Please note there are no refunds for canceled subscriptions.
                </p>
              </div>
            </div>
          </div>
          
          {/* Show another ad at the bottom for Starter users */}
          {showAds && (
            <div className="mt-16">
              <PiAdsNetwork placementId="pricing-bottom" />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
