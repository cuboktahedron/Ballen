export const LFT_ID = "id";
export const LFT_OPACITY = "opacity";

export type IdProperty = {
  type: typeof LFT_ID;
} & FilterProperty;

export type OpacityProperty = {
  type: typeof LFT_OPACITY;
  option: {
    opacity: number;
  };
} & FilterProperty;

export type FilterType = string;

export type FilterProperty = {
  type: FilterType;
};

export type FilterProperties = IdProperty | OpacityProperty;
