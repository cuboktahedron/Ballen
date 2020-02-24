import { Grid } from "@material-ui/core";
import React from "react";
import {
  amber,
  blue,
  blueGrey,
  brown,
  green,
  grey,
  lime,
  orange,
  pink,
  purple,
  red,
  yellow
} from "@material-ui/core/colors";
import { ColorPalette } from "./ColorPalette";

export const ColorPalettes: React.FC = () => {
  const colors = [
    amber,
    blue,
    blueGrey,
    brown,
    green,
    grey,
    lime,
    orange,
    pink,
    purple,
    red,
    yellow
  ];

  const allColors = colors.flatMap(color => {
    return [color.A100, color.A200, color.A400, color.A700];
  });

  const palettes = allColors.map((color, index) => {
    return <ColorPalette key={index} color={color} />;
  });

  return (
    <Grid item xs={12}>
      {palettes}
    </Grid>
  );
};
