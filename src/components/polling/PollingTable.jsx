import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PollingTable({ polls, type }) {
  const [currentPage, setCurrentPage] = useState(1);
  const pollsPerPage = 20;
  const totalPages = Math.ceil(polls.length / pollsPerPage);
  
  const startIndex = (currentPage - 1) * pollsPerPage;
  const endIndex = startIndex + pollsPerPage;
  const currentPolls = polls.slice(startIndex, endIndex);

  const isApproval = type.includes('approval');
  const isIllinois = type === 'illinois-dem-primary';

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white font-inter font-bold text-xl sm:text-2xl text-shadow-teal">
          Individual Polls
        </h3>
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-white font-semibold px-3">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-white/20 hover:bg-white/5">
              <TableHead className="text-white font-bold">Pollster</TableHead>
              <TableHead className="text-white font-bold">Date</TableHead>
              <TableHead className="text-white font-bold">Sample Size</TableHead>
              {isApproval ? (
                <>
                  <TableHead className="text-white font-bold">Approve</TableHead>
                  <TableHead className="text-white font-bold">Disapprove</TableHead>
                </>
              ) : isIllinois ? (
                <>
                  <TableHead className="text-white font-bold">Kelly</TableHead>
                  <TableHead className="text-white font-bold">Raja</TableHead>
                  <TableHead className="text-white font-bold">Stratton</TableHead>
                  <TableHead className="text-white font-bold">Other</TableHead>
                  <TableHead className="text-white font-bold">Undecided</TableHead>
                </>
              ) : (
                <>
                  <TableHead className="text-white font-bold">Cornyn</TableHead>
                  <TableHead className="text-white font-bold">Paxton</TableHead>
                  <TableHead className="text-white font-bold">Other</TableHead>
                  <TableHead className="text-white font-bold">Undecided</TableHead>
                </>
              )}
              <TableHead className="text-white font-bold">Margin</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPolls.map((poll, index) => {
              let marginColor = 'text-white';
              if (!isApproval && !isIllinois) {
                if (poll.margin.includes('Cornyn')) {
                  marginColor = '#8B0000';
                } else if (poll.margin.includes('Paxton')) {
                  marginColor = '#CC5500';
                }
              } else if (isIllinois) {
                if (poll.margin.includes('Raja')) {
                  marginColor = '#0047AB';
                } else if (poll.margin.includes('Stratton')) {
                  marginColor = '#006400';
                } else if (poll.margin.includes('Kelly')) {
                  marginColor = '#008080';
                }
              }
              
              return (
                <TableRow key={index} className="border-white/10 hover:bg-white/5">
                  <TableCell className="text-white">{poll.pollster}</TableCell>
                  <TableCell className="text-white">{poll.date}</TableCell>
                  <TableCell className="text-white">{poll.sampleSize > 0 ? poll.sampleSize.toLocaleString() : '–'}</TableCell>
                  {isApproval ? (
                    <>
                      <TableCell className="text-green-400 font-semibold">{poll.approve}%</TableCell>
                      <TableCell className="text-red-400 font-semibold">{poll.disapprove}%</TableCell>
                    </>
                  ) : isIllinois ? (
                    <>
                      <TableCell style={{ color: '#008080' }} className="font-semibold">{poll.kelly}%</TableCell>
                      <TableCell style={{ color: '#0047AB' }} className="font-semibold">{poll.raja}%</TableCell>
                      <TableCell style={{ color: '#006400' }} className="font-semibold">{poll.stratton}%</TableCell>
                      <TableCell className="text-gray-400 font-semibold">{poll.other > 0 ? `${poll.other}%` : '–'}</TableCell>
                      <TableCell className="text-gray-400 font-semibold">{poll.undecided > 0 ? `${poll.undecided}%` : '–'}</TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell style={{ color: '#8B0000' }} className="font-semibold">{poll.cornyn}%</TableCell>
                      <TableCell style={{ color: '#CC5500' }} className="font-semibold">{poll.paxton}%</TableCell>
                      <TableCell className="text-gray-400 font-semibold">{poll.other > 0 ? `${poll.other}%` : '–'}</TableCell>
                      <TableCell className="text-gray-400 font-semibold">{poll.undecided > 0 ? `${poll.undecided}%` : '–'}</TableCell>
                    </>
                  )}
                  <TableCell style={{ color: marginColor }} className="font-semibold">{poll.margin}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}