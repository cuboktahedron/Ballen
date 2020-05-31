import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent
} from "@material-ui/core";
import { build as doBuild, clearBuild, closeBuild } from "actions/buildAction";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "stores/rootState";
import BuildCanvas from "./BuildCanvas";

const Build: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const build = state.build;
  const layers = state.layers;

  const textsRef = useRef<HTMLDivElement>(null);

  const onCloseHandler = (): void => {
    dispatch(clearBuild());
    dispatch(closeBuild());
  };

  const onEnteredHandler = (): void => {
    dispatch(doBuild(layers));
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
        <Button onClick={onCloseHandler} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Build;
