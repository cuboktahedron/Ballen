import { Vector2D } from "utils/ballenCore";

export const PENCIL = "tool/pencil";

export type PencilProperty = {
  thickness: number;
  positive: boolean;
};

export type ToolDrawInfoPencil = {
  prevCoords?: Vector2D;
};
