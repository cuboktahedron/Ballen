import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "stores/rootState";
import Save from "./file/Save";
import Load from "./file/Load";
import { FS_SAVE, FS_LOAD } from "stores/fileState";

const File: React.FC = () => {
  const file = useSelector((state: RootState) => state.file);

  if (file.type === FS_SAVE) {
    return <Save />;
  }

  if (file.type === FS_LOAD) {
    return <Load />;
  }

  return <div />;
};

export default File;
