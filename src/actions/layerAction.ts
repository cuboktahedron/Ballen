import { Vector2D } from "ballen-core";
import { LayersState } from "stores/layersState";
import { ToolsState } from "stores/toolsState";
import { BallenAction } from "./actionTypes";
import { drawBeginEllipse, drawEndEllipse, drawMiddleEllipse, ELLIPSE } from "./tool/ellipse";
import { drawBeginFiller, drawEndFiller, drawMiddleFiller, FILLER } from "./tool/filler";
import { drawBeginLine, drawEndLine, drawMiddleLine, LINE } from "./tool/line";
import { drawBeginPencil, drawEndPencil, drawMiddlePencil, PENCIL } from "./tool/pencil";
import { drawBeginRectangle, drawEndRectangle, drawMiddleRectangle, RECTANGLE } from "./tool/rectangle";

export type LayerAction = {
  payload: {
    layerId: number;
  };
} & BallenAction;

export type LayerActions = ChangeColorAction | ChangeNameAction | ToggleVisibleAction | DrawAction;

export const CHANGE_COLOR = "layers/layer/changeColor";
export const CHANGE_NAME = "layers/layer/changeName";
export const TOGGLE_VISIBLE = "layers/layer/toggleVisible";
export const DRAW = "layers/layer/draw";

export type ChangeColorAction = {
  type: typeof CHANGE_COLOR;
  payload: {
    color: string;
  };
} & LayerAction;

export const changeColor = (layerId: number, color: string): ChangeColorAction => ({
  type: CHANGE_COLOR,
  payload: {
    layerId,
    record: false,
    color
  }
});

export type ChangeNameAction = {
  type: typeof CHANGE_NAME;
  payload: {
    name: string;
  };
} & LayerAction;

export const changeName = (layerId: number, name: string): ChangeNameAction => ({
  type: CHANGE_NAME,
  payload: {
    layerId,
    record: true,
    name
  }
});

export type ToggleVisibleAction = {
  type: typeof TOGGLE_VISIBLE;
  payload: {
    layerId: number;
  };
} & LayerAction;

export const toggleVisible = (layerId: number): ToggleVisibleAction => ({
  type: TOGGLE_VISIBLE,
  payload: {
    record: true,
    layerId
  }
});

export type DrawAction = {
  type: typeof DRAW;
  payload: {
    layerId: number;
    imageData: ImageData | null;
  };
} & BallenAction;

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
