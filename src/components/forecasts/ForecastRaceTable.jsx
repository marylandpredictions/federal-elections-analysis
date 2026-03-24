import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';

const ratingColors = {
  'Safe D': '#5689f7', 'Likely D': '#5689f7', 'Lean D': '#93C5FD', 'Tilt D': '#BFDBFE',
  'Toss Up': '#A855F7',
  'Tilt R': '#FECACA', 'Lean R': '#FCA5A5', 'Likely R': '#DC2626', 'Safe R': '#7F1D1D',
};

const ratingTextColors = {
  'Safe D': '#93C5FD', 'Likely D': '#60A5FA', 'Lean D': '#93C5FD', 'Tilt D': '#BFDBFE',
  'Toss Up': '#C084FC',
  'Tilt R': '#FECACA', 'Lean R': '#FCA5A5', 'Likely R': '#F87171', 'Safe R': '#FCA5A5',
};

const ratingOrder = ['Safe D','Likely D','Lean D','Tilt D','Toss Up','Tilt R','Lean R','Likely R','Safe R'];

const PAGE_SIZE = 20;

export default function ForecastRaceTable({ rows, title, showPcts = true, stateLabel = 'State' }) {
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState(null);
  const [sortDir, setSortDir] = useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
    setPage(1);
  };

  const getMargin = (row) => {
    if (row.dPct != null && row.rPct != null) return row.dPct - row.rPct;
    return null;
  };

  const sorted = [...rows].sort((a, b) => {
    if (!sortField) return 0;
    let valA, valB;
    if (sortField === 'state') { valA = a.state; valB = b.state; }
    else if (sortField === 'incumbent') { valA = a.incumbent || ''; valB = b.incumbent || ''; }
    else if (sortField === 'rating') { valA = ratingOrder.indexOf(a.rating); valB = ratingOrder.indexOf(b.rating); }
    else if (sortField === 'dPct') { valA = a.dPct ?? -Infinity; valB = b.dPct ?? -Infinity; }
    else if (sortField === 'rPct') { valA = a.rPct ?? -Infinity; valB = b.rPct ?? -Infinity; }
    else if (sortField === 'margin') { valA = getMargin(a) ?? -Infinity; valB = getMargin(b) ?? -Infinity; }

    if (typeof valA === 'string') {
      return sortDir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    return sortDir === 'asc' ? valA - valB : valB - valA;
  });

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const current = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ChevronUp className="h-3 w-3 opacity-30 inline ml-1" />;
    return sortDir === 'asc'
      ? <ChevronUp className="h-3 w-3 opacity-100 inline ml-1" />
      : <ChevronDown className="h-3 w-3 opacity-100 inline ml-1" />;
  };

  const thClass = "text-white font-bold cursor-pointer hover:text-white/70 select-none";

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 mt-8">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h3 className="text-white font-inter font-bold text-xl sm:text-2xl text-shadow-teal">{title}</h3>
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="bg-white/20 border-white/30 text-white hover:bg-white/30">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-white font-semibold px-3">Page {page} of {totalPages}</span>
            <Button variant="outline" size="icon" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="bg-white/20 border-white/30 text-white hover:bg-white/30">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-white/20 hover:bg-white/5">
              <TableHead className={thClass} onClick={() => handleSort('state')}>{stateLabel}<SortIcon field="state" /></TableHead>
              <TableHead className={thClass} onClick={() => handleSort('incumbent')}>Incumbent<SortIcon field="incumbent" /></TableHead>
              <TableHead className={thClass} onClick={() => handleSort('rating')}>Rating<SortIcon field="rating" /></TableHead>
              <TableHead className={thClass} onClick={() => handleSort('dPct')}>D%<SortIcon field="dPct" /></TableHead>
              <TableHead className={thClass} onClick={() => handleSort('rPct')}>R%<SortIcon field="rPct" /></TableHead>
              <TableHead className={thClass} onClick={() => handleSort('margin')}>Margin<SortIcon field="margin" /></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {current.map((row, i) => {
              const margin = showPcts && row.dPct != null && row.rPct != null
                ? Math.abs(row.dPct - row.rPct).toFixed(1)
                : null;
              const leader = showPcts && row.dPct != null && row.rPct != null
                ? (row.dPct >= row.rPct ? 'D' : 'R')
                : null;
              const marginColor = leader === 'D' ? '#60A5FA' : leader === 'R' ? '#F87171' : 'white';
              return (
                <TableRow key={i} className="border-white/10 hover:bg-white/5">
                  <TableCell className="text-white font-semibold">{row.state}</TableCell>
                  <TableCell className="text-white/80">{row.incumbent || '—'}</TableCell>
                  <TableCell>
                    <span className="px-2 py-0.5 rounded text-xs font-bold" style={{ backgroundColor: ratingColors[row.rating] + '44', color: ratingTextColors[row.rating] || 'white', border: `1px solid ${ratingColors[row.rating]}88` }}>
                      {row.rating}
                    </span>
                  </TableCell>
                  <TableCell style={{ color: '#60A5FA' }} className={leader === 'D' ? 'font-bold' : 'font-semibold'}>{row.dPct != null ? `${row.dPct}%` : '—'}</TableCell>
                  <TableCell style={{ color: '#F87171' }} className={leader === 'R' ? 'font-bold' : 'font-semibold'}>{row.rPct != null ? `${row.rPct}%` : '—'}</TableCell>
                  <TableCell style={{ color: marginColor }} className="font-bold">{margin != null ? `${leader} +${margin}%` : '—'}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}