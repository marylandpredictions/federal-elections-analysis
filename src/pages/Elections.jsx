import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const BG = 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b6f149a83e2b792ef60e35/ec271415e_Screenshot2026-03-16at44509PM.png)';

export const electionsData = [
  {
    id: 'wi-supreme-court-2026',
    state: 'Wisconsin',
    stateAbbr: 'WI',
    stateIcon: 'https://media.base44.com/images/public/69b6f149a83e2b792ef60e35/8083f15d5_FEABLMLogo.png',
    electionType: 'Supreme Court',
    date: '4/7/26',
    candidates: [
      { name: 'Maria Lazar', party: 'NPA', color: '#FCA5A5' },
      { name: 'Chris Taylor', party: 'NPA', color: '#93C5FD' },
    ],
    preview: 'In the race to replace retiring conservative-aligning Wisconsin Supreme Court Justice Rebecca Bradley, liberal-aligned judge Chris Taylor is likely to win...',
    fullDescription: `In the race to replace retiring conservative-aligning Wisconsin Supreme Court Justice Rebecca Bradley, liberal-aligned judge Chris Taylor is likely to win against her right-wing opponent, Maria Lazar. In last year's supreme court election located in the swing state, liberal candidate Susan Crawford beat MAGA funded Brad Schimel by over double digits in a state that Trump carried in 2024, even with Elon Musk pouring millions into the race. Without Elon Musk's financial backing this time around and a much more low-profile race and a different environment, can conservatives hold this seat or will the liberals pull of another massive victory, potentially outrunning their 2025 result?`,
  },
  {
    id: 'ga-house-14-special-runoff-2026',
    state: 'Georgia',
    stateAbbr: 'GA',
    stateIcon: 'https://media.base44.com/images/public/69b6f149a83e2b792ef60e35/6bb4c1ac8_FEABLMLogo1.png',
    electionType: 'U.S. House 14th Special Runoff',
    date: '4/7/26',
    candidates: [
      { name: 'Clay Fuller', party: 'R', color: '#FCA5A5' },
      { name: 'Shawn Harris', party: 'D', color: '#93C5FD' },
    ],
    preview: 'After the first round on March 10th to replace MTG, no candidate hit 50%+1. Clay Fuller (R, 34.9%) and Shawn Harris (D, 37.3%) advance to the runoff...',
    fullDescription: `After the first round election held on March 10th to replace Marjorie Taylor Greene, there was no candidate who achieved 50% + 1 votes. This meant that the top two candidates in this race would advance. That would be Democrat Shawn Harris, MTG's 2024 opponent who lost by over 30% in this super republican district, that came out on top of the massive field of candidates with 37.3% of the vote and Trump endorsed Clay Fuller who grasped 34.9% of the vote in the first round. We have seen some massive Democratic overperformances in special state legislative and U.S. House elections but none of those come near to the 28.7 percentage gap that Harris must hurdle to become the next representative from the Peach State.`,
  },
];

export default function Elections() {
  const navigate = useNavigate();

  const aprilElections = electionsData.filter(e => e.date.startsWith('4/'));

  return (
    <div
      className="min-h-[calc(100vh-4rem)] px-4 py-16 sm:py-24"
      style={{ backgroundImage: BG, backgroundSize: 'cover', backgroundPosition: 'center' }}
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

        {/* April separator */}
        {aprilElections.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-white font-inter font-extrabold text-5xl sm:text-6xl mb-6 relative inline-block group cursor-default">
              April
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </h2>

            <div className="space-y-4">
              {aprilElections.map((election, i) => (
                <motion.div
                  key={election.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 cursor-pointer hover:bg-white/20 transition-all duration-200 border border-white/10"
                  onClick={() => navigate(`/ElectionDetail/${election.id}`)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      {/* Row 1: State */}
                      <div className="mb-1">
                        <span className="text-white font-inter font-bold text-2xl leading-tight relative inline-block group cursor-default">
                          {election.state}
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </div>
                      {/* Row 2: Election type */}
                      <div className="mb-0.5">
                        <span className="text-white font-inter font-bold text-base relative inline-block group cursor-default">
                          {election.electionType}
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </div>
                      {/* Row 3: Date */}
                      <div className="mb-2">
                        <span className="text-white font-inter font-bold text-sm relative inline-block group cursor-default">
                          {election.date}
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </div>
                      {/* Candidates */}
                      <div className="flex gap-3 flex-wrap mb-2">
                        {election.candidates.map(c => (
                          <span key={c.name} className="font-inter text-sm font-medium" style={{ color: c.color }}>
                            {c.name} ({c.party})
                          </span>
                        ))}
                      </div>
                      {/* Preview text - 2 lines */}
                      <p className="text-white/70 font-inter text-sm line-clamp-2">{election.preview}</p>
                    </div>
                    {/* State icon aligned to top-right */}
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
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}