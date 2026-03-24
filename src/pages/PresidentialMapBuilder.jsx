import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import HexUSMap from '../components/maps/HexUSMap';

// State EVs - ME and NE reduced since their districts are handled separately
const statesEV = {
  AL:9, AK:3, AZ:11, AR:6, CA:54, CO:10, CT:7, DE:3,
  FL:30, GA:16, HI:4, ID:4, IL:19, IN:11, IA:6, KS:6, KY:8,
  LA:8, ME:2, MD:10, MA:11, MI:15, MN:10, MS:6, MO:10, MT:4,
  NE:2, NV:6, NH:4, NJ:14, NM:5, NY:28, NC:16, ND:3, OH:17,
  OK:7, OR:8, PA:19, RI:4, SC:9, SD:3, TN:11, TX:40, UT:6,
  VT:3, VA:13, WA:12, WV:4, WI:10, WY:3,
};

// Special districts (separate from the hex map states)
const specialDistricts = [
  { key: 'DC',   label: 'D.C.',  ev: 3 },
  { key: 'ME-1', label: 'ME-1',  ev: 1 },
  { key: 'ME-2', label: 'ME-2',  ev: 1 },
  { key: 'NE-1', label: 'NE-1',  ev: 1 },
  { key: 'NE-2', label: 'NE-2',  ev: 1 },
  { key: 'NE-3', label: 'NE-3',  ev: 1 },
];

const TOTAL_EV = 538;
const MAJORITY = 270;

const ratingColors = {
  'Toss Up':  '#6B7280',
  'Tilt D':   '#BFDBFE',
  'Lean D':   '#93C5FD',
  'Likely D': '#2563EB',
  'Safe D':   '#1E3A8A',
  'Tilt R':   '#FECACA',
  'Lean R':   '#FCA5A5',
  'Likely R': '#DC2626',
  'Safe R':   '#7F1D1D',
};

const dCycle = ['Safe D', 'Likely D', 'Lean D', 'Tilt D', 'Toss Up'];
const rCycle = ['Safe R', 'Likely R', 'Lean R', 'Tilt R', 'Toss Up'];

const barColors = {
  'Safe D': '#1E3A8A', 'Likely D': '#2563EB', 'Lean D': '#93C5FD', 'Tilt D': '#BFDBFE',
  'Tilt R': '#FECACA', 'Lean R': '#FCA5A5', 'Likely R': '#DC2626', 'Safe R': '#7F1D1D',
};

function cycleRating(current, party) {
  const cycle = party === 'D' ? dCycle : rCycle;
  const idx = cycle.indexOf(current);
  return idx === -1 ? cycle[0] : cycle[(idx + 1) % cycle.length];
}

export default function PresidentialMapBuilder() {
  const [ratings, setRatings] = useState({});
  const [districtRatings, setDistrictRatings] = useState({});
  const [activeParty, setActiveParty] = useState(null);

  const getRating = (abbr) => ratings[abbr] || 'Toss Up';
  const getDistrictRating = (key) => districtRatings[key] || 'Toss Up';

  const handleStateClick = (abbr) => {
    if (!activeParty) return;
    setRatings(r => ({ ...r, [abbr]: cycleRating(getRating(abbr), activeParty) }));
  };

  const handleDistrictClick = (key) => {
    if (!activeParty) return;
    setDistrictRatings(r => ({ ...r, [key]: cycleRating(getDistrictRating(key), activeParty) }));
  };

  const evByRating = useMemo(() => {
    const result = {};
    Object.keys(ratingColors).forEach(k => result[k] = 0);
    // States
    Object.keys(statesEV).forEach(abbr => {
      const r = getRating(abbr);
      result[r] = (result[r] || 0) + (statesEV[abbr] || 0);
    });
    // Special districts
    specialDistricts.forEach(d => {
      const r = getDistrictRating(d.key);
      result[r] = (result[r] || 0) + d.ev;
    });
    return result;
  }, [ratings, districtRatings]);

  const demEV = (evByRating['Safe D']||0) + (evByRating['Likely D']||0) + (evByRating['Lean D']||0) + (evByRating['Tilt D']||0);
  const repEV = (evByRating['Safe R']||0) + (evByRating['Likely R']||0) + (evByRating['Lean R']||0) + (evByRating['Tilt R']||0);
  const tossUpEV = evByRating['Toss Up'] || 0;

  const colorsByAbbr = useMemo(() => {
    const map = {};
    Object.keys(statesEV).forEach(abbr => { map[abbr] = ratingColors[getRating(abbr)]; });
    return map;
  }, [ratings]);

  const dSegments = ['Safe D','Likely D','Lean D','Tilt D']
    .map(r => ({ rating: r, ev: evByRating[r]||0, pct: ((evByRating[r]||0)/TOTAL_EV)*100 }))
    .filter(s => s.ev > 0);
  const rSegments = ['Safe R','Likely R','Lean R','Tilt R']
    .map(r => ({ rating: r, ev: evByRating[r]||0, pct: ((evByRating[r]||0)/TOTAL_EV)*100 }))
    .filter(s => s.ev > 0);

  const majorityPct = (MAJORITY / TOTAL_EV) * 100;

  const renderTooltipContent = (abbr) => {
    const rating = getRating(abbr);
    return (
      <>
        <div className="text-white font-bold text-sm">{abbr} — {statesEV[abbr]} EVs</div>
        <div className="font-semibold text-xs mt-1" style={{ color: ratingColors[rating] }}>{rating}</div>
      </>
    );
  };

  return (
    <div
      className="min-h-[calc(100vh-4rem)] px-4 py-16 sm:py-24 bg-background"
    >
      <div className="max-w-5xl mx-auto">
        <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}
          className="text-white font-inter font-bold text-3xl sm:text-4xl text-center mb-8 text-shadow-teal">
          Presidential Map Builder
        </motion.h1>

        {/* EV Counter + Bar */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
          {/* Party selector buttons */}
          <div className="flex justify-center gap-4 mb-6 flex-wrap">
            <button
              onClick={() => setActiveParty(p => p === 'D' ? null : 'D')}
              className={`rounded-xl px-6 py-3 text-center min-w-[120px] shadow-lg transition-all duration-200 hover:scale-110 ${
                activeParty === 'D' ? 'bg-blue-600 ring-2 ring-white scale-105' : 'bg-blue-900/60'
              }`}
            >
              <div className="text-3xl font-bold text-blue-300">{demEV}</div>
              <div className="text-blue-200/70 text-sm mt-1">Democrat EVs</div>
            </button>
            <button
              onClick={() => setActiveParty(null)}
              className={`rounded-xl px-6 py-3 text-center min-w-[100px] shadow-lg transition-all duration-200 hover:scale-110 ${
                activeParty === null ? 'bg-gray-500 ring-2 ring-white scale-105' : 'bg-gray-700/60'
              }`}
            >
              <div className="text-3xl font-bold text-gray-300">{tossUpEV}</div>
              <div className="text-gray-400 text-sm mt-1">Toss Up</div>
            </button>
            <button
              onClick={() => setActiveParty(p => p === 'R' ? null : 'R')}
              className={`rounded-xl px-6 py-3 text-center min-w-[120px] shadow-lg transition-all duration-200 hover:scale-110 ${
                activeParty === 'R' ? 'bg-red-600 ring-2 ring-white scale-105' : 'bg-red-900/60'
              }`}
            >
              <div className="text-3xl font-bold text-red-300">{repEV}</div>
              <div className="text-red-200/70 text-sm mt-1">Republican EVs</div>
            </button>
          </div>

          {/* EV Bar Chart */}
          <div className="relative h-10 rounded-xl overflow-hidden bg-gray-800/60 border border-white/10">
            {(() => {
              let leftPct = 0;
              return dSegments.map(s => {
                const el = (
                  <div key={s.rating} className="absolute top-0 h-full flex items-center justify-center"
                    style={{ left: `${leftPct}%`, width: `${s.pct}%`, backgroundColor: barColors[s.rating] }}>
                    {s.ev >= 20 && <span className="text-white text-xs font-bold">{s.ev}</span>}
                  </div>
                );
                leftPct += s.pct;
                return el;
              });
            })()}
            {(() => {
              let rightPct = 0;
              return rSegments.map(s => {
                rightPct += s.pct;
                return (
                  <div key={s.rating} className="absolute top-0 h-full flex items-center justify-center"
                    style={{ right: `${rightPct - s.pct}%`, width: `${s.pct}%`, backgroundColor: barColors[s.rating] }}>
                    {s.ev >= 20 && <span className="text-white text-xs font-bold">{s.ev}</span>}
                  </div>
                );
              });
            })()}
            <div className="absolute top-0 bottom-0 w-0.5 bg-white z-10" style={{ left: `${majorityPct}%` }} />
          </div>
          <div className="flex justify-between mt-1 text-white/50 text-xs px-1">
            <span>D ←</span>
            <span style={{ position: 'absolute', left: `${majorityPct}%`, transform: 'translateX(-50%)', marginTop: 0 }}>270</span>
            <span>→ R</span>
          </div>

          <p className="text-white/50 text-xs text-center mt-3">
            Each party needs 270 EVs to win
          </p>
          {activeParty && (
            <p className="text-center text-sm mt-2 font-semibold" style={{ color: activeParty === 'D' ? '#93C5FD' : '#FCA5A5' }}>
              {activeParty === 'D' ? 'Democrat mode active' : 'Republican mode active'} — click states or districts to cycle ratings
            </p>
          )}
          {!activeParty && (
            <p className="text-white/40 text-xs text-center mt-2">Select a party button above, then click states or districts</p>
          )}
        </div>

        {/* Map */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
          {/* Special District Buttons */}
          <div className="mb-4">
            <p className="text-white/60 text-xs text-center mb-3">Special Districts / Split EVs</p>
            <div className="flex flex-wrap justify-center gap-3">
              {specialDistricts.map(d => {
                const r = getDistrictRating(d.key);
                const color = ratingColors[r];
                return (
                  <button
                    key={d.key}
                    onClick={() => handleDistrictClick(d.key)}
                    className="rounded-xl px-4 py-2 text-center shadow transition-all duration-200 hover:scale-110 border border-white/20"
                    style={{ backgroundColor: color + '55', minWidth: 72 }}
                  >
                    <div className="text-white font-bold text-base">{d.label}</div>
                    <div className="text-white/70 text-xs">{d.ev} EV{d.ev > 1 ? 's' : ''}</div>
                    <div className="text-xs mt-0.5 font-semibold" style={{ color }}>{r}</div>
                  </button>
                );
              })}
            </div>
          </div>
          <HexUSMap
            colorsByAbbr={colorsByAbbr}
            onClick={handleStateClick}
            renderTooltipContent={renderTooltipContent}
            secondaryLabel={(abbr) => statesEV[abbr]}
          />

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {Object.entries(ratingColors).map(([r, c]) => (
              <div key={r} className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded border border-white/40" style={{ backgroundColor: c }} />
                <span className="text-white/70 text-xs">{r}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <button
              className="bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-2 rounded-lg transition-colors"
              onClick={() => { setRatings({}); setDistrictRatings({}); }}>
              Reset All to Toss Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}