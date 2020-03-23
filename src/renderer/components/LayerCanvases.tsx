import { drawBegin, drawEnd, drawMiddle } from "actions/layersAction";
import {
  changeDrawStateBegin,
  changeDrawStateEnd,
  changeDrawStateMiddle
} from "actions/toolsAction";
import React, {
  createRef,
  RefObject,
  useEffect,
  useRef,
  useState
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "stores/store";
import GuideLayerCanvas from "./GuideLayerCanvas";
import LayerCanvas, { LayerCanvasMethods } from "./LayerCanvas";
import { useActiveLayer } from "./Layers";

const LayerCanvases: React.FC = () => {
  const state = useSelector((state: RootState) => state);
  const layers = state.layers;
  const guideLayer = state.guideLayer;
  const activeLayer = useActiveLayer();
  const dispatch = useDispatch();

  const divRef = useRef<HTMLDivElement>(null);
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

  const [mouseDowned, setMouseDowned] = useState<boolean>(false);

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    if (!activeLayer.visible) {
      return;
    }

    setMouseDowned(true);

    dispatch(
      changeDrawStateBegin({
        tools: state.tools,
        coords: {
          x: e.nativeEvent.offsetX,
          y: e.nativeEvent.offsetY
        }
      })
    );

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
  };

  const handleMouseMove = (e: MouseEvent): void => {
    if (!mouseDowned) {
      return;
    }

    console.log("handleMouseMove");

    const div = divRef.current;
    if (div === null) {
      return;
    }
    const rect = div.getBoundingClientRect();
    const coords = {
      x: e.pageX - rect.left,
      y: e.pageY - rect.top
    };

    dispatch(
      changeDrawStateMiddle({
        tools: state.tools,
        coords
      })
    );

    dispatch(
      drawMiddle({
        tools: state.tools,
        layers: state.layers,
        event: {
          coords
        }
      })
    );
  };

  const handleMouseUp = (e: MouseEvent): void => {
    setMouseDowned(false);

    const div = divRef.current;
    if (div === null) {
      return;
    }
    const rect = div.getBoundingClientRect();
    const coords = {
      x: e.pageX - rect.left,
      y: e.pageY - rect.top
    };

    dispatch(
      changeDrawStateEnd({
        tools: state.tools,
        coords
      })
    );

    dispatch(
      drawEnd({
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
    <div ref={divRef} onMouseDown={handleMouseDown}>
      <GuideLayerCanvas zIndex={layers.layers.length + 1} {...guideLayer} />
      {layerCanvasItems}
    </div>
  );
};

export default LayerCanvases;
