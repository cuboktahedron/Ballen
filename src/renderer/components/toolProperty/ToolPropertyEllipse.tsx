import { Box, Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";
import { changeToolProperty } from "actions/toolsAction";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "stores/rootState";
import { InitialEllipseProperty } from "stores/tool/ellipseState";
import { ELLIPSE, EllipseProperty } from "types/tools/ellipse";

export const ToolPropertyEllipse: React.FC = () => {
  const dispatch = useDispatch();
  const property = useSelector((state: RootState) => {
    const propertyState = state.tools.properties.get(
      ELLIPSE
    ) as EllipseProperty;
    return propertyState || InitialEllipseProperty;
  });

  const handleChangeCheckBox = (
    propName: string
  ): ((e: React.ChangeEvent<HTMLInputElement>) => void) => {
    return (e: React.ChangeEvent<HTMLInputElement>): void => {
      const value = e.currentTarget.checked;
      const props = { ...property };
      props[propName] = value;

      dispatch(changeToolProperty(ELLIPSE, props));
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
              checked={property.positive}
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
              checked={property.fill}
              color="primary"
              value="secondary"
              onChange={handleChangeFill}
            />
          }
          label="fill"
        />
      </FormGroup>
    </Box>
  );
};
