import React from 'react';
import { motion } from 'framer-motion';
import InteractiveMap from '../components/forecasts/InteractiveMap';
import SenateControl from '../components/forecasts/SenateControl';
import ForecastRaceTable from '../components/forecasts/ForecastRaceTable';

const BG = 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b6f149a83e2b792ef60e35/ec271415e_Screenshot2026-03-16at44509PM.png)';

const senateRatings = {
  'Alabama': 'Safe R', 'Alaska': 'Toss Up', 'Arizona': 'Not Contested', 'Arkansas': 'Safe R',
  'California': 'Not Contested', 'Colorado': 'Safe D', 'Connecticut': 'Not Contested', 'Delaware': 'Safe D',
  'Florida': 'Likely R', 'Georgia': 'Lean D', 'Hawaii': 'Not Contested', 'Idaho': 'Safe R',
  'Illinois': 'Safe D', 'Indiana': 'Not Contested', 'Iowa': 'Lean R', 'Kansas': 'Likely R',
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
  'Montana': { r: 56.7, d: 34.6 }, 'Wyoming': { r: 68.4, d: 31.6 }, 'Colorado': { d: 58.0, r: 42.0 },
  'New Mexico': { d: 100.0, r: 0.0 }, 'South Dakota': { r: 60.5, d: 39.5 }, 'Nebraska': { r: 52.8, d: 17.2 },
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

const senateIncumbents = {
  'Alaska': 'Dan Sullivan (R)', 'Oregon': 'Jeff Merkley (D)', 'Louisiana': 'Bill Cassidy (R)',
  'Arkansas': 'Tom Cotton (R)', 'Montana': 'Steve Daines (R)', 'Wyoming': 'Cynthia Lummis (R)',
  'South Dakota': 'Mike Rounds (R)', 'Nebraska': 'Pete Ricketts (R)', 'Kansas': 'Jerry Moran (R)',
  'Oklahoma': 'Markwayne Mullin (R)', 'Texas': 'John Cornyn (R)', 'Iowa': 'Joni Ernst (R)',
  'Minnesota': 'Tina Smith (D)', 'Illinois': 'Dick Durbin (D)', 'Michigan': 'Gary Peters (D)',
  'Ohio': 'Jon Husted (R)', 'Kentucky': 'Mitch McConnell (R)', 'Tennessee': 'Marsha Blackburn (R)',
  'Mississippi': 'Cindy Hyde-Smith (R)', 'Alabama': 'Tommy Tuberville (R)', 'Florida': 'Ashley Moody (R)',
  'Georgia': 'Jon Ossoff (D)', 'South Carolina': 'Lindsey Graham (R)', 'North Carolina': 'Thom Tillis (R)',
  'Virginia': 'Mark Warner (D)', 'West Virginia': 'Shelley Moore Capito (R)', 'Delaware': 'Chris Coons (D)',
  'New Jersey': 'Cory Booker (D)', 'New Hampshire': 'Jeanne Shaheen (D)', 'Massachusetts': 'Ed Markey (D)',
  'Rhode Island': 'Jack Reed (D)', 'Maine': 'Susan Collins (R)', 'Colorado': 'John Hickenlooper (D)',
  'New Mexico': 'Ben Ray Luján (D)', 'Idaho': 'Jim Risch (R)',
};

const ratingOrder = ['Safe D','Likely D','Lean D','Tilt D','Toss Up','Tilt R','Lean R','Likely R','Safe R'];

const contestedRows = Object.entries(senateRatings)
  .filter(([, r]) => r !== 'Not Contested')
  .sort((a, b) => a[0].localeCompare(b[0]))
  .map(([state, rating]) => {
    const pct = senatePercentages[state];
    return {
      state,
      incumbent: senateIncumbents[state] || '—',
      rating,
      dPct: pct ? pct.d : null,
      rPct: pct ? pct.r : null,
    };
  });

export default function SenateForecast() {
  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-16 sm:py-24"
      style={{ backgroundImage: BG, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="max-w-5xl mx-auto space-y-8">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="text-white font-inter font-bold text-3xl sm:text-4xl text-center text-shadow-teal">
          2026 Senate Election Forecast
        </motion.h1>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <InteractiveMap
            ratings={senateRatings}
            percentages={senatePercentages}
            majorityNote={<>Democrats need <span style={{color:'#93C5FD',fontWeight:600}}>51 seats</span> for majority &nbsp;•&nbsp; Republicans need <span style={{color:'#FCA5A5',fontWeight:600}}>50 seats</span> for majority</>}
            baseDemSeats={34}
            baseRepSeats={31}
            showIncumbents={true}
            incumbents={senateIncumbents}
          />
          <SenateControl democratChance={43} republicanChance={57} />
          <ForecastRaceTable rows={contestedRows} title="Contested Senate Races" />
        </motion.div>
      </div>
    </div>
  );
}