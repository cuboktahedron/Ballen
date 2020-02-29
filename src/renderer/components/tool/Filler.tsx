import { IconButton, makeStyles, createStyles, Theme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import FormatColorFillIcon from "@material-ui/icons/FormatColorFill";
import { useDispatch, useSelector } from "react-redux";
import { FILLER as ToolTypeFiller } from "../../../actions/tool/filler";
import { RootState } from "../../../store/store";
import { selectTool } from "../../../actions/toolsAction";

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
  const tools = useSelector((state: RootState) => state.tools);
  const dispatch = useDispatch();

  const onClickHandler = (): void => {
    dispatch(selectTool(ToolTypeFiller));
  };

  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(tools.selectedType === ToolTypeFiller);
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
