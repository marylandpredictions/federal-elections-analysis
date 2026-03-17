import React from 'react';
import { motion } from 'framer-motion';

const BG = 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b6f149a83e2b792ef60e35/ec271415e_Screenshot2026-03-16at44509PM.png)';

const senateCandidates = [
  { first: 'Raja', last: 'Krishnamoorthi', pct: 39.7, color: '#1a35d4' },
  { first: 'Julianna', last: 'Stratton', pct: 35.2, color: '#15803d' },
  { first: 'Robin', last: 'Kelly', pct: 18.4, color: '#0e7490' },
];

function CandidateBar({ candidate, index, maxPct }) {
  const barWidth = (candidate.pct / maxPct) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="mb-6"
    >
      <div className="relative h-20 rounded-xl overflow-hidden bg-white/10">
        {/* Bar fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${barWidth}%` }}
          transition={{ duration: 0.8, delay: index * 0.15 + 0.3, ease: 'easeOut' }}
          className="absolute inset-y-0 left-0 rounded-xl"
          style={{ backgroundColor: candidate.color }}
        />

        {/* Candidate name overlay */}
        <div className="absolute inset-0 flex flex-col justify-between px-4 py-2 pointer-events-none">
          <span className="text-white text-xs font-inter font-medium leading-tight z-10">
            {candidate.first}
          </span>
          <span className="text-white text-xl font-inter font-bold leading-tight z-10">
            {candidate.last}
          </span>
        </div>

        {/* Percentage at end of bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: index * 0.15 + 0.9 }}
          className="absolute inset-y-0 flex items-center z-10"
          style={{ left: `calc(${barWidth}% - 56px)` }}
        >
          <span className="text-white font-inter font-bold text-lg leading-none">
            {candidate.pct}
            <span className="text-xs font-normal">%</span>
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function IllinoisPrimaryForecast() {
  const maxPct = Math.max(...senateCandidates.map(c => c.pct)) * 1.05;

  return (
    <div
      className="min-h-[calc(100vh-4rem)] px-4 py-16 sm:py-24"
      style={{ backgroundImage: BG, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white font-inter font-bold text-3xl sm:text-4xl text-center mb-2 text-shadow-teal"
        >
          Illinois Primary Forecast
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-white/70 font-inter text-center text-sm mb-12"
        >
          2026 Democratic Senate Primary
        </motion.p>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8">
          <h2 className="text-white font-inter font-bold text-xl sm:text-2xl mb-6 text-shadow-teal">
            Illinois Senate
          </h2>
          {senateCandidates.map((c, i) => (
            <CandidateBar key={c.last} candidate={c} index={i} maxPct={maxPct} />
          ))}
        </div>
      </div>
    </div>
  );
}