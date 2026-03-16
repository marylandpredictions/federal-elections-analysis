import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SwingBar from '../components/swingometer/SwingBar';
import SwingMap from '../components/swingometer/SwingMap';

const baseResults = {
  'Alaska': 13.1,
  'Arizona': 5.5,
  'Hawaii': -23.1,
  'California': -20.1,
  'Oregon': -14.3,
  'Washington': -18.2,
  'Nevada': 3.1,
  'Idaho': 36.5,
  'Utah': 21.6,
  'New Mexico': -6.0,
  'Colorado': -11.0,
  'Wyoming': 45.8,
  'Montana': 19.9,
  'North Dakota': 36.4,
  'South Dakota': 29.2,
  'Nebraska': 20.5,
  'Kansas': 16.1,
  'Oklahoma': 34.3,
  'Texas': 13.7,
  'Louisiana': 22.0,
  'Arkansas': 30.6,
  'Missouri': 18.4,
  'Iowa': 13.2,
  'Minnesota': -4.2,
  'Wisconsin': 0.9,
  'Illinois': -10.9,
  'Michigan': 1.4,
  'Indiana': 19.0,
  'Ohio': 11.2,
  'Kentucky': 30.5,
  'Tennessee': 29.7,
  'Mississippi': 22.9,
  'Alabama': 30.5,
  'Florida': 13.1,
  'Georgia': 2.2,
  'South Carolina': 17.9,
  'North Carolina': 3.2,
  'Virginia': -5.8,
  'West Virginia': 41.9,
  'Maryland': -28.5,
  'Delaware': -14.7,
  'Pennsylvania': 1.7,
  'New Jersey': -5.9,
  'New York': -12.6,
  'Connecticut': -14.5,
  'Rhode Island': -13.8,
  'Massachusetts': -25.2,
  'Vermont': null,
  'New Hampshire': -2.8,
  'Maine': -6.9
};

export default function SenateSwingometer() {
  const [swing, setSwing] = useState(0);

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
          Senate Swingometer
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white font-inter text-center mb-12 text-sm sm:text-base"
        >
          Based on 2024 Presidential Election Results
        </motion.p>

        <SwingBar swing={swing} setSwing={setSwing} />
        
        <div className="mt-8">
          <SwingMap baseResults={baseResults} swing={swing} />
        </div>
      </div>
    </div>
  );
}