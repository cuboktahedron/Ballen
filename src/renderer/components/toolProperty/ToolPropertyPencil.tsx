import { Box, TextField } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { validateNumber } from "../../lib/validator";
import { setToolParam } from "../../../actions/toolsAction";
import { PENCIL } from "../../../actions/tool/pencil";
import {
  PencilParam,
  InitialPencilParam
} from "../../../store/tool/pencilState";

export const ToolPropertyPencil: React.FC = () => {
  const dispatch = useDispatch();
  const param = useSelector((state: RootState) => {
    const paramState = state.tools.params[PENCIL] as PencilParam;
    return paramState || InitialPencilParam;
  });

  const handleChangeThickness = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.currentTarget.value;
    if (validateNumber(value, { required: true, min: 1, max: 100 })) {
      dispatch(
        setToolParam(PENCIL, {
          ...param,
          thickness: parseInt(value)
        })
      );
    }
  };

  return (
    <Box>
      <TextField
        type="number"
        label="thickness"
        value={param.thickness}
        onChange={handleChangeThickness}
      />
    </Box>
  );
};
