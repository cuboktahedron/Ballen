import { createStyles, IconButton, makeStyles, Theme } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import { PENCIL as ToolTypePencil } from "actions/tool/pencil";
import { changeTool } from "actions/toolsAction";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "stores/rootState";

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
    dispatch(changeTool(ToolTypePencil));
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
