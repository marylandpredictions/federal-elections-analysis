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

export default function SwingMap({ baseResults, swing, title, baseDemSeats = 34, baseRepSeats = 31, incumbents = {} }) {
  const [hoveredBubble, setHoveredBubble] = useState(null);

  const { demSeats, repSeats, tossUpSeats, ratingBreakdown } = useMemo(() => {
    let d = baseDemSeats, r = baseRepSeats, t = 0;
    const bd = { 'Safe D': 0, 'Likely D': 0, 'Lean D': 0, 'Tilt D': 0, 'Toss Up': 0, 'Tilt R': 0, 'Lean R': 0, 'Likely R': 0, 'Safe R': 0 };
    Object.entries(baseResults).forEach(([, margin]) => {
      if (margin !== null) {
        const rating = getRating(margin + swing);
        if (rating.includes('D')) d++;
        else if (rating.includes('R')) r++;
        else if (rating === 'Toss Up') t++;
        if (bd[rating] !== undefined) bd[rating]++;
      }
    });
    return { demSeats: d, repSeats: r, tossUpSeats: t, ratingBreakdown: bd };
  }, [baseResults, swing, baseDemSeats, baseRepSeats]);

  const stripeAbbrs = useMemo(() => {
    const s = new Set();
    Object.entries(baseResults).forEach(([fullName, baseMargin]) => {
      const abbr = NAME_TO_ABBR[fullName];
      if (!abbr || baseMargin === null) return;
      const currentParty = baseMargin > 0 ? 'R' : 'D';
      const rating = getRating(baseMargin + swing);
      if (rating === 'Toss Up' ||
        (currentParty === 'R' && rating.includes('D')) ||
        (currentParty === 'D' && rating.includes('R'))) {
        s.add(abbr);
      }
    });
    return s;
  }, [baseResults, swing]);

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
    const incumbent = incumbents[fullName];

    return (
      <>
        <div className="text-white font-bold text-sm mb-1">{fullName}</div>
        {incumbent && <div className="text-white/70 text-xs mb-1">{incumbent}</div>}
        <div className="font-semibold text-xs mb-2" style={{ color }}>{rating}</div>
        {newMargin !== null && (() => {
          const dPct = Math.max(5, Math.min(95, 50 - newMargin / 2));
          const rPct = Math.max(5, Math.min(95, 50 + newMargin / 2));
          const bars = dPct >= rPct
            ? [{ label: 'D', pct: dPct, color: '#2563EB' }, { label: 'R', pct: rPct, color: '#DC2626' }]
            : [{ label: 'R', pct: rPct, color: '#DC2626' }, { label: 'D', pct: dPct, color: '#2563EB' }];
          const leading = bars[0];
          const margin = Math.abs(dPct - rPct);
          return (
            <>
              {bars.map(bar => (
                <div key={bar.label} className="flex items-center gap-2 mb-1">
                  <span style={{ color: bar.color, fontSize: 10, fontWeight: 700, minWidth: 10 }}>{bar.label}</span>
                  <div style={{ flex: 1, background: 'rgba(255,255,255,0.15)', borderRadius: 3, height: 6 }}>
                    <div style={{ background: bar.color, height: '100%', width: `${bar.pct}%`, borderRadius: 3 }} />
                  </div>
                  <span style={{ color: bar.color, fontSize: 10, fontWeight: 700, minWidth: 32, textAlign: 'right' }}>{bar.pct.toFixed(1)}%</span>
                </div>
              ))}
              <div style={{ color: leading.color, fontSize: 10, fontWeight: 700, marginTop: 4 }}>
                {leading.label} +{margin.toFixed(1)}%
              </div>
            </>
          );
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
        <div className="relative" onMouseEnter={() => setHoveredBubble('dem')} onMouseLeave={() => setHoveredBubble(null)}>
          <div className="bg-blue-900/60 rounded-xl px-6 py-3 text-center min-w-[100px] shadow-lg transition-transform duration-200 hover:scale-110 cursor-pointer">
            <div className="text-3xl font-bold text-blue-300">{demSeats}</div>
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
          <div className="text-3xl font-bold text-purple-300">{tossUpSeats}</div>
          <div className="text-purple-200/70 text-sm mt-1">Toss Up</div>
        </div>
        <div className="relative" onMouseEnter={() => setHoveredBubble('rep')} onMouseLeave={() => setHoveredBubble(null)}>
          <div className="bg-red-900/60 rounded-xl px-6 py-3 text-center min-w-[100px] shadow-lg transition-transform duration-200 hover:scale-110 cursor-pointer">
            <div className="text-3xl font-bold text-red-300">{repSeats}</div>
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

      <HexUSMap
        colorsByAbbr={colorsByAbbr}
        renderTooltipContent={renderTooltipContent}
        stripeAbbrs={stripeAbbrs}
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