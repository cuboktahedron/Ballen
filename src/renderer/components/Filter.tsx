import {
  createMuiTheme,
  FormControl,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  MuiThemeProvider,
  NativeSelect
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import SettingsIcon from "@material-ui/icons/Settings";
import { changeFilter } from "actions/filterAction";
import { deleteFilter } from "actions/layerAction";
import React from "react";
import { useDispatch } from "react-redux";
import { FilterState } from "stores/filterState";
import { FilterType, LFT_ID, LFT_OPACITY } from "types/filters";
import FilterProperty from "./filterProperty/FilterProperty";
import FilterPropertyName from "./FilterPropertyName";

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
          >
            <option value={LFT_ID}>id</option>
            <option value={LFT_OPACITY}>opacity</option>
          </NativeSelect>
        </FormControl>
        <FilterPropertyName {...props.property} />
        <ListItemSecondaryAction>
          <IconButton size="small" onClick={openSettingsHandler}>
            <SettingsIcon />
          </IconButton>
          <IconButton size="small" onClick={deleteHandler}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </MuiThemeProvider>
  );
};

export default Filter;
