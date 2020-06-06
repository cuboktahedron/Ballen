import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import { ELLIPSE } from "actions/tool/ellipse";
import { FILLER } from "actions/tool/filler";
import { LINE } from "actions/tool/line";
import { PENCIL } from "actions/tool/pencil";
import { RECTANGLE } from "actions/tool/rectangle";
import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "stores/rootState";
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
