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
    imageData: ImageData;
  };
};
