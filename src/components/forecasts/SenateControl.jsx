import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function SenateControl({ democratChance, republicanChance, title = "Senate Control Probability" }) {
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 mt-8">
      <h3 className="text-white font-inter font-bold text-xl sm:text-2xl text-center mb-6 text-shadow-teal">
        {title}
      </h3>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 bg-white/10 rounded-full h-12 overflow-hidden flex hover:scale-[1.02] cursor-default" style={{ border: '2px solid white', transition: 'transform 0.2s' }}>
          <div
            className="h-full bg-blue-600 flex items-center justify-end pr-3"
            style={{ width: animated ? `${democratChance}%` : '50%', transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)' }}
          >
            {democratChance > 15 && (
              <span className="text-white font-bold text-sm">{democratChance}%</span>
            )}
          </div>
          <div
            className="h-full bg-red-600 flex items-center justify-start pl-3"
            style={{ width: animated ? `${republicanChance}%` : '50%', transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)' }}
          >
            {republicanChance > 15 && (
              <span className="text-white font-bold text-sm">{republicanChance}%</span>
            )}
          </div>
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