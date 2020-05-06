import { IdProperty } from "./filter/id";
import { OpacityProperty } from "./filter/opacity";

export type FilterType = string;

export type FilterProperty = {
  type: FilterType;
};

export type FilterProperties = IdProperty | OpacityProperty;

export type FilterState = {
  id: number;
  name: string;
  property: FilterProperties;
};
