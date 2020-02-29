import { Vector2D } from "ballen-core";

import { PENCIL } from "../../actions/tool/pencil";

export type PencilParam = {
  thickness: number;
};

export const InitialPencilParam: PencilParam = {
  thickness: 1
};

export type ToolDrawStatePencil = {
  prevCoords?: Vector2D;
};

export type ToolStatePencil = {
  type: typeof PENCIL;
  param: PencilParam;
};

export const InitialPencilState: ToolStatePencil = {
  type: PENCIL,
  param: InitialPencilParam
};
