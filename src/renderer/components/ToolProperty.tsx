import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "stores/rootState";
import { ELLIPSE } from "types/tools/ellipse";
import { FILLER } from "types/tools/filler";
import { LINE } from "types/tools/line";
import { PENCIL } from "types/tools/pencil";
import { RECTANGLE } from "types/tools/rectangle";
import { ToolPropertyEllipse } from "./toolProperty/ToolPropertyEllipse";
import { ToolPropertyFiller } from "./toolProperty/ToolPropertyFiller";
import { ToolPropertyLine } from "./toolProperty/ToolPropertyLine";
import { ToolPropertyPencil } from "./toolProperty/ToolPropertyPencil";
import { ToolPropertyRectangle } from "./toolProperty/ToolPropertyRectangle";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1)
    }
  })
);

export const ToolProperty: React.FC = () => {
  const tools = useSelector((state: RootState) => state.tools);

  const property = ((): ReactNode => {
    switch (tools.selectedType) {
      case PENCIL:
        return <ToolPropertyPencil />;
      case FILLER:
        return <ToolPropertyFiller />;
      case ELLIPSE:
        return <ToolPropertyEllipse />;
      case RECTANGLE:
        return <ToolPropertyRectangle />;
      case LINE:
        return <ToolPropertyLine />;
      default:
        return <Box />;
    }
  })();

  const classes = useStyles();

  return <Box className={classes.root}>{property}</Box>;
};
