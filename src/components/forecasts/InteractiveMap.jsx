import React, { useState, useCallback } from 'react';

const statePositions = {
  'Alabama': { x: 700, y: 420 },
  'Alaska': { x: 120, y: 550 },
  'Arizona': { x: 180, y: 380 },
  'Arkansas': { x: 580, y: 400 },
  'California': { x: 100, y: 320 },
  'Colorado': { x: 300, y: 320 },
  'Connecticut': { x: 850, y: 240 },
  'Delaware': { x: 820, y: 290 },
  'Florida': { x: 760, y: 500 },
  'Georgia': { x: 720, y: 430 },
  'Hawaii': { x: 280, y: 550 },
  'Idaho': { x: 200, y: 180 },
  'Illinois': { x: 620, y: 300 },
  'Indiana': { x: 660, y: 300 },
  'Iowa': { x: 560, y: 260 },
  'Kansas': { x: 480, y: 350 },
  'Kentucky': { x: 690, y: 340 },
  'Louisiana': { x: 600, y: 470 },
  'Maine': { x: 870, y: 150 },
  'Maryland': { x: 800, y: 300 },
  'Massachusetts': { x: 860, y: 220 },
  'Michigan': { x: 670, y: 230 },
  'Minnesota': { x: 540, y: 180 },
  'Mississippi': { x: 620, y: 450 },
  'Missouri': { x: 570, y: 340 },
  'Montana': { x: 280, y: 160 },
  'Nebraska': { x: 440, y: 280 },
  'Nevada': { x: 140, y: 300 },
  'New Hampshire': { x: 860, y: 200 },
  'New Jersey': { x: 820, y: 270 },
  'New Mexico': { x: 300, y: 400 },
  'New York': { x: 800, y: 220 },
  'North Carolina': { x: 760, y: 370 },
  'North Dakota': { x: 420, y: 160 },
  'Ohio': { x: 700, y: 300 },
  'Oklahoma': { x: 480, y: 390 },
  'Oregon': { x: 100, y: 180 },
  'Pennsylvania': { x: 780, y: 270 },
  'Rhode Island': { x: 870, y: 230 },
  'South Carolina': { x: 750, y: 400 },
  'South Dakota': { x: 420, y: 210 },
  'Tennessee': { x: 660, y: 370 },
  'Texas': { x: 450, y: 480 },
  'Utah': { x: 220, y: 300 },
  'Vermont': { x: 840, y: 190 },
  'Virginia': { x: 770, y: 330 },
  'Washington': { x: 120, y: 120 },
  'West Virginia': { x: 750, y: 310 },
  'Wisconsin': { x: 600, y: 210 },
  'Wyoming': { x: 300, y: 230 }
};

const ratingColors = {
  'Safe D': '#1046ba',
  'Likely D': '#2663eb',
  'Lean D': '#5689f7',
  'Tilt D': '#82a6f2',
  'Toss Up': '#9334EB',
  'Tilt R': '#FF7F7F',
  'Lean R': '#FF6B6B',
  'Likely R': '#CC0000',
  'Safe R': '#8B0000',
  'Not Contested': '#D3D3D3'
};

const ratingApprox = {
  'Safe D':   { d: 65, r: 35 }, 'Likely D': { d: 58, r: 42 },
  'Lean D':   { d: 54, r: 46 }, 'Tilt D':   { d: 52, r: 48 },
  'Toss Up':  { d: 50, r: 50 }, 'Tilt R':   { d: 48, r: 52 },
  'Lean R':   { d: 46, r: 54 }, 'Likely R': { d: 42, r: 58 },
  'Safe R':   { d: 35, r: 65 },
};

export default function InteractiveMap({ ratings }) {
  const [hoveredState, setHoveredState] = useState(null);
  const [hoveredBubble, setHoveredBubble] = useState(null);

  const stateEntries = Object.entries(statePositions);

  // Compute seat counts
  const ratingBreakdown = {};
  const allRatings = ['Safe D','Likely D','Lean D','Tilt D','Toss Up','Tilt R','Lean R','Likely R','Safe R'];
  allRatings.forEach(r => ratingBreakdown[r] = 0);
  Object.values(ratings).forEach(r => { if (ratingBreakdown[r] !== undefined) ratingBreakdown[r]++; });

  const counts = Object.values(ratings).reduce((acc, r) => {
    if (r === 'Safe D' || r === 'Likely D' || r === 'Lean D' || r === 'Tilt D') acc.democrat++;
    else if (r === 'Safe R' || r === 'Likely R' || r === 'Lean R' || r === 'Tilt R') acc.republican++;
    else if (r === 'Toss Up') acc.tossUp++;
    return acc;
  }, { democrat: 0, republican: 0, tossUp: 0 });

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8">
      {/* Seat count bubbles */}
      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        <div className="relative" onMouseEnter={() => setHoveredBubble('dem')} onMouseLeave={() => setHoveredBubble(null)}>
          <div className="bg-blue-900/60 rounded-xl px-6 py-3 text-center min-w-[100px] shadow-lg transition-transform duration-200 hover:scale-110 cursor-pointer">
            <div className="text-3xl font-bold text-blue-300">{counts.democrat}</div>
            <div className="text-blue-200/70 text-sm mt-1">Democrat</div>
          </div>
          {hoveredBubble === 'dem' && (
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 bg-black/90 border border-white/20 rounded-xl p-2 flex gap-2 shadow-xl">
              {[['Safe D','#1046ba','white'],['Likely D','#2663eb','white'],['Lean D','#5689f7','white'],['Tilt D','#82a6f2','#1046ba']].map(([r,bg,tc]) => ratingBreakdown[r] > 0 && (
                <div key={r} className="rounded-lg px-2 py-1 text-center" style={{backgroundColor:bg,color:tc,minWidth:56}}>
                  <div className="text-lg font-bold">{ratingBreakdown[r]}</div>
                  <div className="text-xs whitespace-nowrap">{r}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bg-purple-900/60 rounded-xl px-6 py-3 text-center min-w-[100px] shadow-lg transition-transform duration-200 hover:scale-110 cursor-pointer">
          <div className="text-3xl font-bold text-purple-300">{counts.tossUp}</div>
          <div className="text-purple-200/70 text-sm mt-1">Toss Up</div>
        </div>
        <div className="relative" onMouseEnter={() => setHoveredBubble('rep')} onMouseLeave={() => setHoveredBubble(null)}>
          <div className="bg-red-900/60 rounded-xl px-6 py-3 text-center min-w-[100px] shadow-lg transition-transform duration-200 hover:scale-110 cursor-pointer">
            <div className="text-3xl font-bold text-red-300">{counts.republican}</div>
            <div className="text-red-200/70 text-sm mt-1">Republican</div>
          </div>
          {hoveredBubble === 'rep' && (
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 bg-black/90 border border-white/20 rounded-xl p-2 flex gap-2 shadow-xl">
              {[['Safe R','#8B0000','white'],['Likely R','#CC0000','white'],['Lean R','#FF6B6B','white'],['Tilt R','#FF7F7F','#8B0000']].map(([r,bg,tc]) => ratingBreakdown[r] > 0 && (
                <div key={r} className="rounded-lg px-2 py-1 text-center" style={{backgroundColor:bg,color:tc,minWidth:56}}>
                  <div className="text-lg font-bold">{ratingBreakdown[r]}</div>
                  <div className="text-xs whitespace-nowrap">{r}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="relative w-full" style={{ paddingBottom: '60%' }}>
        <svg 
          viewBox="0 0 960 600" 
          className="absolute inset-0 w-full h-full"
          style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))' }}
        >
          {stateEntries.map(([state, { x, y }]) => {
            const rating = ratings[state] || 'Toss Up';
            const color = ratingColors[rating];
            const isHovered = hoveredState === state;
            
            return (
              <circle
                key={state}
                cx={x}
                cy={y}
                r={isHovered ? 20 : 16}
                fill={color}
                stroke="white"
                strokeWidth={isHovered ? 3 : 2}
                onMouseEnter={() => setHoveredState(state)}
                onMouseLeave={() => setHoveredState(null)}
                style={{ 
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              />
            );
          })}
        </svg>
        
        {/* Tooltip - rendered outside SVG to stay on top */}
        {hoveredState && (() => {
          const { x, y } = statePositions[hoveredState];
          const rating = ratings[hoveredState] || 'Toss Up';
          const color = ratingColors[rating];
          const approx = ratingApprox[rating] || { d: 50, r: 50 };
          const isDLeading = approx.d >= approx.r;
          const bars = isDLeading
            ? [{ label: 'D', pct: approx.d, color: '#2563EB' }, { label: 'R', pct: approx.r, color: '#DC2626' }]
            : [{ label: 'R', pct: approx.r, color: '#DC2626' }, { label: 'D', pct: approx.d, color: '#2563EB' }];
          return (
            <div 
              className="absolute pointer-events-none"
              style={{ left: `${(x / 960) * 100}%`, top: `${(y / 600) * 100}%`, transform: 'translate(-50%, -115%)', zIndex: 9999, minWidth: 210 }}
            >
              <div className="border border-white/40 rounded-xl shadow-xl mb-2" style={{ backgroundColor: 'rgba(0,0,0,0.92)', padding: '10px 14px' }}>
                <div className="text-white font-bold text-base mb-1">{hoveredState}</div>
                <div className="font-semibold text-sm mb-2" style={{ color }}>{rating}</div>
                {bars.map(bar => (
                  <div key={bar.label} className="flex items-center gap-2 mb-1">
                    <span style={{ color: bar.color, fontSize: 11, fontWeight: 700, minWidth: 12 }}>{bar.label}</span>
                    <div style={{ flex: 1, background: 'rgba(255,255,255,0.15)', borderRadius: 3, height: 7 }}>
                      <div style={{ background: bar.color, height: '100%', width: `${bar.pct}%`, borderRadius: 3 }} />
                    </div>
                    <span style={{ color: bar.color, fontSize: 11, fontWeight: 700, minWidth: 32, textAlign: 'right' }}>{bar.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap justify-center gap-3 sm:gap-4">
        {Object.entries(ratingColors).map(([rating, color]) => (
          <div key={rating} className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded-full border-2 border-white" 
              style={{ backgroundColor: color }}
            />
            <span className="text-white text-xs sm:text-sm font-medium">
              {rating}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}