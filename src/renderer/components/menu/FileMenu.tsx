import { Button, Menu, MenuItem } from "@material-ui/core";
import { batchNewFile } from "actions/batchAction";
import { load, save } from "actions/fileAction";
import { quit } from "actions/processAction";
import React from "react";
import { useDispatch } from "react-redux";

const FileMenu: React.FC = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleNew = (): void => {
    dispatch(batchNewFile());
    setAnchorEl(null);
  };

  const handleSave = (): void => {
    dispatch(save());
    setAnchorEl(null);
  };

  const handleLoad = (): void => {
    dispatch(load());
    setAnchorEl(null);
  };

  const handleQuit = (): void => {
    dispatch(quit());
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button style={{ color: "white" }} onClick={handleClick}>
        File
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleNew}>New</MenuItem>
        <MenuItem onClick={handleSave}>Save</MenuItem>
        <MenuItem onClick={handleLoad}>Load</MenuItem>
        <MenuItem onClick={handleQuit}>Quit</MenuItem>
      </Menu>
    </div>
  );
};

export default FileMenu;
