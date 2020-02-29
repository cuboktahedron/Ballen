import { createStyles, IconButton, makeStyles, Theme } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PENCIL as ToolTypePencil } from "../../../actions/tool/pencil";
import { selectTool } from "../../../actions/toolsAction";
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

const Pencil: React.FC = () => {
  const tools = useSelector((state: RootState) => state.tools);
  const dispatch = useDispatch();

  const onClickHandler = (): void => {
    dispatch(selectTool(ToolTypePencil));
  };

  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(tools.selectedType === ToolTypePencil);
  });

  const classes = useStyles();

  return (
    <IconButton
      className={selected ? classes.selected : classes.notSelected}
      onClick={onClickHandler}
    >
      <CreateIcon />
    </IconButton>
  );
};

export default Pencil;
