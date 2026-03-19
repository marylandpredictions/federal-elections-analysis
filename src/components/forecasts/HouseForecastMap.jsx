import React, { useState } from 'react';

const ratingColors = {
  'Safe D':   '#1E3A8A',
  'Likely D': '#2563EB',
  'Lean D':   '#93C5FD',
  'Toss Up':  '#A855F7',
  'Lean R':   '#FCA5A5',
  'Likely R': '#DC2626',
  'Safe R':   '#7F1D1D',
};

const ratingOrder = ['Safe D','Likely D','Lean D','Toss Up','Lean R','Likely R','Safe R'];

// All 435 seats: state abbreviation → array of ratings
const stateSeats = {
  AK: ['Lean R'],
  AL: ['Safe D','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R'],
  AR: ['Safe R','Safe R','Safe R','Safe R'],
  AZ: ['Safe D','Safe D','Likely D','Lean D','Toss Up','Lean R','Likely R','Safe R','Safe R'],
  CA: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Likely D','Lean D','Lean D','Toss Up','Lean R','Lean R','Likely R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R'],
  CO: ['Safe D','Safe D','Safe D','Safe D','Likely D','Lean R','Safe R','Safe R'],
  CT: ['Safe D','Safe D','Safe D','Safe D','Safe D'],
  DE: ['Safe D'],
  FL: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Lean D','Toss Up','Toss Up','Lean R','Likely R','Likely R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R'],
  GA: ['Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Toss Up','Lean R','Likely R','Safe R','Safe R','Safe R','Safe R','Safe R'],
  HI: ['Safe D','Safe D'],
  IA: ['Lean D','Toss Up','Likely R','Safe R'],
  ID: ['Safe R','Safe R'],
  IL: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Lean D','Lean R','Likely R','Safe R'],
  IN: ['Safe D','Lean R','Likely R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R'],
  KS: ['Toss Up','Safe R','Safe R','Safe R'],
  KY: ['Safe D','Safe R','Safe R','Safe R','Safe R','Safe R'],
  LA: ['Safe D','Safe D','Safe R','Safe R','Safe R','Safe R'],
  MA: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D'],
  MD: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Likely R'],
  ME: ['Safe D','Safe D'],
  MI: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Lean D','Toss Up','Lean R','Likely R','Safe R','Safe R'],
  MN: ['Safe D','Safe D','Safe D','Safe D','Lean D','Toss Up','Lean R','Safe R'],
  MO: ['Safe D','Safe D','Lean R','Safe R','Safe R','Safe R','Safe R','Safe R'],
  MS: ['Safe D','Safe R','Safe R','Safe R'],
  MT: ['Safe R','Safe R'],
  NC: ['Safe D','Safe D','Safe D','Safe D','Likely D','Lean D','Toss Up','Lean R','Likely R','Safe R','Safe R','Safe R','Safe R','Safe R'],
  ND: ['Safe R'],
  NE: ['Lean D','Safe R','Safe R'],
  NH: ['Lean D','Lean D'],
  NJ: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Likely D','Lean D','Toss Up','Lean R','Safe R'],
  NM: ['Safe D','Safe D','Lean R'],
  NV: ['Safe D','Likely D','Lean D','Toss Up'],
  NY: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Lean D','Toss Up','Lean R','Likely R','Safe R','Safe R','Safe R','Safe R','Safe R'],
  OH: ['Safe D','Safe D','Safe D','Safe D','Likely D','Toss Up','Lean R','Likely R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R'],
  OK: ['Safe D','Safe R','Safe R','Safe R','Safe R'],
  OR: ['Safe D','Safe D','Safe D','Safe D','Likely D','Safe R'],
  PA: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Lean D','Toss Up','Lean R','Likely R','Safe R','Safe R','Safe R','Safe R'],
  RI: ['Safe D','Safe D'],
  SC: ['Safe D','Likely R','Safe R','Safe R','Safe R','Safe R','Safe R'],
  SD: ['Safe R'],
  TN: ['Safe D','Safe D','Likely R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R'],
  TX: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Lean D','Lean D','Toss Up','Toss Up','Lean R','Lean R','Likely R','Likely R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R'],
  UT: ['Lean D','Lean R','Safe R','Safe R'],
  VA: ['Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Lean D','Lean R','Likely R','Safe R','Safe R'],
  VT: ['Safe D'],
  WA: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Lean D','Lean R','Safe R'],
  WI: ['Safe D','Safe D','Likely D','Lean D','Toss Up','Lean R','Likely R','Safe R'],
  WV: ['Safe R','Safe R'],
  WY: ['Safe R'],
};

export default function HouseForecastMap() {
  const [hovered, setHovered] = useState(null);
  const [tooltip, setTooltip] = useState(null);

  // Build sorted seat list: by rating order, then state alpha, then district #
  const allSeats = [];
  const ratingGroups = {};
  ratingOrder.forEach(r => ratingGroups[r] = []);

  Object.entries(stateSeats).sort(([a], [b]) => a.localeCompare(b)).forEach(([state, seats]) => {
    seats.forEach((rating, i) => {
      ratingGroups[rating].push({ state, district: i + 1, rating, key: `${state}-${i + 1}` });
    });
  });

  ratingOrder.forEach(r => allSeats.push(...ratingGroups[r]));

  // Count totals
  const totals = {};
  ratingOrder.forEach(r => totals[r] = 0);
  allSeats.forEach(s => totals[s.rating]++);
  const demSeats = (totals['Safe D'] || 0) + (totals['Likely D'] || 0) + (totals['Lean D'] || 0);
  const repSeats = (totals['Safe R'] || 0) + (totals['Likely R'] || 0) + (totals['Lean R'] || 0);
  const tossUp = totals['Toss Up'] || 0;
  const total = allSeats.length;

  // Parliament semicircle layout
  // Center at (500, 420), arcs from angle π (left=Safe D) to 0 (right=Safe R)
  const cx = 500, cy = 430;
  const dotR = 6;
  const spacing = dotR * 2.8;
  const startRadius = 90;
  const radiusStep = spacing + 1;

  // Distribute seats into rows
  const rows = [];
  let remaining = total;
  let r = startRadius;
  while (remaining > 0) {
    const capacity = Math.floor(Math.PI * r / spacing);
    const count = Math.min(capacity, remaining);
    rows.push({ radius: r, count });
    remaining -= count;
    r += radiusStep;
  }

  // Assign seats to positions
  const dotPositions = [];
  let seatIdx = 0;
  rows.forEach(({ radius, count }) => {
    for (let i = 0; i < count; i++) {
      // angle goes from π (left) to 0 (right), evenly spaced
      const angle = Math.PI - (i / (count - 1 || 1)) * Math.PI;
      const x = cx + radius * Math.cos(angle);
      const y = cy - radius * Math.sin(angle);
      dotPositions.push({ x, y, seat: allSeats[seatIdx] });
      seatIdx++;
    }
  });

  // Compute SVG height needed
  const maxRadius = rows[rows.length - 1]?.radius || 200;
  const svgHeight = cy - maxRadius + 40;
  const svgViewHeight = cy + 30;

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8">
      <p className="text-white/60 text-center text-sm mb-6">{total} seats · Each dot represents one congressional district</p>

      {/* Seat count bubbles */}
      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        <div className="bg-blue-900/60 rounded-xl px-6 py-3 text-center min-w-[100px] shadow-lg transition-transform duration-200 hover:scale-110 cursor-pointer">
          <div className="text-3xl font-bold text-blue-300">{demSeats}</div>
          <div className="text-blue-200/70 text-sm mt-1">Democrat</div>
        </div>
        <div className="bg-purple-900/60 rounded-xl px-6 py-3 text-center min-w-[100px] shadow-lg transition-transform duration-200 hover:scale-110 cursor-pointer">
          <div className="text-3xl font-bold text-purple-300">{tossUp}</div>
          <div className="text-purple-200/70 text-sm mt-1">Toss Up</div>
        </div>
        <div className="bg-red-900/60 rounded-xl px-6 py-3 text-center min-w-[100px] shadow-lg transition-transform duration-200 hover:scale-110 cursor-pointer">
          <div className="text-3xl font-bold text-red-300">{repSeats}</div>
          <div className="text-red-200/70 text-sm mt-1">Republican</div>
        </div>
      </div>

      <div className="text-white/50 text-xs text-center mb-4">218 seats needed for majority</div>

      {/* Semicircle map */}
      <div className="relative w-full overflow-x-auto">
        <svg viewBox={`0 0 1000 ${svgViewHeight}`} className="w-full" style={{ minWidth: '320px' }}>
          {dotPositions.map(({ x, y, seat }) => {
            if (!seat) return null;
            const isHovered = hovered === seat.key;
            return (
              <circle
                key={seat.key}
                cx={x}
                cy={y}
                r={isHovered ? dotR * 1.8 : dotR}
                fill={ratingColors[seat.rating]}
                stroke="white"
                strokeWidth={isHovered ? 1.8 : 0.7}
                opacity={0.95}
                onMouseEnter={(e) => {
                  setHovered(seat.key);
                  setTooltip({ label: `${seat.state}-${seat.district}`, rating: seat.rating, x: e.clientX, y: e.clientY });
                }}
                onMouseLeave={() => { setHovered(null); setTooltip(null); }}
                style={{ cursor: 'pointer', transition: 'r 0.1s' }}
              />
            );
          })}
          {/* Center line */}
          <line x1={cx} y1={cy - maxRadius - 10} x2={cx} y2={cy + 5} stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4,4" />
          <text x={cx - 70} y={cy + 22} fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="Inter,sans-serif">← Democrat</text>
          <text x={cx + 12} y={cy + 22} fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="Inter,sans-serif">Republican →</text>
        </svg>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 text-white text-xs px-3 py-2 rounded-lg pointer-events-none border border-white/60"
          style={{ left: tooltip.x + 14, top: tooltip.y - 55, backgroundColor: 'rgba(0,0,0,0.8)' }}
        >
          <div className="font-bold text-sm">{tooltip.label}</div>
          <div className="mt-0.5 font-semibold" style={{ color: ratingColors[tooltip.rating] }}>{tooltip.rating}</div>
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {ratingOrder.map(r => (
          <div key={r} className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full border border-white/40" style={{ backgroundColor: ratingColors[r] }} />
            <span className="text-white/70 text-xs">{r}</span>
          </div>
        ))}
      </div>
    </div>
  );
}