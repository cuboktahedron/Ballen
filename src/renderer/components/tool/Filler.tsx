import { IconButton, makeStyles, createStyles, Theme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import FormatColorFillIcon from "@material-ui/icons/FormatColorFill";
import { setTool } from "../../../actions/toolAction";
import { useDispatch, useSelector } from "react-redux";
import { FILLER as ToolTypeFiller } from "../../../actions/tool/filler";
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

const Filler: React.FC = () => {
  const tool = useSelector((state: RootState) => state.tool);
  const dispatch = useDispatch();

  const onClickHandler = (): void => {
    dispatch(setTool(ToolTypeFiller));
  };

  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(tool.type === ToolTypeFiller);
  });

  const classes = useStyles();

  return (
    <IconButton
      className={selected ? classes.selected : classes.notSelected}
      onClick={onClickHandler}
    >
      <FormatColorFillIcon />
    </IconButton>
  );
};

export default Filler;
