import {
  Box,
  Container,
  createStyles,
  Grid,
  makeStyles,
  Paper
} from "@material-ui/core";
import { batchNewFile } from "actions/batchAction";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "stores/rootState";
import File from "./File";
import Histories from "./Histories";
import KeyShortcut from "./KeyShortcut";
import LayerCanvases from "./LayerCanvases";
import Layers from "./Layers";
import MainMenu from "./menu/MainMenu";
import Process from "./Process";
import ToolBar from "./ToolBar";
import Build from "./Build";

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      maxHeight: 580,
      minHeight: 580,
      maxWidth: 580,
      minWidth: 580,
      position: "relative"
    }
  })
);

const App: React.FC = () => {
  const layers = useSelector((state: RootState) => state.layers);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(batchNewFile());
  }, []);

  const classes = useStyles();

  const canvas = (
    <Grid container>
      <Grid item xs={6}>
        <Paper className={classes.paper}>
          <LayerCanvases />
        </Paper>
      </Grid>
    </Grid>
  );

  const controllers = (
    <Container>
      <KeyShortcut />
      <File />
      <Process />
      <Build />
    </Container>
  );

  if (layers.layers.length > 0) {
    return (
      <div>
        <MainMenu />
        <Box style={{ marginTop: "44px" }}>
          {canvas}
          <Grid container>
            <Grid item xs={6}>
              <ToolBar />
            </Grid>
            <Grid item xs={6}>
              <Layers />
              <Histories />
            </Grid>
          </Grid>
          {controllers}
        </Box>
      </div>
    );
  } else {
    return <div>{controllers}</div>;
  }
};

export default App;
