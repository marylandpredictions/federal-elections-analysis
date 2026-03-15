import React from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-center"
      >
        <h1 className="text-white font-inter font-extrabold text-4xl sm:text-5xl md:text-7xl leading-tight text-shadow-teal">
          Welcome to
        </h1>
        <h1 className="text-white font-inter font-extrabold text-4xl sm:text-5xl md:text-7xl leading-tight mt-2 text-shadow-teal">
          Federal Elections Analysis
        </h1>
      </motion.div>
    </div>
  );
}