import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import InteractiveMap from '../components/forecasts/InteractiveMap';
import SenateControl from '../components/forecasts/SenateControl';
import SeatCounter from '../components/forecasts/SeatCounter';

const senateIncumbents = {
  'Alabama': 'Tommy Tuberville (R)', 'Alaska': 'Dan Sullivan (R)', 'Arizona': 'Jeff Flake (R)', 'Arkansas': 'Tom Cotton (R)',
  'California': 'Dianne Feinstein (D)', 'Colorado': 'Michael Bennet (D)', 'Connecticut': 'Chris Murphy (D)', 'Delaware': 'Chris Coons (D)',
  'Florida': 'Marco Rubio (R)', 'Georgia': 'Jon Ossoff (D)', 'Hawaii': 'Mazie Hirono (D)', 'Idaho': 'Jim Risch (R)',
  'Illinois': 'Dick Durbin (D)', 'Indiana': 'Todd Young (R)', 'Iowa': 'Joni Ernst (R)', 'Kansas': 'Jerry Moran (R)',
  'Kentucky': 'Mitch McConnell (R)', 'Louisiana': 'Bill Cassidy (R)', 'Maine': 'Susan Collins (R)', 'Maryland': 'Ben Cardin (D)',
  'Massachusetts': 'Elizabeth Warren (D)', 'Michigan': 'Gary Peters (D)', 'Minnesota': 'Tina Smith (D)', 'Mississippi': 'Roger Wicker (R)',
  'Missouri': 'Josh Hawley (R)', 'Montana': 'Jon Tester (D)', 'Nebraska': 'Pete Ricketts (R)', 'Nevada': 'Catherine Cortez Masto (D)',
  'New Hampshire': 'Jeanne Shaheen (D)', 'New Jersey': 'Cory Booker (D)', 'New Mexico': 'Ben Ray Luján (D)', 'New York': 'Kirsten Gillibrand (D)',
  'North Carolina': 'Thom Tillis (R)', 'North Dakota': 'John Hoeven (R)', 'Ohio': 'J.D. Vance (R)', 'Oklahoma': 'James Inhofe (R)',
  'Oregon': 'Ron Wyden (D)', 'Pennsylvania': 'John Fetterman (D)', 'Rhode Island': 'Jack Reed (D)', 'South Carolina': 'Lindsey Graham (R)',
  'South Dakota': 'Mike Rounds (R)', 'Tennessee': 'Marsha Blackburn (R)', 'Texas': 'John Cornyn (R)', 'Utah': 'Mitt Romney (R)',
  'Vermont': 'Bernie Sanders (I)', 'Virginia': 'Mark Warner (D)', 'Washington': 'Patty Murray (D)', 'West Virginia': 'Shelley Moore Capito (R)',
  'Wisconsin': 'Tammy Baldwin (D)', 'Wyoming': 'John Barrasso (R)',
};

const govIncumbents = {
  'Alabama': 'Kay Ivey (R)', 'Alaska': 'Mike Dunleavy (R)', 'Arizona': 'Katie Hobbs (D)', 'Arkansas': 'Sarah Huckabee Sanders (R)',
  'California': 'Gavin Newsom (D)', 'Colorado': 'Jared Polis (D)', 'Connecticut': 'Ned Lamont (D)', 'Delaware': 'John Carney (D)',
  'Florida': 'Ron DeSantis (R)', 'Georgia': 'Brian Kemp (R)', 'Hawaii': 'Josh Green (D)', 'Idaho': 'Brad Little (R)',
  'Illinois': 'J.B. Pritzker (D)', 'Indiana': 'Eric Holcomb (R)', 'Iowa': 'Kim Reynolds (R)', 'Kansas': 'Laura Kelly (D)',
  'Kentucky': 'Andy Beshear (D)', 'Louisiana': 'Jeff Landry (R)', 'Maine': 'Janet Mills (D)', 'Maryland': 'Wes Moore (D)',
  'Massachusetts': 'Maura Healey (D)', 'Michigan': 'Gretchen Whitmer (D)', 'Minnesota': 'Tim Walz (D)', 'Mississippi': 'Tate Reeves (R)',
  'Missouri': 'Mike Kehoe (R)', 'Montana': 'Greg Gianforte (R)', 'Nebraska': 'Jim Pillen (R)', 'Nevada': 'Joe Lombardo (R)',
  'New Hampshire': 'Chris Sununu (R)', 'New Jersey': 'Phil Murphy (D)', 'New Mexico': 'Michelle Lujan Grisham (D)', 'New York': 'Kathy Hochul (D)',
  'North Carolina': 'Roy Cooper (D)', 'North Dakota': 'Doug Burgum (R)', 'Ohio': 'Mike DeWine (R)', 'Oklahoma': 'Kevin Stitt (R)',
  'Oregon': 'Tina Kotek (D)', 'Pennsylvania': 'Josh Shapiro (D)', 'Rhode Island': 'Daniel McKee (D)', 'South Carolina': 'Henry McMaster (R)',
  'South Dakota': 'Kristi Noem (R)', 'Tennessee': 'Bill Lee (R)', 'Texas': 'Greg Abbott (R)', 'Utah': 'Spencer Cox (R)',
  'Vermont': 'Phil Scott (R)', 'Virginia': 'Glenn Youngkin (R)', 'Washington': 'Jay Inslee (D)', 'West Virginia': 'Jim Justice (R)',
  'Wisconsin': 'Tony Evers (D)', 'Wyoming': 'Mark Gordon (R)',
};

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
                <InteractiveMap ratings={senateRatings} baseDemSeats={34} baseRepSeats={31} incumbents={senateIncumbents} showIncumbents={true} />
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
                <InteractiveMap ratings={governorsRatings} incumbents={govIncumbents} showIncumbents={true} />
              </motion.div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}