import { ipcRenderer } from "electron";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "stores/rootState";

const Process: React.FC = () => {
  const process = useSelector((state: RootState) => state.process);

  useEffect((): void => {
    if (process.quit) {
      ipcRenderer.send("quit");
    }
  }, [process.quit]);

  return <div />;
};

export default Process;
