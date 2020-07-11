import { ToolDrawInfo, ToolProperty } from "types/tools/tools";
import { Vector2D } from "utils/ballenCore";
import { BallenAction } from "./actionTypes";
import { SaveData } from "./fileAction";
import { drawBegin, drawEnd, drawMiddle } from "./layerAction";
import { initLayers, loadLayers } from "./layersAction";
import { clearHistory } from "./rootAction";
import { changeDrawInfoBegin, changeDrawInfoEnd, changeDrawInfoMiddle, moveCursor, ToolType } from "./toolsAction";

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
  tools: {
    selectedType: ToolType;
    drawInfo: ToolDrawInfo;
    property: ToolProperty;
  };
  layer: {
    id: number;
    imageData: ImageData;
  };
  event: {
    coords: Vector2D;
  };
};

export const batchDrawBegin = (drawProps: DrawBeginProps): BatchAction => {
  return batch(drawBegin(drawProps), changeDrawInfoBegin(drawProps));
};

export type DrawMiddleProps = {
  tools: {
    selectedType: ToolType;
    drawInfo: ToolDrawInfo;
    property: ToolProperty;
  };
  layer: {
    id: number;
    imageData: ImageData;
  };
  event: {
    coords: Vector2D;
  };
};

export const batchDrawMiddle = (drawProps: DrawMiddleProps): BatchAction => {
  return batch(drawMiddle(drawProps), changeDrawInfoMiddle(drawProps), moveCursor(drawProps.event.coords));
};

export type DrawEndProps = {
  tools: {
    selectedType: ToolType;
    drawInfo: ToolDrawInfo;
    property: ToolProperty;
  };
  layer: {
    id: number;
    imageData: ImageData;
  };
  event: {
    coords: Vector2D;
  };
};

export const batchDrawEnd = (drawProps: DrawEndProps): BatchAction => {
  return batch(drawEnd(drawProps), changeDrawInfoEnd(drawProps));
};
