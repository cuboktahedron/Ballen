import { ToolState } from "../store/toolState";
import { PENCIL, drawBeginPencil, drawEndPencil, drawMiddlePencil } from "./tool/pencil";
import { LayersState } from "../store/layersState";
import { Vector2D } from "ballen-core";
import { FILLER, drawEndFiller, drawMiddleFiller, drawBeginFiller } from "./tool/filler";

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
  tool: ToolState;
  layers: LayersState;
  event: {
    coords: Vector2D;
  };
};

export const drawBegin = (props: DrawBeginProps): DrawAction => {
  switch (props.tool.type) {
    case PENCIL:
      return drawBeginPencil(props);
    case FILLER:
      return drawBeginFiller(props);
    default:
      throw new Error(`undefined tool type specified ${props.tool.type}`);
  }
};

export type DrawMiddleProps = {
  tool: ToolState;
  layers: LayersState;
  event: {
    coords: Vector2D;
  };
};

export const drawMiddle = (props: DrawMiddleProps): DrawAction => {
  switch (props.tool.type) {
    case PENCIL:
      return drawMiddlePencil(props);
    case FILLER:
      return drawMiddleFiller(props);
    default:
      throw new Error(`undefined tool type specified ${props.tool.type}`);
  }
};

export type DrawEndProps = {
  tool: ToolState;
  layers: LayersState;
  event: {
    coords: Vector2D;
  };
};

export const drawEnd = (props: DrawEndProps): DrawAction => {
  switch (props.tool.type) {
    case PENCIL:
      return drawEndPencil(props);
    case FILLER:
      return drawEndFiller(props);
    default:
      throw new Error(`undefined tool type specified ${props.tool.type}`);
  }
};
