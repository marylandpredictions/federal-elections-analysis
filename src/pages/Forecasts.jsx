import React, { useState } from 'react';
import { motion } from 'framer-motion';
import InteractiveMap from '../components/forecasts/InteractiveMap';

const governorsRatings = {
  'Alabama': 'Safe R',
  'Alaska': 'Likely R',
  'Arizona': 'Lean R',
  'Arkansas': 'Safe R',
  'California': 'Safe D',
  'Colorado': 'Likely D',
  'Connecticut': 'Safe D',
  'Delaware': 'Safe D',
  'Florida': 'Safe R',
  'Georgia': 'Lean R',
  'Hawaii': 'Safe D',
  'Idaho': 'Safe R',
  'Illinois': 'Safe D',
  'Indiana': 'Safe R',
  'Iowa': 'Safe R',
  'Kansas': 'Likely R',
  'Kentucky': 'Safe R',
  'Louisiana': 'Safe R',
  'Maine': 'Likely D',
  'Maryland': 'Likely D',
  'Massachusetts': 'Safe D',
  'Michigan': 'Tilt D',
  'Minnesota': 'Likely D',
  'Mississippi': 'Safe R',
  'Missouri': 'Safe R',
  'Montana': 'Safe R',
  'Nebraska': 'Safe R',
  'Nevada': 'Toss Up',
  'New Hampshire': 'Tilt R',
  'New Jersey': 'Likely D',
  'New Mexico': 'Safe D',
  'New York': 'Safe D',
  'North Carolina': 'Lean R',
  'North Dakota': 'Safe R',
  'Ohio': 'Safe R',
  'Oklahoma': 'Safe R',
  'Oregon': 'Safe D',
  'Pennsylvania': 'Lean D',
  'Rhode Island': 'Safe D',
  'South Carolina': 'Safe R',
  'South Dakota': 'Safe R',
  'Tennessee': 'Safe R',
  'Texas': 'Safe R',
  'Utah': 'Safe R',
  'Vermont': 'Safe D',
  'Virginia': 'Likely D',
  'Washington': 'Safe D',
  'West Virginia': 'Safe R',
  'Wisconsin': 'Toss Up',
  'Wyoming': 'Safe R'
};

const senateRatings = {
  'Alabama': 'Safe R',
  'Alaska': 'Safe R',
  'Arizona': 'Toss Up',
  'Arkansas': 'Safe R',
  'California': 'Safe D',
  'Colorado': 'Safe D',
  'Connecticut': 'Safe D',
  'Delaware': 'Safe D',
  'Florida': 'Safe R',
  'Georgia': 'Likely R',
  'Hawaii': 'Safe D',
  'Idaho': 'Safe R',
  'Illinois': 'Safe D',
  'Indiana': 'Likely R',
  'Iowa': 'Safe R',
  'Kansas': 'Safe R',
  'Kentucky': 'Safe R',
  'Louisiana': 'Safe R',
  'Maine': 'Likely D',
  'Maryland': 'Safe D',
  'Massachusetts': 'Safe D',
  'Michigan': 'Tilt D',
  'Minnesota': 'Safe D',
  'Mississippi': 'Safe R',
  'Missouri': 'Safe R',
  'Montana': 'Toss Up',
  'Nebraska': 'Safe R',
  'Nevada': 'Toss Up',
  'New Hampshire': 'Tilt D',
  'New Jersey': 'Likely D',
  'New Mexico': 'Safe D',
  'New York': 'Safe D',
  'North Carolina': 'Tilt R',
  'North Dakota': 'Safe R',
  'Ohio': 'Likely R',
  'Oklahoma': 'Safe R',
  'Oregon': 'Safe D',
  'Pennsylvania': 'Tilt D',
  'Rhode Island': 'Safe D',
  'South Carolina': 'Safe R',
  'South Dakota': 'Safe R',
  'Tennessee': 'Safe R',
  'Texas': 'Likely R',
  'Utah': 'Safe R',
  'Vermont': 'Safe D',
  'Virginia': 'Likely D',
  'Washington': 'Safe D',
  'West Virginia': 'Safe R',
  'Wisconsin': 'Toss Up',
  'Wyoming': 'Safe R'
};

export default function Forecasts() {
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
          className="text-white font-inter font-bold text-3xl sm:text-4xl text-center mb-12 text-shadow-teal"
        >
          2026 Election Forecasts
        </motion.h1>

        <div className="space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-white font-inter font-bold text-2xl sm:text-3xl text-center mb-6 text-shadow-teal">
              Senate Forecast
            </h2>
            <InteractiveMap ratings={senateRatings} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-white font-inter font-bold text-2xl sm:text-3xl text-center mb-6 text-shadow-teal">
              Governors Forecast
            </h2>
            <InteractiveMap ratings={governorsRatings} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}