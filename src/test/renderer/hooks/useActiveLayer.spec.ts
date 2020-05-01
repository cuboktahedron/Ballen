import { useSelector } from "react-redux";
import { useActiveLayer } from "renderer/hooks/useActiveLayer";
import { InitialLayersState, LayersState } from "stores/layersState";

jest.mock("react-redux");

describe("useActiveLayer", () => {
  it("should return active layer state", () => {
    const useSelectorMock = useSelector as jest.Mock<LayersState>;

    useSelectorMock.mockReturnValue({
      ...InitialLayersState,
      activeLayerId: 1,
      layers: [
        {
          color: "010203",
          id: 0,
          name: "layer-0",
          visible: true,
          imageData: new ImageData(1, 1)
        },
        {
          color: "000000ff",
          id: 1,
          name: "layer-1",
          visible: false,
          imageData: new ImageData(1, 1)
        }
      ]
    });

    const expected = {
      color: "000000ff",
      id: 1,
      name: "layer-1",
      visible: false,
      imageData: new ImageData(1, 1)
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
