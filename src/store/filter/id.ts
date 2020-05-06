import { FilterProperty } from "stores/filterState";

export const LFT_ID = "id";

export type IdProperty = {
  type: typeof LFT_ID;
} & FilterProperty;

export const InitialIdProperty: IdProperty = {
  type: LFT_ID
};
