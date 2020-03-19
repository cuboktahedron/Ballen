import { Box, Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeToolProperty } from "../../../actions/toolsAction";
import { FILLER } from "../../../actions/tool/filler";
import { RootState } from "../../../store/store";
import {
  FillerProperty,
  InitialFillerProperty
} from "../../../store/tool/fillerState";

export const ToolPropertyFiller: React.FC = () => {
  const dispatch = useDispatch();
  const property = useSelector((state: RootState) => {
    const propertyState = state.tools.properties.get(FILLER) as FillerProperty;
    return propertyState || InitialFillerProperty;
  });

  const handleChangePositive = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.currentTarget.checked;
    dispatch(
      changeToolProperty(FILLER, {
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
