export function parsePollDate(dateStr) {
  if (!dateStr) return new Date(0);
  let s = dateStr.replace(/[–—]/g, '-').trim();
  s = s.replace(/Mid-/i, '');

  const m = s.match(/([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{2,4})\s*$/);
  if (m) {
    const year = m[3].length === 2 ? '20' + m[3] : m[3];
    return new Date(`${m[1]} ${m[2]}, ${year}`);
  }

  const m2 = s.match(/([A-Za-z]+)\s+\d+\s*-\s*(\d+),?\s*(\d{4})/);
  if (m2) return new Date(`${m2[1]} ${m2[2]}, ${m2[3]}`);

  const m3 = s.match(/([A-Za-z]+)\s+(\d{4})/);
  if (m3) return new Date(`${m3[1]} 15, ${m3[2]}`);

  return new Date(0);
}

function getPollWeight(pollDate, referenceDate, pollsterName) {
  const diffDays = (referenceDate - pollDate) / (1000 * 60 * 60 * 24);
  if (diffDays > 60) return 0;
  let weight = 1.0;
  if (pollsterName && /\([DR]\)/.test(pollsterName)) weight *= 0.5;
  return weight;
}

export const pollConfigs = {
  'generic-congressional-ballot': {
    title: 'Generic Congressional Ballot',
    candidates: [
      { key: 'democrat', name: 'Democrat', color: '#1E90FF' },
      { key: 'republican', name: 'Republican', color: '#FF2020' },
    ]
  },
  '2026-senate-generic': {
    title: 'Texas Republican Senate Runoff',
    candidates: [
      { key: 'cornyn', name: 'John Cornyn', color: '#EF4444' },
      { key: 'paxton', name: 'Ken Paxton', color: '#F97316' },
    ]
  },
  'california-governor': {
    title: 'California Open Governor Primary',
    candidates: [
      { key: 'swalwell', name: 'Eric Swalwell', color: '#3B82F6' },
      { key: 'hilton', name: 'Steve Hilton', color: '#F472B6' },
      { key: 'bianco', name: 'Chad Bianco', color: '#F97316' },
      { key: 'porter', name: 'Katie Porter', color: '#A78BFA' },
      { key: 'steyer', name: 'Tom Steyer', color: '#84CC16' },
      { key: 'mahan', name: 'Matt Mahan', color: '#22D3EE' },
      { key: 'becerra', name: 'Xavier Becerra', color: '#FBBF24' },
    ]
  },
  'maine-dem-senate': {
    title: 'Maine Democratic Senate Primary',
    candidates: [
      { key: 'mills', name: 'Janet Mills', color: '#1976D2' },
      { key: 'platner', name: 'Graham Platner', color: '#FFD600' },
      { key: 'costello', name: 'David Costello', color: '#00ACC1' },
    ]
  },
  'florida-gop-governor': {
    title: 'Florida Republican Governor Primary',
    candidates: [
      { key: 'donalds', name: 'Byron Donalds', color: '#EF4444' },
      { key: 'fishback', name: 'James Fishback', color: '#F97316' },
      { key: 'collins', name: 'Jay Collins', color: '#F472B6' },
      { key: 'renner', name: 'Paul Renner', color: '#FBBF24' },
    ]
  },
  'georgia-gop-governor': {
    title: 'Georgia Republican Governor Primary',
    candidates: [
      { key: 'jones', name: 'Burt Jones', color: '#EF4444' },
      { key: 'jackson', name: 'Rick Jackson', color: '#F472B6' },
      { key: 'raffensperger', name: 'Brad Raffensperger', color: '#FBBF24' },
      { key: 'carr', name: 'Chris Carr', color: '#F97316' },
    ]
  },
  'south-carolina-gop-governor': {
    title: 'South Carolina Republican Governor Primary',
    candidates: [
      { key: 'mace', name: 'Nancy Mace', color: '#EF4444' },
      { key: 'wilson', name: 'Alan Wilson', color: '#4ADE80' },
      { key: 'evette', name: 'Pamela Evette', color: '#F472B6' },
      { key: 'norman', name: 'Ralph Norman', color: '#F97316' },
    ]
  },
  'arizona-gop-governor': {
    title: 'Arizona Republican Governor Primary',
    candidates: [
      { key: 'biggs', name: 'Andy Biggs', color: '#EF4444' },
      { key: 'robson', name: 'Karrin Taylor Robson', color: '#F97316' },
      { key: 'schweikert', name: 'David Schweikert', color: '#FBBF24' },
    ]
  },
  '2028-dem-primary': {
    title: '2028 Democratic Presidential Primary',
    candidates: [
      { key: 'harris', name: 'Kamala Harris', color: '#3B82F6' },
      { key: 'newsom', name: 'Gavin Newsom', color: '#06B6D4' },
      { key: 'buttigieg', name: 'Pete Buttigieg', color: '#22C55E' },
      { key: 'aoc', name: 'Alexandria Ocasio-Cortez', color: '#F97316' },
      { key: 'pritzker', name: 'JB Pritzker', color: '#EF4444' },
      { key: 'shapiro', name: 'Josh Shapiro', color: '#94A3B8' },
      { key: 'booker', name: 'Cory Booker', color: '#FBBF24' },
    ]
  },
  '2028-rep-primary': {
    title: '2028 Republican Presidential Primary',
    candidates: [
      { key: 'vance', name: 'JD Vance', color: '#EF4444' },
      { key: 'trumpjr', name: 'Donald Trump Jr.', color: '#F97316' },
      { key: 'rubio', name: 'Marco Rubio', color: '#FBBF24' },
      { key: 'cruz', name: 'Ted Cruz', color: '#22D3EE' },
      { key: 'haley', name: 'Nikki Haley', color: '#F472B6' },
      { key: 'desantis', name: 'Ron DeSantis', color: '#4ADE80' },
      { key: 'rfk', name: 'RFK Jr.', color: '#94A3B8' },
      { key: 'ramaswamy', name: 'Vivek Ramaswamy', color: '#D4956A' },
    ]
  },
};

export function computeChartData(polls, type) {
  const config = pollConfigs[type];
  if (!config || !polls || polls.length === 0) return [];

  const candidates = config.candidates;
  const r = 2.5;

  const sorted = [...polls].sort((a, b) => parsePollDate(a.date) - parsePollDate(b.date));

  const result = [];
  sorted.forEach((poll, idx) => {
    const ts = parsePollDate(poll.date).getTime();
    if (!ts || ts <= 0) return;

    const refDate = new Date(ts);
    const pollsUpTo = sorted.slice(0, idx + 1);
    const point = { timestamp: ts };

    candidates.forEach(c => {
      let weightedSum = 0;
      let totalWeight = 0;

      pollsUpTo.forEach(p => {
        const val = p[c.key];
        if (val == null || val <= 0) return;
        const pDate = parsePollDate(p.date);
        const w = getPollWeight(pDate, refDate, p.pollster);
        if (w <= 0) return;
        weightedSum += val * w;
        totalWeight += w;
      });

      if (totalWeight > 0) {
        const mean = weightedSum / totalWeight;
        point[c.key] = mean;
        point[`${c.key}Min`] = Math.max(0, mean - r);
        point[`${c.key}Max`] = Math.min(100, mean + r);
      }
    });

    result.push(point);
  });

  return result;
}