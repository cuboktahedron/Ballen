import { LayerBlend } from "types/layerBlend";
import { Vector2D } from "utils/ballenCore";
import { FilterInfo } from "./filters";

export type LayerInfo<T extends FilterInfo> = {
  id: number;
  blend: LayerBlend;
  color: string;
  filterIdSequence: number;
  filters: T[];
  imageData: ImageData;
  name: string;
  visible: boolean;
};

export type LayersInfo = {
  layers: LayerInfo<FilterInfo>[];
  size: Vector2D;
};
