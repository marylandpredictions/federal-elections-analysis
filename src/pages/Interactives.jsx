import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const interactives = [
  {
    title: 'Senate Swingometer',
    path: '/SenateSwingometer',
    description: 'Swing the 2026 Senate map based on 2024 presidential results'
  },
  {
    title: 'House Swingometer',
    path: '/HouseSwingometer',
    description: 'Swing the 2026 House map based on Cook Partisan Voting Index'
  },
  {
    title: 'Governors Swingometer',
    path: '/GovernorsSwingometer',
    description: 'Swing the 2026 Governors map based on 2024 presidential results'
  },
  {
    title: 'Presidential Map Builder',
    path: '/PresidentialMapBuilder',
    description: 'Build your own 2028 presidential electoral map'
  },
];

export default function Interactives() {
  return (
    <div 
      className="min-h-[calc(100vh-4rem)] px-4 py-16 sm:py-24 bg-background"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white font-inter font-bold text-3xl sm:text-4xl text-center mb-12 text-shadow-teal"
        >
          Interactives
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
                className="block bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-lg border border-white/10"
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