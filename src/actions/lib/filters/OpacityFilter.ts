import { OpacityProperty } from "stores/filter/opacity";
import Color from "../Color";
import Graphics from "../Graphics";

export const filterOpacity = (g: Graphics, prop: OpacityProperty): void => {
  const alphaWeight = prop.option.opacity / 100;

  for (let y = 0; y < g.height; y++) {
    for (let x = 0; x < g.width; x++) {
      const color = g.color(x, y) as Color;
      color.a = Math.round(color.a * alphaWeight);
      g.dot(x, y, color);
    }
  }
};
