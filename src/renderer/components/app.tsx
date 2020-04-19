import {
  Container,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Box
} from "@material-ui/core";
import { addLayer } from "actions/layersAction";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "stores/rootState";
import BuildCanvas from "./BuildCanvas";
import KeyShortcut from "./KeyShortcut";
import LayerCanvases from "./LayerCanvases";
import Layers from "./Layers";
import ToolBar from "./ToolBar";
import Histories from "./Histories";
import MainMenu from "./MainMenu";
import Process from "./Process";

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
    dispatch(addLayer());
  }, []);

  const classes = useStyles();

  const canvas = (
    <Grid container>
      <Grid item xs={6}>
        <Paper className={classes.paper}>
          <LayerCanvases />
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.paper}>
          <BuildCanvas />
        </Paper>
      </Grid>
    </Grid>
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
          <KeyShortcut />
          <Process />
        </Box>
      </div>
    );
  } else {
    return (
      <Container>
        <KeyShortcut />
        <Process />
      </Container>
    );
  }
};

export default App;
