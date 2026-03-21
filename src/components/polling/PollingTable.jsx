import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PollingTable({ polls, type }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pollsterSearch, setPollsterSearch] = useState('');
  const pollsPerPage = 20;

  const normalizeString = (str) => str.replace(/\s/g, '').toLowerCase();
  const filteredPolls = polls.filter(poll => {
    if (!pollsterSearch) return true;
    return normalizeString(poll.pollster).includes(normalizeString(pollsterSearch));
  });

  const totalPages = Math.ceil(filteredPolls.length / pollsPerPage);
  const startIndex = (currentPage - 1) * pollsPerPage;
  const currentPolls = filteredPolls.slice(startIndex, startIndex + pollsPerPage);

  const isAlaska = type === 'alaska-senate';
  const isMassDem = type === 'massachusetts-dem-senate';
  const isGenericBallot = type === 'generic-congressional-ballot';
  const isMaine = type === 'maine-dem-senate';
  const isCaliforniaGov = type === 'california-governor';
  const isFlorida = type === 'florida-gop-governor';
  const isGeorgia = type === 'georgia-gop-governor';
  const isSouthCarolina = type === 'south-carolina-gop-governor';
  const isArizona = type === 'arizona-gop-governor';
  const isDemPrimary = type === '2028-dem-primary';
  const isRepPrimary = type === '2028-rep-primary';
  const isIllinois = type === 'illinois-dem-primary';
  const isIllinois9th = type === 'illinois-9th-house';
  const isLouisiana = type === 'louisiana-gop-senate';
  const isGeorgiaGOPSenate = type === 'georgia-gop-senate';
  const isMichiganDem = type === 'michigan-dem-senate';
  const isMinnesotaDem = type === 'minnesota-dem-senate';
  const isKentuckyGOP = type === 'kentucky-gop-senate';
  const isWisconsinDem = type === 'wisconsin-dem-governor';
  const isApproval = type ? type.includes('approval') : false;

  function getMarginColor(poll) {
    const m = poll.margin || '';
    if (isAlaska) {
      if (m.includes('Sullivan')) return '#DC2626';
      if (m.includes('Peltola')) return '#3B82F6';
    } else if (isMassDem) {
      if (m.includes('Markey')) return '#3B82F6';
      if (m.includes('Moulton')) return '#22C55E';
      if (m.includes('Rikleen')) return '#F97316';
    }
    if (isCaliforniaGov) {
      if (m.includes('Swalwell')) return '#3B82F6';
      if (m.includes('Hilton')) return '#F472B6';
      if (m.includes('Bianco')) return '#F97316';
      if (m.includes('Porter')) return '#A78BFA';
      if (m.includes('Steyer')) return '#84CC16';
      if (m.includes('Mahan')) return '#22D3EE';
      if (m.includes('Becerra')) return '#FBBF24';
    } else if (isMaine) {
      if (m.includes('Mills')) return '#1976D2';
      if (m.includes('Platner')) return '#FFD600';
    } else if (isGenericBallot) {
      if (m.includes('Generic D')) return '#1E90FF';
      if (m.includes('Generic R')) return '#FF2020';
    } else if (isArizona) {
      if (m.includes('Biggs')) return '#EF4444';
      if (m.includes('Robson')) return '#F97316';
      if (m.includes('Schweikert')) return '#FBBF24';
    } else if (isDemPrimary) {
      if (m.includes('Harris')) return '#3B82F6';
      if (m.includes('Newsom')) return '#06B6D4';
      if (m.includes('Buttigieg')) return '#22C55E';
      if (m.includes('AOC') || m.includes('Ocasio')) return '#F97316';
      if (m.includes('Pritzker')) return '#EF4444';
      if (m.includes('Shapiro')) return '#94A3B8';
      if (m.includes('Booker')) return '#FBBF24';
    } else if (isRepPrimary) {
      if (m.includes('Vance')) return '#EF4444';
      if (m.includes('Trump Jr')) return '#F97316';
      if (m.includes('Rubio')) return '#FBBF24';
      if (m.includes('Cruz')) return '#22D3EE';
      if (m.includes('Haley')) return '#F472B6';
      if (m.includes('DeSantis')) return '#4ADE80';
      if (m.includes('RFK') || m.includes('Kennedy')) return '#94A3B8';
      if (m.includes('Ramaswamy')) return '#D4956A';
    } else if (isSouthCarolina) {
      if (m.includes('Mace')) return '#EF4444';
      if (m.includes('Wilson')) return '#4ADE80';
      if (m.includes('Evette')) return '#F472B6';
      if (m.includes('Norman')) return '#F97316';
    } else if (isGeorgia) {
      if (m.includes('Jones')) return '#EF4444';
      if (m.includes('Jackson')) return '#F472B6';
      if (m.includes('Raffensperger')) return '#FBBF24';
      if (m.includes('Carr')) return '#F97316';
    } else if (isFlorida) {
      if (m.includes('Donalds')) return '#EF4444';
      if (m.includes('Fishback')) return '#F97316';
      if (m.includes('Collins')) return '#F472B6';
      if (m.includes('Renner')) return '#FBBF24';
    } else if (isIllinois) {
      if (m.includes('Raja')) return '#3B82F6';
      if (m.includes('Stratton')) return '#22C55E';
      if (m.includes('Kelly')) return '#22D3EE';
    } else if (isIllinois9th) {
      if (m.includes('Biss')) return '#22D3EE';
      if (m.includes('Fine')) return '#EF4444';
      if (m.includes('Abughazaleh')) return '#F472B6';
      if (m.includes('Simmons')) return '#22C55E';
      if (m.includes('Amiwala')) return '#A78BFA';
      if (m.includes('Andrew')) return '#FBBF24';
    } else if (isLouisiana) {
      if (m.includes('Cassidy')) return '#EF4444';
      if (m.includes('Fleming')) return '#FBBF24';
      if (m.includes('Letlow')) return '#F472B6';
    } else if (isGeorgiaGOPSenate) {
      if (m.includes('Collins')) return '#F97316';
      if (m.includes('Carter')) return '#FBBF24';
      if (m.includes('Dooley')) return '#F472B6';
    } else if (isMichiganDem) {
      if (m.includes('Stevens')) return '#A78BFA';
      if (m.includes('McMorrow')) return '#14B8A6';
      if (m.includes('El-Sayed')) return '#84CC16';
    } else if (isMinnesotaDem) {
      if (m.includes('Flanagan')) return '#3B82F6';
      if (m.includes('Craig')) return '#14B8A6';
    } else if (isKentuckyGOP) {
      if (m.includes('Barr')) return '#EF4444';
      if (m.includes('Cameron')) return '#FBBF24';
      if (m.includes('Morris')) return '#F97316';
    } else if (type === 'north-carolina-senate') {
      if (m.includes('Whatley')) return '#EF4444';
      if (m.includes('Cooper')) return '#3B82F6';
    } else if (type === 'ohio-senate') {
      if (m.includes('Husted')) return '#EF4444';
      if (m.includes('Brown')) return '#3B82F6';
    } else if (type === 'ohio-governor') {
      if (m.includes('Ramaswamy')) return '#EF4444';
      if (m.includes('Acton')) return '#3B82F6';
    } else {
      if (m.includes('Cornyn')) return '#EF4444';
      if (m.includes('Paxton')) return '#F97316';
    }
    return 'white';
  }

  function renderCells(poll) {
    if (isAlaska) return (
      <>
        <TableCell style={{ color: '#DC2626' }} className="font-semibold">{poll.sullivan > 0 ? `${poll.sullivan}%` : '-'}</TableCell>
        <TableCell style={{ color: '#3B82F6' }} className="font-semibold">{poll.peltola > 0 ? `${poll.peltola}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.other > 0 ? `${poll.other}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.undecided > 0 ? `${poll.undecided}%` : '-'}</TableCell>
      </>
    );
    if (isMassDem) return (
      <>
        <TableCell style={{ color: '#3B82F6' }} className="font-semibold">{poll.markey > 0 ? `${poll.markey}%` : '-'}</TableCell>
        <TableCell style={{ color: '#22C55E' }} className="font-semibold">{poll.moulton > 0 ? `${poll.moulton}%` : '-'}</TableCell>
        <TableCell style={{ color: '#F97316' }} className="font-semibold">{poll.rikleen > 0 ? `${poll.rikleen}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.other > 0 ? `${poll.other}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.undecided > 0 ? `${poll.undecided}%` : '-'}</TableCell>
      </>
    );
    if (isCaliforniaGov) return (
      <>
        <TableCell style={{ color: '#3B82F6' }} className="font-semibold">{poll.swalwell > 0 ? `${poll.swalwell}%` : '-'}</TableCell>
        <TableCell style={{ color: '#F472B6' }} className="font-semibold">{poll.hilton > 0 ? `${poll.hilton}%` : '-'}</TableCell>
        <TableCell style={{ color: '#F97316' }} className="font-semibold">{poll.bianco > 0 ? `${poll.bianco}%` : '-'}</TableCell>
        <TableCell style={{ color: '#A78BFA' }} className="font-semibold">{poll.porter > 0 ? `${poll.porter}%` : '-'}</TableCell>
        <TableCell style={{ color: '#84CC16' }} className="font-semibold">{poll.steyer > 0 ? `${poll.steyer}%` : '-'}</TableCell>
        <TableCell style={{ color: '#22D3EE' }} className="font-semibold">{poll.mahan > 0 ? `${poll.mahan}%` : '-'}</TableCell>
        <TableCell style={{ color: '#FBBF24' }} className="font-semibold">{poll.becerra > 0 ? `${poll.becerra}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.other > 0 ? `${poll.other}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.undecided > 0 ? `${poll.undecided}%` : '-'}</TableCell>
      </>
    );
    if (isMaine) return (
      <>
        <TableCell style={{ color: '#1976D2' }} className="font-semibold">{poll.mills > 0 ? `${poll.mills}%` : '-'}</TableCell>
        <TableCell style={{ color: '#FFD600' }} className="font-semibold">{poll.platner > 0 ? `${poll.platner}%` : '-'}</TableCell>
        <TableCell style={{ color: '#00ACC1' }} className="font-semibold">{poll.costello > 0 ? `${poll.costello}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.other > 0 ? `${poll.other}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.undecided > 0 ? `${poll.undecided}%` : '-'}</TableCell>
      </>
    );
    if (isGenericBallot) return (
      <>
        <TableCell style={{ color: '#1E90FF' }} className="font-semibold">{poll.democrat}%</TableCell>
        <TableCell style={{ color: '#FF2020' }} className="font-semibold">{poll.republican}%</TableCell>
      </>
    );
    if (isApproval) return (
      <>
        <TableCell className="text-green-400 font-semibold">{poll.approve}%</TableCell>
        <TableCell className="text-red-400 font-semibold">{poll.disapprove}%</TableCell>
      </>
    );
    if (isArizona) return (
      <>
        <TableCell style={{ color: '#EF4444' }} className="font-semibold">{poll.biggs > 0 ? `${poll.biggs}%` : '-'}</TableCell>
        <TableCell style={{ color: '#F97316' }} className="font-semibold">{poll.robson > 0 ? `${poll.robson}%` : '-'}</TableCell>
        <TableCell style={{ color: '#FBBF24' }} className="font-semibold">{poll.schweikert > 0 ? `${poll.schweikert}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.other > 0 ? `${poll.other}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.undecided > 0 ? `${poll.undecided}%` : '-'}</TableCell>
      </>
    );
    if (isDemPrimary) return (
      <>
        <TableCell style={{ color: '#3B82F6' }} className="font-semibold">{poll.harris > 0 ? `${poll.harris}%` : '-'}</TableCell>
        <TableCell style={{ color: '#06B6D4' }} className="font-semibold">{poll.newsom > 0 ? `${poll.newsom}%` : '-'}</TableCell>
        <TableCell style={{ color: '#22C55E' }} className="font-semibold">{poll.buttigieg > 0 ? `${poll.buttigieg}%` : '-'}</TableCell>
        <TableCell style={{ color: '#F97316' }} className="font-semibold">{poll.aoc > 0 ? `${poll.aoc}%` : '-'}</TableCell>
        <TableCell style={{ color: '#EF4444' }} className="font-semibold">{poll.pritzker > 0 ? `${poll.pritzker}%` : '-'}</TableCell>
        <TableCell style={{ color: '#94A3B8' }} className="font-semibold">{poll.shapiro > 0 ? `${poll.shapiro}%` : '-'}</TableCell>
        <TableCell style={{ color: '#FBBF24' }} className="font-semibold">{poll.booker > 0 ? `${poll.booker}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.other > 0 ? `${poll.other}%` : '-'}</TableCell>
      </>
    );
    if (isRepPrimary) return (
      <>
        <TableCell style={{ color: '#EF4444' }} className="font-semibold">{poll.vance > 0 ? `${poll.vance}%` : '-'}</TableCell>
        <TableCell style={{ color: '#F97316' }} className="font-semibold">{poll.trumpjr > 0 ? `${poll.trumpjr}%` : '-'}</TableCell>
        <TableCell style={{ color: '#FBBF24' }} className="font-semibold">{poll.rubio > 0 ? `${poll.rubio}%` : '-'}</TableCell>
        <TableCell style={{ color: '#22D3EE' }} className="font-semibold">{poll.cruz > 0 ? `${poll.cruz}%` : '-'}</TableCell>
        <TableCell style={{ color: '#F472B6' }} className="font-semibold">{poll.haley > 0 ? `${poll.haley}%` : '-'}</TableCell>
        <TableCell style={{ color: '#4ADE80' }} className="font-semibold">{poll.desantis > 0 ? `${poll.desantis}%` : '-'}</TableCell>
        <TableCell style={{ color: '#94A3B8' }} className="font-semibold">{poll.rfk > 0 ? `${poll.rfk}%` : '-'}</TableCell>
        <TableCell style={{ color: '#D4956A' }} className="font-semibold">{poll.ramaswamy > 0 ? `${poll.ramaswamy}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.other > 0 ? `${poll.other}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.undecided > 0 ? `${poll.undecided}%` : '-'}</TableCell>
      </>
    );
    if (isSouthCarolina) return (
      <>
        <TableCell style={{ color: '#EF4444' }} className="font-semibold">{poll.mace > 0 ? `${poll.mace}%` : '-'}</TableCell>
        <TableCell style={{ color: '#4ADE80' }} className="font-semibold">{poll.wilson > 0 ? `${poll.wilson}%` : '-'}</TableCell>
        <TableCell style={{ color: '#F472B6' }} className="font-semibold">{poll.evette > 0 ? `${poll.evette}%` : '-'}</TableCell>
        <TableCell style={{ color: '#F97316' }} className="font-semibold">{poll.norman > 0 ? `${poll.norman}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.kimbrell > 0 ? `${poll.kimbrell}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.other > 0 ? `${poll.other}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.undecided > 0 ? `${poll.undecided}%` : '-'}</TableCell>
      </>
    );
    if (isGeorgia) return (
      <>
        <TableCell style={{ color: '#EF4444' }} className="font-semibold">{poll.jones > 0 ? `${poll.jones}%` : '-'}</TableCell>
        <TableCell style={{ color: '#F472B6' }} className="font-semibold">{poll.jackson > 0 ? `${poll.jackson}%` : '-'}</TableCell>
        <TableCell style={{ color: '#FBBF24' }} className="font-semibold">{poll.raffensperger > 0 ? `${poll.raffensperger}%` : '-'}</TableCell>
        <TableCell style={{ color: '#F97316' }} className="font-semibold">{poll.carr > 0 ? `${poll.carr}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.dean > 0 ? `${poll.dean}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.other > 0 ? `${poll.other}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.undecided > 0 ? `${poll.undecided}%` : '-'}</TableCell>
      </>
    );
    if (isFlorida) return (
      <>
        <TableCell style={{ color: '#EF4444' }} className="font-semibold">{poll.donalds > 0 ? `${poll.donalds}%` : '-'}</TableCell>
        <TableCell style={{ color: '#F97316' }} className="font-semibold">{poll.fishback > 0 ? `${poll.fishback}%` : '-'}</TableCell>
        <TableCell style={{ color: '#F472B6' }} className="font-semibold">{poll.collins > 0 ? `${poll.collins}%` : '-'}</TableCell>
        <TableCell style={{ color: '#FBBF24' }} className="font-semibold">{poll.renner > 0 ? `${poll.renner}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.other > 0 ? `${poll.other}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.undecided > 0 ? `${poll.undecided}%` : '-'}</TableCell>
      </>
    );
    if (isIllinois9th) return (
      <>
        <TableCell style={{ color: '#008080' }} className="font-semibold">{poll.biss > 0 ? `${poll.biss}%` : '-'}</TableCell>
        <TableCell style={{ color: '#8B0000' }} className="font-semibold">{poll.fine > 0 ? `${poll.fine}%` : '-'}</TableCell>
        <TableCell style={{ color: '#C71585' }} className="font-semibold">{poll.abughazaleh > 0 ? `${poll.abughazaleh}%` : '-'}</TableCell>
        <TableCell style={{ color: '#006400' }} className="font-semibold">{poll.simmons > 0 ? `${poll.simmons}%` : '-'}</TableCell>
        <TableCell style={{ color: '#4B0082' }} className="font-semibold">{poll.amiwala > 0 ? `${poll.amiwala}%` : '-'}</TableCell>
        <TableCell style={{ color: '#FFD700' }} className="font-semibold">{poll.andrew > 0 ? `${poll.andrew}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.other > 0 ? `${poll.other}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.undecided > 0 ? `${poll.undecided}%` : '-'}</TableCell>
      </>
    );
    if (isIllinois) return (
      <>
        <TableCell style={{ color: '#008080' }} className="font-semibold">{poll.kelly > 0 ? `${poll.kelly}%` : '-'}</TableCell>
        <TableCell style={{ color: '#0047AB' }} className="font-semibold">{poll.raja > 0 ? `${poll.raja}%` : '-'}</TableCell>
        <TableCell style={{ color: '#006400' }} className="font-semibold">{poll.stratton > 0 ? `${poll.stratton}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.other > 0 ? `${poll.other}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.undecided > 0 ? `${poll.undecided}%` : '-'}</TableCell>
      </>
    );
    if (isLouisiana) return (
      <>
        <TableCell style={{ color: '#EF4444' }} className="font-semibold">{poll.cassidy > 0 ? `${poll.cassidy}%` : '-'}</TableCell>
        <TableCell style={{ color: '#FBBF24' }} className="font-semibold">{poll.fleming > 0 ? `${poll.fleming}%` : '-'}</TableCell>
        <TableCell style={{ color: '#F472B6' }} className="font-semibold">{poll.letlow > 0 ? `${poll.letlow}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.other > 0 ? `${poll.other}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.undecided > 0 ? `${poll.undecided}%` : '-'}</TableCell>
      </>
    );
    if (isGeorgiaGOPSenate) return (
      <>
        <TableCell style={{ color: '#FBBF24' }} className="font-semibold">{poll.carter > 0 ? `${poll.carter}%` : '-'}</TableCell>
        <TableCell style={{ color: '#F97316' }} className="font-semibold">{poll.collins > 0 ? `${poll.collins}%` : '-'}</TableCell>
        <TableCell style={{ color: '#F472B6' }} className="font-semibold">{poll.dooley > 0 ? `${poll.dooley}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.other > 0 ? `${poll.other}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.undecided > 0 ? `${poll.undecided}%` : '-'}</TableCell>
      </>
    );
    if (isMichiganDem) return (
      <>
        <TableCell style={{ color: '#84CC16' }} className="font-semibold">{poll.elsayed > 0 ? `${poll.elsayed}%` : '-'}</TableCell>
        <TableCell style={{ color: '#14B8A6' }} className="font-semibold">{poll.mcmorrow > 0 ? `${poll.mcmorrow}%` : '-'}</TableCell>
        <TableCell style={{ color: '#A78BFA' }} className="font-semibold">{poll.stevens > 0 ? `${poll.stevens}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.other > 0 ? `${poll.other}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.undecided > 0 ? `${poll.undecided}%` : '-'}</TableCell>
      </>
    );
    if (isMinnesotaDem) return (
      <>
        <TableCell style={{ color: '#14B8A6' }} className="font-semibold">{poll.craig > 0 ? `${poll.craig}%` : '-'}</TableCell>
        <TableCell style={{ color: '#3B82F6' }} className="font-semibold">{poll.flanagan > 0 ? `${poll.flanagan}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.other > 0 ? `${poll.other}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.undecided > 0 ? `${poll.undecided}%` : '-'}</TableCell>
      </>
    );
    if (isWisconsinDem) return (
      <>
        <TableCell style={{ color: '#008080' }} className="font-semibold">{poll.barnes > 0 ? `${poll.barnes}%` : '-'}</TableCell>
        <TableCell style={{ color: '#DAA520' }} className="font-semibold">{poll.rodriguez > 0 ? `${poll.rodriguez}%` : '-'}</TableCell>
        <TableCell style={{ color: '#C71585' }} className="font-semibold">{poll.hong > 0 ? `${poll.hong}%` : '-'}</TableCell>
        <TableCell style={{ color: '#0047AB' }} className="font-semibold">{poll.crowley > 0 ? `${poll.crowley}%` : '-'}</TableCell>
        <TableCell style={{ color: '#22C55E' }} className="font-semibold">{poll.roys > 0 ? `${poll.roys}%` : '-'}</TableCell>
        <TableCell style={{ color: '#F97316' }} className="font-semibold">{poll.hughes > 0 ? `${poll.hughes}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.other > 0 ? `${poll.other}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.undecided > 0 ? `${poll.undecided}%` : '-'}</TableCell>
      </>
    );
    if (isKentuckyGOP) return (
      <>
        <TableCell style={{ color: '#EF4444' }} className="font-semibold">{poll.barr > 0 ? `${poll.barr}%` : '-'}</TableCell>
        <TableCell style={{ color: '#FBBF24' }} className="font-semibold">{poll.cameron > 0 ? `${poll.cameron}%` : '-'}</TableCell>
        <TableCell style={{ color: '#F97316' }} className="font-semibold">{poll.morris > 0 ? `${poll.morris}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.other > 0 ? `${poll.other}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.undecided > 0 ? `${poll.undecided}%` : '-'}</TableCell>
      </>
    );
    if (type === 'north-carolina-senate') return (
      <>
        <TableCell style={{ color: '#EF4444' }} className="font-semibold">{poll.whatley > 0 ? `${poll.whatley}%` : '-'}</TableCell>
        <TableCell style={{ color: '#3B82F6' }} className="font-semibold">{poll.cooper > 0 ? `${poll.cooper}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.other > 0 ? `${poll.other}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.undecided > 0 ? `${poll.undecided}%` : '-'}</TableCell>
      </>
    );
    if (type === 'ohio-senate') return (
      <>
        <TableCell style={{ color: '#EF4444' }} className="font-semibold">{poll.husted > 0 ? `${poll.husted}%` : '-'}</TableCell>
        <TableCell style={{ color: '#3B82F6' }} className="font-semibold">{poll.brown > 0 ? `${poll.brown}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.other > 0 ? `${poll.other}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.undecided > 0 ? `${poll.undecided}%` : '-'}</TableCell>
      </>
    );
    if (type === 'ohio-governor') return (
      <>
        <TableCell style={{ color: '#EF4444' }} className="font-semibold">{poll.ramaswamy > 0 ? `${poll.ramaswamy}%` : '-'}</TableCell>
        <TableCell style={{ color: '#3B82F6' }} className="font-semibold">{poll.acton > 0 ? `${poll.acton}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.other > 0 ? `${poll.other}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.undecided > 0 ? `${poll.undecided}%` : '-'}</TableCell>
      </>
    );
    // Default: Texas Senate
    return (
      <>
        <TableCell style={{ color: '#EF4444' }} className="font-semibold">{poll.cornyn > 0 ? `${poll.cornyn}%` : '-'}</TableCell>
        <TableCell style={{ color: '#F97316' }} className="font-semibold">{poll.paxton > 0 ? `${poll.paxton}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.other > 0 ? `${poll.other}%` : '-'}</TableCell>
        <TableCell className="text-gray-400 font-semibold">{poll.undecided > 0 ? `${poll.undecided}%` : '-'}</TableCell>
      </>
    );
  }

  function renderHeaders() {
    if (isAlaska) return (<><TableHead className="text-white font-bold">Sullivan</TableHead><TableHead className="text-white font-bold">Peltola</TableHead><TableHead className="text-white font-bold">Other</TableHead><TableHead className="text-white font-bold">Undecided</TableHead></>);
    if (isMassDem) return (<><TableHead className="text-white font-bold">Markey</TableHead><TableHead className="text-white font-bold">Moulton</TableHead><TableHead className="text-white font-bold">Rikleen</TableHead><TableHead className="text-white font-bold">Other</TableHead><TableHead className="text-white font-bold">Undecided</TableHead></>);
    if (isCaliforniaGov) return (<><TableHead className="text-white font-bold">Swalwell</TableHead><TableHead className="text-white font-bold">Hilton</TableHead><TableHead className="text-white font-bold">Bianco</TableHead><TableHead className="text-white font-bold">Porter</TableHead><TableHead className="text-white font-bold">Steyer</TableHead><TableHead className="text-white font-bold">Mahan</TableHead><TableHead className="text-white font-bold">Becerra</TableHead><TableHead className="text-white font-bold">Other</TableHead><TableHead className="text-white font-bold">Undecided</TableHead></>);
    if (isMaine) return (<><TableHead className="text-white font-bold">Mills</TableHead><TableHead className="text-white font-bold">Platner</TableHead><TableHead className="text-white font-bold">Costello</TableHead><TableHead className="text-white font-bold">Other</TableHead><TableHead className="text-white font-bold">Undecided</TableHead></>);
    if (isGenericBallot) return (<><TableHead className="text-white font-bold">Democrat</TableHead><TableHead className="text-white font-bold">Republican</TableHead></>);
    if (isApproval) return (<><TableHead className="text-white font-bold">Approve</TableHead><TableHead className="text-white font-bold">Disapprove</TableHead></>);
    if (isArizona) return (<><TableHead className="text-white font-bold">Biggs</TableHead><TableHead className="text-white font-bold">Robson</TableHead><TableHead className="text-white font-bold">Schweikert</TableHead><TableHead className="text-white font-bold">Other</TableHead><TableHead className="text-white font-bold">Undecided</TableHead></>);
    if (isDemPrimary) return (<><TableHead className="text-white font-bold">Harris</TableHead><TableHead className="text-white font-bold">Newsom</TableHead><TableHead className="text-white font-bold">Buttigieg</TableHead><TableHead className="text-white font-bold">AOC</TableHead><TableHead className="text-white font-bold">Pritzker</TableHead><TableHead className="text-white font-bold">Shapiro</TableHead><TableHead className="text-white font-bold">Booker</TableHead><TableHead className="text-white font-bold">Other</TableHead></>);
    if (isRepPrimary) return (<><TableHead className="text-white font-bold">Vance</TableHead><TableHead className="text-white font-bold">Trump Jr.</TableHead><TableHead className="text-white font-bold">Rubio</TableHead><TableHead className="text-white font-bold">Cruz</TableHead><TableHead className="text-white font-bold">Haley</TableHead><TableHead className="text-white font-bold">DeSantis</TableHead><TableHead className="text-white font-bold">RFK Jr.</TableHead><TableHead className="text-white font-bold">Ramaswamy</TableHead><TableHead className="text-white font-bold">Other</TableHead><TableHead className="text-white font-bold">Undecided</TableHead></>);
    if (isSouthCarolina) return (<><TableHead className="text-white font-bold">Mace</TableHead><TableHead className="text-white font-bold">Wilson</TableHead><TableHead className="text-white font-bold">Evette</TableHead><TableHead className="text-white font-bold">Norman</TableHead><TableHead className="text-white font-bold">Kimbrell</TableHead><TableHead className="text-white font-bold">Other</TableHead><TableHead className="text-white font-bold">Undecided</TableHead></>);
    if (isGeorgia) return (<><TableHead className="text-white font-bold">Jones</TableHead><TableHead className="text-white font-bold">Jackson</TableHead><TableHead className="text-white font-bold">Raffensperger</TableHead><TableHead className="text-white font-bold">Carr</TableHead><TableHead className="text-white font-bold">Dean</TableHead><TableHead className="text-white font-bold">Other</TableHead><TableHead className="text-white font-bold">Undecided</TableHead></>);
    if (isFlorida) return (<><TableHead className="text-white font-bold">Donalds</TableHead><TableHead className="text-white font-bold">Fishback</TableHead><TableHead className="text-white font-bold">Collins</TableHead><TableHead className="text-white font-bold">Renner</TableHead><TableHead className="text-white font-bold">Other</TableHead><TableHead className="text-white font-bold">Undecided</TableHead></>);
    if (isIllinois9th) return (<><TableHead className="text-white font-bold">Biss</TableHead><TableHead className="text-white font-bold">Fine</TableHead><TableHead className="text-white font-bold">Abughazaleh</TableHead><TableHead className="text-white font-bold">Simmons</TableHead><TableHead className="text-white font-bold">Amiwala</TableHead><TableHead className="text-white font-bold">Andrew</TableHead><TableHead className="text-white font-bold">Other</TableHead><TableHead className="text-white font-bold">Undecided</TableHead></>);
    if (isIllinois) return (<><TableHead className="text-white font-bold">Kelly</TableHead><TableHead className="text-white font-bold">Raja</TableHead><TableHead className="text-white font-bold">Stratton</TableHead><TableHead className="text-white font-bold">Other</TableHead><TableHead className="text-white font-bold">Undecided</TableHead></>);
    if (isLouisiana) return (<><TableHead className="text-white font-bold">Cassidy</TableHead><TableHead className="text-white font-bold">Fleming</TableHead><TableHead className="text-white font-bold">Letlow</TableHead><TableHead className="text-white font-bold">Other</TableHead><TableHead className="text-white font-bold">Undecided</TableHead></>);
    if (isGeorgiaGOPSenate) return (<><TableHead className="text-white font-bold">Carter</TableHead><TableHead className="text-white font-bold">Collins</TableHead><TableHead className="text-white font-bold">Dooley</TableHead><TableHead className="text-white font-bold">Other</TableHead><TableHead className="text-white font-bold">Undecided</TableHead></>);
    if (isMichiganDem) return (<><TableHead className="text-white font-bold">El-Sayed</TableHead><TableHead className="text-white font-bold">McMorrow</TableHead><TableHead className="text-white font-bold">Stevens</TableHead><TableHead className="text-white font-bold">Other</TableHead><TableHead className="text-white font-bold">Undecided</TableHead></>);
    if (isMinnesotaDem) return (<><TableHead className="text-white font-bold">Craig</TableHead><TableHead className="text-white font-bold">Flanagan</TableHead><TableHead className="text-white font-bold">Other</TableHead><TableHead className="text-white font-bold">Undecided</TableHead></>);
    if (isWisconsinDem) return (<><TableHead className="text-white font-bold">Barnes</TableHead><TableHead className="text-white font-bold">Rodriguez</TableHead><TableHead className="text-white font-bold">Hong</TableHead><TableHead className="text-white font-bold">Crowley</TableHead><TableHead className="text-white font-bold">Roys</TableHead><TableHead className="text-white font-bold">Hughes</TableHead><TableHead className="text-white font-bold">Other</TableHead><TableHead className="text-white font-bold">Undecided</TableHead></>);
    if (isKentuckyGOP) return (<><TableHead className="text-white font-bold">Barr</TableHead><TableHead className="text-white font-bold">Cameron</TableHead><TableHead className="text-white font-bold">Morris</TableHead><TableHead className="text-white font-bold">Other</TableHead><TableHead className="text-white font-bold">Undecided</TableHead></>);
    if (type === 'north-carolina-senate') return (<><TableHead className="text-white font-bold">Whatley</TableHead><TableHead className="text-white font-bold">Cooper</TableHead><TableHead className="text-white font-bold">Other</TableHead><TableHead className="text-white font-bold">Undecided</TableHead></>);
    if (type === 'ohio-senate') return (<><TableHead className="text-white font-bold">Husted</TableHead><TableHead className="text-white font-bold">Brown</TableHead><TableHead className="text-white font-bold">Other</TableHead><TableHead className="text-white font-bold">Undecided</TableHead></>);
    if (type === 'ohio-governor') return (<><TableHead className="text-white font-bold">Ramaswamy</TableHead><TableHead className="text-white font-bold">Acton</TableHead><TableHead className="text-white font-bold">Other</TableHead><TableHead className="text-white font-bold">Undecided</TableHead></>);
    return (<><TableHead className="text-white font-bold">Cornyn</TableHead><TableHead className="text-white font-bold">Paxton</TableHead><TableHead className="text-white font-bold">Other</TableHead><TableHead className="text-white font-bold">Undecided</TableHead></>);
  }

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
            onChange={(e) => { setPollsterSearch(e.target.value); setCurrentPage(1); }}
            className="w-full sm:w-64 bg-white/10 text-white border-white/30 placeholder:text-white/50 focus:border-white/50"
          />
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-white font-semibold px-3">Page {currentPage} of {totalPages}</span>
              <Button variant="outline" size="icon" onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} className="bg-white/20 border-white/30 text-white hover:bg-white/30">
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
              {renderHeaders()}
              <TableHead className="text-white font-bold">Margin</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPolls.map((poll, index) => (
              <TableRow key={index} className="border-white/10 hover:bg-white/5">
                <TableCell className="text-white">{poll.pollster}</TableCell>
                <TableCell className="text-white">{poll.date}</TableCell>
                <TableCell className="text-white">{poll.sampleSize > 0 ? poll.sampleSize.toLocaleString() : '-'}</TableCell>
                {renderCells(poll)}
                <TableCell style={{ color: getMarginColor(poll) }} className="font-semibold">{poll.margin}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}