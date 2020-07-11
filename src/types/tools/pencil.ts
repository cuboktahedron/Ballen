import { Vector2D } from "utils/ballen-core";

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
