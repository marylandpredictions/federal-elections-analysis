import React, { useState } from 'react';

const statePaths = {
  'Alabama': 'M775,350 L785,340 L795,345 L800,355 L805,370 L800,385 L790,395 L780,400 L770,395 L765,380 L770,365 Z',
  'Alaska': 'M50,480 L90,465 L120,470 L140,485 L135,510 L115,525 L85,530 L60,520 L45,505 Z',
  'Arizona': 'M180,340 L245,345 L250,410 L185,405 Z',
  'Arkansas': 'M535,360 L585,365 L585,410 L535,410 Z',
  'California': 'M60,240 L95,235 L120,245 L135,260 L145,285 L150,315 L145,345 L135,370 L120,385 L100,395 L75,390 L55,375 L45,355 L50,330 L55,305 L60,280 Z',
  'Colorado': 'M300,250 L380,255 L375,320 L295,315 Z',
  'Connecticut': 'M840,195 L855,195 L857,210 L842,210 Z',
  'Delaware': 'M815,275 L820,275 L822,290 L817,290 Z',
  'Florida': 'M755,465 L780,460 L800,470 L815,490 L820,515 L815,535 L800,545 L780,540 L765,530 L755,510 L750,490 Z',
  'Georgia': 'M710,385 L755,390 L750,445 L705,440 Z',
  'Hawaii': 'M240,500 L260,495 L275,500 L280,510 L275,520 L260,525 L245,520 Z',
  'Idaho': 'M215,120 L265,125 L260,190 L210,185 Z',
  'Illinois': 'M595,230 L630,235 L625,305 L590,300 Z',
  'Indiana': 'M635,250 L670,255 L665,310 L630,305 Z',
  'Iowa': 'M520,215 L570,220 L565,270 L515,265 Z',
  'Kansas': 'M430,295 L505,300 L500,345 L425,340 Z',
  'Kentucky': 'M665,300 L720,305 L715,340 L660,335 Z',
  'Louisiana': 'M540,430 L590,435 L585,475 L535,470 Z',
  'Maine': 'M855,80 L875,75 L885,85 L890,105 L885,130 L875,145 L860,150 L850,140 L847,120 L850,100 Z',
  'Maryland': 'M785,275 L810,280 L808,300 L783,295 Z',
  'Massachusetts': 'M835,170 L860,172 L862,185 L837,183 Z',
  'Michigan': 'M640,160 L685,165 L680,225 L635,220 Z',
  'Minnesota': 'M495,130 L550,135 L545,195 L490,190 Z',
  'Mississippi': 'M575,410 L610,415 L605,470 L570,465 Z',
  'Missouri': 'M515,290 L575,295 L570,355 L510,350 Z',
  'Montana': 'M260,105 L345,110 L340,175 L255,170 Z',
  'Nebraska': 'M410,235 L485,240 L480,285 L405,280 Z',
  'Nevada': 'M150,245 L205,250 L200,320 L145,315 Z',
  'New Hampshire': 'M835,145 L850,143 L852,168 L837,170 Z',
  'New Jersey': 'M800,245 L815,247 L813,275 L798,273 Z',
  'New Mexico': 'M285,340 L350,345 L345,410 L280,405 Z',
  'New York': 'M765,175 L820,180 L815,225 L760,220 Z',
  'North Carolina': 'M725,335 L785,340 L780,375 L720,370 Z',
  'North Dakota': 'M410,110 L485,115 L480,170 L405,165 Z',
  'Ohio': 'M670,255 L710,260 L705,305 L665,300 Z',
  'Oklahoma': 'M430,350 L505,355 L500,395 L425,390 Z',
  'Oregon': 'M100,125 L175,130 L170,195 L95,190 Z',
  'Pennsylvania': 'M750,235 L805,240 L800,280 L745,275 Z',
  'Rhode Island': 'M850,185 L858,185 L860,195 L852,195 Z',
  'South Carolina': 'M730,375 L765,380 L760,410 L725,405 Z',
  'South Dakota': 'M390,175 L465,180 L460,225 L385,220 Z',
  'Tennessee': 'M625,335 L690,340 L685,370 L620,365 Z',
  'Texas': 'M360,400 L490,405 L485,520 L355,515 Z',
  'Utah': 'M230,245 L285,250 L280,315 L225,310 Z',
  'Vermont': 'M820,140 L833,138 L835,160 L822,162 Z',
  'Virginia': 'M745,300 L800,305 L795,340 L740,335 Z',
  'Washington': 'M125,75 L195,80 L190,135 L120,130 Z',
  'West Virginia': 'M730,280 L770,285 L765,315 L725,310 Z',
  'Wisconsin': 'M580,155 L625,160 L620,215 L575,210 Z',
  'Wyoming': 'M290,175 L365,180 L360,235 L285,230 Z'
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
            const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            pathElement.setAttribute('d', path);
            const bbox = pathElement.getBBox ? pathElement.getBBox() : { x: 400, y: 200, width: 100, height: 50 };
            const centerX = bbox.x + bbox.width / 2;
            const centerY = bbox.y - 20;
            
            return (
              <g key={`${hoveredState}-tooltip`} pointerEvents="none">
                <rect
                  x={centerX - 60}
                  y={centerY - 40}
                  width={120}
                  height={40}
                  fill="rgba(0, 0, 0, 0.9)"
                  stroke="white"
                  strokeWidth={2}
                  rx={6}
                />
                <text
                  x={centerX}
                  y={centerY - 27}
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                  fontWeight="bold"
                >
                  {hoveredState}
                </text>
                <text
                  x={centerX}
                  y={centerY - 11}
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