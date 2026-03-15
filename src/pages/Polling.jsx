import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PollingChart from '../components/polling/PollingChart';
import PollingTable from '../components/polling/PollingTable';

const pollingOptions = [
  { value: '2026-senate-generic', label: 'Texas Republican Senate Runoff' },
  { value: 'illinois-dem-primary', label: 'Illinois Democratic Senate Primary' },
  { value: 'illinois-9th-house', label: 'Illinois 9th Democratic House Primary' },
  { value: 'florida-gop-governor', label: 'Florida Republican Governor Primary' }
];

const mockPollingData = {
  '2026-senate-generic': {
    chartData: [
      { date: '2025-01-04', cornyn: 34, paxton: 42, cornyinMin: 31, cornyinMax: 37, paxtonMin: 39, paxtonMax: 45 },
      { date: '2025-01-05', cornyn: 34, paxton: 42, cornyinMin: 31, cornyinMax: 37, paxtonMin: 39, paxtonMax: 45 },
      { date: '2025-01-06', cornyn: 34, paxton: 42, cornyinMin: 31, cornyinMax: 37, paxtonMin: 39, paxtonMax: 45 },
      { date: '2025-01-31', cornyn: 34, paxton: 42, cornyinMin: 31, cornyinMax: 37, paxtonMin: 39, paxtonMax: 45 },
      { date: '2025-02-01', cornyn: 34, paxton: 42, cornyinMin: 31, cornyinMax: 37, paxtonMin: 39, paxtonMax: 45 },
      { date: '2025-02-02', cornyn: 34, paxton: 42, cornyinMin: 31, cornyinMax: 37, paxtonMin: 39, paxtonMax: 45 },
      { date: '2025-02-09', cornyn: 38, paxton: 50, cornyinMin: 35, cornyinMax: 41, paxtonMin: 47, paxtonMax: 53 },
      { date: '2025-02-10', cornyn: 38, paxton: 50, cornyinMin: 35, cornyinMax: 41, paxtonMin: 47, paxtonMax: 53 },
      { date: '2025-03-07', cornyn: 27, paxton: 38, cornyinMin: 24, cornyinMax: 30, paxtonMin: 35, paxtonMax: 41 },
      { date: '2025-03-08', cornyn: 27, paxton: 38, cornyinMin: 24, cornyinMax: 30, paxtonMin: 35, paxtonMax: 41 },
      { date: '2025-03-23', cornyn: 27, paxton: 38, cornyinMin: 24, cornyinMax: 30, paxtonMin: 35, paxtonMax: 41 },
      { date: '2025-03-24', cornyn: 27, paxton: 38, cornyinMin: 24, cornyinMax: 30, paxtonMin: 35, paxtonMax: 41 },
      { date: '2025-03-25', cornyn: 35, paxton: 52, cornyinMin: 32, cornyinMax: 38, paxtonMin: 49, paxtonMax: 55 },
      { date: '2025-04-15', cornyn: 35, paxton: 52, cornyinMin: 32, cornyinMax: 38, paxtonMin: 49, paxtonMax: 55 },
      { date: '2025-04-16', cornyn: 35, paxton: 52, cornyinMin: 32, cornyinMax: 38, paxtonMin: 49, paxtonMax: 55 },
      { date: '2025-04-17', cornyn: 33, paxton: 50, cornyinMin: 30, cornyinMax: 36, paxtonMin: 47, paxtonMax: 53 },
      { date: '2025-04-27', cornyn: 33, paxton: 50, cornyinMin: 30, cornyinMax: 36, paxtonMin: 47, paxtonMax: 53 },
      { date: '2025-04-28', cornyn: 33, paxton: 50, cornyinMin: 30, cornyinMax: 36, paxtonMin: 47, paxtonMax: 53 },
      { date: '2025-04-29', cornyn: 33, paxton: 48, cornyinMin: 30, cornyinMax: 36, paxtonMin: 45, paxtonMax: 51 },
      { date: '2025-04-30', cornyn: 33, paxton: 48, cornyinMin: 30, cornyinMax: 36, paxtonMin: 45, paxtonMax: 51 },
      { date: '2025-05-01', cornyn: 37, paxton: 54, cornyinMin: 34, cornyinMax: 40, paxtonMin: 51, paxtonMax: 57 },
      { date: '2025-05-09', cornyn: 37, paxton: 54, cornyinMin: 34, cornyinMax: 40, paxtonMin: 51, paxtonMax: 57 },
      { date: '2025-05-10', cornyn: 37, paxton: 54, cornyinMin: 34, cornyinMax: 40, paxtonMin: 51, paxtonMax: 57 },
      { date: '2025-05-11', cornyn: 39, paxton: 52, cornyinMin: 36, cornyinMax: 42, paxtonMin: 49, paxtonMax: 55 },
      { date: '2025-05-12', cornyn: 39, paxton: 52, cornyinMin: 36, cornyinMax: 42, paxtonMin: 49, paxtonMax: 55 },
      { date: '2025-05-13', cornyn: 39, paxton: 52, cornyinMin: 36, cornyinMax: 42, paxtonMin: 49, paxtonMax: 55 },
      { date: '2025-05-27', cornyn: 39, paxton: 52, cornyinMin: 36, cornyinMax: 42, paxtonMin: 49, paxtonMax: 55 },
      { date: '2025-05-28', cornyn: 28, paxton: 50, cornyinMin: 25, cornyinMax: 31, paxtonMin: 47, paxtonMax: 53 },
      { date: '2025-06-06', cornyn: 28, paxton: 50, cornyinMin: 25, cornyinMax: 31, paxtonMin: 47, paxtonMax: 53 },
      { date: '2025-06-07', cornyn: 28, paxton: 50, cornyinMin: 25, cornyinMax: 31, paxtonMin: 47, paxtonMax: 53 },
      { date: '2025-06-08', cornyn: 33, paxton: 49, cornyinMin: 30, cornyinMax: 36, paxtonMin: 46, paxtonMax: 52 },
      { date: '2025-06-09', cornyn: 33, paxton: 49, cornyinMin: 30, cornyinMax: 36, paxtonMin: 46, paxtonMax: 52 },
      { date: '2025-06-10', cornyn: 33, paxton: 49, cornyinMin: 30, cornyinMax: 36, paxtonMin: 46, paxtonMax: 52 },
      { date: '2025-06-17', cornyn: 33, paxton: 49, cornyinMin: 30, cornyinMax: 36, paxtonMin: 46, paxtonMax: 52 },
      { date: '2025-06-18', cornyn: 33, paxton: 49, cornyinMin: 30, cornyinMax: 36, paxtonMin: 46, paxtonMax: 52 },
      { date: '2025-06-19', cornyn: 33, paxton: 49, cornyinMin: 30, cornyinMax: 36, paxtonMin: 46, paxtonMax: 52 },
      { date: '2025-06-20', cornyn: 33, paxton: 49, cornyinMin: 30, cornyinMax: 36, paxtonMin: 46, paxtonMax: 52 },
      { date: '2025-06-21', cornyn: 33, paxton: 49, cornyinMin: 30, cornyinMax: 36, paxtonMin: 46, paxtonMax: 52 },
      { date: '2025-06-22', cornyn: 38, paxton: 57, cornyinMin: 35, cornyinMax: 41, paxtonMin: 54, paxtonMax: 60 },
      { date: '2025-07-16', cornyn: 38, paxton: 57, cornyinMin: 35, cornyinMax: 41, paxtonMin: 54, paxtonMax: 60 },
      { date: '2025-07-17', cornyn: 38, paxton: 57, cornyinMin: 35, cornyinMax: 41, paxtonMin: 54, paxtonMax: 60 },
      { date: '2025-07-18', cornyn: 36, paxton: 47, cornyinMin: 33, cornyinMax: 39, paxtonMin: 44, paxtonMax: 50 },
      { date: '2025-08-04', cornyn: 36, paxton: 47, cornyinMin: 33, cornyinMax: 39, paxtonMin: 44, paxtonMax: 50 },
      { date: '2025-08-05', cornyn: 36, paxton: 47, cornyinMin: 33, cornyinMax: 39, paxtonMin: 44, paxtonMax: 50 },
      { date: '2025-08-06', cornyn: 42, paxton: 45, cornyinMin: 39, cornyinMax: 45, paxtonMin: 42, paxtonMax: 48 },
      { date: '2025-08-07', cornyn: 42, paxton: 45, cornyinMin: 39, cornyinMax: 45, paxtonMin: 42, paxtonMax: 48 },
      { date: '2025-08-08', cornyn: 42, paxton: 45, cornyinMin: 39, cornyinMax: 45, paxtonMin: 42, paxtonMax: 48 },
      { date: '2025-08-09', cornyn: 42, paxton: 45, cornyinMin: 39, cornyinMax: 45, paxtonMin: 42, paxtonMax: 48 },
      { date: '2025-08-10', cornyn: 42, paxton: 45, cornyinMin: 39, cornyinMax: 45, paxtonMin: 42, paxtonMax: 48 },
      { date: '2025-08-11', cornyn: 30, paxton: 29, cornyinMin: 27, cornyinMax: 33, paxtonMin: 26, paxtonMax: 32 },
      { date: '2025-08-12', cornyn: 30, paxton: 29, cornyinMin: 27, cornyinMax: 33, paxtonMin: 26, paxtonMax: 32 },
      { date: '2025-08-21', cornyn: 30, paxton: 29, cornyinMin: 27, cornyinMax: 33, paxtonMin: 26, paxtonMax: 32 },
      { date: '2025-08-22', cornyn: 30, paxton: 29, cornyinMin: 27, cornyinMax: 33, paxtonMin: 26, paxtonMax: 32 },
      { date: '2025-08-23', cornyn: 30, paxton: 29, cornyinMin: 27, cornyinMax: 33, paxtonMin: 26, paxtonMax: 32 },
      { date: '2025-08-24', cornyn: 37, paxton: 42, cornyinMin: 34, cornyinMax: 40, paxtonMin: 39, paxtonMax: 45 },
      { date: '2025-08-25', cornyn: 37, paxton: 42, cornyinMin: 34, cornyinMax: 40, paxtonMin: 39, paxtonMax: 45 },
      { date: '2025-08-26', cornyn: 41, paxton: 48, cornyinMin: 38, cornyinMax: 44, paxtonMin: 45, paxtonMax: 51 },
      { date: '2025-08-27', cornyn: 41, paxton: 48, cornyinMin: 38, cornyinMax: 44, paxtonMin: 45, paxtonMax: 51 },
      { date: '2025-08-28', cornyn: 41, paxton: 48, cornyinMin: 38, cornyinMax: 44, paxtonMin: 45, paxtonMax: 51 },
      { date: '2025-08-29', cornyn: 32, paxton: 26, cornyinMin: 29, cornyinMax: 35, paxtonMin: 23, paxtonMax: 29 },
      { date: '2025-09-14', cornyn: 32, paxton: 26, cornyinMin: 29, cornyinMax: 35, paxtonMin: 23, paxtonMax: 29 },
      { date: '2025-09-15', cornyn: 32, paxton: 26, cornyinMin: 29, cornyinMax: 35, paxtonMin: 23, paxtonMax: 29 },
      { date: '2025-09-16', cornyn: 44, paxton: 44, cornyinMin: 41, cornyinMax: 47, paxtonMin: 41, paxtonMax: 47 },
      { date: '2025-09-17', cornyn: 44, paxton: 44, cornyinMin: 41, cornyinMax: 47, paxtonMin: 41, paxtonMax: 47 },
      { date: '2025-09-18', cornyn: 44, paxton: 44, cornyinMin: 41, cornyinMax: 47, paxtonMin: 41, paxtonMax: 47 },
      { date: '2025-09-19', cornyn: 44, paxton: 44, cornyinMin: 41, cornyinMax: 47, paxtonMin: 41, paxtonMax: 47 },
      { date: '2025-09-20', cornyn: 39, paxton: 39, cornyinMin: 36, cornyinMax: 42, paxtonMin: 36, paxtonMax: 42 },
      { date: '2025-09-21', cornyn: 39, paxton: 39, cornyinMin: 36, cornyinMax: 42, paxtonMin: 36, paxtonMax: 42 },
      { date: '2025-09-22', cornyn: 39, paxton: 39, cornyinMin: 36, cornyinMax: 42, paxtonMin: 36, paxtonMax: 42 },
      { date: '2025-09-23', cornyn: 39, paxton: 39, cornyinMin: 36, cornyinMax: 42, paxtonMin: 36, paxtonMax: 42 },
      { date: '2025-09-24', cornyn: 39, paxton: 37, cornyinMin: 36, cornyinMax: 42, paxtonMin: 34, paxtonMax: 40 },
      { date: '2025-10-01', cornyn: 39, paxton: 37, cornyinMin: 36, cornyinMax: 42, paxtonMin: 34, paxtonMax: 40 },
      { date: '2025-10-04', cornyn: 39, paxton: 37, cornyinMin: 36, cornyinMax: 42, paxtonMin: 34, paxtonMax: 40 },
      { date: '2025-10-05', cornyn: 39, paxton: 37, cornyinMin: 36, cornyinMax: 42, paxtonMin: 34, paxtonMax: 40 },
      { date: '2025-10-06', cornyn: 43, paxton: 46, cornyinMin: 40, cornyinMax: 46, paxtonMin: 43, paxtonMax: 49 },
      { date: '2025-10-28', cornyn: 43, paxton: 46, cornyinMin: 40, cornyinMax: 46, paxtonMin: 43, paxtonMax: 49 },
      { date: '2025-10-29', cornyn: 43, paxton: 46, cornyinMin: 40, cornyinMax: 46, paxtonMin: 43, paxtonMax: 49 },
      { date: '2025-10-30', cornyn: 36, paxton: 39, cornyinMin: 33, cornyinMax: 39, paxtonMin: 36, paxtonMax: 42 },
      { date: '2025-11-04', cornyn: 36, paxton: 39, cornyinMin: 33, cornyinMax: 39, paxtonMin: 36, paxtonMax: 42 },
      { date: '2025-11-05', cornyn: 36, paxton: 39, cornyinMin: 33, cornyinMax: 39, paxtonMin: 36, paxtonMax: 42 },
      { date: '2025-11-06', cornyn: 38, paxton: 46, cornyinMin: 35, cornyinMax: 41, paxtonMin: 43, paxtonMax: 49 },
      { date: '2025-11-13', cornyn: 38, paxton: 46, cornyinMin: 35, cornyinMax: 41, paxtonMin: 43, paxtonMax: 49 },
      { date: '2025-11-14', cornyn: 38, paxton: 46, cornyinMin: 35, cornyinMax: 41, paxtonMin: 43, paxtonMax: 49 },
      { date: '2025-11-15', cornyn: 38, paxton: 46, cornyinMin: 35, cornyinMax: 41, paxtonMin: 43, paxtonMax: 49 },
      { date: '2025-11-16', cornyn: 45, paxton: 41, cornyinMin: 42, cornyinMax: 48, paxtonMin: 38, paxtonMax: 44 },
      { date: '2025-12-01', cornyn: 45, paxton: 41, cornyinMin: 42, cornyinMax: 48, paxtonMin: 38, paxtonMax: 44 },
      { date: '2025-12-02', cornyn: 34, paxton: 44, cornyinMin: 31, cornyinMax: 37, paxtonMin: 41, paxtonMax: 47 },
      { date: '2025-12-03', cornyn: 34, paxton: 44, cornyinMin: 31, cornyinMax: 37, paxtonMin: 41, paxtonMax: 47 },
      { date: '2025-12-04', cornyn: 40, paxton: 44, cornyinMin: 37, cornyinMax: 43, paxtonMin: 41, paxtonMax: 47 },
      { date: '2026-01-04', cornyn: 40, paxton: 44, cornyinMin: 37, cornyinMax: 43, paxtonMin: 41, paxtonMax: 47 },
      { date: '2026-01-05', cornyn: 40, paxton: 44, cornyinMin: 37, cornyinMax: 43, paxtonMin: 41, paxtonMax: 47 },
      { date: '2026-01-06', cornyn: 40, paxton: 44, cornyinMin: 37, cornyinMax: 43, paxtonMin: 41, paxtonMax: 47 },
      { date: '2026-01-07', cornyn: 33, paxton: 44, cornyinMin: 30, cornyinMax: 36, paxtonMin: 41, paxtonMax: 47 },
      { date: '2026-01-20', cornyn: 33, paxton: 44, cornyinMin: 30, cornyinMax: 36, paxtonMin: 41, paxtonMax: 47 },
      { date: '2026-01-21', cornyn: 33, paxton: 44, cornyinMin: 30, cornyinMax: 36, paxtonMin: 41, paxtonMax: 47 },
      { date: '2026-01-22', cornyn: 33, paxton: 44, cornyinMin: 30, cornyinMax: 36, paxtonMin: 41, paxtonMax: 47 },
      { date: '2026-01-23', cornyn: 33, paxton: 44, cornyinMin: 30, cornyinMax: 36, paxtonMin: 41, paxtonMax: 47 },
      { date: '2026-01-24', cornyn: 33, paxton: 44, cornyinMin: 30, cornyinMax: 36, paxtonMin: 41, paxtonMax: 47 },
      { date: '2026-01-25', cornyn: 33, paxton: 44, cornyinMin: 30, cornyinMax: 36, paxtonMin: 41, paxtonMax: 47 },
      { date: '2026-01-26', cornyn: 33, paxton: 44, cornyinMin: 30, cornyinMax: 36, paxtonMin: 41, paxtonMax: 47 },
      { date: '2026-01-27', cornyn: 33, paxton: 44, cornyinMin: 30, cornyinMax: 36, paxtonMin: 41, paxtonMax: 47 },
      { date: '2026-01-28', cornyn: 33, paxton: 44, cornyinMin: 30, cornyinMax: 36, paxtonMin: 41, paxtonMax: 47 },
      { date: '2026-01-29', cornyn: 33, paxton: 44, cornyinMin: 30, cornyinMax: 36, paxtonMin: 41, paxtonMax: 47 },
      { date: '2026-01-30', cornyn: 33, paxton: 44, cornyinMin: 30, cornyinMax: 36, paxtonMin: 41, paxtonMax: 47 },
      { date: '2026-01-31', cornyn: 40, paxton: 51, cornyinMin: 37, cornyinMax: 43, paxtonMin: 48, paxtonMax: 54 },
      { date: '2026-02-01', cornyn: 40, paxton: 51, cornyinMin: 37, cornyinMax: 43, paxtonMin: 48, paxtonMax: 54 },
      { date: '2026-02-02', cornyn: 40, paxton: 51, cornyinMin: 37, cornyinMax: 43, paxtonMin: 48, paxtonMax: 54 },
      { date: '2026-02-03', cornyn: 40, paxton: 41, cornyinMin: 37, cornyinMax: 43, paxtonMin: 38, paxtonMax: 44 },
      { date: '2026-02-09', cornyn: 40, paxton: 41, cornyinMin: 37, cornyinMax: 43, paxtonMin: 38, paxtonMax: 44 },
      { date: '2026-02-10', cornyn: 40, paxton: 41, cornyinMin: 37, cornyinMax: 43, paxtonMin: 38, paxtonMax: 44 },
      { date: '2026-02-11', cornyn: 40, paxton: 41, cornyinMin: 37, cornyinMax: 43, paxtonMin: 38, paxtonMax: 44 },
      { date: '2026-02-12', cornyn: 38, paxton: 50, cornyinMin: 35, cornyinMax: 41, paxtonMin: 47, paxtonMax: 53 },
      { date: '2026-02-23', cornyn: 38, paxton: 50, cornyinMin: 35, cornyinMax: 41, paxtonMin: 47, paxtonMax: 53 },
      { date: '2026-02-24', cornyn: 36, paxton: 49, cornyinMin: 33, cornyinMax: 39, paxtonMin: 46, paxtonMax: 52 },
      { date: '2026-03-05', cornyn: 36, paxton: 49, cornyinMin: 33, cornyinMax: 39, paxtonMin: 46, paxtonMax: 52 },
      { date: '2026-03-06', cornyn: 42, paxton: 45, cornyinMin: 39, cornyinMax: 45, paxtonMin: 42, paxtonMax: 48 },
      { date: '2026-03-07', cornyn: 42, paxton: 45, cornyinMin: 39, cornyinMax: 45, paxtonMin: 42, paxtonMax: 48 },
      { date: '2026-03-08', cornyn: 41, paxton: 49, cornyinMin: 38, cornyinMax: 44, paxtonMin: 46, paxtonMax: 52 }
    ],
    polls: [
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
  'illinois-dem-primary': {
    chartData: [
      { date: '2025-06-05', kelly: 14, raja: 32, stratton: 19, kellyMin: 11, kellyMax: 17, rajaMin: 29, rajaMax: 35, strattonMin: 16, strattonMax: 22 },
      { date: '2025-08-08', kelly: 13, raja: 51, stratton: 28, kellyMin: 10, kellyMax: 16, rajaMin: 48, rajaMax: 54, strattonMin: 25, strattonMax: 31 },
      { date: '2025-08-12', kelly: 12, raja: 38, stratton: 18, kellyMin: 9, kellyMax: 15, rajaMin: 35, rajaMax: 41, strattonMin: 15, strattonMax: 21 },
      { date: '2025-09-17', kelly: 8, raja: 41, stratton: 17, kellyMin: 5, kellyMax: 11, rajaMin: 38, rajaMax: 44, strattonMin: 14, strattonMax: 20 },
      { date: '2025-09-25', kelly: 8, raja: 33, stratton: 18, kellyMin: 5, kellyMax: 11, rajaMin: 30, rajaMax: 36, strattonMin: 15, strattonMax: 21 },
      { date: '2025-11-20', kelly: 22, raja: 29, stratton: 18, kellyMin: 19, kellyMax: 25, rajaMin: 26, rajaMax: 32, strattonMin: 15, strattonMax: 21 },
      { date: '2025-12-04', kelly: 7, raja: 42, stratton: 14, kellyMin: 4, kellyMax: 10, rajaMin: 39, rajaMax: 45, strattonMin: 11, strattonMax: 17 },
      { date: '2025-12-08', kelly: 9, raja: 32, stratton: 20, kellyMin: 6, kellyMax: 12, rajaMin: 29, rajaMax: 35, strattonMin: 17, strattonMax: 23 },
      { date: '2026-01-03', kelly: 8, raja: 31, stratton: 10, kellyMin: 5, kellyMax: 11, rajaMin: 28, rajaMax: 34, strattonMin: 7, strattonMax: 13 },
      { date: '2026-01-08', kelly: 15, raja: 41, stratton: 16, kellyMin: 12, kellyMax: 18, rajaMin: 38, rajaMax: 44, strattonMin: 13, strattonMax: 19 },
      { date: '2026-01-21', kelly: 11, raja: 32, stratton: 21, kellyMin: 8, kellyMax: 14, rajaMin: 29, rajaMax: 35, strattonMin: 18, strattonMax: 24 },
      { date: '2026-01-25', kelly: 13, raja: 43, stratton: 17, kellyMin: 10, kellyMax: 16, rajaMin: 40, rajaMax: 46, strattonMin: 14, strattonMax: 20 },
      { date: '2026-02-02', kelly: 8, raja: 34, stratton: 23, kellyMin: 5, kellyMax: 11, rajaMin: 31, rajaMax: 37, strattonMin: 20, strattonMax: 26 },
      { date: '2026-02-14', kelly: 10, raja: 42, stratton: 26, kellyMin: 7, kellyMax: 13, rajaMin: 39, rajaMax: 45, strattonMin: 23, strattonMax: 29 },
      { date: '2026-02-23', kelly: 13, raja: 29, stratton: 27, kellyMin: 10, kellyMax: 16, rajaMin: 26, rajaMax: 32, strattonMin: 24, strattonMax: 30 },
      { date: '2026-03-02', kelly: 11, raja: 30, stratton: 33, kellyMin: 8, kellyMax: 14, rajaMin: 27, rajaMax: 33, strattonMin: 30, strattonMax: 36 },
      { date: '2026-03-03', kelly: 14, raja: 36, stratton: 26, kellyMin: 11, kellyMax: 17, rajaMin: 33, rajaMax: 39, strattonMin: 23, strattonMax: 29 },
      { date: '2026-03-04', kelly: 12, raja: 39, stratton: 28, kellyMin: 9, kellyMax: 15, rajaMin: 36, rajaMax: 42, strattonMin: 25, strattonMax: 31 },
      { date: '2026-03-09', kelly: 13, raja: 30, stratton: 32, kellyMin: 10, kellyMax: 16, rajaMin: 27, rajaMax: 33, strattonMin: 29, strattonMax: 35 },
      { date: '2026-03-10', kelly: 18, raja: 33, stratton: 38, kellyMin: 15, kellyMax: 21, rajaMin: 30, rajaMax: 36, strattonMin: 35, strattonMax: 41 }
    ],
    polls: [
      { pollster: 'FM3 Research (D)', date: 'March 10–12, 2026', sampleSize: 678, kelly: 18, raja: 33, stratton: 38, other: 11, undecided: 0, margin: 'Stratton +5' },
      { pollster: 'Public Policy Polling (D)', date: 'March 9–10, 2026', sampleSize: 700, kelly: 13, raja: 30, stratton: 32, other: 0, undecided: 25, margin: 'Stratton +2' },
      { pollster: 'Tulchin Research (D)', date: 'March 4–8, 2026', sampleSize: 600, kelly: 12, raja: 39, stratton: 28, other: 4, undecided: 15, margin: 'Raja +11' },
      { pollster: 'Change Research (D)', date: 'March 3–5, 2026', sampleSize: 717, kelly: 14, raja: 36, stratton: 26, other: 8, undecided: 16, margin: 'Raja +10' },
      { pollster: 'Public Policy Polling (D)', date: 'March 2–3, 2026', sampleSize: 577, kelly: 11, raja: 30, stratton: 33, other: 0, undecided: 26, margin: 'Stratton +3' },
      { pollster: 'Public Policy Polling (D)', date: 'February 23–24, 2026', sampleSize: 546, kelly: 13, raja: 29, stratton: 27, other: 0, undecided: 31, margin: 'Raja +2' },
      { pollster: 'Tulchin Research (D)', date: 'February 14–19, 2026', sampleSize: 600, kelly: 10, raja: 42, stratton: 26, other: 6, undecided: 16, margin: 'Raja +16' },
      { pollster: 'Public Policy Polling (D)', date: 'February 2–3, 2026', sampleSize: 574, kelly: 8, raja: 34, stratton: 23, other: 0, undecided: 37, margin: 'Raja +11' },
      { pollster: 'GBAO (D)', date: 'January 25–28, 2026', sampleSize: 800, kelly: 13, raja: 43, stratton: 17, other: 0, undecided: 27, margin: 'Raja +26' },
      { pollster: 'Victory Research', date: 'January 21–25, 2026', sampleSize: 806, kelly: 11, raja: 32, stratton: 21, other: 6, undecided: 30, margin: 'Raja +11' },
      { pollster: 'GBAO (D)', date: 'January 8–12, 2026', sampleSize: 900, kelly: 15, raja: 41, stratton: 16, other: 0, undecided: 28, margin: 'Raja +25' },
      { pollster: 'Emerson College/WGN-TV', date: 'January 3–5, 2026', sampleSize: 568, kelly: 8, raja: 31, stratton: 10, other: 6, undecided: 46, margin: 'Raja +21' },
      { pollster: 'Public Policy Polling (D)', date: 'December 8–9, 2025', sampleSize: 667, kelly: 9, raja: 32, stratton: 20, other: 0, undecided: 39, margin: 'Raja +12' },
      { pollster: 'Change Research (D)', date: 'December 4–8, 2025', sampleSize: 1007, kelly: 7, raja: 42, stratton: 14, other: 4, undecided: 33, margin: 'Raja +28' },
      { pollster: 'Victory Research', date: 'November 20–24, 2025', sampleSize: 0, kelly: 22, raja: 29, stratton: 18, other: 3, undecided: 28, margin: 'Raja +7' },
      { pollster: 'Public Policy Polling (D)', date: 'September 25–26, 2025', sampleSize: 576, kelly: 8, raja: 33, stratton: 18, other: 0, undecided: 41, margin: 'Raja +15' },
      { pollster: 'Change Research (D)', date: 'September 17–19, 2025', sampleSize: 1143, kelly: 8, raja: 41, stratton: 17, other: 0, undecided: 31, margin: 'Raja +24' },
      { pollster: 'GBAO (D)', date: 'August 12–17, 2025', sampleSize: 800, kelly: 12, raja: 38, stratton: 18, other: 0, undecided: 29, margin: 'Raja +20' },
      { pollster: 'Z to A Research (D)', date: 'August 8–10, 2025', sampleSize: 615, kelly: 13, raja: 51, stratton: 28, other: 0, undecided: 8, margin: 'Raja +23' },
      { pollster: 'GBAO (D)', date: 'June 5–10, 2025', sampleSize: 1200, kelly: 14, raja: 32, stratton: 19, other: 4, undecided: 31, margin: 'Raja +13' }
    ]
  },
  'illinois-9th-house': {
    chartData: [
      { date: '2025-06-12', biss: 17, fine: 8, abughazaleh: 10, simmons: 4, amiwala: 2, andrew: 0 },
      { date: '2025-10-14', biss: 18, fine: 9, abughazaleh: 13, simmons: 4, amiwala: 2, andrew: 2 },
      { date: '2025-10-29', biss: 18, fine: 10, abughazaleh: 18, simmons: 6, amiwala: 6, andrew: 1 },
      { date: '2025-11-04', biss: 31, fine: 10, abughazaleh: 17, simmons: 6, amiwala: 3, andrew: 3 },
      { date: '2026-01-26', biss: 21, fine: 21, abughazaleh: 14, simmons: 7, amiwala: 4, andrew: 4 },
      { date: '2026-02-05', biss: 31, fine: 18, abughazaleh: 18, simmons: 7, amiwala: 4, andrew: 7 },
      { date: '2026-02-15', biss: 31, fine: 14, abughazaleh: 13, simmons: 9, amiwala: 7, andrew: 4 },
      { date: '2026-02-20', biss: 24, fine: 16, abughazaleh: 17, simmons: 6, amiwala: 4, andrew: 5 },
      { date: '2026-03-09', biss: 24, fine: 14, abughazaleh: 20, simmons: 10, amiwala: 6, andrew: 7 }
    ],
    polls: [
      { pollster: 'Public Policy Polling (D)', date: 'March 9–10, 2026', sampleSize: 741, abughazaleh: 20, amiwala: 6, andrew: 7, biss: 24, fine: 14, simmons: 10, other: 2, undecided: 17, margin: 'Biss +4' },
      { pollster: 'Public Policy Polling (D)', date: 'February 20–21, 2026', sampleSize: 501, abughazaleh: 17, amiwala: 4, andrew: 5, biss: 24, fine: 16, simmons: 6, other: 6, undecided: 22, margin: 'Biss +7' },
      { pollster: 'Community Pulse/Molitico (D)', date: 'February 15–20, 2026', sampleSize: 638, abughazaleh: 13, amiwala: 7, andrew: 4, biss: 31, fine: 14, simmons: 9, other: 3, undecided: 21, margin: 'Biss +17' },
      { pollster: 'Impact Research (D)', date: 'February 5–10, 2026', sampleSize: 500, abughazaleh: 18, amiwala: 4, andrew: 7, biss: 31, fine: 18, simmons: 7, other: 5, undecided: 11, margin: 'Biss +13' },
      { pollster: 'GBAO Strategies (D)', date: 'January 26–29, 2026', sampleSize: 500, abughazaleh: 14, amiwala: 4, andrew: 4, biss: 21, fine: 21, simmons: 7, other: 9, undecided: 23, margin: 'Tie' },
      { pollster: 'Impact Research (D)', date: 'November 4–9, 2025', sampleSize: 500, abughazaleh: 17, amiwala: 3, andrew: 3, biss: 31, fine: 10, simmons: 6, other: 8, undecided: 21, margin: 'Biss +14' },
      { pollster: 'Data for Progress (D)', date: 'October 29 – November 3, 2025', sampleSize: 569, abughazaleh: 18, amiwala: 6, andrew: 1, biss: 18, fine: 10, simmons: 6, other: 10, undecided: 31, margin: 'Tie' },
      { pollster: 'MDW Communications (D)', date: 'October 14–16, 2025', sampleSize: 917, abughazaleh: 13, amiwala: 2, andrew: 2, biss: 18, fine: 9, simmons: 4, other: 4, undecided: 48, margin: 'Biss +5' },
      { pollster: 'MDW Communications (D)', date: 'June 12–15, 2025', sampleSize: 899, abughazaleh: 10, amiwala: 2, andrew: 0, biss: 17, fine: 8, simmons: 4, other: 6, undecided: 53, margin: 'Biss +7' }
    ]
  },
  'florida-gop-governor': {
    chartData: [
      { date: '2025-09-04', donalds: 40, fishback: 0, collins: 2, renner: 2 },
      { date: '2025-09-16', donalds: 29, fishback: 0, collins: 0, renner: 9 },
      { date: '2025-10-13', donalds: 39, fishback: 0, collins: 4, renner: 3 },
      { date: '2025-11-11', donalds: 45, fishback: 1, collins: 1, renner: 3 },
      { date: '2025-11-17', donalds: 43, fishback: 0, collins: 1, renner: 2 },
      { date: '2025-12-07', donalds: 40, fishback: 0, collins: 13, renner: 0 },
      { date: '2025-12-08', donalds: 38, fishback: 2, collins: 9, renner: 1 },
      { date: '2026-01-04', donalds: 45, fishback: 4, collins: 6, renner: 3 },
      { date: '2026-01-08', donalds: 37, fishback: 3, collins: 7, renner: 4 },
      { date: '2026-01-19', donalds: 37, fishback: 23, collins: 0, renner: 0 },
      { date: '2026-02-13', donalds: 33, fishback: 3, collins: 15, renner: 9 },
      { date: '2026-02-16', donalds: 31, fishback: 6, collins: 4, renner: 1 },
      { date: '2026-02-20', donalds: 30, fishback: 8, collins: 12, renner: 2 },
      { date: '2026-02-23', donalds: 44, fishback: 5, collins: 4, renner: 2 }
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
  }
};

export default function Polling() {
  const [selectedPoll, setSelectedPoll] = useState('2026-senate-generic');
  const currentData = mockPollingData[selectedPoll];

  return (
    <div 
      className="min-h-[calc(100vh-4rem)] px-4 py-16 sm:py-24 bg-black"
      style={{
        backgroundImage: 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b6f149a83e2b792ef60e35/493863590_FEA3.png)',
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
          <Select value={selectedPoll} onValueChange={setSelectedPoll}>
            <SelectTrigger className="w-full sm:w-80 bg-black text-white border-white/30">
              <SelectValue placeholder="Select polling average" />
            </SelectTrigger>
            <SelectContent className="bg-black text-white border-white/30">
              {pollingOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-white hover:bg-white/20 focus:bg-white/20">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <PollingChart data={currentData.chartData} type={selectedPoll} polls={currentData.polls} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8"
        >
          <PollingTable polls={currentData.polls} type={selectedPoll} />
        </motion.div>
      </div>
    </div>
  );
}