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
      { key: 'cornyn', name: 'John Cornyn', color: '#D32F2F' },
      { key: 'paxton', name: 'Ken Paxton', color: '#FF6D00' },
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
      { key: 'donalds', name: 'Byron Donalds', color: '#D32F2F' },
      { key: 'fishback', name: 'James Fishback', color: '#FF6D00' },
      { key: 'collins', name: 'Jay Collins', color: '#E91E8C' },
      { key: 'renner', name: 'Paul Renner', color: '#F9A825' },
    ]
  },
  'georgia-gop-governor': {
    title: 'Georgia Republican Governor Primary',
    candidates: [
      { key: 'jones', name: 'Burt Jones', color: '#D32F2F' },
      { key: 'jackson', name: 'Rick Jackson', color: '#E91E8C' },
      { key: 'raffensperger', name: 'Brad Raffensperger', color: '#F9A825' },
      { key: 'carr', name: 'Chris Carr', color: '#FF6D00' },
    ]
  },
  'south-carolina-gop-governor': {
    title: 'South Carolina Republican Governor Primary',
    candidates: [
      { key: 'mace', name: 'Nancy Mace', color: '#D32F2F' },
      { key: 'wilson', name: 'Alan Wilson', color: '#2E7D32' },
      { key: 'evette', name: 'Pamela Evette', color: '#E91E8C' },
      { key: 'norman', name: 'Ralph Norman', color: '#FF6D00' },
    ]
  },
  'arizona-gop-governor': {
    title: 'Arizona Republican Governor Primary',
    candidates: [
      { key: 'biggs', name: 'Andy Biggs', color: '#D32F2F' },
      { key: 'robson', name: 'Karrin Taylor Robson', color: '#FF6D00' },
      { key: 'schweikert', name: 'David Schweikert', color: '#F9A825' },
    ]
  },
  '2028-dem-primary': {
    title: '2028 Democratic Presidential Primary',
    candidates: [
      { key: 'harris', name: 'Kamala Harris', color: '#1976D2' },
      { key: 'newsom', name: 'Gavin Newsom', color: '#00897B' },
      { key: 'buttigieg', name: 'Pete Buttigieg', color: '#2E7D32' },
      { key: 'aoc', name: 'Alexandria Ocasio-Cortez', color: '#FF6D00' },
      { key: 'pritzker', name: 'JB Pritzker', color: '#D32F2F' },
      { key: 'shapiro', name: 'Josh Shapiro', color: '#757575' },
      { key: 'booker', name: 'Cory Booker', color: '#F9A825' },
    ]
  },
  '2028-rep-primary': {
    title: '2028 Republican Presidential Primary',
    candidates: [
      { key: 'vance', name: 'JD Vance', color: '#D32F2F' },
      { key: 'trumpjr', name: 'Donald Trump Jr.', color: '#FF6D00' },
      { key: 'rubio', name: 'Marco Rubio', color: '#F9A825' },
      { key: 'cruz', name: 'Ted Cruz', color: '#00ACC1' },
      { key: 'haley', name: 'Nikki Haley', color: '#E91E8C' },
      { key: 'desantis', name: 'Ron DeSantis', color: '#2E7D32' },
      { key: 'rfk', name: 'RFK Jr.', color: '#9E9E9E' },
      { key: 'ramaswamy', name: 'Vivek Ramaswamy', color: '#8D4B2D' },
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