import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const interactives = [];

export default function Interactives() {
  return (
    <div 
      className="min-h-[calc(100vh-4rem)] px-4 py-16 sm:py-24 bg-black"
      style={{
        backgroundImage: 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b6f149a83e2b792ef60e35/493863590_FEA3.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white font-inter font-bold text-3xl sm:text-4xl text-center mb-12 text-shadow-teal"
        >
          Interactive Tools
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {interactives.map((interactive, index) => (
            <motion.div
              key={interactive.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                to={interactive.path}
                className="block bg-accent/80 backdrop-blur-sm rounded-3xl p-8 hover:bg-accent transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <h2 className="text-white font-inter font-bold text-xl sm:text-2xl mb-3 text-shadow-teal">
                  {interactive.title}
                </h2>
                <p className="text-white/90 font-inter text-sm sm:text-base">
                  {interactive.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}