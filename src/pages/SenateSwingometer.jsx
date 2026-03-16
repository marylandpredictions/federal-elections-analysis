import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SwingBar from '../components/swingometer/SwingBar';
import SwingMap from '../components/swingometer/SwingMap';

const baseResults = {
  'Alaska': 13.1,
  'Arizona': null,
  'Hawaii': null,
  'California': null,
  'Oregon': -14.3,
  'Washington': null,
  'Nevada': null,
  'Idaho': 36.5,
  'Utah': null,
  'New Mexico': -6.0,
  'Colorado': -11.0,
  'Wyoming': 45.8,
  'Montana': 19.9,
  'North Dakota': null,
  'South Dakota': 29.2,
  'Nebraska': 20.5,
  'Kansas': 16.1,
  'Oklahoma': 34.3,
  'Texas': 13.7,
  'Louisiana': 22.0,
  'Arkansas': 30.6,
  'Missouri': null,
  'Iowa': 13.2,
  'Minnesota': -4.2,
  'Wisconsin': null,
  'Illinois': -10.9,
  'Michigan': 1.4,
  'Indiana': null,
  'Ohio': null,
  'Kentucky': 30.5,
  'Tennessee': 29.7,
  'Mississippi': 22.9,
  'Alabama': 30.5,
  'Florida': null,
  'Georgia': 2.2,
  'South Carolina': 17.9,
  'North Carolina': 3.2,
  'Virginia': -5.8,
  'West Virginia': 41.9,
  'Maryland': null,
  'Delaware': -14.7,
  'Pennsylvania': null,
  'New Jersey': -5.9,
  'New York': null,
  'Connecticut': null,
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
          2026 Senate Swingometer
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