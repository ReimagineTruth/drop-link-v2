
import React from "react";
import { Link } from "react-router-dom";
import { Menu, X, Home, File, DollarSign, HelpCircle, Users, MessageSquare, BarChart3, LogOut, LogIn, UserPlus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";

const MobileNavigation = () => {
  const [open, setOpen] = React.useState(false);
  const { user, signOut } = useAuth();

  const navigationItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Templates", path: "/templates", icon: File },
    { name: "Pricing", path: "/pricing", icon: DollarSign },
    { name: "Help", path: "/help", icon: HelpCircle },
    { name: "Community", path: "/community", icon: Users },
    { name: "Forums", path: "/forums", icon: MessageSquare },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden ml-auto">
        <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Navigation Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          {/* Navigation Items */}
          <div className="flex-1 py-4">
            <nav className="space-y-1 px-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>

            <Separator className="my-4 mx-4" />

            {/* User-specific items */}
            {user && (
              <nav className="space-y-1 px-4">
                <Link
                  to="/admin"
                  className="flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setOpen(false)}
                >
                  <BarChart3 className="h-5 w-5" />
                  Dashboard
                </Link>
              </nav>
            )}
          </div>

          {/* Auth Section */}
          <div className="border-t p-4">
            {user ? (
              <div className="space-y-4">
                {/* User Info */}
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user.email}</p>
                    <p className="text-xs text-muted-foreground">Account</p>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3"
                  onClick={() => {
                    signOut();
                    setOpen(false);
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link to="/login" onClick={() => setOpen(false)}>
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <LogIn className="h-4 w-4" />
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setOpen(false)}>
                  <Button className="w-full justify-start gap-3">
                    <UserPlus className="h-4 w-4" />
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
