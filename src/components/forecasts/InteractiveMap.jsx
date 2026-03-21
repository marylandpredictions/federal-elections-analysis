import React, { useMemo, useState } from 'react';
import HexUSMap, { NAME_TO_ABBR, ABBR_TO_NAME } from '../maps/HexUSMap';

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
  'Not Contested': '#D3D3D3',
};

const ratingApprox = {
  'Safe D':   { d: 65, r: 35 }, 'Likely D': { d: 58, r: 42 },
  'Lean D':   { d: 54, r: 46 }, 'Tilt D':   { d: 52, r: 48 },
  'Toss Up':  { d: 50, r: 50 }, 'Tilt R':   { d: 48, r: 52 },
  'Lean R':   { d: 46, r: 54 }, 'Likely R': { d: 42, r: 58 },
  'Safe R':   { d: 35, r: 65 },
};

export default function InteractiveMap({ ratings, percentages, majorityNote, incumbents = {} }) {
  const [hoveredBubble, setHoveredBubble] = useState(null);

  // Count seats
  const counts = Object.values(ratings).reduce((acc, r) => {
    if (['Safe D','Likely D','Lean D','Tilt D'].includes(r)) acc.democrat++;
    else if (['Safe R','Likely R','Lean R','Tilt R'].includes(r)) acc.republican++;
    else if (r === 'Toss Up') acc.tossUp++;
    return acc;
  }, { democrat: 0, republican: 0, tossUp: 0 });

  const ratingBreakdown = {};
  ['Safe D','Likely D','Lean D','Tilt D','Toss Up','Tilt R','Lean R','Likely R','Safe R'].forEach(r => ratingBreakdown[r] = 0);
  Object.values(ratings).forEach(r => { if (ratingBreakdown[r] !== undefined) ratingBreakdown[r]++; });

  const colorsByAbbr = useMemo(() => {
    const map = {};
    Object.entries(ratings).forEach(([fullName, rating]) => {
      const abbr = NAME_TO_ABBR[fullName];
      if (abbr) map[abbr] = ratingColors[rating] || '#4B5563';
    });
    return map;
  }, [ratings]);

  const renderTooltipContent = (abbr) => {
    const fullName = ABBR_TO_NAME[abbr];
    if (!fullName) return null;
    const rating = ratings[fullName] || 'Toss Up';
    const color = ratingColors[rating];
    const isNC = rating === 'Not Contested';
    const pctData = percentages && percentages[fullName];
    const fallback = ratingApprox[rating];
    const src = pctData || (!isNC ? fallback : null);

    const bars = [];
    if (src && !isNC) {
      const { d, r, i } = src;
      if (d >= r) {
        bars.push({ label: 'D', pct: d, color: '#2563EB' });
        bars.push({ label: 'R', pct: r, color: '#DC2626' });
      } else {
        bars.push({ label: 'R', pct: r, color: '#DC2626' });
        bars.push({ label: 'D', pct: d, color: '#2563EB' });
      }
      if (i) bars.push({ label: 'I', pct: i, color: '#9CA3AF' });
    }

    return (
      <>
        <div className="text-white font-bold text-sm mb-1">{fullName}</div>
        {incumbents[fullName] && <div className="text-white/70 text-xs mb-1">{incumbents[fullName]}</div>}
        <div className="font-semibold text-xs mb-2" style={{ color }}>{rating}</div>
        {bars.map(bar => (
          <div key={bar.label} className="flex items-center gap-2 mb-1">
            <span style={{ color: bar.color, fontSize: 10, fontWeight: 700, minWidth: 10 }}>{bar.label}</span>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.15)', borderRadius: 3, height: 6 }}>
              <div style={{ background: bar.color, height: '100%', width: `${bar.pct}%`, borderRadius: 3 }} />
            </div>
            <span style={{ color: bar.color, fontSize: 10, fontWeight: 700, minWidth: 30, textAlign: 'right' }}>{bar.pct}%</span>
          </div>
        ))}
        {bars.length >= 2 && !isNC && (
          <div style={{ color: bars[0].color, fontSize: 10, fontWeight: 700, marginTop: 4 }}>
            {bars[0].label} +{Math.abs(bars[0].pct - bars[1].pct).toFixed(1)}%
          </div>
        )}
      </>
    );
  };

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

      {majorityNote && (
        <p className="text-white/60 text-xs text-center mt-1 mb-4">{majorityNote}</p>
      )}

      <HexUSMap
        colorsByAbbr={colorsByAbbr}
        renderTooltipContent={renderTooltipContent}
      />

      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        {Object.entries(ratingColors).map(([rating, color]) => (
          <div key={rating} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded border border-white/50" style={{ backgroundColor: color }} />
            <span className="text-white text-xs font-medium">{rating}</span>
          </div>
        ))}
      </div>
    </div>
  );
}