import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { electionsData } from './Elections';

function ForecastBar({ data, title }) {
  const { leftLabel, leftChance, rightLabel, rightChance, leftColor, rightColor } = data;
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mt-6">
      <h3 className="text-white font-inter font-bold text-xl mb-6 text-center text-shadow-teal">
        {title}
      </h3>
      <div className="flex items-center gap-4 mb-4">
        <div
          className="flex-1 bg-white/10 rounded-full h-12 overflow-hidden flex transition-transform duration-200 hover:scale-[1.02] cursor-default"
          style={{ border: '2px solid white' }}
        >
          <div
            className="h-full flex items-center justify-end pr-3 transition-all duration-1000"
            style={{ width: `${leftChance}%`, backgroundColor: leftColor }}
          >
            {leftChance > 15 && (
              <span className="text-white font-bold text-sm">{leftChance}%</span>
            )}
          </div>
          <div
            className="h-full flex items-center justify-start pl-3 transition-all duration-1000"
            style={{ width: `${rightChance}%`, backgroundColor: rightColor }}
          >
            {rightChance > 15 && (
              <span className="text-white font-bold text-sm">{rightChance}%</span>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center text-white">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: leftColor }} />
          <span className="font-semibold">{leftLabel} {leftChance}%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">{rightLabel} {rightChance}%</span>
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: rightColor }} />
        </div>
      </div>
    </div>
  );
}

export default function ElectionDetail() {
  const { id } = useParams();
  const election = electionsData.find(e => e.id === id);

  if (!election) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background">
        <div className="text-white text-center">
          <p className="text-2xl font-bold mb-4">Election not found</p>
          <Link to="/Elections" className="text-white/70 hover:text-white underline">← Back to Elections</Link>
        </div>
      </div>
    );
  }

  const getCandidateColor = (c) => {
    if (c.name === 'Yes') return '#16A34A';
    if (c.name === 'No') return '#DC2626';
    if (c.party === 'R') return '#DC2626';
    if (c.party === 'D') return '#2563EB';
    return c.color;
  };

  const electionName = `${election.state} ${election.electionType}`;

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-16 sm:py-24 bg-background">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Link
            to="/Elections"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white font-inter text-sm mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Elections
          </Link>

          {/* Description bubble */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h1 className="text-white font-inter font-bold text-3xl sm:text-4xl mb-1 block">
                  <span className="relative inline-block group cursor-default">
                    {election.state}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </h1>
                <div className="text-white font-inter font-bold text-xl mb-1 block">
                  <span className="relative inline-block group cursor-default">
                    {election.electionType}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </div>
                <div className="text-white font-inter font-bold text-base text-white/80 block">
                  <span className="relative inline-block group cursor-default">
                    {election.date}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </div>
              </div>
              {election.stateIcon && (
                <img
                  src={election.stateIcon}
                  alt={election.state}
                  className="flex-shrink-0 object-contain opacity-80 transition-transform duration-150 hover:scale-110 cursor-default"
                  style={{ width: '64px', height: '64px' }}
                />
              )}
            </div>

            <div className="flex gap-3 flex-wrap mb-6">
              {election.candidates.map(c => {
                const color = getCandidateColor(c);
                return (
                  <span
                    key={c.name}
                    className="font-inter text-base font-semibold px-3 py-1 rounded-full transition-transform duration-150 hover:scale-110 cursor-default inline-block"
                    style={{ color, backgroundColor: color + '33', border: `1px solid ${color}88` }}
                  >
                    {c.name}{c.party ? ` (${c.party})` : ''}
                  </span>
                );
              })}
            </div>

            <div className="border-t border-white/10 pt-6">
              <p className="text-white/85 font-inter text-base leading-relaxed">{election.fullDescription}</p>
            </div>
          </div>

          {/* Forecast bar */}
          {election.forecast && (
            <ForecastBar
              data={election.forecast}
              title={`${electionName} Forecast`}
            />
          )}

          {/* Probability tracker */}
          {election.probability && (
            <ForecastBar
              data={election.probability}
              title={`${electionName} Probability`}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}