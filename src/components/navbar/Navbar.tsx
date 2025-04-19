
import React from 'react';
import Logo from './Logo';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

const Navbar = () => {
  return (
    <nav className="sticky top-4 z-50 flex justify-center w-full">
      <div className="navbar-circle">
        <div className="flex justify-between items-center">
          {/* Logo and Brand */}
          <Logo />

          {/* Desktop Navigation */}
          <DesktopNav />

          {/* Mobile Navigation */}
          <MobileNav />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
