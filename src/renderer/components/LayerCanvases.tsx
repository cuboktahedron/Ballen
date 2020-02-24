import React, { useState, createRef, RefObject } from "react";
import { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import LayerCanvas, { LayerCanvasMethods } from "./LayerCanvas";
import { useActiveLayer } from "./Layers";
import { drawBegin, drawMiddle, drawEnd } from "../../actions/layerAction";
import {
  setDrawStateBegin,
  setDrawStateMiddle,
  setDrawStateEnd
} from "../../actions/toolAction";

const LayerCanvases: React.FC = () => {
  const state = useSelector((state: RootState) => state);
  const layers = useSelector((state: RootState) => state.layers);
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
        tool: state.tool,
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
        tool: state.tool,
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
        tool: state.tool,
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
        tool: state.tool,
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
        tool: state.tool,
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
        tool: state.tool,
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
      {layerCanvasItems}
    </div>
  );
};

export default LayerCanvases;
