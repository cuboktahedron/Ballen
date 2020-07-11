import { Vector2D } from "utils/ballen-core";
import { LayersState } from "stores/layersState";
import { ToolsState } from "stores/toolsState";
import { BallenAction } from "./actionTypes";
import { SaveData } from "./fileAction";
import { drawBegin, drawEnd, drawMiddle } from "./layerAction";
import { loadLayers, initLayers } from "./layersAction";
import { clearHistory } from "./rootAction";
import { changeDrawStateBegin, changeDrawStateEnd, changeDrawStateMiddle, moveCursor } from "./toolsAction";

export const BATCH = "batch";
export type BatchAction = {
  type: typeof BATCH;
  payload: {
    actions: BallenAction[];
  };
} & BallenAction;

export const batch = (...actions: BallenAction[]): BatchAction => {
  return {
    type: BATCH,
    payload: {
      actions
    }
  };
};

export const batchNewFile = (): BatchAction => {
  return batch(initLayers({ x: 580, y: 580 }), clearHistory(`New file`));
};

export const batchLoad = (loadData: SaveData, filename: string): BatchAction => {
  return batch(loadLayers(loadData.layers), clearHistory(`Load ${filename}`));
};

export type DrawBeginProps = {
  tools: ToolsState;
  layers: LayersState;
  event: {
    coords: Vector2D;
  };
};

export const batchDrawBegin = (drawProps: DrawBeginProps): BatchAction => {
  return batch(drawBegin(drawProps), changeDrawStateBegin(drawProps));
};

export type DrawMiddleProps = {
  tools: ToolsState;
  layers: LayersState;
  event: {
    coords: Vector2D;
  };
};

export const batchDrawMiddle = (drawProps: DrawMiddleProps): BatchAction => {
  return batch(drawMiddle(drawProps), changeDrawStateMiddle(drawProps), moveCursor(drawProps.event.coords));
};

export type DrawEndProps = {
  tools: ToolsState;
  layers: LayersState;
  event: {
    coords: Vector2D;
  };
};

export const batchDrawEnd = (drawProps: DrawEndProps): BatchAction => {
  return batch(drawEnd(drawProps), changeDrawStateEnd(drawProps));
};
