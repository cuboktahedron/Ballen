import { Box, Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToolProperty } from "../../../actions/toolsAction";
import { LINE } from "../../../actions/tool/line";
import { RootState } from "../../../store/store";
import {
  LineProperty,
  InitialLineProperty
} from "../../../store/tool/lineState";

export const ToolPropertyLine: React.FC = () => {
  const dispatch = useDispatch();
  const property = useSelector((state: RootState) => {
    const propertyState = state.tools.properties.get(LINE) as LineProperty;
    return propertyState || InitialLineProperty;
  });

  const handleChangePositive = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.currentTarget.checked;
    dispatch(
      setToolProperty(LINE, {
        ...property,
        positive: value
      })
    );
  };

  return (
    <Box>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={property.positive}
              value="secondary"
              color="primary"
              onChange={handleChangePositive}
            />
          }
          label="positive"
        />
      </FormGroup>
    </Box>
  );
};
