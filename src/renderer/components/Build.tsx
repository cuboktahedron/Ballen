import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import { build as doBuild, closeBuild } from "actions/buildAction";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "stores/rootState";
import BuildCanvas from "./BuildCanvas";

const Build: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const build = state.build;
  const layers = state.layers;

  const onCloseHandler = (): void => {
    dispatch(closeBuild());
  };

  const onEnterHandler = (): void => {
    dispatch(doBuild(layers));
  };

  const buildTexts = build.buildTexts.map((text, index) => {
    <p key={index}>{text}</p>;
  });

  return (
    <Dialog open={build.isOpened} maxWidth={false} onEnter={onEnterHandler}>
      <DialogTitle>Build</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" p={1} m={1}>
          <Box>
            <BuildCanvas />
          </Box>
          <Box
            style={{ maxHeight: "200px", width: "100%", overflowY: "scroll" }}
          >
            {buildTexts}
          </Box>
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
