import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SwingBar from '../components/swingometer/SwingBar';
import SwingMap from '../components/swingometer/SwingMap';

// 2024 presidential margins for governor-contested states (positive = R, negative = D)
// null = Not Contested governor race
const govBaseResults = {
  'Alabama': 30.5,
  'Alaska': 13.1,
  'Arizona': 5.5,
  'Arkansas': 30.6,
  'California': -20.0,
  'Colorado': -11.0,
  'Connecticut': -13.0,
  'Delaware': null,
  'Florida': 13.1,
  'Georgia': 2.2,
  'Hawaii': -29.0,
  'Idaho': 36.5,
  'Illinois': -10.9,
  'Indiana': null,
  'Iowa': 13.2,
  'Kansas': 16.1,
  'Kentucky': null,
  'Louisiana': null,
  'Maine': -6.9,
  'Maryland': -28.0,
  'Massachusetts': -25.2,
  'Michigan': 1.4,
  'Minnesota': -4.2,
  'Mississippi': null,
  'Missouri': null,
  'Montana': null,
  'Nebraska': 20.5,
  'Nevada': 3.1,
  'New Hampshire': -2.8,
  'New Jersey': null,
  'New Mexico': -6.0,
  'New York': -12.0,
  'North Carolina': null,
  'North Dakota': null,
  'Ohio': 11.2,
  'Oklahoma': 34.3,
  'Oregon': -14.3,
  'Pennsylvania': 2.1,
  'Rhode Island': -13.8,
  'South Carolina': 17.9,
  'South Dakota': 29.2,
  'Tennessee': 29.7,
  'Texas': 13.7,
  'Utah': null,
  'Vermont': -36.0,
  'Virginia': null,
  'Washington': null,
  'West Virginia': null,
  'Wisconsin': 0.9,
  'Wyoming': null,
};

export default function GovernorsSwingometer() {
  const [swing, setSwing] = useState(0);

  return (
    <div
      className="min-h-[calc(100vh-4rem)] px-4 py-16 sm:py-24"
      style={{
        backgroundImage: 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b6f149a83e2b792ef60e35/ec271415e_Screenshot2026-03-16at44509PM.png)',
        backgroundSize: 'cover', backgroundPosition: 'center'
      }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}
          className="text-white font-inter font-bold text-3xl sm:text-4xl text-center mb-4 text-shadow-teal">
          Governors Swingometer
        </motion.h1>
        <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.2 }}
          className="text-white font-inter text-center mb-12 text-sm sm:text-base">
          Swing the 2026 Governors map based on 2024 presidential results
        </motion.p>

        <SwingBar swing={swing} setSwing={setSwing} />

        <div className="mt-8">
          <SwingMap baseResults={govBaseResults} swing={swing} title="2026 Governors Map" baseDemSeats={0} baseRepSeats={0} />
        </div>
      </div>
    </div>
  );
}