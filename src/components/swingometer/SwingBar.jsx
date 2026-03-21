import React, { useRef, useState, useEffect } from 'react';

export default function SwingBar({ swing, setSwing }) {
  const barRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => setIsDragging(true);
  
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging || !barRef.current) return;
    
    const rect = barRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const clampedPercentage = Math.max(0, Math.min(100, percentage));
    const swingValue = ((clampedPercentage - 50) / 50) * 20;
    setSwing(Math.round(swingValue * 10) / 10);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !barRef.current) return;
    
    const touch = e.touches[0];
    const rect = barRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const clampedPercentage = Math.max(0, Math.min(100, percentage));
    const swingValue = ((clampedPercentage - 50) / 50) * 20;
    setSwing(Math.round(swingValue * 10) / 10);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [isDragging]);

  const knobPosition = ((swing + 20) / 40) * 100;

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8" style={{ border: '2px solid white' }}>
      <div className="mb-6 text-center">
        <span className="text-white font-inter font-bold text-2xl sm:text-3xl">
          {swing > 0 ? `R +${swing.toFixed(1)}%` : swing < 0 ? `D +${Math.abs(swing).toFixed(1)}%` : 'No Swing'}
        </span>
      </div>

      <div
        ref={barRef}
        className="relative h-12 rounded-full cursor-pointer overflow-hidden"
        style={{
          background: 'linear-gradient(to right, #2663EB 0%, #9334EB 50%, #DC2627 100%)'
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div
          className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-4 border-white bg-transparent cursor-grab active:cursor-grabbing transition-all"
          style={{
            left: `calc(${knobPosition}% - 1rem)`
          }}
        />
      </div>

      <div className="flex justify-between mt-4 text-white font-inter text-xs sm:text-sm">
        <span>D +20%</span>
        <span>Even</span>
        <span>R +20%</span>
      </div>
    </div>
  );
}