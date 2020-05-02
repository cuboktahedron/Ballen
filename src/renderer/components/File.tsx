import React from "react";
import { useSelector } from "react-redux";
import { FS_EXPORT_AS_IMAGE, FS_LOAD, FS_SAVE } from "stores/fileState";
import { RootState } from "stores/rootState";
import ExportAsImage from "./file/ExportAsImage";
import Load from "./file/Load";
import Save from "./file/Save";

const File: React.FC = () => {
  const file = useSelector((state: RootState) => state.file);

  if (file.type === FS_SAVE) {
    return <Save />;
  }

  if (file.type === FS_LOAD) {
    return <Load />;
  }

  if (file.type === FS_EXPORT_AS_IMAGE) {
    return <ExportAsImage />;
  }

  return <div />;
};

export default File;
