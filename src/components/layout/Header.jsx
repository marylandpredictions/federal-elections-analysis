import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
{ label: 'Home', path: '/Home' },
{ label: 'About Us', path: '/AboutUs' }];


export default function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/Home" className="flex items-center gap-3">
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b6f149a83e2b792ef60e35/e589dc99b_SEALOFNEWPORT2.png"
            alt="FEA Logo" className="py-1 w-10 h-10 sm:w-12 sm:h-12 object-contain" />


          <span className="bg-transparent text-white text-lg font-bold hidden sm:block shimmer-hover">Federal Elections Analysis

          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-inter font-semibold text-sm transition-all duration-200 shimmer-hover ${
                isActive ?
                'bg-accent text-white' :
                'text-white/80 hover:bg-accent/50 hover:text-white'}`
                }>

                {link.label}
              </Link>);

          })}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}>

          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen &&
      <div className="md:hidden bg-primary border-t border-white/10 px-4 pb-4">
          {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-3 rounded-lg font-inter font-semibold text-sm transition-all mt-1 shimmer-hover ${
              isActive ?
              'bg-accent text-white' :
              'text-white/80 hover:bg-accent/50 hover:text-white'}`
              }>

                {link.label}
              </Link>);

        })}
        </div>
      }
    </header>);

}