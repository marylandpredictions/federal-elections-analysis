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
    paxton: poll.paxton,
    kelly: poll.kelly,
    raja: poll.raja,
    stratton: poll.stratton,
    biss: poll.biss,
    fine: poll.fine,
    abughazaleh: poll.abughazaleh,
    simmons: poll.simmons,
    amiwala: poll.amiwala,
    andrew: poll.andrew
  })) : [];

  const isApproval = type.includes('approval');
  const isIllinois = type === 'illinois-dem-primary';
  const isTexas = type === '2026-senate-generic';
  const isIllinois9th = type === 'illinois-9th-house';

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
            labelFormatter={(timestamp) => format(new Date(timestamp), 'MMMM d, yyyy')}
          />
          <Legend wrapperStyle={{ color: 'white' }} />
          {isIllinois9th ? (
            <>
              <Line 
                type="linear" 
                dataKey="biss" 
                stroke="#008080" 
                strokeWidth={3}
                name="Daniel Biss"
                dot={false}
              />
              <Line 
                type="linear" 
                dataKey="fine" 
                stroke="#8B0000" 
                strokeWidth={3}
                name="Laura Fine"
                dot={false}
              />
              <Line 
                type="linear" 
                dataKey="abughazaleh" 
                stroke="#C71585" 
                strokeWidth={3}
                name="Kat Abughazaleh"
                dot={false}
              />
              <Line 
                type="linear" 
                dataKey="simmons" 
                stroke="#006400" 
                strokeWidth={3}
                name="Mike Simmons"
                dot={false}
              />
              <Line 
                type="linear" 
                dataKey="amiwala" 
                stroke="#4B0082" 
                strokeWidth={3}
                name="Bushra Amiwala"
                dot={false}
              />
              <Line 
                type="linear" 
                dataKey="andrew" 
                stroke="#FFD700" 
                strokeWidth={3}
                name="Phil Andrew"
                dot={false}
              />
              {pollDots.map((poll, idx) => (
                <React.Fragment key={idx}>
                  <Scatter
                    data={[{ timestamp: new Date(poll.date).getTime(), value: poll.biss }]}
                    fill="#008080"
                    fillOpacity={0.6}
                    dataKey="value"
                  />
                  <Scatter
                    data={[{ timestamp: new Date(poll.date).getTime(), value: poll.fine }]}
                    fill="#8B0000"
                    fillOpacity={0.6}
                    dataKey="value"
                  />
                  <Scatter
                    data={[{ timestamp: new Date(poll.date).getTime(), value: poll.abughazaleh }]}
                    fill="#C71585"
                    fillOpacity={0.6}
                    dataKey="value"
                  />
                  <Scatter
                    data={[{ timestamp: new Date(poll.date).getTime(), value: poll.simmons }]}
                    fill="#006400"
                    fillOpacity={0.6}
                    dataKey="value"
                  />
                  <Scatter
                    data={[{ timestamp: new Date(poll.date).getTime(), value: poll.amiwala }]}
                    fill="#4B0082"
                    fillOpacity={0.6}
                    dataKey="value"
                  />
                  <Scatter
                    data={[{ timestamp: new Date(poll.date).getTime(), value: poll.andrew }]}
                    fill="#FFD700"
                    fillOpacity={0.6}
                    dataKey="value"
                  />
                </React.Fragment>
              ))}
            </>
          ) : isApproval ? (
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
          ) : isIllinois ? (
            <>
              <Area
                type="linear"
                dataKey="rajaMax"
                stroke="none"
                fill="#0047AB"
                fillOpacity={0.8}
              />
              <Area
                type="linear"
                dataKey="rajaMin"
                stroke="none"
                fill="#ffffff"
                fillOpacity={1}
              />
              <Area
                type="linear"
                dataKey="strattonMax"
                stroke="none"
                fill="#006400"
                fillOpacity={0.8}
              />
              <Area
                type="linear"
                dataKey="strattonMin"
                stroke="none"
                fill="#ffffff"
                fillOpacity={1}
              />
              <Area
                type="linear"
                dataKey="kellyMax"
                stroke="none"
                fill="#008080"
                fillOpacity={0.8}
              />
              <Area
                type="linear"
                dataKey="kellyMin"
                stroke="none"
                fill="#ffffff"
                fillOpacity={1}
              />
              <Line 
                type="linear" 
                dataKey="raja" 
                stroke="#0047AB" 
                strokeWidth={3}
                name="Raja Krishnamoorthi"
                dot={false}
              />
              <Line 
                type="linear" 
                dataKey="stratton" 
                stroke="#006400" 
                strokeWidth={3}
                name="Juliana Stratton"
                dot={false}
              />
              <Line 
                type="linear" 
                dataKey="kelly" 
                stroke="#008080" 
                strokeWidth={3}
                name="Robin Kelly"
                dot={false}
              />
              {pollDots.map((poll, idx) => (
                <React.Fragment key={idx}>
                  <Scatter
                    data={[{ timestamp: new Date(poll.date).getTime(), value: poll.raja }]}
                    fill="#0047AB"
                    fillOpacity={0.6}
                    dataKey="value"
                  />
                  <Scatter
                    data={[{ timestamp: new Date(poll.date).getTime(), value: poll.stratton }]}
                    fill="#006400"
                    fillOpacity={0.6}
                    dataKey="value"
                  />
                  <Scatter
                    data={[{ timestamp: new Date(poll.date).getTime(), value: poll.kelly }]}
                    fill="#008080"
                    fillOpacity={0.6}
                    dataKey="value"
                  />
                </React.Fragment>
              ))}
            </>
          ) : isTexas ? (
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
                    data={[{ timestamp: new Date(poll.date).getTime(), value: poll.cornyn }]}
                    fill="#8B0000"
                    fillOpacity={0.6}
                    dataKey="value"
                  />
                  <Scatter
                    data={[{ timestamp: new Date(poll.date).getTime(), value: poll.paxton }]}
                    fill="#CC5500"
                    fillOpacity={0.6}
                    dataKey="value"
                  />
                </React.Fragment>
              ))}
            </>
          ) : null}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}