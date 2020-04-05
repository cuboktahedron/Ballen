import { addLayer } from "actions/layersAction";
import { redo, undo } from "actions/rootAction";
import { ELLIPSE } from "actions/tool/ellipse";
import { FILLER } from "actions/tool/filler";
import { LINE } from "actions/tool/line";
import { PENCIL } from "actions/tool/pencil";
import { RECTANGLE } from "actions/tool/rectangle";
import { changeTool } from "actions/toolsAction";
import React from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useDispatch } from "react-redux";

const KeyShortcut: React.FC = () => {
  const dispatch = useDispatch();

  useHotkeys("p", () => {
    dispatch(changeTool(PENCIL));
  });

  useHotkeys("F", () => {
    dispatch(changeTool(FILLER));
  });

  useHotkeys("E", () => {
    dispatch(changeTool(ELLIPSE));
  });

  useHotkeys("R", () => {
    dispatch(changeTool(RECTANGLE));
  });

  useHotkeys("L", () => {
    dispatch(changeTool(LINE));
  });

  useHotkeys("ctrl + shift + N", () => {
    dispatch(addLayer());
  });

  useHotkeys("ctrl + Z", () => {
    dispatch(undo());
  });

  useHotkeys("ctrl + shift + Z", () => {
    dispatch(redo());
  });

  return <div />;
};

export default KeyShortcut;
