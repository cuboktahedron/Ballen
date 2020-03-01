import { Vector2D } from "ballen-core";

import { PENCIL } from "../../actions/tool/pencil";

export type PencilProperty = {
  thickness: number;
  positive: boolean;
};

export const InitialPencilProperty: PencilProperty = {
  thickness: 1,
  positive: false
};

export type ToolDrawStatePencil = {
  prevCoords?: Vector2D;
};

export type ToolStatePencil = {
  type: typeof PENCIL;
  property: PencilProperty;
};

export const InitialPencilState: ToolStatePencil = {
  type: PENCIL,
  property: InitialPencilProperty
};
