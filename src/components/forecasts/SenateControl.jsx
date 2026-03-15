import React from 'react';
import { motion } from 'framer-motion';

export default function SenateControl({ democratChance, republicanChance }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 mt-8">
      <h3 className="text-white font-inter font-bold text-xl sm:text-2xl text-center mb-6 text-shadow-teal">
        Senate Control Probability
      </h3>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 bg-white/10 rounded-full h-12 overflow-hidden flex">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${democratChance}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-blue-600 flex items-center justify-end pr-3"
          >
            {democratChance > 15 && (
              <span className="text-white font-bold text-sm">
                {democratChance}%
              </span>
            )}
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${republicanChance}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-red-600 flex items-center justify-start pl-3"
          >
            {republicanChance > 15 && (
              <span className="text-white font-bold text-sm">
                {republicanChance}%
              </span>
            )}
          </motion.div>
        </div>
      </div>

      <div className="flex justify-between items-center text-white">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-600" />
          <span className="font-semibold">Democrat {democratChance}%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">Republican {republicanChance}%</span>
          <div className="w-4 h-4 rounded-full bg-red-600" />
        </div>
      </div>

      <p className="text-white/70 text-xs text-center mt-4">
        Updated daily based on latest polling and analysis
      </p>
    </div>
  );
}