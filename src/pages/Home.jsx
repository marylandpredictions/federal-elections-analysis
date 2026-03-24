import React from 'react';
import { electionsData } from './Elections';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import SwingMap from '../components/swingometer/SwingMap';
import articles from '../lib/articlesData';



const latestArticle = articles[0];

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

const bubbleBase = "bg-black/50 backdrop-blur-sm rounded-2xl p-5 shadow-lg hover:bg-white/15 transition-all duration-300 hover:shadow-xl border border-white/10 hover:border-white/30";

export default function Home() {
  return (
    <div
      className="min-h-[calc(100vh-4rem)] px-4 py-16 sm:py-24 bg-background"
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
        <p className="text-white font-inter font-bold text-lg sm:text-xl md:text-2xl mt-6 text-shadow-teal bg-primary/90 rounded-3xl px-8 py-4 inline-block transition-all duration-300 hover:scale-102 cursor-pointer">
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
          <Link to={`/ArticleView/${latestArticle.id}`} className={`block ${bubbleBase}`}>
            <p className="text-xs font-inter font-semibold text-white/60 uppercase tracking-wider mb-2">Latest Article</p>
            <img
              src={latestArticle.image}
              alt={latestArticle.title}
              className="w-full h-36 object-cover rounded-xl mb-3"
            />
            <h3 className="font-inter font-bold text-white text-base sm:text-lg leading-tight mb-1">
              {latestArticle.title}
            </h3>
            <p className="text-xs text-white/50 font-inter mb-2">By {latestArticle.author} · {latestArticle.date}</p>
            <p className="text-white/70 font-inter text-sm line-clamp-3">{latestArticle.excerpt || latestArticle.content?.slice(0, 150) + '...'}</p>
            <p className="text-white font-inter font-semibold text-sm mt-3">Read more →</p>
          </Link>
        </motion.div>

        {/* Polling Average */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link to="/Polling" className={`block ${bubbleBase}`}>
            <p className="text-xs font-inter font-semibold text-white/60 uppercase tracking-wider mb-2">Polling Average</p>
            <h3 className="font-inter font-bold text-white text-base sm:text-lg leading-tight mb-3">
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
              <span className="text-sm font-inter font-semibold" style={{ color: '#0047AB' }}>Dem: 45.3%</span>
              <span className="text-sm font-inter font-semibold" style={{ color: '#8B0000' }}>Rep: 42.7%</span>
            </div>
            <p className="text-white font-inter font-semibold text-sm mt-2">View all polls →</p>
          </Link>
        </motion.div>

        {/* Interactive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link to="/SenateSwingometer" className={`block ${bubbleBase}`}>
            <p className="text-xs font-inter font-semibold text-white/60 uppercase tracking-wider mb-2">Interactive</p>
            <div className="w-full rounded-xl mb-3 overflow-hidden pointer-events-none" style={{ height: '144px' }}>
              <div style={{ transform: 'scale(0.45)', transformOrigin: 'top left', width: '222%', height: '222%' }}>
                <SwingMap baseResults={baseResults} swing={0} />
              </div>
            </div>
            <h3 className="font-inter font-bold text-white text-base sm:text-lg leading-tight mb-1">
              Senate Swingometer
            </h3>
            <p className="text-white/70 font-inter text-sm">
              Swing the 2026 Senate map based on 2024 presidential results.
            </p>
            <p className="text-white font-inter font-semibold text-sm mt-3">Try it →</p>
          </Link>
        </motion.div>
      </div>

      {/* Row 2: Forecasts + Upcoming Election */}
      <div className="max-w-7xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link to="/Forecasts" className={`block ${bubbleBase}`}>
            <p className="text-xs font-inter font-semibold text-white/60 uppercase tracking-wider mb-2">Forecasts</p>
            <h3 className="font-inter font-bold text-white text-xl sm:text-2xl leading-tight mb-2">
              2026 Election Forecasts
            </h3>
            <p className="text-white/70 font-inter text-sm mb-3">
              Explore our Senate and Governors race forecasts with interactive maps, seat projections, and control probabilities.
            </p>
            <div className="flex gap-3 flex-wrap">
              <span className="bg-blue-100 text-blue-800 font-semibold text-xs px-3 py-1 rounded-full">Senate</span>
              <span className="bg-red-100 text-red-800 font-semibold text-xs px-3 py-1 rounded-full">Governors</span>
              <span className="bg-purple-100 text-purple-800 font-semibold text-xs px-3 py-1 rounded-full">Interactive Maps</span>
            </div>
            <p className="text-white font-inter font-semibold text-sm mt-3">View forecasts →</p>
          </Link>
        </motion.div>

        {/* Upcoming Election */}
        {electionsData[0] && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Link to={`/ElectionDetail/${electionsData[0].id}`} className={`block ${bubbleBase}`}>
              <p className="text-xs font-inter font-semibold text-white/60 uppercase tracking-wider mb-2">Upcoming Election</p>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="font-inter font-bold text-white text-xl sm:text-2xl leading-tight mb-1">{electionsData[0].state}</h3>
                  <p className="font-inter font-bold text-white/80 text-base mb-0.5">{electionsData[0].electionType}</p>
                  <p className="font-inter font-bold text-white/60 text-sm mb-3">{electionsData[0].date}</p>
                  <div className="flex gap-2 flex-wrap mb-3">
                    {electionsData[0].candidates.map(c => (
                      <span key={c.name} className="text-sm font-inter font-semibold" style={{ color: c.color }}>
                        {c.name} ({c.party})
                      </span>
                    ))}
                  </div>
                  <p className="text-white/70 font-inter text-sm line-clamp-3">{electionsData[0].preview}</p>
                </div>
                {electionsData[0].stateIcon && (
                  <img src={electionsData[0].stateIcon} alt={electionsData[0].state} className="w-12 h-12 object-contain flex-shrink-0 opacity-80" />
                )}
              </div>
              <p className="text-white font-inter font-semibold text-sm mt-3">View details →</p>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}