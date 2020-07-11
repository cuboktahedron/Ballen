import { LayerBlend } from "types/layerBlend";
import { FilterState } from "./filterState";

export type LayerState = {
  id: number;
  blend: LayerBlend;
  color: string;
  filterIdSequence: number;
  filters: FilterState[];
  imageData: ImageData;
  name: string;
  visible: boolean;
};
