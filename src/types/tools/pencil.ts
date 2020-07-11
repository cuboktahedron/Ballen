import { Vector2D } from "utils/ballenCore";

export const PENCIL = "tool/pencil";

export type PencilProperty = {
  thickness: number;
  positive: boolean;
};

export type ToolStatePencil = {
  type: typeof PENCIL;
  property: PencilProperty;
};

export type ToolDrawStatePencil = {
  prevCoords?: Vector2D;
};
