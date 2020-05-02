import { useSelector } from "react-redux";
import { useActiveLayer } from "renderer/hooks/useActiveLayer";
import { InitialLayersState, LayersState } from "stores/layersState";
import { LB_MULTIPLY, LB_NORMAL } from "stores/layerState";

jest.mock("react-redux");

describe("useActiveLayer", () => {
  it("should return active layer state", () => {
    const useSelectorMock = useSelector as jest.Mock<LayersState>;

    useSelectorMock.mockReturnValue({
      ...InitialLayersState,
      activeLayerId: 1,
      layers: [
        {
          id: 0,
          blend: LB_NORMAL,
          color: "010203",
          imageData: new ImageData(1, 1),
          name: "layer-0",
          visible: true
        },
        {
          id: 1,
          blend: LB_MULTIPLY,
          color: "000000ff",
          imageData: new ImageData(1, 1),
          name: "layer-1",
          visible: false
        }
      ]
    });

    const expected = {
      id: 1,
      blend: LB_MULTIPLY,
      color: "000000ff",
      imageData: new ImageData(1, 1),
      name: "layer-1",
      visible: false
    };

    const actual = useActiveLayer();
    expect(actual).toEqual(expected);
  });

  it("should raise error", () => {
    const useSelectorMock = useSelector as jest.Mock<LayersState>;

    useSelectorMock.mockReturnValue({
      ...InitialLayersState,
      activeLayerId: 0,
      layers: []
    });

    expect(useActiveLayer).toThrow("can't find layer by id(0)");
  });
});
