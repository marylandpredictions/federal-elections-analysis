import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import SwingMap from '../components/swingometer/SwingMap';

const BG = 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b6f149a83e2b792ef60e35/ec271415e_Screenshot2026-03-16at44509PM.png)';

const latestArticle = {
  id: 1,
  title: "Illinois' Democratic Revolution",
  author: "Nathan",
  date: "March 15, 2026",
  image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b6f149a83e2b792ef60e35/3c8d9b846_FEA4.png",
  excerpt: "Something may be brewing within the lines of the Democratic Party in Illinois, put to the test in an open senate and four house seats."
};

const genericBallotData = [
  { democrat: 50.3, republican: 43.7 },
  { democrat: 51.0, republican: 43.3 },
  { democrat: 52.3, republican: 43.0 },
  { democrat: 47.0, republican: 42.3 },
  { democrat: 46.3, republican: 41.0 },
  { democrat: 45.7, republican: 44.3 },
  { democrat: 47.3, republican: 43.7 },
  { democrat: 44.3, republican: 40.0 },
  { democrat: 45.0, republican: 42.0 },
  { democrat: 46.7, republican: 42.3 },
  { democrat: 47.7, republican: 43.0 },
  { democrat: 48.7, republican: 43.3 },
  { democrat: 47.7, republican: 43.0 },
  { democrat: 46.7, republican: 42.3 },
  { democrat: 47.7, republican: 43.3 },
  { democrat: 46.3, republican: 42.0 },
  { democrat: 47.7, republican: 42.7 },
  { democrat: 46.3, republican: 43.0 },
  { democrat: 45.3, republican: 42.7 }
];

const baseResults = {
  'Alaska': 13.1, 'Arizona': null, 'Hawaii': null, 'California': null, 'Oregon': -14.3,
  'Washington': null, 'Nevada': null, 'Idaho': 36.5, 'Utah': null, 'New Mexico': -6.0,
  'Colorado': -11.0, 'Wyoming': 45.8, 'Montana': 19.9, 'North Dakota': null, 'South Dakota': 29.2,
  'Nebraska': 20.5, 'Kansas': 16.1, 'Oklahoma': 34.3, 'Texas': 13.7, 'Louisiana': 22.0,
  'Arkansas': 30.6, 'Missouri': null, 'Iowa': 13.2, 'Minnesota': -4.2, 'Wisconsin': null,
  'Illinois': -10.9, 'Michigan': 1.4, 'Indiana': null, 'Ohio': 11.2, 'Kentucky': 30.5,
  'Tennessee': 29.7, 'Mississippi': 22.9, 'Alabama': 30.5, 'Florida': 13.1, 'Georgia': 2.2,
  'South Carolina': 17.9, 'North Carolina': 3.2, 'Virginia': -5.8, 'West Virginia': 41.9,
  'Maryland': null, 'Delaware': -14.7, 'Pennsylvania': null, 'New Jersey': -5.9, 'New York': null,
  'Connecticut': null, 'Rhode Island': -13.8, 'Massachusetts': -25.2, 'Vermont': null,
  'New Hampshire': -2.8, 'Maine': -6.9
};

const bubbleBase = "bg-white/60 backdrop-blur-sm rounded-2xl p-5 shadow-lg hover:bg-white/70 transition-all duration-300 hover:shadow-xl";

export default function Home() {
  return (
    <div
      className="min-h-[calc(100vh-4rem)] px-4 py-16 sm:py-24"
      style={{ backgroundImage: BG, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-center"
      >
        <h1 className="text-white font-inter font-extrabold text-4xl sm:text-5xl md:text-7xl leading-tight text-shadow-teal">
          Welcome to
        </h1>
        <h1 className="text-white font-inter font-extrabold text-4xl sm:text-5xl md:text-7xl leading-tight mt-2 text-shadow-teal">
          Federal Elections Analysis
        </h1>
        <p className="text-white font-inter text-lg sm:text-xl md:text-2xl mt-6 text-shadow-teal bg-primary/90 rounded-3xl px-8 py-4 inline-block transition-all duration-300 hover:scale-102 cursor-pointer">
          A Haven for Political Fatigue
        </p>
      </motion.div>

      {/* Row 1: 3 bubbles */}
      <div className="max-w-7xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Latest Article */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link to="/ArticleView/1" className={`block ${bubbleBase}`}>
            <p className="text-xs font-inter font-semibold text-black/60 uppercase tracking-wider mb-2">Latest Article</p>
            <img
              src={latestArticle.image}
              alt={latestArticle.title}
              className="w-full h-36 object-cover rounded-xl mb-3"
            />
            <h3 className="font-inter font-bold text-gray-900 text-base sm:text-lg leading-tight mb-1">
              {latestArticle.title}
            </h3>
            <p className="text-xs text-gray-500 font-inter mb-2">By {latestArticle.author} · {latestArticle.date}</p>
            <p className="text-gray-700 font-inter text-sm line-clamp-3">{latestArticle.excerpt}</p>
            <p className="text-black font-inter font-semibold text-sm mt-3">Read more →</p>
          </Link>
        </motion.div>

        {/* Polling Average */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link to="/Polling" className={`block ${bubbleBase}`}>
            <p className="text-xs font-inter font-semibold text-black/60 uppercase tracking-wider mb-2">Polling Average</p>
            <h3 className="font-inter font-bold text-gray-900 text-base sm:text-lg leading-tight mb-3">
              Generic Congressional Ballot
            </h3>
            <div className="h-36 w-full mb-3">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={genericBallotData}>
                  <YAxis domain={[38, 55]} hide />
                  <Line type="monotone" dataKey="democrat" stroke="#0047AB" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="republican" stroke="#8B0000" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-4">
              <span className="text-sm font-inter font-semibold" style={{ color: '#0047AB' }}>Dem: 47%</span>
              <span className="text-sm font-inter font-semibold" style={{ color: '#8B0000' }}>Rep: 43%</span>
            </div>
            <p className="text-black font-inter font-semibold text-sm mt-2">View all polls →</p>
          </Link>
        </motion.div>

        {/* Interactive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link to="/SenateSwingometer" className={`block ${bubbleBase}`}>
            <p className="text-xs font-inter font-semibold text-black/60 uppercase tracking-wider mb-2">Interactive</p>
            <div className="w-full rounded-xl mb-3 overflow-hidden pointer-events-none" style={{ height: '144px' }}>
              <div style={{ transform: 'scale(0.45)', transformOrigin: 'top left', width: '222%', height: '222%' }}>
                <SwingMap baseResults={baseResults} swing={0} />
              </div>
            </div>
            <h3 className="font-inter font-bold text-gray-900 text-base sm:text-lg leading-tight mb-1">
              Senate Swingometer
            </h3>
            <p className="text-gray-700 font-inter text-sm">
              Swing the 2026 Senate map based on 2024 presidential results.
            </p>
            <p className="text-black font-inter font-semibold text-sm mt-3">Try it →</p>
          </Link>
        </motion.div>
      </div>

      {/* Row 2: Forecasts bubble centered */}
      <div className="max-w-7xl mx-auto mt-6 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="w-full md:w-1/2"
        >
          <Link to="/Forecasts" className={`block ${bubbleBase}`}>
            <p className="text-xs font-inter font-semibold text-black/60 uppercase tracking-wider mb-2">Forecasts</p>
            <h3 className="font-inter font-bold text-gray-900 text-xl sm:text-2xl leading-tight mb-2">
              2026 Election Forecasts
            </h3>
            <p className="text-gray-700 font-inter text-sm mb-3">
              Explore our Senate and Governors race forecasts with interactive maps, seat projections, and control probabilities.
            </p>
            <div className="flex gap-3 flex-wrap">
              <span className="bg-blue-100 text-blue-800 font-semibold text-xs px-3 py-1 rounded-full">Senate</span>
              <span className="bg-red-100 text-red-800 font-semibold text-xs px-3 py-1 rounded-full">Governors</span>
              <span className="bg-purple-100 text-purple-800 font-semibold text-xs px-3 py-1 rounded-full">Interactive Maps</span>
            </div>
            <p className="text-black font-inter font-semibold text-sm mt-3">View forecasts →</p>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}