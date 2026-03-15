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
      { date: '2026-01-15', democrat: 45, republican: 48 },
      { date: '2026-02-01', democrat: 46, republican: 47 },
      { date: '2026-02-15', democrat: 44, republican: 49 },
      { date: '2026-03-01', democrat: 45, republican: 48 },
      { date: '2026-03-15', democrat: 46, republican: 47 }
    ],
    polls: [
      { pollster: 'ABC News/Washington Post', date: '3/15/2026', sampleSize: 1502, democrat: 46, republican: 47, margin: 'R+1' },
      { pollster: 'CNN/SSRS', date: '3/12/2026', sampleSize: 1234, democrat: 45, republican: 48, margin: 'R+3' },
      { pollster: 'Fox News', date: '3/10/2026', sampleSize: 1098, democrat: 47, republican: 46, margin: 'D+1' },
      { pollster: 'NBC News/Marist', date: '3/08/2026', sampleSize: 1456, democrat: 44, republican: 49, margin: 'R+5' },
      { pollster: 'Reuters/Ipsos', date: '3/05/2026', sampleSize: 1876, democrat: 46, republican: 47, margin: 'R+1' },
      { pollster: 'Quinnipiac University', date: '3/01/2026', sampleSize: 1432, democrat: 45, republican: 48, margin: 'R+3' },
      { pollster: 'Monmouth University', date: '2/28/2026', sampleSize: 987, democrat: 46, republican: 46, margin: 'Tie' },
      { pollster: 'Harvard-Harris', date: '2/25/2026', sampleSize: 2134, democrat: 44, republican: 49, margin: 'R+5' }
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
            <SelectTrigger className="w-full sm:w-80 bg-white/90 border-white/20">
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