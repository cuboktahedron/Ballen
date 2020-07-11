import { PENCIL, PencilProperty, ToolStatePencil } from "types/tools/pencil";

export const InitialPencilProperty: PencilProperty = {
  thickness: 1,
  positive: false
};

export const InitialPencilState: ToolStatePencil = {
  type: PENCIL,
  property: InitialPencilProperty
};
