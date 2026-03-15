import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-primary py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-white font-inter font-bold text-xl md:text-2xl text-shadow-teal">
          Welcome to Federal Elections Analysis
        </h2>
        <p className="text-white/50 font-inter text-sm mt-3">
          © {new Date().getFullYear()} Federal Elections Analysis. All rights reserved.
        </p>
      </div>
    </footer>
  );
}