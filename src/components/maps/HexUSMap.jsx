import React, { useState } from 'react';

const R = 30;
const COL_STEP = 64;
const ROW_STEP = 50;
const ODD_OFFSET = 25;
const START_X = 44;
const START_Y = 44;
const SVG_W = 760;
const SVG_H = 490;

// [col, row] positions — flat-top hex grid, odd columns offset down
const HEX_GRID = {
  'WA': [0,0], 'OR': [0,1], 'CA': [0,2],
  'ID': [1,0], 'NV': [1,1], 'UT': [1,2], 'AZ': [1,3],
  'MT': [2,0], 'WY': [2,1], 'CO': [2,2], 'NM': [2,3],
  'ND': [3,0], 'SD': [3,1], 'NE': [3,2], 'KS': [3,3], 'OK': [3,4], 'TX': [3,5],
  'MN': [4,0], 'IA': [4,1], 'MO': [4,2], 'AR': [4,3], 'LA': [4,4],
  'WI': [5,0], 'IL': [5,1], 'IN': [5,2], 'KY': [5,3], 'TN': [5,4], 'MS': [5,5], 'AL': [5,6], 'FL': [5,7],
  'MI': [6,0], 'OH': [6,1], 'WV': [6,2], 'VA': [6,3], 'NC': [6,4], 'SC': [6,5], 'GA': [6,6],
  'NY': [7,0], 'PA': [7,1], 'MD': [7,2], 'DC': [7,3],
  'VT': [8,0], 'NJ': [8,1], 'DE': [8,2],
  'NH': [9,0], 'MA': [9,1], 'CT': [9,2], 'RI': [9,3],
  'ME': [10,0],
};

// AK and HI placed separately at bottom-left
const SEPARATE = {
  'AK': { x: 70, y: 505 },
  'HI': { x: 165, y: 505 },
};

export const NAME_TO_ABBR = {
  'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR',
  'California': 'CA', 'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE',
  'Florida': 'FL', 'Georgia': 'GA', 'Hawaii': 'HI', 'Idaho': 'ID',
  'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA', 'Kansas': 'KS',
  'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
  'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS',
  'Missouri': 'MO', 'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV',
  'New Hampshire': 'NH', 'New Jersey': 'NJ', 'New Mexico': 'NM', 'New York': 'NY',
  'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH', 'Oklahoma': 'OK',
  'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
  'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT',
  'Vermont': 'VT', 'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV',
  'Wisconsin': 'WI', 'Wyoming': 'WY', 'District of Columbia': 'DC',
};
export const ABBR_TO_NAME = Object.fromEntries(Object.entries(NAME_TO_ABBR).map(([k, v]) => [v, k]));

function hexPoints(cx, cy, r) {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (i * 60) * Math.PI / 180;
    return `${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`;
  }).join(' ');
}

function getCenter(col, row) {
  return {
    x: col * COL_STEP + START_X,
    y: row * ROW_STEP + (col % 2 === 1 ? ODD_OFFSET : 0) + START_Y,
  };
}

export default function HexUSMap({ colorsByAbbr, onClick, renderTooltipContent, secondaryLabel }) {
  const [hovered, setHovered] = useState(null);

  const states = [
    ...Object.entries(HEX_GRID).map(([abbr, [col, row]]) => ({ abbr, ...getCenter(col, row) })),
    ...Object.entries(SEPARATE).map(([abbr, pos]) => ({ abbr, ...pos })),
  ];

  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full">
        {states.map(({ abbr, x, y }) => {
          const color = colorsByAbbr[abbr] || '#4B5563';
          const isHov = hovered?.abbr === abbr;
          const textY = secondaryLabel ? y - 5 : y + 1;
          return (
            <g key={abbr}
              onMouseEnter={() => setHovered({ abbr, x, y })}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onClick?.(abbr)}
              style={{ cursor: onClick ? 'pointer' : 'default' }}
            >
              <polygon
                points={hexPoints(x, y, R - 1)}
                fill={color}
                stroke="rgba(255,255,255,0.65)"
                strokeWidth={isHov ? 2.5 : 1}
                style={{ transition: 'all 0.1s', filter: isHov ? 'brightness(1.2)' : 'none' }}
              />
              <text x={x} y={textY}
                textAnchor="middle" dominantBaseline="middle"
                fontSize={8} fontWeight="bold" fill="white"
                style={{ pointerEvents: 'none', userSelect: 'none' }}>
                {abbr}
              </text>
              {secondaryLabel && (
                <text x={x} y={y + 9}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize={7} fill="rgba(255,255,255,0.85)"
                  style={{ pointerEvents: 'none', userSelect: 'none' }}>
                  {secondaryLabel(abbr)}
                </text>
              )}
            </g>
          );
        })}

      </svg>

      {hovered && renderTooltipContent && (
        <div
          className="absolute z-50 pointer-events-none border border-white/40 rounded-xl shadow-xl"
          style={{
            left: `${Math.min(Math.max((hovered.x / SVG_W) * 100, 12), 86)}%`,
            top: `${Math.max(((hovered.y - R - 8) / SVG_H) * 100, 0)}%`,
            transform: 'translate(-50%, -100%)',
            backgroundColor: 'rgba(0,0,0,0.92)',
            minWidth: 150,
            padding: '8px 12px',
          }}
        >
          {renderTooltipContent(hovered.abbr)}
        </div>
      )}
    </div>
  );
}