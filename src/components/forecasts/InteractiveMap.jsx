import React, { useState } from 'react';

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

export default function InteractiveMap({ ratings }) {
  const [hoveredState, setHoveredState] = useState(null);

  const stateEntries = Object.entries(statePositions);

  // Compute seat counts
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
        <div className="bg-blue-900/60 rounded-xl px-6 py-3 text-center min-w-[100px] shadow-lg transition-transform duration-200 hover:scale-110 cursor-pointer">
          <div className="text-3xl font-bold text-blue-300">{counts.democrat}</div>
          <div className="text-blue-200/70 text-sm mt-1">Democrat</div>
        </div>
        <div className="bg-purple-900/60 rounded-xl px-6 py-3 text-center min-w-[100px] shadow-lg transition-transform duration-200 hover:scale-110 cursor-pointer">
          <div className="text-3xl font-bold text-purple-300">{counts.tossUp}</div>
          <div className="text-purple-200/70 text-sm mt-1">Toss Up</div>
        </div>
        <div className="bg-red-900/60 rounded-xl px-6 py-3 text-center min-w-[100px] shadow-lg transition-transform duration-200 hover:scale-110 cursor-pointer">
          <div className="text-3xl font-bold text-red-300">{counts.republican}</div>
          <div className="text-red-200/70 text-sm mt-1">Republican</div>
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
          
          return (
            <div 
              className="absolute pointer-events-none"
              style={{
                left: `${(x / 960) * 100}%`,
                top: `${(y / 600) * 100}%`,
                transform: 'translate(-50%, -100%)',
                zIndex: 9999
              }}
            >
              <div className="bg-black/90 border-2 border-white rounded-lg px-4 py-2 shadow-lg mb-2">
                <div className="text-white font-inter font-bold text-xs text-center">
                  {hoveredState}
                </div>
                <div className="text-xs font-inter font-semibold text-center mt-1" style={{ color }}>
                  {rating}
                </div>
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