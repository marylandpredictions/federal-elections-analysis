import React from 'react';
import { User } from 'lucide-react';

export default function TeamMember({ name, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-3 group transition-all duration-200 ${
      isSelected ? 'scale-105' : ''}`
      }>

      <div
        className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center transition-all duration-200 ${
        isSelected ?
        'bg-accent ring-4 ring-white/40' :
        'bg-accent/80 hover:bg-accent hover:ring-2 hover:ring-white/20'}`
        }>

        <User className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
      </div>
      <span className="text-white text-sm font-bold underline sm:text-base shimmer-hover">
        {name}
      </span>
    </button>);

}