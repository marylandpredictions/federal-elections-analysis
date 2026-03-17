import React from 'react';
import { parsePollDate, pollConfigs } from './pollConfig';

export default function PollingAverageTable({ polls, type }) {
  const config = pollConfigs[type];
  if (!config || !polls || polls.length === 0) return null;

  const candidates = config.candidates;

  // Sort polls ascending by date
  const sorted = [...polls].sort((a, b) => parsePollDate(a.date) - parsePollDate(b.date));

  // Overall average (all polls)
  const overallAvg = {};
  candidates.forEach(c => {
    const vals = sorted.map(p => p[c.key]).filter(v => v != null && v > 0);
    overallAvg[c.key] = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null;
  });

  // One-month-ago average (polls from >30 days ago)
  const now = new Date();
  const oneMonthAgo = new Date(now);
  oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

  const monthAgoPolls = sorted.filter(p => parsePollDate(p.date) <= oneMonthAgo);

  const monthAgoAvg = {};
  candidates.forEach(c => {
    const vals = monthAgoPolls.map(p => p[c.key]).filter(v => v != null && v > 0);
    monthAgoAvg[c.key] = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null;
  });

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 mt-8">
      <h3 className="text-white font-inter font-bold text-xl sm:text-2xl mb-4 text-shadow-teal">
        Polling Average
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left text-white font-inter font-semibold text-sm pb-3 pr-4">Candidate</th>
              <th className="text-center text-white font-inter font-semibold text-sm pb-3 px-4">Average</th>
              <th className="text-center text-white font-inter font-semibold text-sm pb-3 pl-4">Trend (30 days)</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map(c => {
              const avg = overallAvg[c.key];
              const prev = monthAgoAvg[c.key];

              let trendEl;
              if (avg == null) {
                trendEl = <span className="text-white font-bold">—</span>;
              } else if (prev == null) {
                trendEl = <span className="text-white font-bold">—</span>;
              } else {
                const diff = avg - prev;
                if (Math.abs(diff) < 0.05) {
                  trendEl = <span className="text-white font-bold">—</span>;
                } else if (diff > 0) {
                  trendEl = <span className="text-green-400 font-bold">+{diff.toFixed(1)}%</span>;
                } else {
                  trendEl = <span className="text-red-400 font-bold">{diff.toFixed(1)}%</span>;
                }
              }

              return (
                <tr key={c.key} className="border-t border-white/10">
                  <td className="py-3 pr-4">
                    <span
                      className="inline-block px-3 py-1 rounded font-inter font-bold text-sm text-white"
                      style={{ backgroundColor: c.color }}
                    >
                      {c.name}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="bg-black/80 text-white font-inter font-semibold text-sm px-4 py-2 rounded inline-block min-w-[60px]">
                      {avg != null ? `${avg.toFixed(1)}%` : '—'}
                    </span>
                  </td>
                  <td className="py-3 pl-4 text-center">
                    <span className="bg-black/80 px-4 py-2 rounded inline-block min-w-[80px] font-inter font-semibold text-sm">
                      {trendEl}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}