import { Vector2D } from "ballen-core";

export type PencilParam = {
  thickness: number;
};

export const initialPencilParamState: PencilParam = {
  thickness: 1
};

export type ToolDrawStatePencil = {
  prevCoords?: Vector2D;
};
