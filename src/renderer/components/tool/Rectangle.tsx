import { IconButton, makeStyles, createStyles, Theme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { useDispatch, useSelector } from "react-redux";
import { RECTANGLE as ToolTypeRectangle } from "../../../actions/tool/rectangle";
import { RootState } from "../../../store/store";
import { changeTool } from "../../../actions/toolsAction";

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

const Rectangle: React.FC = () => {
  const tools = useSelector((state: RootState) => state.tools);
  const dispatch = useDispatch();

  const onClickHandler = (): void => {
    dispatch(changeTool(ToolTypeRectangle));
  };

  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(tools.selectedType === ToolTypeRectangle);
  });

  const classes = useStyles();

  return (
    <IconButton
      className={selected ? classes.selected : classes.notSelected}
      onClick={onClickHandler}
    >
      <CheckBoxOutlineBlankIcon />
    </IconButton>
  );
};

export default Rectangle;
