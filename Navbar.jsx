
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Menu, Bell, Sun, Moon, User, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import LanguageSelector from '@/components/common/LanguageSelector';

const Navbar = () => {
  const [theme, setTheme] = useState('light');
  const { user, logout, isAuthenticated } = useAuth();
  const { translate } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
    
    toast({
      title: `${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} mode activated`,
      description: `You've switched to ${newTheme} mode`,
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link to="/" className="text-lg font-semibold hover:text-primary transition-colors">{translate("home")}</Link>
                <Link to="/medicines" className="text-lg font-semibold hover:text-primary transition-colors">{translate("medicines")}</Link>
                <Link to="/doctors" className="text-lg font-semibold hover:text-primary transition-colors">{translate("doctors")}</Link>
                {!isAuthenticated && (
                  <>
                    <Link to="/login" className="text-lg font-semibold hover:text-primary transition-colors">{translate("login")}</Link>
                    <Link to="/register" className="text-lg font-semibold hover:text-primary transition-colors">{translate("signup")}</Link>
                  </>
                )}
                {isAuthenticated && user?.role === 'patient' && (
                  <Link to="/patient-dashboard" className="text-lg font-semibold hover:text-primary transition-colors">{translate("dashboard")}</Link>
                )}
                {isAuthenticated && user?.role === 'doctor' && (
                  <Link to="/doctor-dashboard" className="text-lg font-semibold hover:text-primary transition-colors">{translate("dashboard")}</Link>
                )}
                {isAuthenticated && user?.role === 'pharmacy' && (
                  <Link to="/pharmacy-dashboard" className="text-lg font-semibold hover:text-primary transition-colors">{translate("dashboard")}</Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-2xl text-primary">{translate("app_name")}</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="font-medium hover:text-primary transition-colors">{translate("home")}</Link>
          <Link to="/medicines" className="font-medium hover:text-primary transition-colors">{translate("medicines")}</Link>
          <Link to="/doctors" className="font-medium hover:text-primary transition-colors">{translate("doctors")}</Link>
          {isAuthenticated && user?.role === 'patient' && (
            <Link to="/patient-dashboard" className="font-medium hover:text-primary transition-colors">{translate("dashboard")}</Link>
          )}
          {isAuthenticated && user?.role === 'doctor' && (
            <Link to="/doctor-dashboard" className="font-medium hover:text-primary transition-colors">{translate("dashboard")}</Link>
          )}
          {isAuthenticated && user?.role === 'pharmacy' && (
            <Link to="/pharmacy-dashboard" className="font-medium hover:text-primary transition-colors">{translate("dashboard")}</Link>
          )}
        </nav>
        
        <div className="flex items-center gap-4">
          <LanguageSelector />
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
          
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user?.name ? getInitials(user.name) : 'U'}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>{translate("profile")}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{translate("logout")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => navigate('/login')}>{translate("login")}</Button>
              <Button onClick={() => navigate('/register')}>{translate("signup")}</Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
