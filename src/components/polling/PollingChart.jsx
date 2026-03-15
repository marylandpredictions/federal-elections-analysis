import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, Scatter } from 'recharts';
import { format } from 'date-fns';

export default function PollingChart({ data, type, polls }) {
  const formattedData = data.map(item => ({
    ...item,
    date: format(new Date(item.date), 'MMMM d, yyyy'),
    timestamp: new Date(item.date).getTime()
  }));

  const pollDots = polls ? polls.map(poll => ({
    date: poll.date,
    cornyn: poll.cornyn,
    paxton: poll.paxton
  })) : [];

  const isApproval = type.includes('approval');

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8">
      <h3 className="text-white font-inter font-bold text-xl sm:text-2xl mb-6 text-shadow-teal">
        Polling Average Trend
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="timestamp"
            type="number"
            domain={['dataMin', 'dataMax']}
            scale="time"
            tickFormatter={(timestamp) => format(new Date(timestamp), 'MMMM d, yyyy')}
            stroke="white" 
            style={{ fontSize: '10px' }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            stroke="white" 
            style={{ fontSize: '12px' }}
            domain={[0, 100]}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(0,0,0,0.9)', 
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              color: 'white'
            }}
            formatter={(value) => `${value}%`}
          />
          <Legend wrapperStyle={{ color: 'white' }} />
          {isApproval ? (
            <>
              <Line 
                type="monotone" 
                dataKey="approve" 
                stroke="#22c55e" 
                strokeWidth={3}
                name="Approve"
                dot={{ fill: '#22c55e', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="disapprove" 
                stroke="#ef4444" 
                strokeWidth={3}
                name="Disapprove"
                dot={{ fill: '#ef4444', r: 4 }}
              />
            </>
          ) : (
            <>
              <Area
                type="linear"
                dataKey="cornyinMax"
                stroke="none"
                fill="#8B0000"
                fillOpacity={0.8}
              />
              <Area
                type="linear"
                dataKey="cornyinMin"
                stroke="none"
                fill="#ffffff"
                fillOpacity={1}
              />
              <Area
                type="linear"
                dataKey="paxtonMax"
                stroke="none"
                fill="#CC5500"
                fillOpacity={0.8}
              />
              <Area
                type="linear"
                dataKey="paxtonMin"
                stroke="none"
                fill="#ffffff"
                fillOpacity={1}
              />
              <Line 
                type="linear" 
                dataKey="cornyn" 
                stroke="#8B0000" 
                strokeWidth={3}
                name="Cornyn"
                dot={false}
              />
              <Line 
                type="linear" 
                dataKey="paxton" 
                stroke="#CC5500" 
                strokeWidth={3}
                name="Paxton"
                dot={false}
              />
              {pollDots.map((poll, idx) => (
                <React.Fragment key={idx}>
                  <Scatter
                    data={[{ date: poll.date, value: poll.cornyn }]}
                    fill="#8B0000"
                    fillOpacity={0.6}
                    dataKey="value"
                  />
                  <Scatter
                    data={[{ date: poll.date, value: poll.paxton }]}
                    fill="#CC5500"
                    fillOpacity={0.6}
                    dataKey="value"
                  />
                </React.Fragment>
              ))}
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}