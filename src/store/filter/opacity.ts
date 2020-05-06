import { FilterProperty } from "stores/filterState";

export const LFT_OPACITY = "opacity";

export type OpacityProperty = {
  type: typeof LFT_OPACITY;
  option: {
    opacity: number;
  };
} & FilterProperty;

export const InitialOpacityProperty: OpacityProperty = {
  type: LFT_OPACITY,
  option: {
    opacity: 100
  }
};
