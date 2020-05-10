import {
  FormControl,
  IconButton,
  ListItem,
  NativeSelect
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import SettingsIcon from "@material-ui/icons/Settings";
import { changeFilter } from "actions/filterAction";
import { deleteFilter } from "actions/layerAction";
import React from "react";
import { useDispatch } from "react-redux";
import { LFT_ID } from "stores/filter/id";
import { LFT_OPACITY } from "stores/filter/opacity";
import { FilterState, FilterType } from "stores/filterState";
import FilterProperty from "./filterProperty/FilterProperty";

type FilterProps = FilterState & {
  layerId: number;
};

const Filter: React.FC<FilterProps> = props => {
  const dispatch = useDispatch();
  const [settingsOpened, setSettingsOpened] = React.useState(false);

  const changeTypeHandler = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = e.currentTarget.value as FilterType;
    const type = props.property.type;

    if (type === value) {
      return;
    }

    // TODO: パラメータの設定方法は別途考える
    if (value === LFT_ID) {
      dispatch(changeFilter(props.layerId, props.id, { type: LFT_ID }));
    } else if (value == LFT_OPACITY) {
      dispatch(
        changeFilter(props.layerId, props.id, {
          type: LFT_OPACITY,
          option: { opacity: 50 }
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
    <div>
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
        <IconButton onClick={openSettingsHandler}>
          <SettingsIcon />
        </IconButton>
        <IconButton onClick={deleteHandler}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
    </div>
  );
};

export default Filter;
