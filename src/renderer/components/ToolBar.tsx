import { Grid } from "@material-ui/core";
import React from "react";
import Pencil from "./tool/Pencil";
import { ColorPalettes } from "./ColorPalettes";
import Filler from "./tool/Filler";

const ToolBar: React.FC = () => {
  return (
    <Grid container alignItems="flex-start">
      <Grid item xs={6}>
        <Pencil />
        <Filler />
      </Grid>
      <Grid item xs={6}>
        <ColorPalettes />
      </Grid>
    </Grid>
  );
};

export default ToolBar;
