
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ResourcesMenu from './ResourcesMenu';
import ThemeToggle from './ThemeToggle';

const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Check if user is logged in (has profile image in localStorage)
  const isLoggedIn = localStorage.getItem('profileImage') !== null;
  const profileImage = localStorage.getItem('profileImage');

  return (
    <div className="md:hidden">
      <div className="flex items-center">
        <ThemeToggle />
        
        {isLoggedIn && (
          <Link to="/profile" className="mr-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={profileImage || undefined} />
              <AvatarFallback className="bg-mindful text-white">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </Link>
        )}
        
        <button onClick={toggleMenu} className="text-white hover:text-green-300 transition-colors">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 mt-4 rounded-lg bg-white/10 backdrop-blur-lg py-4 px-4 border border-white/20 shadow-lg">
          <div className="flex flex-col space-y-4">
            <Link to="/sleep" className="nav-link-mobile" onClick={toggleMenu}>
              Sleep
            </Link>
            <Link to="/meditation" className="nav-link-mobile" onClick={toggleMenu}>
              Meditation
            </Link>
            <Link to="/stress-and-anxiety" className="nav-link-mobile" onClick={toggleMenu}>
              Stress & Anxiety
            </Link>
            
            {/* Mobile Resources Dropdown */}
            <ResourcesMenu mobile onItemClick={toggleMenu} />
            
            <div className="pt-4 flex space-x-4">
              {isLoggedIn ? (
                <Link to="/profile" className="flex-1" onClick={toggleMenu}>
                  <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium">Profile</Button>
                </Link>
              ) : (
                <>
                  <Link to="/login" className="flex-1" onClick={toggleMenu}>
                    <Button variant="outline" className="w-full border-green-300 bg-transparent text-white hover:bg-green-900/30 hover:text-white">Login</Button>
                  </Link>
                  <Link to="/signup" className="flex-1" onClick={toggleMenu}>
                    <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
