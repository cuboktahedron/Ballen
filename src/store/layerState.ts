export const LB_NORMAL = "normal";
export const LB_MULTIPLY = "multiply";

export type LayerBlend = typeof LB_NORMAL | typeof LB_MULTIPLY;

export type LayerState = {
  id: number;
  blend: LayerBlend;
  color: string;
  imageData: ImageData;
  name: string;
  visible: boolean;
};
