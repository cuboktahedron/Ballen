import { Box, Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToolProperty } from "../../../actions/toolsAction";
import { ELLIPSE } from "../../../actions/tool/ellipse";
import { RootState } from "../../../store/store";
import {
  EllipseProperty,
  InitialEllipseProperty
} from "../../../store/tool/ellipseState";

export const ToolPropertyEllipse: React.FC = () => {
  const dispatch = useDispatch();
  const property = useSelector((state: RootState) => {
    const propertyState = state.tools.properties.get(
      ELLIPSE
    ) as EllipseProperty;
    return propertyState || InitialEllipseProperty;
  });

  const handleChangePositive = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.currentTarget.checked;
    dispatch(
      setToolProperty(ELLIPSE, {
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
              inputProps={{ "aria-label": "secondary checkbox" }}
              onChange={handleChangePositive}
            />
          }
          label="positive"
        />
      </FormGroup>
    </Box>
  );
};
