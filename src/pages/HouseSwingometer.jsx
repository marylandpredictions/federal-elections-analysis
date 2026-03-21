import React, { useState, useMemo } from 'react';
import { houseIncumbents, normalizeDistrict } from '../components/swingometer/houseIncumbents';
import { motion } from 'framer-motion';
import SwingBar from '../components/swingometer/SwingBar';
import { housePVIData } from '../components/swingometer/houseData';

const ratingColors = {
  'Safe D':   '#1E3A8A',
  'Likely D': '#2563EB',
  'Lean D':   '#93C5FD',
  'Tilt D':   '#BFDBFE',
  'Toss Up':  '#A855F7',
  'Tilt R':   '#FECACA',
  'Lean R':   '#FCA5A5',
  'Likely R': '#DC2626',
  'Safe R':   '#7F1D1D',
};

const ratingOrder = ['Safe D','Likely D','Lean D','Tilt D','Toss Up','Tilt R','Lean R','Likely R','Safe R'];

function getRating(margin) {
  const abs = Math.abs(margin);
  if (abs < 2) return 'Toss Up';
  if (margin < 0) {
    if (abs > 15) return 'Safe D';
    if (abs >= 10) return 'Likely D';
    if (abs >= 5) return 'Lean D';
    return 'Tilt D';
  } else {
    if (abs > 15) return 'Safe R';
    if (abs >= 10) return 'Likely R';
    if (abs >= 5) return 'Lean R';
    return 'Tilt R';
  }
}

const CX = 500, CY = 560;
const dotR = 6.5;
const spacing = dotR * 2.9;
const startRadius = 110;
const radiusStep = spacing + 1.5;

function buildLayout(total) {
  const rows = [];
  let remaining = total;
  let rad = startRadius;
  while (remaining > 0) {
    const capacity = Math.max(1, Math.floor(Math.PI * rad / spacing));
    const count = Math.min(capacity, remaining);
    rows.push({ radius: rad, count });
    remaining -= count;
    rad += radiusStep;
  }
  const allPositions = [];
  rows.forEach(({ radius, count }) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.PI - (i / Math.max(count - 1, 1)) * Math.PI;
      const x = CX + radius * Math.cos(angle);
      const y = CY - radius * Math.sin(angle);
      allPositions.push({ x, y });
    }
  });
  allPositions.sort((a, b) => a.x - b.x);
  return allPositions;
}

export default function HouseSwingometer() {
  const [swing, setSwing] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const [hoveredBubble, setHoveredBubble] = useState(null);
  const [highlightRating, setHighlightRating] = useState(null);

  const { seats, totals, positions } = useMemo(() => {
    const rated = housePVIData.map(([dist, pvi]) => ({
      key: dist,
      adj: pvi + swing,
      rating: getRating(pvi + swing),
    }));
    // Sort: most D (lowest adj) to most R (highest adj)
    rated.sort((a, b) => a.adj - b.adj);
    const pos = buildLayout(rated.length);
    const dots = rated.map((s, i) => ({ ...s, ...pos[i] }));

    const tot = {};
    ratingOrder.forEach(r => tot[r] = 0);
    rated.forEach(s => { if (tot[s.rating] !== undefined) tot[s.rating]++; });

    return { seats: dots, totals: tot, positions: pos };
  }, [swing]);

  const demSeats = (totals['Safe D']||0)+(totals['Likely D']||0)+(totals['Lean D']||0)+(totals['Tilt D']||0);
  const repSeats = (totals['Safe R']||0)+(totals['Likely R']||0)+(totals['Lean R']||0)+(totals['Tilt R']||0);
  const tossUp = totals['Toss Up']||0;

  const maxRadius = startRadius + radiusStep * (positions.length > 0 ? Math.ceil(Math.log(housePVIData.length / 10)) + 8 : 8);
  const svgH = CY + 20;

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
          className="text-white font-inter font-bold text-3xl sm:text-4xl text-center mb-4 text-shadow-teal">
          House Swingometer
        </motion.h1>
        <p className="text-white/70 text-center mb-8 text-sm">Swing the 2026 House map based on 2024 Presidential Results</p>

        <SwingBar swing={swing} setSwing={setSwing} />

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mt-6">
          {/* Seat count bubbles */}
          <div className="flex justify-center gap-4 mb-4 flex-wrap">
            <div className="relative" onMouseEnter={() => setHoveredBubble('dem')} onMouseLeave={() => setHoveredBubble(null)}>
              <div className="bg-blue-900/60 rounded-xl px-6 py-3 text-center min-w-[100px] shadow-lg transition-transform duration-200 hover:scale-110 cursor-pointer" style={{ border: '2px solid white' }}>
                <div className="text-3xl font-bold text-blue-300">{demSeats}</div>
                <div className="text-blue-200/70 text-sm mt-1">Democrat</div>
              </div>
              {hoveredBubble === 'dem' && (
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 bg-black/90 border border-white/20 rounded-xl p-2 flex gap-2 shadow-xl">
                  {[['Safe D','#1E3A8A','white'],['Likely D','#2563EB','white'],['Lean D','#93C5FD','#1E3A8A'],['Tilt D','#BFDBFE','#1E3A8A']].map(([r,bg,tc]) => totals[r] > 0 && (
                    <div key={r} className="rounded-lg px-2 py-1 text-center" style={{backgroundColor:bg,color:tc,minWidth:56}}>
                      <div className="text-lg font-bold">{totals[r]}</div>
                      <div className="text-xs whitespace-nowrap">{r}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="bg-purple-900/60 rounded-xl px-6 py-3 text-center min-w-[100px] shadow-lg" style={{ border: '2px solid white' }}>
              <div className="text-3xl font-bold text-purple-300">{tossUp}</div>
              <div className="text-purple-200/70 text-sm mt-1">Toss Up</div>
            </div>
            <div className="relative" onMouseEnter={() => setHoveredBubble('rep')} onMouseLeave={() => setHoveredBubble(null)}>
              <div className="bg-red-900/60 rounded-xl px-6 py-3 text-center min-w-[100px] shadow-lg transition-transform duration-200 hover:scale-110 cursor-pointer" style={{ border: '2px solid white' }}>
                <div className="text-3xl font-bold text-red-300">{repSeats}</div>
                <div className="text-red-200/70 text-sm mt-1">Republican</div>
              </div>
              {hoveredBubble === 'rep' && (
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 bg-black/90 border border-white/20 rounded-xl p-2 flex gap-2 shadow-xl">
                  {[['Safe R','#7F1D1D','white'],['Likely R','#DC2626','white'],['Lean R','#FCA5A5','#7F1D1D'],['Tilt R','#FECACA','#7F1D1D']].map(([r,bg,tc]) => totals[r] > 0 && (
                    <div key={r} className="rounded-lg px-2 py-1 text-center" style={{backgroundColor:bg,color:tc,minWidth:56}}>
                      <div className="text-lg font-bold">{totals[r]}</div>
                      <div className="text-xs whitespace-nowrap">{r}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <p className="text-white/60 text-xs text-center mb-4">
            Democrats need <span className="text-blue-300 font-semibold">218</span> seats for majority &nbsp;•&nbsp; Republicans need <span className="text-red-300 font-semibold">218</span> seats for majority
          </p>

          {/* Parliament chart */}
          <div className="relative w-full">
            <svg viewBox={`0 0 1000 ${svgH}`} className="w-full" style={{ minWidth: '320px' }}>
              {seats.map(({ key, x, y, rating }) => {
                const isHovered = hovered === key;
                const isHighlighted = !highlightRating || rating === highlightRating;
                return (
                  <circle
                    key={key}
                    cx={x} cy={y}
                    r={isHovered ? dotR * 1.9 : dotR}
                    fill={ratingColors[rating]}
                    stroke="white"
                    strokeWidth={isHovered ? 1.8 : 0.6}
                    opacity={isHighlighted ? 0.95 : 0.15}
                    onMouseEnter={() => { setHovered(key); setTooltip({ key, rating, svgX: x, svgY: y }); }}
                    onMouseLeave={() => { setHovered(null); setTooltip(null); }}
                    style={{ cursor: 'pointer', transition: 'r 0.1s' }}
                  />
                );
              })}
              <line x1={CX} y1={50} x2={CX} y2={CY+8} stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4,4" />
              <text x={CX-80} y={CY+18} fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="Inter,sans-serif">← Democrat</text>
              <text x={CX+12} y={CY+18} fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="Inter,sans-serif">Republican →</text>
            </svg>
            {tooltip && (
              <div className="absolute z-50 pointer-events-none border border-white/40 rounded-xl shadow-xl"
                style={{
                  left: `${Math.min(Math.max((tooltip.svgX/1000)*100,12),88)}%`,
                  top: `${Math.max((tooltip.svgY/svgH)*100-2,0)}%`,
                  transform: 'translate(-50%,-110%)',
                  backgroundColor: 'rgba(0,0,0,0.92)',
                  minWidth: 140, padding: '8px 12px'
                }}>
                <div className="text-white font-bold text-sm mb-1">{tooltip.key}</div>
                {houseIncumbents[normalizeDistrict(tooltip.key)] && (
                  <div className="text-white/70 text-xs mb-1">{houseIncumbents[normalizeDistrict(tooltip.key)]}</div>
                )}
                <div className="font-semibold text-xs mb-1" style={{ color: ratingColors[tooltip.rating] }}>{tooltip.rating}</div>
                <div className="text-white/60 text-xs">
                  2024: {(() => { const d = housePVIData.find(([k])=>k===tooltip.key); if(!d) return '—'; const adj = d[1]+swing; return adj > 0 ? `R+${Math.abs(adj).toFixed(1)}` : adj < 0 ? `D+${Math.abs(adj).toFixed(1)}` : 'EVEN'; })()}
                </div>
              </div>
            )}
          </div>

          {/* Legend with margin labels */}
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {ratingOrder.map(r => (
              <button
                key={r}
                onMouseEnter={() => setHighlightRating(r)}
                onMouseLeave={() => setHighlightRating(null)}
                className="flex items-center gap-1.5 px-2 py-1 rounded-lg transition-all"
                style={{ background: highlightRating === r ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)' }}
              >
                <span className="w-3 h-3 rounded-full border border-white/40" style={{ backgroundColor: ratingColors[r] }} />
                <span className="text-white/70 text-xs">{r}</span>
              </button>
            ))}
          </div>
          <p className="text-white/40 text-xs text-center mt-2">
            Safe (&gt;15) · Likely (10–15) · Lean (5–10) · Tilt (2–5) · Toss Up (&lt;2)
          </p>
        </div>
      </div>
    </div>
  );
}