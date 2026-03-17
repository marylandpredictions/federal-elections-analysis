import React from 'react';
import { motion } from 'framer-motion';

const BG = 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b6f149a83e2b792ef60e35/ec271415e_Screenshot2026-03-16at44509PM.png)';

const races = [
  {
    title: 'Illinois Senate',
    candidates: [
      { first: 'Raja', last: 'Krishnamoorthi (D)', pct: 38.4, color: '#1a35d4' },
      { first: 'Julianna', last: 'Stratton (D)', pct: 37.0, color: '#15803d' },
      { first: 'Robin', last: 'Kelly (D)', pct: 16.9, color: '#0e7490' },
    ],
  },
  {
    title: 'Illinois 2nd House District',
    candidates: [
      { first: 'Jesse', last: 'Jackson Jr. (D)', pct: 36.3, color: '#1a35d4' },
      { first: 'Donna', last: 'Miller (D)', pct: 26.8, color: '#be185d' },
      { first: 'Robert', last: 'Peters (D)', pct: 25.5, color: '#c2410c' },
    ],
  },
  {
    title: 'Illinois 7th House District',
    candidates: [
      { first: 'La Shawn', last: 'Ford (D)', pct: 34.9, color: '#15803d' },
      { first: 'Melissa', last: 'Conyears-Ervin (D)', pct: 22.6, color: '#b91c1c' },
      { first: 'Kina', last: 'Collins (D)', pct: 12.0, color: '#be185d' },
      { first: 'Anabel', last: 'Mendoza (D)', pct: 9.1, color: '#c2410c' },
      { first: 'Anthony', last: 'Driver Jr. (D)', pct: 7.8, color: '#a16207' },
    ],
  },
  {
    title: 'Illinois 8th House District',
    candidates: [
      { first: 'Melissa', last: 'Bean (D)', pct: 38.8, color: '#0e7490' },
      { first: 'Junaid', last: 'Ahmed (D)', pct: 34.1, color: '#a16207' },
      { first: 'Kevin', last: 'Morrison (D)', pct: 11.2, color: '#15803d' },
      { first: 'Dan', last: 'Tully (D)', pct: 4.9, color: '#c2410c' },
      { first: 'Yasmeen', last: 'Bankole (D)', pct: 3.5, color: '#5B0080' },
    ],
  },
  {
    title: 'Illinois 9th House District',
    candidates: [
      { first: 'Daniel', last: 'Biss (D)', pct: 31.4, color: '#0e7490' },
      { first: 'Kat', last: 'Abughazaleh (D)', pct: 29.2, color: '#be185d' },
      { first: 'Laura', last: 'Fine (D)', pct: 14.0, color: '#b91c1c' },
      { first: 'Mike', last: 'Simmons (D)', pct: 8.8, color: '#15803d' },
      { first: 'Bushra', last: 'Amiwala (D)', pct: 5.9, color: '#7e22ce' },
      { first: 'Phil', last: 'Andrew (D)', pct: 4.0, color: '#a16207' },
    ],
  },
];

function CandidateBar({ candidate, index, maxPct }) {
  const barWidth = (candidate.pct / maxPct) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="mb-4"
    >
      <div className="relative h-20 rounded-xl overflow-hidden bg-white/10 transition-transform duration-200 hover:scale-[1.02] cursor-default">
        {/* Bar fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${barWidth}%` }}
          transition={{ duration: 0.8, delay: index * 0.12 + 0.3, ease: 'easeOut' }}
          className="absolute inset-y-0 left-0 rounded-xl"
          style={{ backgroundColor: candidate.color }}
        />

        {/* Candidate name overlay */}
        <div className="absolute inset-0 flex flex-col justify-between px-4 py-2 pointer-events-none z-10">
          <span className="text-white text-base font-inter font-semibold leading-tight">
            {candidate.first}
          </span>
          <span className="text-white text-2xl font-inter font-bold leading-tight">
            {candidate.last}
          </span>
        </div>

        {/* Percentage at far right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: index * 0.12 + 0.9 }}
          className="absolute inset-y-0 right-4 flex items-center z-10"
        >
          <span className="text-white font-inter font-bold text-lg leading-none drop-shadow">
            {candidate.pct}
            <span className="text-xs font-normal">%</span>
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

function RaceCard({ race, raceIndex }) {
  const maxPct = Math.max(...race.candidates.map(c => c.pct)) * 1.08;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: raceIndex * 0.1 }}
      className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 mb-6"
    >
      <h2 className="text-white font-inter font-bold text-xl sm:text-2xl mb-6 text-shadow-teal">
        {race.title}
      </h2>
      {race.candidates.map((c, i) => (
        <CandidateBar key={c.last} candidate={c} index={i} maxPct={maxPct} />
      ))}
    </motion.div>
  );
}

export default function IllinoisPrimaryForecast() {
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
          Illinois Democratic Senate &amp; House Primaries
        </motion.p>

        {races.map((race, i) => (
          <RaceCard key={race.title} race={race} raceIndex={i} />
        ))}
      </div>
    </div>
  );
}