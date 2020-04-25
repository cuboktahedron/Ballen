import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "stores/rootState";
import Save from "./file/Save";

const File: React.FC = () => {
  const file = useSelector((state: RootState) => state.file);

  if (file.save) {
    return <Save />;
  }

  return <div />;
};

export default File;
