
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Globe, Zap, DollarSign, Play } from "lucide-react";
import { useUser } from "@/context/UserContext";

const Hero = () => {
  const { isLoggedIn, profile } = useUser();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Enhanced background with mobile optimization */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50" />
      <div className="absolute -top-40 -right-40 w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-3xl animate-pulse" />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-5xl mx-auto space-y-6 md:space-y-8">
          {/* Enhanced heading with mobile responsiveness */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-primary via-blue-600 to-secondary bg-clip-text text-transparent">
              Drive Mass Adoption
            </span>
            <br />
            <span className="text-gray-900">with Droplink</span>
          </h1>
          
          {/* Enhanced description */}
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            The complete link-in-bio platform for Pi Network creators. From custom profiles to Pi payments, 
            analytics to templates - everything you need to monetize your audience and drive Pi Network adoption.
          </p>
          
          {/* Feature highlights with mobile layout */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto my-8 md:my-12">
            <div className="text-center p-3 md:p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                <Users className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <p className="text-sm md:text-base font-semibold text-gray-900">Custom Profiles</p>
            </div>
            
            <div className="text-center p-3 md:p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                <DollarSign className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <p className="text-sm md:text-base font-semibold text-gray-900">Pi Payments</p>
            </div>
            
            <div className="text-center p-3 md:p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                <Globe className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <p className="text-sm md:text-base font-semibold text-gray-900">Pi Domains</p>
            </div>
            
            <div className="text-center p-3 md:p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                <Zap className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <p className="text-sm md:text-base font-semibold text-gray-900">100+ Templates</p>
            </div>
          </div>

          {/* Video Demo Section */}
          <div className="my-12 md:my-16">
            <div className="max-w-4xl mx-auto">
              <div className="relative bg-white rounded-xl md:rounded-2xl shadow-xl overflow-hidden">
                {/* Video Container - Responsive 16:9 aspect ratio */}
                <div className="relative w-full" style={{ paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                  <iframe 
                    src="https://www.youtube-nocookie.com/embed/1sv5cf9ygZs?si=rATq0V5J1SH_iNpE&controls=1" 
                    title="Droplink Demo - Transform Your Pi Domain" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  />
                  
                  {/* Overlay for branding */}
                  <div className="absolute top-2 md:top-4 left-2 md:left-4 bg-black/50 backdrop-blur-sm rounded-lg px-2 md:px-3 py-1 md:py-2 z-10">
                    <div className="flex items-center gap-1 md:gap-2 text-white text-xs md:text-sm font-medium">
                      <Play className="h-3 w-3 md:h-4 md:w-4" />
                      Droplink Demo
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced CTA buttons with mobile optimization */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 md:pt-6">
            {isLoggedIn && profile ? (
              <>
                <Button asChild size="lg" className="w-full sm:w-auto bg-gradient-hero hover:bg-secondary transform transition hover:scale-105 duration-200 text-lg px-8 py-4">
                  <Link to="/dashboard" className="flex items-center gap-2">
                    Go to Dashboard <ArrowRight size={20} />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto hover:bg-blue-50 transition-colors text-lg px-8 py-4">
                  <Link to={`/@${profile.username}`}>View Your Profile</Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild size="lg" className="w-full sm:w-auto bg-gradient-hero hover:bg-secondary transform transition hover:scale-105 duration-200 text-lg px-8 py-4">
                  <Link to="/signup" className="flex items-center gap-2">
                    Start Building Free <ArrowRight size={20} />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto hover:bg-blue-50 transition-colors text-lg px-8 py-4">
                  <Link to="/demo">Try Demo</Link>
                </Button>
              </>
            )}
          </div>
          
          {/* Social proof with mobile layout */}
          <div className="pt-8 md:pt-12">
            <p className="text-sm md:text-base text-gray-500 mb-4 md:mb-6">
              Trusted by Pi Network creators worldwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 opacity-60">
              <div className="text-xs md:text-sm font-semibold text-gray-600 bg-white/50 px-3 md:px-4 py-2 rounded-full">
                10,000+ Users
              </div>
              <div className="text-xs md:text-sm font-semibold text-gray-600 bg-white/50 px-3 md:px-4 py-2 rounded-full">
                50,000+ Links Created
              </div>
              <div className="text-xs md:text-sm font-semibold text-gray-600 bg-white/50 px-3 md:px-4 py-2 rounded-full">
                100π+ Processed
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
