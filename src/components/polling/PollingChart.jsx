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
    andrew: poll.andrew,
    donalds: poll.donalds,
    fishback: poll.fishback,
    collins: poll.collins,
    renner: poll.renner,
    jones: poll.jones,
    jackson: poll.jackson,
    raffensperger: poll.raffensperger,
    carr: poll.carr,
    mace: poll.mace,
    wilson: poll.wilson,
    evette: poll.evette,
    norman: poll.norman
  })) : [];

  const isApproval = type.includes('approval');
  const isGenericBallot = type === 'generic-congressional-ballot';
  const isIllinois = type === 'illinois-dem-primary';
  const isTexas = type === '2026-senate-generic';
  const isIllinois9th = type === 'illinois-9th-house';
  const isFlorida = type === 'florida-gop-governor';
  const isGeorgia = type === 'georgia-gop-governor';
  const isSouthCarolina = type === 'south-carolina-gop-governor';

  // Calculate dynamic Y-axis domain based on poll type
  let yDomain = [0, 100];
  if (isGenericBallot) {
    yDomain = [25, 60];
  } else if (isTexas) {
    yDomain = [15, 65];
  } else if (isIllinois) {
    yDomain = [5, 50];
  } else if (isIllinois9th) {
    yDomain = [0, 40];
  } else if (isFlorida) {
    yDomain = [0, 55];
  } else if (isGeorgia) {
    yDomain = [0, 45];
  } else if (isSouthCarolina) {
    yDomain = [0, 35];
  } else if (isApproval) {
    yDomain = [10, 85];
  }

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
            domain={yDomain}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(0,0,0,0.9)', 
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              color: 'white'
            }}
            formatter={(value) => `${Number(value).toFixed(1)}%`}
            labelFormatter={(timestamp) => format(new Date(timestamp), 'MMMM d, yyyy')}
          />
          <Legend wrapperStyle={{ color: 'white', fontWeight: 'bold' }} />
          {isGenericBallot ? (
            <>
              <Line 
                type="linear" 
                dataKey="democrat" 
                stroke="#0047AB" 
                strokeWidth={3}
                name="Democrat"
                dot={false}
              />
              <Line 
                type="linear" 
                dataKey="republican" 
                stroke="#8B0000" 
                strokeWidth={3}
                name="Republican"
                dot={false}
              />
            </>
          ) : isSouthCarolina ? (
            <>
              <Line 
                type="linear" 
                dataKey="mace" 
                stroke="#8B0000" 
                strokeWidth={3}
                name="Nancy Mace"
                dot={false}
              />
              <Line 
                type="linear" 
                dataKey="wilson" 
                stroke="#006400" 
                strokeWidth={3}
                name="Alan Wilson"
                dot={false}
              />
              <Line 
                type="linear" 
                dataKey="evette" 
                stroke="#C71585" 
                strokeWidth={3}
                name="Pamela Evette"
                dot={false}
              />
              <Line 
                type="linear" 
                dataKey="norman" 
                stroke="#FF6600" 
                strokeWidth={3}
                name="Ralph Norman"
                dot={false}
              />
              {pollDots.map((poll, idx) => (
                <React.Fragment key={idx}>
                  <Scatter
                    data={[{ timestamp: new Date(poll.date).getTime(), value: poll.mace }]}
                    fill="#8B0000"
                    fillOpacity={0.6}
                    dataKey="value"
                  />
                  <Scatter
                    data={[{ timestamp: new Date(poll.date).getTime(), value: poll.wilson }]}
                    fill="#006400"
                    fillOpacity={0.6}
                    dataKey="value"
                  />
                  <Scatter
                    data={[{ timestamp: new Date(poll.date).getTime(), value: poll.evette }]}
                    fill="#C71585"
                    fillOpacity={0.6}
                    dataKey="value"
                  />
                  <Scatter
                    data={[{ timestamp: new Date(poll.date).getTime(), value: poll.norman }]}
                    fill="#FF6600"
                    fillOpacity={0.6}
                    dataKey="value"
                  />
                </React.Fragment>
              ))}
            </>
          ) : isGeorgia ? (
            <>
              <Line 
                type="linear" 
                dataKey="jones" 
                stroke="#8B0000" 
                strokeWidth={3}
                name="Burt Jones"
                dot={false}
              />
              <Line 
                type="linear" 
                dataKey="jackson" 
                stroke="#C71585" 
                strokeWidth={3}
                name="Rick Jackson"
                dot={false}
              />
              <Line 
                type="linear" 
                dataKey="raffensperger" 
                stroke="#DAA520" 
                strokeWidth={3}
                name="Brad Raffensperger"
                dot={false}
              />
              <Line 
                type="linear" 
                dataKey="carr" 
                stroke="#FF6600" 
                strokeWidth={3}
                name="Chris Carr"
                dot={false}
              />
              {pollDots.map((poll, idx) => (
                <React.Fragment key={idx}>
                  <Scatter
                    data={[{ timestamp: new Date(poll.date).getTime(), value: poll.jones }]}
                    fill="#8B0000"
                    fillOpacity={0.6}
                    dataKey="value"
                  />
                  <Scatter
                    data={[{ timestamp: new Date(poll.date).getTime(), value: poll.jackson }]}
                    fill="#C71585"
                    fillOpacity={0.6}
                    dataKey="value"
                  />
                  <Scatter
                    data={[{ timestamp: new Date(poll.date).getTime(), value: poll.raffensperger }]}
                    fill="#DAA520"
                    fillOpacity={0.6}
                    dataKey="value"
                  />
                  <Scatter
                    data={[{ timestamp: new Date(poll.date).getTime(), value: poll.carr }]}
                    fill="#FF6600"
                    fillOpacity={0.6}
                    dataKey="value"
                  />
                </React.Fragment>
              ))}
            </>
          ) : isFlorida ? (
            <>
              <Line 
                type="linear" 
                dataKey="donalds" 
                stroke="#8B0000" 
                strokeWidth={3}
                name="Byron Donalds"
                dot={false}
              />
              <Line 
                type="linear" 
                dataKey="fishback" 
                stroke="#FF6600" 
                strokeWidth={3}
                name="James Fishback"
                dot={false}
              />
              <Line 
                type="linear" 
                dataKey="collins" 
                stroke="#C71585" 
                strokeWidth={3}
                name="Jay Collins"
                dot={false}
              />
              <Line 
                type="linear" 
                dataKey="renner" 
                stroke="#DAA520" 
                strokeWidth={3}
                name="Paul Renner"
                dot={false}
              />
              {pollDots.map((poll, idx) => (
                <React.Fragment key={idx}>
                  <Scatter
                    data={[{ timestamp: new Date(poll.date).getTime(), value: poll.donalds }]}
                    fill="#8B0000"
                    fillOpacity={0.6}
                    dataKey="value"
                  />
                  <Scatter
                    data={[{ timestamp: new Date(poll.date).getTime(), value: poll.fishback }]}
                    fill="#FF6600"
                    fillOpacity={0.6}
                    dataKey="value"
                  />
                  <Scatter
                    data={[{ timestamp: new Date(poll.date).getTime(), value: poll.collins }]}
                    fill="#C71585"
                    fillOpacity={0.6}
                    dataKey="value"
                  />
                  <Scatter
                    data={[{ timestamp: new Date(poll.date).getTime(), value: poll.renner }]}
                    fill="#DAA520"
                    fillOpacity={0.6}
                    dataKey="value"
                  />
                </React.Fragment>
              ))}
            </>
          ) : isIllinois9th ? (
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
                name="John Cornyn"
                dot={false}
              />
              <Line 
                type="linear" 
                dataKey="paxton" 
                stroke="#CC5500" 
                strokeWidth={3}
                name="Ken Paxton"
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