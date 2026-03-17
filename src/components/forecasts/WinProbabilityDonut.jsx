import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const RADIAN = Math.PI / 180;

function renderCustomLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent, value, name, fill, index, activeIndex }) {
  const isActive = index === activeIndex;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  const display = `${value}%`;

  if (percent >= 0.07) {
    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central"
        fontSize={isActive ? 14 : 12} fontWeight="bold" style={{ pointerEvents: 'none' }}>
        {display}
      </text>
    );
  }

  // Outside label
  const outerR = outerRadius + (isActive ? 20 : 10);
  const ox = cx + outerR * Math.cos(-midAngle * RADIAN);
  const oy = cy + outerR * Math.sin(-midAngle * RADIAN);
  const textAnchor = ox > cx ? 'start' : 'end';

  return (
    <text x={ox} y={oy} fill="white" textAnchor={textAnchor} dominantBaseline="central"
      fontSize={10} fontWeight="600" style={{ pointerEvents: 'none' }}>
      {display}
    </text>
  );
}

export default function WinProbabilityDonut({ data }) {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mt-4">
      <h3 className="text-white font-inter font-bold text-lg mb-4 text-shadow-teal text-center">
        Win Probability
      </h3>
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="w-full sm:w-64 h-64 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                dataKey="value"
                nameKey="name"
                labelLine={false}
                label={(props) => renderCustomLabel({ ...props, activeIndex })}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={entry.color}
                    opacity={activeIndex === null || activeIndex === index ? 1 : 0.6}
                    outerRadius={activeIndex === index ? 105 : 90}
                    style={{ transition: 'all 0.2s ease', cursor: 'pointer' }}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value}%`, name]}
                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.85)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: 'white' }}
                itemStyle={{ color: 'white' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Legend */}
        <div className="flex flex-col gap-2 flex-1">
          {data.map((entry) => (
            <div key={entry.name} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
              <span className="text-white font-inter text-sm">{entry.name}</span>
              <span className="text-white/70 font-inter text-sm ml-auto">{entry.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}