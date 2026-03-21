import React, { useMemo } from 'react';
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, Brush } from 'recharts';
import { format } from 'date-fns';
import { computeChartData, pollConfigs } from './pollConfig';



const candidateColors = {
  democrat: '#0047AB',
  republican: '#8B0000',
  cornyn: '#8B0000',
  paxton: '#CC5500',
  raja: '#0047AB',
  stratton: '#006400',
  kelly: '#008080',
  biss: '#008080',
  fine: '#8B0000',
  abughazaleh: '#C71585',
  simmons: '#006400',
  amiwala: '#4B0082',
  andrew: '#FFD700',
  donalds: '#8B0000',
  fishback: '#FF6600',
  collins: '#C71585',
  renner: '#DAA520',
  jones: '#8B0000',
  jackson: '#C71585',
  raffensperger: '#DAA520',
  carr: '#FF6600',
  mace: '#8B0000',
  wilson: '#006400',
  evette: '#C71585',
  norman: '#FF6600',
};

export default function PollingChart({ polls, type }) {
  const config = pollConfigs[type];
  const chartData = useMemo(() => computeChartData(polls, type), [polls, type]);


  const candidates = config ? config.candidates : [];
  const title = config ? `${config.title} Polling Average` : 'Polling Average';

  const yDomain = useMemo(() => {
    if (!chartData || chartData.length === 0 || candidates.length === 0) return [0, 100];
    let peak = 0;
    chartData.forEach(point => {
      candidates.forEach(c => {
        const v = point[c.key];
        if (v != null && v > peak) peak = v;
      });
    });
    const top = Math.ceil(peak + 10);
    return [0, Math.min(top, 100)];
  }, [chartData, candidates]);

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8">
      <h3 className="text-white font-inter font-bold text-xl sm:text-2xl mb-6 text-shadow-teal">
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={460}>
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis
            dataKey="timestamp"
            type="number"
            domain={['dataMin', 'dataMax']}
            scale="time"
            tickFormatter={(ts) => format(new Date(ts), 'MMM d, yyyy')}
            stroke="white"
            style={{ fontSize: '10px' }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis
            stroke="white"
            style={{ fontSize: '12px' }}
            domain={yDomain}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (!active || !payload || !payload.length) return null;
              const entries = payload
                .filter(e => !e.dataKey.endsWith('Min') && !e.dataKey.endsWith('Max') && e.value != null)
                .sort((a, b) => b.value - a.value);
              if (!entries.length) return null;
              return (
                <div style={{ backgroundColor: 'rgba(0,0,0,0.92)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8, padding: '10px 14px', minWidth: 230 }}>
                  <p style={{ color: 'white', marginBottom: 8, fontSize: 12 }}>{format(new Date(label), 'MMMM d, yyyy')}</p>
                  {entries.map(e => (
                    <div key={e.dataKey} style={{ marginBottom: 6 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ color: e.color, fontSize: 11, fontWeight: 600, width: 90, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flexShrink: 0 }}>{e.name}</span>
                        <div style={{ flex: 1, background: 'rgba(255,255,255,0.15)', borderRadius: 3, height: 8, overflow: 'hidden' }}>
                          <div style={{ background: e.color, height: '100%', width: `${Math.min(e.value, 100)}%`, borderRadius: 3, transition: 'width 0.35s ease' }} />
                        </div>
                        <span style={{ color: e.color, fontSize: 11, fontWeight: 700, minWidth: 38, textAlign: 'right' }}>{Number(e.value).toFixed(1)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              );
            }}
          />
          <Legend wrapperStyle={{ color: 'white', fontWeight: 'bold' }} />
          {candidates.map(c => {
            const color = c.color || candidateColors[c.key] || '#ffffff';
            return (
              <React.Fragment key={c.key}>
                <Area
                  type="linear"
                  dataKey={`${c.key}Max`}
                  baseDataKey={c.key}
                  stroke="none"
                  fill={color}
                  fillOpacity={0.15}
                  legendType="none"
                  name={`${c.name} CI`}
                />

                <Line
                  type="linear"
                  dataKey={c.key}
                  stroke={color}
                  strokeWidth={3}
                  name={c.name}
                  dot={false}
                  activeDot={false}
                />
              </React.Fragment>
            );
          })}
          <Brush
            dataKey="timestamp"
            height={30}
            stroke="rgba(255,255,255,0.3)"
            fill="rgba(255,255,255,0.07)"
            travellerWidth={8}
            tickFormatter={(ts) => format(new Date(ts), 'MMM d, yyyy')}
            style={{ fontSize: '10px', fontWeight: 'bold', fill: 'white', color: 'white' }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}