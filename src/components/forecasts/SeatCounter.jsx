import React from 'react';

export default function SeatCounter({ ratings }) {
  const counts = Object.values(ratings).reduce((acc, rating) => {
    if (rating === 'Safe D' || rating === 'Likely D' || rating === 'Lean D' || rating === 'Tilt D') {
      acc.democrat += 1;
    } else if (rating === 'Safe R' || rating === 'Likely R' || rating === 'Lean R' || rating === 'Tilt R') {
      acc.republican += 1;
    } else if (rating === 'Toss Up') {
      acc.tossUp += 1;
    }
    return acc;
  }, { democrat: 0, republican: 0, tossUp: 0 });

  return (
    <div className="flex justify-center gap-4 mb-6 flex-wrap">
      <div className="bg-blue-600 rounded-xl px-6 py-3 shadow-lg transition-transform duration-200 hover:scale-110 cursor-pointer">
        <div className="text-white font-bold text-2xl text-center">{counts.democrat}</div>
        <div className="text-white/90 text-sm text-center">Democrat</div>
      </div>
      
      <div className="bg-purple-600 rounded-xl px-6 py-3 shadow-lg transition-transform duration-200 hover:scale-110 cursor-pointer">
        <div className="text-white font-bold text-2xl text-center">{counts.tossUp}</div>
        <div className="text-white/90 text-sm text-center">Toss Up</div>
      </div>
      
      <div className="bg-red-600 rounded-xl px-6 py-3 shadow-lg transition-transform duration-200 hover:scale-110 cursor-pointer">
        <div className="text-white font-bold text-2xl text-center">{counts.republican}</div>
        <div className="text-white/90 text-sm text-center">Republican</div>
      </div>
    </div>
  );
}