import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { IdProperty, LFT_ID } from "stores/filter/id";
import { useDispatch } from "react-redux";
import { changeFilter } from "actions/filterAction";

export type FilterPropertyIdProps = IdProperty & {
  layerId: number;
  filterId: number;
  onClose: () => void;
};

const FilterPropertyId: React.FC<FilterPropertyIdProps> = props => {
  const dispatch = useDispatch();

  const doneSettingsHandler = (): void => {
    const property: IdProperty = {
      type: LFT_ID
    };

    dispatch(changeFilter(props.layerId, props.filterId, property));
    props.onClose();
  };

  return (
    <div>
      <Dialog open={true} aria-labelledby="form-dialog-title">
        <DialogTitle>Id filter settings</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <DialogContentText>This is ID Filter</DialogContentText>
          </DialogContentText>
          <TextField label="Name" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={doneSettingsHandler} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FilterPropertyId;
