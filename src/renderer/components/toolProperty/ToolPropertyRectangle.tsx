import { Box, Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeToolProperty } from "../../../actions/toolsAction";
import { RECTANGLE } from "../../../actions/tool/rectangle";
import { RootState } from "../../../store/store";
import {
  RectangleProperty,
  InitialRectangleProperty
} from "../../../store/tool/rectangleState";

export const ToolPropertyRectangle: React.FC = () => {
  const dispatch = useDispatch();
  const property = useSelector((state: RootState) => {
    const propertyState = state.tools.properties.get(
      RECTANGLE
    ) as RectangleProperty;
    return propertyState || InitialRectangleProperty;
  });

  const handleChangeCheckBox = (
    propName: string
  ): ((e: React.ChangeEvent<HTMLInputElement>) => void) => {
    return (e: React.ChangeEvent<HTMLInputElement>): void => {
      const value = e.currentTarget.checked;
      const props = { ...property };
      props[propName] = value;

      dispatch(changeToolProperty(RECTANGLE, props));
    };
  };

  const handleChangePositive = handleChangeCheckBox("positive");
  const handleChangeFill = handleChangeCheckBox("fill");

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
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={property.fill}
              value="secondary"
              color="primary"
              onChange={handleChangeFill}
            />
          }
          label="fill"
        />
      </FormGroup>
    </Box>
  );
};
