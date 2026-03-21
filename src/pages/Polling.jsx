import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PollingChart from '../components/polling/PollingChart';
import PollingAverageTable, { weightedAvg } from '../components/polling/PollingAverageTable';
import PollingTable from '../components/polling/PollingTable';
import PollSelector from '../components/polling/PollSelector';
import { parsePollDate, pollConfigs } from '../components/polling/pollConfig';

const pollingOptions = [
  { value: 'generic-congressional-ballot', label: 'Generic Congressional Ballot', party: 'general' },
  { value: '2028-dem-primary', label: '2028 Democratic Presidential Primary', party: 'dem' },
  { value: '2028-rep-primary', label: '2028 Republican Presidential Primary', party: 'rep' },
  { value: 'alaska-senate', label: 'Alaska Senate General', party: 'general' },
  { value: 'arizona-gop-governor', label: 'Arizona Republican Governor Primary', party: 'rep' },
  { value: 'california-governor', label: 'California Open Governor Primary', party: 'open' },
  { value: 'florida-gop-governor', label: 'Florida Republican Governor Primary', party: 'rep' },
  { value: 'georgia-gop-governor', label: 'Georgia Republican Governor Primary', party: 'rep' },
  { value: 'georgia-gop-senate', label: 'Georgia Republican Senate Primary', party: 'rep' },
  { value: 'kentucky-gop-senate', label: 'Kentucky Republican Senate Primary', party: 'rep' },
  { value: 'louisiana-gop-senate', label: 'Louisiana Republican Senate Primary', party: 'rep' },
  { value: 'maine-dem-senate', label: 'Maine Democratic Senate Primary', party: 'dem' },
  { value: 'massachusetts-dem-senate', label: 'Massachusetts Democratic Senate Primary', party: 'dem' },
  { value: 'michigan-dem-senate', label: 'Michigan Democratic Senate Primary', party: 'dem' },
  { value: 'minnesota-dem-senate', label: 'Minnesota Democratic Senate Primary', party: 'dem' },
  { value: 'north-carolina-senate', label: 'North Carolina Senate General', party: 'general' },
  { value: 'ohio-senate', label: 'Ohio Senate General', party: 'general' },
  { value: 'ohio-governor', label: 'Ohio Governor General', party: 'general' },
  { value: 'south-carolina-gop-governor', label: 'South Carolina Republican Governor Primary', party: 'rep' },
  { value: '2026-senate-generic', label: 'Texas Republican Senate Runoff', party: 'rep' },
  { value: 'wisconsin-dem-governor', label: 'Wisconsin Democratic Governor Primary', party: 'dem' },
];

const randomPollOptions = pollingOptions.filter(p => !['generic-congressional-ballot', '2028-dem-primary', '2028-rep-primary'].includes(p.value));

const alaskaSenateData = {
  chartData: [],
  polls: [
    { pollster: 'Public Policy Polling (D)', date: 'January 16–17, 2026', sampleSize: 611, sullivan: 47, peltola: 49, other: 0, undecided: 4, margin: 'Peltola +2' },
    { pollster: 'Alaska Survey Research', date: 'January 8–11, 2026', sampleSize: 1988, sullivan: 46, peltola: 48, other: 0, undecided: 6, margin: 'Peltola +2' },
    { pollster: 'Data for Progress (D)', date: 'October 17–23, 2025', sampleSize: 823, sullivan: 45, peltola: 46, other: 5, undecided: 4, margin: 'Peltola +1' },
    { pollster: 'Alaska Survey Research', date: 'October 10–15, 2025', sampleSize: 1708, sullivan: 46, peltola: 48, other: 0, undecided: 6, margin: 'Peltola +2' },
    { pollster: 'Alaska Survey Research', date: 'July 29 – August 1, 2025', sampleSize: 1623, sullivan: 47, peltola: 42, other: 0, undecided: 11, margin: 'Sullivan +5' },
    { pollster: 'Data for Progress (D)', date: 'July 21–27, 2025', sampleSize: 678, sullivan: 46, peltola: 45, other: 5, undecided: 4, margin: 'Sullivan +1' },
    { pollster: 'Alaska Survey Research', date: 'April 21–25, 2025', sampleSize: 1261, sullivan: 41, peltola: 44, other: 0, undecided: 15, margin: 'Peltola +3' },
  ]
};

const massDemSenateData = {
  chartData: [],
  polls: [
    { pollster: 'University of New Hampshire', date: 'February 12–16, 2026', sampleSize: 352, markey: 35, moulton: 23, rikleen: 7, other: 5, undecided: 30, margin: 'Markey +12' },
    { pollster: 'Suffolk University', date: 'November 19–23, 2025', sampleSize: 226, markey: 45, moulton: 22, rikleen: 0, other: 0, undecided: 33, margin: 'Markey +23' },
    { pollster: 'University of New Hampshire', date: 'November 13–17, 2025', sampleSize: 343, markey: 34, moulton: 25, rikleen: 2, other: 3, undecided: 35, margin: 'Markey +9' },
    { pollster: 'Data for Progress (D)', date: 'October 23–26, 2025', sampleSize: 652, markey: 53, moulton: 34, rikleen: 0, other: 0, undecided: 13, margin: 'Markey +19' },
    { pollster: 'UMass Amherst/YouGov', date: 'October 21–29, 2025', sampleSize: 416, markey: 51, moulton: 28, rikleen: 6, other: 1, undecided: 14, margin: 'Markey +23' },
    { pollster: 'Advantage, Inc. (R)', date: 'September 23–24, 2025', sampleSize: 278, markey: 30, moulton: 38, rikleen: 0, other: 0, undecided: 32, margin: 'Moulton +8' },
  ]
};

const mainePollingData = {
  chartData: [
    { date: '2025-10-22', mills: 33, platner: 47, costello: 1 },
    { date: '2025-10-25', mills: 37, platner: 38, costello: 1 },
    { date: '2025-11-16', mills: 38, platner: 58, costello: 0 },
    { date: '2025-12-09', mills: 43, platner: 46, costello: 0 },
    { date: '2026-02-15', mills: 33, platner: 54, costello: 3 },
    { date: '2026-03-05', mills: 34, platner: 51, costello: 2 },
  ],
  polls: [
    { pollster: 'Quantus Insights (R)', date: 'March 5, 2026', sampleSize: 450, mills: 38, platner: 43, costello: 0, other: 0, undecided: 19, margin: 'Platner +5' },
    { pollster: 'Pan Atlantic Research', date: 'February 13 - March 2, 2026', sampleSize: 367, mills: 39, platner: 46, costello: 4, other: 0, undecided: 11, margin: 'Platner +7' },
    { pollster: 'University of New Hampshire', date: 'February 12-16, 2026', sampleSize: 462, mills: 26, platner: 64, costello: 1, other: 0, undecided: 6, margin: 'Platner +38' },
    { pollster: 'Workbench Strategy (D)', date: 'December 11-16, 2025', sampleSize: 500, mills: 40, platner: 55, costello: 0, other: 0, undecided: 5, margin: 'Platner +15' },
    { pollster: 'Pan Atlantic Research', date: 'November 29 - December 7, 2025', sampleSize: 318, mills: 47, platner: 37, costello: 1, other: 0, undecided: 14, margin: 'Mills +10' },
    { pollster: 'Z to A Research (D)', date: 'November 14-18, 2025', sampleSize: 845, mills: 38, platner: 58, costello: 0, other: 0, undecided: 2, margin: 'Platner +20' },
    { pollster: "Maine People's Resource Center", date: 'October 26-29, 2025', sampleSize: 783, mills: 39, platner: 41, costello: 0, other: 0, undecided: 14, margin: 'Platner +2' },
    { pollster: 'SoCal Strategies', date: 'October 21-25, 2025', sampleSize: 500, mills: 41, platner: 36, costello: 1, other: 0, undecided: 20, margin: 'Mills +5' },
    { pollster: 'NRSC (R)', date: 'October 22-23, 2025', sampleSize: 647, mills: 25, platner: 46, costello: 0, other: 0, undecided: 26, margin: 'Platner +21' },
    { pollster: 'University of New Hampshire', date: 'October 16-21, 2025', sampleSize: 510, mills: 24, platner: 58, costello: 1, other: 0, undecided: 14, margin: 'Platner +34' },
  ]
};

const californiaGovData = {
  chartData: [],
  polls: [
    { pollster: 'Berkeley IGS', date: 'March 9-14, 2026', sampleSize: 3889, becerra: 5, bianco: 16, hilton: 17, mahan: 4, porter: 13, steyer: 10, swalwell: 13, other: 16, undecided: 6, margin: 'Hilton +1' },
    { pollster: 'Emerson College', date: 'March 7-9, 2026', sampleSize: 1000, becerra: 3, bianco: 11, hilton: 13, mahan: 3, porter: 8, steyer: 11, swalwell: 17, other: 7, undecided: 25, margin: 'Swalwell +4' },
    { pollster: 'Politico/UC Berkeley/TrueDot', date: 'February 25-March 3, 2026', sampleSize: 1004, becerra: 5, bianco: 11, hilton: 19, mahan: 3, porter: 11, steyer: 13, swalwell: 11, other: 10, undecided: 17, margin: 'Hilton +6' },
    { pollster: 'Global Strategy Group (D)', date: 'February 27-March 2, 2026', sampleSize: 1340, becerra: 5, bianco: 15, hilton: 20, mahan: 3, porter: 13, steyer: 16, swalwell: 11, other: 2, undecided: 15, margin: 'Hilton +4' },
    { pollster: 'Independent Voter Project', date: 'February 13-20, 2026', sampleSize: 868, becerra: 3, bianco: 23, hilton: 15, mahan: 2, porter: 12, steyer: 8, swalwell: 18, other: 6, undecided: 13, margin: 'Bianco +5' },
    { pollster: 'Emerson College', date: 'February 13-14, 2026', sampleSize: 1000, becerra: 4, bianco: 14, hilton: 17, mahan: 3, porter: 10, steyer: 9, swalwell: 14, other: 9, undecided: 21, margin: 'Hilton +3' },
    { pollster: 'PPIC', date: 'February 3-11, 2026', sampleSize: 1049, becerra: 5, bianco: 12, hilton: 14, mahan: 3, porter: 13, steyer: 10, swalwell: 11, other: 23, undecided: 10, margin: 'Hilton +1' },
    { pollster: 'Tavern Research (D)', date: 'February 2-5, 2026', sampleSize: 1097, becerra: 6, bianco: 20, hilton: 12, mahan: 2, porter: 9, steyer: 9, swalwell: 10, other: 7, undecided: 25, margin: 'Bianco +8' },
    { pollster: 'EMC Research (D)', date: 'January 29-February 4, 2026', sampleSize: 1400, becerra: 6, bianco: 21, hilton: 17, mahan: 5, porter: 12, steyer: 9, swalwell: 18, other: 8, undecided: 4, margin: 'Bianco +3' },
    { pollster: 'Global Strategy Group (D)', date: 'January 29-February 3, 2026', sampleSize: 0, becerra: 4, bianco: 18, hilton: 18, mahan: 3, porter: 12, steyer: 10, swalwell: 11, other: 3, undecided: 21, margin: 'Tie' },
    { pollster: 'RBI Strategies (D)', date: 'January 25-29, 2026', sampleSize: 0, becerra: 4, bianco: 15, hilton: 16, mahan: 3, porter: 13, steyer: 8, swalwell: 14, other: 5, undecided: 23, margin: 'Hilton +1' },
    { pollster: 'Tulchin Research (D)', date: 'January 22-28, 2026', sampleSize: 1000, becerra: 5, bianco: 15, hilton: 15, mahan: 0, porter: 13, steyer: 10, swalwell: 14, other: 12, undecided: 16, margin: 'Tie' },
    { pollster: 'Public Policy Polling (D)', date: 'January 20-21, 2026', sampleSize: 1001, becerra: 6, bianco: 18, hilton: 17, mahan: 5, porter: 14, steyer: 8, swalwell: 12, other: 3, undecided: 17, margin: 'Bianco +1' },
    { pollster: 'David Binder Research (D)', date: 'January 17-20, 2026', sampleSize: 800, becerra: 5, bianco: 17, hilton: 14, mahan: 0, porter: 11, steyer: 8, swalwell: 11, other: 9, undecided: 25, margin: 'Bianco +3' },
    { pollster: 'CivicLens Research', date: 'December 14-16, 2025', sampleSize: 400, becerra: 1, bianco: 14, hilton: 18, mahan: 0, porter: 9, steyer: 7, swalwell: 12, other: 10, undecided: 31, margin: 'Hilton +4' },
    { pollster: 'FM3 Research (D)', date: 'November 30-December 7, 2025', sampleSize: 632, becerra: 3, bianco: 17, hilton: 18, mahan: 0, porter: 13, steyer: 6, swalwell: 17, other: 5, undecided: 20, margin: 'Hilton +1' },
    { pollster: 'Emerson College', date: 'December 1-2, 2025', sampleSize: 1000, becerra: 4, bianco: 13, hilton: 12, mahan: 0, porter: 11, steyer: 4, swalwell: 12, other: 14, undecided: 31, margin: 'Bianco +1' },
    { pollster: 'Lake Research Partners (D)', date: 'November 17-20, 2025', sampleSize: 600, becerra: 6, bianco: 10, hilton: 17, mahan: 0, porter: 15, steyer: 4, swalwell: 10, other: 14, undecided: 22, margin: 'Hilton +2' },
    { pollster: 'PPIC', date: 'November 13-19, 2025', sampleSize: 1086, becerra: 14, bianco: 10, hilton: 14, mahan: 0, porter: 21, steyer: 0, swalwell: 0, other: 36, undecided: 5, margin: 'Porter +7' },
    { pollster: 'Tavern Research (D)', date: 'October 27-30, 2025', sampleSize: 1001, becerra: 9, bianco: 16, hilton: 12, mahan: 0, porter: 15, steyer: 0, swalwell: 0, other: 19, undecided: 29, margin: 'Bianco +1' },
    { pollster: 'EMC Research (D)', date: 'October 22-26, 2025', sampleSize: 1000, becerra: 9, bianco: 14, hilton: 20, mahan: 0, porter: 16, steyer: 3, swalwell: 11, other: 27, undecided: 0, margin: 'Hilton +4' },
    { pollster: 'Emerson College', date: 'October 20-21, 2025', sampleSize: 900, becerra: 5, bianco: 11, hilton: 16, mahan: 0, porter: 15, steyer: 0, swalwell: 0, other: 14, undecided: 39, margin: 'Hilton +1' },
    { pollster: 'Bold Decision', date: 'October 16-21, 2025', sampleSize: 509, becerra: 8, bianco: 14, hilton: 13, mahan: 0, porter: 12, steyer: 7, swalwell: 0, other: 16, undecided: 29, margin: 'Bianco +1' },

  ]
};

const mockPollingData = {
  'alaska-senate': alaskaSenateData,
  'massachusetts-dem-senate': massDemSenateData,
  'maine-dem-senate': mainePollingData,
  'california-governor': californiaGovData,
  'generic-congressional-ballot': {
    chartData: [
      { date: '2025-11-05', democrat: 50.3, republican: 43.7 },
      { date: '2025-11-10', democrat: 51.0, republican: 43.3 },
      { date: '2025-11-19', democrat: 52.3, republican: 43.0 },
      { date: '2025-11-21', democrat: 47.0, republican: 42.3 },
      { date: '2025-11-26', democrat: 46.3, republican: 41.0 },
      { date: '2025-12-01', democrat: 45.7, republican: 44.3 },
      { date: '2025-12-05', democrat: 47.3, republican: 43.7 },
      { date: '2025-12-08', democrat: 44.3, republican: 40.0 },
      { date: '2025-12-12', democrat: 45.0, republican: 42.0 },
      { date: '2025-12-15', democrat: 45.3, republican: 41.3 },
      { date: '2025-12-16', democrat: 44.3, republican: 41.0 },
      { date: '2025-12-19', democrat: 45.7, republican: 42.7 },
      { date: '2025-12-22', democrat: 42.7, republican: 37.7 },
      { date: '2025-12-26', democrat: 43.7, republican: 37.3 },
      { date: '2026-01-01', democrat: 42.0, republican: 34.7 },
      { date: '2026-01-05', democrat: 43.7, republican: 40.0 },
      { date: '2026-01-09', democrat: 43.3, republican: 38.3 },
      { date: '2026-01-13', democrat: 43.3, republican: 38.3 },
      { date: '2026-01-15', democrat: 46.7, republican: 40.3 },
      { date: '2026-01-17', democrat: 47.3, republican: 42.3 },
      { date: '2026-01-22', democrat: 48.7, republican: 43.0 },
      { date: '2026-01-26', democrat: 47.7, republican: 42.3 },
      { date: '2026-01-28', democrat: 48.7, republican: 43.3 },
      { date: '2026-02-02', democrat: 47.7, republican: 43.0 },
      { date: '2026-02-04', democrat: 47.7, republican: 42.7 },
      { date: '2026-02-09', democrat: 46.3, republican: 41.7 },
      { date: '2026-02-12', democrat: 48.3, republican: 43.3 },
      { date: '2026-02-15', democrat: 47.0, republican: 42.3 },
      { date: '2026-02-17', democrat: 45.0, republican: 39.7 },
      { date: '2026-02-20', democrat: 47.0, republican: 41.7 },
      { date: '2026-02-23', democrat: 46.7, republican: 42.3 },
      { date: '2026-02-25', democrat: 46.3, republican: 41.7 },
      { date: '2026-02-26', democrat: 46.7, republican: 43.3 },
      { date: '2026-03-01', democrat: 46.3, republican: 42.0 },
      { date: '2026-03-03', democrat: 47.7, republican: 42.7 },
      { date: '2026-03-05', democrat: 46.3, republican: 42.7 },
      { date: '2026-03-08', democrat: 47.7, republican: 43.3 },
      { date: '2026-03-10', democrat: 46.7, republican: 42.7 },
      { date: '2026-03-13', democrat: 46.3, republican: 43.0 },
      { date: '2026-03-14', democrat: 45.3, republican: 42.7 }
    ],
    polls: [
      { pollster: 'Quantus (B-)', date: 'Mar 17 - 18, 2026', sampleSize: 1053, democrat: 47, republican: 42, margin: 'Generic D +5' },
      { pollster: 'Emerson College (A+)', date: 'Mar 16 - 17, 2026', sampleSize: 1000, democrat: 49, republican: 41, margin: 'Generic D +8' },
      { pollster: 'YouGov (Yahoo) (B+)', date: 'Mar 12 - 16, 2026', sampleSize: 1699, democrat: 44, republican: 40, margin: 'Generic D +4' },
      { pollster: 'YouGov (Economist) (B+)', date: 'Mar 13 - 16, 2026', sampleSize: 1529, democrat: 39, republican: 35, margin: 'Generic D +4' },
      { pollster: 'Morning Consult (C-)', date: 'Mar 13 - 16, 2026', sampleSize: 2201, democrat: 48, republican: 40, margin: 'Generic D +8' },
      { pollster: 'Morning Consult (C-)', date: 'Mar 9 - 15, 2026', sampleSize: 26634, democrat: 45, republican: 42, margin: 'Generic D +3' },
      { pollster: 'Echelon Insights (A)', date: 'Mar 12 - 16, 2026', sampleSize: 1033, democrat: 49, republican: 44, margin: 'Generic D +5' },
      { pollster: 'Clarity Campaign (B)', date: 'Feb 26 - Mar 7, 2026', sampleSize: 1004, democrat: 47, republican: 43, margin: 'Generic D +4' },
      { pollster: 'Noble Predictive (A-)', date: 'Mar 2 - 5, 2026', sampleSize: 2659, democrat: 44, republican: 43, margin: 'Generic D +1' },
      { pollster: 'Focaldata (B-)', date: 'Mar 6 - 10, 2026', sampleSize: 1534, democrat: 48, republican: 42, margin: 'Generic D +6' },
      { pollster: 'TIPP (A+)', date: 'Feb 24 - 27, 2026', sampleSize: 1246, democrat: 46, republican: 44, margin: 'Generic D +2' },
      { pollster: 'McLaughlin (D)', date: 'Mar 4 - 9, 2026', sampleSize: 440, democrat: 47, republican: 43, margin: 'Generic D +4' },
      { pollster: 'Morning Consult (C-)', date: 'Feb 23 - Mar 1, 2026', sampleSize: 2202, democrat: 47, republican: 43, margin: 'Generic D +4' },
      { pollster: 'McCourtney', date: 'Feb 18 - 23, 2026', sampleSize: 824, democrat: 42, republican: 37, margin: 'Generic D +5' },
      { pollster: 'Marist College (A)', date: 'Mar 2 - 4, 2026', sampleSize: 1591, democrat: 53, republican: 44, margin: 'Generic D +9' },
      { pollster: 'YouGov (Economist) (B+)', date: 'Mar 5 - 9, 2026', sampleSize: 1405, democrat: 45, republican: 42, margin: 'Generic D +3' },
      { pollster: 'NBC (Hart/POS) (A)', date: 'Feb 27 - Mar 3, 2026', sampleSize: 1000, democrat: 50, republican: 44, margin: 'Generic D +6' },
      { pollster: 'RMG Research (C+)', date: 'Mar 2 - 5, 2026', sampleSize: 2000, democrat: 46, republican: 46, margin: 'Tie' },
      { pollster: 'Cygnal (R) (A+)', date: 'Feb 24 - 26, 2026', sampleSize: 1048, democrat: 48, republican: 45, margin: 'Generic D +3' },
      { pollster: 'Gray House (R)', date: 'Feb 20 - 23, 2026', sampleSize: 1394, democrat: 43, republican: 40, margin: 'Generic D +3' },
      { pollster: 'Quantus (B-)', date: 'Mar 2 - 3, 2026', sampleSize: 1624, democrat: 48, republican: 42, margin: 'Generic D +6' },
      { pollster: 'IPSOS (B)', date: 'Feb 18 - 23, 2026', sampleSize: 3686, democrat: 40, republican: 38, margin: 'Generic D +2' },
      { pollster: 'YouGov (Economist) (B+)', date: 'Feb 27 - Mar 2, 2026', sampleSize: 1515, democrat: 40, republican: 33, margin: 'Generic D +7' },
      { pollster: 'YouGov (CBS) (B+)', date: 'Feb 25 - 27, 2026', sampleSize: 1523, democrat: 50, republican: 45, margin: 'Generic D +5' },
      { pollster: 'HarrisX (Harvard) (B-)', date: 'Feb 25 - 26, 2026', sampleSize: 0, democrat: 50, republican: 50, margin: 'Tie' },
      { pollster: 'Public Sentiment Inst.', date: 'Feb 28, 2026', sampleSize: 249, democrat: 50, republican: 41, margin: 'Generic D +9' },
      { pollster: 'YouGov (B+)', date: 'Feb 23 - 26, 2026', sampleSize: 1402, democrat: 45, republican: 41, margin: 'Generic D +4' },
      { pollster: 'Morning Consult (C-)', date: 'Feb 9 - 15, 2026', sampleSize: 12505, democrat: 45, republican: 42, margin: 'Generic D +3' },
      { pollster: 'The Winston Group (A)', date: 'Jan 8 - 12, 2026', sampleSize: 1000, democrat: 46, republican: 43, margin: 'Generic D +3' },
      { pollster: 'Emerson College (A+)', date: 'Feb 21 - 22, 2026', sampleSize: 1000, democrat: 50, republican: 42, margin: 'Generic D +8' },
      { pollster: 'YouGov (CBS) (B+)', date: 'Feb 20 - 23, 2026', sampleSize: 1402, democrat: 45, republican: 41, margin: 'Generic D +4' },
      { pollster: 'Scripps News (C+)', date: 'Feb 13 - 19, 2026', sampleSize: 1000, democrat: 42, republican: 36, margin: 'Generic D +6' },
      { pollster: 'IPSOS (B)', date: 'Feb 18 - 23, 2026', sampleSize: 4638, democrat: 40, republican: 38, margin: 'Generic D +2' },
      { pollster: 'YouGov (BGSU) (B+)', date: 'Feb 13 - 18, 2026', sampleSize: 1200, democrat: 49, republican: 41, margin: 'Generic D +8' },
      { pollster: 'Strength In #s (A-)', date: 'Feb 18 - 20, 2026', sampleSize: 1566, democrat: 50, republican: 40, margin: 'Generic D +10' },
      { pollster: 'Echelon Insights (A)', date: 'Feb 19 - 23, 2026', sampleSize: 1002, democrat: 50, republican: 46, margin: 'Generic D +4' },
      { pollster: 'Big Data Poll (C+)', date: 'Feb 16 - 18, 2026', sampleSize: 1805, democrat: 50, republican: 41, margin: 'Generic D +9' },
      { pollster: 'YouGov (Yahoo) (B+)', date: 'Feb 9 - 12, 2026', sampleSize: 1149, democrat: 44, republican: 41, margin: 'Generic D +3' },
      { pollster: 'IPSOS (B)', date: 'Feb 13 - 16, 2026', sampleSize: 846, democrat: 41, republican: 37, margin: 'Generic D +4' },
      { pollster: 'YouGov (Economist) (B+)', date: 'Feb 13 - 16, 2026', sampleSize: 1512, democrat: 47, republican: 40, margin: 'Generic D +7' },
      { pollster: 'YouGov (Economist) (B+)', date: 'Feb 13 - 16, 2026', sampleSize: 1682, democrat: 39, republican: 33, margin: 'Generic D +6' },
      { pollster: 'Morning Consult (C-)', date: 'Feb 6 - 9, 2026', sampleSize: 1682, democrat: 45, republican: 41, margin: 'Generic D +4' },
      { pollster: 'The Argument (A-)', date: 'Feb 4 - 10, 2026', sampleSize: 3003, democrat: 53, republican: 47, margin: 'Generic D +6' },
      { pollster: 'TIPP (A+)', date: 'Jan 27 - 29, 2026', sampleSize: 1126, democrat: 45, republican: 42, margin: 'Generic D +3' },
      { pollster: 'Quantus (B-)', date: 'Feb 12 - 13, 2026', sampleSize: 1515, democrat: 50, republican: 43, margin: 'Generic D +8' },
      { pollster: 'Quantus (B-)', date: 'Feb 12 - 13, 2026', sampleSize: 1515, democrat: 48, republican: 42, margin: 'Generic D +7' },
      { pollster: 'Focaldata (B-)', date: 'Feb 10, 2026', sampleSize: 515, democrat: 51, republican: 44, margin: 'Generic D +8' },
      { pollster: 'Focaldata (B-)', date: 'Jan 23 - 26, 2026', sampleSize: 2037, democrat: 50, republican: 45, margin: 'Generic D +5' },
      { pollster: 'Cygnal (A+)', date: 'Feb 3 - 4, 2026', sampleSize: 1500, democrat: 48, republican: 44, margin: 'Generic D +4' },
      { pollster: 'Echelon/GBAO (A)', date: 'Dec 9 - 16, 25, 2025', sampleSize: 2023, democrat: 47, republican: 43, margin: 'Generic D +4' },
      { pollster: 'YouGov (B+)', date: 'Feb 6 - 9, 2026', sampleSize: 1551, democrat: 44, republican: 38, margin: 'Generic D +6' },
      { pollster: 'Morning Consult (C-)', date: 'Feb 2 - 8, 2026', sampleSize: 29303, democrat: 45, republican: 42, margin: 'Generic D +3' },
      { pollster: 'Zogby (B-)', date: 'Feb 4 - 5, 2026', sampleSize: 1000, democrat: 47, republican: 42, margin: 'Generic D +5' },
      { pollster: 'McLaughlin (D)', date: 'Jan 21 - 27, 2026', sampleSize: 1000, democrat: 46, republican: 44, margin: 'Generic D +2' },
      { pollster: 'Marquette (A+)', date: 'Jan 21 - 28, 2026', sampleSize: 577, democrat: 52, republican: 45, margin: 'Generic D +7' },
      { pollster: 'Marquette (A+)', date: 'Jan 21 - 28, 2026', sampleSize: 1003, democrat: 45, republican: 39, margin: 'Generic D +6' },
      { pollster: 'Marquette (A+)', date: 'Jan 21 - 28, 2026', sampleSize: 869, democrat: 48, republican: 44, margin: 'Generic D +4' },
      { pollster: 'PPP (B)', date: 'Jan 13 - 14, 2026', sampleSize: 597, democrat: 50, republican: 42, margin: 'Generic D +8' },
      { pollster: 'Morning Consult (C-)', date: 'Jan 30 - Feb 1, 2026', sampleSize: 2201, democrat: 47, republican: 42, margin: 'Generic D +5' },
      { pollster: 'YouGov (Economist) (B+)', date: 'Jan 30 - Feb 2, 2026', sampleSize: 1672, democrat: 44, republican: 40, margin: 'Generic D +4' },
      { pollster: 'Cygnal (A+)', date: 'Jan 27 - 28, 2026', sampleSize: 1004, democrat: 48, republican: 44, margin: 'Generic D +4' },
      { pollster: 'HarrisX (Harvard) (B-)', date: 'Jan 28 - 29, 2026', sampleSize: 2000, democrat: 54, republican: 46, margin: 'Generic D +8' },
      { pollster: 'Fox News/Beacon (A)', date: 'Jan 23 - 26, 2026', sampleSize: 1005, democrat: 52, republican: 46, margin: 'Generic D +6' },
      { pollster: 'KFF (SSRS) (B)', date: 'Jan 13 - 20, 2026', sampleSize: 1141, democrat: 49, republican: 42, margin: 'Generic D +7' },
      { pollster: 'The Argument (A-)', date: 'Jan 26 - 27, 2026', sampleSize: 1515, democrat: 52, republican: 48, margin: 'Generic D +4' },
      { pollster: 'Clarity Campaign (B)', date: 'Jan 15 - 22, 2026', sampleSize: 1147, democrat: 51, republican: 42, margin: 'Generic D +9' },
      { pollster: 'Big Data Poll (C+)', date: 'Jan 22 - 24, 2026', sampleSize: 3820, democrat: 46, republican: 42, margin: 'Generic D +4' },
      { pollster: 'IPSOS (B)', date: 'Jan 23 - 25, 2026', sampleSize: 1016, democrat: 41, republican: 37, margin: 'Generic D +4' },
      { pollster: 'YouGov (Economist) (B+)', date: 'Jan 23 - 26, 2026', sampleSize: 1520, democrat: 43, republican: 38, margin: 'Generic D +5' },
      { pollster: 'Echelon Insights (A)', date: 'Jan 22 - 26, 2026', sampleSize: 1029, democrat: 49, republican: 44, margin: 'Generic D +5' },
      { pollster: 'Research Co. (B+)', date: 'Jan 13 - 15, 2026', sampleSize: 1002, democrat: 42, republican: 36, margin: 'Generic D +6' },
      { pollster: 'Quantus (B-)', date: 'Jan 20 - 22, 2026', sampleSize: 1000, democrat: 47, republican: 41, margin: 'Generic D +7' },
      { pollster: 'NYT/Siena (A+)', date: 'Jan 12 - 17, 2026', sampleSize: 1625, democrat: 48, republican: 43, margin: 'Generic D +5' },
      { pollster: 'Emerson College (A+)', date: 'Jan 17 - 19, 2026', sampleSize: 1000, democrat: 48, republican: 42, margin: 'Generic D +6' },
      { pollster: 'Strength In #s (A-)', date: 'Jan 14 - 20, 2026', sampleSize: 1532, democrat: 51, republican: 43, margin: 'Generic D +8' },
      { pollster: 'Strength In #s (A-)', date: 'Jan 14 - 20, 2026', sampleSize: 1057, democrat: 55, republican: 42, margin: 'Generic D +13' },
      { pollster: 'CNN/SSRS (B)', date: 'Jan 9 - 12, 2026', sampleSize: 1004, democrat: 46, republican: 41, margin: 'Generic D +5' },
      { pollster: 'Impact/Fabrizio (B+)', date: 'Jan 8 - 13, 2026', sampleSize: 1500, democrat: 47, republican: 43, margin: 'Generic D +4' },
      { pollster: 'Cygnal (A+)', date: 'Jan 8 - 9, 2026', sampleSize: 1500, democrat: 48, republican: 45, margin: 'Generic D +4' },
      { pollster: 'IPSOS (B)', date: 'Jan 12 - 13, 2026', sampleSize: 941, democrat: 40, republican: 38, margin: 'Generic D +2' },
      { pollster: 'YouGov (B+)', date: 'Jan 9 - 12, 2026', sampleSize: 1602, democrat: 39, republican: 33, margin: 'Generic D +6' },
      { pollster: 'Morning Consult (C-)', date: 'Jan 9 - 12, 2026', sampleSize: 2201, democrat: 46, republican: 43, margin: 'Generic D +3' },
      { pollster: 'Morning Consult (C-)', date: 'Jan 5 - 11, 2026', sampleSize: 19675, democrat: 45, republican: 43, margin: 'Generic D +2' },
      { pollster: 'RMG Research (C+)', date: 'Jan 5 - 8, 2026', sampleSize: 2000, democrat: 47, republican: 46, margin: 'Generic D +1' },
      { pollster: 'Morning Consult (C-)', date: 'Jan 2 - 4, 2026', sampleSize: 2201, democrat: 45, republican: 42, margin: 'Generic D +3' },
      { pollster: 'YouGov (Economist) (B+)', date: 'Jan 2 - 5, 2026', sampleSize: 1551, democrat: 39, republican: 32, margin: 'Generic D +7' },
      { pollster: 'Morning Consult (C-)', date: 'Dec 29, 25 - Jan 4, 26', sampleSize: 22709, democrat: 44, republican: 42, margin: 'Generic D +2' },
      { pollster: 'The Bullfinch Group (C-)', date: 'Dec 30, 25 - Jan 1, 26', sampleSize: 1000, democrat: 44, republican: 33, margin: 'Generic D +11' },
      { pollster: 'Big Data Poll (C+)', date: 'Dec 26 - 28, 2025', sampleSize: 3412, democrat: 47, republican: 50, margin: 'Generic R +3' },
      { pollster: 'YouGov (Economist) (B+)', date: 'Dec 26 - 29, 2025', sampleSize: 1550, democrat: 36, republican: 31, margin: 'Generic D +5' },
      { pollster: 'GBAO/Third Way (B)', date: 'Nov 19 - 26, 2025', sampleSize: 2000, democrat: 48, republican: 42, margin: 'Generic D +6' },
      { pollster: 'YouGov (Economist) (B+)', date: 'Dec 20 - 22, 2025', sampleSize: 1592, democrat: 38, republican: 34, margin: 'Generic D +4' },
      { pollster: 'Morning Consult (C-)', date: 'Dec 19 - 21, 2025', sampleSize: 2203, democrat: 47, republican: 43, margin: 'Generic D +4' },
      { pollster: 'Morning Consult (C-)', date: 'Dec 15 - 21, 2025', sampleSize: 20240, democrat: 45, republican: 42, margin: 'Generic D +3' },
      { pollster: 'Building America (R) (A-)', date: 'Dec 15 - 17, 2025', sampleSize: 1000, democrat: 45, republican: 38, margin: 'Generic D +7' },
      { pollster: 'AtlasIntel (A+)', date: 'Dec 15 - 19, 2025', sampleSize: 2315, democrat: 54, republican: 38, margin: 'Generic D +16' },
      { pollster: 'Quantus Insights (B-)', date: 'Dec 15 - 16, 2025', sampleSize: 1000, democrat: 43, republican: 41, margin: 'Generic D +2' },
      { pollster: 'Emerson College (A+)', date: 'Dec 14 - 15, 2025', sampleSize: 1000, democrat: 44, republican: 42, margin: 'Generic D +2' },
      { pollster: 'Hart/POS (A)', date: 'Dec 4 - 8, 2025', sampleSize: 800, democrat: 50, republican: 46, margin: 'Generic D +4' },
      { pollster: 'Quinnipiac (A-)', date: 'Dec 11 - 15, 2025', sampleSize: 1035, democrat: 47, republican: 43, margin: 'Generic D +4' },
      { pollster: 'IPSOS (B)', date: 'Dec 12 - 15, 2025', sampleSize: 775, democrat: 40, republican: 36, margin: 'Generic D +4' },
      { pollster: 'Clarity Campaign (B)', date: 'Dec 4 - 11, 2025', sampleSize: 1000, democrat: 49, republican: 44, margin: 'Generic D +5' },
      { pollster: 'Echelon Insights (A)', date: 'Dec 11 - 15, 2025', sampleSize: 1011, democrat: 48, republican: 45, margin: 'Generic D +3' },
      { pollster: 'YouGov (Economist) (B+)', date: 'Dec 12 - 15, 2025', sampleSize: 1632, democrat: 37, republican: 33, margin: 'Generic D +4' },
      { pollster: 'Morning Consult (C-)', date: 'Dec 12 - 15, 2025', sampleSize: 2201, democrat: 45, republican: 44, margin: 'Generic D +1' },
      { pollster: 'The Argument (A-)', date: 'Dec 5 - 11, 2025', sampleSize: 1521, democrat: 44, republican: 42, margin: 'Generic D +2' },
      { pollster: 'Big Data Poll (C+)', date: 'Dec 10 - 12, 2025', sampleSize: 3004, democrat: 47, republican: 43, margin: 'Generic D +4' },
      { pollster: 'Cygnal (A+)', date: 'Dec 5 - 7, 2025', sampleSize: 1500, democrat: 48, republican: 44, margin: 'Generic D +4' },
      { pollster: 'IPSOS (B)', date: 'Oct 15 - 20, 2025', sampleSize: 0, democrat: 41, republican: 38, margin: 'Generic D +3' },
      { pollster: 'IPSOS (B)', date: 'Oct 24 - 26, 2025', sampleSize: 0, democrat: 39, republican: 39, margin: 'Tie' },
      { pollster: 'IPSOS (B)', date: 'Nov 14 - 17, 2025', sampleSize: 0, democrat: 38, republican: 36, margin: 'Generic D +2' },
      { pollster: 'IPSOS (B)', date: 'Dec 3 - 8, 2025', sampleSize: 3521, democrat: 40, republican: 39, margin: 'Generic D +1' },
      { pollster: 'Morning Consult (C-)', date: 'Dec 5 - 7, 2025', sampleSize: 2201, democrat: 46, republican: 43, margin: 'Generic D +3' },
      { pollster: 'YouGov (B+)', date: 'Dec 5 - 8, 2025', sampleSize: 1530, democrat: 37, republican: 32, margin: 'Generic D +5' },
      { pollster: 'Morning Consult (C-)', date: 'Dec 1 - 7, 2025', sampleSize: 21658, democrat: 44, republican: 43, margin: 'Generic D +1' },
      { pollster: 'High Point University (B-)', date: 'Nov 10 - 14, 2025', sampleSize: 837, democrat: 49, republican: 48, margin: 'Generic D +1' },
      { pollster: 'RMG Research (C+)', date: 'Dec 1 - 4, 2025', sampleSize: 2000, democrat: 44, republican: 48, margin: 'Generic R +4' },
      { pollster: 'YouGov (Yale) (B+)', date: 'Oct 29 - Nov 11, 2025', sampleSize: 3426, democrat: 45, republican: 43, margin: 'Generic D +3' },
      { pollster: 'Quantus Insights (B-)', date: 'Dec 4 - 5, 2025', sampleSize: 1000, democrat: 44, republican: 40, margin: 'Generic D +4' },
      { pollster: 'Survey 160', date: 'Nov 6 - 12, 2025', sampleSize: 1513, democrat: 46, republican: 39, margin: 'Generic D +7' },
      { pollster: 'J.L. Partners (B-)', date: 'Dec 5, 2025', sampleSize: 797, democrat: 50, republican: 46, margin: 'Generic D +4' },
      { pollster: 'YouGov (B+)', date: 'Nov 28 - Dec 1, 2025', sampleSize: 1628, democrat: 39, republican: 33, margin: 'Generic D +6' },
      { pollster: 'The Bullfinch Group (C-)', date: 'Nov 21 - 25, 2025', sampleSize: 1000, democrat: 41, republican: 35, margin: 'Generic D +6' },
      { pollster: 'Morning Consult (C-)', date: 'Nov 26 - 30, 2025', sampleSize: 2200, democrat: 45, republican: 41, margin: 'Generic D +4' },
      { pollster: 'Yougov (Yahoo) (B+)', date: 'Nov 20 - 24, 2025', sampleSize: 1131, democrat: 43, republican: 40, margin: 'Generic D +3' },
      { pollster: 'YouGov (Economist) (B+)', date: 'Nov 21 - 24, 2025', sampleSize: 1667, democrat: 39, republican: 32, margin: 'Generic D +7' },
      { pollster: 'High Point Univ. (B-)', date: 'Nov 10 - 14, 2025', sampleSize: 1004, democrat: 46, republican: 36, margin: 'Generic D +10' },
      { pollster: 'Morning Consult (C-)', date: 'Nov 21 - 23, 2025', sampleSize: 0, democrat: 45, republican: 43, margin: 'Generic D +2' },
      { pollster: 'The Argument (A-)', date: 'Nov 10 - 17, 2025', sampleSize: 1508, democrat: 53, republican: 47, margin: 'Generic D +6' },
      { pollster: 'Marist College (A)', date: 'Nov 10 - 13, 2025', sampleSize: 1291, democrat: 55, republican: 41, margin: 'Generic D +14' },
      { pollster: 'Marquette (A+)', date: 'Nov 5 - 12, 2025', sampleSize: 602, democrat: 53, republican: 44, margin: 'Generic D +9' },
      { pollster: 'Marquette (A+)', date: 'Nov 5 - 12, 2025', sampleSize: 903, democrat: 49, republican: 44, margin: 'Generic D +4' }
    ]
  },
  '2026-senate-generic': {
    chartData: [
      { date: '2025-01-05', cornyn: 34.2, paxton: 42.1, cornyinMin: 31.2, cornyinMax: 37.2, paxtonMin: 39.1, paxtonMax: 45.1 },
      { date: '2025-02-02', cornyn: 34.5, paxton: 42.7, cornyinMin: 31.5, cornyinMax: 37.5, paxtonMin: 39.7, paxtonMax: 45.7 },
      { date: '2025-02-10', cornyn: 38.2, paxton: 50.1, cornyinMin: 35.2, cornyinMax: 41.2, paxtonMin: 47.1, paxtonMax: 53.1 },
      { date: '2025-03-08', cornyn: 27.4, paxton: 38.7, cornyinMin: 24.4, cornyinMax: 30.4, paxtonMin: 35.7, paxtonMax: 41.7 },
      { date: '2025-03-25', cornyn: 35.3, paxton: 52.4, cornyinMin: 32.3, cornyinMax: 38.3, paxtonMin: 49.4, paxtonMax: 55.4 },
      { date: '2025-04-17', cornyn: 33, paxton: 50, cornyinMin: 30, cornyinMax: 36, paxtonMin: 47, paxtonMax: 53 },
      { date: '2025-05-01', cornyn: 37, paxton: 54, cornyinMin: 34, cornyinMax: 40, paxtonMin: 51, paxtonMax: 57 },
      { date: '2025-05-13', cornyn: 39, paxton: 52, cornyinMin: 36, cornyinMax: 42, paxtonMin: 49, paxtonMax: 55 },
      { date: '2025-05-28', cornyn: 28, paxton: 50, cornyinMin: 25, cornyinMax: 31, paxtonMin: 47, paxtonMax: 53 },
      { date: '2025-06-10', cornyn: 33, paxton: 49, cornyinMin: 30, cornyinMax: 36, paxtonMin: 46, paxtonMax: 52 },
      { date: '2025-06-22', cornyn: 38, paxton: 57, cornyinMin: 35, cornyinMax: 41, paxtonMin: 54, paxtonMax: 60 },
      { date: '2025-07-18', cornyn: 36, paxton: 47, cornyinMin: 33, cornyinMax: 39, paxtonMin: 44, paxtonMax: 50 },
      { date: '2025-08-06', cornyn: 42, paxton: 45, cornyinMin: 39, cornyinMax: 45, paxtonMin: 42, paxtonMax: 48 },
      { date: '2025-08-12', cornyn: 30, paxton: 29, cornyinMin: 27, cornyinMax: 33, paxtonMin: 26, paxtonMax: 32 },
      { date: '2025-08-25', cornyn: 37, paxton: 42, cornyinMin: 34, cornyinMax: 40, paxtonMin: 39, paxtonMax: 45 },
      { date: '2025-08-27', cornyn: 41, paxton: 48, cornyinMin: 38, cornyinMax: 44, paxtonMin: 45, paxtonMax: 51 },
      { date: '2025-08-29', cornyn: 32, paxton: 26, cornyinMin: 29, cornyinMax: 35, paxtonMin: 23, paxtonMax: 29 },
      { date: '2025-09-16', cornyn: 44, paxton: 44, cornyinMin: 41, cornyinMax: 47, paxtonMin: 41, paxtonMax: 47 },
      { date: '2025-09-22', cornyn: 39, paxton: 39, cornyinMin: 36, cornyinMax: 42, paxtonMin: 36, paxtonMax: 42 },
      { date: '2025-10-01', cornyn: 39, paxton: 37, cornyinMin: 36, cornyinMax: 42, paxtonMin: 34, paxtonMax: 40 },
      { date: '2025-10-06', cornyn: 43, paxton: 46, cornyinMin: 40, cornyinMax: 46, paxtonMin: 43, paxtonMax: 49 },
      { date: '2025-10-30', cornyn: 36, paxton: 39, cornyinMin: 33, cornyinMax: 39, paxtonMin: 36, paxtonMax: 42 },
      { date: '2025-11-06', cornyn: 38, paxton: 46, cornyinMin: 35, cornyinMax: 41, paxtonMin: 43, paxtonMax: 49 },
      { date: '2025-11-16', cornyn: 45, paxton: 41, cornyinMin: 42, cornyinMax: 48, paxtonMin: 38, paxtonMax: 44 },
      { date: '2025-12-02', cornyn: 34, paxton: 44, cornyinMin: 31, cornyinMax: 37, paxtonMin: 41, paxtonMax: 47 },
      { date: '2025-12-04', cornyn: 40, paxton: 44, cornyinMin: 37, cornyinMax: 43, paxtonMin: 41, paxtonMax: 47 },
      { date: '2026-01-07', cornyn: 33, paxton: 44, cornyinMin: 30, cornyinMax: 36, paxtonMin: 41, paxtonMax: 47 },
      { date: '2026-01-31', cornyn: 40, paxton: 51, cornyinMin: 37, cornyinMax: 43, paxtonMin: 48, paxtonMax: 54 },
      { date: '2026-02-03', cornyn: 40, paxton: 41, cornyinMin: 37, cornyinMax: 43, paxtonMin: 38, paxtonMax: 44 },
      { date: '2026-02-12', cornyn: 38, paxton: 50, cornyinMin: 35, cornyinMax: 41, paxtonMin: 47, paxtonMax: 53 },
      { date: '2026-02-24', cornyn: 36, paxton: 49, cornyinMin: 33, cornyinMax: 39, paxtonMin: 46, paxtonMax: 52 },
      { date: '2026-03-06', cornyn: 42.1, paxton: 45.2, cornyinMin: 39.1, cornyinMax: 45.1, paxtonMin: 42.2, paxtonMax: 48.2 },
      { date: '2026-03-08', cornyn: 41.5, paxton: 49.6, cornyinMin: 38.5, cornyinMax: 44.5, paxtonMin: 46.6, paxtonMax: 52.6 }
    ],
    polls: [
      { pollster: 'Change Research (D)', date: 'March 17–19, 2026', sampleSize: 807, cornyn: 39, paxton: 42, other: 0, undecided: 19, margin: 'Paxton +3' },
      { pollster: 'Impact Research (D)', date: 'March 12–17, 2026', sampleSize: 0, cornyn: 37, paxton: 53, other: 0, undecided: 10, margin: 'Paxton +16' },
      { pollster: 'Peak Insights (R)', date: 'March 9–12, 2026', sampleSize: 800, cornyn: 45, paxton: 45, other: 0, undecided: 10, margin: 'Tie' },
      { pollster: 'Slingshot Strategies (D)', date: 'March 7–8, 2026', sampleSize: 781, cornyn: 41, paxton: 49, other: 0, undecided: 10, margin: 'Paxton +8' },
      { pollster: 'Public Policy Polling (D)', date: 'March 5–6, 2026', sampleSize: 565, cornyn: 42, paxton: 45, other: 0, undecided: 12, margin: 'Paxton +3' },
      { pollster: 'Blueprint Polling (D)', date: 'February 23–24, 2026', sampleSize: 529, cornyn: 36, paxton: 49, other: 0, undecided: 15, margin: 'Paxton +13' },
      { pollster: 'McLaughlin & Associates (R)', date: 'February 9–12, 2026', sampleSize: 800, cornyn: 38, paxton: 50, other: 0, undecided: 12, margin: 'Paxton +12' },
      { pollster: 'J.L. Partners (R)', date: 'January 31 – February 3, 2026', sampleSize: 600, cornyn: 40, paxton: 41, other: 0, undecided: 19, margin: 'Paxton +1' },
      { pollster: 'University of Houston/YouGov', date: 'January 20–31, 2026', sampleSize: 550, cornyn: 40, paxton: 51, other: 0, undecided: 9, margin: 'Paxton +11' },
      { pollster: 'Harper Polling (R)', date: 'January 5–7, 2026', sampleSize: 600, cornyn: 33, paxton: 44, other: 0, undecided: 23, margin: 'Paxton +11' },
      { pollster: 'McLaughlin & Associates (R)', date: 'December 1–4, 2025', sampleSize: 800, cornyn: 40, paxton: 44, other: 0, undecided: 12, margin: 'Paxton +4' },
      { pollster: 'Public Policy Polling (D)', date: 'December 1–2, 2025', sampleSize: 527, cornyn: 34, paxton: 44, other: 0, undecided: 22, margin: 'Paxton +10' },
      { pollster: 'Ragnar Research Partners (R)', date: 'November 13–16, 2025', sampleSize: 758, cornyn: 45, paxton: 41, other: 0, undecided: 14, margin: 'Cornyn +4' },
      { pollster: 'Stratus Intelligence (R)', date: 'November 4–6, 2025', sampleSize: 811, cornyn: 38, paxton: 46, other: 0, undecided: 16, margin: 'Paxton +8' },
      { pollster: 'Harper Polling (R)', date: 'October 28–30, 2025', sampleSize: 614, cornyn: 36, paxton: 39, other: 0, undecided: 25, margin: 'Paxton +3' },
      { pollster: 'Stratus Intelligence (R)', date: 'October 4–6, 2025', sampleSize: 0, cornyn: 43, paxton: 46, other: 0, undecided: 11, margin: 'Paxton +3' },
      { pollster: 'University of Houston/Texas Southern University', date: 'September 19 – October 1, 2025', sampleSize: 576, cornyn: 44, paxton: 43, other: 0, undecided: 13, margin: 'Cornyn +1' },
      { pollster: 'UT Tyler', date: 'September 17–24, 2025', sampleSize: 493, cornyn: 39, paxton: 37, other: 0, undecided: 23, margin: 'Cornyn +2' },
      { pollster: 'Ragnar Research Partners (R)', date: 'September 20–22, 2025', sampleSize: 0, cornyn: 39, paxton: 39, other: 0, undecided: 22, margin: 'Tie' },
      { pollster: 'Stratus Intelligence (R)', date: 'September 14–16, 2025', sampleSize: 0, cornyn: 44, paxton: 44, other: 0, undecided: 12, margin: 'Tie' },
      { pollster: 'Texas Public Opinion Research', date: 'August 27–29, 2025', sampleSize: 320, cornyn: 32, paxton: 26, other: 13, undecided: 29, margin: 'Cornyn +6' },
      { pollster: 'co/efficient (R)', date: 'August 25–27, 2025', sampleSize: 818, cornyn: 36, paxton: 39, other: 0, undecided: 25, margin: 'Paxton +3' },
      { pollster: 'Stratus Intelligence (R)', date: 'August 24–26, 2025', sampleSize: 0, cornyn: 41, paxton: 48, other: 0, undecided: 11, margin: 'Paxton +7' },
      { pollster: 'Echelon Insights', date: 'August 21–24, 2025', sampleSize: 515, cornyn: 37, paxton: 42, other: 0, undecided: 21, margin: 'Paxton +5' },
      { pollster: 'Emerson College', date: 'August 11–12, 2025', sampleSize: 491, cornyn: 30, paxton: 29, other: 5, undecided: 36, margin: 'Cornyn +1' },
      { pollster: 'Texas Southern University', date: 'August 6–12, 2025', sampleSize: 1500, cornyn: 39, paxton: 44, other: 0, undecided: 17, margin: 'Paxton +5' },
      { pollster: 'Stratus Intelligence (R)', date: 'August 4–6, 2025', sampleSize: 0, cornyn: 42, paxton: 45, other: 0, undecided: 13, margin: 'Paxton +3' },
      { pollster: 'Stratus Intelligence (R)', date: 'July 16–18, 2025', sampleSize: 0, cornyn: 36, paxton: 47, other: 0, undecided: 17, margin: 'Paxton +11' },
      { pollster: 'Pulse Decision Science (R)', date: 'June 17–22, 2025', sampleSize: 806, cornyn: 38, paxton: 57, other: 0, undecided: 5, margin: 'Paxton +19' },
      { pollster: 'Stratus Intelligence (R)', date: 'June 8–10, 2025', sampleSize: 0, cornyn: 33, paxton: 49, other: 0, undecided: 18, margin: 'Paxton +16' },
      { pollster: 'UT Tyler', date: 'May 28 – June 7, 2025', sampleSize: 538, cornyn: 34, paxton: 44, other: 0, undecided: 22, margin: 'Paxton +10' },
      { pollster: 'Stratus Intelligence (R)', date: 'June 6–8, 2025', sampleSize: 600, cornyn: 33, paxton: 49, other: 0, undecided: 18, margin: 'Paxton +16' },
      { pollster: 'UpONE Insights (R)', date: 'May 27–28, 2025', sampleSize: 600, cornyn: 28, paxton: 50, other: 0, undecided: 21, margin: 'Paxton +22' },
      { pollster: 'YouGov/Texas Southern University', date: 'May 9–19, 2025', sampleSize: 510, cornyn: 34, paxton: 43, other: 0, undecided: 23, margin: 'Paxton +9' },
      { pollster: 'Quantus Insights (R)', date: 'May 11–13, 2025', sampleSize: 600, cornyn: 39, paxton: 52, other: 0, undecided: 9, margin: 'Paxton +13' },
      { pollster: 'American Opportunity Alliance (R)', date: 'April 29 – May 1, 2025', sampleSize: 800, cornyn: 35, paxton: 52, other: 0, undecided: 13, margin: 'Paxton +17' },
      { pollster: 'The Tarrance Group (R)', date: 'April 27 – May 1, 2025', sampleSize: 0, cornyn: 40, paxton: 56, other: 0, undecided: 0, margin: 'Paxton +16' },
      { pollster: 'Stratus Intelligence (R)', date: 'April 29–30, 2025', sampleSize: 0, cornyn: 33, paxton: 48, other: 0, undecided: 19, margin: 'Paxton +15' },
      { pollster: 'Stratus Intelligence (R)', date: 'April 15–17, 2025', sampleSize: 0, cornyn: 33, paxton: 50, other: 0, undecided: 17, margin: 'Paxton +17' },
      { pollster: 'Internal Republican Party poll', date: 'Mid–April 2025', sampleSize: 605, cornyn: 33, paxton: 50, other: 0, undecided: 17, margin: 'Paxton +17' },
      { pollster: 'Stratus Intelligence (R)', date: 'March 23–25, 2025', sampleSize: 0, cornyn: 35, paxton: 52, other: 0, undecided: 13, margin: 'Paxton +17' },
      { pollster: 'Lake Research Partners (D)/Slingshot Strategies (D)', date: 'March 7–10, 2025', sampleSize: 0, cornyn: 27, paxton: 38, other: 19, undecided: 16, margin: 'Paxton +11' },
      { pollster: 'Fabrizio, Lee & Associates (R)', date: 'January 28 – February 2, 2025', sampleSize: 0, cornyn: 28, paxton: 53, other: 0, undecided: 19, margin: 'Paxton +25' },
      { pollster: 'Victory Insights (R)', date: 'January 4–6, 2025', sampleSize: 600, cornyn: 34, paxton: 42, other: 0, undecided: 25, margin: 'Paxton +8' }
    ]
  },
  'florida-gop-governor': {
    chartData: [
      { date: '2025-09-05', donalds: 40.2, fishback: 0.3, collins: 2.1, renner: 2.4 },
      { date: '2025-10-14', donalds: 36.1, fishback: 0.3, collins: 2.4, renner: 5.4 },
      { date: '2025-11-15', donalds: 44, fishback: 0.5, collins: 1, renner: 2.5 },
      { date: '2025-12-09', donalds: 39, fishback: 1, collins: 11, renner: 0.5 },
      { date: '2026-01-08', donalds: 41, fishback: 3.5, collins: 6.5, renner: 3.5 },
      { date: '2026-02-16', donalds: 32.15, fishback: 6.37, collins: 10.6, renner: 4.05 },
      { date: '2026-02-25', donalds: 44.2, fishback: 5.6, collins: 4.3, renner: 2.1 }
    ],
    polls: [
      { pollster: 'The American Promise', date: 'February 23–26, 2026', sampleSize: 800, collins: 4, donalds: 44, fishback: 5, renner: 2, other: 0, undecided: 45, margin: 'Donalds +40' },
      { pollster: 'The Public Sentiment Institute', date: 'February 20, 2026', sampleSize: 0, collins: 12, donalds: 30, fishback: 8, renner: 2, other: 2, undecided: 46, margin: 'Donalds +18' },
      { pollster: 'University of North Florida', date: 'February 16–20, 2026', sampleSize: 657, collins: 4, donalds: 31, fishback: 6, renner: 1, other: 6, undecided: 51, margin: 'Donalds +27' },
      { pollster: 'Targoz Market Research', date: 'February 13–16, 2026', sampleSize: 401, collins: 15, donalds: 33, fishback: 3, renner: 9, other: 0, undecided: 40, margin: 'Donalds +18' },
      { pollster: 'Patriot Polling (R)', date: 'January 19–29, 2026', sampleSize: 827, collins: 0, donalds: 37, fishback: 23, renner: 0, other: 0, undecided: 40, margin: 'Donalds +14' },
      { pollster: 'Mason-Dixon Polling & Strategy', date: 'January 8–13, 2026', sampleSize: 400, collins: 7, donalds: 37, fishback: 3, renner: 4, other: 0, undecided: 49, margin: 'Donalds +30' },
      { pollster: 'Fabrizio, Lee & Associates (R)', date: 'January 4–6, 2026', sampleSize: 600, collins: 6, donalds: 45, fishback: 4, renner: 3, other: 0, undecided: 41, margin: 'Donalds +39' },
      { pollster: 'Public Opinion Strategies (R)', date: 'December 7–11, 2025', sampleSize: 700, collins: 13, donalds: 40, fishback: 0, renner: 0, other: 9, undecided: 38, margin: 'Donalds +27' },
      { pollster: 'The Tyson Group (R)', date: 'December 8–9, 2025', sampleSize: 800, collins: 9, donalds: 38, fishback: 2, renner: 1, other: 0, undecided: 49, margin: 'Donalds +29' },
      { pollster: 'The American Promise', date: 'November 17–19, 2025', sampleSize: 800, collins: 1, donalds: 43, fishback: 0, renner: 2, other: 0, undecided: 54, margin: 'Donalds +42' },
      { pollster: 'Victory Insights (R)', date: 'November 11–13, 2025', sampleSize: 600, collins: 1, donalds: 45, fishback: 1, renner: 3, other: 0, undecided: 49, margin: 'Donalds +44' },
      { pollster: 'St. Pete Polls', date: 'October 13–15, 2025', sampleSize: 1034, collins: 4, donalds: 39, fishback: 0, renner: 3, other: 0, undecided: 54, margin: 'Donalds +35' },
      { pollster: 'Targoz Market Research', date: 'September 16–18, 2025', sampleSize: 506, collins: 0, donalds: 29, fishback: 0, renner: 9, other: 0, undecided: 62, margin: 'Donalds +20' },
      { pollster: 'The American Promise', date: 'September 4–5, 2025', sampleSize: 800, collins: 2, donalds: 40, fishback: 0, renner: 2, other: 0, undecided: 54, margin: 'Donalds +38' }
    ]
  },
  'georgia-gop-governor': {
    chartData: [
      { date: '2025-10-14', jones: 32.4, jackson: 0.3, raffensperger: 15.2, carr: 12.1 },
      { date: '2025-12-19', jones: 23.45, jackson: 0.3, raffensperger: 15.05, carr: 8.25 },
      { date: '2026-02-09', jones: 19.6, jackson: 20.2, raffensperger: 9.75, carr: 5.5 },
      { date: '2026-02-18', jones: 16.8, jackson: 27.95, raffensperger: 13.15, carr: 7.9 },
      { date: '2026-03-08', jones: 22.1, jackson: 37.4, raffensperger: 11.3, carr: 4.7 }
    ],
    polls: [
      { pollster: 'JMC Analytics', date: 'March 7–8, 2026', sampleSize: 560, carr: 4, dean: 0, jackson: 37, jones: 22, raffensperger: 11, other: 0, undecided: 25, margin: 'Jackson +15' },
      { pollster: 'Emerson College', date: 'February 28 – March 2, 2026', sampleSize: 453, carr: 6, dean: 0, jackson: 20, jones: 21, raffensperger: 11, other: 4, undecided: 38, margin: 'Jones +1' },
      { pollster: 'Quantus Insights (R)', date: 'February 17–18, 2026', sampleSize: 1337, carr: 5, dean: 0, jackson: 33, jones: 17, raffensperger: 8, other: 0, undecided: 37, margin: 'Jackson +16' },
      { pollster: 'Rasmussen Reports (R)', date: 'February 11–12, 2026', sampleSize: 1022, carr: 10, dean: 0, jackson: 22, jones: 16, raffensperger: 18, other: 0, undecided: 34, margin: 'Jackson +4' },
      { pollster: 'co/efficient (R)', date: 'February 8–9, 2026', sampleSize: 1123, carr: 3, dean: 1, jackson: 24, jones: 16, raffensperger: 9, other: 5, undecided: 42, margin: 'Jackson +8' },
      { pollster: 'Cygnal (R)', date: 'February 5–6, 2026', sampleSize: 600, carr: 7, dean: 0, jackson: 16, jones: 22, raffensperger: 10, other: 0, undecided: 45, margin: 'Jones +6' },
      { pollster: 'InsiderAdvantage (R)/Rosetta Stone (R)', date: 'December 18–19, 2025', sampleSize: 1000, carr: 9, dean: 4, jackson: 0, jones: 24, raffensperger: 14, other: 0, undecided: 49, margin: 'Jones +10' },
      { pollster: 'University of Georgia School of Public and International Affairs', date: 'October 15–23, 2025', sampleSize: 1000, carr: 7, dean: 1, jackson: 0, jones: 22, raffensperger: 15, other: 0, undecided: 55, margin: 'Jones +7' },
      { pollster: 'Quantus Insights (R)', date: 'October 13–14, 2025', sampleSize: 900, carr: 12, dean: 2, jackson: 0, jones: 32, raffensperger: 15, other: 1, undecided: 38, margin: 'Jones +17' }
    ]
  },
  'arizona-gop-governor': {
    chartData: [],
    polls: [
      { pollster: 'Noble Predictive Insights', date: 'February 23–26, 2026', sampleSize: 384, biggs: 40, robson: 0, schweikert: 19, other: 0, undecided: 41, margin: 'Biggs +21' },
      { pollster: 'Center for Excellence in Polling', date: 'January 22–24, 2026', sampleSize: 0, biggs: 28, robson: 19, schweikert: 12, other: 0, undecided: 41, margin: 'Biggs +9' },
      { pollster: 'Emerson College', date: 'November 8–10, 2025', sampleSize: 381, biggs: 50, robson: 17, schweikert: 8, other: 1, undecided: 24, margin: 'Biggs +33' },
      { pollster: 'GrayHouse (R)', date: 'October 26–28, 2025', sampleSize: 397, biggs: 43, robson: 19, schweikert: 2, other: 0, undecided: 36, margin: 'Biggs +24' },
      { pollster: 'Pulse Decision Science (R)', date: 'September 8–10, 2025', sampleSize: 502, biggs: 48, robson: 26, schweikert: 11, other: 0, undecided: 15, margin: 'Biggs +22' },
      { pollster: 'Kreate Strategies (R)', date: 'August 19–21, 2025', sampleSize: 679, biggs: 65, robson: 14, schweikert: 0, other: 0, undecided: 21, margin: 'Biggs +51' },
      { pollster: 'Noble Predictive Insights', date: 'August 11–18, 2025', sampleSize: 385, biggs: 27, robson: 37, schweikert: 0, other: 0, undecided: 36, margin: 'Robson +10' },
      { pollster: 'NextGen P (R)', date: 'June 17–18, 2025', sampleSize: 1380, biggs: 49, robson: 26, schweikert: 0, other: 8, undecided: 17, margin: 'Biggs +23' },
      { pollster: 'Kreate Strategies (R)', date: 'May 23–25, 2025', sampleSize: 1147, biggs: 57, robson: 25, schweikert: 0, other: 0, undecided: 18, margin: 'Biggs +32' },
      { pollster: 'Pulse Decision Science (R)', date: 'April 6–9, 2025', sampleSize: 511, biggs: 45, robson: 16, schweikert: 0, other: 0, undecided: 39, margin: 'Biggs +29' },
      { pollster: 'NicoPAC (R)', date: 'April 2–6, 2025', sampleSize: 477, biggs: 66, robson: 15, schweikert: 0, other: 4, undecided: 15, margin: 'Biggs +51' },
      { pollster: 'NicoPAC (R)', date: 'January 24–26, 2025', sampleSize: 512, biggs: 71, robson: 14, schweikert: 0, other: 0, undecided: 15, margin: 'Biggs +57' },
    ]
  },
  'louisiana-gop-senate': {
    chartData: [],
    polls: [
      { pollster: 'Fabrizio, Lee & Associates (R)', date: 'March 11–12, 2026', sampleSize: 600, cassidy: 26, fleming: 19, letlow: 27, other: 1, undecided: 27, margin: 'Letlow +1' },
      { pollster: 'Public Opinion Strategies (R)', date: 'March 7–10, 2026', sampleSize: 500, cassidy: 35, fleming: 21, letlow: 24, other: 2, undecided: 18, margin: 'Cassidy +11' },
      { pollster: 'BDPC', date: 'February 21–23, 2026', sampleSize: 600, cassidy: 28, fleming: 21, letlow: 21, other: 0, undecided: 30, margin: 'Cassidy +7' },
      { pollster: 'Quantus Insights (R)', date: 'February 23–24, 2026', sampleSize: 1428, cassidy: 20, fleming: 34, letlow: 25, other: 0, undecided: 21, margin: 'Fleming +9' },
      { pollster: 'Cor Strategies (R)', date: 'February 20–24, 2026', sampleSize: 0, cassidy: 30, fleming: 17, letlow: 15, other: 14, undecided: 24, margin: 'Cassidy +13' },
      { pollster: 'JMC Analytics & Polling', date: 'February 14–16, 2026', sampleSize: 645, cassidy: 22, fleming: 26, letlow: 25, other: 1, undecided: 26, margin: 'Fleming +4' },
      { pollster: 'BDPC', date: 'January 20–22, 2026', sampleSize: 600, cassidy: 21, fleming: 14, letlow: 27, other: 6, undecided: 27, margin: 'Letlow +6' },
      { pollster: 'Public Opinion Strategies (R)', date: 'January 20–22, 2026', sampleSize: 600, cassidy: 32, fleming: 16, letlow: 21, other: 0, undecided: 19, margin: 'Cassidy +11' },
      { pollster: 'JMC Analytics & Polling', date: 'January 12–14, 2026', sampleSize: 650, cassidy: 22, fleming: 23, letlow: 0, other: 16, undecided: 39, margin: 'Fleming +1' },
      { pollster: 'JMC Analytics & Polling', date: 'October 15–17, 2025', sampleSize: 610, cassidy: 23, fleming: 25, letlow: 0, other: 17, undecided: 35, margin: 'Fleming +2' },
      { pollster: 'Ragnar Research Partners (R)', date: 'April 14–16, 2025', sampleSize: 600, cassidy: 45, fleming: 28, letlow: 0, other: 3, undecided: 24, margin: 'Cassidy +17' },
      { pollster: 'JMC Analytics & Polling', date: 'February 24–26, 2025', sampleSize: 600, cassidy: 27, fleming: 40, letlow: 0, other: 0, undecided: 33, margin: 'Fleming +13' },
    ]
  },
  'georgia-gop-senate': {
    chartData: [],
    polls: [
      { pollster: 'JMC Analytics', date: 'March 7–8, 2026', sampleSize: 560, carter: 11, collins: 31, dooley: 13, other: 1, undecided: 43, margin: 'Collins +18' },
      { pollster: 'Emerson College', date: 'February 28 – March 2, 2026', sampleSize: 453, carter: 16, collins: 30, dooley: 10, other: 4, undecided: 40, margin: 'Collins +14' },
      { pollster: 'Quantus Insights (R)', date: 'February 17–18, 2026', sampleSize: 1337, carter: 11, collins: 36, dooley: 9, other: 0, undecided: 44, margin: 'Collins +25' },
      { pollster: 'Rasmussen Reports (R)', date: 'February 11–12, 2026', sampleSize: 1022, carter: 19, collins: 34, dooley: 11, other: 0, undecided: 36, margin: 'Collins +15' },
      { pollster: 'Plymouth Union Public Research (R)', date: 'January 13–15, 2026', sampleSize: 600, carter: 16, collins: 32, dooley: 12, other: 0, undecided: 38, margin: 'Collins +16' },
      { pollster: 'InsiderAdvantage (R)', date: 'December 18–19, 2025', sampleSize: 1000, carter: 20, collins: 25, dooley: 12, other: 5, undecided: 38, margin: 'Collins +5' },
      { pollster: 'Quantus Insights (R)', date: 'October 22–23, 2025', sampleSize: 1320, carter: 16, collins: 28, dooley: 16, other: 0, undecided: 40, margin: 'Collins +12' },
      { pollster: 'Atlanta Journal-Constitution', date: 'October 15–23, 2025', sampleSize: 0, carter: 20, collins: 30, dooley: 12, other: 0, undecided: 38, margin: 'Collins +10' },
      { pollster: 'Quantus Insights (R)', date: 'September 9–12, 2025', sampleSize: 253, carter: 20, collins: 25, dooley: 7, other: 0, undecided: 48, margin: 'Collins +5' },
      { pollster: 'TIPP Insights', date: 'July 28 – August 1, 2025', sampleSize: 1123, carter: 19, collins: 25, dooley: 7, other: 6, undecided: 43, margin: 'Collins +6' },
    ]
  },
  'michigan-dem-senate': {
    chartData: [],
    polls: [
      { pollster: 'Upswing Research (D)', date: 'February 26 – March 2, 2026', sampleSize: 600, elsayed: 23, mcmorrow: 25, stevens: 27, other: 0, undecided: 25, margin: 'Stevens +2' },
      { pollster: 'Emerson College', date: 'January 24–25, 2026', sampleSize: 491, elsayed: 16, mcmorrow: 22, stevens: 16, other: 7, undecided: 38, margin: 'McMorrow +6' },
      { pollster: 'Mitchell Research & Communications', date: 'November 18–21, 2025', sampleSize: 261, elsayed: 16, mcmorrow: 24, stevens: 27, other: 0, undecided: 33, margin: 'Stevens +3' },
      { pollster: 'Rosetta Stone Communications (R)', date: 'October 23–25, 2025', sampleSize: 287, elsayed: 20, mcmorrow: 25, stevens: 26, other: 0, undecided: 29, margin: 'Stevens +1' },
      { pollster: 'NRSC (R)', date: 'July 4–7, 2025', sampleSize: 582, elsayed: 22, mcmorrow: 11, stevens: 24, other: 1, undecided: 42, margin: 'Stevens +2' },
      { pollster: 'Global Strategy Group (D)', date: 'May 28 – June 2, 2025', sampleSize: 800, elsayed: 15, mcmorrow: 20, stevens: 24, other: 4, undecided: 37, margin: 'Stevens +4' },
      { pollster: 'Glengariff Group', date: 'May 5–8, 2025', sampleSize: 600, elsayed: 22, mcmorrow: 14, stevens: 34, other: 0, undecided: 30, margin: 'Stevens +12' },
    ]
  },
  'minnesota-dem-senate': {
    chartData: [],
    polls: [
      { pollster: 'GQR (D)', date: 'January 14–20, 2026', sampleSize: 600, craig: 36, flanagan: 49, other: 0, undecided: 15, margin: 'Flanagan +13' },
      { pollster: 'Public Policy Polling (D)', date: 'January 16–17, 2026', sampleSize: 976, craig: 28, flanagan: 40, other: 0, undecided: 31, margin: 'Flanagan +12' },
      { pollster: 'Impact Research (D)', date: 'January 13–15, 2026', sampleSize: 600, craig: 42, flanagan: 45, other: 3, undecided: 9, margin: 'Flanagan +3' },
      { pollster: 'NRSC (R)', date: 'July 4–7, 2025', sampleSize: 559, craig: 24, flanagan: 30, other: 0, undecided: 45, margin: 'Flanagan +6' },
      { pollster: 'Public Policy Polling (D)', date: 'February 14–15, 2025', sampleSize: 668, craig: 22, flanagan: 52, other: 0, undecided: 27, margin: 'Flanagan +30' },
    ]
  },
  'kentucky-gop-senate': {
    chartData: [],
    polls: [
      { pollster: 'Public Opinion Strategies (R)', date: 'March 10-12, 2026', sampleSize: 600, barr: 29, cameron: 31, morris: 13, other: 0, undecided: 27, margin: 'Cameron +2' },
      { pollster: 'Quantus Insights (R)', date: 'February 4, 2026', sampleSize: 870, barr: 28, cameron: 27, morris: 17, other: 9, undecided: 19, margin: 'Barr +1' },
      { pollster: 'Emerson College', date: 'January 31 – February 2, 2026', sampleSize: 523, barr: 24, cameron: 21, morris: 14, other: 4, undecided: 37, margin: 'Barr +3' },
      { pollster: 'Fabrizio, Lee & Associates (R)', date: 'January 27–29, 2026', sampleSize: 800, barr: 21, cameron: 29, morris: 18, other: 0, undecided: 42, margin: 'Cameron +8' },
      { pollster: 'OnMessage Inc. (R)', date: 'January 5–8, 2026', sampleSize: 600, barr: 25, cameron: 40, morris: 13, other: 0, undecided: 22, margin: 'Cameron +15' },
      { pollster: 'UpOne Insights (R)', date: 'October 13–14, 2025', sampleSize: 600, barr: 25, cameron: 42, morris: 10, other: 0, undecided: 23, margin: 'Cameron +17' },
      { pollster: 'co/efficient (R)', date: 'October 8–10, 2025', sampleSize: 911, barr: 22, cameron: 39, morris: 8, other: 4, undecided: 27, margin: 'Cameron +17' },
      { pollster: 'Public Opinion Strategies (R)', date: 'September 2–4, 2025', sampleSize: 600, barr: 29, cameron: 37, morris: 8, other: 0, undecided: 26, margin: 'Cameron +8' },
      { pollster: 'Fabrizio, Lee & Associates (R)', date: 'August 2025', sampleSize: 0, barr: 17, cameron: 40, morris: 5, other: 0, undecided: 38, margin: 'Cameron +23' },
      { pollster: 'UpOne Insights (R)', date: 'August 2025', sampleSize: 0, barr: 19, cameron: 39, morris: 10, other: 0, undecided: 32, margin: 'Cameron +20' },
      { pollster: 'McLaughlin & Associates (R)', date: 'April 13–15, 2025', sampleSize: 500, barr: 18, cameron: 44, morris: 2, other: 0, undecided: 36, margin: 'Cameron +26' },
      { pollster: 'co/efficient (R)', date: 'February 25–26, 2025', sampleSize: 1134, barr: 18, cameron: 39, morris: 3, other: 11, undecided: 31, margin: 'Cameron +21' },
      { pollster: 'UpOne Insights (R)', date: 'Mid-February 2025', sampleSize: 0, barr: 19, cameron: 47, morris: 3, other: 0, undecided: 31, margin: 'Cameron +28' },
      { pollster: 'co/efficient (R)', date: 'December 2–3, 2024', sampleSize: 1298, barr: 12, cameron: 37, morris: 1, other: 14, undecided: 36, margin: 'Cameron +25' },
    ]
  },
  'wisconsin-dem-governor': {
    chartData: [],
    polls: [
      { pollster: 'Marquette University', date: 'February 11–19, 2026', sampleSize: 394, crowley: 3, hong: 11, roys: 1, barnes: 10, hughes: 2, rodriguez: 6, other: 3, undecided: 65, margin: 'Hong +1' },
      { pollster: 'TIPP Insights (R)', date: 'February 6–12, 2026', sampleSize: 1524, crowley: 7, hong: 5, roys: 2, barnes: 28, hughes: 1, rodriguez: 20, other: 1, undecided: 35, margin: 'Barnes +8' },
      { pollster: 'TIPP Insights (R)', date: 'November 17–21, 2025', sampleSize: 589, crowley: 6, hong: 0, roys: 1, barnes: 21, hughes: 2, rodriguez: 6, other: 11, undecided: 52, margin: 'Barnes +15' },
      { pollster: 'Marquette University', date: 'October 15–22, 2025', sampleSize: 378, crowley: 3, hong: 6, roys: 3, barnes: 0, hughes: 2, rodriguez: 4, other: 0, undecided: 81, margin: 'Hong +2' },
      { pollster: 'Platform Communications', date: 'September 28–30, 2025', sampleSize: 0, crowley: 7, hong: 4, roys: 4, barnes: 16, hughes: 2, rodriguez: 8, other: 20, undecided: 39, margin: 'Barnes +8' },
    ]
  },
  '2028-dem-primary': {
    chartData: [],
    polls: [
      { pollster: 'Echelon Insights', date: 'March 12–16, 2026', sampleSize: 1033, harris: 21, newsom: 19, buttigieg: 9, aoc: 11, pritzker: 2, shapiro: 5, booker: 4, other: 29, margin: 'Harris +2' },
      { pollster: 'Focaldata', date: 'March 6–10, 2026', sampleSize: 1782, harris: 39, newsom: 22, buttigieg: 8, aoc: 11, pritzker: 4, shapiro: 6, booker: 0, other: 10, margin: 'Harris +17' },
      { pollster: 'McLaughlin & Associates', date: 'March 4–9, 2026', sampleSize: 456, harris: 20, newsom: 19, buttigieg: 9, aoc: 11, pritzker: 2, shapiro: 5, booker: 2, other: 14, margin: 'Harris +1' },
      { pollster: 'Noble Predictive Insights', date: 'March 2–5, 2026', sampleSize: 1152, harris: 31, newsom: 16, buttigieg: 7, aoc: 6, pritzker: 2, shapiro: 5, booker: 3, other: 30, margin: 'Harris +15' },
      { pollster: 'McLaughlin & Associates', date: 'March 4–9, 2026', sampleSize: 1000, harris: 20, newsom: 19, buttigieg: 9, aoc: 11, pritzker: 2, shapiro: 5, booker: 2, other: 32, margin: 'Harris +1' },
      { pollster: 'Focaldata', date: 'March 6–10, 2026', sampleSize: 1782, harris: 39, newsom: 22, buttigieg: 8, aoc: 11, pritzker: 4, shapiro: 6, booker: 0, other: 10, margin: 'Harris +17' },
      { pollster: 'Harvard Harris', date: 'February 25–26, 2026', sampleSize: 1999, harris: 39, newsom: 24, buttigieg: 0, aoc: 14, pritzker: 6, shapiro: 10, booker: 0, other: 7, margin: 'Harris +15' },
      { pollster: 'Emerson College', date: 'February 21–22, 2026', sampleSize: 438, harris: 13, newsom: 20, buttigieg: 16, aoc: 9, pritzker: 3, shapiro: 7, booker: 0, other: 32, margin: 'Newsom +7' },
      { pollster: 'Echelon Insights', date: 'February 19–23, 2026', sampleSize: 1002, harris: 18, newsom: 24, buttigieg: 8, aoc: 9, pritzker: 4, shapiro: 4, booker: 3, other: 30, margin: 'Newsom +6' },
      { pollster: 'YouGov/BGSU', date: 'February 13–18, 2026', sampleSize: 1200, harris: 18, newsom: 21, buttigieg: 11, aoc: 11, pritzker: 6, shapiro: 3, booker: 2, other: 28, margin: 'Newsom +3' },
      { pollster: 'Focaldata', date: 'February 10, 2026', sampleSize: 1148, harris: 39, newsom: 21, buttigieg: 7, aoc: 10, pritzker: 3, shapiro: 7, booker: 0, other: 13, margin: 'Harris +18' },
      { pollster: 'The Public Sentiment Institute', date: 'February 28, 2026', sampleSize: 124, harris: 15, newsom: 29, buttigieg: 9, aoc: 6, pritzker: 4, shapiro: 7, booker: 5, other: 25, margin: 'Newsom +14' },
      { pollster: 'J.L. Partners', date: 'February 25–27, 2026', sampleSize: 1095, harris: 23, newsom: 19, buttigieg: 10, aoc: 9, pritzker: 4, shapiro: 5, booker: 5, other: 25, margin: 'Harris +4' },
      { pollster: 'Manhattan Institute', date: 'February 6–15, 2026', sampleSize: 1782, harris: 23, newsom: 20, buttigieg: 8, aoc: 7, pritzker: 2, shapiro: 5, booker: 2, other: 33, margin: 'Harris +3' },
      { pollster: 'Rasmussen Reports', date: 'January 25–27, 2026', sampleSize: 1115, harris: 34, newsom: 20, buttigieg: 10, aoc: 7, pritzker: 0, shapiro: 10, booker: 6, other: 13, margin: 'Harris +14' },
      { pollster: 'Big Data Poll', date: 'January 22–24, 2026', sampleSize: 1346, harris: 31, newsom: 22, buttigieg: 12, aoc: 6, pritzker: 0, shapiro: 6, booker: 0, other: 23, margin: 'Harris +9' },
      { pollster: 'Echelon Insights', date: 'January 22–26, 2026', sampleSize: 1029, harris: 21, newsom: 27, buttigieg: 8, aoc: 9, pritzker: 3, shapiro: 3, booker: 3, other: 26, margin: 'Newsom +6' },
      { pollster: 'I&I/TIPP', date: 'January 27–29, 2026', sampleSize: 527, harris: 38, newsom: 13, buttigieg: 5, aoc: 2, pritzker: 3, shapiro: 4, booker: 0, other: 35, margin: 'Harris +25' },
      { pollster: 'Harvard Harris', date: 'January 28–29, 2026', sampleSize: 2000, harris: 39, newsom: 30, buttigieg: 0, aoc: 12, pritzker: 7, shapiro: 9, booker: 0, other: 3, margin: 'Harris +9' },
      { pollster: 'McLaughlin & Associates', date: 'January 21–27, 2026', sampleSize: 1000, harris: 27, newsom: 14, buttigieg: 8, aoc: 7, pritzker: 2, shapiro: 4, booker: 3, other: 35, margin: 'Harris +13' },
      { pollster: 'YouGov', date: 'January 9–14, 2026', sampleSize: 2250, harris: 20, newsom: 17, buttigieg: 8, aoc: 9, pritzker: 3, shapiro: 2, booker: 3, other: 38, margin: 'Harris +3' },
      { pollster: 'Zogby Analytics', date: 'January 1–7, 2026', sampleSize: 374, harris: 30, newsom: 21, buttigieg: 8, aoc: 11, pritzker: 5, shapiro: 6, booker: 0, other: 19, margin: 'Harris +9' },
      { pollster: 'J.L. Partners', date: 'December 17–19, 2025', sampleSize: 383, harris: 30, newsom: 21, buttigieg: 7, aoc: 3, pritzker: 3, shapiro: 4, booker: 3, other: 29, margin: 'Harris +9' },
      { pollster: 'Echelon Insights', date: 'December 11–15, 2025', sampleSize: 498, harris: 22, newsom: 23, buttigieg: 11, aoc: 6, pritzker: 5, shapiro: 4, booker: 4, other: 25, margin: 'Newsom +1' },
      { pollster: 'McLaughlin & Associates', date: 'December 12–19, 2025', sampleSize: 460, harris: 27, newsom: 17, buttigieg: 8, aoc: 6, pritzker: 2, shapiro: 5, booker: 2, other: 33, margin: 'Harris +10' },
      { pollster: 'Big Data Poll', date: 'December 10–12, 2025', sampleSize: 1331, harris: 31, newsom: 20, buttigieg: 10, aoc: 6, pritzker: 0, shapiro: 6, booker: 0, other: 27, margin: 'Harris +11' },
      { pollster: 'Atlas Intel', date: 'December 15–19, 2025', sampleSize: 2315, harris: 8, newsom: 35, buttigieg: 15, aoc: 16, pritzker: 0, shapiro: 6, booker: 3, other: 17, margin: 'Newsom +27' },
      { pollster: 'Overton Insights', date: 'October 27–29, 2025', sampleSize: 1200, harris: 35, newsom: 23, buttigieg: 7, aoc: 7, pritzker: 5, shapiro: 3, booker: 5, other: 15, margin: 'Harris +12' },
      { pollster: 'Echelon Insights', date: 'November 13–17, 2025', sampleSize: 484, harris: 17, newsom: 29, buttigieg: 12, aoc: 6, pritzker: 2, shapiro: 3, booker: 4, other: 27, margin: 'Newsom +12' },
      { pollster: 'McLaughlin & Associates', date: 'November 17–24, 2025', sampleSize: 460, harris: 29, newsom: 20, buttigieg: 8, aoc: 6, pritzker: 3, shapiro: 4, booker: 3, other: 27, margin: 'Harris +9' },
      { pollster: 'Morning Consult', date: 'November 7–9, 2025', sampleSize: 984, harris: 29, newsom: 20, buttigieg: 8, aoc: 7, pritzker: 0, shapiro: 0, booker: 0, other: 36, margin: 'Harris +9' },
      { pollster: 'YouGov', date: 'November 6–9, 2025', sampleSize: 2172, harris: 21, newsom: 19, buttigieg: 10, aoc: 6, pritzker: 2, shapiro: 3, booker: 4, other: 35, margin: 'Harris +2' },
      { pollster: 'Emerson College', date: 'November 3–4, 2025', sampleSize: 417, harris: 10, newsom: 25, buttigieg: 9, aoc: 3, pritzker: 2, shapiro: 3, booker: 1, other: 47, margin: 'Newsom +15' },
      { pollster: 'Noble Predictive Insights', date: 'October 2–6, 2025', sampleSize: 2565, harris: 33, newsom: 21, buttigieg: 7, aoc: 8, pritzker: 4, shapiro: 4, booker: 0, other: 23, margin: 'Harris +12' },
      { pollster: 'Yale Youth Poll', date: 'October 29 – November 11, 2025', sampleSize: 3426, harris: 18, newsom: 25, buttigieg: 14, aoc: 16, pritzker: 0, shapiro: 4, booker: 0, other: 23, margin: 'Newsom +7' },
      { pollster: 'Echelon Insights', date: 'October 16–20, 2025', sampleSize: 512, harris: 24, newsom: 15, buttigieg: 10, aoc: 4, pritzker: 4, shapiro: 5, booker: 5, other: 33, margin: 'Harris +9' },
      { pollster: 'McLaughlin & Associates', date: 'October 21–27, 2025', sampleSize: 437, harris: 25, newsom: 22, buttigieg: 6, aoc: 4, pritzker: 4, shapiro: 6, booker: 3, other: 30, margin: 'Harris +3' },
      { pollster: 'Leger360', date: 'September 26–29, 2025', sampleSize: 341, harris: 24, newsom: 19, buttigieg: 9, aoc: 9, pritzker: 6, shapiro: 8, booker: 0, other: 25, margin: 'Harris +5' },
      { pollster: 'YouGov', date: 'September 5–8, 2025', sampleSize: 1114, harris: 19, newsom: 23, buttigieg: 6, aoc: 8, pritzker: 4, shapiro: 0, booker: 1, other: 39, margin: 'Newsom +4' },
      { pollster: 'YouGov/Yahoo', date: 'August 29 – September 2, 2025', sampleSize: 1690, harris: 19, newsom: 21, buttigieg: 10, aoc: 12, pritzker: 7, shapiro: 4, booker: 0, other: 27, margin: 'Newsom +2' },
      { pollster: 'Leger360', date: 'August 29–31, 2025', sampleSize: 328, harris: 30, newsom: 24, buttigieg: 8, aoc: 10, pritzker: 4, shapiro: 2, booker: 0, other: 22, margin: 'Harris +6' },
      { pollster: 'Echelon Insights', date: 'August 14–18, 2025', sampleSize: 552, harris: 26, newsom: 13, buttigieg: 11, aoc: 6, pritzker: 3, shapiro: 3, booker: 5, other: 33, margin: 'Harris +13' },
      { pollster: 'McLaughlin & Associates', date: 'August 21–26, 2025', sampleSize: 434, harris: 27, newsom: 18, buttigieg: 9, aoc: 4, pritzker: 2, shapiro: 3, booker: 3, other: 34, margin: 'Harris +9' },
      { pollster: 'Morning Consult', date: 'August 22–24, 2025', sampleSize: 0, harris: 29, newsom: 19, buttigieg: 9, aoc: 6, pritzker: 3, shapiro: 4, booker: 0, other: 30, margin: 'Harris +10' },
      { pollster: 'Emerson College', date: 'August 25–26, 2025', sampleSize: 387, harris: 11, newsom: 25, buttigieg: 16, aoc: 4, pritzker: 4, shapiro: 5, booker: 2, other: 33, margin: 'Newsom +14' },
      { pollster: 'Atlas Intel', date: 'September 12–16, 2025', sampleSize: 1066, harris: 21, newsom: 37, buttigieg: 12, aoc: 11, pritzker: 0, shapiro: 2, booker: 3, other: 14, margin: 'Newsom +16' },
      { pollster: 'Echelon Insights', date: 'July 10–14, 2025', sampleSize: 505, harris: 26, newsom: 10, buttigieg: 11, aoc: 6, pritzker: 2, shapiro: 4, booker: 7, other: 34, margin: 'Harris +16' },
      { pollster: 'McLaughlin & Associates', date: 'July 9–14, 2025', sampleSize: 444, harris: 25, newsom: 9, buttigieg: 8, aoc: 9, pritzker: 2, shapiro: 4, booker: 4, other: 39, margin: 'Harris +16' },
      { pollster: 'Morning Consult', date: 'June 13–15, 2025', sampleSize: 1000, harris: 34, newsom: 11, buttigieg: 7, aoc: 7, pritzker: 2, shapiro: 2, booker: 3, other: 34, margin: 'Harris +23' },
      { pollster: 'Emerson College', date: 'June 24–25, 2025', sampleSize: 404, harris: 13, newsom: 12, buttigieg: 16, aoc: 7, pritzker: 2, shapiro: 7, booker: 3, other: 40, margin: 'Harris +1' },
      { pollster: 'Overton Insights', date: 'June 23–26, 2025', sampleSize: 396, harris: 38, newsom: 10, buttigieg: 11, aoc: 7, pritzker: 0, shapiro: 7, booker: 4, other: 23, margin: 'Harris +28' },
      { pollster: 'Rasmussen Reports', date: 'June 25–26, 29, 2025', sampleSize: 1229, harris: 22, newsom: 12, buttigieg: 8, aoc: 6, pritzker: 0, shapiro: 12, booker: 6, other: 34, margin: 'Harris +10' },
      { pollster: 'McLaughlin & Associates', date: 'June 10–15, 2025', sampleSize: 434, harris: 30, newsom: 8, buttigieg: 10, aoc: 7, pritzker: 1, shapiro: 3, booker: 7, other: 34, margin: 'Harris +22' },
      { pollster: 'Atlas Intel', date: 'July 13–18, 2025', sampleSize: 1935, harris: 15, newsom: 16, buttigieg: 27, aoc: 19, pritzker: 0, shapiro: 3, booker: 4, other: 16, margin: 'Buttigieg +11' },
      { pollster: 'co/efficient', date: 'June 12–16, 2025', sampleSize: 1035, harris: 26, newsom: 21, buttigieg: 11, aoc: 14, pritzker: 0, shapiro: 3, booker: 0, other: 25, margin: 'Harris +5' },
      { pollster: 'Echelon Insights', date: 'May 8–12, 2025', sampleSize: 471, harris: 32, newsom: 5, buttigieg: 10, aoc: 8, pritzker: 5, shapiro: 2, booker: 6, other: 32, margin: 'Harris +27' },
      { pollster: 'Atlas Intel', date: 'May 21–27, 2025', sampleSize: 930, harris: 17, newsom: 7, buttigieg: 32, aoc: 19, pritzker: 0, shapiro: 5, booker: 10, other: 10, margin: 'Buttigieg +15' },
      { pollster: 'McLaughlin & Associates', date: 'May 21–26, 2025', sampleSize: 439, harris: 29, newsom: 4, buttigieg: 10, aoc: 9, pritzker: 2, shapiro: 6, booker: 7, other: 33, margin: 'Harris +20' },
      { pollster: 'Morning Consult', date: 'March 14–16, 2025', sampleSize: 0, harris: 36, newsom: 5, buttigieg: 10, aoc: 5, pritzker: 2, shapiro: 4, booker: 3, other: 35, margin: 'Harris +31' },
      { pollster: 'YouGov/Economist', date: 'March 30 – April 1, 2025', sampleSize: 650, harris: 25, newsom: 7, buttigieg: 10, aoc: 8, pritzker: 0, shapiro: 0, booker: 1, other: 49, margin: 'Harris +18' },
      { pollster: 'Echelon Insights', date: 'April 10–14, 2025', sampleSize: 1014, harris: 28, newsom: 4, buttigieg: 7, aoc: 7, pritzker: 3, shapiro: 3, booker: 11, other: 37, margin: 'Harris +24' },
      { pollster: 'Data For Progress', date: 'April 9–14, 2025', sampleSize: 745, harris: 18, newsom: 8, buttigieg: 14, aoc: 12, pritzker: 4, shapiro: 5, booker: 12, other: 27, margin: 'Harris +4' },
      { pollster: 'Quantus Insights', date: 'April 21–23, 2025', sampleSize: 1000, harris: 30, newsom: 7, buttigieg: 13, aoc: 14, pritzker: 0, shapiro: 5, booker: 13, other: 18, margin: 'Harris +17' },
      { pollster: 'YouGov/The Times', date: 'April 21–23, 2025', sampleSize: 1296, harris: 28, newsom: 7, buttigieg: 9, aoc: 7, pritzker: 3, shapiro: 4, booker: 7, other: 35, margin: 'Harris +21' },
      { pollster: 'McLaughlin & Associates', date: 'April 22–29, 2025', sampleSize: 442, harris: 30, newsom: 8, buttigieg: 6, aoc: 8, pritzker: 3, shapiro: 4, booker: 7, other: 34, margin: 'Harris +22' },
      { pollster: 'McLaughlin & Associates', date: 'February 11–18, 2025', sampleSize: 418, harris: 36, newsom: 4, buttigieg: 8, aoc: 3, pritzker: 2, shapiro: 3, booker: 0, other: 44, margin: 'Harris +32' },
      { pollster: 'Echelon Insights', date: 'February 10–13, 2025', sampleSize: 447, harris: 36, newsom: 6, buttigieg: 10, aoc: 5, pritzker: 2, shapiro: 3, booker: 2, other: 36, margin: 'Harris +30' },
      { pollster: 'McLaughlin & Associates', date: 'January 22–27, 2025', sampleSize: 414, harris: 33, newsom: 7, buttigieg: 9, aoc: 6, pritzker: 1, shapiro: 3, booker: 2, other: 39, margin: 'Harris +26' },
      { pollster: 'SurveyUSA', date: 'February 13–16, 2025', sampleSize: 835, harris: 37, newsom: 9, buttigieg: 11, aoc: 7, pritzker: 0, shapiro: 6, booker: 0, other: 30, margin: 'Harris +26' },
    ]
  },
  'north-carolina-senate': {
    chartData: [],
    polls: [
      { pollster: 'Public Policy Polling (D)', date: 'March 13–14, 2026', sampleSize: 556, whatley: 44, cooper: 47, other: 0, undecided: 9, margin: 'Cooper +3' },
      { pollster: 'Change Research (D)', date: 'January 31 – February 4, 2026', sampleSize: 1069, whatley: 40, cooper: 50, other: 4, undecided: 7, margin: 'Cooper +10' },
      { pollster: 'TIPP Insights (R)', date: 'January 12–15, 2026', sampleSize: 1512, whatley: 24, cooper: 48, other: 0, undecided: 27, margin: 'Cooper +24' },
    ]
  },
  'ohio-senate': {
    chartData: [],
    polls: [
      { pollster: 'Quantus Insights (R)', date: 'March 13–14, 2026', sampleSize: 784, husted: 46, brown: 44, other: 4, undecided: 6, margin: 'Husted +2' },
      { pollster: 'OnMessage Public Strategies (R)', date: 'March 3–8, 2026', sampleSize: 600, husted: 45, brown: 47, other: 0, undecided: 8, margin: 'Brown +2' },
      { pollster: 'EMC Research (D)', date: 'February 10–22, 2026', sampleSize: 1343, husted: 47, brown: 51, other: 0, undecided: 2, margin: 'Brown +4' },
    ]
  },
  'ohio-governor': {
    chartData: [],
    polls: [
      { pollster: 'Quantus Insights (R)', date: 'March 13–14, 2026', sampleSize: 809, ramaswamy: 45, acton: 46, other: 3, undecided: 6, margin: 'Acton +1' },
      { pollster: 'EMC Research (D)', date: 'February 10–22, 2026', sampleSize: 1343, ramaswamy: 43, acton: 53, other: 0, undecided: 4, margin: 'Acton +10' },
      { pollster: 'Emerson College', date: 'December 6–8, 2025', sampleSize: 850, ramaswamy: 45, acton: 46, other: 0, undecided: 9, margin: 'Acton +1' },
    ]
  },
  '2028-rep-primary': {
    chartData: [],
    polls: [
      { pollster: 'Echelon Insights', date: 'February 19–23, 2026', sampleSize: 429, vance: 37, trumpjr: 14, rubio: 11, cruz: 3, haley: 3, desantis: 8, rfk: 3, ramaswamy: 3, other: 11, undecided: 8, margin: 'Vance +23' },
      { pollster: 'Harvard Harris', date: 'February 25–26, 2026', sampleSize: 1999, vance: 43, trumpjr: 27, rubio: 14, cruz: 0, haley: 0, desantis: 8, rfk: 0, ramaswamy: 0, other: 8, undecided: 0, margin: 'Vance +16' },
      { pollster: 'Emerson College', date: 'February 21–22, 2026', sampleSize: 454, vance: 52, trumpjr: 0, rubio: 20, cruz: 1, haley: 3, desantis: 6, rfk: 4, ramaswamy: 0, other: 0, undecided: 11, margin: 'Vance +32' },
      { pollster: 'YouGov/BGSU', date: 'February 13–18, 2026', sampleSize: 1200, vance: 51, trumpjr: 8, rubio: 15, cruz: 2, haley: 2, desantis: 9, rfk: 2, ramaswamy: 0, other: 11, undecided: 0, margin: 'Vance +36' },
      { pollster: 'Focaldata', date: 'February 10, 2026', sampleSize: 1148, vance: 52, trumpjr: 14, rubio: 9, cruz: 3, haley: 3, desantis: 8, rfk: 6, ramaswamy: 4, other: 1, undecided: 0, margin: 'Vance +38' },
      { pollster: 'The Public Sentiment Institute', date: 'February 28, 2026', sampleSize: 130, vance: 39, trumpjr: 0, rubio: 15, cruz: 2, haley: 4, desantis: 4, rfk: 4, ramaswamy: 2, other: 9, undecided: 21, margin: 'Vance +24' },
      { pollster: 'Harvard Harris', date: 'January 28–29, 2026', sampleSize: 2000, vance: 53, trumpjr: 21, rubio: 17, cruz: 0, haley: 0, desantis: 0, rfk: 0, ramaswamy: 0, other: 9, undecided: 0, margin: 'Vance +32' },
      { pollster: 'I&I/TIPP', date: 'January 27–29, 2026', sampleSize: 478, vance: 43, trumpjr: 18, rubio: 5, cruz: 2, haley: 2, desantis: 5, rfk: 0, ramaswamy: 2, other: 4, undecided: 0, margin: 'Vance +25' },
      { pollster: 'Echelon Insights', date: 'January 22–26, 2026', sampleSize: 430, vance: 40, trumpjr: 12, rubio: 6, cruz: 1, haley: 5, desantis: 7, rfk: 4, ramaswamy: 3, other: 9, undecided: 11, margin: 'Vance +28' },
      { pollster: 'Big Data Poll', date: 'January 22–24, 2026', sampleSize: 1306, vance: 46, trumpjr: 0, rubio: 7, cruz: 4, haley: 5, desantis: 10, rfk: 7, ramaswamy: 0, other: 10, undecided: 11, margin: 'Vance +36' },
      { pollster: 'McLaughlin & Associates', date: 'January 21–27, 2026', sampleSize: 442, vance: 42, trumpjr: 16, rubio: 4, cruz: 0, haley: 4, desantis: 7, rfk: 0, ramaswamy: 2, other: 7, undecided: 16, margin: 'Vance +26' },
      { pollster: 'YouGov', date: 'January 9–14, 2026', sampleSize: 2250, vance: 41, trumpjr: 11, rubio: 7, cruz: 2, haley: 1, desantis: 8, rfk: 1, ramaswamy: 2, other: 9, undecided: 17, margin: 'Vance +30' },
      { pollster: 'Zogby Analytics', date: 'January 1–7, 2026', sampleSize: 340, vance: 58, trumpjr: 0, rubio: 8, cruz: 3, haley: 0, desantis: 9, rfk: 0, ramaswamy: 0, other: 9, undecided: 13, margin: 'Vance +50' },
      { pollster: 'Atlas Intel', date: 'December 15–19, 2025', sampleSize: 2315, vance: 47, trumpjr: 2, rubio: 23, cruz: 0, haley: 0, desantis: 13, rfk: 0, ramaswamy: 2, other: 13, undecided: 0, margin: 'Vance +24' },
      { pollster: 'McLaughlin & Associates', date: 'December 12–19, 2025', sampleSize: 433, vance: 34, trumpjr: 26, rubio: 6, cruz: 0, haley: 3, desantis: 7, rfk: 0, ramaswamy: 2, other: 9, undecided: 14, margin: 'Vance +8' },
      { pollster: 'Echelon Insights', date: 'December 11–15, 2025', sampleSize: 426, vance: 45, trumpjr: 12, rubio: 4, cruz: 3, haley: 4, desantis: 9, rfk: 3, ramaswamy: 2, other: 8, undecided: 9, margin: 'Vance +33' },
      { pollster: 'Big Data Poll', date: 'December 10–12, 2025', sampleSize: 1337, vance: 45, trumpjr: 0, rubio: 7, cruz: 5, haley: 5, desantis: 8, rfk: 6, ramaswamy: 0, other: 11, undecided: 14, margin: 'Vance +38' },
      { pollster: 'McLaughlin & Associates', date: 'November 17–24, 2025', sampleSize: 439, vance: 34, trumpjr: 24, rubio: 4, cruz: 0, haley: 6, desantis: 6, rfk: 0, ramaswamy: 3, other: 8, undecided: 15, margin: 'Vance +10' },
      { pollster: 'Echelon Insights', date: 'November 13–17, 2025', sampleSize: 472, vance: 47, trumpjr: 0, rubio: 8, cruz: 2, haley: 5, desantis: 10, rfk: 5, ramaswamy: 2, other: 4, undecided: 12, margin: 'Vance +39' },
      { pollster: 'Yale Youth Poll', date: 'October 29 – November 11, 2025', sampleSize: 3426, vance: 51, trumpjr: 8, rubio: 5, cruz: 0, haley: 5, desantis: 6, rfk: 3, ramaswamy: 0, other: 8, undecided: 14, margin: 'Vance +43' },
      { pollster: 'Morning Consult', date: 'November 7–9, 2025', sampleSize: 936, vance: 42, trumpjr: 19, rubio: 3, cruz: 0, haley: 5, desantis: 7, rfk: 3, ramaswamy: 3, other: 0, undecided: 18, margin: 'Vance +23' },
      { pollster: 'YouGov', date: 'November 6–9, 2025', sampleSize: 2172, vance: 42, trumpjr: 13, rubio: 5, cruz: 4, haley: 1, desantis: 7, rfk: 3, ramaswamy: 2, other: 5, undecided: 17, margin: 'Vance +29' },
      { pollster: 'Emerson College', date: 'November 3–4, 2025', sampleSize: 420, vance: 54, trumpjr: 0, rubio: 6, cruz: 0, haley: 0, desantis: 2, rfk: 0, ramaswamy: 0, other: 6, undecided: 25, margin: 'Vance +48' },
      { pollster: 'Overton Insights', date: 'October 27–29, 2025', sampleSize: 1200, vance: 34, trumpjr: 22, rubio: 7, cruz: 0, haley: 5, desantis: 12, rfk: 8, ramaswamy: 5, other: 0, undecided: 8, margin: 'Vance +12' },
      { pollster: 'McLaughlin & Associates', date: 'October 21–27, 2025', sampleSize: 458, vance: 38, trumpjr: 20, rubio: 7, cruz: 0, haley: 4, desantis: 5, rfk: 0, ramaswamy: 2, other: 10, undecided: 14, margin: 'Vance +18' },
      { pollster: 'Echelon Insights', date: 'October 16–20, 2025', sampleSize: 400, vance: 46, trumpjr: 0, rubio: 6, cruz: 2, haley: 6, desantis: 10, rfk: 5, ramaswamy: 3, other: 4, undecided: 15, margin: 'Vance +40' },
      { pollster: 'J.L. Partners', date: 'October 14–15, 2025', sampleSize: 1000, vance: 40, trumpjr: 0, rubio: 8, cruz: 4, haley: 5, desantis: 7, rfk: 0, ramaswamy: 3, other: 7, undecided: 20, margin: 'Vance +32' },
      { pollster: 'Noble Predictive Insights', date: 'October 2–6, 2025', sampleSize: 1156, vance: 38, trumpjr: 25, rubio: 4, cruz: 3, haley: 3, desantis: 6, rfk: 0, ramaswamy: 0, other: 6, undecided: 15, margin: 'Vance +13' },
      { pollster: 'Leger360', date: 'September 26–29, 2025', sampleSize: 294, vance: 50, trumpjr: 0, rubio: 6, cruz: 6, haley: 0, desantis: 0, rfk: 0, ramaswamy: 0, other: 20, undecided: 18, margin: 'Vance +44' },
      { pollster: 'McLaughlin & Associates', date: 'September 17–22, 2025', sampleSize: 470, vance: 42, trumpjr: 14, rubio: 5, cruz: 0, haley: 3, desantis: 8, rfk: 0, ramaswamy: 2, other: 7, undecided: 19, margin: 'Vance +28' },
      { pollster: 'Echelon Insights', date: 'September 18–22, 2025', sampleSize: 467, vance: 43, trumpjr: 0, rubio: 5, cruz: 2, haley: 4, desantis: 8, rfk: 6, ramaswamy: 3, other: 11, undecided: 18, margin: 'Vance +38' },
      { pollster: 'Atlas Intel', date: 'September 12–16, 2025', sampleSize: 1066, vance: 55, trumpjr: 1, rubio: 12, cruz: 0, haley: 0, desantis: 16, rfk: 0, ramaswamy: 6, other: 10, undecided: 0, margin: 'Vance +39' },
      { pollster: 'YouGov', date: 'September 5–8, 2025', sampleSize: 1114, vance: 44, trumpjr: 10, rubio: 4, cruz: 2, haley: 3, desantis: 8, rfk: 1, ramaswamy: 2, other: 6, undecided: 20, margin: 'Vance +34' },
      { pollster: 'Leger360', date: 'August 29–31, 2025', sampleSize: 308, vance: 50, trumpjr: 0, rubio: 9, cruz: 8, haley: 0, desantis: 0, rfk: 0, ramaswamy: 0, other: 19, undecided: 14, margin: 'Vance +41' },
      { pollster: 'McLaughlin & Associates', date: 'August 21–26, 2025', sampleSize: 457, vance: 36, trumpjr: 16, rubio: 4, cruz: 0, haley: 3, desantis: 10, rfk: 0, ramaswamy: 2, other: 11, undecided: 18, margin: 'Vance +20' },
      { pollster: 'Emerson College', date: 'August 25–26, 2025', sampleSize: 410, vance: 52, trumpjr: 0, rubio: 9, cruz: 2, haley: 4, desantis: 7, rfk: 5, ramaswamy: 3, other: 7, undecided: 11, margin: 'Vance +43' },
      { pollster: 'Echelon Insights', date: 'August 14–18, 2025', sampleSize: 441, vance: 43, trumpjr: 0, rubio: 6, cruz: 2, haley: 4, desantis: 9, rfk: 9, ramaswamy: 2, other: 10, undecided: 15, margin: 'Vance +37' },
      { pollster: 'Atlas Intel', date: 'July 13–18, 2025', sampleSize: 1935, vance: 58, trumpjr: 5, rubio: 10, cruz: 0, haley: 0, desantis: 13, rfk: 0, ramaswamy: 2, other: 12, undecided: 0, margin: 'Vance +45' },
      { pollster: 'Echelon Insights', date: 'July 10–14, 2025', sampleSize: 463, vance: 42, trumpjr: 0, rubio: 7, cruz: 3, haley: 6, desantis: 9, rfk: 5, ramaswamy: 4, other: 8, undecided: 16, margin: 'Vance +35' },
      { pollster: 'McLaughlin & Associates', date: 'July 9–14, 2025', sampleSize: 459, vance: 31, trumpjr: 19, rubio: 4, cruz: 0, haley: 4, desantis: 8, rfk: 0, ramaswamy: 3, other: 10, undecided: 21, margin: 'Vance +12' },
      { pollster: 'Overton Insights', date: 'June 23–26, 2025', sampleSize: 444, vance: 32, trumpjr: 26, rubio: 9, cruz: 0, haley: 7, desantis: 11, rfk: 4, ramaswamy: 3, other: 0, undecided: 9, margin: 'Vance +6' },
      { pollster: 'Emerson College', date: 'June 24–25, 2025', sampleSize: 416, vance: 46, trumpjr: 0, rubio: 12, cruz: 0, haley: 2, desantis: 9, rfk: 5, ramaswamy: 1, other: 9, undecided: 17, margin: 'Vance +34' },
      { pollster: 'McLaughlin & Associates', date: 'June 10–15, 2025', sampleSize: 455, vance: 36, trumpjr: 14, rubio: 4, cruz: 0, haley: 4, desantis: 6, rfk: 0, ramaswamy: 2, other: 10, undecided: 24, margin: 'Vance +22' },
      { pollster: 'Atlas Intel', date: 'May 21–27, 2025', sampleSize: 1044, vance: 37, trumpjr: 9, rubio: 19, cruz: 0, haley: 0, desantis: 8, rfk: 0, ramaswamy: 5, other: 22, undecided: 0, margin: 'Vance +18' },
      { pollster: 'McLaughlin & Associates', date: 'May 21–26, 2025', sampleSize: 457, vance: 34, trumpjr: 19, rubio: 5, cruz: 0, haley: 4, desantis: 5, rfk: 0, ramaswamy: 1, other: 10, undecided: 22, margin: 'Vance +15' },
      { pollster: 'Echelon Insights', date: 'May 8–12, 2025', sampleSize: 426, vance: 44, trumpjr: 0, rubio: 4, cruz: 4, haley: 8, desantis: 7, rfk: 6, ramaswamy: 5, other: 9, undecided: 13, margin: 'Vance +36' },
      { pollster: 'McLaughlin & Associates', date: 'April 22–29, 2025', sampleSize: 456, vance: 43, trumpjr: 14, rubio: 2, cruz: 0, haley: 5, desantis: 6, rfk: 0, ramaswamy: 2, other: 9, undecided: 19, margin: 'Vance +29' },
      { pollster: 'J.L. Partners', date: 'April 23–28, 2025', sampleSize: 1006, vance: 48, trumpjr: 0, rubio: 5, cruz: 4, haley: 5, desantis: 8, rfk: 0, ramaswamy: 3, other: 12, undecided: 14, margin: 'Vance +40' },
      { pollster: 'YouGov/The Times', date: 'April 21–23, 2025', sampleSize: 1296, vance: 31, trumpjr: 5, rubio: 2, cruz: 3, haley: 2, desantis: 6, rfk: 5, ramaswamy: 4, other: 26, undecided: 20, margin: 'Vance +25' },
      { pollster: 'Echelon Insights', date: 'April 10–14, 2025', sampleSize: 1014, vance: 47, trumpjr: 0, rubio: 4, cruz: 1, haley: 4, desantis: 9, rfk: 7, ramaswamy: 5, other: 7, undecided: 16, margin: 'Vance +38' },
      { pollster: 'Atlas Intel', date: 'April 10–14, 2025', sampleSize: 2347, vance: 60, trumpjr: 0, rubio: 9, cruz: 0, haley: 0, desantis: 9, rfk: 0, ramaswamy: 1, other: 15, undecided: 6, margin: 'Vance +51' },
      { pollster: 'YouGov/Economist', date: 'March 30 – April 1, 2025', sampleSize: 594, vance: 43, trumpjr: 11, rubio: 4, cruz: 2, haley: 3, desantis: 8, rfk: 2, ramaswamy: 3, other: 4, undecided: 20, margin: 'Vance +32' },
      { pollster: 'Overton Insights', date: 'March 24–28, 2025', sampleSize: 536, vance: 36, trumpjr: 31, rubio: 6, cruz: 0, haley: 0, desantis: 13, rfk: 0, ramaswamy: 6, other: 7, undecided: 0, margin: 'Vance +5' },
      { pollster: 'Echelon Insights', date: 'March 10–13, 2025', sampleSize: 450, vance: 46, trumpjr: 0, rubio: 4, cruz: 5, haley: 7, desantis: 7, rfk: 7, ramaswamy: 3, other: 5, undecided: 16, margin: 'Vance +39' },
      { pollster: 'McLaughlin & Associates', date: 'February 11–18, 2025', sampleSize: 468, vance: 37, trumpjr: 17, rubio: 3, cruz: 0, haley: 3, desantis: 6, rfk: 0, ramaswamy: 4, other: 10, undecided: 22, margin: 'Vance +20' },
      { pollster: 'Echelon Insights', date: 'February 10–13, 2025', sampleSize: 466, vance: 39, trumpjr: 0, rubio: 4, cruz: 4, haley: 8, desantis: 10, rfk: 0, ramaswamy: 5, other: 10, undecided: 20, margin: 'Vance +29' },
      { pollster: 'McLaughlin & Associates', date: 'January 22–27, 2025', sampleSize: 453, vance: 27, trumpjr: 21, rubio: 3, cruz: 0, haley: 2, desantis: 8, rfk: 0, ramaswamy: 3, other: 11, undecided: 24, margin: 'Vance +6' },
    ]
  },
  'south-carolina-gop-governor': {
    chartData: [
      { date: '2025-03-09', mace: 29.3, wilson: 27.2, evette: 31.4, norman: 11.6 },
      { date: '2025-07-20', mace: 17.95, wilson: 18.2, evette: 8.75, norman: 7.1 },
      { date: '2025-10-12', mace: 16.33, wilson: 12, evette: 17.67, norman: 8.67 },
      { date: '2025-11-25', mace: 11, wilson: 22, evette: 16, norman: 12 },
      { date: '2026-01-16', mace: 20.4, wilson: 19.85, evette: 18.2, norman: 10.85 },
      { date: '2026-02-04', mace: 17.85, wilson: 18, evette: 14.4, norman: 11.75 },
      { date: '2026-03-11', mace: 22.1, wilson: 22.3, evette: 16.2, norman: 11.6 }
    ],
    polls: [
      { pollster: 'co/efficient (R)', date: 'March 12-13, 2026', sampleSize: 810, evette: 21, kimbrell: 1, mace: 22, norman: 8, wilson: 19, other: 0, undecided: 29, margin: 'Mace +1' },
      { pollster: 'Stratus Intelligence (R)', date: 'March 9-11, 2026', sampleSize: 600, evette: 15, kimbrell: 0, mace: 24, norman: 14, wilson: 18, other: 0, undecided: 29, margin: 'Mace +6' },
      { pollster: 'Quantus Insights (R)', date: 'March 10–11, 2026', sampleSize: 806, evette: 16, kimbrell: 3, mace: 22, norman: 11, wilson: 22, other: 0, undecided: 26, margin: 'Tie' },
      { pollster: 'National Public Affairs (R)', date: 'February 2–5, 2026', sampleSize: 800, evette: 16, kimbrell: 2, mace: 17, norman: 12, wilson: 23, other: 0, undecided: 30, margin: 'Wilson +6' },
      { pollster: 'Targoz Market Research/South Carolina Policy Council', date: 'January 24 – February 1, 2026', sampleSize: 540, evette: 12, kimbrell: 4, mace: 18, norman: 11, wilson: 12, other: 0, undecided: 43, margin: 'Mace +6' },
      { pollster: 'Trafalgar Group (R)', date: 'January 15–16, 2026', sampleSize: 1076, evette: 22, kimbrell: 2, mace: 17, norman: 10, wilson: 20, other: 0, undecided: 29, margin: 'Evette +2' },
      { pollster: 'Stratus Intelligence (R)', date: 'January 7–9, 2026', sampleSize: 700, evette: 14, kimbrell: 0, mace: 23, norman: 11, wilson: 19, other: 0, undecided: 32, margin: 'Mace +4' },
      { pollster: 'Wick', date: 'December 16–19, 2025', sampleSize: 800, evette: 17, kimbrell: 2, mace: 13, norman: 13, wilson: 23, other: 0, undecided: 33, margin: 'Wilson +6' },
      { pollster: 'Wick', date: 'November 24–26, 2025', sampleSize: 600, evette: 16, kimbrell: 2, mace: 11, norman: 12, wilson: 22, other: 0, undecided: 38, margin: 'Wilson +6' },
      { pollster: 'Winthrop University', date: 'October 2–19, 2025', sampleSize: 1331, evette: 16, kimbrell: 3, mace: 17, norman: 8, wilson: 8, other: 1, undecided: 47, margin: 'Mace +1' },
      { pollster: 'Quantus Insights (R)', date: 'October 1–4, 2025', sampleSize: 600, evette: 17, kimbrell: 5, mace: 16, norman: 11, wilson: 16, other: 0, undecided: 35, margin: 'Evette +1' },
      { pollster: 'Trafalgar Group (R)', date: 'September 30 – October 2, 2025', sampleSize: 1094, evette: 20, kimbrell: 1, mace: 16, norman: 9, wilson: 12, other: 0, undecided: 41, margin: 'Evette +4' },
      { pollster: 'co/efficient (R)', date: 'September 18–19, 2025', sampleSize: 1094, evette: 18, kimbrell: 2, mace: 19, norman: 10, wilson: 16, other: 0, undecided: 35, margin: 'Mace +1' },
      { pollster: 'Meeting Street Insights (R)', date: 'August 11–12, 2025', sampleSize: 600, evette: 6, kimbrell: 3, mace: 25, norman: 10, wilson: 17, other: 0, undecided: 38, margin: 'Mace +8' },
      { pollster: 'Targoz Market Research/South Carolina Policy Council', date: 'July 21–25, 2025', sampleSize: 1200, evette: 8, kimbrell: 3, mace: 16, norman: 6, wilson: 15, other: 0, undecided: 52, margin: 'Mace +1' },
      { pollster: 'yes. every kid. (D)', date: 'July 18–21, 2025', sampleSize: 406, evette: 9, kimbrell: 3, mace: 19, norman: 8, wilson: 20, other: 2, undecided: 37, margin: 'Wilson +1' },
      { pollster: 'First Tuesday Strategies (R)', date: 'March 19–21, 2025', sampleSize: 500, evette: 7, kimbrell: 2, mace: 16, norman: 6, wilson: 21, other: 1, undecided: 47, margin: 'Wilson +5' },
      { pollster: 'Trafalgar Group (R)', date: 'March 8–10, 2025', sampleSize: 1127, evette: 31, kimbrell: 0, mace: 29, norman: 11, wilson: 27, other: 0, undecided: 2, margin: 'Evette +2' }
    ]
  }
};

function computePillInfo(type, polls) {
  const config = pollConfigs[type];
  if (!config || !polls || polls.length === 0) return { margin: null, marginColor: '#ffffff', leader: '' };
  const now = new Date();
  const sorted = [...config.candidates].sort((a, b) => {
    const avgA = weightedAvg(polls, a.key, now) ?? -1;
    const avgB = weightedAvg(polls, b.key, now) ?? -1;
    return avgB - avgA;
  });
  const avg0 = weightedAvg(polls, sorted[0].key, now);
  const avg1 = sorted.length > 1 ? weightedAvg(polls, sorted[1].key, now) : null;
  const margin = (avg0 != null && avg1 != null) ? avg0 - avg1 : null;
  return { leader: sorted[0].name, margin, marginColor: sorted[0].color };
}

export default function Polling() {
  const [selectedPoll, setSelectedPoll] = useState('generic-congressional-ballot');
  const [randomPoll, setRandomPoll] = useState(null);
  const currentData = mockPollingData[selectedPoll] || { chartData: [], polls: [] };
  const currentPolls = currentData?.polls || [];

  useEffect(() => {
    setRandomPoll(randomPollOptions[Math.floor(Math.random() * randomPollOptions.length)].value);
    const interval = setInterval(() => {
      setRandomPoll(randomPollOptions[Math.floor(Math.random() * randomPollOptions.length)].value);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const pillInfos = useMemo(() => ({
    'generic-congressional-ballot': computePillInfo('generic-congressional-ballot', mockPollingData['generic-congressional-ballot']?.polls),
    '2028-dem-primary': computePillInfo('2028-dem-primary', mockPollingData['2028-dem-primary']?.polls),
    '2028-rep-primary': computePillInfo('2028-rep-primary', mockPollingData['2028-rep-primary']?.polls),
    ...(randomPoll ? { [randomPoll]: computePillInfo(randomPoll, mockPollingData[randomPoll]?.polls) } : {}),
  }), [randomPoll]);

  return (
    <div 
      className="min-h-[calc(100vh-4rem)] px-4 py-16 sm:py-24 bg-black"
      style={{
        backgroundImage: 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b6f149a83e2b792ef60e35/ec271415e_Screenshot2026-03-16at44509PM.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white font-inter font-bold text-3xl sm:text-4xl text-center mb-8 text-shadow-teal"
        >
          Polling Averages
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-start gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <PollSelector options={pollingOptions} value={selectedPoll} onChange={setSelectedPoll} />
            </div>
            <div className="flex gap-3 flex-wrap">
              {[
                { value: 'generic-congressional-ballot', label: 'Generic Congressional Ballot' },
                { value: '2028-dem-primary', label: '2028 Democratic Primary' },
                { value: '2028-rep-primary', label: '2028 Republican Primary' },
                ...(randomPoll ? [randomPollOptions.find(p => p.value === randomPoll)] : []),
              ].map(pill => {
                const info = pillInfos[pill.value];
                const marginText = info?.margin != null ? `${info.leader} +${info.margin.toFixed(1)}%` : '';
                return (
                <button
                  key={pill.value}
                  onClick={() => setSelectedPoll(pill.value)}
                  className={`rounded-2xl px-4 py-3 font-inter font-semibold text-sm transition-all border text-left ${
                    selectedPoll === pill.value
                      ? 'bg-white/25 text-white border-white/60'
                      : 'bg-white/10 text-white/80 border-white/20 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  <div>{pill.label}</div>
                  {marginText && <div className="text-xs font-bold mt-0.5" style={{ color: info.marginColor }}>{marginText}</div>}
                </button>
              )})}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <PollingChart polls={currentPolls} type={selectedPoll} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8"
        >
          <PollingAverageTable polls={currentPolls} type={selectedPoll} />
          <div className="mt-8">
            <PollingTable polls={currentData.polls} type={selectedPoll} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}