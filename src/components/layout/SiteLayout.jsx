import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function SiteLayout() {
  return (
    <div className="min-h-screen flex flex-col font-inter relative">
      <div 
        className="fixed inset-0 z-0"
        style={{
          background: `
            radial-gradient(circle at top left, rgba(0, 255, 127, 0.3), transparent 50%),
            radial-gradient(circle at top right, rgba(0, 255, 127, 0.3), transparent 50%),
            radial-gradient(circle at bottom left, rgba(0, 255, 127, 0.3), transparent 50%),
            radial-gradient(circle at bottom right, rgba(0, 255, 127, 0.3), transparent 50%),
            hsl(178, 30%, 92%)
          `
        }}
      />
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b6f149a83e2b792ef60e35/b9b937108_image.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.5
        }}
      />
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}