import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

const PAGE_SIZE = 20;

// rows: [{ state, incumbent, rating, dPct, rPct, showPcts }]
export default function ForecastRaceTable({ rows, title, showPcts = true }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(rows.length / PAGE_SIZE);
  const current = rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

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
              <TableHead className="text-white font-bold">State</TableHead>
              <TableHead className="text-white font-bold">Incumbent</TableHead>
              <TableHead className="text-white font-bold">Rating</TableHead>
              {showPcts && <TableHead className="text-white font-bold">D%</TableHead>}
              {showPcts && <TableHead className="text-white font-bold">R%</TableHead>}
              {showPcts && <TableHead className="text-white font-bold">Margin</TableHead>}
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
                  {showPcts && <TableCell style={{ color: '#60A5FA' }} className="font-semibold">{row.dPct != null ? `${row.dPct}%` : '—'}</TableCell>}
                  {showPcts && <TableCell style={{ color: '#F87171' }} className="font-semibold">{row.rPct != null ? `${row.rPct}%` : '—'}</TableCell>}
                  {showPcts && <TableCell style={{ color: marginColor }} className="font-semibold">{margin != null ? `${leader} +${margin}%` : '—'}</TableCell>}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}