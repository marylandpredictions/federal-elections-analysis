import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function PollSelector({ options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const normalize = (s) => s.replace(/\s/g, '').toLowerCase();
  const filtered = options.filter(o => !search || normalize(o.label).includes(normalize(search)));
  const selected = options.find(o => o.value === value);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
        setSearch('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleOpen() {
    setOpen(true);
    setSearch('');
    setTimeout(() => inputRef.current?.focus(), 30);
  }

  function handleSelect(val) {
    onChange(val);
    setOpen(false);
    setSearch('');
  }

  function partyColor(party) {
    if (party === 'rep') return '#EF4444';
    if (party === 'dem') return '#3B82F6';
    return '#9CA3AF'; // gray for open/generic
  }

  return (
    <div ref={containerRef} className="relative w-full sm:w-80">
      <button
        onClick={handleOpen}
        className="w-full flex items-center justify-between bg-black text-white border border-white/30 rounded-md px-3 py-2 text-sm hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-2 truncate">
          {selected && (
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: partyColor(selected.party) }} />
          )}
          <span className="truncate text-left">{selected ? selected.label : 'Select polling average'}</span>
        </div>
        <ChevronDown className="w-4 h-4 opacity-50 flex-shrink-0 ml-2" />
      </button>
      {open && (
        <div className="absolute z-50 top-full left-0 mt-1 w-full bg-black border border-white/30 rounded-lg shadow-xl overflow-hidden">
          <div className="px-2 pt-2 pb-1 sticky top-0 bg-black">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search polls..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/10 text-white border border-white/30 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
          <div className="max-h-64 overflow-y-auto">
            {filtered.length > 0 ? filtered.map(o => (
              <button
                key={o.value}
                onClick={() => handleSelect(o.value)}
                className={`w-full text-left px-3 py-2 text-sm text-white hover:bg-white/20 transition-colors flex items-center gap-2 ${o.value === value ? 'bg-white/10 font-semibold' : ''}`}
              >
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: partyColor(o.party) }} />
                {o.label}
              </button>
            )) : (
              <div className="px-3 py-2 text-white/60 text-sm">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}