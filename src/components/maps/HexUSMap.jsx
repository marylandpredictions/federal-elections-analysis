import React, { useState, useRef } from 'react';
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

export default function HexUSMap({ colorsByAbbr = {}, renderTooltipContent, onClick, stripeAbbrs }) {
  const [tooltip, setTooltip] = useState(null); // { abbr, x, y }
  const containerRef = useRef(null);

  const handleMouseMove = (e, abbr) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({
      abbr,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div ref={containerRef} className="relative w-full select-none">
      <ComposableMap
        projection="geoAlbersUsa"
        style={{ width: '100%', height: 'auto' }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map(geo => {
              const abbr = FIPS_TO_ABBR[geo.id];
              const fill = (abbr && colorsByAbbr[abbr]) || '#4B5563';
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={fill}
                  stroke="#ffffff"
                  strokeWidth={0.6}
                  style={{
                    default: { outline: 'none' },
                    hover:   { outline: 'none', filter: 'brightness(1.25)', cursor: 'pointer' },
                    pressed: { outline: 'none' },
                  }}
                  onMouseMove={(e) => abbr && handleMouseMove(e, abbr)}
                  onMouseLeave={() => setTooltip(null)}
                  onClick={() => abbr && onClick && onClick(abbr)}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {/* Tooltip — same dark card style as the original */}
      {tooltip && renderTooltipContent && (() => {
        const content = renderTooltipContent(tooltip.abbr);
        if (!content) return null;
        return (
          <div
            className="absolute z-50 pointer-events-none bg-black/90 border border-white/20 rounded-xl p-3 shadow-xl min-w-[160px]"
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