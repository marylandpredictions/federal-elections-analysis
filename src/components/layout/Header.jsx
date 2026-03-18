import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Sun, Moon } from 'lucide-react';

function useTheme() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('theme');
    return stored ? stored === 'dark' : true;
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return [dark, setDark];
}

const navLinks = [
  { label: 'Home', path: '/Home' },
  { label: 'About Us', path: '/AboutUs' },
  { label: 'Polling', path: '/Polling' }
];

const forecastLinks = [
  { label: '2026 General Forecast', path: '/GeneralElectionForecast' }
];

const interactiveLinks = [
  { label: 'Senate Swingometer', path: '/SenateSwingometer' }
];

export default function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [forecastsOpen, setForecastsOpen] = useState(false);
  const [interactivesOpen, setInteractivesOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [dark, setDark] = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary shadow-lg" style={{ fontSize: '16px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center" style={{ height: '64px' }}>
        {/* Left side: Logo and social */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link to="/Home" className="flex items-center gap-3">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b6f149a83e2b792ef60e35/69ae34c05_SEALOFNEWPORT3.png"
              alt="FEA Logo"
              style={{ width: '44px', height: '44px', flexShrink: 0 }}
              className="object-contain transition-transform duration-200 hover:scale-110"
            />
            <span className="bg-transparent text-white font-bold hidden sm:block text-shadow-teal relative group" style={{ fontSize: '18px', whiteSpace: 'nowrap' }}>
              Federal Elections Analysis
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link>

          <div className="hidden sm:flex items-center gap-2 ml-2 flex-shrink-0">
            <a href="https://www.youtube.com/@FedElections/featured" target="_blank" rel="noopener noreferrer" className="transition-transform duration-200 hover:scale-110">
              <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b6f149a83e2b792ef60e35/27c9e4340_youtube-app-white-icon.png" alt="YouTube" style={{ width: '24px', height: '24px' }} className="object-contain" />
            </a>
            <a href="https://discord.gg/jYYGrgEaMX" target="_blank" rel="noopener noreferrer" className="transition-transform duration-200 hover:scale-110">
              <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b6f149a83e2b792ef60e35/23208f02a_discord-white-icon.png" alt="Discord" style={{ width: '24px', height: '24px' }} className="object-contain" />
            </a>
            <a
              href="https://www.youtube.com/@FedElections/membership"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary font-inter font-semibold hover:bg-white/90 transition-transform duration-200 hover:scale-110 ml-2"
              style={{ fontSize: '14px', padding: '8px 16px', borderRadius: '8px', whiteSpace: 'nowrap', flexShrink: 0 }}
            >
              Membership
            </a>
          </div>
        </div>

        {/* Center: Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 mx-auto flex-shrink-0">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`rounded-lg font-inter font-semibold transition-all duration-200 text-shadow-teal relative group ${
                  isActive ? 'bg-accent text-white' : 'text-white/80 hover:bg-accent/50 hover:text-white'
                }`}
                style={{ padding: '8px 16px', fontSize: '14px', whiteSpace: 'nowrap' }}
              >
                {link.label}
                <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-white scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </Link>
            );
          })}

          {/* Forecasts Dropdown */}
          <div className="relative flex-shrink-0" onMouseEnter={() => setForecastsOpen(true)} onMouseLeave={() => setForecastsOpen(false)}>
            <Link
              to="/Forecasts"
              className={`rounded-lg font-inter font-semibold transition-all duration-200 text-shadow-teal flex items-center gap-1 ${
                forecastLinks.some(l => location.pathname === l.path) || location.pathname === '/Forecasts'
                  ? 'bg-accent text-white'
                  : 'text-white/80 hover:bg-accent/50 hover:text-white'
              }`}
              style={{ padding: '8px 16px', fontSize: '14px', whiteSpace: 'nowrap' }}
            >
              Forecasts
              <ChevronDown style={{ width: '16px', height: '16px' }} />
            </Link>
            {forecastsOpen && (
              <div className="absolute top-full left-0 mt-1 bg-primary rounded-lg shadow-lg border border-white/10 py-2 z-50" style={{ minWidth: '220px' }}>
                <Link to="/Forecasts" className="block px-4 py-2 text-white/80 hover:bg-accent/50 hover:text-white font-inter font-semibold transition-all" style={{ fontSize: '14px' }}>
                  All Forecasts
                </Link>
                {forecastLinks.map((link) => (
                  <Link key={link.path} to={link.path} className="block px-4 py-2 text-white/80 hover:bg-accent/50 hover:text-white font-inter font-semibold transition-all" style={{ fontSize: '14px' }}>
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Interactives Dropdown */}
          <div className="relative flex-shrink-0" onMouseEnter={() => setInteractivesOpen(true)} onMouseLeave={() => setInteractivesOpen(false)}>
            <Link
              to="/Interactives"
              className={`rounded-lg font-inter font-semibold transition-all duration-200 text-shadow-teal relative group flex items-center gap-1 ${
                location.pathname.includes('/Interactives') || location.pathname.includes('Swingometer')
                  ? 'bg-accent text-white'
                  : 'text-white/80 hover:bg-accent/50 hover:text-white'
              }`}
              style={{ padding: '8px 16px', fontSize: '14px', whiteSpace: 'nowrap' }}
            >
              Interactives
              <ChevronDown style={{ width: '16px', height: '16px' }} />
            </Link>
            {interactivesOpen && (
              <div className="absolute top-full left-0 mt-1 bg-primary rounded-lg shadow-lg border border-white/10 py-2 z-50" style={{ minWidth: '200px' }}>
                {interactiveLinks.map((link) => (
                  <Link key={link.path} to={link.path} className="block px-4 py-2 text-white/80 hover:bg-accent/50 hover:text-white font-inter font-semibold transition-all" style={{ fontSize: '14px' }}>
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* More Dropdown */}
          <div className="relative flex-shrink-0" onMouseEnter={() => setMoreOpen(true)} onMouseLeave={() => setMoreOpen(false)}>
            <button
              className={`rounded-lg font-inter font-semibold transition-all duration-200 text-shadow-teal flex items-center gap-1 ${
                location.pathname === '/Articles' || location.pathname === '/ContactUs'
                  ? 'bg-accent text-white'
                  : 'text-white/80 hover:bg-accent/50 hover:text-white'
              }`}
              style={{ padding: '8px 16px', fontSize: '14px' }}
            >
              More
              <ChevronDown style={{ width: '16px', height: '16px' }} />
            </button>
            {moreOpen && (
              <div className="absolute top-full left-0 mt-1 bg-primary rounded-lg shadow-lg border border-white/10 py-2 z-50" style={{ minWidth: '160px' }}>
                <Link to="/Articles" className="block px-4 py-2 text-white/80 hover:bg-accent/50 hover:text-white font-inter font-semibold transition-all" style={{ fontSize: '14px' }}>Articles</Link>
                <Link to="/ContactUs" className="block px-4 py-2 text-white/80 hover:bg-accent/50 hover:text-white font-inter font-semibold transition-all" style={{ fontSize: '14px' }}>Contact Us</Link>
              </div>
            )}
          </div>
        </nav>

        {/* Right side: Theme toggle + Mobile toggle */}
        <div className="flex items-center gap-1 ml-auto flex-shrink-0">
          <button
            onClick={() => setDark(d => !d)}
            className="text-white rounded-lg hover:bg-accent/50 transition-colors"
            style={{ padding: '8px' }}
            title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {dark ? <Sun style={{ width: '20px', height: '20px' }} /> : <Moon style={{ width: '20px', height: '20px' }} />}
          </button>
          <button
            className="md:hidden text-white"
            style={{ padding: '8px' }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X style={{ width: '24px', height: '24px' }} /> : <Menu style={{ width: '24px', height: '24px' }} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-primary border-t border-white/10 px-4 pb-4">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-lg font-inter font-semibold transition-all mt-1 text-shadow-teal ${
                  isActive ? 'bg-accent text-white' : 'text-white/80 hover:bg-accent/50 hover:text-white'
                }`}
                style={{ fontSize: '14px' }}
              >
                {link.label}
              </Link>
            );
          })}
          {forecastLinks.map((link) => (
            <Link key={link.path} to={link.path} onClick={() => setMobileOpen(false)}
              className={`block px-4 py-3 rounded-lg font-inter font-semibold transition-all mt-1 text-shadow-teal ml-4 ${location.pathname === link.path ? 'bg-accent text-white' : 'text-white/80 hover:bg-accent/50 hover:text-white'}`}
              style={{ fontSize: '14px' }}>
              • {link.label}
            </Link>
          ))}
          <Link to="/Interactives" onClick={() => setMobileOpen(false)}
            className={`block px-4 py-3 rounded-lg font-inter font-semibold transition-all mt-1 text-shadow-teal ${location.pathname.includes('/Interactives') || location.pathname.includes('Swingometer') ? 'bg-accent text-white' : 'text-white/80 hover:bg-accent/50 hover:text-white'}`}
            style={{ fontSize: '14px' }}>
            Interactives
          </Link>
          {interactiveLinks.map((link) => (
            <Link key={link.path} to={link.path} onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 rounded-lg font-inter font-semibold transition-all mt-1 text-shadow-teal text-white/80 hover:bg-accent/50 hover:text-white ml-4"
              style={{ fontSize: '14px' }}>
              • {link.label}
            </Link>
          ))}
          <Link to="/Articles" onClick={() => setMobileOpen(false)}
            className={`block px-4 py-3 rounded-lg font-inter font-semibold transition-all mt-1 text-shadow-teal ml-4 ${location.pathname === '/Articles' ? 'bg-accent text-white' : 'text-white/80 hover:bg-accent/50 hover:text-white'}`}
            style={{ fontSize: '14px' }}>
            • Articles
          </Link>
          <Link to="/ContactUs" onClick={() => setMobileOpen(false)}
            className={`block px-4 py-3 rounded-lg font-inter font-semibold transition-all mt-1 text-shadow-teal ml-4 ${location.pathname === '/ContactUs' ? 'bg-accent text-white' : 'text-white/80 hover:bg-accent/50 hover:text-white'}`}
            style={{ fontSize: '14px' }}>
            • Contact Us
          </Link>
        </div>
      )}
    </header>
  );
}