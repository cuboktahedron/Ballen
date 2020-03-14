import { Box, Grid } from "@material-ui/core";
import React from "react";
import { ColorPalettes } from "./ColorPalettes";
import Ellipse from "./tool/Ellipse";
import Filler from "./tool/Filler";
import Line from "./tool/Line";
import Pencil from "./tool/Pencil";
import Rectangle from "./tool/Rectangle";
import { ToolProperty } from "./ToolProperty";

const ToolBar: React.FC = () => {
  return (
    <Grid container alignItems="flex-start">
      <Grid item xs={6}>
        <Box>
          <Pencil />
          <Filler />
          <Ellipse />
          <Rectangle />
          <Line />
        </Box>
        <Box>
          <ToolProperty />
        </Box>
      </Grid>
      <Grid item xs={6}>
        <ColorPalettes />
      </Grid>
    </Grid>
  );
};

export default ToolBar;
