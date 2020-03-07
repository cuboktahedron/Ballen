import { IconButton, makeStyles, createStyles, Theme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { useDispatch, useSelector } from "react-redux";
import { ELLIPSE as ToolTypeEllipse } from "../../../actions/tool/ellipse";
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

const Ellipse: React.FC = () => {
  const tools = useSelector((state: RootState) => state.tools);
  const dispatch = useDispatch();

  const onClickHandler = (): void => {
    dispatch(selectTool(ToolTypeEllipse));
  };

  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(tools.selectedType === ToolTypeEllipse);
  });

  const classes = useStyles();

  return (
    <IconButton
      className={selected ? classes.selected : classes.notSelected}
      onClick={onClickHandler}
    >
      <RadioButtonUncheckedIcon />
    </IconButton>
  );
};

export default Ellipse;
