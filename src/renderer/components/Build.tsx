import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent
} from "@material-ui/core";
import {
  clearBuild,
  closeBuild,
  makeBuild,
  cancelBuild
} from "actions/buildAction";
import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "stores/rootState";
import BuildCanvas from "./BuildCanvas";
import { exportAsImage } from "actions/fileAction";
import { BS_COMPLETED, BS_BUILDING } from "stores/buildState";

const Build: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const build = state.build;
  const layers = state.layers;

  const textsRef = useRef<HTMLDivElement>(null);

  const makeBuildCallback = useCallback(() => makeBuild(layers), [
    build.isOpened
  ]);
  const [doBuild, doCancelBuild] = useMemo(() => makeBuildCallback(), [
    makeBuildCallback
  ]);

  const onSaveHandler = (): void => {
    dispatch(exportAsImage());
  };

  const onCancelHandler = (): void => {
    doCancelBuild();

    dispatch(cancelBuild(false));
  };

  const onCloseHandler = (): void => {
    dispatch(clearBuild());
    dispatch(closeBuild());
  };

  const onEnteredHandler = (): void => {
    dispatch(doBuild());
  };

  useEffect(() => {
    const target = textsRef?.current;
    if (!target) {
      return;
    }

    target.scrollTop = target.scrollHeight;
  }, [build.buildTexts]);

  const buildTexts = build.buildTexts.map((text, index) => {
    return <p key={index}>{text}</p>;
  });

  return (
    <Dialog
      fullScreen={true}
      open={build.isOpened}
      onEntered={onEnteredHandler}
    >
      <DialogContent>
        <Box
          display="flex"
          flexDirection="column"
          p={1}
          m={1}
          style={{ border: "solid black 4px", borderRadius: "8px" }}
        >
          <Box>
            <BuildCanvas />
          </Box>
          <div
            ref={textsRef}
            style={{
              maxHeight: "200px",
              overflowY: "scroll",
              width: "100%"
            }}
          >
            {buildTexts}
          </div>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onSaveHandler}
          color="primary"
          disabled={build.buildStatus !== BS_COMPLETED}
        >
          Save
        </Button>
        <Button
          onClick={onCancelHandler}
          color="primary"
          disabled={build.buildStatus !== BS_BUILDING}
        >
          Cancel
        </Button>
        <Button onClick={onCloseHandler} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Build;
