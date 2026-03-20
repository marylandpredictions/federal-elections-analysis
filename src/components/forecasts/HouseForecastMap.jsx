import React, { useState, useCallback } from 'react';

const ratingColors = {
  'Safe D':    '#1E3A8A',
  'Likely D':  '#2563EB',
  'Lean D':    '#93C5FD',
  'Tilt D':    '#BFDBFE',
  'Toss Up':   '#A855F7',
  'Tilt R':    '#FECACA',
  'Lean R':    '#FCA5A5',
  'Likely R':  '#DC2626',
  'Safe R':    '#7F1D1D',
};

const ratingOrder = ['Safe D','Likely D','Lean D','Tilt D','Toss Up','Tilt R','Lean R','Likely R','Safe R'];

const rawSeats = [
  ['AL-1','Safe R'],['AL-2','Safe D'],['AL-3','Safe R'],['AL-4','Safe R'],['AL-5','Safe R'],['AL-6','Safe R'],['AL-7','Safe D'],
  ['AK-AL','Toss Up'],
  ['AZ-1','Toss Up'],['AZ-2','Lean R'],['AZ-3','Safe D'],['AZ-4','Likely D'],['AZ-5','Safe R'],['AZ-6','Toss Up'],['AZ-7','Safe D'],['AZ-8','Likely R'],['AZ-9','Safe R'],
  ['AR-1','Safe R'],['AR-2','Safe R'],['AR-3','Safe R'],['AR-4','Safe R'],
  ['CA-1','Safe D'],['CA-2','Safe D'],['CA-3','Likely D'],['CA-4','Safe D'],['CA-5','Safe R'],['CA-6','Likely D'],['CA-7','Safe D'],['CA-8','Safe D'],['CA-9','Lean D'],['CA-10','Safe D'],['CA-11','Safe D'],['CA-12','Safe D'],['CA-13','Lean D'],['CA-14','Safe D'],['CA-15','Safe D'],['CA-16','Safe D'],['CA-17','Safe D'],['CA-18','Safe D'],['CA-19','Safe D'],['CA-20','Likely R'],['CA-21','Likely D'],['CA-22','Lean D'],['CA-23','Likely R'],['CA-24','Safe D'],['CA-25','Likely D'],['CA-26','Likely D'],['CA-27','Likely D'],['CA-28','Safe D'],['CA-29','Safe D'],['CA-30','Safe D'],['CA-31','Safe D'],['CA-32','Safe D'],['CA-33','Safe D'],['CA-34','Safe D'],['CA-35','Likely D'],['CA-36','Safe D'],['CA-37','Safe D'],['CA-38','Safe D'],['CA-39','Safe D'],['CA-40','Lean R'],['CA-41','Likely D'],['CA-42','Safe D'],['CA-43','Safe D'],['CA-44','Safe D'],['CA-45','Lean D'],['CA-46','Safe D'],['CA-47','Likely D'],['CA-48','Tilt D'],['CA-49','Likely D'],['CA-50','Safe D'],['CA-51','Safe D'],['CA-52','Safe D'],
  ['CO-1','Safe D'],['CO-2','Safe D'],['CO-3','Toss Up'],['CO-4','Likely R'],['CO-5','Likely R'],['CO-6','Safe D'],['CO-7','Safe D'],['CO-8','Lean D'],
  ['CT-1','Safe D'],['CT-2','Safe D'],['CT-3','Safe D'],['CT-4','Safe D'],['CT-5','Safe D'],
  ['DE-AL','Safe D'],
  ['FL-1','Safe R'],['FL-2','Likely R'],['FL-3','Safe R'],['FL-4','Likely R'],['FL-5','Safe R'],['FL-6','Safe R'],['FL-7','Likely R'],['FL-8','Safe R'],['FL-9','Safe D'],['FL-10','Safe D'],['FL-11','Likely R'],['FL-12','Safe R'],['FL-13','Likely R'],['FL-14','Safe D'],['FL-15','Likely R'],['FL-16','Likely R'],['FL-17','Safe R'],['FL-18','Safe R'],['FL-19','Safe R'],['FL-20','Safe D'],['FL-21','Likely R'],['FL-22','Safe D'],['FL-23','Likely D'],['FL-24','Safe D'],['FL-25','Likely D'],['FL-26','Safe R'],['FL-27','Safe R'],['FL-28','Likely R'],
  ['GA-1','Likely R'],['GA-2','Safe D'],['GA-3','Safe R'],['GA-4','Safe D'],['GA-5','Safe D'],['GA-6','Safe D'],['GA-7','Safe R'],['GA-8','Safe R'],['GA-9','Safe R'],['GA-10','Safe R'],['GA-11','Safe R'],['GA-12','Likely R'],['GA-13','Safe D'],['GA-14','Safe R'],
  ['HI-1','Safe D'],['HI-2','Safe D'],
  ['ID-1','Safe R'],['ID-2','Safe R'],
  ['IL-1','Safe D'],['IL-2','Safe D'],['IL-3','Safe D'],['IL-4','Safe D'],['IL-5','Safe D'],['IL-6','Safe D'],['IL-7','Safe D'],['IL-8','Safe D'],['IL-9','Safe D'],['IL-10','Safe D'],['IL-11','Safe D'],['IL-12','Safe R'],['IL-13','Safe D'],['IL-14','Safe D'],['IL-15','Safe R'],['IL-16','Safe R'],['IL-17','Safe D'],
  ['IN-1','Safe D'],['IN-2','Safe R'],['IN-3','Safe R'],['IN-4','Safe R'],['IN-5','Likely R'],['IN-6','Safe R'],['IN-7','Safe D'],['IN-8','Safe R'],['IN-9','Safe R'],
  ['IA-1','Lean D'],['IA-2','Likely R'],['IA-3','Tilt D'],['IA-4','Safe R'],
  ['KS-1','Safe R'],['KS-2','Likely R'],['KS-3','Safe D'],['KS-4','Safe R'],
  ['KY-1','Safe R'],['KY-2','Safe R'],['KY-3','Safe D'],['KY-4','Safe R'],['KY-5','Safe R'],['KY-6','Safe R'],
  ['LA-1','Safe R'],['LA-2','Safe D'],['LA-3','Safe R'],['LA-4','Safe R'],['LA-5','Safe R'],['LA-6','Safe D'],
  ['MA-1','Safe D'],['MA-2','Safe D'],['MA-3','Safe D'],['MA-4','Safe D'],['MA-5','Safe D'],['MA-6','Safe D'],['MA-7','Safe D'],['MA-8','Safe D'],['MA-9','Safe D'],
  ['MD-1','Likely R'],['MD-2','Safe D'],['MD-3','Safe D'],['MD-4','Safe D'],['MD-5','Safe D'],['MD-6','Likely D'],['MD-7','Safe D'],['MD-8','Safe D'],
  ['ME-1','Safe D'],['ME-2','Toss Up'],
  ['MI-1','Likely R'],['MI-2','Safe R'],['MI-3','Safe D'],['MI-4','Lean R'],['MI-5','Safe R'],['MI-6','Safe D'],['MI-7','Toss Up'],['MI-8','Likely D'],['MI-9','Safe R'],['MI-10','Lean R'],['MI-11','Safe D'],['MI-12','Safe D'],['MI-13','Safe D'],
  ['MN-1','Likely R'],['MN-2','Safe D'],['MN-3','Safe D'],['MN-4','Safe D'],['MN-5','Safe D'],['MN-6','Safe R'],['MN-7','Safe R'],['MN-8','Likely R'],
  ['MS-1','Safe R'],['MS-2','Safe D'],['MS-3','Safe R'],['MS-4','Safe R'],
  ['MO-1','Safe D'],['MO-2','Likely R'],['MO-3','Safe R'],['MO-4','Likely R'],['MO-5','Likely R'],['MO-6','Safe R'],['MO-7','Safe R'],['MO-8','Likely R'],
  ['MT-1','Lean R'],['MT-2','Safe R'],
  ['NE-1','Likely R'],['NE-2','Lean D'],['NE-3','Safe R'],
  ['NV-1','Likely D'],['NV-2','Likely R'],['NV-3','Likely D'],['NV-4','Likely D'],
  ['NH-1','Likely D'],['NH-2','Likely D'],
  ['NJ-1','Safe D'],['NJ-2','Likely R'],['NJ-3','Safe D'],['NJ-4','Safe D'],['NJ-5','Safe D'],['NJ-6','Safe D'],['NJ-7','Tilt R'],['NJ-8','Safe D'],['NJ-9','Likely D'],['NJ-10','Safe D'],['NJ-11','Safe D'],['NJ-12','Safe D'],
  ['NM-1','Safe D'],['NM-2','Likely D'],['NM-3','Safe D'],
  ['NY-1','Likely R'],['NY-2','Likely R'],['NY-3','Likely D'],['NY-4','Likely D'],['NY-5','Safe D'],['NY-6','Safe D'],['NY-7','Safe D'],['NY-8','Safe D'],['NY-9','Safe D'],['NY-10','Toss Up'],['NY-11','Safe R'],['NY-12','Safe D'],['NY-13','Safe D'],['NY-14','Safe D'],['NY-15','Safe D'],['NY-16','Safe D'],['NY-17','Toss Up'],['NY-18','Safe D'],['NY-19','Likely D'],['NY-20','Safe D'],['NY-21','Likely R'],['NY-22','Likely D'],['NY-23','Safe R'],['NY-24','Safe R'],['NY-25','Safe D'],['NY-26','Safe D'],
  ['NC-1','Likely R'],['NC-2','Safe D'],['NC-3','Likely R'],['NC-4','Safe D'],['NC-5','Likely R'],['NC-6','Safe R'],['NC-7','Likely R'],['NC-8','Likely R'],['NC-9','Likely R'],['NC-10','Likely R'],['NC-11','Lean R'],['NC-12','Safe D'],['NC-13','Likely R'],['NC-14','Likely R'],
  ['ND-AL','Safe R'],
  ['OH-1','Likely D'],['OH-2','Safe R'],['OH-3','Safe D'],['OH-4','Safe R'],['OH-5','Safe R'],['OH-6','Safe R'],['OH-7','Likely R'],['OH-8','Likely R'],['OH-9','Toss Up'],['OH-10','Likely R'],['OH-11','Safe D'],['OH-12','Safe R'],['OH-13','Likely D'],['OH-14','Likely R'],['OH-15','Likely R'],
  ['OK-1','Safe R'],['OK-2','Safe R'],['OK-3','Safe R'],['OK-4','Safe R'],['OK-5','Safe R'],
  ['OR-1','Safe D'],['OR-2','Safe R'],['OR-3','Safe D'],['OR-4','Safe D'],['OR-5','Likely D'],['OR-6','Likely D'],
  ['PA-1','Lean R'],['PA-2','Safe D'],['PA-3','Safe D'],['PA-4','Safe D'],['PA-5','Safe D'],['PA-6','Safe D'],['PA-7','Toss Up'],['PA-8','Tilt D'],['PA-9','Safe R'],['PA-10','Tilt D'],['PA-11','Safe R'],['PA-12','Safe D'],['PA-13','Safe R'],['PA-14','Safe R'],['PA-15','Safe R'],['PA-16','Safe R'],['PA-17','Likely D'],
  ['RI-1','Safe D'],['RI-2','Safe D'],
  ['SC-1','Likely R'],['SC-2','Likely R'],['SC-3','Safe R'],['SC-4','Safe R'],['SC-5','Safe R'],['SC-6','Safe D'],['SC-7','Safe R'],
  ['SD-AL','Safe R'],
  ['TN-1','Safe R'],['TN-2','Safe R'],['TN-3','Safe R'],['TN-4','Safe R'],['TN-5','Likely R'],['TN-6','Safe R'],['TN-7','Likely R'],['TN-8','Safe R'],['TN-9','Safe D'],
  ['TX-1','Safe R'],['TX-2','Likely R'],['TX-3','Safe R'],['TX-4','Safe R'],['TX-5','Likely R'],['TX-6','Likely R'],['TX-7','Likely R'],['TX-8','Safe D'],['TX-9','Likely R'],['TX-10','Likely R'],['TX-11','Likely R'],['TX-12','Likely R'],['TX-13','Likely R'],['TX-14','Likely R'],['TX-15','Likely R'],['TX-16','Likely D'],['TX-17','Likely R'],['TX-18','Safe D'],['TX-19','Safe R'],['TX-20','Safe D'],['TX-21','Likely R'],['TX-22','Likely R'],['TX-23','Likely R'],['TX-24','Likely R'],['TX-25','Likely R'],['TX-26','Safe R'],['TX-27','Likely R'],['TX-28','Tilt D'],['TX-29','Safe D'],['TX-30','Safe D'],['TX-31','Safe R'],['TX-32','Likely R'],['TX-33','Safe D'],['TX-34','Lean D'],['TX-35','Lean R'],['TX-36','Safe R'],['TX-37','Safe D'],['TX-38','Likely R'],
  ['UT-1','Safe D'],['UT-2','Safe R'],['UT-3','Safe R'],['UT-4','Safe R'],
  ['VT-AL','Safe D'],
  ['VA-1','Likely D'],['VA-2','Lean D'],['VA-3','Safe D'],['VA-4','Safe D'],['VA-5','Likely D'],['VA-6','Lean D'],['VA-7','Likely D'],['VA-8','Safe D'],['VA-9','Safe R'],['VA-10','Likely D'],['VA-11','Safe D'],
  ['WA-1','Safe D'],['WA-2','Safe D'],['WA-3','Lean D'],['WA-4','Safe R'],['WA-5','Safe R'],['WA-6','Safe D'],['WA-7','Safe D'],['WA-8','Safe D'],['WA-9','Safe D'],['WA-10','Safe D'],
  ['WV-1','Safe R'],['WV-2','Safe R'],
  ['WI-1','Likely R'],['WI-2','Safe D'],['WI-3','Toss Up'],['WI-4','Safe D'],['WI-5','Safe R'],['WI-6','Safe R'],['WI-7','Safe R'],['WI-8','Likely R'],
  ['WY-AL','Safe R'],
];

const ratingApprox = {
  'Safe D':   { d: 65, r: 35 }, 'Likely D': { d: 58, r: 42 },
  'Lean D':   { d: 54, r: 46 }, 'Tilt D':   { d: 52, r: 48 },
  'Toss Up':  { d: 50, r: 50 }, 'Tilt R':   { d: 48, r: 52 },
  'Lean R':   { d: 46, r: 54 }, 'Likely R': { d: 42, r: 58 },
  'Safe R':   { d: 35, r: 65 },
};

export default function HouseForecastMap() {
  const [hovered, setHovered] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const [hoveredBubble, setHoveredBubble] = useState(null);

  // Group by rating in order, stable within each group
  const groups = {};
  ratingOrder.forEach(r => groups[r] = []);
  rawSeats.forEach(([key, rating]) => {
    const r = rating.trim();
    if (groups[r]) groups[r].push(key);
  });
  const allSeats = ratingOrder.flatMap(r => groups[r].map(key => ({ key, rating: r })));
  const total = allSeats.length;

  // Count totals
  const totals = {};
  ratingOrder.forEach(r => totals[r] = 0);
  allSeats.forEach(s => totals[s.rating]++);
  const demSeats = (totals['Safe D']||0)+(totals['Likely D']||0)+(totals['Lean D']||0)+(totals['Tilt D']||0);
  const repSeats = (totals['Safe R']||0)+(totals['Likely R']||0)+(totals['Lean R']||0)+(totals['Tilt R']||0);
  const tossUp = totals['Toss Up']||0;

  // Parliament semicircle layout
  // Generate all dot positions, sort by x (left→right), assign seats in order
  const CX = 500, CY = 560;
  const dotR = 6.5;
  const spacing = dotR * 2.9;
  const startRadius = 110;
  const radiusStep = spacing + 1.5;

  // Build rows
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

  // Generate all positions, sort left→right by x
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

  // Assign seats to sorted positions
  const dots = allPositions.map((pos, i) => ({ ...pos, seat: allSeats[i] })).filter(d => d.seat);

  const maxRadius = rows[rows.length - 1]?.radius || 200;
  const svgH = CY - maxRadius + 20;

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8">
      {/* Seat count bubbles */}
      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        <div className="relative" onMouseEnter={() => setHoveredBubble('dem')} onMouseLeave={() => setHoveredBubble(null)}>
          <div className="bg-blue-900/60 rounded-xl px-6 py-3 text-center min-w-[100px] shadow-lg transition-transform duration-200 hover:scale-110 cursor-pointer">
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
        <div className="bg-purple-900/60 rounded-xl px-6 py-3 text-center min-w-[100px] shadow-lg transition-transform duration-200 hover:scale-110 cursor-pointer">
          <div className="text-3xl font-bold text-purple-300">{tossUp}</div>
          <div className="text-purple-200/70 text-sm mt-1">Toss Up</div>
        </div>
        <div className="relative" onMouseEnter={() => setHoveredBubble('rep')} onMouseLeave={() => setHoveredBubble(null)}>
          <div className="bg-red-900/60 rounded-xl px-6 py-3 text-center min-w-[100px] shadow-lg transition-transform duration-200 hover:scale-110 cursor-pointer">
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

      <div className="text-white/50 text-xs text-center mb-4">218 seats needed for majority</div>

      {/* Semicircle map */}
      <div className="relative w-full">
        <svg viewBox={`0 0 1000 ${CY + 20}`} className="w-full" style={{ minWidth: '320px' }}>
          {dots.map(({ x, y, seat }) => {
            const isHovered = hovered === seat.key;
            return (
              <circle
                key={seat.key}
                cx={x}
                cy={y}
                r={isHovered ? dotR * 1.9 : dotR}
                fill={ratingColors[seat.rating]}
                stroke="white"
                strokeWidth={isHovered ? 1.8 : 0.6}
                opacity={0.95}
                onMouseEnter={() => {
                  setHovered(seat.key);
                  setTooltip({ label: seat.key, rating: seat.rating, svgX: x, svgY: y });
                }}
                onMouseLeave={() => { setHovered(null); setTooltip(null); }}
                style={{ cursor: 'pointer', transition: 'r 0.1s' }}
              />
            );
          })}
          <line x1={CX} y1={svgH} x2={CX} y2={CY + 8} stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4,4" />
          <text x={CX - 80} y={CY + 18} fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="Inter,sans-serif">← Democrat</text>
          <text x={CX + 12} y={CY + 18} fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="Inter,sans-serif">Republican →</text>
        </svg>
        {/* Tooltip - constrained within this container */}
        {tooltip && (
          <div
            className="absolute z-50 pointer-events-none border border-white/40 rounded-xl shadow-xl"
            style={{
              left: `${Math.min(Math.max((tooltip.svgX / 1000) * 100, 12), 88)}%`,
              top: `${Math.max((tooltip.svgY / (CY + 20)) * 100 - 2, 0)}%`,
              transform: 'translate(-50%, -110%)',
              backgroundColor: 'rgba(0,0,0,0.92)',
              minWidth: 140,
              padding: '8px 12px'
            }}
          >
            <div className="text-white font-bold text-sm mb-1">{tooltip.label}</div>
            <div className="font-semibold text-xs" style={{ color: ratingColors[tooltip.rating] }}>{tooltip.rating}</div>
          </div>
        )}
      </div>

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