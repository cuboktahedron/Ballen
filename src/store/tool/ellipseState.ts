import { ELLIPSE, EllipseProperty, ToolStateEllipse } from "types/tools/ellipse";

export const InitialEllipseProperty: EllipseProperty = {
  positive: false,
  fill: false
};

export const InitialEllipseState: ToolStateEllipse = {
  type: ELLIPSE,
  property: InitialEllipseProperty
};
