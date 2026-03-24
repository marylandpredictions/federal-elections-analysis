import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';



const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export const electionsData = [
  {
    id: 'wi-supreme-court-2026',
    state: 'Wisconsin',
    stateAbbr: 'WI',
    stateIcon: 'https://media.base44.com/images/public/69b6f149a83e2b792ef60e35/8083f15d5_FEABLMLogo.png',
    electionType: 'Supreme Court',
    date: '4/7/26',
    candidates: [
      { name: 'Maria Lazar', party: 'NPA', color: '#D97706' },
      { name: 'Chris Taylor', party: 'NPA', color: '#0D9488' },
    ],
    preview: 'In the race to replace retiring conservative-aligning Wisconsin Supreme Court Justice Rebecca Bradley, liberal-aligned judge Chris Taylor is likely to win...',
    fullDescription: `In the race to replace retiring conservative-aligning Wisconsin Supreme Court Justice Rebecca Bradley, liberal-aligned judge Chris Taylor is likely to win against her right-wing opponent, Maria Lazar. In last year's supreme court election located in the swing state, liberal candidate Susan Crawford beat MAGA funded Brad Schimel by over double digits in a state that Trump carried in 2024, even with Elon Musk pouring millions into the race. Without Elon Musk's financial backing this time around and a much more low-profile race and a different environment, can conservatives hold this seat or will the liberals pull of another massive victory, potentially outrunning their 2025 result?`,
    forecast: {
      leftLabel: 'Chris Taylor',
      leftChance: 57,
      rightLabel: 'Maria Lazar',
      rightChance: 43,
      leftColor: '#0D9488',
      rightColor: '#D97706',
    },
    probability: {
      leftLabel: 'Chris Taylor',
      leftChance: 68,
      rightLabel: 'Maria Lazar',
      rightChance: 32,
      leftColor: '#0D9488',
      rightColor: '#D97706',
    },
  },
  {
    id: 'ga-house-14-special-runoff-2026',
    state: 'Georgia',
    stateAbbr: 'GA',
    stateIcon: 'https://media.base44.com/images/public/69b6f149a83e2b792ef60e35/6bb4c1ac8_FEABLMLogo1.png',
    electionType: 'U.S. House 14th Special Runoff',
    date: '4/7/26',
    candidates: [
      { name: 'Clay Fuller', party: 'R', color: '#DC2626' },
      { name: 'Shawn Harris', party: 'D', color: '#2563EB' },
    ],
    preview: 'After the first round on March 10th to replace MTG, no candidate hit 50%+1. Clay Fuller (R, 34.9%) and Shawn Harris (D, 37.3%) advance to the runoff...',
    fullDescription: `After the first round election held on March 10th to replace Marjorie Taylor Greene, there was no candidate who achieved 50% + 1 votes. This meant that the top two candidates in this race would advance. That would be Democrat Shawn Harris, MTG's 2024 opponent who lost by over 30% in this super republican district, that came out on top of the massive field of candidates with 37.3% of the vote and Trump endorsed Clay Fuller who grasped 34.9% of the vote in the first round. We have seen some massive Democratic overperformances in special state legislative and U.S. House elections but none of those come near to the 28.7 percentage gap that Harris must hurdle to become the next representative from the Peach State.`,
    forecast: {
      leftLabel: 'Clay Fuller',
      leftChance: 59,
      rightLabel: 'Shawn Harris',
      rightChance: 41,
      leftColor: '#DC2626',
      rightColor: '#2563EB',
    },
    probability: {
      leftLabel: 'Shawn Harris',
      leftChance: 8,
      rightLabel: 'Clay Fuller',
      rightChance: 92,
      leftColor: '#2563EB',
      rightColor: '#DC2626',
    },
  },
  {
    id: 'nj-house-11-special-2026',
    state: 'New Jersey',
    stateAbbr: 'NJ',
    stateIcon: 'https://media.base44.com/images/public/69b6f149a83e2b792ef60e35/af81ba1c4_FEABLMLogo2.png',
    electionType: 'U.S. House 11th Special Election',
    date: '4/16/26',
    candidates: [
      { name: 'Joe Hathaway', party: 'R', color: '#DC2626' },
      { name: 'Analilia Mejia', party: 'D', color: '#2563EB' },
    ],
    preview: 'Analilia Mejia came on top after an extremely divisive Democratic primary to replace now New Jersey Governor Mikie Sherrill, facing off against Joe Hathaway (R) in this solid blue district...',
    fullDescription: `Analilia Mejia, who came on top after an extremely divisive democratic primary to replace now New Jersey Governor Mikie Sherrill, will be the Democratic nominee in this district. She is likely to join the progressive squad once in congress as this is a solid blue district. However, Joe Hathaway is not giving up so fast, he has challenged Mejia to numerous debates and is distancing himself from the President. Hathaway maintains a solid MAGA agenda just not incorporating it completely into the platform. Even so, Mejia is still likely to win as this district went to Sherrill by double digits in 2024.`,
    forecast: {
      leftLabel: 'Analilia Mejia',
      leftChance: 64,
      rightLabel: 'Joe Hathaway',
      rightChance: 36,
      leftColor: '#2563EB',
      rightColor: '#DC2626',
    },
    probability: {
      leftLabel: 'Analilia Mejia',
      leftChance: 98,
      rightLabel: 'Joe Hathaway',
      rightChance: 2,
      leftColor: '#2563EB',
      rightColor: '#DC2626',
    },
  },
  {
    id: 'va-redistricting-amendment-2026',
    state: 'Virginia',
    stateAbbr: 'VA',
    stateIcon: 'https://media.base44.com/images/public/69b6f149a83e2b792ef60e35/1b45c9e0f_FEABLMLogo3.png',
    electionType: 'Redistricting Amendment',
    date: '4/21/26',
    candidates: [
      { name: 'Yes', party: '', color: '#16A34A' },
      { name: 'No', party: '', color: '#DC2626' },
    ],
    preview: 'Virginia voters will decide on a redistricting amendment that would shift the congressional map from a 6-5 Democratic edge to a massive 10-1 edge, bypassing the independent redistricting commission until 2030...',
    fullDescription: `Joining in on the redistricting wars this cycle, Virginia, like California has left it up to their voters to decide. This map would make the district make up of Virginia go from a 6-5 edge for Democrats to a massive 10-1 edge. It would not let the independent redistricting commission, which usually draws districts in this state, draw the maps until the next redistricting cycle in 2030. This race is crucial for both parties in their pursuit of control to the House. In a state that voted for Kamala Harris by just 5.8%, can they convince the voters to gerrymander their maps?`,
    forecast: {
      leftLabel: 'Yes',
      leftChance: 56,
      rightLabel: 'No',
      rightChance: 44,
      leftColor: '#16A34A',
      rightColor: '#DC2626',
    },
    probability: {
      leftLabel: 'Yes',
      leftChance: 86,
      rightLabel: 'No',
      rightChance: 14,
      leftColor: '#16A34A',
      rightColor: '#DC2626',
    },
  },
];

function getMonthKey(dateStr) {
  if (!dateStr || dateStr === 'TBD') return null;
  const parts = dateStr.split('/');
  const m = parseInt(parts[0]);
  const y = parseInt('20' + parts[2]);
  return { key: `${y}-${String(m).padStart(2,'0')}`, monthName: MONTHS[m - 1], year: y };
}

function getDateLabel(dateStr) {
  if (!dateStr || dateStr === 'TBD') return null;
  const parts = dateStr.split('/');
  return `${MONTHS[parseInt(parts[0]) - 1]} ${parts[1]}`;
}

export default function Elections() {
  const navigate = useNavigate();

  // Group elections by month, then by date
  const monthMap = {};
  const tbdElections = [];

  electionsData.forEach(e => {
    const info = getMonthKey(e.date);
    if (!info) {
      tbdElections.push(e);
      return;
    }
    if (!monthMap[info.key]) monthMap[info.key] = { monthName: info.monthName, year: info.year, dateGroups: {} };
    const dl = getDateLabel(e.date);
    if (!monthMap[info.key].dateGroups[dl]) monthMap[info.key].dateGroups[dl] = [];
    monthMap[info.key].dateGroups[dl].push(e);
  });

  const sortedMonths = Object.keys(monthMap).sort();

  const renderCard = (election, i) => (
    <motion.div
      key={election.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 + i * 0.05 }}
      className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 cursor-pointer hover:bg-white/20 transition-all duration-200 border border-white/10"
      onClick={() => navigate(`/ElectionDetail/${election.id}`)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="mb-1">
            <span className="text-white font-inter font-bold text-2xl leading-tight relative inline-block group cursor-default">
              {election.state}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </span>
          </div>
          <div className="mb-0.5">
            <span className="text-white font-inter font-bold text-base relative inline-block group cursor-default">
              {election.electionType}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </span>
          </div>
          <div className="flex gap-3 flex-wrap mb-2 mt-1">
            {election.candidates.map(c => (
              <span key={c.name} className="font-inter text-sm font-semibold" style={{ color: c.color }}>
                {c.name}{c.party ? ` (${c.party})` : ''}
              </span>
            ))}
          </div>
          <p className="text-white/70 font-inter text-sm line-clamp-2">{election.preview}</p>
        </div>
        {election.stateIcon && (
          <img
            src={election.stateIcon}
            alt={election.state}
            className="flex-shrink-0 object-contain opacity-80"
            style={{ width: '48px', height: '48px', marginTop: '2px' }}
          />
        )}
      </div>
    </motion.div>
  );

  let cardIndex = 0;

  return (
    <div
      className="min-h-[calc(100vh-4rem)] px-4 py-16 sm:py-24"

    >
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white font-inter font-bold text-3xl sm:text-4xl text-center mb-12 text-shadow-teal"
        >
          Upcoming Elections
        </motion.h1>

        {sortedMonths.map(mKey => {
          const { monthName, dateGroups } = monthMap[mKey];
          const sortedDates = Object.keys(dateGroups).sort((a, b) => {
            const [am, ad] = a.split(' ');
            const [bm, bd] = b.split(' ');
            return MONTHS.indexOf(am) * 31 + parseInt(ad) - (MONTHS.indexOf(bm) * 31 + parseInt(bd));
          });

          return (
            <motion.div
              key={mKey}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-10"
            >
              <h2 className="text-white font-inter font-extrabold text-5xl sm:text-6xl mb-4 relative inline-block group cursor-default">
                {monthName}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </h2>

              {sortedDates.map(dateLabel => {
                const elections = dateGroups[dateLabel];
                return (
                  <div key={dateLabel} className="mb-6">
                    <h3 className="text-white font-inter font-bold text-xl sm:text-2xl mb-3 relative inline-block group cursor-default">
                      {dateLabel}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </h3>
                    <div className="space-y-4">
                      {elections.map(e => renderCard(e, cardIndex++))}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          );
        })}

        {tbdElections.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-10"
          >
            <h2 className="text-white font-inter font-extrabold text-5xl sm:text-6xl mb-4 relative inline-block group cursor-default">
              TBD
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </h2>
            <div className="space-y-4">
              {tbdElections.map(e => renderCard(e, cardIndex++))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}