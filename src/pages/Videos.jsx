import React from 'react';
import { motion } from 'framer-motion';
import VideoListItem from '../components/videos/VideoListItem';

const channelVideos = [
  { id: 'PF41fCCsSHk', title: '2026 Senate Elections Predictions' },
  { id: 'LZrEHsLJjas', title: '2026 Gubernatorial Elections Predictions' },
  { id: 'TqvMXuO98IU', title: 'Every U.S. State\'s Political Shift Over 30 Years' },
  { id: 'KjwIhR_XGOI', title: 'The Most Competitive U.S. Senate Races in 2026' },
  { id: '4YK9kB7wNMI', title: 'How Each State Voted in Every Presidential Election' },
  { id: '8e0gpGgX_BY', title: '2025 Virginia & New Jersey Governor Predictions' },
  { id: 'RQI0cN3gv8A', title: 'Every Governor\'s Approval Rating Ranked' },
  { id: 'WH-aGKC09TM', title: 'Predicting the 2028 Presidential Election (Way Too Early)' },
  { id: 'wYWfbCA39Qg', title: 'The Most Gerrymandered Congressional Districts' },
  { id: 'HkLnVp0RTGE', title: 'How Redistricting Will Change the 2026 Elections' },
  { id: 'XQv3Z0x1k2g', title: 'The Biggest Political Upsets in Recent History' },
];

const latestVideo = channelVideos[0];
const olderVideos = channelVideos.slice(1);

export default function Videos() {
  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-white font-inter font-bold text-2xl sm:text-3xl mb-8 text-center"
        >
          Latest Videos
        </motion.h2>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Featured / Latest Video - Left Half */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-primary/20">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${latestVideo.id}`}
                  title={latestVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-5">
                <h3 className="text-white font-inter font-bold text-lg sm:text-xl">
                  {latestVideo.title}
                </h3>
                <a
                  href="https://www.youtube.com/@FedElections"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 px-5 py-2 bg-accent rounded-lg text-white font-inter font-semibold text-sm shimmer-hover transition-all hover:bg-accent/80"
                >
                  Visit Channel
                </a>
              </div>
            </div>
          </motion.div>

          {/* Older Videos - Right Half */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:w-1/2"
          >
            <div className="bg-primary/20 rounded-2xl p-4 sm:p-5 max-h-[600px] overflow-y-auto">
              <h3 className="text-white font-inter font-bold text-lg mb-4 px-3">
                More Videos
              </h3>
              <div className="space-y-1">
                {olderVideos.map((video, index) => (
                  <VideoListItem key={video.id} video={video} index={index} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}