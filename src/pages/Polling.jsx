import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PollingChart from '../components/polling/PollingChart';
import PollingTable from '../components/polling/PollingTable';

const pollingOptions = [
  { value: '2026-senate-generic', label: '2026 Senate Generic Ballot' },
  { value: '2026-house-generic', label: '2026 House Generic Ballot' },
  { value: 'presidential-approval', label: 'Presidential Approval Rating' },
  { value: 'congress-approval', label: 'Congress Approval Rating' }
];

const mockPollingData = {
  '2026-senate-generic': {
    chartData: [
      { date: '2025-01-05', cornyn: 33, paxton: 44, cornyinMin: 28, cornyinMax: 38, paxtonMin: 39, paxtonMax: 49 },
      { date: '2025-02-09', cornyn: 38, paxton: 50, cornyinMin: 33, cornyinMax: 43, paxtonMin: 45, paxtonMax: 55 },
      { date: '2025-03-07', cornyn: 27, paxton: 38, cornyinMin: 22, cornyinMax: 32, paxtonMin: 33, paxtonMax: 43 },
      { date: '2025-04-15', cornyn: 33, paxton: 50, cornyinMin: 28, cornyinMax: 38, paxtonMin: 45, paxtonMax: 55 },
      { date: '2025-05-11', cornyn: 39, paxton: 52, cornyinMin: 34, cornyinMax: 44, paxtonMin: 47, paxtonMax: 57 },
      { date: '2025-06-06', cornyn: 33, paxton: 49, cornyinMin: 28, cornyinMax: 38, paxtonMin: 44, paxtonMax: 54 },
      { date: '2025-07-16', cornyn: 36, paxton: 47, cornyinMin: 31, cornyinMax: 41, paxtonMin: 42, paxtonMax: 52 },
      { date: '2025-08-11', cornyn: 30, paxton: 29, cornyinMin: 25, cornyinMax: 35, paxtonMin: 24, paxtonMax: 34 },
      { date: '2025-09-17', cornyn: 39, paxton: 37, cornyinMin: 34, cornyinMax: 44, paxtonMin: 32, paxtonMax: 42 },
      { date: '2025-10-28', cornyn: 36, paxton: 39, cornyinMin: 31, cornyinMax: 41, paxtonMin: 34, paxtonMax: 44 },
      { date: '2025-11-13', cornyn: 45, paxton: 41, cornyinMin: 40, cornyinMax: 50, paxtonMin: 36, paxtonMax: 46 },
      { date: '2025-12-01', cornyn: 34, paxton: 44, cornyinMin: 29, cornyinMax: 39, paxtonMin: 39, paxtonMax: 49 },
      { date: '2026-01-05', cornyn: 33, paxton: 44, cornyinMin: 28, cornyinMax: 38, paxtonMin: 39, paxtonMax: 49 },
      { date: '2026-01-31', cornyn: 40, paxton: 41, cornyinMin: 35, cornyinMax: 45, paxtonMin: 36, paxtonMax: 46 },
      { date: '2026-02-23', cornyn: 36, paxton: 49, cornyinMin: 31, cornyinMax: 41, paxtonMin: 44, paxtonMax: 54 },
      { date: '2026-03-07', cornyn: 41, paxton: 49, cornyinMin: 36, cornyinMax: 46, paxtonMin: 44, paxtonMax: 54 }
    ],
    polls: [
      { pollster: 'Slingshot Strategies (D)', date: 'March 7–8, 2026', sampleSize: 781, cornyn: 41, paxton: 49, other: 0, undecided: 10, margin: 'Paxton +8' },
      { pollster: 'Public Policy Polling (D)', date: 'March 5–6, 2026', sampleSize: 565, cornyn: 42, paxton: 45, other: 0, undecided: 12, margin: 'Paxton +3' },
      { pollster: 'Blueprint Polling (D)', date: 'February 23–24, 2026', sampleSize: 529, cornyn: 36, paxton: 49, other: 0, undecided: 15, margin: 'Paxton +13' },
      { pollster: 'McLaughlin & Associates (R)', date: 'February 9–12, 2026', sampleSize: 800, cornyn: 38, paxton: 50, other: 0, undecided: 12, margin: 'Paxton +12' },
      { pollster: 'J.L. Partners (R)', date: 'January 31 – February 3, 2026', sampleSize: 600, cornyn: 40, paxton: 41, other: 0, undecided: 19, margin: 'Paxton +1' },
      { pollster: 'University of Houston/YouGov', date: 'January 20–31, 2026', sampleSize: 550, cornyn: 40, paxton: 51, other: 0, undecided: 9, margin: 'Paxton +11' },
      { pollster: 'Harper Polling (R)', date: 'January 5–7, 2026', sampleSize: 600, cornyn: 33, paxton: 44, other: 0, undecided: 23, margin: 'Paxton +11' },
      { pollster: 'McLaughlin & Associates (R)', date: 'December 1–4, 2025', sampleSize: 800, cornyn: 40, paxton: 44, other: 0, undecided: 12, margin: 'Paxton +4' },
      { pollster: 'Public Policy Polling (D)', date: 'December 1–2, 2025', sampleSize: 527, cornyn: 34, paxton: 44, other: 0, undecided: 22, margin: 'Paxton +10' },
      { pollster: 'Ragnar Research Partners (R)', date: 'November 13–16, 2025', sampleSize: 758, cornyn: 45, paxton: 41, other: 0, undecided: 14, margin: 'Cornyn +4' },
      { pollster: 'Stratus Intelligence (R)', date: 'November 4–6, 2025', sampleSize: 811, cornyn: 38, paxton: 46, other: 0, undecided: 16, margin: 'Paxton +8' },
      { pollster: 'Harper Polling (R)', date: 'October 28–30, 2025', sampleSize: 614, cornyn: 36, paxton: 39, other: 0, undecided: 25, margin: 'Paxton +3' },
      { pollster: 'Stratus Intelligence (R)', date: 'October 4–6, 2025', sampleSize: 0, cornyn: 43, paxton: 46, other: 0, undecided: 11, margin: 'Paxton +3' },
      { pollster: 'University of Houston/Texas Southern University', date: 'September 19 – October 1, 2025', sampleSize: 576, cornyn: 44, paxton: 43, other: 0, undecided: 13, margin: 'Cornyn +1' },
      { pollster: 'UT Tyler', date: 'September 17–24, 2025', sampleSize: 493, cornyn: 39, paxton: 37, other: 0, undecided: 23, margin: 'Cornyn +2' },
      { pollster: 'Ragnar Research Partners (R)', date: 'September 20–22, 2025', sampleSize: 0, cornyn: 39, paxton: 39, other: 0, undecided: 22, margin: 'Tie' },
      { pollster: 'Stratus Intelligence (R)', date: 'September 14–16, 2025', sampleSize: 0, cornyn: 44, paxton: 44, other: 0, undecided: 12, margin: 'Tie' },
      { pollster: 'Texas Public Opinion Research', date: 'August 27–29, 2025', sampleSize: 320, cornyn: 32, paxton: 26, other: 13, undecided: 29, margin: 'Cornyn +6' },
      { pollster: 'co/efficient (R)', date: 'August 25–27, 2025', sampleSize: 818, cornyn: 36, paxton: 39, other: 0, undecided: 25, margin: 'Paxton +3' },
      { pollster: 'Stratus Intelligence (R)', date: 'August 24–26, 2025', sampleSize: 0, cornyn: 41, paxton: 48, other: 0, undecided: 11, margin: 'Paxton +7' },
      { pollster: 'Echelon Insights', date: 'August 21–24, 2025', sampleSize: 515, cornyn: 37, paxton: 42, other: 0, undecided: 21, margin: 'Paxton +5' },
      { pollster: 'Emerson College', date: 'August 11–12, 2025', sampleSize: 491, cornyn: 30, paxton: 29, other: 5, undecided: 36, margin: 'Cornyn +1' },
      { pollster: 'Texas Southern University', date: 'August 6–12, 2025', sampleSize: 1500, cornyn: 39, paxton: 44, other: 0, undecided: 17, margin: 'Paxton +5' },
      { pollster: 'Stratus Intelligence (R)', date: 'August 4–6, 2025', sampleSize: 0, cornyn: 42, paxton: 45, other: 0, undecided: 13, margin: 'Paxton +3' },
      { pollster: 'Stratus Intelligence (R)', date: 'July 16–18, 2025', sampleSize: 0, cornyn: 36, paxton: 47, other: 0, undecided: 17, margin: 'Paxton +11' },
      { pollster: 'Pulse Decision Science (R)', date: 'June 17–22, 2025', sampleSize: 806, cornyn: 38, paxton: 57, other: 0, undecided: 5, margin: 'Paxton +19' },
      { pollster: 'Stratus Intelligence (R)', date: 'June 8–10, 2025', sampleSize: 0, cornyn: 33, paxton: 49, other: 0, undecided: 18, margin: 'Paxton +16' },
      { pollster: 'UT Tyler', date: 'May 28 – June 7, 2025', sampleSize: 538, cornyn: 34, paxton: 44, other: 0, undecided: 22, margin: 'Paxton +10' },
      { pollster: 'Stratus Intelligence (R)', date: 'June 6–8, 2025', sampleSize: 600, cornyn: 33, paxton: 49, other: 0, undecided: 18, margin: 'Paxton +16' },
      { pollster: 'UpONE Insights (R)', date: 'May 27–28, 2025', sampleSize: 600, cornyn: 28, paxton: 50, other: 0, undecided: 21, margin: 'Paxton +22' },
      { pollster: 'YouGov/Texas Southern University', date: 'May 9–19, 2025', sampleSize: 510, cornyn: 34, paxton: 43, other: 0, undecided: 23, margin: 'Paxton +9' },
      { pollster: 'Quantus Insights (R)', date: 'May 11–13, 2025', sampleSize: 600, cornyn: 39, paxton: 52, other: 0, undecided: 9, margin: 'Paxton +13' },
      { pollster: 'American Opportunity Alliance (R)', date: 'April 29 – May 1, 2025', sampleSize: 800, cornyn: 35, paxton: 52, other: 0, undecided: 13, margin: 'Paxton +17' },
      { pollster: 'The Tarrance Group (R)', date: 'April 27 – May 1, 2025', sampleSize: 0, cornyn: 40, paxton: 56, other: 0, undecided: 0, margin: 'Paxton +16' },
      { pollster: 'Stratus Intelligence (R)', date: 'April 29–30, 2025', sampleSize: 0, cornyn: 33, paxton: 48, other: 0, undecided: 19, margin: 'Paxton +15' },
      { pollster: 'Stratus Intelligence (R)', date: 'April 15–17, 2025', sampleSize: 0, cornyn: 33, paxton: 50, other: 0, undecided: 17, margin: 'Paxton +17' },
      { pollster: 'Internal Republican Party poll', date: 'Mid–April 2025', sampleSize: 605, cornyn: 33, paxton: 50, other: 0, undecided: 17, margin: 'Paxton +17' },
      { pollster: 'Stratus Intelligence (R)', date: 'March 23–25, 2025', sampleSize: 0, cornyn: 35, paxton: 52, other: 0, undecided: 13, margin: 'Paxton +17' },
      { pollster: 'Lake Research Partners (D)/Slingshot Strategies (D)', date: 'March 7–10, 2025', sampleSize: 0, cornyn: 27, paxton: 38, other: 19, undecided: 16, margin: 'Paxton +11' },
      { pollster: 'Fabrizio, Lee & Associates (R)', date: 'January 28 – February 2, 2025', sampleSize: 0, cornyn: 28, paxton: 53, other: 0, undecided: 19, margin: 'Paxton +25' },
      { pollster: 'Victory Insights (R)', date: 'January 4–6, 2025', sampleSize: 600, cornyn: 34, paxton: 42, other: 0, undecided: 25, margin: 'Paxton +8' }
    ]
  },
  '2026-house-generic': {
    chartData: [
      { date: '2026-01-15', democrat: 44, republican: 49 },
      { date: '2026-02-01', democrat: 45, republican: 48 },
      { date: '2026-02-15', democrat: 43, republican: 50 },
      { date: '2026-03-01', democrat: 44, republican: 49 },
      { date: '2026-03-15', democrat: 45, republican: 48 }
    ],
    polls: [
      { pollster: 'ABC News/Washington Post', date: '3/15/2026', sampleSize: 1502, democrat: 45, republican: 48, margin: 'R+3' },
      { pollster: 'CNN/SSRS', date: '3/12/2026', sampleSize: 1234, democrat: 44, republican: 49, margin: 'R+5' }
    ]
  },
  'presidential-approval': {
    chartData: [
      { date: '2026-01-15', approve: 42, disapprove: 53 },
      { date: '2026-02-01', approve: 43, disapprove: 52 },
      { date: '2026-02-15', approve: 41, disapprove: 54 },
      { date: '2026-03-01', approve: 42, disapprove: 53 },
      { date: '2026-03-15', approve: 43, disapprove: 52 }
    ],
    polls: [
      { pollster: 'Gallup', date: '3/15/2026', sampleSize: 1502, approve: 43, disapprove: 52, margin: '-9' },
      { pollster: 'ABC News/Washington Post', date: '3/12/2026', sampleSize: 1234, approve: 42, disapprove: 53, margin: '-11' }
    ]
  },
  'congress-approval': {
    chartData: [
      { date: '2026-01-15', approve: 18, disapprove: 75 },
      { date: '2026-02-01', approve: 19, disapprove: 74 },
      { date: '2026-02-15', approve: 17, disapprove: 76 },
      { date: '2026-03-01', approve: 18, disapprove: 75 },
      { date: '2026-03-15', approve: 19, disapprove: 74 }
    ],
    polls: [
      { pollster: 'Gallup', date: '3/15/2026', sampleSize: 1502, approve: 19, disapprove: 74, margin: '-55' },
      { pollster: 'ABC News/Washington Post', date: '3/12/2026', sampleSize: 1234, approve: 18, disapprove: 75, margin: '-57' }
    ]
  }
};

export default function Polling() {
  const [selectedPoll, setSelectedPoll] = useState('2026-senate-generic');
  const currentData = mockPollingData[selectedPoll];

  return (
    <div 
      className="min-h-[calc(100vh-4rem)] px-4 py-16 sm:py-24 bg-black"
      style={{
        backgroundImage: 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b6f149a83e2b792ef60e35/493863590_FEA3.png)',
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
          <Select value={selectedPoll} onValueChange={setSelectedPoll}>
            <SelectTrigger className="w-full sm:w-80 bg-black text-white border-white/30">
              <SelectValue placeholder="Select polling average" />
            </SelectTrigger>
            <SelectContent>
              {pollingOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <PollingChart data={currentData.chartData} type={selectedPoll} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8"
        >
          <PollingTable polls={currentData.polls} type={selectedPoll} />
        </motion.div>
      </div>
    </div>
  );
}