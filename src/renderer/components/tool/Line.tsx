import { createStyles, IconButton, makeStyles, Theme } from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LINE as ToolTypeLine } from "../../../actions/tool/line";
import { changeTool } from "../../../actions/toolsAction";
import { RootState } from "../../../store/store";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selected: {
      color: theme.palette.primary.dark
    },

    notSelected: {
      color: theme.palette.primary.light
    }
  })
);

const Line: React.FC = () => {
  const tools = useSelector((state: RootState) => state.tools);
  const dispatch = useDispatch();

  const onClickHandler = (): void => {
    dispatch(changeTool(ToolTypeLine));
  };

  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(tools.selectedType === ToolTypeLine);
  });

  const classes = useStyles();

  return (
    <IconButton
      className={selected ? classes.selected : classes.notSelected}
      onClick={onClickHandler}
    >
      <RemoveIcon />
    </IconButton>
  );
};

export default Line;
