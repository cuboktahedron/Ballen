import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import { IdProperty } from "stores/filter/id";

export type FilterPropertyIdProps = IdProperty & {
  layerId: number;
  filterId: number;
  onClose: () => void;
};

const FilterPropertyId: React.FC<FilterPropertyIdProps> = props => {
  return (
    <div>
      <Dialog open={true} aria-labelledby="form-dialog-title">
        <DialogTitle>Id filter settings</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <DialogContentText>No Settings</DialogContentText>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FilterPropertyId;
