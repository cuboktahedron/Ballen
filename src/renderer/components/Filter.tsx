import {
  createMuiTheme,
  FormControl,
  IconButton,
  ListItem,
  MuiThemeProvider,
  NativeSelect,
  TextField,
  Tooltip
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import SettingsIcon from "@material-ui/icons/Settings";
import { changeFilter } from "actions/filterAction";
import { deleteFilter } from "actions/layerAction";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { LFT_ID } from "stores/filter/id";
import { LFT_OPACITY } from "stores/filter/opacity";
import { FilterState, FilterType } from "stores/filterState";
import FilterProperty from "./filterProperty/FilterProperty";

type FilterProps = FilterState & {
  layerId: number;
};

const theme = createMuiTheme({
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: "1em"
      }
    },
    MuiInputBase: {
      input: {
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }
  }
});

const Filter: React.FC<FilterProps> = props => {
  const dispatch = useDispatch();
  const [settingsOpened, setSettingsOpened] = React.useState(false);
  const [disableParamsToolTip, setDisableParamsToolTip] = useState<boolean>(
    true
  );
  let paramsRef: HTMLInputElement | null = null;

  const changeTypeHandler = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = e.currentTarget.value as FilterType;
    const type = props.property.type;

    if (type === value) {
      return;
    }

    if (value === LFT_ID) {
      dispatch(changeFilter(props.layerId, props.id, { type: LFT_ID }));
    } else if (value == LFT_OPACITY) {
      dispatch(
        changeFilter(props.layerId, props.id, {
          type: LFT_OPACITY,
          option: { opacity: 100 }
        })
      );
    }
  };

  const openSettingsHandler = (): void => {
    setSettingsOpened(true);
  };

  const settingsCloseHandler = (): void => {
    setSettingsOpened(false);
  };

  const deleteHandler = (): void => {
    dispatch(deleteFilter(props.layerId, props.id));
  };

  const handleParamsMouseEnter = (): void => {
    if (paramsRef === null) {
      setDisableParamsToolTip(false);
      return;
    }

    setDisableParamsToolTip(paramsRef.scrollWidth <= paramsRef.clientWidth);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <FilterProperty
        opened={settingsOpened}
        layerId={props.layerId}
        filterId={props.id}
        onClose={settingsCloseHandler}
        {...props.property}
      />
      <ListItem style={{ paddingTop: 0, paddingBottom: 0 }}>
        <FormControl>
          <NativeSelect
            value={props.property.type}
            onChange={changeTypeHandler}
            style={{ marginLeft: "8px" }}
          >
            <option value={LFT_ID}>id</option>
            <option value={LFT_OPACITY}>opacity</option>
          </NativeSelect>
        </FormControl>
        <Tooltip
          disableHoverListener={disableParamsToolTip}
          title={JSON.stringify(props.property)}
          style={{ fontSize: "2rem", color: "red" }}
        >
          <div style={{ marginLeft: "8px" }}>
            <TextField
              onMouseEnter={handleParamsMouseEnter}
              inputRef={(ref): void => {
                paramsRef = ref;
              }}
              InputProps={{
                readOnly: true
              }}
              value={props.property}
            ></TextField>
          </div>
        </Tooltip>
        <IconButton onClick={openSettingsHandler}>
          <SettingsIcon />
        </IconButton>
        <IconButton onClick={deleteHandler}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
    </MuiThemeProvider>
  );
};

export default Filter;
