import { GuideLayerState } from "stores/guideLayerState";
import { ToolsState } from "stores/toolsState";
import { drawGuideEllipse, ELLIPSE } from "./tool/ellipse";
import { drawGuideFiller, FILLER } from "./tool/filler";
import { drawGuideLine, LINE } from "./tool/line";
import { drawGuidePencil, PENCIL } from "./tool/pencil";
import { drawGuideRectangle, RECTANGLE } from "./tool/rectangle";
import { BallenAction } from "./actionTypes";

export type GuideLayerActions = ClearGuideAction | DrawGuideAction;

export const CLEAR_GUIDE = "guideLayer/clearGuide";
export const DRAW_GUIDE = "guideLayer/drawGuide";

export type ClearGuideAction = {
  type: typeof CLEAR_GUIDE;
} & BallenAction;

export const clearGuide = (): ClearGuideAction => {
  return {
    type: CLEAR_GUIDE,
    payload: {
      record: false
    }
  };
};

export type DrawGuideAction = {
  type: typeof DRAW_GUIDE;
  payload: {
    imageData: ImageData | null;
  };
} & BallenAction;

export type DrawGuideProps = {
  tools: ToolsState;
  guideLayer: GuideLayerState;
};

export const drawGuide = (props: DrawGuideProps): DrawGuideAction => {
  switch (props.tools.selectedType) {
    case PENCIL:
      return drawGuidePencil(props);
    case FILLER:
      return drawGuideFiller(props);
    case ELLIPSE:
      return drawGuideEllipse(props);
    case RECTANGLE:
      return drawGuideRectangle(props);
    case LINE:
      return drawGuideLine(props);
    default:
      throw new Error(`undefined tool type specified ${props.tools.selectedType}`);
  }
};
