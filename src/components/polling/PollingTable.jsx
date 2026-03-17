import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PollingTable({ polls, type }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pollsterSearch, setPollsterSearch] = useState('');
  const pollsPerPage = 20;
  
  // Filter polls by pollster search
  const normalizeString = (str) => str.replace(/\s/g, '').toLowerCase();
  const filteredPolls = polls.filter(poll => {
    if (!pollsterSearch) return true;
    return normalizeString(poll.pollster).includes(normalizeString(pollsterSearch));
  });
  
  const totalPages = Math.ceil(filteredPolls.length / pollsPerPage);
  
  const startIndex = (currentPage - 1) * pollsPerPage;
  const endIndex = startIndex + pollsPerPage;
  const currentPolls = filteredPolls.slice(startIndex, endIndex);

  const isApproval = type.includes('approval');
  const isGenericBallot = type === 'generic-congressional-ballot';
  const isIllinois = type === 'illinois-dem-primary';
  const isIllinois9th = type === 'illinois-9th-house';
  const isFlorida = type === 'florida-gop-governor';
  const isGeorgia = type === 'georgia-gop-governor';
  const isSouthCarolina = type === 'south-carolina-gop-governor';
  const isArizona = type === 'arizona-gop-governor';
  const isDemPrimary = type === '2028-dem-primary';
  const isRepPrimary = type === '2028-rep-primary';

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-white font-inter font-bold text-xl sm:text-2xl text-shadow-teal">
          Individual Polls
        </h3>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Input
            type="text"
            placeholder="Search pollster..."
            value={pollsterSearch}
            onChange={(e) => {
              setPollsterSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full sm:w-64 bg-white/10 text-white border-white/30 placeholder:text-white/50 focus:border-white/50"
          />
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
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-white/20 hover:bg-white/5">
              <TableHead className="text-white font-bold">Pollster</TableHead>
              <TableHead className="text-white font-bold">Date</TableHead>
              <TableHead className="text-white font-bold">Sample Size</TableHead>
              {isGenericBallot ? (
                <>
                  <TableHead className="text-white font-bold">Democrat</TableHead>
                  <TableHead className="text-white font-bold">Republican</TableHead>
                </>
              ) : isApproval ? (
                <>
                  <TableHead className="text-white font-bold">Approve</TableHead>
                  <TableHead className="text-white font-bold">Disapprove</TableHead>
                </>
              ) : isArizona ? (
                <>
                  <TableHead className="text-white font-bold">Biggs</TableHead>
                  <TableHead className="text-white font-bold">Robson</TableHead>
                  <TableHead className="text-white font-bold">Schweikert</TableHead>
                  <TableHead className="text-white font-bold">Other</TableHead>
                  <TableHead className="text-white font-bold">Undecided</TableHead>
                </>
              ) : isDemPrimary ? (
                <>
                  <TableHead className="text-white font-bold">Harris</TableHead>
                  <TableHead className="text-white font-bold">Newsom</TableHead>
                  <TableHead className="text-white font-bold">Buttigieg</TableHead>
                  <TableHead className="text-white font-bold">AOC</TableHead>
                  <TableHead className="text-white font-bold">Pritzker</TableHead>
                  <TableHead className="text-white font-bold">Shapiro</TableHead>
                  <TableHead className="text-white font-bold">Booker</TableHead>
                  <TableHead className="text-white font-bold">Other</TableHead>
                </>
              ) : isRepPrimary ? (
                <>
                  <TableHead className="text-white font-bold">Vance</TableHead>
                  <TableHead className="text-white font-bold">Trump Jr.</TableHead>
                  <TableHead className="text-white font-bold">Rubio</TableHead>
                  <TableHead className="text-white font-bold">Cruz</TableHead>
                  <TableHead className="text-white font-bold">Haley</TableHead>
                  <TableHead className="text-white font-bold">DeSantis</TableHead>
                  <TableHead className="text-white font-bold">RFK Jr.</TableHead>
                  <TableHead className="text-white font-bold">Ramaswamy</TableHead>
                  <TableHead className="text-white font-bold">Other</TableHead>
                  <TableHead className="text-white font-bold">Undecided</TableHead>
                </>
              ) : isSouthCarolina ? (
                <>
                  <TableHead className="text-white font-bold">Mace</TableHead>
                  <TableHead className="text-white font-bold">Wilson</TableHead>
                  <TableHead className="text-white font-bold">Evette</TableHead>
                  <TableHead className="text-white font-bold">Norman</TableHead>
                  <TableHead className="text-white font-bold">Kimbrell</TableHead>
                  <TableHead className="text-white font-bold">Other</TableHead>
                  <TableHead className="text-white font-bold">Undecided</TableHead>
                </>
              ) : isGeorgia ? (
                <>
                  <TableHead className="text-white font-bold">Jones</TableHead>
                  <TableHead className="text-white font-bold">Jackson</TableHead>
                  <TableHead className="text-white font-bold">Raffensperger</TableHead>
                  <TableHead className="text-white font-bold">Carr</TableHead>
                  <TableHead className="text-white font-bold">Dean</TableHead>
                  <TableHead className="text-white font-bold">Other</TableHead>
                  <TableHead className="text-white font-bold">Undecided</TableHead>
                </>
              ) : isFlorida ? (
                <>
                  <TableHead className="text-white font-bold">Donalds</TableHead>
                  <TableHead className="text-white font-bold">Fishback</TableHead>
                  <TableHead className="text-white font-bold">Collins</TableHead>
                  <TableHead className="text-white font-bold">Renner</TableHead>
                  <TableHead className="text-white font-bold">Other</TableHead>
                  <TableHead className="text-white font-bold">Undecided</TableHead>
                </>
              ) : isIllinois9th ? (
                <>
                  <TableHead className="text-white font-bold">Biss</TableHead>
                  <TableHead className="text-white font-bold">Fine</TableHead>
                  <TableHead className="text-white font-bold">Abughazaleh</TableHead>
                  <TableHead className="text-white font-bold">Simmons</TableHead>
                  <TableHead className="text-white font-bold">Amiwala</TableHead>
                  <TableHead className="text-white font-bold">Andrew</TableHead>
                  <TableHead className="text-white font-bold">Other</TableHead>
                  <TableHead className="text-white font-bold">Undecided</TableHead>
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
              if (isGenericBallot) {
                if (poll.margin.includes('Generic D')) {
                  marginColor = '#0047AB';
                } else if (poll.margin.includes('Generic R')) {
                  marginColor = '#8B0000';
                }
              } else if (isSouthCarolina) {
                if (poll.margin.includes('Mace')) {
                  marginColor = '#8B0000';
                } else if (poll.margin.includes('Wilson')) {
                  marginColor = '#006400';
                } else if (poll.margin.includes('Evette')) {
                  marginColor = '#C71585';
                } else if (poll.margin.includes('Norman')) {
                  marginColor = '#FF6600';
                }
              } else if (isGeorgia) {
                if (poll.margin.includes('Jones')) {
                  marginColor = '#8B0000';
                } else if (poll.margin.includes('Jackson')) {
                  marginColor = '#C71585';
                } else if (poll.margin.includes('Raffensperger')) {
                  marginColor = '#DAA520';
                } else if (poll.margin.includes('Carr')) {
                  marginColor = '#FF6600';
                }
              } else if (isFlorida) {
                if (poll.margin.includes('Donalds')) {
                  marginColor = '#8B0000';
                } else if (poll.margin.includes('Fishback')) {
                  marginColor = '#FF6600';
                } else if (poll.margin.includes('Collins')) {
                  marginColor = '#C71585';
                } else if (poll.margin.includes('Renner')) {
                  marginColor = '#DAA520';
                }
              } else if (!isApproval && !isIllinois && !isIllinois9th) {
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
              } else if (isIllinois9th) {
                if (poll.margin.includes('Biss')) {
                  marginColor = '#008080';
                } else if (poll.margin.includes('Fine')) {
                  marginColor = '#8B0000';
                } else if (poll.margin.includes('Abughazaleh')) {
                  marginColor = '#C71585';
                } else if (poll.margin.includes('Simmons')) {
                  marginColor = '#006400';
                } else if (poll.margin.includes('Amiwala')) {
                  marginColor = '#4B0082';
                } else if (poll.margin.includes('Andrew')) {
                  marginColor = '#FFD700';
                }
              }
              
              return (
                <TableRow key={index} className="border-white/10 hover:bg-white/5">
                  <TableCell className="text-white">{poll.pollster}</TableCell>
                  <TableCell className="text-white">{poll.date}</TableCell>
                  <TableCell className="text-white">{poll.sampleSize > 0 ? poll.sampleSize.toLocaleString() : '–'}</TableCell>
                  {isGenericBallot ? (
                    <>
                      <TableCell style={{ color: '#0047AB' }} className="font-semibold">{poll.democrat}%</TableCell>
                      <TableCell style={{ color: '#8B0000' }} className="font-semibold">{poll.republican}%</TableCell>
                    </>
                  ) : isApproval ? (
                    <>
                      <TableCell className="text-green-400 font-semibold">{poll.approve}%</TableCell>
                      <TableCell className="text-red-400 font-semibold">{poll.disapprove}%</TableCell>
                    </>
                  ) : isSouthCarolina ? (
                    <>
                      <TableCell style={{ color: '#8B0000' }} className="font-semibold">{poll.mace}%</TableCell>
                      <TableCell style={{ color: '#006400' }} className="font-semibold">{poll.wilson}%</TableCell>
                      <TableCell style={{ color: '#C71585' }} className="font-semibold">{poll.evette}%</TableCell>
                      <TableCell style={{ color: '#FF6600' }} className="font-semibold">{poll.norman}%</TableCell>
                      <TableCell className="text-gray-400 font-semibold">{poll.kimbrell > 0 ? `${poll.kimbrell}%` : '–'}</TableCell>
                      <TableCell className="text-gray-400 font-semibold">{poll.other > 0 ? `${poll.other}%` : '–'}</TableCell>
                      <TableCell className="text-gray-400 font-semibold">{poll.undecided > 0 ? `${poll.undecided}%` : '–'}</TableCell>
                    </>
                  ) : isGeorgia ? (
                    <>
                      <TableCell style={{ color: '#8B0000' }} className="font-semibold">{poll.jones}%</TableCell>
                      <TableCell style={{ color: '#C71585' }} className="font-semibold">{poll.jackson}%</TableCell>
                      <TableCell style={{ color: '#DAA520' }} className="font-semibold">{poll.raffensperger}%</TableCell>
                      <TableCell style={{ color: '#FF6600' }} className="font-semibold">{poll.carr}%</TableCell>
                      <TableCell className="text-gray-400 font-semibold">{poll.dean > 0 ? `${poll.dean}%` : '–'}</TableCell>
                      <TableCell className="text-gray-400 font-semibold">{poll.other > 0 ? `${poll.other}%` : '–'}</TableCell>
                      <TableCell className="text-gray-400 font-semibold">{poll.undecided > 0 ? `${poll.undecided}%` : '–'}</TableCell>
                    </>
                  ) : isFlorida ? (
                    <>
                      <TableCell style={{ color: '#8B0000' }} className="font-semibold">{poll.donalds}%</TableCell>
                      <TableCell style={{ color: '#FF6600' }} className="font-semibold">{poll.fishback}%</TableCell>
                      <TableCell style={{ color: '#C71585' }} className="font-semibold">{poll.collins}%</TableCell>
                      <TableCell style={{ color: '#DAA520' }} className="font-semibold">{poll.renner}%</TableCell>
                      <TableCell className="text-gray-400 font-semibold">{poll.other > 0 ? `${poll.other}%` : '–'}</TableCell>
                      <TableCell className="text-gray-400 font-semibold">{poll.undecided > 0 ? `${poll.undecided}%` : '–'}</TableCell>
                    </>
                  ) : isIllinois9th ? (
                    <>
                      <TableCell style={{ color: '#008080' }} className="font-semibold">{poll.biss}%</TableCell>
                      <TableCell style={{ color: '#8B0000' }} className="font-semibold">{poll.fine}%</TableCell>
                      <TableCell style={{ color: '#C71585' }} className="font-semibold">{poll.abughazaleh}%</TableCell>
                      <TableCell style={{ color: '#006400' }} className="font-semibold">{poll.simmons}%</TableCell>
                      <TableCell style={{ color: '#4B0082' }} className="font-semibold">{poll.amiwala}%</TableCell>
                      <TableCell style={{ color: '#FFD700' }} className="font-semibold">{poll.andrew}%</TableCell>
                      <TableCell className="text-gray-400 font-semibold">{poll.other > 0 ? `${poll.other}%` : '–'}</TableCell>
                      <TableCell className="text-gray-400 font-semibold">{poll.undecided > 0 ? `${poll.undecided}%` : '–'}</TableCell>
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