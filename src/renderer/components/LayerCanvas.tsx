import { createStyles, makeStyles } from "@material-ui/core";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef
} from "react";
import { LayerState } from "../../store/layerState";

type LayerCanvasProps = LayerState & {
  zIndex: number;
};

const useStyles = makeStyles(() =>
  createStyles({
    canvas: {
      position: "absolute",
      visibility: (props: LayerCanvasProps): "hidden" | "visible" =>
        props.visible ? "visible" : "hidden",
      zIndex: (props: LayerCanvasProps): number => props.zIndex
    }
  })
);

export type LayerCanvasMethods = { getContext: () => CanvasRenderingContext2D };

const LayerCanvasBase: React.RefForwardingComponent<
  LayerCanvasMethods,
  LayerCanvasProps
> = (props, ref) => {
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

  useImperativeHandle(ref, () => ({
    getContext: (): CanvasRenderingContext2D => {
      return getContext();
    }
  }));

  useEffect(() => {
    const ctx = getContext();
    ctx.putImageData(props.imageData, 0, 0);

    ctx.globalCompositeOperation = "source-in";
    ctx.fillStyle = props.color + "80";
    ctx.fillRect(0, 0, props.imageData.width, props.imageData.height);
  }, [props]);

  const classes = useStyles(props);

  return (
    <canvas
      className={classes.canvas}
      ref={canvasRef}
      height="580"
      width="580"
    />
  );
};

const LayerCanvas = forwardRef(LayerCanvasBase);
export default LayerCanvas;
