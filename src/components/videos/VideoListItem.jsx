import React from 'react';

export default function VideoListItem({ video, index }) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-3 p-3 rounded-xl hover:bg-primary/30 transition-all duration-200 group"
    >
      <span className="text-white/40 font-inter font-bold text-sm mt-1 min-w-[24px]">
        {index + 2}
      </span>
      <img
        src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
        alt={video.title}
        className="w-28 sm:w-32 h-16 sm:h-18 rounded-lg object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h4 className="text-white font-inter font-semibold text-sm leading-snug line-clamp-2 shimmer-hover">
          {video.title}
        </h4>
      </div>
    </a>
  );
}