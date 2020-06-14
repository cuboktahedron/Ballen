import {
  batchDrawBegin,
  batchDrawEnd,
  batchDrawMiddle
} from "actions/batchAction";
import { moveCursor } from "actions/toolsAction";
import React, {
  createRef,
  RefObject,
  useEffect,
  useRef,
  useState
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useActiveLayer } from "renderer/hooks/useActiveLayer";
import { LayerState } from "stores/layerState";
import { RootState } from "stores/rootState";
import GuideLayerCanvas from "./GuideLayerCanvas";
import LayerCanvas, { LayerCanvasMethods } from "./LayerCanvas";

const LayerCanvases: React.FC = () => {
  const state = useSelector((state: RootState) => state);
  const layers = state.layers;
  const guideLayer = state.guideLayer;
  const tools = state.tools;
  const activeLayer = useActiveLayer();
  const dispatch = useDispatch();

  const divRef = useRef<HTMLDivElement>(null);
  const refs: { [key: number]: RefObject<LayerCanvasMethods> } = {};
  layers.layers.forEach(layer => {
    refs[layer.id] = createRef<LayerCanvasMethods>();
  });

  const renderLayers: LayerState[] = layers.unsettledLayers ?? layers.layers;
  const layerCanvasItems = renderLayers.map((layer, index) => {
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

  const [mouseDowned, setMouseDowned] = useState<boolean>(false);
  const [mouseHovered, setMouseHovered] = useState<boolean>(false);

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    if (!activeLayer.visible) {
      return;
    }

    setMouseDowned(true);

    dispatch(
      batchDrawBegin({
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
  };

  const handleMouseMove = (e: MouseEvent): void => {
    const div = divRef.current;
    if (div === null) {
      return;
    }

    const rect = div.getBoundingClientRect();
    const coords = {
      x: e.pageX - (rect.left + window.pageXOffset),
      y: e.pageY - (rect.top + window.pageYOffset)
    };

    if (!mouseDowned) {
      if (mouseHovered) {
        dispatch(moveCursor(coords));
      } else if (tools.coords !== null) {
        dispatch(moveCursor(null));
      }
    } else if (!mouseDowned) {
      dispatch(moveCursor(coords));
    } else {
      dispatch(
        batchDrawMiddle({
          tools: state.tools,
          layers: state.layers,
          event: {
            coords
          }
        })
      );
    }
  };

  const handleMouseUp = (e: MouseEvent): void => {
    if (!mouseDowned) {
      return;
    }

    setMouseDowned(false);

    const div = divRef.current;
    if (div === null) {
      return;
    }

    const rect = div.getBoundingClientRect();
    const coords = {
      x: e.pageX - (rect.left + window.pageXOffset),
      y: e.pageY - (rect.top + window.pageYOffset)
    };

    dispatch(
      batchDrawEnd({
        tools: state.tools,
        layers: state.layers,
        event: {
          coords
        }
      })
    );
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return (): void => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    return (): void => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseUp]);

  return (
    <div
      ref={divRef}
      onMouseEnter={(): void => setMouseHovered(true)}
      onMouseLeave={(): void => setMouseHovered(false)}
      onMouseDown={handleMouseDown}
    >
      <GuideLayerCanvas zIndex={layers.layers.length + 1} {...guideLayer} />
      {layerCanvasItems}
    </div>
  );
};

export default LayerCanvases;
