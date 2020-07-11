import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { changeFilter } from "actions/filterAction";
import React from "react";
import { useDispatch } from "react-redux";
import { LFT_OPACITY, OpacityProperty } from "types/filters";
import BallenDialog from "../BallenDialog";

export type FilterPropertyOpacityProps = OpacityProperty & {
  layerId: number;
  filterId: number;
  onClose: () => void;
};

const FilterPropertyOpacity: React.FC<FilterPropertyOpacityProps> = props => {
  const dispatch = useDispatch();
  let opacityInput: HTMLInputElement;

  const doneSettingsHandler = (): void => {
    const property: OpacityProperty = {
      type: LFT_OPACITY,
      option: {
        opacity: +opacityInput.value
      }
    };

    dispatch(changeFilter(props.layerId, props.filterId, property));
    props.onClose();
  };

  const handleChangeOpacity = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const strValue = e.currentTarget.value;
    let value = parseInt(strValue);
    if (Number.isNaN(value)) {
      value = 0;
    } else if (value < 0) {
      value = 0;
    } else if (value > 100) {
      value = 100;
    }

    opacityInput.value = "" + value;
  };

  return (
    <div>
      <BallenDialog
        disableBackdropClick={true}
        open={true}
        onClose={props.onClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>Opacity filter settings</DialogTitle>
        <DialogContent>
          <TextField
            inputRef={(ref): void => {
              opacityInput = ref;

              const input = ref as HTMLInputElement;
              if (input == null) {
                return;
              }

              input.value = "" + props.option.opacity;
              input.select();
            }}
            type="number"
            onChange={handleChangeOpacity}
            style={{ marginLeft: "8px", width: "4rem" }}
          />
          {"%"}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={doneSettingsHandler} color="primary">
            Done
          </Button>
        </DialogActions>
      </BallenDialog>
    </div>
  );
};

export default FilterPropertyOpacity;
