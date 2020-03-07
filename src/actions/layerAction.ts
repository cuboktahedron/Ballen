import { Vector2D } from "ballen-core";
import { LayersState } from "../store/layersState";
import { ToolsState } from "../store/toolsState";
import { drawBeginFiller, drawEndFiller, drawMiddleFiller, FILLER } from "./tool/filler";
import { drawBeginPencil, drawEndPencil, drawMiddlePencil, PENCIL } from "./tool/pencil";
import { drawBeginEllipse, drawMiddleEllipse, drawEndEllipse, ELLIPSE } from "./tool/ellipse";

export type LayerActions = SetColorAction | SetNameAction | ToggleVisibleAction | DrawAction;

export const SET_COLOR = "layer/setColor";
export const SET_NAME = "layer/setName";
export const TOGGLE_VISIBLE = "layer/toggleVisible";
export const DRAW = "layer/draw";

export type SetColorAction = {
  type: typeof SET_COLOR;
  payload: {
    color: string;
  };
};

export const setColor = (color: string): SetColorAction => ({
  type: SET_COLOR,
  payload: {
    color
  }
});

export type SetNameAction = {
  type: typeof SET_NAME;
  payload: {
    name: string;
  };
};

export const setName = (name: string): SetNameAction => ({
  type: SET_NAME,
  payload: {
    name
  }
});

export type ToggleVisibleAction = {
  type: typeof TOGGLE_VISIBLE;
  payload: {
    layerId: number;
  };
};

export const toggleVisible = (layerId: number): ToggleVisibleAction => ({
  type: TOGGLE_VISIBLE,
  payload: {
    layerId
  }
});

export type DrawAction = {
  type: typeof DRAW;
  payload: {
    layer: {
      layerId: number;
      imageData: ImageData;
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
    default:
      throw new Error(`undefined tool type specified ${props.tools.selectedType}`);
  }
};
