import { AppBar, Button, Menu, MenuItem } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import React from "react";
import { useDispatch } from "react-redux";
import { quit } from "actions/processAction";

const MainMenu: React.FC = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleQuit = (): void => {
    dispatch(quit());
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <AppBar style={{ background: "grey" }}>
      <Toolbar style={{ minHeight: "32px" }}>
        <Button style={{ color: "white" }} onClick={handleClick}>
          File
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Save(not implemented)</MenuItem>
          <MenuItem onClick={handleClose}>Load(not implemented)</MenuItem>
          <MenuItem onClick={handleQuit}>Quit</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default MainMenu;
