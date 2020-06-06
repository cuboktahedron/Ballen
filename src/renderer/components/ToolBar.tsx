import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { ColorPalettes } from "./ColorPalettes";
import Ellipse from "./tool/Ellipse";
import Filler from "./tool/Filler";
import Line from "./tool/Line";
import Pencil from "./tool/Pencil";
import Rectangle from "./tool/Rectangle";
import { ToolProperty } from "./ToolProperty";
import ToolPanel from "./ToolPanel";
import Layers from "./Layers";
import Histories from "./Histories";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(0)
    }
  })
);

const ToolBar: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <ToolPanel title="Tool">
        <Box>
          <Pencil />
          <Filler />
          <Ellipse />
          <Rectangle />
          <Line />
        </Box>
        <ToolProperty />
      </ToolPanel>
      <ToolPanel title="Color">
        <ColorPalettes />
      </ToolPanel>
      <ToolPanel title="Layer">
        <Layers />
      </ToolPanel>
      <ToolPanel title="History">
        <Histories />
      </ToolPanel>
    </Box>
  );
};

export default ToolBar;
