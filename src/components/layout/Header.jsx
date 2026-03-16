import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const navLinks = [
{ label: 'Home', path: '/Home' },
{ label: 'About Us', path: '/AboutUs' },
{ label: 'Forecasts', path: '/Forecasts' },
{ label: 'Polling', path: '/Polling' }];

const interactiveLinks = [
{ label: 'Senate Swingometer', path: '/SenateSwingometer' }
];


export default function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [interactivesOpen, setInteractivesOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-16">
        {/* Left side: Logo and social */}
        <div className="flex items-center gap-3">
          <Link to="/Home" className="flex items-center gap-3">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b6f149a83e2b792ef60e35/69ae34c05_SEALOFNEWPORT3.png"
              alt="FEA Logo"
              className="py-1 w-10 h-10 sm:w-12 sm:h-12 object-contain transition-transform duration-200 hover:scale-110"
            />

            <span className="bg-transparent text-white text-lg font-bold hidden sm:block text-shadow-teal relative group">
              Federal Elections Analysis
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link>
          
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
        </div>

        {/* Center: Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 mx-auto">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-inter font-semibold text-sm transition-all duration-200 text-shadow-teal relative group ${
                isActive ?
                'bg-accent text-white' :
                'text-white/80 hover:bg-accent/50 hover:text-white'}`
                }>

                {link.label}
                <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-white scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </Link>);

          })}
          
          {/* Interactives Dropdown */}
          <div className="relative" onMouseEnter={() => setInteractivesOpen(true)} onMouseLeave={() => setInteractivesOpen(false)}>
            <Link
              to="/Interactives"
              className={`px-4 py-2 rounded-lg font-inter font-semibold text-sm transition-all duration-200 text-shadow-teal relative group flex items-center gap-1 ${
                location.pathname.includes('/Interactives') || location.pathname.includes('Swingometer') ?
                'bg-accent text-white' :
                'text-white/80 hover:bg-accent/50 hover:text-white'
              }`}
            >
              Interactives
              <ChevronDown className="w-4 h-4" />
              <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-white scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </Link>
            
            {interactivesOpen && (
              <div className="absolute top-full left-0 mt-1 bg-primary rounded-lg shadow-lg border border-white/10 min-w-[200px] py-2 z-50">
                {interactiveLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="block px-4 py-2 text-white/80 hover:bg-accent/50 hover:text-white font-inter font-semibold text-sm transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          {/* More Dropdown */}
          <div className="relative" onMouseEnter={() => setMoreOpen(true)} onMouseLeave={() => setMoreOpen(false)}>
            <button
              className={`px-4 py-2 rounded-lg font-inter font-semibold text-sm transition-all duration-200 text-shadow-teal flex items-center gap-1 ${
                location.pathname === '/Articles' || location.pathname === '/ContactUs'
                  ? 'bg-accent text-white'
                  : 'text-white/80 hover:bg-accent/50 hover:text-white'
              }`}
            >
              More
              <ChevronDown className="w-4 h-4" />
            </button>
            {moreOpen && (
              <div className="absolute top-full left-0 mt-1 bg-primary rounded-lg shadow-lg border border-white/10 min-w-[160px] py-2 z-50">
                <Link
                  to="/Articles"
                  className="block px-4 py-2 text-white/80 hover:bg-accent/50 hover:text-white font-inter font-semibold text-sm transition-all"
                >
                  Articles
                </Link>
                <Link
                  to="/ContactUs"
                  className="block px-4 py-2 text-white/80 hover:bg-accent/50 hover:text-white font-inter font-semibold text-sm transition-all"
                >
                  Contact Us
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Right side: Mobile toggle */}
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
              className={`block px-4 py-3 rounded-lg font-inter font-semibold text-sm transition-all mt-1 text-shadow-teal ${
              isActive ?
              'bg-accent text-white' :
              'text-white/80 hover:bg-accent/50 hover:text-white'}`
              }>

                {link.label}
              </Link>);

        })}
        
        <Link
          to="/Interactives"
          onClick={() => setMobileOpen(false)}
          className={`block px-4 py-3 rounded-lg font-inter font-semibold text-sm transition-all mt-1 text-shadow-teal ${
            location.pathname.includes('/Interactives') || location.pathname.includes('Swingometer') ?
            'bg-accent text-white' :
            'text-white/80 hover:bg-accent/50 hover:text-white'
          }`}
        >
          Interactives
        </Link>
        
        {interactiveLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={() => setMobileOpen(false)}
            className="block px-4 py-3 rounded-lg font-inter font-semibold text-sm transition-all mt-1 text-shadow-teal text-white/80 hover:bg-accent/50 hover:text-white ml-4"
          >
            • {link.label}
          </Link>
        ))}
        
        <Link
          to="/Articles"
          onClick={() => setMobileOpen(false)}
          className={`block px-4 py-3 rounded-lg font-inter font-semibold text-sm transition-all mt-1 text-shadow-teal ${
            location.pathname === '/Articles' ?
            'bg-accent text-white' :
            'text-white/80 hover:bg-accent/50 hover:text-white'
          }`}
        >
          Articles
        </Link>
        
        <Link
          to="/ContactUs"
          onClick={() => setMobileOpen(false)}
          className={`block px-4 py-3 rounded-lg font-inter font-semibold text-sm transition-all mt-1 text-shadow-teal ${
            location.pathname === '/ContactUs' ?
            'bg-accent text-white' :
            'text-white/80 hover:bg-accent/50 hover:text-white'
          }`}
        >
          Contact Us
        </Link>
        </div>
      }
    </header>);

}