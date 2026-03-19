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

const stateData = {
  ME: { seats: ['Safe D','Safe D'], pos: [930, 75] },
  NH: { seats: ['Lean D','Lean D'], pos: [915, 108] },
  VT: { seats: ['Safe D'], pos: [945, 95] },
  MA: { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D'], pos: [940, 130] },
  RI: { seats: ['Safe D','Safe D'], pos: [958, 152] },
  CT: { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D'], pos: [930, 157] },
  NY: { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Lean D','Toss Up','Lean R','Likely R','Safe R','Safe R','Safe R','Safe R','Safe R'], pos: [878, 140] },
  NJ: { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Likely D','Lean D','Toss Up','Lean R','Safe R'], pos: [905, 172] },
  DE: { seats: ['Safe D'], pos: [908, 192] },
  MD: { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Likely R'], pos: [880, 200] },
  PA: { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Lean D','Toss Up','Lean R','Likely R','Safe R','Safe R','Safe R','Safe R'], pos: [855, 162] },
  VA: { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Lean D','Lean R','Likely R','Safe R','Safe R'], pos: [855, 220] },
  WV: { seats: ['Safe R','Safe R'], pos: [832, 208] },
  NC: { seats: ['Safe D','Safe D','Safe D','Safe D','Likely D','Lean D','Toss Up','Lean R','Likely R','Safe R','Safe R','Safe R','Safe R','Safe R'], pos: [840, 248] },
  SC: { seats: ['Safe D','Likely R','Safe R','Safe R','Safe R','Safe R','Safe R'], pos: [845, 278] },
  GA: { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Toss Up','Lean R','Likely R','Safe R','Safe R','Safe R','Safe R','Safe R'], pos: [832, 295] },
  FL: { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Lean D','Toss Up','Toss Up','Lean R','Likely R','Likely R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R'], pos: [820, 332] },
  AL: { seats: ['Safe D','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R'], pos: [808, 295] },
  MS: { seats: ['Safe D','Safe R','Safe R','Safe R'], pos: [798, 308] },
  TN: { seats: ['Safe D','Safe D','Likely R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R'], pos: [795, 255] },
  KY: { seats: ['Safe D','Safe R','Safe R','Safe R','Safe R','Safe R'], pos: [795, 228] },
  OH: { seats: ['Safe D','Safe D','Safe D','Safe D','Likely D','Toss Up','Lean R','Likely R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R'], pos: [818, 182] },
  IN: { seats: ['Safe D','Lean R','Likely R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R'], pos: [798, 195] },
  IL: { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Lean D','Lean R','Likely R','Safe R'], pos: [778, 192] },
  MI: { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Lean D','Toss Up','Lean R','Likely R','Safe R','Safe R'], pos: [808, 155] },
  WI: { seats: ['Safe D','Safe D','Likely D','Lean D','Toss Up','Lean R','Likely R','Safe R'], pos: [775, 155] },
  MN: { seats: ['Safe D','Safe D','Safe D','Safe D','Lean D','Toss Up','Lean R','Safe R'], pos: [750, 128] },
  IA: { seats: ['Lean D','Toss Up','Likely R','Safe R'], pos: [750, 178] },
  MO: { seats: ['Safe D','Safe D','Lean R','Safe R','Safe R','Safe R','Safe R','Safe R'], pos: [762, 225] },
  AR: { seats: ['Safe R','Safe R','Safe R','Safe R'], pos: [762, 275] },
  LA: { seats: ['Safe D','Safe D','Safe R','Safe R','Safe R','Safe R'], pos: [768, 315] },
  TX: { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Lean D','Lean D','Toss Up','Toss Up','Lean R','Lean R','Likely R','Likely R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R'], pos: [712, 328] },
  OK: { seats: ['Safe D','Safe R','Safe R','Safe R','Safe R'], pos: [715, 278] },
  KS: { seats: ['Toss Up','Safe R','Safe R','Safe R'], pos: [712, 228] },
  NE: { seats: ['Lean D','Safe R','Safe R'], pos: [705, 192] },
  SD: { seats: ['Safe R'], pos: [688, 155] },
  ND: { seats: ['Safe R'], pos: [668, 122] },
  MT: { seats: ['Safe R','Safe R'], pos: [615, 108] },
  WY: { seats: ['Safe R'], pos: [645, 175] },
  CO: { seats: ['Safe D','Safe D','Safe D','Safe D','Likely D','Lean R','Safe R','Safe R'], pos: [642, 232] },
  NM: { seats: ['Safe D','Safe D','Lean R'], pos: [632, 295] },
  AZ: { seats: ['Safe D','Safe D','Likely D','Lean D','Toss Up','Lean R','Likely R','Safe R','Safe R'], pos: [595, 298] },
  UT: { seats: ['Lean D','Lean R','Safe R','Safe R'], pos: [605, 240] },
  ID: { seats: ['Safe R','Safe R'], pos: [595, 172] },
  NV: { seats: ['Safe D','Likely D','Lean D','Toss Up'], pos: [568, 238] },
  CA: { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Likely D','Lean D','Lean D','Toss Up','Lean R','Lean R','Likely R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R'], pos: [532, 265] },
  OR: { seats: ['Safe D','Safe D','Safe D','Safe D','Likely D','Safe R'], pos: [548, 182] },
  WA: { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Lean D','Lean R','Safe R'], pos: [552, 132] },
  AK: { seats: ['Lean R'], pos: [510, 435] },
  HI: { seats: ['Safe D','Safe D'], pos: [572, 448] },
};

const ratingOrder = ['Safe D','Likely D','Lean D','Toss Up','Lean R','Likely R','Safe R'];

export default function HouseForecastMap() {
  const [hovered, setHovered] = useState(null);
  const [tooltip, setTooltip] = useState(null);

  const totals = {};
  ratingOrder.forEach(r => totals[r] = 0);
  Object.values(stateData).forEach(s => s.seats.forEach(r => { totals[r] = (totals[r] || 0) + 1; }));

  const demSeats = (totals['Safe D'] || 0) + (totals['Likely D'] || 0) + (totals['Lean D'] || 0);
  const repSeats = (totals['Safe R'] || 0) + (totals['Likely R'] || 0) + (totals['Lean R'] || 0);
  const tossUp = totals['Toss Up'] || 0;
  const total = demSeats + repSeats + tossUp;

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8">
      <p className="text-white/60 text-center text-sm mb-6">{total} seats · Each dot represents one congressional district</p>

      {/* Seat count bubbles matching SeatCounter style */}
      <div className="flex justify-center gap-4 mb-6">
        <div className="bg-blue-900/60 rounded-xl px-5 py-3 text-center min-w-[90px]">
          <div className="text-3xl font-bold text-blue-300">{demSeats}</div>
          <div className="text-blue-200/70 text-xs mt-1">Dem-leaning</div>
        </div>
        <div className="bg-purple-900/60 rounded-xl px-5 py-3 text-center min-w-[90px]">
          <div className="text-3xl font-bold text-purple-300">{tossUp}</div>
          <div className="text-purple-200/70 text-xs mt-1">Toss Up</div>
        </div>
        <div className="bg-red-900/60 rounded-xl px-5 py-3 text-center min-w-[90px]">
          <div className="text-3xl font-bold text-red-300">{repSeats}</div>
          <div className="text-red-200/70 text-xs mt-1">Rep-leaning</div>
        </div>
      </div>

      <div className="text-white/50 text-xs text-center mb-4">218 seats needed for majority</div>

      {/* Map */}
      <div className="relative w-full overflow-x-auto">
        <svg viewBox="0 0 1000 510" className="w-full" style={{ minWidth: '320px' }}>
          {Object.entries(stateData).map(([abbr, { seats, pos }]) => {
            const [cx, cy] = pos;
            const cols = Math.ceil(Math.sqrt(seats.length));
            const dotR = seats.length > 20 ? 4.5 : seats.length > 8 ? 5.5 : 6.5;
            const gap = dotR * 3.0;
            return seats.map((rating, i) => {
              const col = i % cols;
              const row = Math.floor(i / cols);
              const totalCols = Math.min(cols, seats.length);
              const dx = (col - (totalCols - 1) / 2) * gap;
              const dy = (row - (Math.ceil(seats.length / cols) - 1) / 2) * gap;
              const key = `${abbr}-${i}`;
              const isHovered = hovered === key;
              const districtLabel = `${abbr}-${i + 1}`;
              return (
                <circle
                  key={key}
                  cx={cx + dx}
                  cy={cy + dy}
                  r={isHovered ? dotR * 1.7 : dotR}
                  fill={ratingColors[rating]}
                  stroke="white"
                  strokeWidth={isHovered ? 1.5 : 0.8}
                  opacity={0.95}
                  onMouseEnter={(e) => {
                    setHovered(key);
                    setTooltip({ label: districtLabel, rating, x: e.clientX, y: e.clientY });
                  }}
                  onMouseLeave={() => { setHovered(null); setTooltip(null); }}
                  style={{ cursor: 'pointer', transition: 'r 0.1s' }}
                />
              );
            });
          })}
        </svg>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 text-white text-xs px-3 py-2 rounded-lg pointer-events-none border border-white/20"
          style={{ left: tooltip.x + 12, top: tooltip.y - 30, backgroundColor: 'rgba(0,0,0,0.8)' }}
        >
          <span className="font-bold">{tooltip.label}</span> — {tooltip.rating}
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