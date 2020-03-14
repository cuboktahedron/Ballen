import { Box } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { ELLIPSE } from "../../actions/tool/ellipse";
import { FILLER } from "../../actions/tool/filler";
import { LINE } from "../../actions/tool/line";
import { PENCIL } from "../../actions/tool/pencil";
import { RECTANGLE } from "../../actions/tool/rectangle";
import { RootState } from "../../store/store";
import { ToolPropertyEllipse } from "./toolProperty/ToolPropertyEllipse";
import { ToolPropertyFiller } from "./toolProperty/ToolPropertyFiller";
import { ToolPropertyLine } from "./toolProperty/ToolPropertyLine";
import { ToolPropertyPencil } from "./toolProperty/ToolPropertyPencil";
import { ToolPropertyRectangle } from "./toolProperty/ToolPropertyRectangle";

export const ToolProperty: React.FC = () => {
  const tools = useSelector((state: RootState) => state.tools);

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
};
