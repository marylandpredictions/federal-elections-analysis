import React, { useState } from 'react';

const stateCoordinates = {
  'Alabama': { x: 620, y: 420 },
  'Alaska': { x: 100, y: 520 },
  'Arizona': { x: 220, y: 380 },
  'Arkansas': { x: 540, y: 380 },
  'California': { x: 120, y: 320 },
  'Colorado': { x: 340, y: 280 },
  'Connecticut': { x: 840, y: 200 },
  'Delaware': { x: 810, y: 280 },
  'Florida': { x: 720, y: 500 },
  'Georgia': { x: 700, y: 420 },
  'Hawaii': { x: 280, y: 520 },
  'Idaho': { x: 240, y: 160 },
  'Illinois': { x: 600, y: 260 },
  'Indiana': { x: 640, y: 280 },
  'Iowa': { x: 540, y: 240 },
  'Kansas': { x: 460, y: 320 },
  'Kentucky': { x: 680, y: 320 },
  'Louisiana': { x: 560, y: 460 },
  'Maine': { x: 860, y: 120 },
  'Maryland': { x: 790, y: 290 },
  'Massachusetts': { x: 840, y: 180 },
  'Michigan': { x: 660, y: 200 },
  'Minnesota': { x: 520, y: 160 },
  'Mississippi': { x: 580, y: 440 },
  'Missouri': { x: 540, y: 320 },
  'Montana': { x: 300, y: 140 },
  'Nebraska': { x: 440, y: 260 },
  'Nevada': { x: 180, y: 280 },
  'New Hampshire': { x: 840, y: 160 },
  'New Jersey': { x: 800, y: 260 },
  'New Mexico': { x: 320, y: 380 },
  'New York': { x: 780, y: 200 },
  'North Carolina': { x: 740, y: 360 },
  'North Dakota': { x: 440, y: 140 },
  'Ohio': { x: 680, y: 280 },
  'Oklahoma': { x: 460, y: 380 },
  'Oregon': { x: 140, y: 160 },
  'Pennsylvania': { x: 760, y: 260 },
  'Rhode Island': { x: 850, y: 190 },
  'South Carolina': { x: 740, y: 400 },
  'South Dakota': { x: 420, y: 200 },
  'Tennessee': { x: 640, y: 360 },
  'Texas': { x: 420, y: 460 },
  'Utah': { x: 260, y: 280 },
  'Vermont': { x: 820, y: 150 },
  'Virginia': { x: 760, y: 320 },
  'Washington': { x: 160, y: 100 },
  'West Virginia': { x: 740, y: 300 },
  'Wisconsin': { x: 600, y: 180 },
  'Wyoming': { x: 320, y: 200 }
};

const ratingColors = {
  'Safe D': '#0015BC',
  'Likely D': '#3B5DC9',
  'Tilt D': '#7FAAFF',
  'Toss Up': '#FFFF00',
  'Tilt R': '#FF7F7F',
  'Likely R': '#D94343',
  'Safe R': '#CC0000'
};

export default function InteractiveMap({ ratings }) {
  const [hoveredState, setHoveredState] = useState(null);

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8">
      <div className="relative w-full" style={{ paddingBottom: '60%' }}>
        <svg 
          viewBox="0 0 960 600" 
          className="absolute inset-0 w-full h-full"
          style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))' }}
        >
          {Object.entries(stateCoordinates).map(([state, coords]) => {
            const rating = ratings[state] || 'Toss Up';
            const color = ratingColors[rating];
            const isHovered = hoveredState === state;
            
            return (
              <g key={state}>
                <circle
                  cx={coords.x}
                  cy={coords.y}
                  r={isHovered ? 22 : 18}
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
                {isHovered && (
                  <>
                    <rect
                      x={coords.x - 60}
                      y={coords.y - 55}
                      width={120}
                      height={40}
                      fill="rgba(0, 0, 0, 0.9)"
                      stroke="white"
                      strokeWidth={2}
                      rx={6}
                    />
                    <text
                      x={coords.x}
                      y={coords.y - 42}
                      textAnchor="middle"
                      fill="white"
                      fontSize="12"
                      fontWeight="bold"
                    >
                      {state}
                    </text>
                    <text
                      x={coords.x}
                      y={coords.y - 26}
                      textAnchor="middle"
                      fill={color}
                      fontSize="11"
                      fontWeight="600"
                    >
                      {rating}
                    </text>
                  </>
                )}
              </g>
            );
          })}
        </svg>
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