import { AppBar } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import React from "react";
import ExecuteMenu from "./ExecuteMenu";
import FileMenu from "./FileMenu";

const MainMenu: React.FC = () => {
  return (
    <AppBar style={{ background: "grey" }}>
      <Toolbar style={{ minHeight: "32px" }}>
        <FileMenu />
        <ExecuteMenu />
      </Toolbar>
    </AppBar>
  );
};

export default MainMenu;
