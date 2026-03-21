import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { electionsData } from './Elections';

const BG = 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b6f149a83e2b792ef60e35/ec271415e_Screenshot2026-03-16at44509PM.png)';

export default function ElectionDetail() {
  const { id } = useParams();
  const election = electionsData.find(e => e.id === id);

  if (!election) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center" style={{ backgroundImage: BG, backgroundSize: 'cover' }}>
        <div className="text-white text-center">
          <p className="text-2xl font-bold mb-4">Election not found</p>
          <Link to="/Elections" className="text-white/70 hover:text-white underline">← Back to Elections</Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-[calc(100vh-4rem)] px-4 py-16 sm:py-24"
      style={{ backgroundImage: BG, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Link
            to="/Elections"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white font-inter text-sm mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Elections
          </Link>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-white font-inter font-bold text-3xl sm:text-4xl mb-1 hover:underline cursor-default">{election.state}</h1>
              <div className="text-white font-inter font-bold text-xl mb-1 hover:underline cursor-default">{election.electionType}</div>
              <div className="text-white font-inter font-bold text-base text-white/80 hover:underline cursor-default">{election.date}</div>
              {election.candidates.map(c => (
                <span
                  key={c.name}
                  className="font-inter text-base font-medium px-3 py-1 rounded-full transition-transform duration-150 hover:scale-110 cursor-default"
                  style={{ color: c.color, backgroundColor: c.color + '22', border: `1px solid ${c.color}66` }}
                >
                  {c.name} ({c.party})
                </span>
              ))}
            </div>

            <div className="border-t border-white/10 pt-6">
              <p className="text-white/85 font-inter text-base leading-relaxed">{election.fullDescription}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}