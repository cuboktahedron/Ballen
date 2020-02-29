import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ToolPropertyPencil } from "./toolProperty/ToolPropertyPencil";
import { PENCIL } from "../../actions/tool/pencil";
import { Box } from "@material-ui/core";

export const ToolProperty: React.FC = () => {
  const tools = useSelector((state: RootState) => state.tools);

  switch (tools.selectedType) {
    case PENCIL:
      return <ToolPropertyPencil />;
    default:
      return <Box />;
  }
};
