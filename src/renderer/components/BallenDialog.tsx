import { Dialog, DialogProps } from "@material-ui/core";
import { closeDialog, openDialog } from "actions/dialogAction";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const BallenDialog: React.FC<DialogProps> = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.open) {
      dispatch(openDialog());
    }

    return (): void => {
      dispatch(closeDialog());
    };
  }, [props.open]);

  return <Dialog {...props} />;
};

export default BallenDialog;
