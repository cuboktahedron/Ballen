import { FilterProperties } from "stores/filterState";
import { LayerAction } from "./layerAction";

export type FilterAction = {
  payload: {
    filterId: number;
  };
} & LayerAction;

export type FilterActions = ChangeFilterAction;

export const CHANGE_FILTER = "layers/layer/filter/changeFilter";

export type ChangeFilterAction = {
  type: typeof CHANGE_FILTER;
  payload: {
    layerId: number;
    filterId: number;
    prop: FilterProperties;
  };
} & FilterAction;

export const changeFilter = (layerId: number, filterId: number, prop: FilterProperties): ChangeFilterAction => ({
  type: CHANGE_FILTER,
  payload: {
    layerId,
    filterId,
    prop,
    recordDescription: "Change layer filter"
  }
});
