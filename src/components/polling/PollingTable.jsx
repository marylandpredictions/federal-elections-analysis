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
  const isMaine = type === 'maine-dem-senate';
  const isCaliforniaGov = type === 'california-governor';
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
              {isCaliforniaGov ? (
                <>
                  <TableHead className="text-white font-bold">Swalwell</TableHead>
                  <TableHead className="text-white font-bold">Hilton</TableHead>
                  <TableHead className="text-white font-bold">Bianco</TableHead>
                  <TableHead className="text-white font-bold">Porter</TableHead>
                  <TableHead className="text-white font-bold">Steyer</TableHead>
                  <TableHead className="text-white font-bold">Mahan</TableHead>
                  <TableHead className="text-white font-bold">Becerra</TableHead>
                  <TableHead className="text-white font-bold">Other</TableHead>
                  <TableHead className="text-white font-bold">Undecided</TableHead>
                </>
              ) : isMaine ? (
                <>
                  <TableHead className="text-white font-bold">Mills</TableHead>
                  <TableHead className="text-white font-bold">Platner</TableHead>
                  <TableHead className="text-white font-bold">Costello</TableHead>
                  <TableHead className="text-white font-bold">Other</TableHead>
                  <TableHead className="text-white font-bold">Undecided</TableHead>
                </>
              ) : isGenericBallot ? (
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
              if (isCaliforniaGov) {
                if (poll.margin.includes('Swalwell')) marginColor = '#3B82F6';
                else if (poll.margin.includes('Hilton')) marginColor = '#F472B6';
                else if (poll.margin.includes('Bianco')) marginColor = '#F97316';
                else if (poll.margin.includes('Porter')) marginColor = '#A78BFA';
                else if (poll.margin.includes('Steyer')) marginColor = '#84CC16';
                else if (poll.margin.includes('Mahan')) marginColor = '#22D3EE';
                else if (poll.margin.includes('Becerra')) marginColor = '#FBBF24';
              } else if (isMaine) {
                if (poll.margin.includes('Mills')) marginColor = '#1976D2';
                else if (poll.margin.includes('Platner')) marginColor = '#FFD600';
              } else if (isGenericBallot) {
                if (poll.margin.includes('Generic D')) marginColor = '#1E90FF';
                else if (poll.margin.includes('Generic R')) marginColor = '#FF2020';
              } else if (isArizona) {
                if (poll.margin.includes('Biggs')) marginColor = '#EF4444';
                else if (poll.margin.includes('Robson')) marginColor = '#F97316';
                else if (poll.margin.includes('Schweikert')) marginColor = '#FBBF24';
              } else if (isDemPrimary) {
                if (poll.margin.includes('Harris')) marginColor = '#3B82F6';
                else if (poll.margin.includes('Newsom')) marginColor = '#06B6D4';
                else if (poll.margin.includes('Buttigieg')) marginColor = '#22C55E';
                else if (poll.margin.includes('AOC') || poll.margin.includes('Ocasio')) marginColor = '#F97316';
                else if (poll.margin.includes('Pritzker')) marginColor = '#EF4444';
                else if (poll.margin.includes('Shapiro')) marginColor = '#94A3B8';
                else if (poll.margin.includes('Booker')) marginColor = '#FBBF24';
              } else if (isRepPrimary) {
                if (poll.margin.includes('Vance')) marginColor = '#EF4444';
                else if (poll.margin.includes('Trump Jr')) marginColor = '#F97316';
                else if (poll.margin.includes('Rubio')) marginColor = '#FBBF24';
                else if (poll.margin.includes('Cruz')) marginColor = '#22D3EE';
                else if (poll.margin.includes('Haley')) marginColor = '#F472B6';
                else if (poll.margin.includes('DeSantis')) marginColor = '#4ADE80';
                else if (poll.margin.includes('RFK') || poll.margin.includes('Kennedy')) marginColor = '#94A3B8';
                else if (poll.margin.includes('Ramaswamy')) marginColor = '#D4956A';
              } else if (isSouthCarolina) {
                if (poll.margin.includes('Mace')) marginColor = '#EF4444';
                else if (poll.margin.includes('Wilson')) marginColor = '#4ADE80';
                else if (poll.margin.includes('Evette')) marginColor = '#F472B6';
                else if (poll.margin.includes('Norman')) marginColor = '#F97316';
              } else if (isGeorgia) {
                if (poll.margin.includes('Jones')) marginColor = '#EF4444';
                else if (poll.margin.includes('Jackson')) marginColor = '#F472B6';
                else if (poll.margin.includes('Raffensperger')) marginColor = '#FBBF24';
                else if (poll.margin.includes('Carr')) marginColor = '#F97316';
              } else if (isFlorida) {
                if (poll.margin.includes('Donalds')) marginColor = '#EF4444';
                else if (poll.margin.includes('Fishback')) marginColor = '#F97316';
                else if (poll.margin.includes('Collins')) marginColor = '#F472B6';
                else if (poll.margin.includes('Renner')) marginColor = '#FBBF24';
              } else if (!isApproval && !isIllinois && !isIllinois9th) {
                if (poll.margin.includes('Cornyn')) marginColor = '#EF4444';
                else if (poll.margin.includes('Paxton')) marginColor = '#F97316';
              } else if (isIllinois) {
                if (poll.margin.includes('Raja')) marginColor = '#3B82F6';
                else if (poll.margin.includes('Stratton')) marginColor = '#22C55E';
                else if (poll.margin.includes('Kelly')) marginColor = '#22D3EE';
              } else if (isIllinois9th) {
                if (poll.margin.includes('Biss')) marginColor = '#22D3EE';
                else if (poll.margin.includes('Fine')) marginColor = '#EF4444';
                else if (poll.margin.includes('Abughazaleh')) marginColor = '#F472B6';
                else if (poll.margin.includes('Simmons')) marginColor = '#22C55E';
                else if (poll.margin.includes('Amiwala')) marginColor = '#A78BFA';
                else if (poll.margin.includes('Andrew')) marginColor = '#FBBF24';
              }
              
              return (
                <TableRow key={index} className="border-white/10 hover:bg-white/5">
                  <TableCell className="text-white">{poll.pollster}</TableCell>
                  <TableCell className="text-white">{poll.date}</TableCell>
                  <TableCell className="text-white">{poll.sampleSize > 0 ? poll.sampleSize.toLocaleString() : '–'}</TableCell>
                  {isCaliforniaGov ? (
                    <>
                      <TableCell style={{ color: '#3B82F6' }} className="font-semibold">{poll.swalwell > 0 ? `${poll.swalwell}%` : '–'}</TableCell>
                      <TableCell style={{ color: '#F472B6' }} className="font-semibold">{poll.hilton > 0 ? `${poll.hilton}%` : '–'}</TableCell>
                      <TableCell style={{ color: '#F97316' }} className="font-semibold">{poll.bianco > 0 ? `${poll.bianco}%` : '–'}</TableCell>
                      <TableCell style={{ color: '#A78BFA' }} className="font-semibold">{poll.porter > 0 ? `${poll.porter}%` : '–'}</TableCell>
                      <TableCell style={{ color: '#84CC16' }} className="font-semibold">{poll.steyer > 0 ? `${poll.steyer}%` : '–'}</TableCell>
                      <TableCell style={{ color: '#22D3EE' }} className="font-semibold">{poll.mahan > 0 ? `${poll.mahan}%` : '–'}</TableCell>
                      <TableCell style={{ color: '#FBBF24' }} className="font-semibold">{poll.becerra > 0 ? `${poll.becerra}%` : '–'}</TableCell>
                      <TableCell className="text-gray-400 font-semibold">{poll.other > 0 ? `${poll.other}%` : '–'}</TableCell>
                      <TableCell className="text-gray-400 font-semibold">{poll.undecided > 0 ? `${poll.undecided}%` : '–'}</TableCell>
                    </>
                  ) : isMaine ? (
                    <>
                      <TableCell style={{ color: '#1976D2' }} className="font-semibold">{poll.mills}%</TableCell>
                      <TableCell style={{ color: '#FFD600' }} className="font-semibold">{poll.platner}%</TableCell>
                      <TableCell style={{ color: '#00ACC1' }} className="font-semibold">{poll.costello > 0 ? `${poll.costello}%` : '–'}</TableCell>
                      <TableCell className="text-gray-400 font-semibold">{poll.other > 0 ? `${poll.other}%` : '–'}</TableCell>
                      <TableCell className="text-gray-400 font-semibold">{poll.undecided > 0 ? `${poll.undecided}%` : '–'}</TableCell>
                    </>
                  ) : isGenericBallot ? (
                    <>
                      <TableCell style={{ color: '#1E90FF' }} className="font-semibold">{poll.democrat}%</TableCell>
                      <TableCell style={{ color: '#FF2020' }} className="font-semibold">{poll.republican}%</TableCell>
                    </>
                  ) : isApproval ? (
                    <>
                      <TableCell className="text-green-400 font-semibold">{poll.approve}%</TableCell>
                      <TableCell className="text-red-400 font-semibold">{poll.disapprove}%</TableCell>
                    </>
                  ) : isArizona ? (
                    <>
                      <TableCell style={{ color: '#EF4444' }} className="font-semibold">{poll.biggs}%</TableCell>
                      <TableCell style={{ color: '#F97316' }} className="font-semibold">{poll.robson > 0 ? `${poll.robson}%` : '–'}</TableCell>
                      <TableCell style={{ color: '#FBBF24' }} className="font-semibold">{poll.schweikert > 0 ? `${poll.schweikert}%` : '–'}</TableCell>
                      <TableCell className="text-gray-400 font-semibold">{poll.other > 0 ? `${poll.other}%` : '–'}</TableCell>
                      <TableCell className="text-gray-400 font-semibold">{poll.undecided > 0 ? `${poll.undecided}%` : '–'}</TableCell>
                  ) : isDemPrimary ? (
                    <>
                      <TableCell style={{ color: '#3B82F6' }} className="font-semibold">{poll.harris > 0 ? `${poll.harris}%` : '–'}</TableCell>
                      <TableCell style={{ color: '#06B6D4' }} className="font-semibold">{poll.newsom > 0 ? `${poll.newsom}%` : '–'}</TableCell>
                      <TableCell style={{ color: '#22C55E' }} className="font-semibold">{poll.buttigieg > 0 ? `${poll.buttigieg}%` : '–'}</TableCell>
                      <TableCell style={{ color: '#F97316' }} className="font-semibold">{poll.aoc > 0 ? `${poll.aoc}%` : '–'}</TableCell>
                      <TableCell style={{ color: '#EF4444' }} className="font-semibold">{poll.pritzker > 0 ? `${poll.pritzker}%` : '–'}</TableCell>
                      <TableCell style={{ color: '#94A3B8' }} className="font-semibold">{poll.shapiro > 0 ? `${poll.shapiro}%` : '–'}</TableCell>
                      <TableCell style={{ color: '#FBBF24' }} className="font-semibold">{poll.booker > 0 ? `${poll.booker}%` : '–'}</TableCell>
                      <TableCell className="text-gray-400 font-semibold">{poll.other > 0 ? `${poll.other}%` : '–'}</TableCell>
                    </>
                  ) : isRepPrimary ? (
                    <>
                      <TableCell style={{ color: '#EF4444' }} className="font-semibold">{poll.vance > 0 ? `${poll.vance}%` : '–'}</TableCell>
                      <TableCell style={{ color: '#F97316' }} className="font-semibold">{poll.trumpjr > 0 ? `${poll.trumpjr}%` : '–'}</TableCell>
                      <TableCell style={{ color: '#FBBF24' }} className="font-semibold">{poll.rubio > 0 ? `${poll.rubio}%` : '–'}</TableCell>
                      <TableCell style={{ color: '#22D3EE' }} className="font-semibold">{poll.cruz > 0 ? `${poll.cruz}%` : '–'}</TableCell>
                      <TableCell style={{ color: '#F472B6' }} className="font-semibold">{poll.haley > 0 ? `${poll.haley}%` : '–'}</TableCell>
                      <TableCell style={{ color: '#4ADE80' }} className="font-semibold">{poll.desantis > 0 ? `${poll.desantis}%` : '–'}</TableCell>
                      <TableCell style={{ color: '#94A3B8' }} className="font-semibold">{poll.rfk > 0 ? `${poll.rfk}%` : '–'}</TableCell>
                      <TableCell style={{ color: '#D4956A' }} className="font-semibold">{poll.ramaswamy > 0 ? `${poll.ramaswamy}%` : '–'}</TableCell>
                      <TableCell className="text-gray-400 font-semibold">{poll.other > 0 ? `${poll.other}%` : '–'}</TableCell>
                      <TableCell className="text-gray-400 font-semibold">{poll.undecided > 0 ? `${poll.undecided}%` : '–'}</TableCell>
                    </>
                  ) : isSouthCarolina ? (
                    <>
                      <TableCell style={{ color: '#EF4444' }} className="font-semibold">{poll.mace}%</TableCell>
                      <TableCell style={{ color: '#4ADE80' }} className="font-semibold">{poll.wilson}%</TableCell>
                      <TableCell style={{ color: '#F472B6' }} className="font-semibold">{poll.evette}%</TableCell>
                      <TableCell style={{ color: '#F97316' }} className="font-semibold">{poll.norman}%</TableCell>
                      <TableCell className="text-gray-400 font-semibold">{poll.kimbrell > 0 ? `${poll.kimbrell}%` : '–'}</TableCell>
                      <TableCell className="text-gray-400 font-semibold">{poll.other > 0 ? `${poll.other}%` : '–'}</TableCell>
                      <TableCell className="text-gray-400 font-semibold">{poll.undecided > 0 ? `${poll.undecided}%` : '–'}</TableCell>
                    </>
                  ) : isGeorgia ? (
                    <>
                      <TableCell style={{ color: '#EF4444' }} className="font-semibold">{poll.jones}%</TableCell>
                      <TableCell style={{ color: '#F472B6' }} className="font-semibold">{poll.jackson}%</TableCell>
                      <TableCell style={{ color: '#FBBF24' }} className="font-semibold">{poll.raffensperger}%</TableCell>
                      <TableCell style={{ color: '#F97316' }} className="font-semibold">{poll.carr}%</TableCell>
                      <TableCell className="text-gray-400 font-semibold">{poll.dean > 0 ? `${poll.dean}%` : '–'}</TableCell>
                      <TableCell className="text-gray-400 font-semibold">{poll.other > 0 ? `${poll.other}%` : '–'}</TableCell>
                      <TableCell className="text-gray-400 font-semibold">{poll.undecided > 0 ? `${poll.undecided}%` : '–'}</TableCell>
                    </>
                  ) : isFlorida ? (
                    <>
                      <TableCell style={{ color: '#EF4444' }} className="font-semibold">{poll.donalds}%</TableCell>
                      <TableCell style={{ color: '#F97316' }} className="font-semibold">{poll.fishback}%</TableCell>
                      <TableCell style={{ color: '#F472B6' }} className="font-semibold">{poll.collins}%</TableCell>
                      <TableCell style={{ color: '#FBBF24' }} className="font-semibold">{poll.renner}%</TableCell>
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
                      <TableCell style={{ color: '#EF4444' }} className="font-semibold">{poll.cornyn}%</TableCell>
                      <TableCell style={{ color: '#F97316' }} className="font-semibold">{poll.paxton}%</TableCell>
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