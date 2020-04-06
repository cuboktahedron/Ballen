import { drawBegin, drawEnd, drawMiddle } from "actions/layerAction";
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
import { RootState } from "stores/rootState";
import GuideLayerCanvas from "./GuideLayerCanvas";
import LayerCanvas, { LayerCanvasMethods } from "./LayerCanvas";
import { useActiveLayer } from "./Layers";
import { batch } from "actions/rootAction";

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
      batch(
        drawBegin({
          tools: state.tools,
          layers: state.layers,
          event: {
            coords: {
              x: e.nativeEvent.offsetX,
              y: e.nativeEvent.offsetY
            }
          }
        }),
        changeDrawStateBegin({
          tools: state.tools,
          coords: {
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY
          }
        })
      )
    );
  };

  const handleMouseMove = (e: MouseEvent): void => {
    if (!mouseDowned) {
      return;
    }

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
      batch(
        drawMiddle({
          tools: state.tools,
          layers: state.layers,
          event: {
            coords
          }
        }),
        changeDrawStateMiddle({
          tools: state.tools,
          coords
        })
      )
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
      batch(
        drawEnd({
          tools: state.tools,
          layers: state.layers,
          event: {
            coords
          }
        }),
        changeDrawStateEnd({
          tools: state.tools,
          coords
        })
      )
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
