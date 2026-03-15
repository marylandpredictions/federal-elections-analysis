import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

export default function PollingChart({ data, type }) {
  const formattedData = data.map(item => ({
    ...item,
    date: format(new Date(item.date), 'MMM d')
  }));

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
            dataKey="date" 
            stroke="white" 
            style={{ fontSize: '12px' }}
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
              <Line 
                type="monotone" 
                dataKey="democrat" 
                stroke="#2663eb" 
                strokeWidth={3}
                name="Democrat"
                dot={{ fill: '#2663eb', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="republican" 
                stroke="#dc2626" 
                strokeWidth={3}
                name="Republican"
                dot={{ fill: '#dc2626', r: 4 }}
              />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}