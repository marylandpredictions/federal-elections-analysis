import React, { useMemo, useState } from 'react';
import HexUSMap, { NAME_TO_ABBR, ABBR_TO_NAME } from '../maps/HexUSMap';

const getRating = (margin) => {
  if (margin === null) return 'Not Contested';
  const abs = Math.abs(margin);
  if (margin === 0) return 'Toss Up';
  if (abs > 15.0) return margin > 0 ? 'Safe R' : 'Safe D';
  if (abs >= 5.0) return margin > 0 ? 'Likely R' : 'Likely D';
  if (abs >= 1.0) return margin > 0 ? 'Lean R' : 'Lean D';
  return margin > 0 ? 'Tilt R' : 'Tilt D';
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
  'Not Contested': '#808080',
};

export default function SwingMap({ baseResults, swing, title, baseDemSeats = 34, baseRepSeats = 31 }) {
  const [hoveredBubble, setHoveredBubble] = useState(null);

  let demSeats = baseDemSeats;
  let repSeats = baseRepSeats;
  let tossUpSeats = 0;

  Object.entries(baseResults).forEach(([state, baseMargin]) => {
    if (baseMargin !== null) {
      const newMargin = baseMargin + swing;
      const rating = getRating(newMargin);
      if (rating.includes('D')) demSeats++;
      else if (rating.includes('R')) repSeats++;
      else if (rating === 'Toss Up') tossUpSeats++;
    }
  });

  const colorsByAbbr = useMemo(() => {
    const map = {};
    Object.entries(baseResults).forEach(([fullName, baseMargin]) => {
      const abbr = NAME_TO_ABBR[fullName];
      if (!abbr) return;
      const newMargin = baseMargin !== null ? baseMargin + swing : null;
      map[abbr] = ratingColors[getRating(newMargin)];
    });
    return map;
  }, [baseResults, swing]);

  const renderTooltipContent = (abbr) => {
    const fullName = ABBR_TO_NAME[abbr];
    if (!fullName || !(fullName in baseResults)) return null;
    const baseMargin = baseResults[fullName];
    const newMargin = baseMargin !== null ? baseMargin + swing : null;
    const rating = getRating(newMargin);
    const color = ratingColors[rating];

    return (
      <>
        <div className="text-white font-bold text-sm mb-1">{fullName}</div>
        <div className="font-semibold text-xs mb-2" style={{ color }}>{rating}</div>
        {newMargin !== null && (() => {
          const dPct = Math.max(5, Math.min(95, 50 - newMargin / 2));
          const rPct = Math.max(5, Math.min(95, 50 + newMargin / 2));
          const bars = dPct >= rPct
            ? [{ label: 'D', pct: dPct, color: '#2563EB' }, { label: 'R', pct: rPct, color: '#DC2626' }]
            : [{ label: 'R', pct: rPct, color: '#DC2626' }, { label: 'D', pct: dPct, color: '#2563EB' }];
          return bars.map(bar => (
            <div key={bar.label} className="flex items-center gap-2 mb-1">
              <span style={{ color: bar.color, fontSize: 10, fontWeight: 700, minWidth: 10 }}>{bar.label}</span>
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.15)', borderRadius: 3, height: 6 }}>
                <div style={{ background: bar.color, height: '100%', width: `${bar.pct}%`, borderRadius: 3 }} />
              </div>
              <span style={{ color: bar.color, fontSize: 10, fontWeight: 700, minWidth: 32, textAlign: 'right' }}>{bar.pct.toFixed(1)}%</span>
            </div>
          ));
        })()}
      </>
    );
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8">
      {title && (
        <h3 className="text-white font-inter font-bold text-xl sm:text-2xl mb-6 text-shadow-teal text-center">{title}</h3>
      )}

      {/* Seat Counter */}
      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        <div className="bg-blue-600/70 rounded-xl px-6 py-3 shadow-lg transition-transform duration-200 hover:scale-110 cursor-pointer"
          onMouseEnter={() => setHoveredBubble('dem')} onMouseLeave={() => setHoveredBubble(null)}>
          <div className="text-white font-bold text-2xl text-center">{demSeats}</div>
          <div className="text-white/90 text-sm text-center">Democrat</div>
        </div>
        <div className="bg-purple-600/70 rounded-xl px-6 py-3 shadow-lg transition-transform duration-200 hover:scale-110 cursor-pointer">
          <div className="text-white font-bold text-2xl text-center">{tossUpSeats}</div>
          <div className="text-white/90 text-sm text-center">Toss Up</div>
        </div>
        <div className="bg-red-600/70 rounded-xl px-6 py-3 shadow-lg transition-transform duration-200 hover:scale-110 cursor-pointer">
          <div className="text-white font-bold text-2xl text-center">{repSeats}</div>
          <div className="text-white/90 text-sm text-center">Republican</div>
        </div>
      </div>

      <HexUSMap
        colorsByAbbr={colorsByAbbr}
        renderTooltipContent={renderTooltipContent}
      />

      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        {Object.entries(ratingColors).map(([rating, color]) => (
          <div key={rating} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded border border-white/40" style={{ backgroundColor: color }} />
            <span className="text-white text-xs font-medium">{rating}</span>
          </div>
        ))}
      </div>
    </div>
  );
}