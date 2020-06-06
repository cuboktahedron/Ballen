import {
  Box,
  Container,
  createStyles,
  makeStyles,
  Paper
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { batchNewFile } from "actions/batchAction";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "stores/rootState";
import Build from "./Build";
import File from "./File";
import KeyShortcut from "./KeyShortcut";
import LayerCanvases from "./LayerCanvases";
import MainMenu from "./menu/MainMenu";
import Process from "./Process";
import ToolBar from "./ToolBar";

const useStyles = makeStyles(() =>
  createStyles({
    tools: {
      flexShrink: 0,
      marginTop: "36px",
      height: "calc(100vh - 38px)",
      overflowY: "scroll",
      width: 360
    },
    outerContent: {
      backgroundColor: grey[300],
      marginTop: "36px",
      height: "calc(100vh - 38px)",
      width: "calc(100vw - 340px)",
      overflow: "scroll"
    },
    content: {
      width: "600px"
    },
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
        <Box display="flex">
          <Box className={classes.outerContent}>
            <Box className={classes.content}>
              <Paper className={classes.paper}>
                <LayerCanvases />
              </Paper>
            </Box>
          </Box>
          <Box className={classes.tools}>
            <ToolBar />
          </Box>
        </Box>
        {controllers}
      </div>
    );
  } else {
    return <div>{controllers}</div>;
  }
};

export default App;
