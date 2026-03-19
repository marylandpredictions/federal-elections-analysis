import React, { useState } from 'react';

const ratingColors = {
  'Safe D':    '#1E3A8A',
  'Likely D':  '#2563EB',
  'Lean D':    '#93C5FD',
  'Toss Up':   '#94A3B8',
  'Lean R':    '#FCA5A5',
  'Likely R':  '#DC2626',
  'Safe R':    '#7F1D1D',
};

// Each state: seats array of ratings, and map position [x, y] in 0-1000 x 0-600 space
const stateData = {
  ME: { seats: ['Safe D','Safe D'], pos: [930, 82] },
  NH: { seats: ['Lean D','Lean D'], pos: [915, 108] },
  VT: { seats: ['Safe D'], pos: [898, 100] },
  MA: { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D'], pos: [935, 128] },
  RI: { seats: ['Safe D','Safe D'], pos: [943, 148] },
  CT: { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D'], pos: [922, 155] },
  NY: { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Lean D','Toss Up','Lean R','Likely R','Safe R','Safe R','Safe R','Safe R','Safe R'], pos: [875, 140] },
  NJ: { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Likely D','Lean D','Toss Up','Lean R','Safe R'], pos: [898, 168] },
  DE: { seats: ['Safe D'], pos: [900, 183] },
  MD: { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Likely R'], pos: [883, 192] },
  PA: { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Lean D','Toss Up','Lean R','Likely R','Safe R','Safe R','Safe R','Safe R'], pos: [858, 158] },
  VA: { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Lean D','Lean R','Likely R','Safe R','Safe R'], pos: [858, 215] },
  WV: { seats: ['Safe R','Safe R'], pos: [840, 202] },
  NC: { seats: ['Safe D','Safe D','Safe D','Safe D','Likely D','Lean D','Toss Up','Lean R','Likely R','Safe R','Safe R','Safe R','Safe R','Safe R'], pos: [848, 240] },
  SC: { seats: ['Safe D','Likely R','Safe R','Safe R','Safe R','Safe R','Safe R'], pos: [848, 265] },
  GA: { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Toss Up','Lean R','Likely R','Safe R','Safe R','Safe R','Safe R','Safe R'], pos: [838, 280] },
  FL: { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Lean D','Toss Up','Toss Up','Lean R','Likely R','Likely R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R'], pos: [822, 318] },
  AL: { seats: ['Safe D','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R'], pos: [812, 283] },
  MS: { seats: ['Safe D','Safe R','Safe R','Safe R'], pos: [802, 295] },
  TN: { seats: ['Safe D','Safe D','Likely R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R'], pos: [800, 250] },
  KY: { seats: ['Safe D','Safe R','Safe R','Safe R','Safe R','Safe R'], pos: [800, 225] },
  OH: { seats: ['Safe D','Safe D','Safe D','Safe D','Likely D','Toss Up','Lean R','Likely R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R'], pos: [820, 178] },
  IN: { seats: ['Safe D','Lean R','Likely R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R'], pos: [802, 188] },
  IL: { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Lean D','Lean R','Likely R','Safe R'], pos: [785, 188] },
  MI: { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Lean D','Toss Up','Lean R','Likely R','Safe R','Safe R'], pos: [812, 152] },
  WI: { seats: ['Safe D','Safe D','Likely D','Lean D','Toss Up','Lean R','Likely R','Safe R'], pos: [780, 152] },
  MN: { seats: ['Safe D','Safe D','Safe D','Safe D','Lean D','Toss Up','Lean R','Safe R'], pos: [758, 128] },
  IA: { seats: ['Lean D','Toss Up','Likely R','Safe R'], pos: [758, 173] },
  MO: { seats: ['Safe D','Safe D','Lean R','Safe R','Safe R','Safe R','Safe R','Safe R'], pos: [768, 218] },
  AR: { seats: ['Safe R','Safe R','Safe R','Safe R'], pos: [768, 268] },
  LA: { seats: ['Safe D','Safe D','Safe R','Safe R','Safe R','Safe R'], pos: [775, 305] },
  TX: { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Lean D','Lean D','Toss Up','Toss Up','Lean R','Lean R','Likely R','Likely R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R'], pos: [718, 318] },
  OK: { seats: ['Safe D','Safe R','Safe R','Safe R','Safe R'], pos: [720, 270] },
  KS: { seats: ['Toss Up','Safe R','Safe R','Safe R'], pos: [718, 222] },
  NE: { seats: ['Lean D','Safe R','Safe R'], pos: [712, 188] },
  SD: { seats: ['Safe R'], pos: [695, 152] },
  ND: { seats: ['Safe R'], pos: [678, 122] },
  MT: { seats: ['Safe R','Safe R'], pos: [622, 112] },
  WY: { seats: ['Safe R'], pos: [650, 172] },
  CO: { seats: ['Safe D','Safe D','Safe D','Safe D','Likely D','Lean R','Safe R','Safe R'], pos: [648, 228] },
  NM: { seats: ['Safe D','Safe D','Lean R'], pos: [638, 288] },
  AZ: { seats: ['Safe D','Safe D','Likely D','Lean D','Toss Up','Lean R','Likely R','Safe R','Safe R'], pos: [600, 290] },
  UT: { seats: ['Lean D','Lean R','Safe R','Safe R'], pos: [610, 235] },
  ID: { seats: ['Safe R','Safe R'], pos: [600, 168] },
  NV: { seats: ['Safe D','Likely D','Lean D','Toss Up'], pos: [575, 235] },
  CA: { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Likely D','Lean D','Lean D','Toss Up','Lean R','Lean R','Likely R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R','Safe R'], pos: [538, 258] },
  OR: { seats: ['Safe D','Safe D','Safe D','Safe D','Likely D','Safe R'], pos: [555, 178] },
  WA: { seats: ['Safe D','Safe D','Safe D','Safe D','Safe D','Safe D','Likely D','Lean D','Lean R','Safe R'], pos: [558, 132] },
  AK: { seats: ['Lean R'], pos: [520, 430] },
  HI: { seats: ['Safe D','Safe D'], pos: [578, 440] },
};

const ratingOrder = ['Safe D','Likely D','Lean D','Toss Up','Lean R','Likely R','Safe R'];

export default function HouseForecastMap() {
  const [tooltip, setTooltip] = useState(null);

  // Count totals
  const totals = {};
  ratingOrder.forEach(r => totals[r] = 0);
  Object.values(stateData).forEach(s => s.seats.forEach(r => { totals[r] = (totals[r] || 0) + 1; }));

  const demSeats = (totals['Safe D'] || 0) + (totals['Likely D'] || 0) + (totals['Lean D'] || 0);
  const repSeats = (totals['Safe R'] || 0) + (totals['Likely R'] || 0) + (totals['Lean R'] || 0);
  const tossUp = totals['Toss Up'] || 0;

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8">
      <h3 className="text-white font-inter font-bold text-xl sm:text-2xl mb-2 text-shadow-teal text-center">
        House Forecast Map
      </h3>
      <p className="text-white/60 text-center text-sm mb-6">435 seats · Each dot represents one congressional district</p>

      {/* Seat summary */}
      <div className="flex justify-center gap-6 mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold" style={{ color: '#2563EB' }}>{demSeats}</div>
          <div className="text-white/70 text-xs">Dem-leaning</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-white/60">{tossUp}</div>
          <div className="text-white/70 text-xs">Toss Up</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold" style={{ color: '#DC2626' }}>{repSeats}</div>
          <div className="text-white/70 text-xs">Rep-leaning</div>
        </div>
      </div>

      {/* Majority line indicator */}
      <div className="text-white/50 text-xs text-center mb-4">218 seats needed for majority</div>

      {/* Map */}
      <div className="relative w-full overflow-x-auto">
        <svg viewBox="0 0 1000 500" className="w-full" style={{ minWidth: '320px' }}>
          {Object.entries(stateData).map(([abbr, { seats, pos }]) => {
            const [cx, cy] = pos;
            const cols = Math.ceil(Math.sqrt(seats.length));
            const dotSize = seats.length > 20 ? 4 : seats.length > 8 ? 5 : 6;
            const gap = dotSize * 2.2;
            return seats.map((rating, i) => {
              const col = i % cols;
              const row = Math.floor(i / cols);
              const totalCols = Math.min(cols, seats.length);
              const dx = (col - (totalCols - 1) / 2) * gap;
              const dy = (row - (Math.ceil(seats.length / cols) - 1) / 2) * gap;
              return (
                <circle
                  key={`${abbr}-${i}`}
                  cx={cx + dx}
                  cy={cy + dy}
                  r={dotSize * 0.9}
                  fill={ratingColors[rating]}
                  opacity={0.92}
                  onMouseEnter={(e) => setTooltip({ abbr, rating, x: e.clientX, y: e.clientY })}
                  onMouseLeave={() => setTooltip(null)}
                  style={{ cursor: 'pointer' }}
                />
              );
            });
          })}
          {/* State labels for larger states */}
          {Object.entries(stateData).map(([abbr, { seats, pos }]) => {
            if (seats.length < 6) return null;
            const [cx, cy] = pos;
            const cols = Math.ceil(Math.sqrt(seats.length));
            const dotSize = seats.length > 20 ? 4 : seats.length > 8 ? 5 : 6;
            const gap = dotSize * 2.2;
            const rows = Math.ceil(seats.length / cols);
            return (
              <text
                key={`label-${abbr}`}
                x={cx}
                y={cy + (rows / 2) * gap + 10}
                textAnchor="middle"
                fill="rgba(255,255,255,0.5)"
                fontSize="8"
                fontFamily="Inter, sans-serif"
              >
                {abbr}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 bg-black/90 text-white text-xs px-3 py-2 rounded-lg pointer-events-none border border-white/20"
          style={{ left: tooltip.x + 12, top: tooltip.y - 30 }}
        >
          <span className="font-bold">{tooltip.abbr}</span> — {tooltip.rating}
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {ratingOrder.map(r => (
          <div key={r} className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: ratingColors[r] }} />
            <span className="text-white/70 text-xs">{r}</span>
          </div>
        ))}
      </div>
    </div>
  );
}