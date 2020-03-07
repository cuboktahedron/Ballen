import { Grid, Box } from "@material-ui/core";
import React from "react";
import Pencil from "./tool/Pencil";
import { ColorPalettes } from "./ColorPalettes";
import Filler from "./tool/Filler";
import { ToolProperty } from "./ToolProperty";
import Ellipse from "./tool/Ellipse";

const ToolBar: React.FC = () => {
  return (
    <Grid container alignItems="flex-start">
      <Grid item xs={6}>
        <Box>
          <Pencil />
          <Filler />
          <Ellipse />
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
