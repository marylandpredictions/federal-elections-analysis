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
      <div className="bg-blue-900/60 rounded-xl px-6 py-3 text-center min-w-[100px] shadow-lg transition-transform duration-200 hover:scale-110 cursor-pointer">
        <div className="text-3xl font-bold text-blue-300">{counts.democrat}</div>
        <div className="text-blue-200/70 text-sm mt-1">Democrat</div>
      </div>
      <div className="bg-purple-900/60 rounded-xl px-6 py-3 text-center min-w-[100px] shadow-lg transition-transform duration-200 hover:scale-110 cursor-pointer">
        <div className="text-3xl font-bold text-purple-300">{counts.tossUp}</div>
        <div className="text-purple-200/70 text-sm mt-1">Toss Up</div>
      </div>
      <div className="bg-red-900/60 rounded-xl px-6 py-3 text-center min-w-[100px] shadow-lg transition-transform duration-200 hover:scale-110 cursor-pointer">
        <div className="text-3xl font-bold text-red-300">{counts.republican}</div>
        <div className="text-red-200/70 text-sm mt-1">Republican</div>
      </div>
    </div>
  );
}