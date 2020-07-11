import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import { IdProperty } from "types/filters";
import BallenDialog from "../BallenDialog";

export type FilterPropertyIdProps = IdProperty & {
  layerId: number;
  filterId: number;
  onClose: () => void;
};

const FilterPropertyId: React.FC<FilterPropertyIdProps> = props => {
  return (
    <div>
      <BallenDialog
        disableBackdropClick={true}
        open={true}
        onClose={props.onClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>Id filter settings</DialogTitle>
        <DialogContent>
          <DialogContentText>No Settings</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </BallenDialog>
    </div>
  );
};

export default FilterPropertyId;
