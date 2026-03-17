import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from 'recharts';
import { format } from 'date-fns';
import { computeChartData, pollConfigs } from './pollConfig';

const yDomains = {
  'generic-congressional-ballot': [25, 60],
  '2026-senate-generic': [15, 65],
  'illinois-dem-primary': [5, 50],
  'illinois-9th-house': [0, 40],
  'florida-gop-governor': [0, 55],
  'georgia-gop-governor': [0, 45],
  'south-carolina-gop-governor': [0, 35],
  'arizona-gop-governor': [0, 80],
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
  const chartData = computeChartData(polls, type);
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
            contentStyle={{
              backgroundColor: 'rgba(0,0,0,0.7)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              color: 'white'
            }}
            formatter={(value) => `${Number(value).toFixed(1)}%`}
            labelFormatter={(ts) => format(new Date(ts), 'MMMM d, yyyy')}
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