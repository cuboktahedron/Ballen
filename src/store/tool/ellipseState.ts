import { ELLIPSE, EllipseProperty } from "types/tools/ellipse";

export const InitialEllipseProperty: EllipseProperty = {
  positive: false,
  fill: false
};

export type ToolStateEllipse = {
  type: typeof ELLIPSE;
  property: EllipseProperty;
};

export const InitialEllipseState: ToolStateEllipse = {
  type: ELLIPSE,
  property: InitialEllipseProperty
};
