import { useSelector } from "react-redux";
import useSave from "renderer/hooks/useSave";
import { LFT_ID } from "stores/filter/id";
import { LB_MULTIPLY, LB_NORMAL } from "stores/layerState";
import { InitialRootState, RootState } from "stores/rootState";
import { LFT_OPACITY } from "stores/filter/opacity";

jest.mock("react-redux");
const useSelectorMock = useSelector as jest.Mock<RootState>;

describe("useSave", () => {
  beforeEach(() => {
    useSelectorMock.mockReturnValue({
      ...InitialRootState,
      layers: {
        layerIdSequence: 100,
        activeLayerId: 2,
        layers: [
          {
            id: 0,
            blend: LB_NORMAL,
            color: "010203",
            filterIdSequence: 0,
            filters: [
              {
                id: 0,
                name: "filter0-0",
                property: {
                  type: LFT_ID
                }
              }
            ],
            imageData: new ImageData(1, 1),
            name: "layer-0",
            opacity: 100,
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
                name: "filter1-0",
                property: {
                  type: LFT_OPACITY,
                  option: {
                    opacity: 50
                  }
                }
              },
              {
                id: 1,
                name: "filter1-1",
                property: {
                  type: LFT_ID
                }
              }
            ],
            imageData: new ImageData(1, 1),
            name: "layer-1",
            opacity: 50,
            visible: false
          }
        ],
        unsettledLayers: null,
        size: {
          x: 1,
          y: 1
        }
      }
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should make json", () => {
    const expected = {
      layers: {
        size: { x: 1, y: 1 },
        layers: [
          {
            blend: LB_NORMAL,
            color: "010203",
            filters: [
              {
                name: "filter0-0",
                property: {
                  type: LFT_ID
                }
              }
            ],
            imageDataBase64: btoa(String.fromCharCode(...new ImageData(1, 1).data)),
            name: "layer-0",
            opacity: 100
          },
          {
            blend: LB_MULTIPLY,
            color: "000000ff",
            filters: [
              {
                name: "filter1-0",
                property: {
                  type: LFT_OPACITY,
                  option: {
                    opacity: 50
                  }
                }
              },
              {
                name: "filter1-1",
                property: {
                  type: LFT_ID
                }
              }
            ],
            imageDataBase64: btoa(String.fromCharCode(...new ImageData(1, 1).data)),
            name: "layer-1",
            opacity: 50
          }
        ]
      }
    };

    const actual: string = useSave();
    expect(actual).toBe(JSON.stringify(expected));
  });
});
