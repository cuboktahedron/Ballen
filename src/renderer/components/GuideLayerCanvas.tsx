import { createStyles, makeStyles } from "@material-ui/core";
import { drawGuide } from "actions/guideLayerAction";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GuideLayerState } from "stores/guideLayerState";
import { RootState } from "stores/rootState";
import { ToolProperty } from "types/tools/tools";

type GuideLayerCanvasProps = GuideLayerState & {
  zIndex: number;
};

const useStyles = makeStyles(() =>
  createStyles({
    canvas: {
      position: "absolute",
      zIndex: (props: GuideLayerCanvasProps): number => props.zIndex
    }
  })
);

const GuideLayerCanvas: React.FC<GuideLayerCanvasProps> = props => {
  const dispatch = useDispatch();
  const guideLayer = useSelector((state: RootState) => state.guideLayer);
  const tools = useSelector((state: RootState) => state.tools);
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

  const classes = useStyles(props);

  useEffect(() => {
    dispatch(
      drawGuide({
        tools: {
          selectedType: tools.selectedType,
          drawInfo: tools.drawInfo,
          property: tools.properties.get(tools.selectedType) as ToolProperty
        },
        guideLayer: {
          imageData: guideLayer.imageData
        }
      })
    );
  }, [tools.drawInfo]);

  useEffect(() => {
    const ctx = getContext();
    ctx.putImageData(guideLayer.imageData, 0, 0);
  }, [guideLayer]);
  return (
    <canvas
      className={classes.canvas}
      ref={canvasRef}
      height="580"
      width="580"
    />
  );
};

export default GuideLayerCanvas;
