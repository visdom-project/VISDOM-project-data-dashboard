export const TYPE_MAPPING = {
  passed: "Passed",
  pointsToPass: "Points to pass",
  submission: "Number of submissions",
  commit: "Number of commits",
  maxPoints: "Max points",
  notPassedPoints: "Missed points",
  points: "Points",
  numberOfExercisesAttemped: "Number of exercises attemped",
  numberOfExercises: "Number of exercises",
  pointRatio: "Points ratio",
  notPassedRatio: "Missed points ratio",
  expectedPoints: "Expected points",
};

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

export const DATA_TYPES = [
  "passed",
  "pointsToPass",
  "submission",
  "commit",
  "maxPoints",
  "notPassedPoints",
  "points",
  "numberOfExercisesAttemped",
  "numberOfExercises",
  "pointRatio",
  "notPassedRatio",
  "expectedPoints",
];

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

export const REVERSE_TYPE_MAPPING = ((map) => {
  const newObj = {};
  Object.entries(map).forEach((pair) => {
    newObj[pair[1]] = pair[0];
  });
  return newObj;
})(TYPE_MAPPING);

export const REVERSE_TYPE_MAPPING_PROJECT = ((map) => {
  console.log(map);
  const newObj = {};
  Object.entries(map).forEach((pair) => {
    newObj[pair[1]] = pair[0];
  });
  return newObj;
})(PROJECT_TYPE_MAPPING);

export const EXPECTED_TYPE_MAPPING = {
  pointsToPass: "pointsToPass",
  maxPoints: "maxPoints",
  submission: "expectedSubmissions",
  commit: "expectedCommit",
  points: "expectedPoints",
  expectedPoints: "expectedPoints",
  notPassedPoints: "expectedNotPassPoints",
  numberOfExercises: "numberOfExercises",
  numberOfExercisesAttemped: "expectedExercises",
  pointRatio: "expectedPointRatio",
  notPassedRatio: "expectedNotPassRatio",
};

export const OPTIONS_MAP = {
  type: Object.values(TYPE_MAPPING),
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
