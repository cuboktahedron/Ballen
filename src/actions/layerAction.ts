export type LayerActions = ChangeColorAction | ChangeNameAction | ToggleVisibleAction | DrawAction;

export const CHANGE_COLOR = "layer/changeColor";
export const CHANGE_NAME = "layer/changeName";
export const TOGGLE_VISIBLE = "layer/toggleVisible";
export const DRAW = "layer/draw";

export type ChangeColorAction = {
  type: typeof CHANGE_COLOR;
  payload: {
    color: string;
  };
};

export const changeColor = (color: string): ChangeColorAction => ({
  type: CHANGE_COLOR,
  payload: {
    color
  }
});

export type ChangeNameAction = {
  type: typeof CHANGE_NAME;
  payload: {
    name: string;
  };
};

export const changeName = (name: string): ChangeNameAction => ({
  type: CHANGE_NAME,
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
    imageData: ImageData;
  };
};
