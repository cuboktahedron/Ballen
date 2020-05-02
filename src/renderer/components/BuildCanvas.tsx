import { createStyles, makeStyles } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "stores/rootState";

const useStyles = makeStyles(() =>
  createStyles({
    canvas: {}
  })
);

const BuildCanvas: React.FC = () => {
  const build = useSelector((state: RootState) => state.build);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
