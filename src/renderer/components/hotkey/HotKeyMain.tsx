import { openBuild } from "actions/buildAction";
import { addLayer } from "actions/layersAction";
import { redo, undo } from "actions/rootAction";
import { changeTool } from "actions/toolsAction";
import React, { useCallback } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useDispatch } from "react-redux";
import { ELLIPSE } from "types/tools/ellipse";
import { FILLER } from "types/tools/filler";
import { LINE } from "types/tools/line";
import { PENCIL } from "types/tools/pencil";
import { RECTANGLE } from "types/tools/rectangle";

const HotKeyMain: React.FC = () => {
  const dispatch = useDispatch();

  const changeToolPencil = useCallback(() => {
    dispatch(changeTool(PENCIL));
  }, []);
  useHotkeys("p", changeToolPencil);

  const changeToolFiller = useCallback(() => {
    dispatch(changeTool(FILLER));
  }, []);
  useHotkeys("F", changeToolFiller);

  const changeToolEllipse = useCallback(() => {
    dispatch(changeTool(ELLIPSE));
  }, []);
  useHotkeys("E", changeToolEllipse);

  const changeToolRectangle = useCallback(() => {
    dispatch(changeTool(RECTANGLE));
  }, []);
  useHotkeys("R", changeToolRectangle);

  const changeToolLine = useCallback(() => {
    dispatch(changeTool(LINE));
  }, []);
  useHotkeys("L", changeToolLine);

  const newLayer = useCallback(() => {
    dispatch(addLayer());
  }, []);
  useHotkeys("ctrl + shift + N", newLayer);

  const undoHistory = useCallback(() => {
    dispatch(undo());
  }, []);
  useHotkeys("ctrl + Z", undoHistory);

  const redoHistory = useCallback(() => {
    dispatch(redo());
  }, []);
  useHotkeys("ctrl + shift + Z", redoHistory);

  const build = useCallback((event: KeyboardEvent) => {
    event.preventDefault();
    dispatch(openBuild());
  }, []);
  useHotkeys("F5", build);

  return <div />;
};

export default HotKeyMain;
