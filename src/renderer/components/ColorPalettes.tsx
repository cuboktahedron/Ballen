import { Box, makeStyles, createStyles, Theme } from "@material-ui/core";
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      padding: theme.spacing(0.5)
    }
  })
);

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

  const classes = useStyles();

  return <Box className={classes.box}>{palettes}</Box>;
};
