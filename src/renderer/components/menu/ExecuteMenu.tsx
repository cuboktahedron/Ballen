import { Button, Menu, MenuItem } from "@material-ui/core";
import { build } from "actions/buildAction";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "stores/rootState";

const ExecuteMenu: React.FC = () => {
  const layers = useSelector((state: RootState) => state.layers);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleBuild = (): void => {
    dispatch(build(layers));
    setAnchorEl(null);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button style={{ color: "white" }} onClick={handleClick}>
        Execute
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleBuild}>Build</MenuItem>
      </Menu>
    </div>
  );
};

export default ExecuteMenu;
