import { PENCIL, PencilProperty } from "types/tools/pencil";

export const InitialPencilProperty: PencilProperty = {
  thickness: 1,
  positive: false
};

export type ToolStatePencil = {
  type: typeof PENCIL;
  property: PencilProperty;
};

export const InitialPencilState: ToolStatePencil = {
  type: PENCIL,
  property: InitialPencilProperty
};
