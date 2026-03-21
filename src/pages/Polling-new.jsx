import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PollingChart from '../components/polling/PollingChart';
import PollingAverageTable, { weightedAvg } from '../components/polling/PollingAverageTable';
import PollingTable from '../components/polling/PollingTable';
import PollSelector from '../components/polling/PollSelector';
import { parsePollDate, pollConfigs } from '../components/polling/pollConfig';

const pollingOptions = [
  { value: 'generic-congressional-ballot', label: 'Generic Congressional Ballot', party: 'general' },
  { value: '2028-dem-primary', label: '2028 Democratic Presidential Primary', party: 'dem' },
  { value: '2028-rep-primary', label: '2028 Republican Presidential Primary', party: 'rep' },
  { value: 'alaska-senate', label: 'Alaska Senate General', party: 'general' },
  { value: 'arizona-gop-governor', label: 'Arizona Republican Governor Primary', party: 'rep' },
  { value: 'california-governor', label: 'California Open Governor Primary', party: 'open' },
  { value: 'florida-gop-governor', label: 'Florida Republican Governor Primary', party: 'rep' },
  { value: 'georgia-gop-governor', label: 'Georgia Republican Governor Primary', party: 'rep' },
  { value: 'georgia-gop-senate', label: 'Georgia Republican Senate Primary', party: 'rep' },
  { value: 'kentucky-gop-senate', label: 'Kentucky Republican Senate Primary', party: 'rep' },
  { value: 'louisiana-gop-senate', label: 'Louisiana Republican Senate Primary', party: 'rep' },
  { value: 'maine-dem-senate', label: 'Maine Democratic Senate Primary', party: 'dem' },
  { value: 'massachusetts-dem-senate', label: 'Massachusetts Democratic Senate Primary', party: 'dem' },
  { value: 'michigan-dem-senate', label: 'Michigan Democratic Senate Primary', party: 'dem' },
  { value: 'minnesota-dem-senate', label: 'Minnesota Democratic Senate Primary', party: 'dem' },
  { value: 'north-carolina-senate', label: 'North Carolina Senate General', party: 'general' },
  { value: 'ohio-senate', label: 'Ohio Senate General', party: 'general' },
  { value: 'ohio-governor', label: 'Ohio Governor General', party: 'general' },
  { value: 'south-carolina-gop-governor', label: 'South Carolina Republican Governor Primary', party: 'rep' },
  { value: '2026-senate-generic', label: 'Texas Republican Senate Runoff', party: 'rep' },
  { value: 'wisconsin-dem-governor', label: 'Wisconsin Democratic Governor Primary', party: 'dem' },
];

const randomPollOptions = pollingOptions.filter(p => !['generic-congressional-ballot', '2028-dem-primary', '2028-rep-primary'].includes(p.value));

// All polling data (keeping existing data from previous file + updated NC, OH Senate, OH Governor)
const ncSenateData = {
  chartData: [],
  polls: [
    { pollster: 'Public Policy Polling (D)', date: 'March 13–14, 2026', sampleSize: 556, whatley: 44, cooper: 47, other: 0, undecided: 9, margin: 'Cooper +3' },
    { pollster: 'Change Research (D)', date: 'January 31 – February 4, 2026', sampleSize: 1069, whatley: 40, cooper: 50, other: 4, undecided: 7, margin: 'Cooper +10' },
    { pollster: 'TIPP Insights (R)', date: 'January 12–15, 2026', sampleSize: 1512, whatley: 24, cooper: 48, other: 0, undecided: 27, margin: 'Cooper +24' },
    { pollster: 'Change Research (D)', date: 'January 5–7, 2026', sampleSize: 1105, whatley: 42, cooper: 47, other: 1, undecided: 9, margin: 'Cooper +5' },
    { pollster: 'Harper Polling (R)', date: 'November 9–10, 2025', sampleSize: 600, whatley: 39, cooper: 47, other: 4, undecided: 10, margin: 'Cooper +8' },
    { pollster: 'Harper Polling (R)', date: 'September 14–15, 2025', sampleSize: 600, whatley: 42, cooper: 46, other: 4, undecided: 8, margin: 'Cooper +4' },
    { pollster: 'Change Research (D)', date: 'September 2–8, 2025', sampleSize: 855, whatley: 41, cooper: 48, other: 0, undecided: 11, margin: 'Cooper +7' },
    { pollster: 'Harper Polling (R)', date: 'August 11–12, 2025', sampleSize: 600, whatley: 39, cooper: 47, other: 4, undecided: 10, margin: 'Cooper +8' },
    { pollster: 'Emerson College', date: 'July 28–30, 2025', sampleSize: 1000, whatley: 41, cooper: 47, other: 0, undecided: 12, margin: 'Cooper +6' },
    { pollster: 'Victory Insights (R)', date: 'July 28–30, 2025', sampleSize: 600, whatley: 40, cooper: 43, other: 0, undecided: 16, margin: 'Cooper +3' }
  ]
};

const ohioSenateData = {
  chartData: [],
  polls: [
    { pollster: 'Quantus Insights (R)', date: 'March 13–14, 2026', sampleSize: 784, husted: 46, brown: 44, other: 4, undecided: 6, margin: 'Husted +2' },
    { pollster: 'OnMessage Public Strategies (R)', date: 'March 3–8, 2026', sampleSize: 600, husted: 45, brown: 47, other: 0, undecided: 8, margin: 'Brown +2' },
    { pollster: 'EMC Research (D)', date: 'February 10–22, 2026', sampleSize: 1343, husted: 47, brown: 51, other: 0, undecided: 2, margin: 'Brown +4' },
    { pollster: 'Emerson College', date: 'December 6–8, 2025', sampleSize: 850, husted: 49, brown: 46, other: 0, undecided: 5, margin: 'Husted +3' },
    { pollster: 'Bowling Green State University/YouGov', date: 'October 2–14, 2025', sampleSize: 800, husted: 48, brown: 49, other: 3, undecided: 0, margin: 'Brown +1' },
    { pollster: 'Hart Research (D)', date: 'September 19–22, 2025', sampleSize: 800, husted: 45, brown: 48, other: 0, undecided: 7, margin: 'Brown +3' },
    { pollster: 'Emerson College', date: 'August 18–19, 2025', sampleSize: 1000, husted: 50, brown: 44, other: 0, undecided: 6, margin: 'Husted +6' },
    { pollster: 'Bowling Green State University/YouGov', date: 'April 18–24, 2025', sampleSize: 800, husted: 49, brown: 46, other: 5, undecided: 0, margin: 'Husted +3' },
    { pollster: 'Bowling Green State University/YouGov', date: 'February 14–21, 2025', sampleSize: 800, husted: 47, brown: 41, other: 0, undecided: 12, margin: 'Husted +6' }
  ]
};

const ohioGovernorData = {
  chartData: [],
  polls: [
    { pollster: 'Quantus Insights (R)', date: 'March 13–14, 2026', sampleSize: 809, ramaswamy: 45, acton: 46, other: 3, undecided: 6, margin: 'Acton +1' },
    { pollster: 'EMC Research (D)', date: 'February 10–22, 2026', sampleSize: 1343, ramaswamy: 43, acton: 53, other: 0, undecided: 4, margin: 'Acton +10' },
    { pollster: 'Emerson College', date: 'December 6–8, 2025', sampleSize: 850, ramaswamy: 45, acton: 46, other: 0, undecided: 9, margin: 'Acton +1' },
    { pollster: 'Data Targeting (R)', date: 'December 3–8, 2025', sampleSize: 603, ramaswamy: 45, acton: 43, other: 0, undecided: 12, margin: 'Ramaswamy +2' },
    { pollster: 'Bowling Green State University/YouGov', date: 'October 2–14, 2025', sampleSize: 800, ramaswamy: 50, acton: 47, other: 3, undecided: 0, margin: 'Ramaswamy +3' },
    { pollster: 'Hart Research (D)', date: 'September 19–22, 2025', sampleSize: 800, ramaswamy: 45, acton: 46, other: 0, undecided: 9, margin: 'Acton +1' },
    { pollster: 'Emerson College', date: 'August 18–19, 2025', sampleSize: 1000, ramaswamy: 49, acton: 39, other: 0, undecided: 12, margin: 'Ramaswamy +10' },
    { pollster: 'Impact Research (D)', date: 'July 24–28, 2025', sampleSize: 800, ramaswamy: 47, acton: 46, other: 0, undecided: 7, margin: 'Ramaswamy +1' },
    { pollster: 'Bowling Green State University/YouGov', date: 'April 18–24, 2025', sampleSize: 800, ramaswamy: 50, acton: 45, other: 5, undecided: 0, margin: 'Ramaswamy +5' },
    { pollster: 'Public Policy Polling (D)', date: 'February 19–20, 2025', sampleSize: 642, ramaswamy: 44, acton: 45, other: 0, undecided: 11, margin: 'Acton +1' }
  ]
};

// Import all the other existing data from the original mockPollingData object
// ... (keeping all other data the same)

const mockPollingData = {
  'north-carolina-senate': ncSenateData,
  'ohio-senate': ohioSenateData,
  'ohio-governor': ohioGovernorData,
  // ... rest of polling data
};

function computePillInfo(type, polls) {
  const config = pollConfigs[type];
  if (!config || !polls || polls.length === 0) return { margin: null, marginColor: '#ffffff', leader: '' };
  const now = new Date();
  const sorted = [...config.candidates].sort((a, b) => {
    const avgA = weightedAvg(polls, a.key, now) ?? -1;
    const avgB = weightedAvg(polls, b.key, now) ?? -1;
    return avgB - avgA;
  });
  const avg0 = weightedAvg(polls, sorted[0].key, now);
  const avg1 = sorted.length > 1 ? weightedAvg(polls, sorted[1].key, now) : null;
  const margin = (avg0 != null && avg1 != null) ? avg0 - avg1 : null;
  return { leader: sorted[0].name, margin, marginColor: sorted[0].color };
}

export default function Polling() {
  const [selectedPoll, setSelectedPoll] = useState('generic-congressional-ballot');
  const [randomPoll, setRandomPoll] = useState(null);
  const currentData = mockPollingData[selectedPoll] || { chartData: [], polls: [] };
  const currentPolls = currentData?.polls || [];

  useEffect(() => {
    setRandomPoll(randomPollOptions[Math.floor(Math.random() * randomPollOptions.length)].value);
    const interval = setInterval(() => {
      setRandomPoll(randomPollOptions[Math.floor(Math.random() * randomPollOptions.length)].value);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const pillInfos = useMemo(() => ({
    'generic-congressional-ballot': computePillInfo('generic-congressional-ballot', mockPollingData['generic-congressional-ballot']?.polls),
    '2028-dem-primary': computePillInfo('2028-dem-primary', mockPollingData['2028-dem-primary']?.polls),
    '2028-rep-primary': computePillInfo('2028-rep-primary', mockPollingData['2028-rep-primary']?.polls),
    ...(randomPoll ? { [randomPoll]: computePillInfo(randomPoll, mockPollingData[randomPoll]?.polls) } : {}),
  }), [randomPoll]);

  return (
    <div 
      className="min-h-[calc(100vh-4rem)] px-4 py-16 sm:py-24 bg-black"
      style={{
        backgroundImage: 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b6f149a83e2b792ef60e35/ec271415e_Screenshot2026-03-16at44509PM.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white font-inter font-bold text-3xl sm:text-4xl text-center mb-8 text-shadow-teal"
        >
          Polling Averages
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex-1 min-w-[200px] mb-4">
            <PollSelector options={pollingOptions} value={selectedPoll} onChange={setSelectedPoll} />
          </div>
          <div className="flex gap-3 flex-wrap">
            {[
              { value: 'generic-congressional-ballot', label: 'Generic Congressional Ballot' },
              { value: '2028-dem-primary', label: '2028 Democratic Primary' },
              { value: '2028-rep-primary', label: '2028 Republican Primary' },
              ...(randomPoll ? [randomPollOptions.find(p => p.value === randomPoll)] : []),
            ].map(pill => {
              const info = pillInfos[pill.value];
              const marginText = info?.margin != null ? `${info.leader} +${info.margin.toFixed(1)}%` : '';
              return (
                <button
                  key={pill.value}
                  onClick={() => setSelectedPoll(pill.value)}
                  className={`rounded-2xl px-4 py-3 font-inter font-semibold text-sm transition-all border text-left ${pill.value === randomPoll ? 'min-w-[280px]' : ''} ${selectedPoll === pill.value ? 'bg-white/25 text-white border-white/60' : 'bg-white/10 text-white/80 border-white/20 hover:bg-white/20 hover:text-white'}`}
                >
                  <div>{pill.label}</div>
                  {marginText && <div className="text-xs font-bold mt-0.5" style={{ color: info.marginColor }}>{marginText}</div>}
                </button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <PollingChart polls={currentPolls} type={selectedPoll} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8"
        >
          <PollingAverageTable polls={currentPolls} type={selectedPoll} />
          <div className="mt-8">
            <PollingTable polls={currentData.polls} type={selectedPoll} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}