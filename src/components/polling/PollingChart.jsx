import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from 'recharts';
import { format } from 'date-fns';
import { computeChartData, pollConfigs } from './pollConfig';

const yDomains = {
  'generic-congressional-ballot': [25, 60],
  '2026-senate-generic': [15, 65],
  'maine-dem-senate': [0, 75],
  'california-governor': [0, 40],
  'florida-gop-governor': [0, 55],
  'georgia-gop-governor': [0, 45],
  'south-carolina-gop-governor': [0, 35],
  'arizona-gop-governor': [0, 80],
  'louisiana-gop-senate': [0, 65],
  'georgia-gop-senate': [0, 55],
  'michigan-dem-senate': [0, 50],
  'minnesota-dem-senate': [0, 65],
  '2028-dem-primary': [0, 50],
  '2028-rep-primary': [0, 70],
};

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
  const yDomain = yDomains[type] || [0, 100];

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8">
      <h3 className="text-white font-inter font-bold text-xl sm:text-2xl mb-6 text-shadow-teal">
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
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
                  stroke="none"
                  fill={color}
                  fillOpacity={0.2}
                  legendType="none"
                  name={`${c.name} CI`}
                />
                <Area
                  type="linear"
                  dataKey={`${c.key}Min`}
                  stroke="none"
                  fill="#ffffff"
                  fillOpacity={0.1}
                  legendType="none"
                  name={`${c.name} CI Low`}
                />
                <Line
                  type="linear"
                  dataKey={c.key}
                  stroke={color}
                  strokeWidth={3}
                  name={c.name}
                  dot={false}
                />
              </React.Fragment>
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}