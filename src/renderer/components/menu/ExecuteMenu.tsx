import { Button, Menu, MenuItem } from "@material-ui/core";
import { openBuild } from "actions/buildAction";
import React from "react";
import { useDispatch } from "react-redux";

const ExecuteMenu: React.FC = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleBuild = (): void => {
    dispatch(openBuild());
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
