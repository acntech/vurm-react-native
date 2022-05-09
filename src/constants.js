export const NUM_COLUMNS = 30;
export const NUM_ROWS = 30;
export const MIN_TICK_INTERVAL_MS = Math.floor((1 / 60) * 1000);
export const GAME_TITLE = "Vurm";
export const DIFFICULTIES_TO_TICK_INTERVAL_MS = new Map([
  ["Analyst", MIN_TICK_INTERVAL_MS * 30],
  ["Senior Analyst", MIN_TICK_INTERVAL_MS * 4],
  ["Associate", MIN_TICK_INTERVAL_MS * 3],
  ["BAWS", MIN_TICK_INTERVAL_MS * 2],
]);
