import { IconButton, makeStyles, createStyles, Theme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CreateIcon from "@material-ui/icons/Create";
import { setTool } from "../../../actions/toolAction";
import { useDispatch, useSelector } from "react-redux";
import { PENCIL as ToolTypePencil } from "../../../actions/tool/pencil";
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
  const tool = useSelector((state: RootState) => state.tool);
  const dispatch = useDispatch();

  const onClickHandler = (): void => {
    dispatch(setTool(ToolTypePencil));
  };

  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(tool.type === ToolTypePencil);
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
