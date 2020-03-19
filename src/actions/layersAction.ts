import { Vector2D } from "ballen-core";
import { LayersState } from "../store/layersState";
import { ToolsState } from "../store/toolsState";
import { drawBeginEllipse, drawEndEllipse, drawMiddleEllipse, ELLIPSE } from "./tool/ellipse";
import { drawBeginFiller, drawEndFiller, drawMiddleFiller, FILLER } from "./tool/filler";
import { drawBeginLine, drawEndLine, drawMiddleLine, LINE } from "./tool/line";
import { drawBeginPencil, drawEndPencil, drawMiddlePencil, PENCIL } from "./tool/pencil";
import { drawBeginRectangle, drawEndRectangle, drawMiddleRectangle, RECTANGLE } from "./tool/rectangle";

export type LayersActions = ChangeActiveLayerAction | AddLayerAction | DeleteLayerAction | DrawAction;

export const CHANGE_ACTIVE_LAYER = "layers/changeActiveLayer";
export const ADD_LAYER = "layers/addLayer";
export const DELETE_LAYER = "layers/deleteLayer";
export const DRAW = "layers/draw";

export type ChangeActiveLayerAction = {
  type: typeof CHANGE_ACTIVE_LAYER;
  payload: {
    layerId: number;
  };
};

export const changeActiveLayer = (layerId: number): ChangeActiveLayerAction => ({
  type: CHANGE_ACTIVE_LAYER,
  payload: {
    layerId
  }
});

export type AddLayerAction = {
  type: typeof ADD_LAYER;
};

export const addLayer = (): AddLayerAction => ({
  type: ADD_LAYER
});

export type DeleteLayerAction = {
  type: typeof DELETE_LAYER;
  payload: {
    layerId: number;
  };
};

export const deleteLayer = (layerId: number): DeleteLayerAction => ({
  type: DELETE_LAYER,
  payload: {
    layerId
  }
});

export type DrawAction = {
  type: typeof DRAW;
  payload: {
    layer: {
      layerId: number;
      imageData: ImageData | null;
    };
  };
};

export type DrawBeginProps = {
  tools: ToolsState;
  layers: LayersState;
  event: {
    coords: Vector2D;
  };
};

export const drawBegin = (props: DrawBeginProps): DrawAction => {
  switch (props.tools.selectedType) {
    case PENCIL:
      return drawBeginPencil(props);
    case FILLER:
      return drawBeginFiller(props);
    case ELLIPSE:
      return drawBeginEllipse(props);
    case RECTANGLE:
      return drawBeginRectangle(props);
    case LINE:
      return drawBeginLine(props);
    default:
      throw new Error(`undefined tool type specified ${props.tools.selectedType}`);
  }
};

export type DrawMiddleProps = {
  tools: ToolsState;
  layers: LayersState;
  event: {
    coords: Vector2D;
  };
};

export const drawMiddle = (props: DrawMiddleProps): DrawAction => {
  switch (props.tools.selectedType) {
    case PENCIL:
      return drawMiddlePencil(props);
    case FILLER:
      return drawMiddleFiller(props);
    case ELLIPSE:
      return drawMiddleEllipse(props);
    case RECTANGLE:
      return drawMiddleRectangle(props);
    case LINE:
      return drawMiddleLine(props);
    default:
      throw new Error(`undefined tool type specified ${props.tools.selectedType}`);
  }
};

export type DrawEndProps = {
  tools: ToolsState;
  layers: LayersState;
  event: {
    coords: Vector2D;
  };
};

export const drawEnd = (props: DrawEndProps): DrawAction => {
  switch (props.tools.selectedType) {
    case PENCIL:
      return drawEndPencil(props);
    case FILLER:
      return drawEndFiller(props);
    case ELLIPSE:
      return drawEndEllipse(props);
    case RECTANGLE:
      return drawEndRectangle(props);
    case LINE:
      return drawEndLine(props);
    default:
      throw new Error(`undefined tool type specified ${props.tools.selectedType}`);
  }
};
