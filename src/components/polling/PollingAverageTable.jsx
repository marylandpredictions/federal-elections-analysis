import React, { useState } from 'react';
import { parsePollDate, pollConfigs } from './pollConfig';

export function getPollWeight(pollDate, referenceDate, pollsterName) {
  const diffDays = (referenceDate - pollDate) / (1000 * 60 * 60 * 24);
  let weight;
  if (diffDays <= 60) weight = 1.0;
  else if (diffDays <= 90) weight = 0.5;
  else if (diffDays <= 180) weight = 1 / 6;
  else weight = 0;
  if (pollsterName && /\([DR]\)/.test(pollsterName)) weight *= 0.5;
  return weight;
}

export function weightedAvg(polls, key, referenceDate) {
  let sum = 0, total = 0;
  polls.forEach(p => {
    const val = p[key];
    if (val == null || val <= 0) return;
    const w = getPollWeight(parsePollDate(p.date), referenceDate, p.pollster);
    if (w <= 0) return;
    sum += val * w;
    total += w;
  });
  return total > 0 ? sum / total : null;
}

export default function PollingAverageTable({ polls, type }) {
  const config = pollConfigs[type];
  const [hoveredKey, setHoveredKey] = useState(null);

  if (!config || !polls || polls.length === 0) return null;

  const now = new Date();
  const oneMonthAgo = new Date(now);
  oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
  const pastPolls = polls.filter(p => parsePollDate(p.date) <= oneMonthAgo);

  const candidates = [...config.candidates].sort((a, b) => {
    const avgA = weightedAvg(polls, a.key, now) ?? -1;
    const avgB = weightedAvg(polls, b.key, now) ?? -1;
    return avgB - avgA;
  });

  // Compute margin: difference between 1st and 2nd
  const avg0 = candidates.length > 0 ? weightedAvg(polls, candidates[0].key, now) : null;
  const avg1 = candidates.length > 1 ? weightedAvg(polls, candidates[1].key, now) : null;
  const marginValue = (avg0 != null && avg1 != null) ? avg0 - avg1 : null;
  const marginColor = candidates.length > 0 ? candidates[0].color : '#ffffff';

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
              <th className="text-left text-white font-inter font-semibold text-sm pb-3 px-4">Average</th>
              <th className="text-center text-white font-inter font-semibold text-sm pb-3 px-4">Margin</th>
              <th className="text-center text-white font-inter font-semibold text-sm pb-3 pl-4">Trend (30 days)</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((c, idx) => {
              const avg = weightedAvg(polls, c.key, now);
              const prev = pastPolls.length > 0 ? weightedAvg(pastPolls, c.key, oneMonthAgo) : null;
              const isHovered = hoveredKey === c.key;

              let trendEl;
              if (avg == null || prev == null) {
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

              // Margin cell: only show for the top candidate
              const marginEl = idx === 0 && marginValue != null ? (
                <span
                  className="bg-black/80 px-3 py-1.5 rounded inline-block font-inter font-bold text-sm"
                  style={{ color: marginColor }}
                >
                  +{marginValue.toFixed(1)}%
                </span>
              ) : <span className="text-white/30 text-sm">—</span>;

              return (
                <tr
                  key={c.key}
                  className="border-t border-white/10 transition-all duration-150"
                  style={{ backgroundColor: isHovered ? 'rgba(255,255,255,0.05)' : 'transparent' }}
                >
                  <td className="py-3 pr-4">
                    <span
                      className="inline-block px-3 py-1 rounded font-inter font-bold text-sm text-white cursor-default"
                      style={{ backgroundColor: c.color }}
                    >
                      {c.name}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div
                      className="flex items-center gap-2 cursor-default"
                      onMouseEnter={() => setHoveredKey(c.key)}
                      onMouseLeave={() => setHoveredKey(null)}
                    >
                      {/* Bar out of 100 */}
                      <div
                        className="flex-1 bg-white/10 rounded overflow-hidden min-w-[80px] transition-all duration-200"
                        style={{ height: isHovered ? 14 : 10 }}
                      >
                        <div
                          className="h-full rounded transition-all duration-300"
                          style={{
                            width: avg != null ? `${Math.min(avg, 100)}%` : '0%',
                            backgroundColor: c.color,
                            opacity: isHovered ? 1 : 0.8,
                          }}
                        />
                      </div>
                      <span
                        className="font-inter font-bold text-sm min-w-[42px] text-right transition-all duration-150"
                        style={{ color: c.color, fontSize: isHovered ? '14px' : '12px' }}
                      >
                        {avg != null ? `${avg.toFixed(1)}%` : '—'}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {marginEl}
                  </td>
                  <td className="py-3 pl-4 text-center">
                    <span className="bg-black/80 px-4 py-2 rounded inline-block min-w-[80px] font-inter font-semibold text-sm cursor-default">
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