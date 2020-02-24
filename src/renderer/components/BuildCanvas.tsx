import React, { useRef, useEffect } from "react";
import { createStyles, makeStyles } from "@material-ui/core";
import { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { build as doBuild } from "../../actions/buildAction";

const useStyles = makeStyles(() =>
  createStyles({
    canvas: {}
  })
);

const BuildCanvas: React.FC = () => {
  const build = useSelector((state: RootState) => state.build);
  const layers = useSelector((state: RootState) => state.layers);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dispatch = useDispatch();

  const getCanvas = (): HTMLCanvasElement => {
    const canvas = canvasRef.current;
    if (canvas == null) {
      throw new Error("can't get canvas");
    }

    return canvas;
  };

  const getContext = (): CanvasRenderingContext2D => {
    const canvas = getCanvas();
    const ctx = canvas.getContext("2d");
    if (ctx == null) {
      throw new Error("can't get context2D");
    }

    return ctx;
  };

  const classes = useStyles();

  useEffect(() => {
    dispatch(doBuild(layers));
  }, [layers]);

  useEffect(() => {
    const ctx = getContext();
    ctx.putImageData(build.imageData, 0, 0);
  }, [build]);
  return (
    <canvas
      className={classes.canvas}
      ref={canvasRef}
      height="580"
      width="580"
    />
  );
};

export default BuildCanvas;
