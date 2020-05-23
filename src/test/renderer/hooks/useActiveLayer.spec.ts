import { useSelector } from "react-redux";
import { useActiveLayer } from "renderer/hooks/useActiveLayer";
import { InitialLayersState, LayersState } from "stores/layersState";
import { LB_MULTIPLY, LB_NORMAL } from "stores/layerState";
import { LFT_ID } from "stores/filter/id";
import { LFT_OPACITY } from "stores/filter/opacity";

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
          filterIdSequence: 0,
          filters: [
            {
              id: 0,
              property: {
                type: LFT_ID
              }
            }
          ],
          imageData: new ImageData(1, 1),
          name: "layer-0",
          visible: true
        },
        {
          id: 1,
          blend: LB_MULTIPLY,
          color: "000000ff",
          filterIdSequence: 1,
          filters: [
            {
              id: 0,
              property: {
                type: LFT_OPACITY,
                option: {
                  opacity: 50
                }
              }
            },
            {
              id: 1,
              property: {
                type: LFT_ID
              }
            }
          ],
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
      filterIdSequence: 1,
      filters: [
        {
          id: 0,
          property: {
            type: LFT_OPACITY,
            option: {
              opacity: 50
            }
          }
        },
        {
          id: 1,
          property: {
            type: LFT_ID
          }
        }
      ],
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
