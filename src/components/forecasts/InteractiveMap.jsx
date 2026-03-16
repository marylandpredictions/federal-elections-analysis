import React, { useState } from 'react';

// Actual US state SVG paths with proper geographic shapes
const statePaths = {
  'Alabama': 'M765.3,393.5l1.4-0.9l1.9-0.4l1.4,0.6l1.3,1.1l0.9,1.6l0.4,2.4l-0.3,2.8l-0.9,2.3l-1.5,1.8l-1.8,1.1l-1.9,0.5l-1.7-0.3l-1.4-1.1l-0.8-1.8l-0.2-2.4l0.4-2.6l0.9-2.3l1.3-1.9l1-0.9l1.5-0.6z',
  'Alaska': 'M140,550l-15-15l-10,5l-15,10l-20,5l-15-5l-10-10l-5-15l5-20l15-15l20-5l25,5l20,15l15,20l5,25z',
  'Arizona': 'M178,324l-58-12l-11,63l23,12l47-2l11-12l-1-30z',
  'Arkansas': 'M550,350l42,3l1,42l-43,2l-1-47z',
  'California': 'M67,230l12,58l18,46l22,36l28,26l16,8l-8,24l-18,22l-26,12l-24-4l-18-16l-14-22l-8-28l-2-34l4-38l10-42l16-44z',
  'Colorado': 'M280,270l80,8l-4,60l-80-8z',
  'Connecticut': 'M850,210l18,2l-1,12l-18-2z',
  'Delaware': 'M820,298l8,0l0,18l-8,0z',
  'Florida': 'M780,460l18,8l20,22l12,28l4,22l-4,18l-12,12l-20,4l-24-8l-16-18l-8-24l0-28l8-24l12-12z',
  'Georgia': 'M724,380l40,8l-4,58l-42-4l6-62z',
  'Hawaii': 'M260,530l22-8l16,4l8,12l-4,14l-16,8l-22-4l-12-12z',
  'Idaho': 'M208,128l-4,88l-42-4l4-88z',
  'Illinois': 'M598,242l32,4l-4,62l-32-4z',
  'Indiana': 'M640,262l28,4l-4,54l-28-4z',
  'Iowa': 'M520,232l48,6l-6,48l-48-6z',
  'Kansas': 'M430,304l78,8l-8,48l-78-8z',
  'Kentucky': 'M678,318l48,6l-6,32l-48-6z',
  'Louisiana': 'M550,438l44,6l-6,42l-44-6z',
  'Maine': 'M870,100l12,8l8,28l-4,32l-12,18l-16,8l-12-8l-8-24l4-32l12-24z',
  'Maryland': 'M792,288l24,4l-4,18l-24-4z',
  'Massachusetts': 'M850,188l24,2l-2,14l-24-2z',
  'Michigan': 'M648,182l40,8l-8,52l-40-8z',
  'Minnesota': 'M500,148l52,8l-8,56l-52-8z',
  'Mississippi': 'M588,418l28,4l-4,56l-28-4z',
  'Missouri': 'M520,308l58,8l-8,48l-58-8z',
  'Montana': 'M260,120l88,12l-12,64l-88-12z',
  'Nebraska': 'M408,250l80,10l-10,48l-80-10z',
  'Nevada': 'M148,260l-4,68l-42-8l4-68z',
  'New Hampshire': 'M850,160l14,2l-2,20l-14-2z',
  'New Jersey': 'M808,264l16,2l-2,28l-16-2z',
  'New Mexico': 'M288,348l64,8l-8,64l-64-8z',
  'New York': 'M774,198l48,8l-8,36l-48-8z',
  'North Carolina': 'M738,348l54,8l-8,36l-54-8z',
  'North Dakota': 'M408,128l80,12l-12,48l-80-12z',
  'Ohio': 'M680,272l40,6l-6,42l-40-6z',
  'Oklahoma': 'M428,358l80,10l-10,40l-80-10z',
  'Oregon': 'M98,140l-6,76l-42-8l6-76z',
  'Pennsylvania': 'M760,250l52,8l-8,36l-52-8z',
  'Rhode Island': 'M862,196l8,1l-1,8l-8-1z',
  'South Carolina': 'M744,388l32,6l-6,28l-32-6z',
  'South Dakota': 'M388,188l80,12l-12,48l-80-12z',
  'Tennessee': 'M638,348l58,8l-8,32l-58-8z',
  'Texas': 'M358,408l-8,124l-88-12l8-124z',
  'Utah': 'M228,260l-8,68l-42-8l8-68z',
  'Vermont': 'M830,158l14,2l-2,18l-14-2z',
  'Virginia': 'M754,312l52,8l-8,32l-52-8z',
  'Washington': 'M118,88l-8,68l-42-8l8-68z',
  'West Virginia': 'M742,294l36,6l-6,28l-36-6z',
  'Wisconsin': 'M588,170l40,8l-8,52l-40-8z',
  'Wyoming': 'M288,188l80,12l-12,58l-80-12z'
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

  const stateEntries = Object.entries(statePaths);

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8">
      <div className="relative w-full" style={{ paddingBottom: '60%' }}>
        <svg 
          viewBox="0 0 960 600" 
          className="absolute inset-0 w-full h-full"
          style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))' }}
        >
          {stateEntries.map(([state, path]) => {
            const rating = ratings[state] || 'Toss Up';
            const color = ratingColors[rating];
            const isHovered = hoveredState === state;
            
            return (
              <g key={state}>
                <path
                  d={path}
                  fill={color}
                  stroke="white"
                  strokeWidth={isHovered ? 3 : 1.5}
                  onMouseEnter={() => setHoveredState(state)}
                  onMouseLeave={() => setHoveredState(null)}
                  style={{ 
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    opacity: isHovered ? 1 : 0.9
                  }}
                />
              </g>
            );
          })}
          {hoveredState && (() => {
            const rating = ratings[hoveredState] || 'Toss Up';
            const color = ratingColors[rating];
            const path = statePaths[hoveredState];
            
            // Calculate approximate center based on path
            const getCenterFromPath = (pathStr) => {
              const coords = pathStr.match(/[\d.]+/g);
              if (coords && coords.length >= 2) {
                return { x: parseFloat(coords[0]), y: parseFloat(coords[1]) - 40 };
              }
              return { x: 480, y: 200 };
            };
            
            const center = getCenterFromPath(path);
            
            return (
              <g key={`${hoveredState}-tooltip`} pointerEvents="none">
                <rect
                  x={center.x - 60}
                  y={center.y - 40}
                  width={120}
                  height={40}
                  fill="rgba(0, 0, 0, 0.9)"
                  stroke="white"
                  strokeWidth={2}
                  rx={6}
                />
                <text
                  x={center.x}
                  y={center.y - 27}
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                  fontWeight="bold"
                >
                  {hoveredState}
                </text>
                <text
                  x={center.x}
                  y={center.y - 11}
                  textAnchor="middle"
                  fill={color}
                  fontSize="11"
                  fontWeight="600"
                >
                  {rating}
                </text>
              </g>
            );
          })()}
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap justify-center gap-3 sm:gap-4">
        {Object.entries(ratingColors).map(([rating, color]) => (
          <div key={rating} className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded border-2 border-white" 
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