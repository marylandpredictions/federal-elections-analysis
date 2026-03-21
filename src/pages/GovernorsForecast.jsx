import React from 'react';
import { motion } from 'framer-motion';
import InteractiveMap from '../components/forecasts/InteractiveMap';
import SenateControl from '../components/forecasts/SenateControl';
import ForecastRaceTable from '../components/forecasts/ForecastRaceTable';

const BG = 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b6f149a83e2b792ef60e35/ec271415e_Screenshot2026-03-16at44509PM.png)';

const governorsRatings = {
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

const governorPercentages = {
  'Oregon': { d: 58.9, r: 41.1 }, 'California': { d: 62.4, r: 37.6 }, 'Nevada': { r: 50.2, d: 49.8 },
  'Arizona': { d: 51.1, r: 48.9 }, 'New Mexico': { d: 57.7, r: 43.3 }, 'Colorado': { d: 59.9, r: 40.1 },
  'Idaho': { r: 60.5, d: 39.5 }, 'Wyoming': { r: 68.8, d: 31.2 }, 'Hawaii': { d: 62.2, r: 37.8 },
  'Alaska': { r: 51.3, d: 48.7 }, 'Texas': { r: 50.9, d: 49.1 }, 'Oklahoma': { r: 62.5, d: 37.5 },
  'Kansas': { r: 55.4, d: 44.6 }, 'Nebraska': { r: 56.4, d: 43.6 }, 'South Dakota': { r: 61.8, d: 38.2 },
  'Minnesota': { d: 61.2, r: 38.8 }, 'Iowa': { r: 51.2, d: 48.8 }, 'Arkansas': { r: 62.8, d: 37.2 },
  'Wisconsin': { r: 50.4, d: 49.6 }, 'Michigan': { d: 38.8, r: 35.1 }, 'Illinois': { d: 57.5, r: 42.5 },
  'Tennessee': { r: 59.4, d: 40.6 }, 'Alabama': { r: 62.2, d: 37.8 }, 'Georgia': { d: 50.4, r: 49.6 },
  'Florida': { r: 53.6, d: 46.4 }, 'Ohio': { d: 50.4, r: 49.6 }, 'South Carolina': { r: 55.9, d: 44.1 },
  'Maryland': { d: 66.5, r: 33.5 }, 'Pennsylvania': { d: 58.0, r: 42.0 }, 'New York': { d: 59.3, r: 40.7 },
  'Connecticut': { d: 58.8, r: 41.2 }, 'Rhode Island': { d: 61.4, r: 38.6 }, 'Massachusetts': { d: 65.0, r: 35.0 },
  'New Hampshire': { r: 53.3, d: 46.7 }, 'Vermont': { r: 64.3, d: 35.7 }, 'Maine': { d: 55.8, r: 44.2 },
};

const governorIncumbents = {
  'Alabama': 'Kay Ivey (R)', 'Alaska': 'Mike Dunleavy (R)', 'Arizona': 'Katie Hobbs (D)',
  'Arkansas': 'Sarah Huckabee Sanders (R)', 'California': 'Gavin Newsom (D)', 'Colorado': 'Jared Polis (D)',
  'Connecticut': 'Ned Lamont (D)', 'Florida': 'Ron DeSantis (R)', 'Georgia': 'Brian Kemp (R)',
  'Hawaii': 'Josh Green (D)', 'Idaho': 'Brad Little (R)', 'Illinois': 'JB Pritzker (D)',
  'Iowa': 'Kim Reynolds (R)', 'Kansas': 'Laura Kelly (D)', 'Maine': 'Janet Mills (D)',
  'Maryland': 'Wes Moore (D)', 'Massachusetts': 'Maura Healey (D)', 'Michigan': 'Gretchen Whitmer (D)',
  'Minnesota': 'Tim Walz (D)', 'Nebraska': 'Jim Pillen (R)', 'Nevada': 'Joe Lombardo (R)',
  'New Hampshire': 'Kelly Ayotte (R)', 'New Mexico': 'Michelle Lujan Grisham (D)',
  'New York': 'Kathy Hochul (D)', 'Ohio': 'Mike DeWine (R)', 'Oklahoma': 'Kevin Stitt (R)',
  'Oregon': 'Tina Kotek (D)', 'Pennsylvania': 'Josh Shapiro (D)', 'Rhode Island': 'Dan McKee (D)',
  'South Carolina': 'Henry McMaster (R)', 'South Dakota': 'Tony Venhuizen (R)', 'Tennessee': 'Bill Lee (R)',
  'Texas': 'Greg Abbott (R)', 'Vermont': 'Phil Scott (R)', 'Wisconsin': 'Tony Evers (D)',
  'Wyoming': 'Mark Gordon (R)',
};

const ratingOrder = ['Safe D','Likely D','Lean D','Tilt D','Toss Up','Tilt R','Lean R','Likely R','Safe R'];

const contestedRows = Object.entries(governorsRatings)
  .filter(([, r]) => r !== 'Not Contested')
  .sort((a, b) => a[0].localeCompare(b[0]))
  .map(([state, rating]) => {
    const pct = governorPercentages[state];
    return {
      state,
      incumbent: governorIncumbents[state] || '—',
      rating,
      dPct: pct ? pct.d : null,
      rPct: pct ? pct.r : null,
    };
  });

export default function GovernorsForecast() {
  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-16 sm:py-24"
      style={{ backgroundImage: BG, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="max-w-5xl mx-auto space-y-8">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="text-white font-inter font-bold text-3xl sm:text-4xl text-center text-shadow-teal">
          2026 Governors Election Forecast
        </motion.h1>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <InteractiveMap
            ratings={governorsRatings}
            percentages={governorPercentages}
            showIncumbents={true}
            incumbents={governorIncumbents}
          />
          <ForecastRaceTable rows={contestedRows} title="Contested Governors Races" />
        </motion.div>
      </div>
    </div>
  );
}