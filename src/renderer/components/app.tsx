import React, { useEffect } from "react";
import {
  Container,
  Paper,
  createStyles,
  makeStyles,
  Grid
} from "@material-ui/core";
import ToolBar from "./ToolBar";
import Layers from "./Layers";
import LayerCanvases from "./LayerCanvases";
import BuildCanvas from "./BuildCanvas";
import { addLayer } from "../../actions/layersAction";
import { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";

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
