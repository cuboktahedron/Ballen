import { ToolsState } from "../store/toolsState";
import { PENCIL, drawGuidePencil } from "./tool/pencil";
import { FILLER, drawGuideFiller } from "./tool/filler";
import { ELLIPSE, drawGuideEllipse } from "./tool/ellipse";
import { RECTANGLE, drawGuideRectangle } from "./tool/rectangle";
import { LINE, drawGuideLine } from "./tool/line";
import { GuideLayerState } from "../store/guideLayerState";

export type GuideLayerActions = ClearGuideAction | DrawGuideAction;

export const CLEAR_GUIDE = "guideLayer/clearGuide";
export const DRAW_GUIDE = "guideLayer/drawGuide";

export type ClearGuideAction = {
  type: typeof CLEAR_GUIDE;
};

export const clearGuide = (): ClearGuideAction => {
  return {
    type: CLEAR_GUIDE
  };
};

export type DrawGuideAction = {
  type: typeof DRAW_GUIDE;
  payload: {
    imageData: ImageData | null;
  };
};

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