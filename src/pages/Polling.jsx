import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PollingChart from '../components/polling/PollingChart';
import PollingTable from '../components/polling/PollingTable';
import { Input } from '@/components/ui/input';

const pollingOptions = [
  { value: 'generic-congressional-ballot', label: 'Generic Congressional Ballot' },
  { value: '2026-senate-generic', label: 'Texas Republican Senate Runoff' },
  { value: 'illinois-dem-primary', label: 'Illinois Democratic Senate Primary' },
  { value: 'illinois-9th-house', label: 'Illinois 9th Democratic House Primary' },
  { value: 'florida-gop-governor', label: 'Florida Republican Governor Primary' },
  { value: 'georgia-gop-governor', label: 'Georgia Republican Governor Primary' },
  { value: 'south-carolina-gop-governor', label: 'South Carolina Republican Governor Primary' }
];

const mockPollingData = {
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
      { date: '2025-06-08', kelly: 14.3, raja: 32.1, stratton: 19.4, kellyMin: 11.3, kellyMax: 17.3, rajaMin: 29.1, rajaMax: 35.1, strattonMin: 16.4, strattonMax: 22.4 },
      { date: '2025-08-15', kelly: 12.7, raja: 44.9, stratton: 23.4, kellyMin: 9.7, kellyMax: 15.7, rajaMin: 41.9, rajaMax: 47.9, strattonMin: 20.4, strattonMax: 26.4 },
      { date: '2025-09-26', kelly: 8, raja: 37, stratton: 17.5, kellyMin: 5, kellyMax: 11, rajaMin: 34, rajaMax: 40, strattonMin: 14.5, strattonMax: 20.5 },
      { date: '2025-11-22', kelly: 22, raja: 29, stratton: 18, kellyMin: 19, kellyMax: 25, rajaMin: 26, rajaMax: 32, strattonMin: 15, strattonMax: 21 },
      { date: '2025-12-08', kelly: 8, raja: 37, stratton: 17, kellyMin: 5, kellyMax: 11, rajaMin: 34, rajaMax: 40, strattonMin: 14, strattonMax: 20 },
      { date: '2026-01-10', kelly: 15, raja: 41, stratton: 16, kellyMin: 12, kellyMax: 18, rajaMin: 38, rajaMax: 44, strattonMin: 13, strattonMax: 19 },
      { date: '2026-01-27', kelly: 13, raja: 43, stratton: 17, kellyMin: 10, kellyMax: 16, rajaMin: 40, rajaMax: 46, strattonMin: 14, strattonMax: 20 },
      { date: '2026-02-10', kelly: 9, raja: 38, stratton: 24.5, kellyMin: 6, kellyMax: 12, rajaMin: 35, rajaMax: 41, strattonMin: 21.5, strattonMax: 27.5 },
      { date: '2026-03-03', kelly: 11.7, raja: 30.5, stratton: 33.2, kellyMin: 8.7, kellyMax: 14.7, rajaMin: 27.5, rajaMax: 33.5, strattonMin: 30.2, strattonMax: 36.2 },
      { date: '2026-03-12', kelly: 18.2, raja: 33.5, stratton: 38.6, kellyMin: 15.2, kellyMax: 21.2, rajaMin: 30.5, rajaMax: 36.5, strattonMin: 35.6, strattonMax: 41.6 }
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
      { date: '2025-06-14', biss: 17.3, fine: 8.2, abughazaleh: 10.1, simmons: 4.5, amiwala: 2.3, andrew: 0.6 },
      { date: '2025-10-15', biss: 18.4, fine: 9.1, abughazaleh: 13.2, simmons: 4.7, amiwala: 2.1, andrew: 2.3 },
      { date: '2025-11-07', biss: 25.1, fine: 10.5, abughazaleh: 17.75, simmons: 6.3, amiwala: 4.75, andrew: 2.15 },
      { date: '2026-01-28', biss: 21.8, fine: 21.2, abughazaleh: 14.6, simmons: 7.3, amiwala: 4.2, andrew: 4.5 },
      { date: '2026-02-08', biss: 31.3, fine: 18.4, abughazaleh: 18.1, simmons: 7.6, amiwala: 4.3, andrew: 7.2 },
      { date: '2026-02-21', biss: 28.1, fine: 15.25, abughazaleh: 15.3, simmons: 8.05, amiwala: 5.6, andrew: 4.95 },
      { date: '2026-03-10', biss: 24.2, fine: 14.7, abughazaleh: 20.3, simmons: 10.1, amiwala: 6.5, andrew: 7.3 }
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

export default function Polling() {
  const [selectedPoll, setSelectedPoll] = useState('generic-congressional-ballot');
  const [searchQuery, setSearchQuery] = useState('');
  const currentData = mockPollingData[selectedPoll];

  // Normalize string for search (remove spaces, lowercase)
  const normalizeString = (str) => str.replace(/\s/g, '').toLowerCase();

  // Filter options based on search (only poll name, not pollsters)
  const filteredOptions = pollingOptions.filter(option => {
    if (!searchQuery) return true;
    
    const normalizedQuery = normalizeString(searchQuery);
    const normalizedLabel = normalizeString(option.label);
    
    return normalizedLabel.includes(normalizedQuery);
  });

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
          <Select value={selectedPoll} onValueChange={setSelectedPoll}>
            <SelectTrigger className="w-full sm:w-80 bg-black text-white border-white/30">
              <SelectValue placeholder="Select polling average" />
            </SelectTrigger>
            <SelectContent className="bg-black text-white border-white/30">
              <div className="px-2 py-2 sticky top-0 bg-black z-10">
                <input
                  type="text"
                  placeholder="Search polls..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/10 text-white border border-white/30 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                />
              </div>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-white hover:bg-white/20 focus:bg-white/20">
                    {option.label}
                  </SelectItem>
                ))
              ) : (
                <div className="px-3 py-2 text-white/60 text-sm">No results found</div>
              )}
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