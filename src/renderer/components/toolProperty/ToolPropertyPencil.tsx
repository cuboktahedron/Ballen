import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField
} from "@material-ui/core";
import { PENCIL } from "actions/tool/pencil";
import { changeToolProperty } from "actions/toolsAction";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "stores/rootState";
import { InitialPencilProperty, PencilProperty } from "stores/tool/pencilState";
import { validateNumber } from "renderer/lib/validator";

export const ToolPropertyPencil: React.FC = () => {
  const dispatch = useDispatch();
  const property = useSelector((state: RootState) => {
    const propertyState = state.tools.properties.get(PENCIL) as PencilProperty;
    return propertyState || InitialPencilProperty;
  });

  const handleChangeThickness = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.currentTarget.value;
    if (validateNumber(value, { required: true, min: 1, max: 100 })) {
      dispatch(
        changeToolProperty(PENCIL, {
          ...property,
          thickness: parseInt(value)
        })
      );
    }
  };

  const handleChangePositive = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.currentTarget.checked;
    dispatch(
      changeToolProperty(PENCIL, {
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
              checked={property.positive}
              color="primary"
              onChange={handleChangePositive}
            />
          }
          label="positive"
        />
      </FormGroup>
      <TextField
        type="number"
        label="thickness"
        disabled={true}
        value={property.thickness}
        onChange={handleChangeThickness}
      />
    </Box>
  );
};
