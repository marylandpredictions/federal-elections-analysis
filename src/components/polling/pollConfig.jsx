export function parsePollDate(dateStr) {
  if (!dateStr) return new Date(0);
  let s = dateStr.replace(/[–—]/g, '-').trim();
  s = s.replace(/Mid-/i, '');

  // Last "Month Day, Year" at end of string (handles "Jan 4, 26" too)
  const m = s.match(/([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{2,4})\s*$/);
  if (m) {
    const year = m[3].length === 2 ? '20' + m[3] : m[3];
    return new Date(`${m[1]} ${m[2]}, ${year}`);
  }

  // "March 7-8, 2026" - same month range, take last day
  const m2 = s.match(/([A-Za-z]+)\s+\d+\s*-\s*(\d+),?\s*(\d{4})/);
  if (m2) return new Date(`${m2[1]} ${m2[2]}, ${m2[3]}`);

  // "April 2025"
  const m3 = s.match(/([A-Za-z]+)\s+(\d{4})/);
  if (m3) return new Date(`${m3[1]} 15, ${m3[2]}`);

  return new Date(0);
}

export const pollConfigs = {
  'generic-congressional-ballot': {
    title: 'Generic Congressional Ballot',
    candidates: [
      { key: 'democrat', name: 'Democrat', color: '#0047AB' },
      { key: 'republican', name: 'Republican', color: '#8B0000' },
    ]
  },
  '2026-senate-generic': {
    title: 'Texas Republican Senate Runoff',
    candidates: [
      { key: 'cornyn', name: 'John Cornyn', color: '#8B0000' },
      { key: 'paxton', name: 'Ken Paxton', color: '#CC5500' },
    ]
  },
  'illinois-dem-primary': {
    title: 'Illinois Democratic Senate Primary',
    candidates: [
      { key: 'raja', name: 'Raja Krishnamoorthi', color: '#0047AB' },
      { key: 'stratton', name: 'Juliana Stratton', color: '#006400' },
      { key: 'kelly', name: 'Robin Kelly', color: '#008080' },
    ]
  },
  'illinois-9th-house': {
    title: 'Illinois 9th Democratic House Primary',
    candidates: [
      { key: 'biss', name: 'Daniel Biss', color: '#008080' },
      { key: 'fine', name: 'Laura Fine', color: '#8B0000' },
      { key: 'abughazaleh', name: 'Kat Abughazaleh', color: '#C71585' },
      { key: 'simmons', name: 'Mike Simmons', color: '#006400' },
      { key: 'amiwala', name: 'Bushra Amiwala', color: '#4B0082' },
      { key: 'andrew', name: 'Phil Andrew', color: '#FFD700' },
    ]
  },
  'florida-gop-governor': {
    title: 'Florida Republican Governor Primary',
    candidates: [
      { key: 'donalds', name: 'Byron Donalds', color: '#8B0000' },
      { key: 'fishback', name: 'James Fishback', color: '#FF6600' },
      { key: 'collins', name: 'Jay Collins', color: '#C71585' },
      { key: 'renner', name: 'Paul Renner', color: '#DAA520' },
    ]
  },
  'georgia-gop-governor': {
    title: 'Georgia Republican Governor Primary',
    candidates: [
      { key: 'jones', name: 'Burt Jones', color: '#8B0000' },
      { key: 'jackson', name: 'Rick Jackson', color: '#C71585' },
      { key: 'raffensperger', name: 'Brad Raffensperger', color: '#DAA520' },
      { key: 'carr', name: 'Chris Carr', color: '#FF6600' },
    ]
  },
  'south-carolina-gop-governor': {
    title: 'South Carolina Republican Governor Primary',
    candidates: [
      { key: 'mace', name: 'Nancy Mace', color: '#8B0000' },
      { key: 'wilson', name: 'Alan Wilson', color: '#006400' },
      { key: 'evette', name: 'Pamela Evette', color: '#C71585' },
      { key: 'norman', name: 'Ralph Norman', color: '#FF6600' },
    ]
  },
};

export function computeChartData(polls, type) {
  const config = pollConfigs[type];
  if (!config || !polls || polls.length === 0) return [];

  const candidates = config.candidates;
  const r = 2.5;

  // Sort polls by parsed date ascending
  const sorted = [...polls].sort((a, b) => parsePollDate(a.date) - parsePollDate(b.date));

  const result = [];
  sorted.forEach((poll, idx) => {
    const ts = parsePollDate(poll.date).getTime();
    if (!ts || ts <= 0) return;

    const pollsUpTo = sorted.slice(0, idx + 1);
    const point = { timestamp: ts };

    candidates.forEach(c => {
      const values = pollsUpTo
        .map(p => p[c.key])
        .filter(v => v !== undefined && v !== null && v > 0);

      if (values.length > 0) {
        const mean = values.reduce((a, b) => a + b, 0) / values.length;
        point[c.key] = mean;
        point[`${c.key}Min`] = Math.max(0, mean - r);
        point[`${c.key}Max`] = Math.min(100, mean + r);
      }
    });

    result.push(point);
  });

  return result;
}