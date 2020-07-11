import { createStyles, makeStyles } from "@material-ui/core";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef
} from "react";
import { LayerState } from "stores/layerState";
import { LFT_OPACITY, OpacityProperty } from "types/filters";
import { LB_MULTIPLY } from "types/layerBlend";
import Color from "utils/graphics/Color";

type LayerCanvasProps = LayerState & {
  zIndex: number;
};

const blendMode = (props: LayerCanvasProps): "multiply" | "normal" => {
  switch (props.blend) {
    case LB_MULTIPLY:
      return "multiply";
    default:
      return "normal";
  }
};

const useStyles = makeStyles(() =>
  createStyles({
    canvas: {
      mixBlendMode: blendMode,
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

    const alphaRatio = props.filters
      .filter(filter => filter.property.type === LFT_OPACITY)
      .map(filter => {
        const property = filter.property as OpacityProperty;
        return property.option.opacity / 100;
      })
      .reduce((acc, cur) => acc * cur, 1);
    const alpha = Math.round(alphaRatio * 255);
    const fillColor = new Color(props.color.substring(1));
    fillColor.a = alpha;

    ctx.globalCompositeOperation = "source-in";
    ctx.fillStyle = `#${fillColor.rgba}`;
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
