import React, { useState } from 'react';
import { houseIncumbents } from '../swingometer/houseIncumbents';

const ratingColors = {
  'Safe D':    '#1E3A8A',
  'Likely D':  '#2563EB',
  'Lean D':    '#93C5FD',
  'Tilt D':    '#BFDBFE',
  'Toss Up':   '#A855F7',
  'Tilt R':    '#FECACA',
  'Lean R':    '#FCA5A5',
  'Likely R':  '#DC2626',
  'Safe R':    '#7F1D1D',
};

const ratingOrder = ['Safe D','Likely D','Lean D','Tilt D','Toss Up','Tilt R','Lean R','Likely R','Safe R'];

const rawSeats = [
  ['AL-1','Safe R'],['AL-2','Safe D'],['AL-3','Safe R'],['AL-4','Safe R'],['AL-5','Safe R'],['AL-6','Safe R'],['AL-7','Safe D'],
  ['AK-AL','Toss Up'],
  ['AZ-1','Toss Up'],['AZ-2','Lean R'],['AZ-3','Safe D'],['AZ-4','Likely D'],['AZ-5','Safe R'],['AZ-6','Toss Up'],['AZ-7','Safe D'],['AZ-8','Likely R'],['AZ-9','Safe R'],
  ['AR-1','Safe R'],['AR-2','Safe R'],['AR-3','Safe R'],['AR-4','Safe R'],
  ['CA-1','Safe D'],['CA-2','Safe D'],['CA-3','Likely D'],['CA-4','Safe D'],['CA-5','Safe R'],['CA-6','Likely D'],['CA-7','Safe D'],['CA-8','Safe D'],['CA-9','Lean D'],['CA-10','Safe D'],['CA-11','Safe D'],['CA-12','Safe D'],['CA-13','Lean D'],['CA-14','Safe D'],['CA-15','Safe D'],['CA-16','Safe D'],['CA-17','Safe D'],['CA-18','Safe D'],['CA-19','Safe D'],['CA-20','Likely R'],['CA-21','Likely D'],['CA-22','Lean D'],['CA-23','Likely R'],['CA-24','Safe D'],['CA-25','Likely D'],['CA-26','Likely D'],['CA-27','Likely D'],['CA-28','Safe D'],['CA-29','Safe D'],['CA-30','Safe D'],['CA-31','Safe D'],['CA-32','Safe D'],['CA-33','Safe D'],['CA-34','Safe D'],['CA-35','Likely D'],['CA-36','Safe D'],['CA-37','Safe D'],['CA-38','Safe D'],['CA-39','Safe D'],['CA-40','Lean R'],['CA-41','Likely D'],['CA-42','Safe D'],['CA-43','Safe D'],['CA-44','Safe D'],['CA-45','Lean D'],['CA-46','Safe D'],['CA-47','Likely D'],['CA-48','Tilt D'],['CA-49','Likely D'],['CA-50','Safe D'],['CA-51','Safe D'],['CA-52','Safe D'],
  ['CO-1','Safe D'],['CO-2','Safe D'],['CO-3','Toss Up'],['CO-4','Likely R'],['CO-5','Likely R'],['CO-6','Safe D'],['CO-7','Safe D'],['CO-8','Lean D'],
  ['CT-1','Safe D'],['CT-2','Safe D'],['CT-3','Safe D'],['CT-4','Safe D'],['CT-5','Safe D'],
  ['DE-AL','Safe D'],
  ['FL-1','Safe R'],['FL-2','Likely R'],['FL-3','Safe R'],['FL-4','Likely R'],['FL-5','Safe R'],['FL-6','Safe R'],['FL-7','Likely R'],['FL-8','Safe R'],['FL-9','Safe D'],['FL-10','Safe D'],['FL-11','Likely R'],['FL-12','Safe R'],['FL-13','Likely R'],['FL-14','Safe D'],['FL-15','Likely R'],['FL-16','Likely R'],['FL-17','Safe R'],['FL-18','Safe R'],['FL-19','Safe R'],['FL-20','Safe D'],['FL-21','Likely R'],['FL-22','Safe D'],['FL-23','Likely D'],['FL-24','Safe D'],['FL-25','Likely D'],['FL-26','Safe R'],['FL-27','Safe R'],['FL-28','Likely R'],
  ['GA-1','Likely R'],['GA-2','Safe D'],['GA-3','Safe R'],['GA-4','Safe D'],['GA-5','Safe D'],['GA-6','Safe D'],['GA-7','Safe R'],['GA-8','Safe R'],['GA-9','Safe R'],['GA-10','Safe R'],['GA-11','Safe R'],['GA-12','Likely R'],['GA-13','Safe D'],['GA-14','Safe R'],
  ['HI-1','Safe D'],['HI-2','Safe D'],
  ['ID-1','Safe R'],['ID-2','Safe R'],
  ['IL-1','Safe D'],['IL-2','Safe D'],['IL-3','Safe D'],['IL-4','Safe D'],['IL-5','Safe D'],['IL-6','Safe D'],['IL-7','Safe D'],['IL-8','Safe D'],['IL-9','Safe D'],['IL-10','Safe D'],['IL-11','Safe D'],['IL-12','Safe R'],['IL-13','Safe D'],['IL-14','Safe D'],['IL-15','Safe R'],['IL-16','Safe R'],['IL-17','Safe D'],
  ['IN-1','Safe D'],['IN-2','Safe R'],['IN-3','Safe R'],['IN-4','Safe R'],['IN-5','Likely R'],['IN-6','Safe R'],['IN-7','Safe D'],['IN-8','Safe R'],['IN-9','Safe R'],
  ['IA-1','Lean D'],['IA-2','Likely R'],['IA-3','Tilt D'],['IA-4','Safe R'],
  ['KS-1','Safe R'],['KS-2','Likely R'],['KS-3','Safe D'],['KS-4','Safe R'],
  ['KY-1','Safe R'],['KY-2','Safe R'],['KY-3','Safe D'],['KY-4','Safe R'],['KY-5','Safe R'],['KY-6','Safe R'],
  ['LA-1','Safe R'],['LA-2','Safe D'],['LA-3','Safe R'],['LA-4','Safe R'],['LA-5','Safe R'],['LA-6','Safe D'],
  ['MA-1','Safe D'],['MA-2','Safe D'],['MA-3','Safe D'],['MA-4','Safe D'],['MA-5','Safe D'],['MA-6','Safe D'],['MA-7','Safe D'],['MA-8','Safe D'],['MA-9','Safe D'],
  ['MD-1','Likely R'],['MD-2','Safe D'],['MD-3','Safe D'],['MD-4','Safe D'],['MD-5','Safe D'],['MD-6','Likely D'],['MD-7','Safe D'],['MD-8','Safe D'],
  ['ME-1','Safe D'],['ME-2','Toss Up'],
  ['MI-1','Likely R'],['MI-2','Safe R'],['MI-3','Safe D'],['MI-4','Lean R'],['MI-5','Safe R'],['MI-6','Safe D'],['MI-7','Toss Up'],['MI-8','Likely D'],['MI-9','Safe R'],['MI-10','Lean R'],['MI-11','Safe D'],['MI-12','Safe D'],['MI-13','Safe D'],
  ['MN-1','Likely R'],['MN-2','Safe D'],['MN-3','Safe D'],['MN-4','Safe D'],['MN-5','Safe D'],['MN-6','Safe R'],['MN-7','Safe R'],['MN-8','Likely R'],
  ['MS-1','Safe R'],['MS-2','Safe D'],['MS-3','Safe R'],['MS-4','Safe R'],
  ['MO-1','Safe D'],['MO-2','Likely R'],['MO-3','Safe R'],['MO-4','Likely R'],['MO-5','Likely R'],['MO-6','Safe R'],['MO-7','Safe R'],['MO-8','Likely R'],
  ['MT-1','Lean R'],['MT-2','Safe R'],
  ['NE-1','Likely R'],['NE-2','Lean D'],['NE-3','Safe R'],
  ['NV-1','Likely D'],['NV-2','Likely R'],['NV-3','Likely D'],['NV-4','Likely D'],
  ['NH-1','Likely D'],['NH-2','Likely D'],
  ['NJ-1','Safe D'],['NJ-2','Likely R'],['NJ-3','Safe D'],['NJ-4','Safe D'],['NJ-5','Safe D'],['NJ-6','Safe D'],['NJ-7','Tilt R'],['NJ-8','Safe D'],['NJ-9','Likely D'],['NJ-10','Safe D'],['NJ-11','Safe D'],['NJ-12','Safe D'],
  ['NM-1','Safe D'],['NM-2','Likely D'],['NM-3','Safe D'],
  ['NY-1','Likely R'],['NY-2','Likely R'],['NY-3','Likely D'],['NY-4','Likely D'],['NY-5','Safe D'],['NY-6','Safe D'],['NY-7','Safe D'],['NY-8','Safe D'],['NY-9','Safe D'],['NY-10','Safe D'],['NY-11','Safe R'],['NY-12','Safe D'],['NY-13','Safe D'],['NY-14','Safe D'],['NY-15','Safe D'],['NY-16','Safe D'],['NY-17','Toss Up'],['NY-18','Safe D'],['NY-19','Likely D'],['NY-20','Safe D'],['NY-21','Likely R'],['NY-22','Likely D'],['NY-23','Safe R'],['NY-24','Safe R'],['NY-25','Safe D'],['NY-26','Safe D'],
  ['NC-1','Likely R'],['NC-2','Safe D'],['NC-3','Likely R'],['NC-4','Safe D'],['NC-5','Likely R'],['NC-6','Safe R'],['NC-7','Likely R'],['NC-8','Likely R'],['NC-9','Likely R'],['NC-10','Likely R'],['NC-11','Lean R'],['NC-12','Safe D'],['NC-13','Likely R'],['NC-14','Likely R'],
  ['ND-AL','Safe R'],
  ['OH-1','Likely D'],['OH-2','Safe R'],['OH-3','Safe D'],['OH-4','Safe R'],['OH-5','Safe R'],['OH-6','Safe R'],['OH-7','Likely R'],['OH-8','Likely R'],['OH-9','Toss Up'],['OH-10','Likely R'],['OH-11','Safe D'],['OH-12','Safe R'],['OH-13','Likely D'],['OH-14','Likely R'],['OH-15','Likely R'],
  ['OK-1','Safe R'],['OK-2','Safe R'],['OK-3','Safe R'],['OK-4','Safe R'],['OK-5','Safe R'],
  ['OR-1','Safe D'],['OR-2','Safe R'],['OR-3','Safe D'],['OR-4','Safe D'],['OR-5','Likely D'],['OR-6','Likely D'],
  ['PA-1','Lean R'],['PA-2','Safe D'],['PA-3','Safe D'],['PA-4','Safe D'],['PA-5','Safe D'],['PA-6','Safe D'],['PA-7','Toss Up'],['PA-8','Tilt D'],['PA-9','Safe R'],['PA-10','Tilt D'],['PA-11','Safe R'],['PA-12','Safe D'],['PA-13','Safe R'],['PA-14','Safe R'],['PA-15','Safe R'],['PA-16','Safe R'],['PA-17','Likely D'],
  ['RI-1','Safe D'],['RI-2','Safe D'],
  ['SC-1','Likely R'],['SC-2','Likely R'],['SC-3','Safe R'],['SC-4','Safe R'],['SC-5','Safe R'],['SC-6','Safe D'],['SC-7','Safe R'],
  ['SD-AL','Safe R'],
  ['TN-1','Safe R'],['TN-2','Safe R'],['TN-3','Safe R'],['TN-4','Safe R'],['TN-5','Likely R'],['TN-6','Safe R'],['TN-7','Likely R'],['TN-8','Safe R'],['TN-9','Safe D'],
  ['TX-1','Safe R'],['TX-2','Likely R'],['TX-3','Safe R'],['TX-4','Safe R'],['TX-5','Likely R'],['TX-6','Likely R'],['TX-7','Likely R'],['TX-8','Safe D'],['TX-9','Likely R'],['TX-10','Likely R'],['TX-11','Likely R'],['TX-12','Likely R'],['TX-13','Likely R'],['TX-14','Likely R'],['TX-15','Likely R'],['TX-16','Likely D'],['TX-17','Likely R'],['TX-18','Safe D'],['TX-19','Safe R'],['TX-20','Safe D'],['TX-21','Likely R'],['TX-22','Likely R'],['TX-23','Likely R'],['TX-24','Likely R'],['TX-25','Likely R'],['TX-26','Safe R'],['TX-27','Likely R'],['TX-28','Tilt D'],['TX-29','Safe D'],['TX-30','Safe D'],['TX-31','Safe R'],['TX-32','Likely R'],['TX-33','Safe D'],['TX-34','Lean D'],['TX-35','Lean R'],['TX-36','Safe R'],['TX-37','Safe D'],['TX-38','Likely R'],
  ['UT-1','Safe D'],['UT-2','Safe R'],['UT-3','Safe R'],['UT-4','Safe R'],
  ['VT-AL','Safe D'],
  ['VA-1','Likely D'],['VA-2','Lean D'],['VA-3','Safe D'],['VA-4','Safe D'],['VA-5','Likely D'],['VA-6','Lean D'],['VA-7','Likely D'],['VA-8','Safe D'],['VA-9','Safe R'],['VA-10','Likely D'],['VA-11','Safe D'],
  ['WA-1','Safe D'],['WA-2','Safe D'],['WA-3','Lean D'],['WA-4','Safe R'],['WA-5','Safe R'],['WA-6','Safe D'],['WA-7','Safe D'],['WA-8','Safe D'],['WA-9','Safe D'],['WA-10','Safe D'],
  ['WV-1','Safe R'],['WV-2','Safe R'],
  ['WI-1','Likely R'],['WI-2','Safe D'],['WI-3','Toss Up'],['WI-4','Safe D'],['WI-5','Safe R'],['WI-6','Safe R'],['WI-7','Safe R'],['WI-8','Likely R'],
  ['WY-AL','Safe R'],
];

const housePercentages = {
  'AL-1':{d:73.3,r:26.7},'AL-2':{d:58.4,r:41.6},'AL-3':{d:33.7,r:66.3},'AL-4':{d:28.5,r:71.5},'AL-5':{d:38.8,r:61.2},'AL-6':{d:34.6,r:65.4},'AL-7':{d:100,r:0},
  'AK-AL':{d:49.1,r:50.9},
  'AZ-1':{d:51.4,r:48.6},'AZ-2':{d:46.5,r:53.5},'AZ-3':{d:74.2,r:25.8},'AZ-4':{d:53.8,r:46.2},'AZ-5':{d:42.5,r:57.5},'AZ-6':{d:50.6,r:49.4},'AZ-7':{d:68.6,r:31.4},'AZ-8':{d:45.2,r:54.8},'AZ-9':{d:38.3,r:61.7},
  'AR-1':{d:26.6,r:73.4},'AR-2':{d:43.9,r:56.1},'AR-3':{d:33.6,r:66.4},'AR-4':{d:28.2,r:71.8},
  'CA-1':{d:57.8,r:42.2},'CA-2':{d:64.4,r:35.6},'CA-3':{d:56.7,r:43.3},'CA-4':{d:61.9,r:38.1},'CA-5':{d:39.5,r:60.5},'CA-6':{d:55.2,r:44.8},'CA-7':{d:64.6,r:35.4},'CA-8':{d:71.4,r:28.6},'CA-9':{d:54.6,r:45.4},'CA-10':{d:67.9,r:32.1},
  'CA-11':{d:82.8,r:17.2},'CA-12':{d:86.2,r:13.8},'CA-13':{d:52.7,r:47.3},'CA-14':{d:68.1,r:31.9},'CA-15':{d:74.2,r:25.8},'CA-16':{d:75.5,r:24.5},'CA-17':{d:68,r:32},'CA-18':{d:68.8,r:31.2},'CA-19':{d:70.1,r:29.9},'CA-20':{d:26.7,r:73.3},
  'CA-21':{d:54.7,r:45.3},'CA-22':{d:49.1,r:50.9},'CA-23':{d:42.4,r:57.6},'CA-24':{d:63.3,r:36.7},'CA-25':{d:58.3,r:41.7},'CA-26':{d:57.1,r:42.9},'CA-27':{d:53.3,r:46.7},'CA-28':{d:64.6,r:35.4},'CA-29':{d:69.2,r:30.8},'CA-30':{d:58.5,r:41.5},
  'CA-31':{d:59.4,r:40.6},'CA-32':{d:65,r:35},'CA-33':{d:59.8,r:40.2},'CA-34':{d:86.6,r:13.4},'CA-35':{d:58.3,r:41.7},'CA-36':{d:59.5,r:40.5},'CA-37':{d:78.9,r:21.1},'CA-38':{d:58.9,r:41.1},'CA-39':{d:57,r:43},'CA-40':{d:44.7,r:55.3},
  'CA-41':{d:56.6,r:43.4},'CA-42':{d:64.4,r:35.6},'CA-43':{d:75.5,r:24.5},'CA-44':{d:72.7,r:27.3},'CA-45':{d:53,r:47},'CA-46':{d:63.6,r:36.4},'CA-47':{d:53.6,r:46.4},'CA-48':{d:51.4,r:48.6},'CA-49':{d:53.6,r:46.4},'CA-50':{d:62.2,r:37.8},
  'CA-51':{d:60.7,r:39.3},'CA-52':{d:66.1,r:33.9},
  'CO-1':{d:78.9,r:21.1},'CO-2':{d:70.4,r:29.6},'CO-3':{d:49.8,r:50.2},'CO-4':{d:46.7,r:53.3},'CO-5':{d:44,r:56},'CO-6':{d:61.3,r:38.7},'CO-7':{d:58.8,r:41.2},'CO-8':{d:51.1,r:48.9},
  'CT-1':{d:65.5,r:34.5},'CT-2':{d:60.4,r:39.6},'CT-3':{d:60.1,r:39.9},'CT-4':{d:63.3,r:36.7},'CT-5':{d:55,r:45},
  'DE-AL':{d:59.9,r:40.1},
  'FL-1':{d:35.6,r:64.4},'FL-2':{d:40.9,r:59.1},'FL-3':{d:40.2,r:59.8},'FL-4':{d:44,r:56},'FL-5':{d:38.5,r:61.5},'FL-6':{d:35.3,r:64.7},'FL-7':{d:44.9,r:55.1},'FL-8':{d:39.2,r:60.8},'FL-9':{d:58.8,r:41.2},'FL-10':{d:64.6,r:35.4},
  'FL-11':{d:40.8,r:59.2},'FL-12':{d:30.3,r:69.7},'FL-13':{d:46.7,r:53.3},'FL-14':{d:58.5,r:41.5},'FL-15':{d:45.7,r:54.3},'FL-16':{d:42.4,r:57.6},'FL-17':{d:36.9,r:63.1},'FL-18':{d:36,r:64},'FL-19':{d:35.1,r:64.9},'FL-20':{d:74.4,r:25.6},
  'FL-21':{d:39.9,r:60.1},'FL-22':{d:57.2,r:42.8},'FL-23':{d:53.2,r:46.8},'FL-24':{d:69.6,r:30.4},'FL-25':{d:56.4,r:43.6},'FL-26':{d:31.3,r:68.7},'FL-27':{d:41.5,r:58.5},'FL-28':{d:36.4,r:63.6},
  'GA-1':{d:40.1,r:59.9},'GA-2':{d:57.7,r:42.3},'GA-3':{d:35.3,r:64.7},'GA-4':{d:76,r:24},'GA-5':{d:86.8,r:13.2},'GA-6':{d:76.3,r:23.7},'GA-7':{d:36.4,r:63.6},'GA-8':{d:32.2,r:67.8},'GA-9':{d:32.5,r:67.5},'GA-10':{d:37.8,r:62.2},
  'GA-11':{d:33.5,r:66.5},'GA-12':{d:41.2,r:58.8},'GA-13':{d:73.2,r:26.8},'GA-14':{d:37,r:63},
  'HI-1':{d:72.6,r:27.4},'HI-2':{d:68.9,r:31.1},
  'ID-1':{d:26.4,r:73.6},'ID-2':{d:32.3,r:67.7},
  'IL-1':{d:100,r:0},'IL-2':{d:69.4,r:30.6},'IL-3':{d:70,r:30},'IL-4':{d:69.5,r:30.5},'IL-5':{d:69.4,r:30.6},'IL-6':{d:56.2,r:43.8},'IL-7':{d:84.3,r:15.7},'IL-8':{d:58.8,r:41.2},'IL-9':{d:69.4,r:30.6},'IL-10':{d:62.3,r:37.7},
  'IL-11':{d:57,r:43},'IL-12':{d:27.3,r:72.7},'IL-13':{d:59.5,r:40.5},'IL-14':{d:56.6,r:43.4},'IL-15':{d:31.4,r:68.6},'IL-16':{d:36.9,r:63.1},'IL-17':{d:56,r:44},
  'IN-1':{d:55.3,r:44.7},'IN-2':{d:36.4,r:63.6},'IN-3':{d:33,r:67},'IN-4':{d:32.8,r:67.2},'IN-5':{d:40.4,r:59.6},'IN-6':{d:32.9,r:67.1},'IN-7':{d:70.5,r:29.5},'IN-8':{d:31.3,r:68.7},'IN-9':{d:33.4,r:66.6},
  'IA-1':{d:51.4,r:48.6},'IA-2':{d:42.9,r:57.1},'IA-3':{d:50.9,r:49.1},'IA-4':{d:34.3,r:65.7},
  'KS-1':{d:32.3,r:67.7},'KS-2':{d:40.5,r:59.5},'KS-3':{d:55.5,r:44.5},'KS-4':{d:36,r:64},
  'KY-1':{d:26.6,r:73.4},'KY-2':{d:28.1,r:71.9},'KY-3':{d:63.6,r:36.4},'KY-4':{d:34.4,r:65.6},'KY-5':{d:21.2,r:78.8},'KY-6':{d:38.9,r:61.1},
  'LA-1':{d:27.3,r:72.7},'LA-2':{d:73,r:27},'LA-3':{d:26.2,r:73.8},'LA-4':{d:30.5,r:69.5},'LA-5':{d:27.7,r:72.3},'LA-6':{d:65.4,r:34.6},
  'MA-1':{d:65.6,r:34.4},'MA-2':{d:69.3,r:30.7},'MA-3':{d:64.9,r:35.1},'MA-4':{d:100,r:0},'MA-5':{d:100,r:0},'MA-6':{d:66.4,r:33.6},'MA-7':{d:87.2,r:12.8},'MA-8':{d:72.3,r:27.7},'MA-9':{d:58.4,r:41.6},
  'MD-1':{d:39.6,r:60.4},'MD-2':{d:60,r:40},'MD-3':{d:61.4,r:38.6},'MD-4':{d:90,r:10},'MD-5':{d:69.3,r:30.7},'MD-6':{d:54.4,r:45.6},'MD-7':{d:81.8,r:18.2},'MD-8':{d:79.6,r:20.4},
  'ME-1':{d:61.5,r:38.5},'ME-2':{d:49.8,r:50.2},
  'MI-1':{d:39.2,r:60.8},'MI-2':{d:33.3,r:66.7},'MI-3':{d:55.1,r:44.9},'MI-4':{d:46.2,r:53.8},'MI-5':{d:33.8,r:66.2},'MI-6':{d:63.6,r:36.4},'MI-7':{d:50.3,r:49.7},'MI-8':{d:52.3,r:47.7},'MI-9':{d:31.8,r:68.2},'MI-10':{d:46.2,r:53.8},
  'MI-11':{d:59,r:41},'MI-12':{d:71.7,r:28.3},'MI-13':{d:69.6,r:30.4},
  'MN-1':{d:43.2,r:56.8},'MN-2':{d:57.1,r:42.9},'MN-3':{d:60.2,r:39.8},'MN-4':{d:68.9,r:31.1},'MN-5':{d:76.6,r:23.4},'MN-6':{d:39.4,r:60.6},'MN-7':{d:31.1,r:68.9},'MN-8':{d:43.6,r:56.4},
  'MS-1':{d:32.5,r:67.5},'MS-2':{d:65.5,r:34.5},'MS-3':{d:33.8,r:66.2},'MS-4':{d:28.2,r:71.8},
  'MO-1':{d:82.6,r:17.4},'MO-2':{d:77.7,r:22.3},'MO-3':{d:44.6,r:55.4},'MO-4':{d:36.3,r:63.7},'MO-5':{d:28.8,r:71.2},'MO-6':{d:62.2,r:37.8},'MO-7':{d:28.5,r:71.5},'MO-8':{d:23,r:77},
  'MT-1':{d:47.3,r:52.7},'MT-2':{d:37.1,r:62.9},
  'NE-1':{d:42.4,r:57.6},'NE-2':{d:51.9,r:48.1},'NE-3':{d:22.4,r:77.6},
  'NV-1':{d:53.3,r:46.7},'NV-2':{d:42.3,r:57.7},'NV-3':{d:52.9,r:47.1},'NV-4':{d:54.6,r:45.4},
  'NH-1':{d:55.6,r:44.4},'NH-2':{d:54.8,r:45.2},
  'NJ-1':{d:59.6,r:40.4},'NJ-2':{d:44.8,r:55.2},'NJ-3':{d:55,r:45},'NJ-4':{d:33.2,r:66.8},'NJ-5':{d:56.1,r:43.9},'NJ-6':{d:57.6,r:42.4},'NJ-7':{d:49.1,r:50.9},'NJ-8':{d:60,r:40},'NJ-9':{d:53.3,r:46.7},'NJ-10':{d:76.7,r:23.3},
  'NJ-11':{d:59.2,r:40.8},'NJ-12':{d:58.2,r:41.8},
  'NM-1':{d:58.4,r:41.6},'NM-2':{d:54.8,r:45.2},'NM-3':{d:57.9,r:42.1},
  'NY-1':{d:46.8,r:53.2},'NY-2':{d:42.1,r:57.9},'NY-3':{d:53.2,r:46.8},'NY-4':{d:52.9,r:47.1},'NY-5':{d:75.6,r:24.4},'NY-6':{d:62.4,r:37.6},'NY-7':{d:80.5,r:19.5},'NY-8':{d:76.6,r:23.4},'NY-9':{d:77.2,r:22.8},'NY-10':{d:83.8,r:16.2},
  'NY-11':{d:38,r:62},'NY-12':{d:81.8,r:18.2},'NY-13':{d:84.6,r:15.4},'NY-14':{d:70.2,r:29.8},'NY-15':{d:78,r:22},'NY-16':{d:73.6,r:26.4},'NY-17':{d:48.4,r:51.6},'NY-18':{d:59.2,r:40.8},'NY-19':{d:52.9,r:47.1},'NY-20':{d:63.6,r:36.4},
  'NY-21':{d:40.3,r:59.7},'NY-22':{d:56.4,r:43.6},'NY-23':{d:35.9,r:64.1},'NY-24':{d:36.3,r:63.7},'NY-25':{d:62.2,r:37.8},'NY-26':{d:67.7,r:32.3},
  'NC-1':{d:46.8,r:53.2},'NC-2':{d:69.5,r:30.5},'NC-3':{d:41.2,r:58.8},'NC-4':{d:73.8,r:26.2},'NC-5':{d:43.6,r:56.4},'NC-6':{d:32.8,r:67.2},'NC-7':{d:43,r:57},'NC-8':{d:42.4,r:57.6},'NC-9':{d:39.9,r:60.1},'NC-10':{d:40.1,r:59.9},
  'NC-11':{d:44.9,r:55.1},'NC-12':{d:75.5,r:24.5},'NC-13':{d:42.2,r:57.8},'NC-14':{d:43.5,r:56.5},
  'ND-AL':{d:33.4,r:66.6},
  'OH-1':{d:52.6,r:47.4},'OH-2':{d:32.5,r:67.5},'OH-3':{d:72,r:28},'OH-4':{d:31.1,r:68.9},'OH-5':{d:37.4,r:62.6},'OH-6':{d:34.5,r:65.5},'OH-7':{d:46.7,r:53.3},'OH-8':{d:42.2,r:57.8},'OH-9':{d:50.2,r:49.8},'OH-10':{d:43.6,r:56.4},
  'OH-11':{d:79.7,r:20.3},'OH-12':{d:34,r:66},'OH-13':{d:54.8,r:45.2},'OH-14':{d:36.9,r:63.1},'OH-15':{d:43.8,r:56.2},
  'OK-1':{d:36.9,r:63.1},'OK-2':{d:23.4,r:76.6},'OK-3':{d:30.4,r:69.6},'OK-4':{d:30.1,r:69.9},'OK-5':{d:42.1,r:57.9},
  'OR-1':{d:72.3,r:27.7},'OR-2':{d:34.4,r:65.6},'OR-3':{d:75.5,r:24.5},'OR-4':{d:56.9,r:43.1},'OR-5':{d:52.6,r:47.4},'OR-6':{d:55,r:45},
  'PA-1':{d:53.4,r:46.6},'PA-2':{d:73.7,r:26.3},'PA-3':{d:75.9,r:24.1},'PA-4':{d:61.3,r:38.7},'PA-5':{d:67.5,r:32.5},'PA-6':{d:57.4,r:42.6},'PA-7':{d:51.4,r:48.6},'PA-8':{d:51.8,r:48.2},'PA-9':{d:31.5,r:68.5},'PA-10':{d:50.7,r:49.3},
  'PA-11':{d:38.3,r:61.7},'PA-12':{d:58.4,r:41.6},'PA-13':{d:28.3,r:71.7},'PA-14':{d:35.1,r:64.9},'PA-15':{d:30,r:70},'PA-16':{d:38.3,r:61.7},'PA-17':{d:55.9,r:44.1},
  'RI-1':{d:64.2,r:35.8},'RI-2':{d:60.8,r:39.2},
  'SC-1':{d:43.6,r:56.4},'SC-2':{d:42.9,r:57.1},'SC-3':{d:28.6,r:71.4},'SC-4':{d:39.2,r:60.8},'SC-5':{d:39.4,r:60.6},'SC-6':{d:61.6,r:38.4},'SC-7':{d:36.7,r:63.3},
  'SD-AL':{d:30.3,r:69.7},
  'TN-1':{d:22.2,r:77.8},'TN-2':{d:32.3,r:67.7},'TN-3':{d:32,r:68},'TN-4':{d:29,r:71},'TN-5':{d:41.3,r:58.7},'TN-6':{d:33.7,r:66.3},'TN-7':{d:40.5,r:59.5},'TN-8':{d:29.2,r:70.8},'TN-9':{d:73.7,r:26.3},
  'TX-1':{d:24.6,r:75.4},'TX-2':{d:37.8,r:62.2},'TX-3':{d:37.1,r:62.9},'TX-4':{d:37.9,r:62.1},'TX-5':{d:39.5,r:60.5},'TX-6':{d:38.6,r:61.4},'TX-7':{d:66,r:34},'TX-8':{d:38.7,r:61.3},'TX-9':{d:42.3,r:57.7},'TX-10':{d:37,r:63},
  'TX-11':{d:31.8,r:68.2},'TX-12':{d:38.4,r:61.6},'TX-13':{d:29.9,r:70.1},'TX-14':{d:36.9,r:63.1},'TX-15':{d:46.8,r:53.2},'TX-16':{d:63.6,r:36.4},'TX-17':{d:39.6,r:60.4},'TX-18':{d:78.9,r:21.1},'TX-19':{d:24.8,r:75.2},'TX-20':{d:75.5,r:24.5},
  'TX-21':{d:39.4,r:60.6},'TX-22':{d:38.1,r:61.9},'TX-23':{d:44.4,r:55.6},'TX-24':{d:42.2,r:57.8},'TX-25':{d:39.5,r:60.5},'TX-26':{d:36,r:64},'TX-27':{d:39.3,r:60.7},'TX-28':{d:52.3,r:47.7},'TX-29':{d:67.7,r:32.3},'TX-30':{d:79.5,r:20.5},
  'TX-31':{d:39.4,r:60.6},'TX-32':{d:40.2,r:59.8},'TX-33':{d:70.2,r:29.8},'TX-34':{d:50.9,r:49.1},'TX-35':{d:47.6,r:52.4},'TX-36':{d:35,r:65},'TX-37':{d:80.9,r:19.1},'TX-38':{d:40.9,r:59.1},
  'UT-1':{d:59.9,r:40.1},'UT-2':{d:38.2,r:61.8},'UT-3':{d:34.6,r:65.4},'UT-4':{d:36.4,r:63.6},
  'VT-AL':{d:66.8,r:33.2},
  'VA-1':{d:46.1,r:53.9},'VA-2':{d:51.2,r:48.8},'VA-3':{d:72.8,r:27.2},'VA-4':{d:69.3,r:30.7},'VA-5':{d:44.6,r:55.4},'VA-6':{d:36.7,r:63.3},'VA-7':{d:53.9,r:46.1},'VA-8':{d:74.9,r:25.1},'VA-9':{d:29.5,r:70.5},'VA-10':{d:54,r:46},
  'VA-11':{d:70.1,r:29.9},
  'WA-1':{d:66.4,r:33.6},'WA-2':{d:67.3,r:32.7},'WA-3':{d:53.3,r:46.7},'WA-4':{d:29.4,r:70.6},'WA-5':{d:42.3,r:57.7},'WA-6':{d:58.8,r:41.2},'WA-7':{d:86,r:14},'WA-8':{d:56.4,r:43.6},'WA-9':{d:77.4,r:22.6},'WA-10':{d:62.6,r:37.4},
  'WV-1':{d:28.4,r:71.6},'WV-2':{d:31.5,r:68.5},
  'WI-1':{d:46.2,r:53.8},'WI-2':{d:72.8,r:27.2},'WI-3':{d:50.2,r:49.8},'WI-4':{d:78.1,r:21.9},'WI-5':{d:38.5,r:61.5},'WI-6':{d:39.7,r:60.3},'WI-7':{d:37.9,r:62.1},'WI-8':{d:44,r:56},
  'WY-AL':{d:30.9,r:69.1},
};

const ratingApprox = {
  'Safe D':   { d: 65, r: 35 }, 'Likely D': { d: 58, r: 42 },
  'Lean D':   { d: 54, r: 46 }, 'Tilt D':   { d: 52, r: 48 },
  'Toss Up':  { d: 50, r: 50 }, 'Tilt R':   { d: 48, r: 52 },
  'Lean R':   { d: 46, r: 54 }, 'Likely R': { d: 42, r: 58 },
  'Safe R':   { d: 35, r: 65 },
};

export default function HouseForecastMap() {
  const [hovered, setHovered] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const [hoveredBubble, setHoveredBubble] = useState(null);
  const [highlightRating, setHighlightRating] = useState(null);

  // Group by rating in order, stable within each group
  const groups = {};
  ratingOrder.forEach(r => groups[r] = []);
  rawSeats.forEach(([key, rating]) => {
    const r = rating.trim();
    if (groups[r]) groups[r].push(key);
  });
  const allSeats = ratingOrder.flatMap(r => groups[r].map(key => ({ key, rating: r })));

  const total = allSeats.length;

  // Count totals
  const totals = {};
  ratingOrder.forEach(r => totals[r] = 0);
  allSeats.forEach(s => totals[s.rating]++);
  const demSeats = (totals['Safe D']||0)+(totals['Likely D']||0)+(totals['Lean D']||0)+(totals['Tilt D']||0);
  const repSeats = (totals['Safe R']||0)+(totals['Likely R']||0)+(totals['Lean R']||0)+(totals['Tilt R']||0);
  const tossUp = totals['Toss Up']||0;

  // Parliament semicircle layout
  const CX = 500, CY = 560;
  const dotR = 6.5;
  const spacing = dotR * 2.9;
  const startRadius = 110;
  const radiusStep = spacing + 1.5;

  // Build rows
  const rows = [];
  let remaining = total;
  let rad = startRadius;
  while (remaining > 0) {
    const capacity = Math.max(1, Math.floor(Math.PI * rad / spacing));
    const count = Math.min(capacity, remaining);
    rows.push({ radius: rad, count });
    remaining -= count;
    rad += radiusStep;
  }

  // Generate all positions, sort left→right by x
  const allPositions = [];
  rows.forEach(({ radius, count }) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.PI - (i / Math.max(count - 1, 1)) * Math.PI;
      const x = CX + radius * Math.cos(angle);
      const y = CY - radius * Math.sin(angle);
      allPositions.push({ x, y });
    }
  });
  allPositions.sort((a, b) => a.x - b.x);

  // Assign seats to sorted positions
  const dots = allPositions.map((pos, i) => ({ ...pos, seat: allSeats[i] })).filter(d => d.seat);

  const maxRadius = rows[rows.length - 1]?.radius || 200;
  const svgH = CY - maxRadius + 20;

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8">
      {/* Seat count bubbles */}
      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        <div className="relative" onMouseEnter={() => setHoveredBubble('dem')} onMouseLeave={() => setHoveredBubble(null)}>
          <div className="bg-blue-900/60 rounded-xl px-8 py-4 text-center w-[160px] shadow-lg transition-transform duration-200 hover:scale-110 cursor-pointer" style={{ border: '2px solid white' }}>
            <div className="text-4xl font-bold text-blue-300">{demSeats}</div>
            <div className="text-blue-200/70 text-sm mt-1">Democrat</div>
          </div>
          {hoveredBubble === 'dem' && (
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 bg-black/90 border border-white/20 rounded-xl p-2 flex gap-2 shadow-xl">
              {[['Safe D','#1E3A8A','white'],['Likely D','#2563EB','white'],['Lean D','#93C5FD','#1E3A8A'],['Tilt D','#BFDBFE','#1E3A8A']].map(([r,bg,tc]) => totals[r] > 0 && (
                <div key={r} className="rounded-lg px-2 py-1 text-center" style={{backgroundColor:bg,color:tc,minWidth:56}}>
                  <div className="text-lg font-bold">{totals[r]}</div>
                  <div className="text-xs whitespace-nowrap">{r}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bg-purple-900/60 rounded-xl px-8 py-4 text-center w-[160px] shadow-lg transition-transform duration-200 hover:scale-110 cursor-pointer" style={{ border: '2px solid white' }}>
          <div className="text-4xl font-bold text-purple-300">{tossUp}</div>
          <div className="text-purple-200/70 text-sm mt-1">Toss Up</div>
        </div>
        <div className="relative" onMouseEnter={() => setHoveredBubble('rep')} onMouseLeave={() => setHoveredBubble(null)}>
          <div className="bg-red-900/60 rounded-xl px-8 py-4 text-center w-[160px] shadow-lg transition-transform duration-200 hover:scale-110 cursor-pointer" style={{ border: '2px solid white' }}>
            <div className="text-4xl font-bold text-red-300">{repSeats}</div>
            <div className="text-red-200/70 text-sm mt-1">Republican</div>
          </div>
          {hoveredBubble === 'rep' && (
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 bg-black/90 border border-white/20 rounded-xl p-2 flex gap-2 shadow-xl">
              {[['Safe R','#7F1D1D','white'],['Likely R','#DC2626','white'],['Lean R','#FCA5A5','#7F1D1D'],['Tilt R','#FECACA','#7F1D1D']].map(([r,bg,tc]) => totals[r] > 0 && (
                <div key={r} className="rounded-lg px-2 py-1 text-center" style={{backgroundColor:bg,color:tc,minWidth:56}}>
                  <div className="text-lg font-bold">{totals[r]}</div>
                  <div className="text-xs whitespace-nowrap">{r}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <p className="text-white/60 text-xs text-center mb-4">
        Democrats need <span className="text-blue-300 font-semibold">218</span> seats for majority &nbsp;•&nbsp; Republicans need <span className="text-red-300 font-semibold">218</span> seats for majority
      </p>

      {/* Semicircle map */}
      <div className="relative w-full">
        <svg viewBox={`0 0 1000 ${CY + 20}`} className="w-full" style={{ minWidth: '320px' }}>
          {dots.map(({ x, y, seat }) => {
            const isHighlighted = !highlightRating || seat.rating === highlightRating;
            const isHovered = hovered === seat.key;
            return (
              <circle
                key={seat.key}
                cx={x}
                cy={y}
                r={isHovered ? dotR * 1.9 : dotR}
                fill={ratingColors[seat.rating]}
                stroke="white"
                strokeWidth={isHovered ? 1.8 : 0.6}
                opacity={isHighlighted ? 0.95 : 0.15}
                onMouseEnter={() => {
                  setHovered(seat.key);
                  setTooltip({ label: seat.key, rating: seat.rating, svgX: x, svgY: y });
                }}
                onMouseLeave={() => { setHovered(null); setTooltip(null); }}
                style={{ cursor: 'pointer', transition: 'r 0.1s' }}
              />
            );
          })}
          <line x1={CX} y1={svgH} x2={CX} y2={CY + 8} stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4,4" />
          <text x={CX - 80} y={CY + 18} fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="Inter,sans-serif">← Democrat</text>
          <text x={CX + 12} y={CY + 18} fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="Inter,sans-serif">Republican →</text>
        </svg>
        {/* Tooltip - constrained within this container */}
        {tooltip && (
          <div
            className="absolute z-50 pointer-events-none border border-white/40 rounded-xl shadow-xl"
            style={{
              left: `${Math.min(Math.max((tooltip.svgX / 1000) * 100, 12), 88)}%`,
              top: `${Math.max((tooltip.svgY / (CY + 20)) * 100 - 2, 0)}%`,
              transform: 'translate(-50%, -110%)',
              backgroundColor: 'rgba(0,0,0,0.92)',
              minWidth: 200,
              padding: '8px 14px'
            }}
          >
            <div className="text-white font-bold text-sm mb-1">{tooltip.label}</div>
            {houseIncumbents[tooltip.label] && (
              <div className="text-white/70 text-xs mb-1">{houseIncumbents[tooltip.label]}</div>
            )}
            {(() => {
              const exactPct = housePercentages[tooltip.label];
              const fallback = ratingApprox[tooltip.rating];
              const pct = exactPct || fallback;
              if (!pct) return null;
              const { d, r } = pct;
            })()}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {ratingOrder.map(r => (
          <button
            key={r}
            onMouseEnter={() => setHighlightRating(r)}
            onMouseLeave={() => setHighlightRating(null)}
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg transition-all"
            style={{ background: highlightRating === r ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            <span className="w-3 h-3 rounded-full border border-white/40" style={{ backgroundColor: ratingColors[r] }} />
            <span className="text-white/70 text-xs">{r}</span>
          </button>
        ))}
      </div>
    </div>
  );
}