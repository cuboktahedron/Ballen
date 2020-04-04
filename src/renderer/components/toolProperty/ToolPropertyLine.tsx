import { Box, Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";
import { LINE } from "actions/tool/line";
import { changeToolProperty } from "actions/toolsAction";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "stores/rootState";
import { InitialLineProperty, LineProperty } from "stores/tool/lineState";

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
      changeToolProperty(LINE, {
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
