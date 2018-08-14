/**
 * Random Number between 2 numbers
 */
export function randomNumBetween(min, max) {
  return Math.random() * (max - min + 1) + min;
};

export const BAR_POSITION = 30;
export const BALL_RADIUS = 15;
export const BAR_HEIGHT = 10; 
export const BAR_WIDTH = 200;
export const WALL_WIDTH = 20;
export const POINTS_PER_COLLISION = 15;
