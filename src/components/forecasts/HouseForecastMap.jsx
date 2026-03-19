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

// Positions scaled to fill ~50-980 x, 50-470 y space
const stateData = {
  ME:  { seats: ['Safe D','Safe D'], pos: [918, 50] },
  NH:  { seats: ['Lean D','Lean D'], pos: [887, 87] },
  VT:  { seats: ['Safe D'], pos: [949, 73] },
  MA:  { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D'], pos: [939, 112] },
  RI:  { seats: ['Safe D','Safe D'], pos: [976, 137] },
  CT:  { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D'], pos: [918, 142] },
  NY:  { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Lean D','Toss Up','Lean R','Likely R','Safe R','Safe R','Safe R','Safe R','Safe R'], pos: [811, 123] },
  NJ:  { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Likely D','Lean D','Toss Up','Lean R','Safe R'], pos: [866, 159] },
  DE:  { seats: ['Safe D'], pos: [873, 182] },
  MD:  { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Likely R'], pos: [815, 191] },
  PA:  { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Lean D','Toss Up','Lean R','Likely R','Safe R','Safe R','Safe R','Safe R'], pos: [763, 148] },
  VA:  { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Lean D','Lean R','Likely R','Safe R','Safe R'], pos: [763, 213] },
  WV:  { seats: ['Safe R','Safe R'], pos: [716, 200] },
  NC:  { seats: ['Safe D','Safe D','Safe D','Safe D','Likely D','Lean D','Toss Up','Lean R','Likely R','Safe R','Safe R','Safe R','Safe R','Safe R'], pos: [732, 245] },
  SC:  { seats: ['Safe D','Likely R','Safe R','Safe R','Safe R','Safe R','Safe R'], pos: [743, 279] },
  GA:  { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Toss Up','Lean R','Likely R','Safe R','Safe R','Safe R','Safe R','Safe R'], pos: [716, 298] },
  FL:  { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Lean D','Toss Up','Toss Up','Lean R','Likely R','Likely R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R'], pos: [691, 339] },
  AL:  { seats: ['Safe D','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R'], pos: [666, 298] },
  MS:  { seats: ['Safe D','Safe R','Safe R','Safe R'], pos: [645, 312] },
  TN:  { seats: ['Safe D','Safe D','Likely R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R'], pos: [639, 253] },
  KY:  { seats: ['Safe D','Safe R','Safe R','Safe R','Safe R','Safe R'], pos: [639, 222] },
  OH:  { seats: ['Safe D','Safe D','Safe D','Safe D','Likely D','Toss Up','Lean R','Likely R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R'], pos: [687, 171] },
  IN:  { seats: ['Safe D','Lean R','Likely R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R'], pos: [645, 185] },
  IL:  { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Lean D','Lean R','Likely R','Safe R'], pos: [604, 182] },
  MI:  { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Lean D','Toss Up','Lean R','Likely R','Safe R','Safe R'], pos: [666, 140] },
  WI:  { seats: ['Safe D','Safe D','Likely D','Lean D','Toss Up','Lean R','Likely R','Safe R'], pos: [597, 140] },
  MN:  { seats: ['Safe D','Safe D','Safe D','Safe D','Lean D','Toss Up','Lean R','Safe R'], pos: [546, 110] },
  IA:  { seats: ['Lean D','Toss Up','Likely R','Safe R'], pos: [546, 166] },
  MO:  { seats: ['Safe D','Safe D','Lean R','Safe R','Safe R','Safe R','Safe R','Safe R'], pos: [571, 219] },
  AR:  { seats: ['Safe R','Safe R','Safe R','Safe R'], pos: [571, 275] },
  LA:  { seats: ['Safe D','Safe D','Safe R','Safe R','Safe R','Safe R'], pos: [583, 320] },
  TX:  { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Lean D','Lean D','Toss Up','Toss Up','Lean R','Lean R','Likely R','Likely R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R'], pos: [468, 335] },
  OK:  { seats: ['Safe D','Safe R','Safe R','Safe R','Safe R'], pos: [474, 279] },
  KS:  { seats: ['Toss Up','Safe R','Safe R','Safe R'], pos: [468, 222] },
  NE:  { seats: ['Lean D','Safe R','Safe R'], pos: [453, 182] },
  SD:  { seats: ['Safe R'], pos: [418, 140] },
  ND:  { seats: ['Safe R'], pos: [377, 103] },
  MT:  { seats: ['Safe R','Safe R'], pos: [267, 87] },
  WY:  { seats: ['Safe R'], pos: [329, 163] },
  CO:  { seats: ['Safe D','Safe D','Safe D','Safe D','Likely D','Lean R','Safe R','Safe R'], pos: [323, 227] },
  NM:  { seats: ['Safe D','Safe D','Lean R'], pos: [302, 298] },
  AZ:  { seats: ['Safe D','Safe D','Likely D','Lean D','Toss Up','Lean R','Likely R','Safe R','Safe R'], pos: [226, 301] },
  UT:  { seats: ['Lean D','Lean R','Safe R','Safe R'], pos: [246, 236] },
  ID:  { seats: ['Safe R','Safe R'], pos: [226, 159] },
  NV:  { seats: ['Safe D','Likely D','Lean D','Toss Up'], pos: [170, 234] },
  CA:  { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Likely D','Lean D','Lean D','Toss Up','Lean R','Lean R','Likely R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R'], pos: [95, 264] },
  OR:  { seats: ['Safe D','Safe D','Safe D','Safe D','Likely D','Safe R'], pos: [129, 171] },
  WA:  { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Lean D','Lean R','Safe R'], pos: [137, 114] },
  AK:  { seats: ['Lean R'], pos: [55, 440] },
  HI:  { seats: ['Safe D','Safe D'], pos: [178, 458] },
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

      {/* Map */}
      <div className="relative w-full overflow-x-auto">
        <svg viewBox="0 0 1030 500" className="w-full" style={{ minWidth: '320px' }}>
          {Object.entries(stateData).map(([abbr, { seats, pos }]) => {
            const [cx, cy] = pos;
            const cols = Math.ceil(Math.sqrt(seats.length));
            const dotR = seats.length > 20 ? 4.5 : seats.length > 8 ? 5.5 : 6.5;
            const gap = dotR * 3.8;
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
                  r={isHovered ? dotR * 1.8 : dotR}
                  fill={ratingColors[rating]}
                  stroke="white"
                  strokeWidth={isHovered ? 1.8 : 0.8}
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
          className="fixed z-50 text-white text-xs px-3 py-2 rounded-lg pointer-events-none border border-white/60"
          style={{ left: tooltip.x + 14, top: tooltip.y - 48, backgroundColor: 'rgba(0,0,0,0.8)' }}
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