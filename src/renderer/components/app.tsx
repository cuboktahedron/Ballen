import {
  Container,
  createStyles,
  Grid,
  makeStyles,
  Paper
} from "@material-ui/core";
import { addLayer } from "actions/layersAction";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "stores/store";
import BuildCanvas from "./BuildCanvas";
import LayerCanvases from "./LayerCanvases";
import Layers from "./Layers";
import ToolBar from "./ToolBar";

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

  let canvas;
  if (layers.layers.length > 0) {
    canvas = (
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
  } else {
    canvas = <Grid container />;
  }

  return (
    <Container>
      {canvas}
      <Grid container>
        <Grid item xs={6}>
          <ToolBar />
        </Grid>
        <Grid item xs={6}>
          <Layers />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
