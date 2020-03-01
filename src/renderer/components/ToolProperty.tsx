import { Box } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { FILLER } from "../../actions/tool/filler";
import { PENCIL } from "../../actions/tool/pencil";
import { RootState } from "../../store/store";
import { ToolPropertyFiller } from "./toolProperty/ToolPropertyFiller";
import { ToolPropertyPencil } from "./toolProperty/ToolPropertyPencil";

export const ToolProperty: React.FC = () => {
  const tools = useSelector((state: RootState) => state.tools);

  switch (tools.selectedType) {
    case PENCIL:
      return <ToolPropertyPencil />;
    case FILLER:
      return <ToolPropertyFiller />;
    default:
      return <Box />;
  }
};
