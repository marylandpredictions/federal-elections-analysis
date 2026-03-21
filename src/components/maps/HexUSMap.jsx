import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

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

const GEO_URL = 'https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json';

export default function HexUSMap({ colorsByAbbr = {}, renderTooltipContent, onClick, stripeAbbrs }) {
  const [geoData, setGeoData] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    fetch(GEO_URL)
      .then(r => r.json())
      .then(setGeoData);
  }, []);

  const getAbbr = (feature) => NAME_TO_ABBR[feature.properties.name] || null;

  const style = (feature) => {
    const abbr = getAbbr(feature);
    return {
      fillColor: (abbr && colorsByAbbr[abbr]) || '#4B5563',
      weight: 1,
      color: '#ffffff',
      fillOpacity: 1,
    };
  };

  const onEachFeature = (feature, layer) => {
    const abbr = getAbbr(feature);
    if (!abbr) return;

    layer.on({
      mousemove: (e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        setTooltip({ abbr, x: e.originalEvent.clientX - rect.left, y: e.originalEvent.clientY - rect.top });
      },
      mouseout: () => setTooltip(null),
      click: () => onClick && onClick(abbr),
    });
  };

  return (
    <div ref={containerRef} className="relative w-full select-none" style={{ height: 420 }}>
      <MapContainer
        center={[38, -96]}
        zoom={4}
        zoomControl={false}
        scrollWheelZoom={false}
        dragging={false}
        doubleClickZoom={false}
        attributionControl={false}
        style={{ height: '100%', width: '100%', background: 'transparent', cursor: onClick ? 'pointer' : 'default' }}
      >
        {geoData && (
          <GeoJSON
            key={JSON.stringify(colorsByAbbr)}
            data={geoData}
            style={style}
            onEachFeature={onEachFeature}
          />
        )}
      </MapContainer>

      {tooltip && renderTooltipContent && (() => {
        const content = renderTooltipContent(tooltip.abbr);
        if (!content) return null;
        return (
          <div
            className="absolute z-[1000] pointer-events-none bg-black/90 border border-white/20 rounded-xl p-3 shadow-xl min-w-[160px]"
            style={{
              left: tooltip.x + 12,
              top: tooltip.y - 10,
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