import { TextField, TextFieldProps } from "@material-ui/core";
import React from "react";

const BallenTextField: React.FC<TextFieldProps> = props => {
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>): void => {
    e.target.select();
  };

  return <TextField onFocus={handleFocus} {...props} />;
};

export default BallenTextField;
