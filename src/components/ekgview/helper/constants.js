// Copyright 2022 Tampere University
// This software was developed as a part of the VISDOM project: https://iteavisdom.org/
// This source code is licensed under the MIT license. See LICENSE in the repository root directory.
// Author(s): Duc Hong <duc.hong@tuni.fi>, Nhi Tran <thuyphuongnhi.tran@tuni.fi>, Sulav Rayamajhi<sulav.rayamajhi@tuni.fi>, Ville Heikkilä <ville.heikkila@tuni.fi>, Vivian Lunnikivi <vivian.lunnikivi@tuni.fi>

export const PROJECT_TYPE_MAPPING = {
  averageAdditions: "Average additions",
  averageTimePerIssue: "Average time per issue",
  bugs: "Bugs",
  codeSmells: "Code smells",
  averageDeletions: "Average deletions",
  averageFileChanged: "Average files changed",
  majorViolation: "Major violation",
  totalIssues: "Total issues",
  totalCommits: "Total commits",
  criticalViolation: "Critical violation",
  // totalResolveTime: "Total resolve time"
};

export const PROJECT_DATA_TYPES = [
  "averageAdditions",
  "averageTimePerIssue",
  "bugs",
  "codeSmells",
  "averageDeletions",
  "averageFileChanged",
  "majorViolation",
  "totalIssues",
  "totalCommits",
  "criticalViolation",
  // "totalResolveTime"
];

export const REVERSE_TYPE_MAPPING_PROJECT = ((map) => {
  const newObj = {};
  Object.entries(map).forEach((pair) => {
    newObj[pair[1]] = pair[0];
  });
  return newObj;
})(PROJECT_TYPE_MAPPING);

export const PROJECT_OPTIONS_MAP = {
  type: Object.values(PROJECT_TYPE_MAPPING),
  value: ["absolute", "relative", "expected ratio"],
  direction: ["up", "down", "horizontal"],
  shape: ["triangle", "pulse", "rectangle"],
  color: [
    "#000000",
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#cddc39",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
    "#ff5722",
  ],
  colorFilled: [
    "#ffffff",
    "#000000",
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#cddc39",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
    "#ff5722",
  ],
  resetZero: ["yes", "no"],
  scaleFactor: [],
};
