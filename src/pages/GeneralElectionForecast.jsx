import React from 'react';
import { motion } from 'framer-motion';
import InteractiveMap from '../components/forecasts/InteractiveMap';
import SenateControl from '../components/forecasts/SenateControl';
import HouseForecastMap from '../components/forecasts/HouseForecastMap';

const governorsRatings = {
  'District of Columbia': 'Not Contested',
  'Alabama': 'Safe R', 'Alaska': 'Tilt R', 'Arizona': 'Tilt D', 'Arkansas': 'Safe R',
  'California': 'Safe D', 'Colorado': 'Safe D', 'Connecticut': 'Safe D', 'Delaware': 'Not Contested',
  'Florida': 'Likely R', 'Georgia': 'Toss Up', 'Hawaii': 'Safe D', 'Idaho': 'Safe R',
  'Illinois': 'Likely D', 'Indiana': 'Not Contested', 'Iowa': 'Tilt R', 'Kansas': 'Likely R',
  'Kentucky': 'Not Contested', 'Louisiana': 'Not Contested', 'Maine': 'Likely D', 'Maryland': 'Safe D',
  'Massachusetts': 'Safe D', 'Michigan': 'Lean D', 'Minnesota': 'Safe D', 'Mississippi': 'Not Contested',
  'Missouri': 'Not Contested', 'Montana': 'Not Contested', 'Nebraska': 'Likely R', 'Nevada': 'Toss Up',
  'New Hampshire': 'Likely R', 'New Jersey': 'Not Contested', 'New Mexico': 'Likely D', 'New York': 'Safe D',
  'North Carolina': 'Not Contested', 'North Dakota': 'Not Contested', 'Ohio': 'Toss Up', 'Oklahoma': 'Safe R',
  'Oregon': 'Safe D', 'Pennsylvania': 'Safe D', 'Rhode Island': 'Safe D', 'South Carolina': 'Likely R',
  'South Dakota': 'Safe R', 'Tennessee': 'Safe R', 'Texas': 'Tilt R', 'Utah': 'Not Contested',
  'Vermont': 'Safe R', 'Virginia': 'Not Contested', 'Washington': 'Not Contested', 'West Virginia': 'Not Contested',
  'Wisconsin': 'Toss Up', 'Wyoming': 'Safe R'
};

const senateRatings = {
  'District of Columbia': 'Not Contested',
  'Alabama': 'Safe R', 'Alaska': 'Tilt D', 'Arizona': 'Not Contested', 'Arkansas': 'Safe R',
  'California': 'Not Contested', 'Colorado': 'Safe D', 'Connecticut': 'Not Contested', 'Delaware': 'Safe D',
  'Florida': 'Likely R', 'Georgia': 'Lean D', 'Hawaii': 'Not Contested', 'Idaho': 'Safe R',
  'Illinois': 'Safe D', 'Indiana': 'Likely R', 'Iowa': 'Lean R', 'Kansas': 'Likely R',
  'Kentucky': 'Safe R', 'Louisiana': 'Safe R', 'Maine': 'Tilt D', 'Maryland': 'Not Contested',
  'Massachusetts': 'Safe D', 'Michigan': 'Lean D', 'Minnesota': 'Safe D', 'Mississippi': 'Likely R',
  'Missouri': 'Not Contested', 'Montana': 'Safe R', 'Nebraska': 'Safe R', 'Nevada': 'Not Contested',
  'New Hampshire': 'Likely D', 'New Jersey': 'Likely D', 'New Mexico': 'Safe D', 'New York': 'Not Contested',
  'North Carolina': 'Lean D', 'North Dakota': 'Not Contested', 'Ohio': 'Likely R', 'Oklahoma': 'Safe R',
  'Oregon': 'Safe D', 'Pennsylvania': 'Not Contested', 'Rhode Island': 'Safe D', 'South Carolina': 'Likely R',
  'South Dakota': 'Safe R', 'Tennessee': 'Safe R', 'Texas': 'Toss Up', 'Utah': 'Not Contested',
  'Vermont': 'Not Contested', 'Virginia': 'Likely D', 'Washington': 'Not Contested', 'West Virginia': 'Safe R',
  'Wisconsin': 'Not Contested', 'Wyoming': 'Safe R'
};

const senatePercentages = {
  'Oregon': { d: 59.6, r: 40.4 }, 'Alaska': { d: 50.8, r: 49.2 }, 'Idaho': { r: 61.8, d: 38.2 },
  'Montana': { r: 56.7, d: 34.6, i: 8.7 }, 'Wyoming': { r: 68.4, d: 31.6 }, 'Colorado': { d: 58.0, r: 42.0 },
  'New Mexico': { d: 100.0, r: 0.0 }, 'South Dakota': { r: 60.5, d: 39.5 }, 'Nebraska': { r: 52.8, d: 17.2, i: 27.0 },
  'Kansas': { r: 54.4, d: 45.6 }, 'Oklahoma': { r: 63.6, d: 36.4 }, 'Texas': { r: 50.3, d: 49.7 },
  'Minnesota': { d: 58.8, r: 41.2 }, 'Iowa': { r: 52.1, d: 47.9 }, 'Arkansas': { r: 62.6, d: 37.4 },
  'Louisiana': { r: 59.9, d: 40.1 }, 'Mississippi': { r: 55.7, d: 44.3 }, 'Illinois': { d: 58.3, r: 41.7 },
  'Indiana': { r: 55.4, d: 44.6 }, 'Michigan': { d: 51.9, r: 48.1 }, 'Ohio': { r: 50.9, d: 40.1 },
  'Kentucky': { r: 62.2, d: 37.8 }, 'Tennessee': { r: 61.7, d: 38.3 }, 'Alabama': { r: 60.5, d: 39.5 },
  'Florida': { r: 55.6, d: 44.4 }, 'Georgia': { d: 51.8, r: 48.2 }, 'South Carolina': { r: 54.3, d: 45.7 },
  'North Carolina': { d: 52.0, r: 48.0 }, 'Virginia': { d: 57.7, r: 43.3 }, 'West Virginia': { r: 65.6, d: 34.4 },
  'Delaware': { d: 60.4, r: 39.6 }, 'New Jersey': { d: 56.6, r: 43.4 }, 'Rhode Island': { d: 58.4, r: 41.6 },
  'Massachusetts': { d: 64.3, r: 35.7 }, 'New Hampshire': { d: 53.3, r: 46.7 }, 'Maine': { d: 51.3, r: 48.7 },
};

const governorPercentages = {
  'Oregon': { d: 58.9, r: 41.1 }, 'California': { d: 62.4, r: 37.6 }, 'Nevada': { r: 50.2, d: 49.8 },
  'Arizona': { d: 51.1, r: 48.9 }, 'New Mexico': { d: 57.7, r: 43.3 }, 'Colorado': { d: 59.9, r: 40.1 },
  'Idaho': { r: 60.5, d: 39.5 }, 'Wyoming': { r: 68.8, d: 31.2 }, 'Hawaii': { d: 62.2, r: 37.8 },
  'Alaska': { r: 51.3, d: 48.7 }, 'Texas': { r: 50.9, d: 49.1 }, 'Oklahoma': { r: 62.5, d: 37.5 },
  'Kansas': { r: 55.4, d: 44.6 }, 'Nebraska': { r: 56.4, d: 43.6 }, 'South Dakota': { r: 61.8, d: 38.2 },
  'Minnesota': { d: 61.2, r: 38.8 }, 'Iowa': { r: 51.2, d: 48.8 }, 'Arkansas': { r: 62.8, d: 37.2 },
  'Wisconsin': { r: 50.4, d: 49.6 }, 'Michigan': { d: 38.8, r: 35.1, i: 26.1 }, 'Illinois': { d: 57.5, r: 42.5 },
  'Tennessee': { r: 59.4, d: 40.6 }, 'Alabama': { r: 62.2, d: 37.8 }, 'Georgia': { d: 50.4, r: 49.6 },
  'Florida': { r: 53.6, d: 46.4 }, 'Ohio': { d: 50.4, r: 49.6 }, 'South Carolina': { r: 55.9, d: 44.1 },
  'Maryland': { d: 66.5, r: 33.5 }, 'Pennsylvania': { d: 58.0, r: 42.0 }, 'New York': { d: 59.3, r: 40.7 },
  'Connecticut': { d: 58.8, r: 41.2 }, 'Rhode Island': { d: 61.4, r: 38.6 }, 'Massachusetts': { d: 65.0, r: 35.0 },
  'New Hampshire': { r: 53.3, d: 46.7 }, 'Vermont': { r: 64.3, d: 35.7 }, 'Maine': { d: 55.8, r: 44.2 },
};

export default function GeneralElectionForecast() {
  return (
    <div
      className="min-h-[calc(100vh-4rem)] px-4 py-16 sm:py-24"
      style={{
        backgroundImage: 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b6f149a83e2b792ef60e35/ec271415e_Screenshot2026-03-16at44509PM.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="max-w-5xl mx-auto space-y-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white font-inter font-bold text-3xl sm:text-4xl text-center text-shadow-teal"
        >
          2026 General Election Forecast
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-white font-inter font-bold text-2xl sm:text-3xl text-center mb-6 text-shadow-teal">
            Senate Forecast
          </h2>
          <InteractiveMap
            ratings={senateRatings}
            percentages={senatePercentages}
            majorityNote={<>Democrats need <span style={{color:'#93C5FD',fontWeight:600}}>50 seats</span> for majority &nbsp;•&nbsp; Republicans need <span style={{color:'#FCA5A5',fontWeight:600}}>51 seats</span> for majority</>}
            baseDemSeats={34}
            baseRepSeats={31}
            showIncumbents={true}
          />
          <SenateControl democratChance={43} republicanChance={57} />
          <div className="mt-8">
            <h2 className="text-white font-inter font-bold text-2xl sm:text-3xl text-center mb-6 text-shadow-teal">
              House Forecast
            </h2>
            <HouseForecastMap />
          </div>
          <SenateControl democratChance={73} republicanChance={27} title="House Control Probability" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-white font-inter font-bold text-2xl sm:text-3xl text-center mb-6 text-shadow-teal">
            Governors Forecast
          </h2>
          <InteractiveMap ratings={governorsRatings} percentages={governorPercentages} showIncumbents={true} />
        </motion.div>
      </div>
    </div>
  );
}