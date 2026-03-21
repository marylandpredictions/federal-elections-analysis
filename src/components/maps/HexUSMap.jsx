import { useState, useRef } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

const FIPS_TO_ABBR = {
  '01':'AL','02':'AK','04':'AZ','05':'AR','06':'CA','08':'CO','09':'CT','10':'DE',
  '12':'FL','13':'GA','15':'HI','16':'ID','17':'IL','18':'IN','19':'IA','20':'KS',
  '21':'KY','22':'LA','23':'ME','24':'MD','25':'MA','26':'MI','27':'MN','28':'MS',
  '29':'MO','30':'MT','31':'NE','32':'NV','33':'NH','34':'NJ','35':'NM','36':'NY',
  '37':'NC','38':'ND','39':'OH','40':'OK','41':'OR','42':'PA','44':'RI','45':'SC',
  '46':'SD','47':'TN','48':'TX','49':'UT','50':'VT','51':'VA','53':'WA','54':'WV',
  '55':'WI','56':'WY',
};

export const NAME_TO_ABBR = {
  'Alabama':'AL','Alaska':'AK','Arizona':'AZ','Arkansas':'AR',
  'California':'CA','Colorado':'CO','Connecticut':'CT','Delaware':'DE',
  'Florida':'FL','Georgia':'GA','Hawaii':'HI','Idaho':'ID',
  'Illinois':'IL','Indiana':'IN','Iowa':'IA','Kansas':'KS',
  'Kentucky':'KY','Louisiana':'LA','Maine':'ME','Maryland':'MD',
  'Massachusetts':'MA','Michigan':'MI','Minnesota':'MN','Mississippi':'MS',
  'Missouri':'MO','Montana':'MT','Nebraska':'NE','Nevada':'NV',
  'New Hampshire':'NH','New Jersey':'NJ','New Mexico':'NM','New York':'NY',
  'North Carolina':'NC','North Dakota':'ND','Ohio':'OH','Oklahoma':'OK',
  'Oregon':'OR','Pennsylvania':'PA','Rhode Island':'RI','South Carolina':'SC',
  'South Dakota':'SD','Tennessee':'TN','Texas':'TX','Utah':'UT',
  'Vermont':'VT','Virginia':'VA','Washington':'WA','West Virginia':'WV',
  'Wisconsin':'WI','Wyoming':'WY','District of Columbia':'DC',
};
export const ABBR_TO_NAME = Object.fromEntries(
  Object.entries(NAME_TO_ABBR).map(([k, v]) => [v, k])
);

export default function HexUSMap({ colorsByAbbr = {}, renderTooltipContent, onClick, stripeAbbrs, highlightRating, ratingsByAbbr }) {
  const [tooltip, setTooltip] = useState(null);
  const [hoveredAbbr, setHoveredAbbr] = useState(null);
  const containerRef = useRef(null);
  const innerRef = useRef(null);

  // Zoom / pan state
  const [zoom, setZoom] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragTranslateStart, setDragTranslateStart] = useState(null);

  const handleZoomIn = () => setZoom(z => Math.min(z + 0.5, 5));
  const handleZoomOut = () => {
    const next = Math.max(zoom - 0.5, 1);
    setZoom(next);
    if (next === 1) setTranslate({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setDragTranslateStart({ ...translate });
    e.preventDefault();
  };
  const handleMouseMove = (e) => {
    if (!isDragging || !dragStart) return;
    setTranslate({
      x: dragTranslateStart.x + (e.clientX - dragStart.x),
      y: dragTranslateStart.y + (e.clientY - dragStart.y),
    });
  };
  const handleMouseUp = () => { setIsDragging(false); setDragStart(null); };

  const handleMouseMoveTooltip = (e, abbr) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({ abbr, x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div ref={containerRef} className="relative w-full select-none" style={{ overflow: 'hidden' }}>
      {/* SVG Defs for Stripe Pattern */}
      <svg width="0" height="0">
        <defs>
          <pattern id="flipStripes" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
            <line x1="0" y1="0" x2="0" y2="8" stroke="white" strokeWidth="2" />
          </pattern>
        </defs>
      </svg>

      {/* Zoom buttons */}
      <div className="absolute top-2 right-2 z-20 flex flex-col gap-1">
        <button
          onClick={handleZoomIn}
          className="w-7 h-7 rounded bg-black text-white font-bold text-base flex items-center justify-center hover:bg-gray-800 border border-white/30 transition-colors"
          title="Zoom in"
        >+</button>
        <button
          onClick={handleZoomOut}
          className="w-7 h-7 rounded bg-black text-white font-bold text-base flex items-center justify-center hover:bg-gray-800 border border-white/30 transition-colors"
          title="Zoom out"
        >−</button>
      </div>

      {/* Pannable / zoomable inner */}
      <div
        ref={innerRef}
        style={{
          transform: `translate(${translate.x}px, ${translate.y}px) scale(${zoom})`,
          transformOrigin: 'center center',
          cursor: isDragging ? 'grabbing' : zoom > 1 ? 'grab' : 'default',
          transition: isDragging ? 'none' : 'transform 0.15s ease',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <ComposableMap
          projection="geoAlbersUsa"
          style={{ width: '100%', height: 'auto' }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map(geo => {
                const abbr = FIPS_TO_ABBR[geo.id];
                const isFlipped = stripeAbbrs && stripeAbbrs.has(abbr);
                const fill = isFlipped ? 'url(#flipStripes)' : ((abbr && colorsByAbbr[abbr]) || '#4B5563');
                const dimmed = highlightRating && ratingsByAbbr && ratingsByAbbr[abbr] !== highlightRating;
                return (
                  <Geography
                   key={geo.rsmKey}
                   geography={geo}
                   fill={fill}
                   fillOpacity={dimmed ? 0.2 : 1}
                   stroke="#ffffff"
                   strokeWidth={hoveredAbbr === abbr ? 1.2 : 0.6}
                   style={{
                     default: { outline: 'none' },
                     hover:   { outline: 'none', filter: 'brightness(1.25)', cursor: onClick ? 'pointer' : 'default' },
                     pressed: { outline: 'none' },
                   }}
                   onMouseMove={(e) => { if (abbr) { handleMouseMoveTooltip(e, abbr); setHoveredAbbr(abbr); } }}
                   onMouseLeave={() => { setTooltip(null); setHoveredAbbr(null); }}
                   onClick={() => abbr && onClick && onClick(abbr)}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>

      {/* Tooltip */}
      {tooltip && renderTooltipContent && (() => {
        const content = renderTooltipContent(tooltip.abbr);
        if (!content) return null;
        return (
          <div
            className="absolute z-50 pointer-events-none bg-black/80 border border-white/20 rounded-xl p-3 shadow-xl min-w-[160px]"
            style={{
              left: tooltip.x + 12,
              top:  tooltip.y - 10,
              transform: tooltip.x > 600 ? 'translateX(-110%)' : undefined,
            }}
          >
            {content}
          </div>
        );
      })()}
    </div>
  );
}