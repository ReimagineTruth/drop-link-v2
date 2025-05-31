
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "@/pages/Home";
import Pricing from "@/pages/Pricing";
import Contact from "@/pages/Contact";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import Features from "@/pages/Features";
import Community from "@/pages/Community";
import Help from "@/pages/Help";
import NotFound from "@/pages/NotFound";
import { UserProvider } from "@/context/UserContext";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Dashboard from "@/pages/Dashboard";
import ProfilePage from "@/pages/ProfilePage";
import Admin from "@/pages/Admin";
import Forums from "@/pages/Forums";
import HelpArticle from "@/pages/HelpArticle";
import About from "@/pages/About";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminPortal from "@/pages/AdminPortal";
import AllFaqs from "@/pages/AllFaqs";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Careers from "@/pages/Careers";
import Cookies from "@/pages/Cookies";
import CreatorDirectory from "@/pages/CreatorDirectory";
import Demo from "@/pages/Demo";
import Developers from "@/pages/Developers";
import DevelopersPage from "@/pages/DevelopersPage";
import DomainVerification from "@/pages/DomainVerification";
import GDPR from "@/pages/GDPR";
import GroupChat from "@/pages/GroupChat";
import Groups from "@/pages/Groups";
import Index from "@/pages/Index";
import LoginPage from "@/pages/LoginPage";
import PiDashboard from "@/pages/PiDashboard";
import SignupPage from "@/pages/SignupPage";
import Stickers from "@/pages/Stickers";
import Store from "@/pages/Store";
import SystemStatus from "@/pages/SystemStatus";
import Templates from "@/pages/Templates";
import UserInfo from "@/pages/auth/UserInfo";
import SelectCategories from "@/pages/register/SelectCategories";
import YourInformation from "@/pages/register/YourInformation";
import AddLinks from "@/pages/register/create/AddLinks";
import Complete from "@/pages/register/create/Complete";
import NameImageBio from "@/pages/register/create/NameImageBio";
import SelectPlatforms from "@/pages/register/create/SelectPlatforms";
import SelectTemplate from "@/pages/register/create/SelectTemplate";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <UserProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/index" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/gdpr" element={<GDPR />} />
              <Route path="/features" element={<Features />} />
              <Route path="/community" element={<Community />} />
              <Route path="/help" element={<Help />} />
              <Route path="/help/article/:articleId" element={<HelpArticle />} />
              <Route path="/help/faqs" element={<AllFaqs />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/creators" element={<CreatorDirectory />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/developers" element={<Developers />} />
              <Route path="/dev" element={<DevelopersPage />} />
              <Route path="/domain-verification" element={<DomainVerification />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/stickers" element={<Stickers />} />
              <Route path="/store" element={<Store />} />
              <Route path="/status" element={<SystemStatus />} />
              <Route path="/login" element={<Login />} />
              <Route path="/login-page" element={<LoginPage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signup-page" element={<SignupPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/pi-dashboard" element={<PiDashboard />} />
              <Route path="/profile/:username" element={<ProfilePage />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/admin-portal" element={<AdminPortal />} />
              <Route path="/forums" element={<Forums />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/group/:groupId" element={<GroupChat />} />
              
              {/* Auth routes */}
              <Route path="/auth/userinfo" element={<UserInfo />} />
              
              {/* Registration flow routes */}
              <Route path="/register/your-information" element={<YourInformation />} />
              <Route path="/register/select-categories" element={<SelectCategories />} />
              <Route path="/register/create/select-template" element={<SelectTemplate />} />
              <Route path="/register/create/select-platforms" element={<SelectPlatforms />} />
              <Route path="/register/create/add-links" element={<AddLinks />} />
              <Route path="/register/create/name-image-bio" element={<NameImageBio />} />
              <Route path="/register/create/complete" element={<Complete />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </UserProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
