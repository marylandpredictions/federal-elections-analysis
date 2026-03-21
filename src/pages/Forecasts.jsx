import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import InteractiveMap from '../components/forecasts/InteractiveMap';
import SenateControl from '../components/forecasts/SenateControl';
import SeatCounter from '../components/forecasts/SeatCounter';

const governorsRatings = {
  'Alabama': 'Safe R', 'Alaska': 'Lean R', 'Arizona': 'Tilt D', 'Arkansas': 'Safe R',
  'California': 'Safe D', 'Colorado': 'Safe D', 'Connecticut': 'Safe D', 'Delaware': 'Not Contested',
  'Florida': 'Likely R', 'Georgia': 'Toss Up', 'Hawaii': 'Safe D', 'Idaho': 'Safe R',
  'Illinois': 'Safe D', 'Indiana': 'Not Contested', 'Iowa': 'Lean R', 'Kansas': 'Likely R',
  'Kentucky': 'Not Contested', 'Louisiana': 'Not Contested', 'Maine': 'Likely D', 'Maryland': 'Safe D',
  'Massachusetts': 'Safe D', 'Michigan': 'Tilt D', 'Minnesota': 'Safe D', 'Mississippi': 'Not Contested',
  'Missouri': 'Not Contested', 'Montana': 'Not Contested', 'Nebraska': 'Safe R', 'Nevada': 'Toss Up',
  'New Hampshire': 'Likely R', 'New Jersey': 'Not Contested', 'New Mexico': 'Likely D', 'New York': 'Safe D',
  'North Carolina': 'Not Contested', 'North Dakota': 'Not Contested', 'Ohio': 'Toss Up', 'Oklahoma': 'Safe R',
  'Oregon': 'Safe D', 'Pennsylvania': 'Safe D', 'Rhode Island': 'Safe D', 'South Carolina': 'Likely R',
  'South Dakota': 'Safe R', 'Tennessee': 'Safe R', 'Texas': 'Lean R', 'Utah': 'Not Contested',
  'Vermont': 'Toss Up', 'Virginia': 'Not Contested', 'Washington': 'Not Contested', 'West Virginia': 'Not Contested',
  'Wisconsin': 'Lean D', 'Wyoming': 'Safe R'
};

const senateRatings = {
  'Alabama': 'Safe R', 'Alaska': 'Toss Up', 'Arizona': 'Not Contested', 'Arkansas': 'Safe R',
  'California': 'Not Contested', 'Colorado': 'Safe D', 'Connecticut': 'Not Contested', 'Delaware': 'Safe D',
  'Florida': 'Likely R', 'Georgia': 'Lean D', 'Hawaii': 'Not Contested', 'Idaho': 'Safe R',
  'Illinois': 'Safe D', 'Indiana': 'Safe R', 'Iowa': 'Lean R', 'Kansas': 'Likely R',
  'Kentucky': 'Safe R', 'Louisiana': 'Safe R', 'Maine': 'Lean D', 'Maryland': 'Not Contested',
  'Massachusetts': 'Safe D', 'Michigan': 'Lean D', 'Minnesota': 'Safe D', 'Mississippi': 'Likely R',
  'Missouri': 'Not Contested', 'Montana': 'Likely R', 'Nebraska': 'Likely R', 'Nevada': 'Not Contested',
  'New Hampshire': 'Likely D', 'New Jersey': 'Safe D', 'New Mexico': 'Safe D', 'New York': 'Not Contested',
  'North Carolina': 'Likely D', 'North Dakota': 'Not Contested', 'Ohio': 'Tilt R', 'Oklahoma': 'Safe R',
  'Oregon': 'Safe D', 'Pennsylvania': 'Not Contested', 'Rhode Island': 'Safe D', 'South Carolina': 'Likely R',
  'South Dakota': 'Safe R', 'Tennessee': 'Safe R', 'Texas': 'Tilt R', 'Utah': 'Not Contested',
  'Vermont': 'Not Contested', 'Virginia': 'Likely D', 'Washington': 'Not Contested', 'West Virginia': 'Safe R',
  'Wisconsin': 'Not Contested', 'Wyoming': 'Safe R'
};

const forecastGallery = [
  {
    title: '2026 Senate Election Forecast',
    description: 'Senate race projections with interactive map, seat counts, and control probability.',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b6f149a83e2b792ef60e35/ec271415e_Screenshot2026-03-16at44509PM.png',
    link: '/SenateForecast'
  },
  {
    title: '2026 House Election Forecast',
    description: 'House race projections with parliament map, seat counts, and control probability.',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b6f149a83e2b792ef60e35/ec271415e_Screenshot2026-03-16at44509PM.png',
    link: '/HouseForecast'
  },
  {
    title: '2026 Governors Election Forecast',
    description: 'Governors race projections with interactive map and contested race breakdowns.',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b6f149a83e2b792ef60e35/ec271415e_Screenshot2026-03-16at44509PM.png',
    link: '/GovernorsForecast'
  },
];

export default function Forecasts() {
  const [view, setView] = useState('gallery');
  const navigate = useNavigate();

  return (
    <div
      className="min-h-[calc(100vh-4rem)] px-4 py-16 sm:py-24"
      style={{
        backgroundImage: 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b6f149a83e2b792ef60e35/ec271415e_Screenshot2026-03-16at44509PM.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white font-inter font-bold text-3xl sm:text-4xl text-center mb-12 text-shadow-teal"
        >
          2026 Election Forecasts
        </motion.h1>

        {view === 'gallery' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {forecastGallery.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => navigate(f.link)}
                className="cursor-pointer rounded-2xl overflow-hidden border border-primary/40 bg-primary/20 backdrop-blur-sm hover:bg-primary/30 hover:border-primary/70 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <img src={f.image} alt={f.title} className="w-full h-44 object-cover" />
                <div className="p-5">
                  <h3 className="text-white font-inter font-bold text-lg mb-2 text-shadow-teal">{f.title}</h3>
                  <p className="text-white/80 font-inter text-sm leading-relaxed">{f.description}</p>
                  <p className="text-white font-inter font-semibold text-sm mt-3">View forecast →</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <>
            <button
              onClick={() => setView('gallery')}
              className="mb-8 text-white/70 hover:text-white font-inter text-sm underline"
            >
              ← Back to Forecasts
            </button>

            <div className="space-y-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-white font-inter font-bold text-2xl sm:text-3xl text-center mb-6 text-shadow-teal">
                  Senate Forecast
                </h2>
                <SeatCounter ratings={senateRatings} />
                <InteractiveMap ratings={senateRatings} baseDemSeats={34} baseRepSeats={31} />
                <SenateControl democratChance={42} republicanChance={58} />
                <SenateControl democratChance={71} republicanChance={29} title="House Control Probability" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-white font-inter font-bold text-2xl sm:text-3xl text-center mb-6 text-shadow-teal">
                  Governors Forecast
                </h2>
                <SeatCounter ratings={governorsRatings} />
                <InteractiveMap ratings={governorsRatings} />
              </motion.div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}