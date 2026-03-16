import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
{ label: 'Home', path: '/Home' },
{ label: 'About Us', path: '/AboutUs' },
{ label: 'Forecasts', path: '/Forecasts' },
{ label: 'Polling', path: '/Polling' },
{ label: 'Articles', path: '/Articles' },
{ label: 'Contact Us', path: '/ContactUs' }];


export default function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/Home" className="flex items-center gap-3">
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b6f149a83e2b792ef60e35/69ae34c05_SEALOFNEWPORT3.png"
            alt="FEA Logo"
            className="py-1 w-10 h-10 sm:w-12 sm:h-12 object-contain transition-transform duration-200 hover:scale-110"
          />

          <span className="bg-transparent text-white text-lg font-bold hidden sm:block shimmer-hover text-shadow-teal relative group">
            Federal Elections Analysis
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </span>
          
          <div className="hidden sm:flex items-center gap-2 ml-2">
            <a href="https://www.youtube.com/@FedElections/featured" target="_blank" rel="noopener noreferrer" className="transition-transform duration-200 hover:scale-110">
              <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b6f149a83e2b792ef60e35/27c9e4340_youtube-app-white-icon.png" alt="YouTube" className="w-6 h-6 object-contain" />
            </a>
            <a href="https://discord.gg/jYYGrgEaMX" target="_blank" rel="noopener noreferrer" className="transition-transform duration-200 hover:scale-110">
              <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b6f149a83e2b792ef60e35/23208f02a_discord-white-icon.png" alt="Discord" className="w-6 h-6 object-contain" />
            </a>
            <a 
              href="https://www.youtube.com/@FedElections/membership" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-primary font-inter font-semibold text-sm px-4 py-2 rounded-lg hover:bg-white/90 transition-transform duration-200 hover:scale-110 ml-2"
            >
              Membership
            </a>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-inter font-semibold text-sm transition-all duration-200 shimmer-hover text-shadow-teal relative group ${
                isActive ?
                'bg-accent text-white' :
                'text-white/80 hover:bg-accent/50 hover:text-white'}`
                }>

                {link.label}
                <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-white scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
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
              className={`block px-4 py-3 rounded-lg font-inter font-semibold text-sm transition-all mt-1 shimmer-hover text-shadow-teal ${
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