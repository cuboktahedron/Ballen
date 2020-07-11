export type Vector2D = { x: number; y: number };

export const sleep = (msec: number): Promise<void> => new Promise(resolve => setTimeout(resolve, msec));
