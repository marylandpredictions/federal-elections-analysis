import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const statesData = [
  { abbr:'AL', ev:9,  x:700,y:420 }, { abbr:'AK', ev:3,  x:120,y:550 }, { abbr:'AZ', ev:11, x:180,y:380 },
  { abbr:'AR', ev:6,  x:580,y:400 }, { abbr:'CA', ev:54, x:100,y:320 }, { abbr:'CO', ev:10, x:300,y:320 },
  { abbr:'CT', ev:7,  x:852,y:242 }, { abbr:'DC', ev:3,  x:808,y:312 }, { abbr:'DE', ev:3,  x:828,y:285 },
  { abbr:'FL', ev:30, x:760,y:500 }, { abbr:'GA', ev:16, x:720,y:430 }, { abbr:'HI', ev:4,  x:280,y:550 },
  { abbr:'ID', ev:4,  x:200,y:180 }, { abbr:'IL', ev:19, x:620,y:300 }, { abbr:'IN', ev:11, x:660,y:300 },
  { abbr:'IA', ev:6,  x:560,y:260 }, { abbr:'KS', ev:6,  x:480,y:350 }, { abbr:'KY', ev:8,  x:690,y:340 },
  { abbr:'LA', ev:8,  x:600,y:470 }, { abbr:'ME', ev:4,  x:870,y:150 }, { abbr:'MD', ev:10, x:795,y:298 },
  { abbr:'MA', ev:11, x:864,y:218 }, { abbr:'MI', ev:15, x:670,y:230 }, { abbr:'MN', ev:10, x:540,y:180 },
  { abbr:'MS', ev:6,  x:620,y:450 }, { abbr:'MO', ev:10, x:570,y:340 }, { abbr:'MT', ev:4,  x:280,y:160 },
  { abbr:'NE', ev:5,  x:440,y:280 }, { abbr:'NV', ev:6,  x:140,y:300 }, { abbr:'NH', ev:4,  x:862,y:197 },
  { abbr:'NJ', ev:14, x:820,y:268 }, { abbr:'NM', ev:5,  x:300,y:400 }, { abbr:'NY', ev:28, x:800,y:222 },
  { abbr:'NC', ev:16, x:760,y:370 }, { abbr:'ND', ev:3,  x:420,y:160 }, { abbr:'OH', ev:17, x:700,y:300 },
  { abbr:'OK', ev:7,  x:480,y:390 }, { abbr:'OR', ev:8,  x:100,y:180 }, { abbr:'PA', ev:19, x:780,y:270 },
  { abbr:'RI', ev:4,  x:872,y:228 }, { abbr:'SC', ev:9,  x:750,y:400 }, { abbr:'SD', ev:3,  x:420,y:210 },
  { abbr:'TN', ev:11, x:660,y:370 }, { abbr:'TX', ev:40, x:450,y:480 }, { abbr:'UT', ev:6,  x:220,y:300 },
  { abbr:'VT', ev:3,  x:840,y:190 }, { abbr:'VA', ev:13, x:770,y:330 }, { abbr:'WA', ev:12, x:120,y:120 },
  { abbr:'WV', ev:4,  x:750,y:310 }, { abbr:'WI', ev:10, x:600,y:210 }, { abbr:'WY', ev:3,  x:300,y:230 },
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

const dCycle = ['Safe D','Likely D','Lean D','Tilt D','Toss Up'];
const rCycle = ['Safe R','Likely R','Lean R','Tilt R','Toss Up'];

const barColors = {
  'Safe D':   '#1E3A8A',
  'Likely D': '#2563EB',
  'Lean D':   '#93C5FD',
  'Tilt D':   '#BFDBFE',
  'Tilt R':   '#FECACA',
  'Lean R':   '#FCA5A5',
  'Likely R': '#DC2626',
  'Safe R':   '#7F1D1D',
};

export default function PresidentialMapBuilder() {
  const [ratings, setRatings] = useState({});
  const [hovered, setHovered] = useState(null);
  const [tooltip, setTooltip] = useState(null);

  const getRating = (abbr) => ratings[abbr] || 'Toss Up';

  const cycleD = (abbr) => {
    const cur = getRating(abbr);
    const idx = dCycle.indexOf(cur);
    if (idx === -1) {
      setRatings(r => ({ ...r, [abbr]: 'Safe D' }));
    } else {
      const next = dCycle[(idx + 1) % dCycle.length];
      setRatings(r => ({ ...r, [abbr]: next }));
    }
  };

  const cycleR = (abbr) => {
    const cur = getRating(abbr);
    const idx = rCycle.indexOf(cur);
    if (idx === -1) {
      setRatings(r => ({ ...r, [abbr]: 'Safe R' }));
    } else {
      const next = rCycle[(idx + 1) % rCycle.length];
      setRatings(r => ({ ...r, [abbr]: next }));
    }
  };

  const evByRating = useMemo(() => {
    const result = {};
    Object.keys(ratingColors).forEach(k => result[k] = 0);
    statesData.forEach(({ abbr, ev }) => {
      const r = getRating(abbr);
      result[r] = (result[r] || 0) + ev;
    });
    return result;
  }, [ratings]);

  const demEV = (evByRating['Safe D']||0) + (evByRating['Likely D']||0) + (evByRating['Lean D']||0) + (evByRating['Tilt D']||0);
  const repEV = (evByRating['Safe R']||0) + (evByRating['Likely R']||0) + (evByRating['Lean R']||0) + (evByRating['Tilt R']||0);
  const tossUpEV = evByRating['Toss Up'] || 0;

  // Build D segments (left to right: Safe D, Likely D, Lean D, Tilt D)
  const dSegments = ['Safe D','Likely D','Lean D','Tilt D'].map(r => ({ rating: r, ev: evByRating[r]||0, pct: ((evByRating[r]||0)/TOTAL_EV)*100 })).filter(s=>s.ev>0);
  const rSegments = ['Safe R','Likely R','Lean R','Tilt R'].map(r => ({ rating: r, ev: evByRating[r]||0, pct: ((evByRating[r]||0)/TOTAL_EV)*100 })).filter(s=>s.ev>0);

  const majorityPct = (MAJORITY / TOTAL_EV) * 100;

  return (
    <div
      className="min-h-[calc(100vh-4rem)] px-4 py-16 sm:py-24"
      style={{
        backgroundImage: 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b6f149a83e2b792ef60e35/ec271415e_Screenshot2026-03-16at44509PM.png)',
        backgroundSize: 'cover', backgroundPosition: 'center'
      }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}
          className="text-white font-inter font-bold text-3xl sm:text-4xl text-center mb-8 text-shadow-teal">
          Presidential Map Builder
        </motion.h1>

        {/* EV Counter + Bar Chart */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
          {/* Seat count buttons */}
          <div className="flex justify-center gap-4 mb-6 flex-wrap">
            <div className="bg-blue-900/60 rounded-xl px-6 py-3 text-center min-w-[120px] shadow-lg">
              <div className="text-3xl font-bold text-blue-300">{demEV}</div>
              <div className="text-blue-200/70 text-sm mt-1">Democrat EVs</div>
            </div>
            <div className="bg-gray-700/60 rounded-xl px-6 py-3 text-center min-w-[100px] shadow-lg">
              <div className="text-3xl font-bold text-gray-300">{tossUpEV}</div>
              <div className="text-gray-400 text-sm mt-1">Toss Up</div>
            </div>
            <div className="bg-red-900/60 rounded-xl px-6 py-3 text-center min-w-[120px] shadow-lg">
              <div className="text-3xl font-bold text-red-300">{repEV}</div>
              <div className="text-red-200/70 text-sm mt-1">Republican EVs</div>
            </div>
          </div>

          {/* EV Bar Chart */}
          <div className="relative h-10 rounded-xl overflow-hidden bg-gray-800/60 border border-white/10">
            {/* D segments from left */}
            {(() => {
              let leftPct = 0;
              return dSegments.map(s => {
                const el = (
                  <div key={s.rating} className="absolute top-0 h-full flex items-center justify-center"
                    style={{ left: `${leftPct}%`, width: `${s.pct}%`, backgroundColor: barColors[s.rating] }}>
                    {s.ev >= 15 && <span className="text-white text-xs font-bold mix-blend-difference">{s.ev}</span>}
                  </div>
                );
                leftPct += s.pct;
                return el;
              });
            })()}
            {/* R segments from right */}
            {(() => {
              let rightPct = 0;
              return rSegments.map(s => {
                rightPct += s.pct;
                return (
                  <div key={s.rating} className="absolute top-0 h-full flex items-center justify-center"
                    style={{ right: `${rightPct - s.pct}%`, width: `${s.pct}%`, backgroundColor: barColors[s.rating] }}>
                    {s.ev >= 15 && <span className="text-white text-xs font-bold mix-blend-difference">{s.ev}</span>}
                  </div>
                );
              });
            })()}
            {/* 270 line */}
            <div className="absolute top-0 bottom-0 w-0.5 bg-white z-10" style={{ left: `${majorityPct}%` }} />
          </div>
          <div className="flex justify-between mt-1 text-white/50 text-xs px-1">
            <span>D</span>
            <span style={{ marginLeft: `${majorityPct - 2}%` }}>270</span>
            <span>R</span>
          </div>
          <p className="text-white/40 text-xs text-center mt-2">
            Click the left half of a state for Democrat · Click the right half for Republican
          </p>
        </div>

        {/* Map */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
          <div className="relative w-full" style={{ paddingBottom: '62%' }}>
            <svg viewBox="0 0 960 600" className="absolute inset-0 w-full h-full">
              {statesData.map(({ abbr, ev, x, y }) => {
                const rating = getRating(abbr);
                const color = ratingColors[rating];
                const isHovered = hovered === abbr;
                const r = isHovered ? 22 : 17;
                return (
                  <g key={abbr}>
                    {/* Left half — D */}
                    <path
                      d={`M ${x} ${y} m -${r} 0 a ${r} ${r} 0 0 1 ${r*2} 0 Z`}
                      fill={color}
                      stroke="white"
                      strokeWidth={0.5}
                      style={{ cursor: 'pointer' }}
                      onMouseEnter={() => { setHovered(abbr); setTooltip({ abbr, ev, rating, svgX: x, svgY: y }); }}
                      onMouseLeave={() => { setHovered(null); setTooltip(null); }}
                      onClick={() => cycleD(abbr)}
                    />
                    {/* Right half — R */}
                    <path
                      d={`M ${x} ${y} m ${r} 0 a ${r} ${r} 0 0 1 -${r*2} 0 Z`}
                      fill={color}
                      stroke="white"
                      strokeWidth={0.5}
                      style={{ cursor: 'pointer' }}
                      onMouseEnter={() => { setHovered(abbr); setTooltip({ abbr, ev, rating, svgX: x, svgY: y }); }}
                      onMouseLeave={() => { setHovered(null); setTooltip(null); }}
                      onClick={() => cycleR(abbr)}
                    />
                    {/* Circle border */}
                    <circle cx={x} cy={y} r={r} fill="none" stroke="white" strokeWidth={isHovered ? 2 : 1} style={{ pointerEvents: 'none' }} />
                    {/* Labels */}
                    <text x={x} y={y+1} textAnchor="middle" dominantBaseline="middle" fontSize={r > 18 ? 9 : 8} fontWeight="bold" fill="white" style={{ pointerEvents: 'none' }}>{abbr}</text>
                    <text x={x} y={y + r + 8} textAnchor="middle" fontSize={7} fill="rgba(255,255,255,0.7)" style={{ pointerEvents: 'none' }}>{ev}</text>
                  </g>
                );
              })}
            </svg>
            {tooltip && (
              <div className="absolute z-50 pointer-events-none border border-white/40 rounded-xl shadow-xl"
                style={{
                  left: `${Math.min(Math.max((tooltip.svgX/960)*100,10),90)}%`,
                  top: `${Math.max((tooltip.svgY/600)*100-5,0)}%`,
                  transform: 'translate(-50%,-110%)',
                  backgroundColor: 'rgba(0,0,0,0.92)',
                  minWidth: 130, padding: '8px 12px'
                }}>
                <div className="text-white font-bold text-sm">{tooltip.abbr} — {tooltip.ev} EVs</div>
                <div className="font-semibold text-xs mt-1" style={{ color: ratingColors[tooltip.rating] }}>{tooltip.rating}</div>
                <div className="text-white/50 text-xs mt-1">Left click = D cycle · Right = R cycle</div>
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {Object.entries(ratingColors).map(([r, c]) => (
              <div key={r} className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full border border-white/40" style={{ backgroundColor: c }} />
                <span className="text-white/70 text-xs">{r}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <button
              className="bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-2 rounded-lg transition-colors"
              onClick={() => setRatings({})}>
              Reset All to Toss Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}