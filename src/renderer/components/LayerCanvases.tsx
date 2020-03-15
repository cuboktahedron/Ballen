import React, { createRef, RefObject, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { drawBegin, drawEnd, drawMiddle } from "../../actions/layersAction";
import {
  setDrawStateBegin,
  setDrawStateEnd,
  setDrawStateMiddle
} from "../../actions/toolsAction";
import { RootState } from "../../store/store";
import LayerCanvas, { LayerCanvasMethods } from "./LayerCanvas";
import { useActiveLayer } from "./Layers";
import GuideLayerCanvas from "./GuideLayerCanvas";

const LayerCanvases: React.FC = () => {
  const state = useSelector((state: RootState) => state);
  const layers = state.layers;
  const guideLayer = state.guideLayer;
  const activeLayer = useActiveLayer(layers);
  const dispatch = useDispatch();

  const refs: { [key: number]: RefObject<LayerCanvasMethods> } = {};
  layers.layers.forEach(layer => {
    refs[layer.id] = createRef<LayerCanvasMethods>();
  });

  const layerCanvasItems = layers.layers.map((layer, index) => {
    const zIndex = layers.layers.length - index;
    const ref = refs[layer.id];

    return (
      <LayerCanvas
        ref={ref}
        key={layer.id}
        zIndex={zIndex}
        {...layer}
      ></LayerCanvas>
    );
  });

  const [beginPoint, setBeginPoint] = useState<{ x: number; y: number } | null>(
    null
  );

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    if (!activeLayer.visible) {
      return;
    }

    setBeginPoint({
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY
    });

    dispatch(
      drawBegin({
        tools: state.tools,
        layers: state.layers,
        event: {
          coords: {
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY
          }
        }
      })
    );

    dispatch(
      setDrawStateBegin({
        tools: state.tools,
        coords: {
          x: e.nativeEvent.offsetX,
          y: e.nativeEvent.offsetY
        }
      })
    );
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    if (beginPoint == null) {
      return;
    }

    dispatch(
      drawMiddle({
        tools: state.tools,
        layers: state.layers,
        event: {
          coords: {
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY
          }
        }
      })
    );

    dispatch(
      setDrawStateMiddle({
        tools: state.tools,
        coords: {
          x: e.nativeEvent.offsetX,
          y: e.nativeEvent.offsetY
        }
      })
    );
  };

  const handleMouseUp = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    setBeginPoint(null);

    dispatch(
      drawEnd({
        tools: state.tools,
        layers: state.layers,
        event: {
          coords: {
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY
          }
        }
      })
    );

    dispatch(
      setDrawStateEnd({
        tools: state.tools,
        coords: {
          x: e.nativeEvent.offsetX,
          y: e.nativeEvent.offsetY
        }
      })
    );
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <GuideLayerCanvas zIndex={layers.layers.length + 1} {...guideLayer} />
      {layerCanvasItems}
    </div>
  );
};

export default LayerCanvases;
