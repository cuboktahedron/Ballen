import { AppBar } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import React from "react";
import ExecuteMenu from "./ExecuteMenu";
import FileMenu from "./FileMenu";

const MainMenu: React.FC = () => {
  return (
    <AppBar elevation={0} style={{ background: "grey" }}>
      <Toolbar style={{ minHeight: "32px" }}>
        <FileMenu />
        <ExecuteMenu />
      </Toolbar>
    </AppBar>
  );
};

export default MainMenu;
